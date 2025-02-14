"use client"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [userType, setUserType] = useState("user")
  const [businessType, setBusinessType] = useState("restaurant")
  const [error, setError] = useState("")
  const [showWelcome, setShowWelcome] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        userType,
        businessType: userType === "business" ? businessType : null,
      })

      setShowWelcome(true)
    } catch (error) {
      setError("Failed to create an account. Please try again.")
    }
  }

  const handleContinueToDashboard = () => {
    setShowWelcome(false)
    router.push("/dashboard")
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <motion.div initial="initial" animate="animate" exit="exit" variants={fadeInUp} className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Join Kyantra</CardTitle>
            <CardDescription className="text-center">
              Create your account and start managing your kitchen
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="sr-only">
                  Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup defaultValue="user" onValueChange={(value) => setUserType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">Regular User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business">Business Owner</Label>
                  </div>
                </RadioGroup>
              </div>
              {userType === "business" && (
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select onValueChange={(value) => setBusinessType(value)}>
                    <SelectTrigger id="businessType">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="foodTruck">Food Truck</SelectItem>
                      <SelectItem value="sharedKitchen">Shared Kitchen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit">
                Create Account
              </Button>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showWelcome && (
          <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Welcome to Kyantra!</DialogTitle>
                <DialogDescription>
                  Thank you for joining us. Here are some quick tips to get you started:
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <ul className="list-disc pl-4 space-y-2">
                  <li>Complete your profile to personalize your experience</li>
                  <li>Explore the dashboard to see your business insights</li>
                  <li>Set up your first menu or inventory items</li>
                  <li>Invite your team members to collaborate</li>
                </ul>
              </div>
              <DialogFooter>
                <Button onClick={handleContinueToDashboard}>Continue to Dashboard</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

