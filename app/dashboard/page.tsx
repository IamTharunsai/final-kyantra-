"use client"

import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore"
import { useAuth } from "@/contexts/AuthContext"
import { useAI } from "@/contexts/AIContext"
import { db } from "@/lib/firebase"
import { motion } from "framer-motion"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const { getProfitabilityInsights, getMenuRecommendations } = useAI()
  const [businessType, setBusinessType] = useState("restaurant")
  const [orders, setOrders] = useState([])
  const [liveOrders, setLiveOrders] = useState([])
  const [profitabilityInsights, setProfitabilityInsights] = useState("")
  const [menuRecommendations, setMenuRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  })
  const [orderTypeData, setOrderTypeData] = useState({
    labels: ["Dine-in", "Takeout", "Delivery"],
    datasets: [
      {
        label: "Order Types",
        data: [0, 0, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
      },
    ],
  })
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  useEffect(() => {
    let unsubscribe: () => void

    const setupRealtimeListener = async () => {
      if (user) {
        const ordersCollection = collection(db, "orders")
        const q = query(ordersCollection, where("businessId", "==", user.uid))

        unsubscribe = onSnapshot(q, (snapshot) => {
          const ordersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          setOrders(ordersList)

          // Update AI insights
          getProfitabilityInsights(ordersList).then((insights) => {
            setProfitabilityInsights(insights)
          })

          getMenuRecommendations(ordersList).then((recommendations) => {
            setMenuRecommendations(recommendations)
          })

          // Update revenue data
          const revenueByDate = ordersList.reduce((acc, order: any) => {
            const date = new Date(order.createdAt).toLocaleDateString()
            acc[date] = (acc[date] || 0) + order.total
            return acc
          }, {})

          setRevenueData({
            labels: Object.keys(revenueByDate),
            datasets: [
              {
                label: "Revenue",
                data: Object.values(revenueByDate),
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          })

          // Update order type data
          const orderTypes = ordersList.reduce(
            (acc: any, order: any) => {
              acc[order.type] = (acc[order.type] || 0) + 1
              return acc
            },
            { "Dine-in": 0, Takeout: 0, Delivery: 0 },
          )

          setOrderTypeData({
            labels: ["Dine-in", "Takeout", "Delivery"],
            datasets: [
              {
                label: "Order Types",
                data: [orderTypes["Dine-in"], orderTypes["Takeout"], orderTypes["Delivery"]],
                backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
              },
            ],
          })

          setLoading(false)
        })

        // Set up real-time listener for live orders
        const liveOrdersQuery = query(
          ordersCollection,
          where("businessId", "==", user.uid),
          where("status", "in", ["pending", "preparing", "ready"]),
          orderBy("createdAt", "desc"),
          limit(5),
        )

        const liveOrdersUnsubscribe = onSnapshot(liveOrdersQuery, (snapshot) => {
          const liveOrdersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          setLiveOrders(liveOrdersList)
        })

        return () => {
          unsubscribe()
          liveOrdersUnsubscribe()
        }
      }
    }

    setupRealtimeListener()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [user, getProfitabilityInsights, getMenuRecommendations])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container py-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <Tabs defaultValue={businessType} className="mb-6">
        <TabsList>
          <TabsTrigger value="restaurant" onClick={() => setBusinessType("restaurant")}>
            Restaurant
          </TabsTrigger>
          <TabsTrigger value="foodTruck" onClick={() => setBusinessType("foodTruck")}>
            Food Truck
          </TabsTrigger>
          <TabsTrigger value="sharedKitchen" onClick={() => setBusinessType("sharedKitchen")}>
            Shared Kitchen
          </TabsTrigger>
        </TabsList>
        <TabsContent value="restaurant">Restaurant-specific content</TabsContent>
        <TabsContent value="foodTruck">Food Truck-specific content</TabsContent>
        <TabsContent value="sharedKitchen">Shared Kitchen-specific content</TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
              <CardDescription>Number of orders received</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{orders.length}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Total revenue from orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Line data={revenueData} />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order Types</CardTitle>
              <CardDescription>Distribution of order types</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={orderTypeData} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.h2
        className="text-2xl font-bold mt-10 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Live Orders
      </motion.h2>
      <div className="grid gap-4 mb-8">
        {liveOrders.map((order: any) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Order #{order.id.slice(-4)}
                  <Badge>{order.status}</Badge>
                </CardTitle>
                <CardDescription>{order.customerName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Total: ${order.total}</p>
                <p>Items: {order.items.map((item: any) => item.name).join(", ")}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.h2
        className="text-2xl font-bold mt-10 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        AI Insights
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Profitability Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{profitabilityInsights}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Menu Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {menuRecommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.h2
        className="text-2xl font-bold mt-10 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        Integrated Systems
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src="/toast-logo.svg" alt="Toast Logo" className="h-6 w-auto mr-2" />
                Toast POS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Last synced: 5 minutes ago</p>
              <Button variant="outline" className="w-full">
                Sync Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src="/clover-logo.svg" alt="Clover Logo" className="h-6 w-auto mr-2" />
                Clover POS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Last synced: 15 minutes ago</p>
              <Button variant="outline" className="w-full">
                Sync Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src="/lightspeed-logo.svg" alt="Lightspeed Logo" className="h-6 w-auto mr-2" />
                Lightspeed POS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Last synced: 30 minutes ago</p>
              <Button variant="outline" className="w-full">
                Sync Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.h2
        className="text-2xl font-bold mt-10 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Recent Orders
      </motion.h2>
      <div className="grid gap-4">
        {orders.slice(0, 5).map((order: any, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{order.customerName}</CardTitle>
                <CardDescription>Order #{order.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <Button className="mt-6">View All Orders</Button>
      <Button onClick={handleLogout} className="mt-6 ml-4">
        Logout
      </Button>
    </div>
  )
}

