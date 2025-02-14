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
import { Calendar, ChefHat, DollarSign, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)

interface Chef {
  id: string
  name: string
  avatar: string
  status: "active" | "pending" | "inactive"
}

interface Booking {
  id: string
  chefId: string
  chefName: string
  space: string
  startTime: string
  endTime: string
  status: "upcoming" | "ongoing" | "completed"
}

interface KitchenSpace {
  id: string
  name: string
  status: "available" | "occupied" | "maintenance"
}

export default function SharedKitchenDashboard() {
  const [chefs, setChefs] = useState<Chef[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [kitchenSpaces, setKitchenSpaces] = useState<KitchenSpace[]>([])
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
  const [spaceUsageData, setSpaceUsageData] = useState({
    labels: [],
    datasets: [
      {
        label: "Space Usage",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
      },
    ],
  })
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/shared-kitchen-data")
        const data = await response.json()

        setChefs(data.chefs)
        setBookings(data.bookings)
        setKitchenSpaces(data.kitchenSpaces)

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

        setSpaceUsageData({
          labels: ["Available", "Occupied", "Maintenance"],
          datasets: [
            {
              label: "Space Usage",
              data: [
                data.kitchenSpaces.filter((space) => space.status === "available").length,
                data.kitchenSpaces.filter((space) => space.status === "occupied").length,
                data.kitchenSpaces.filter((space) => space.status === "maintenance").length,
              ],
              backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(255, 206, 86, 0.5)"],
            },
          ],
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()

    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket("ws://localhost:3000/ws")
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "booking_update") {
        setBookings((prevBookings) => {
          const updatedBookings = [...prevBookings]
          const index = updatedBookings.findIndex((booking) => booking.id === data.booking.id)
          if (index !== -1) {
            updatedBookings[index] = data.booking
          } else {
            updatedBookings.push(data.booking)
          }
          return updatedBookings
        })
      } else if (data.type === "space_update") {
        setKitchenSpaces((prevSpaces) => {
          const updatedSpaces = [...prevSpaces]
          const index = updatedSpaces.findIndex((space) => space.id === data.space.id)
          if (index !== -1) {
            updatedSpaces[index] = data.space
          }
          return updatedSpaces
        })
      }
    }

    return () => {
      ws.close()
    }
  }, [])

  if (loading) {
    return <div className="container py-10 text-center">Loading shared kitchen dashboard...</div>
  }

  return (
    <div className="container py-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Shared Kitchen Dashboard
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Chefs</CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{chefs.filter((chef) => chef.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">+2 new chefs this week</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings.filter((booking) => booking.status === "upcoming" || booking.status === "ongoing").length}
              </div>
              <p className="text-xs text-muted-foreground">+5 from yesterday</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Spaces</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kitchenSpaces.filter((space) => space.status === "available").length}
              </div>
              <p className="text-xs text-muted-foreground">Out of {kitchenSpaces.length} total spaces</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={revenueData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Space Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={spaceUsageData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Live Kitchen Monitoring</CardTitle>
            <CardDescription>Current kitchen space status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {kitchenSpaces.map((space) => (
                <div
                  key={space.id}
                  className={`p-4 rounded-lg ${
                    space.status === "available"
                      ? "bg-green-100"
                      : space.status === "occupied"
                        ? "bg-red-100"
                        : "bg-yellow-100"
                  }`}
                >
                  <p className="font-semibold">{space.name}</p>
                  <p className="text-sm capitalize">{space.status}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Next 5 scheduled kitchen slots</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {bookings
                .filter((booking) => booking.status === "upcoming")
                .slice(0, 5)
                .map((booking) => (
                  <div key={booking.id} className="flex items-center mb-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/avatars/${booking.chefId}.png`} alt={booking.chefName} />
                      <AvatarFallback>{booking.chefName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{booking.chefName}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.space} - {new Date(booking.startTime).toLocaleTimeString()} to{" "}
                        {new Date(booking.endTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Chef Management</CardTitle>
            <CardDescription>Approve and manage chef accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {chefs.map((chef) => (
                <div key={chef.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={chef.avatar} alt={chef.name} />
                      <AvatarFallback>{chef.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{chef.name}</p>
                      <p className="text-sm text-muted-foreground">{chef.status}</p>
                    </div>
                  </div>
                  <Button variant={chef.status === "active" ? "outline" : "default"} size="sm">
                    {chef.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Button onClick={() => router.push("/")} className="mt-6">
        Back to Home
      </Button>
    </div>
  )
}

