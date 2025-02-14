import { ArrowRight, BarChart, Clock, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AIChatbot } from "@/components/ai-chatbot"
import { MotionDiv, MotionSection } from "@/components/motion-wrapper"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function Page() {
  return (
    <>
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col items-center gap-4 pb-12 pt-24 text-center md:pb-16 md:pt-32"
      >
        <MotionDiv
          className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Revolutionize Your Kitchen Operations
          <br className="hidden sm:inline" />
          with Kyantra
        </MotionDiv>
        <MotionDiv
          className="max-w-[640px] text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Efficient solutions for shared kitchens, food trucks, and restaurants. Manage orders, inventory, and staff all
          in one place.
        </MotionDiv>
        <MotionDiv
          className="flex flex-col gap-4 min-[400px]:flex-row"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button size="lg" asChild>
            <Link href="/role-selection">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </MotionDiv>
      </MotionSection>

      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <MotionDiv className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center" {...fadeIn}>
          <MotionDiv variants={fadeIn}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-Dm6y1mNAhe3d30mIwBGKyso59KbcTd.png"
              alt="Kyantra Logo"
              className="mx-auto mb-8 h-24 object-contain"
            />
          </MotionDiv>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to manage your kitchen operations efficiently
          </p>
        </MotionDiv>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <MotionDiv {...fadeInUp} transition={{ delay: 0.2 }}>
            <Card className="flex h-[180px] flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <CardTitle className="text-lg">Real-time Analytics</CardTitle>
                </div>
                <CardDescription>Track performance and make data-driven decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/features" className="flex items-center text-sm text-primary hover:underline">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </MotionDiv>
          <MotionDiv {...fadeInUp} transition={{ delay: 0.3 }}>
            <Card className="flex h-[180px] flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <CardTitle className="text-lg">Efficient Scheduling</CardTitle>
                </div>
                <CardDescription>Optimize staff and kitchen resource allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/features" className="flex items-center text-sm text-primary hover:underline">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </MotionDiv>
          <MotionDiv {...fadeInUp} transition={{ delay: 0.4 }}>
            <Card className="flex h-[180px] flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <CardTitle className="text-lg">Team Collaboration</CardTitle>
                </div>
                <CardDescription>Streamline communication and task management</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/features" className="flex items-center text-sm text-primary hover:underline">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </MotionSection>

      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <MotionDiv className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center" {...fadeInUp}>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">Why Choose Kyantra</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Discover the unique advantages that set us apart in kitchen management
          </p>
        </MotionDiv>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <MotionDiv {...fadeInUp} transition={{ delay: 0.7 }}>
            <Card className="flex h-[180px] flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <CardTitle className="text-lg">AI-Driven Insights</CardTitle>
                </div>
                <CardDescription>Make data-driven decisions with our advanced analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/features" className="flex items-center text-sm text-primary hover:underline">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </MotionDiv>
          <MotionDiv {...fadeInUp} transition={{ delay: 0.8 }}>
            <Card className="flex h-[180px] flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <CardTitle className="text-lg">Multi-Platform Integration</CardTitle>
                </div>
                <CardDescription>Seamlessly connect with your existing tools and systems</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/features" className="flex items-center text-sm text-primary hover:underline">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </MotionDiv>
          <MotionDiv {...fadeInUp} transition={{ delay: 0.9 }}>
            <Card className="flex h-[180px] flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <CardTitle className="text-lg">24/7 Expert Support</CardTitle>
                </div>
                <CardDescription>Get help whenever you need it with our dedicated support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/features" className="flex items-center text-sm text-primary hover:underline">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </MotionSection>

      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="container py-8 md:py-12 lg:py-24"
      >
        <MotionDiv className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center" {...fadeInUp}>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">What Our Customers Say</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Hear from restaurant owners who made the switch to Kyantra
          </p>
        </MotionDiv>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Game-Changing Platform</CardTitle>
              <CardDescription>Former Toast User</CardDescription>
            </CardHeader>
            <CardContent>
              "Switching to Kyantra was the best decision we made for our restaurant. The AI-driven insights have helped
              us optimize our menu and reduce waste significantly."
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Incredible Support</CardTitle>
              <CardDescription>Former Clover User</CardDescription>
            </CardHeader>
            <CardContent>
              "The 24/7 support from Kyantra is unmatched. They've helped us streamline our operations and increase our
              overall efficiency."
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Seamless Integration</CardTitle>
              <CardDescription>Former Lightspeed User</CardDescription>
            </CardHeader>
            <CardContent>
              "Kyantra's ability to integrate with multiple platforms has allowed us to keep our existing systems while
              gaining powerful new features and insights."
            </CardContent>
          </Card>
        </div>
      </MotionSection>

      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="container py-8 md:py-12 lg:py-24"
      >
        <MotionDiv
          className="relative overflow-hidden rounded-lg bg-primary px-6 py-16 md:px-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 mx-auto max-w-[64rem] text-center text-white">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Kitchen Operations?</h2>
            <p className="mb-6 text-lg opacity-90">Join thousands of successful food businesses using Kyantra</p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/register">Start Your Free Trial</Link>
            </Button>
          </div>
        </MotionDiv>
      </MotionSection>

      <AIChatbot />
    </>
  )
}

