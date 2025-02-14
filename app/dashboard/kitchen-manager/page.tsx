"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Users, Utensils, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface KitchenSpace {
  id: string
  name: string
  status: "available" | "occupied" | "maintenance"
  currentUser?: string
  nextBooking?: string
}

interface Booking {
  id: string
  userId: string
  userName: string
  spaceId: string
  spaceName: string
  startTime: string
  endTime: string
  status: "upcoming" | "active" | "completed"
}

export default function KitchenManagerDashboard() {
  const [kitchenSpaces, setKitchenSpaces] = useState<KitchenSpace[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const router = useRouter()

  useEffect(() => {
    // Fetch kitchen spaces and bookings
    fetchKitchenSpaces()
    fetchBookings()

    // Set up WebSocket for real-time updates
    const ws = new WebSocket("ws://localhost:3000/ws")
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "space_update") {
        updateKitchenSpace(data.space)
      } else if (data.type === "booking_update") {
        updateBooking(data.booking)
      }
    }

    return () => {
      ws.close()
    }
  }, [])

  const fetchKitchenSpaces = async () => {
    // Simulated API call
    const response = await fetch("/api/kitchen-spaces")
    const data = await response.json()
    setKitchenSpaces(data)
  }

  const fetchBookings = async () => {
    // Simulated API call
    const response = await fetch("/api/bookings")
    const data = await response.json()
    setBookings(data)
  }

  const updateKitchenSpace = (updatedSpace: KitchenSpace) => {
    setKitchenSpaces((prevSpaces) => prevSpaces.map((space) => (space.id === updatedSpace.id ? updatedSpace : space)))
  }

  const updateBooking = (updatedBooking: Booking) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => (booking.id === updatedBooking.id ? updatedBooking : booking)),
    )
  }

  return (
    <div className="container py-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Kitchen Manager Dashboard
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kitchenSpaces.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Spaces</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kitchenSpaces.filter((space) => space.status === "available").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kitchenSpaces.filter((space) => space.status === "occupied").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Required</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kitchenSpaces.filter((space) => space.status === "maintenance").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Kitchen Spaces</CardTitle>
          <CardDescription>Current status of all kitchen spaces</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Space Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current User</TableHead>
                <TableHead>Next Booking</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kitchenSpaces.map((space) => (
                <TableRow key={space.id}>
                  <TableCell>{space.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        space.status === "available"
                          ? "success"
                          : space.status === "occupied"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {space.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{space.currentUser || "N/A"}</TableCell>
                  <TableCell>{space.nextBooking || "No upcoming bookings"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Next 5 scheduled kitchen slots</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Space</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.slice(0, 5).map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.userName}</TableCell>
                  <TableCell>{booking.spaceName}</TableCell>
                  <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
                  <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "upcoming"
                          ? "secondary"
                          : booking.status === "active"
                            ? "default"
                            : "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Button onClick={() => router.push("/")} className="mt-6">
        Back to Home
      </Button>
    </div>
  )
}

