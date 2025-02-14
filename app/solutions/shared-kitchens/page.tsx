import { Check, Clock, Shield, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Smart Scheduling & Space Management",
    description: "Automated time-slot booking for kitchen usage",
    icon: Clock,
    benefits: [
      "Real-time availability tracking",
      "Equipment & storage management",
      "Automated scheduling system",
      "Space optimization tools",
    ],
  },
  {
    title: "Compliance & Safety",
    description: "Maintain high standards of food safety and compliance",
    icon: Shield,
    benefits: ["HACCP compliance tracking", "Digital safety logs", "Temperature monitoring", "Inspection readiness"],
  },
  {
    title: "Staff & User Management",
    description: "Efficiently manage kitchen staff and tenants",
    icon: Users,
    benefits: ["User access control", "Staff scheduling", "Performance tracking", "Communication tools"],
  },
]

export default function SharedKitchensPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-[58rem] space-y-6 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">Shared Kitchen Solutions</h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Streamline your shared kitchen operations with our comprehensive management platform
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
        <p className="text-lg text-muted-foreground">Join successful shared kitchens using our platform</p>
        <Button size="lg" asChild>
          <Link href="/register">Start Free Trial</Link>
        </Button>
      </div>
    </div>
  )
}

