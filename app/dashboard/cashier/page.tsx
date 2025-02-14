"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ShoppingCart, DollarSign, Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Order {
  id: string
  customerName: string
  items: { name: string; price: number; chefId: string }[]
  total: number
  status: "pending" | "in-progress" | "ready" | "completed"
  chefId: string
}

interface Chef {
  id: string
  name: string
}

export default function CashierDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [chefs, setChefs] = useState<Chef[]>([])
  const [newOrder, setNewOrder] = useState<Partial<Order>>({ items: [] })
  const router = useRouter()

  useEffect(() => {
    // Fetch initial data
    fetchOrders()
    fetchChefs()

    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket("ws://localhost:3000/ws")
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "order_update") {
        updateOrder(data.order)
      }
    }

    return () => {
      ws.close()
    }
  }, [])

  const fetchOrders = async () => {
    // Simulated API call
    const response = await fetch("/api/orders")
    const data = await response.json()
    setOrders(data)
  }

  const fetchChefs = async () => {
    // Simulated API call
    const response = await fetch("/api/chefs")
    const data = await response.json()
    setChefs(data)
  }

  const updateOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order)),
    )
  }

  const handleAddItem = () => {
    if (newOrder.itemName && newOrder.itemPrice && newOrder.chefId) {
      setNewOrder({
        ...newOrder,
        items: [
          ...(newOrder.items || []),
          { name: newOrder.itemName, price: Number.parseFloat(newOrder.itemPrice as string), chefId: newOrder.chefId },
        ],
        itemName: "",
        itemPrice: "",
        chefId: "",
      })
    }
  }

  const handleCreateOrder = async () => {
    if (newOrder.customerName && newOrder.items && newOrder.items.length > 0) {
      const order: Order = {
        id: `order-${Date.now()}`,
        customerName: newOrder.customerName,
        items: newOrder.items,
        total: newOrder.items.reduce((sum, item) => sum + item.price, 0),
        status: "pending",
        chefId: newOrder.items[0].chefId, // Assign to the chef of the first item for simplicity
      }

      // Simulated API call to create order
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })

      setOrders([...orders, order])
      setNewOrder({ items: [] })
    }
  }

  return (
    <div className="container py-10">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cashier Dashboard
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</div>
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
          <CardTitle>Create New Order</CardTitle>
          <CardDescription>Enter customer and order details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={newOrder.customerName || ""}
                onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={newOrder.itemName || ""}
                  onChange={(e) => setNewOrder({ ...newOrder, itemName: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="itemPrice">Price</Label>
                <Input
                  id="itemPrice"
                  type="number"
                  value={newOrder.itemPrice || ""}
                  onChange={(e) => setNewOrder({ ...newOrder, itemPrice: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="chefId">Chef</Label>
                <Select onValueChange={(value) => setNewOrder({ ...newOrder, chefId: value })}>
                  <SelectTrigger id="chefId">
                    <SelectValue placeholder="Select chef" />
                  </SelectTrigger>
                  <SelectContent>
                    {chefs.map((chef) => (
                      <SelectItem key={chef.id} value={chef.id}>
                        {chef.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddItem}>Add Item</Button>
            </div>
            {newOrder.items && newOrder.items.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Chef</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newOrder.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{chefs.find((chef) => chef.id === item.chefId)?.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <Button onClick={handleCreateOrder}>Create Order</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>View and manage recent orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Chef</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{chefs.find((chef) => chef.id === order.chefId)?.name}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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

