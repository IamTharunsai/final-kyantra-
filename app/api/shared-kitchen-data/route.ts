import { NextResponse } from "next/server"

export async function GET() {
  // Simulated data
  const mockData = {
    chefs: Array.from({ length: 10 }, (_, i) => ({
      id: `chef-${i + 1}`,
      name: `Chef ${i + 1}`,
      avatar: `/avatars/chef-${i + 1}.png`,
      status: ["active", "pending", "inactive"][Math.floor(Math.random() * 3)],
    })),
    bookings: Array.from({ length: 20 }, (_, i) => {
      const startTime = new Date()
      startTime.setHours(startTime.getHours() + i)
      const endTime = new Date(startTime)
      endTime.setHours(endTime.getHours() + 2)
      return {
        id: `booking-${i + 1}`,
        chefId: `chef-${Math.floor(Math.random() * 10) + 1}`,
        chefName: `Chef ${Math.floor(Math.random() * 10) + 1}`,
        space: `Kitchen Space ${Math.floor(Math.random() * 5) + 1}`,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: ["upcoming", "ongoing", "completed"][Math.floor(Math.random() * 3)],
      }
    }),
    kitchenSpaces: Array.from({ length: 5 }, (_, i) => ({
      id: `space-${i + 1}`,
      name: `Kitchen Space ${i + 1}`,
      status: ["available", "occupied", "maintenance"][Math.floor(Math.random() * 3)],
    })),
    revenueDates: Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toLocaleDateString()
    }).reverse(),
    revenueAmounts: Array.from({ length: 7 }, () => Math.floor(Math.random() * 5000) + 1000),
  }

  return NextResponse.json(mockData)
}

