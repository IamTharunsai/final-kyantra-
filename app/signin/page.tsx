"use client"

import { useState } from "react"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
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

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
      }
      router.push("/dashboard")
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.")
    }
  }

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email)
      setResetEmailSent(true)
    } catch (error) {
      setError("Failed to send reset email. Please check your email address.")
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <motion.div initial="initial" animate="animate" exit="exit" variants={fadeInUp} className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/30 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to your Kyantra account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSignIn}>
            <CardContent className="space-y-4">
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
                    placeholder="Enter your password"
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
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={setRememberMe} />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit">
                Sign In
              </Button>
              <Button variant="link" className="mt-2" onClick={() => setShowResetPassword(true)}>
                Forgot password?
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
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showResetPassword && (
          <Dialog open={showResetPassword} onOpenChange={setShowResetPassword}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleResetPassword} disabled={resetEmailSent}>
                  {resetEmailSent ? "Email Sent" : "Send Reset Link"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

