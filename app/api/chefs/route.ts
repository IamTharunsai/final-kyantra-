import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch chefs from your database
  // For this example, we'll return some mock data
  const mockChefs = [
    { id: "chef-1", name: "Chef Gordon" },
    { id: "chef-2", name: "Chef Jamie" },
    { id: "chef-3", name: "Chef Julia" },
  ]

  return NextResponse.json(mockChefs)
}

