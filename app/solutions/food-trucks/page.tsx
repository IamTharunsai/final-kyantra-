import { BarChart, Check, MapPin, Smartphone } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "AI-Powered Sales & Location Analytics",
    description: "Optimize your routes and maximize revenue",
    icon: BarChart,
    benefits: ["Sales trend analysis", "Location optimization", "Customer density mapping", "Revenue forecasting"],
  },
  {
    title: "Mobile POS & Payments",
    description: "Process orders and payments anywhere",
    icon: Smartphone,
    benefits: ["Contactless payments", "QR code ordering", "Digital receipts", "Offline mode support"],
  },
  {
    title: "Route Planning & Location Management",
    description: "Find the best spots for your food truck",
    icon: MapPin,
    benefits: ["Real-time location tracking", "Popular spot identification", "Event scheduling", "Permit management"],
  },
]

export default function FoodTrucksPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-[58rem] space-y-6 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">Food Truck Solutions</h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Maximize your food truck's potential with our mobile-first management platform
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[85rem] gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <feature.icon className="h-6 w-6 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-[58rem] space-y-6 text-center">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground">Join successful food trucks using our platform</p>
        <Button size="lg" asChild>
          <Link href="/register">Start Free Trial</Link>
        </Button>
      </div>
    </div>
  )
}

