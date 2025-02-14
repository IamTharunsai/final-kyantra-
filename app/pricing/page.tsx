"use client"

import { Check, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const plans = [
  {
    name: "Starter",
    price: { monthly: 49, annual: 470 },
    description: "Perfect for food trucks and small vendors",
    features: [
      "Basic order management",
      "Simple inventory tracking",
      "Up to 2 user accounts",
      "Basic reporting",
      "Email support",
      "Integration with 1 POS system",
    ],
  },
  {
    name: "Pro",
    price: { monthly: 99, annual: 950 },
    description: "Ideal for shared kitchens and growing businesses",
    features: [
      "Advanced order management",
      "Comprehensive inventory control",
      "Up to 10 user accounts",
      "Advanced analytics",
      "Priority email and chat support",
      "Staff scheduling",
      "Menu optimization",
      "Integration with 2 POS systems",
      "Basic API access",
    ],
  },
  {
    name: "Enterprise",
    price: { monthly: 199, annual: 1990 },
    description: "For large restaurants and multi-location operations",
    features: [
      "Full-suite order and kitchen management",
      "Advanced inventory and supply chain management",
      "Unlimited user accounts",
      "Custom reporting and AI-driven insights",
      "24/7 priority support",
      "Advanced staff management",
      "Multi-location support",
      "Integration with all supported POS systems",
      "Full API access for custom integrations",
    ],
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-[58rem] space-y-6 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground sm:text-xl">Choose the plan that's right for your business</p>
      </div>

      <div className="mt-8 flex items-center justify-center space-x-4">
        <span className="text-sm font-medium">Monthly</span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-primary" />
        <span className="text-sm font-medium">Annual (Save 20%)</span>
      </div>

      <div className="mx-auto mt-16 grid max-w-[85rem] gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4 text-center">
                  <span className="text-4xl font-bold">${isAnnual ? plan.price.annual : plan.price.monthly}</span>
                  <span className="text-muted-foreground">{isAnnual ? "/year" : "/month"}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-[58rem] space-y-6 text-center">
        <h2 className="text-3xl font-bold">Need a Custom Solution?</h2>
        <p className="text-lg text-muted-foreground">Contact us for tailored plans to fit your specific needs</p>
        <Button size="lg" variant="outline" asChild>
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>

      <TooltipProvider>
        <div className="mt-12 text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" className="text-muted-foreground">
                Compare Plans <HelpCircle className="ml-1 h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to see a detailed comparison of all plan features</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}

