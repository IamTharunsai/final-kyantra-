import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch orders for the specific chef from your database
  // For this example, we'll return some mock data
  const mockOrders = [
    {
      id: "order-1",
      customerName: "John Doe",
      items: [
        { name: "Burger", price: 10 },
        { name: "Fries", price: 5 },
      ],
      total: 15,
      status: "pending",
    },
    {
      id: "order-2",
      customerName: "Jane Smith",
      items: [
        { name: "Pizza", price: 12 },
        { name: "Salad", price: 8 },
      ],
      total: 20,
      status: "in-progress",
    },
  ]

  return NextResponse.json(mockOrders)
}

