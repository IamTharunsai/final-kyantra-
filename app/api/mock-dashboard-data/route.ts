import { NextResponse } from "next/server"

export async function GET() {
  // Simulated data
  const mockData = {
    orders: Array.from({ length: 50 }, (_, i) => ({
      id: `order-${i + 1}`,
      customerName: `Customer ${i + 1}`,
      total: Math.floor(Math.random() * 100) + 20,
      status: ["pending", "preparing", "ready", "delivered"][Math.floor(Math.random() * 4)],
      items: [{ name: "Item 1" }, { name: "Item 2" }],
    })),
    liveOrders: Array.from({ length: 5 }, (_, i) => ({
      id: `live-order-${i + 1}`,
      customerName: `Live Customer ${i + 1}`,
      total: Math.floor(Math.random() * 100) + 20,
      status: ["pending", "preparing", "ready"][Math.floor(Math.random() * 3)],
      items: [{ name: "Live Item 1" }, { name: "Live Item 2" }],
    })),
    revenueDates: Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toLocaleDateString()
    }).reverse(),
    revenueAmounts: Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000) + 500),
    dineInOrders: Math.floor(Math.random() * 100),
    takeoutOrders: Math.floor(Math.random() * 100),
    deliveryOrders: Math.floor(Math.random() * 100),
  }

  return NextResponse.json(mockData)
}

