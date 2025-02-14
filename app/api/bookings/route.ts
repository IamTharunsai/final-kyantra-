import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch this data from your database
  const mockBookings = [
    {
      id: "booking1",
      userId: "user1",
      userName: "Chef Alice",
      spaceId: "space1",
      spaceName: "Kitchen A",
      startTime: "2023-06-15T14:00:00Z",
      endTime: "2023-06-15T16:00:00Z",
      status: "upcoming",
    },
    {
      id: "booking2",
      userId: "user2",
      userName: "Chef Bob",
      spaceId: "space2",
      spaceName: "Kitchen B",
      startTime: "2023-06-15T16:00:00Z",
      endTime: "2023-06-15T18:00:00Z",
      status: "upcoming",
    },
    {
      id: "booking3",
      userId: "user3",
      userName: "Chef Charlie",
      spaceId: "space4",
      spaceName: "Kitchen D",
      startTime: "2023-06-15T18:00:00Z",
      endTime: "2023-06-15T20:00:00Z",
      status: "upcoming",
    },
  ]

  return NextResponse.json(mockBookings)
}

