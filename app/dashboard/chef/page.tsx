"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChefHat, ShoppingCart, Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Order {
  id: string
  customerName: string
  items: { name: string; price: number }[]
  total: number
  status: "pending" | "in-progress" | "ready" | "completed"
}

export default function ChefDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const router = useRouter()

  useEffect(() => {
    // Fetch initial data
    fetchOrders()

    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket("ws://localhost:3000/ws")
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "new_order") {
        setOrders((prevOrders) => [...prevOrders, data.order])
      }
    }

    return () => {
      ws.close()
    }
  }, [])

  const fetchOrders = async () => {
    // Simulated API call
    const response = await fetch("/api/chef-orders")
    const data = await response.json()
    setOrders(data)
  }

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    // Simulated API call to update order status
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })

    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
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
        Chef Dashboard
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((order) => order.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((order) => order.status === "in-progress").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((order) => order.status === "completed").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Current Orders</CardTitle>
          <CardDescription>Manage and update order statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.items.map((item) => item.name).join(", ")}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.status === "pending" && (
                      <Button onClick={() => updateOrderStatus(order.id, "in-progress")}>Start Cooking</Button>
                    )}
                    {order.status === "in-progress" && (
                      <Button onClick={() => updateOrderStatus(order.id, "ready")}>Mark as Ready</Button>
                    )}
                    {order.status === "ready" && (
                      <Button onClick={() => updateOrderStatus(order.id, "completed")}>Complete Order</Button>
                    )}
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

