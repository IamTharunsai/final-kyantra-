import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch this data from your database
  const mockKitchenSpaces = [
    { id: "space1", name: "Kitchen A", status: "available", nextBooking: "2023-06-15 14:00" },
    { id: "space2", name: "Kitchen B", status: "occupied", currentUser: "Chef John", nextBooking: "2023-06-15 16:00" },
    { id: "space3", name: "Kitchen C", status: "maintenance" },
    { id: "space4", name: "Kitchen D", status: "available", nextBooking: "2023-06-15 18:00" },
  ]

  return NextResponse.json(mockKitchenSpaces)
}

