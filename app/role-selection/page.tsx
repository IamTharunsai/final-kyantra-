"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, User, ChefHat, CreditCard, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RoleSelectionPage() {
  const [role, setRole] = useState<string | undefined>()
  const [businessType, setBusinessType] = useState<string | undefined>()
  const router = useRouter()

  const handleContinue = () => {
    if (role === "owner" && !businessType) {
      alert("Please select a business type")
      return
    }

    let dashboardPath = "/dashboard/general"
    if (role === "owner") {
      dashboardPath = `/dashboard/${businessType}`
    } else if (role === "chef" || role === "staff" || role === "cashier" || role === "kitchen-manager") {
      dashboardPath = `/dashboard/${role}`
    }

    router.push(dashboardPath)
  }

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Kyantra</CardTitle>
          <CardDescription className="text-center">Please select your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Button
              variant={role === "owner" ? "default" : "outline"}
              className="h-24"
              onClick={() => setRole("owner")}
            >
              <div className="flex flex-col items-center">
                <Building2 className="mb-2 h-6 w-6" />
                <span>Owner</span>
              </div>
            </Button>
            <Button variant={role === "chef" ? "default" : "outline"} className="h-24" onClick={() => setRole("chef")}>
              <div className="flex flex-col items-center">
                <ChefHat className="mb-2 h-6 w-6" />
                <span>Chef</span>
              </div>
            </Button>
            <Button
              variant={role === "cashier" ? "default" : "outline"}
              className="h-24"
              onClick={() => setRole("cashier")}
            >
              <div className="flex flex-col items-center">
                <CreditCard className="mb-2 h-6 w-6" />
                <span>Cashier</span>
              </div>
            </Button>
            <Button
              variant={role === "staff" ? "default" : "outline"}
              className="h-24"
              onClick={() => setRole("staff")}
            >
              <div className="flex flex-col items-center">
                <User className="mb-2 h-6 w-6" />
                <span>Staff</span>
              </div>
            </Button>
            <Button
              variant={role === "kitchen-manager" ? "default" : "outline"}
              className="h-24"
              onClick={() => setRole("kitchen-manager")}
            >
              <div className="flex flex-col items-center">
                <Clock className="mb-2 h-6 w-6" />
                <span>Kitchen Manager</span>
              </div>
            </Button>
          </div>
          {role === "owner" && (
            <Select onValueChange={setBusinessType}>
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="foodTruck">Food Truck</SelectItem>
                <SelectItem value="sharedKitchen">Shared Kitchen</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button className="w-full" onClick={handleContinue} disabled={!role || (role === "owner" && !businessType)}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

