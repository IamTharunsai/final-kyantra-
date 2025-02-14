import { NextResponse } from "next/server"

const orders = []

export async function GET() {
  return NextResponse.json(orders)
}

export async function POST(req: Request) {
  const newOrder = await req.json()
  orders.push(newOrder)
  return NextResponse.json(newOrder, { status: 201 })
}

