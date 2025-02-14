"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)

export default function DashboardPage({ params }: { params: { type: string } }) {
  const [businessType, setBusinessType] = useState(params.type)
  const [orders, setOrders] = useState([])
  const [liveOrders, setLiveOrders] = useState([])
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

  useEffect(() => {
    // Simulating data fetch
    const fetchData = async () => {
      // Simulated API call
      const response = await fetch("/api/mock-dashboard-data")
      const data = await response.json()

      setOrders(data.orders)
      setLiveOrders(data.liveOrders)

      // Update revenue data
      setRevenueData({
        labels: data.revenueDates,
        datasets: [
          {
            label: "Revenue",
            data: data.revenueAmounts,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      })

      // Update order type data
      setOrderTypeData({
        labels: ["Dine-in", "Takeout", "Delivery"],
        datasets: [
          {
            label: "Order Types",
            data: [data.dineInOrders, data.takeoutOrders, data.deliveryOrders],
            backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
          },
        ],
      })

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="container py-10 text-center">Loading dashboard...</div>
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

      <Button onClick={() => router.push("/")}>Back to Home</Button>
    </div>
  )
}

