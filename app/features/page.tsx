import { Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Order Management",
    description: "Streamline your order processing and delivery",
    benefits: [
      "Real-time order tracking",
      "Automated order routing",
      "Custom order notifications",
      "Order history and analytics",
    ],
  },
  {
    title: "Inventory Control",
    description: "Keep track of your inventory in real-time",
    benefits: ["Low stock alerts", "Automated reordering", "Waste tracking", "Inventory forecasting"],
  },
  {
    title: "Staff Management",
    description: "Efficiently manage your kitchen staff",
    benefits: ["Staff scheduling", "Performance tracking", "Time and attendance", "Payroll integration"],
  },
  {
    title: "Financial Tools",
    description: "Track and manage your finances",
    benefits: ["Sales reporting", "Expense tracking", "Profit analysis", "Financial forecasting"],
  },
  {
    title: "Customer Management",
    description: "Build better relationships with your customers",
    benefits: ["Customer profiles", "Order history", "Feedback management", "Loyalty programs"],
  },
  {
    title: "Analytics & Reporting",
    description: "Make data-driven decisions",
    benefits: ["Custom reports", "Real-time dashboards", "Performance metrics", "Trend analysis"],
  },
]

export default function FeaturesPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-[58rem] space-y-6 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">
          Powerful Features for
          <br className="hidden sm:inline" />
          Modern Kitchens
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Everything you need to run your kitchen operations efficiently and scale your business
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[85rem] gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
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
        <p className="text-lg text-muted-foreground">Join thousands of successful businesses using our platform</p>
        <Button size="lg" asChild className="mt-4">
          <Link href="/register">Start Free Trial</Link>
        </Button>
      </div>
    </div>
  )
}

