"use client"

import { ArrowRight, BarChart, ChefHat, Github, Linkedin, Mail, Target, Twitter, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionDiv, MotionSection } from "@/components/motion-wrapper"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function AboutPage() {
  return (
    <div className="container py-10">
      {/* Hero Section */}
      <MotionSection className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
        <MotionDiv
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">Meet Our Founder</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Tharun sai Nandigam is a visionary tech entrepreneur and Computer Science graduate student at Wright State
            University, passionate about revolutionizing kitchen operations through innovative software solutions.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://www.linkedin.com/in/tech-entrepreneur-tharun" target="_blank">
                View LinkedIn
              </Link>
            </Button>
          </div>
        </MotionDiv>
        <MotionDiv
          className="relative w-full md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pic%20.jpg-duiUkscbCWm8J6IpqTUO9uvjFf51vQ.jpeg"
            alt="Tharun sai Nandigam"
            className="rounded-lg shadow-lg"
          />
        </MotionDiv>
      </MotionSection>

      {/* Founder's Journey */}
      <MotionSection variants={stagger} initial="initial" animate="animate">
        <MotionDiv variants={fadeIn}>
          <h2 className="mb-8 text-center text-3xl font-bold">The Journey Behind Kyantra</h2>
        </MotionDiv>
        <MotionDiv variants={fadeIn} className="space-y-6 text-lg">
          <p>
            As a Computer Science graduate student at Wright State University, Tharun sai Nandigam recognized the
            challenges faced by small and medium-sized food businesses. Drawing from his technical expertise and passion
            for innovation, he set out to create a solution that would level the playing field.
          </p>
          <p>
            Tharun's vision for Kyantra was born from his experiences and observations in the food industry. He saw
            firsthand how inefficient operations and lack of advanced tools were holding back talented chefs and food
            entrepreneurs. This inspired him to develop a comprehensive platform that could empower these businesses
            with enterprise-level capabilities.
          </p>
          <p>
            With a strong foundation in programming, data integration, and automation, Tharun leads the technical
            development of Kyantra. His goal is to create intuitive, AI-driven solutions that transform raw data into
            actionable insights, helping food businesses thrive in a competitive market.
          </p>
        </MotionDiv>
      </MotionSection>

      {/* Vision & Mission */}
      <MotionSection variants={stagger} initial="initial" animate="animate">
        <div className="mb-12 text-center">
          <MotionDiv variants={fadeIn}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-aeuFNUc81RnfZiJJ5iI5SaUhodztMy.png"
              alt="Kyantra Logo"
              className="mx-auto mb-8 h-24"
            />
          </MotionDiv>
          <MotionDiv variants={fadeIn}>
            <h2 className="mb-4 text-3xl font-bold">Our Vision & Mission</h2>
          </MotionDiv>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <MotionDiv variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  "Enabling small and medium-sized kitchens to operate like top-tier enterprises."
                </p>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  "To revolutionize shared kitchens and food businesses with intuitive software solutions."
                </p>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Key Features */}
      <MotionSection variants={stagger} initial="initial" animate="animate">
        <MotionDiv variants={fadeIn}>
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Kyantra</h2>
        </MotionDiv>

        <div className="grid gap-6 md:grid-cols-3">
          <MotionDiv variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Smart Analytics
                </CardTitle>
                <CardDescription>AI-driven insights for growth and profitability</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Use advanced analytics to make data-driven decisions and optimize your operations.</p>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  Centralized Operations
                </CardTitle>
                <CardDescription>Streamlined workflow management</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Manage orders, inventory, and staff all in one place with our intuitive platform.</p>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Customer Engagement
                </CardTitle>
                <CardDescription>Build lasting relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Enhance customer satisfaction with loyalty programs and real-time updates.</p>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Founder's Message */}
      <MotionSection initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>A Message from Our Founder</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              "At Kyantra, we're not just building software; we're empowering dreams. Every chef, food truck owner, and
              restaurateur has a unique vision, and our mission is to provide the technological foundation that turns
              those visions into thriving realities. Together, we're not just changing how kitchens operate – we're
              transforming the future of the food industry."
            </blockquote>
            <p className="mt-4 text-right font-semibold">- Tharun sai Nandigam, Founder of Kyantra</p>
          </CardContent>
        </Card>
      </MotionSection>

      {/* Connect with Tharun */}
      <MotionSection initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="mb-8 text-center text-3xl font-bold">Connect with Tharun</h2>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="https://www.linkedin.com/in/tech-entrepreneur-tharun" target="_blank">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://github.com/tharunsai-nandigam" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://twitter.com/tharunsai_n" target="_blank">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="mailto:tharunsai2081@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Link>
          </Button>
        </div>
      </MotionSection>

      {/* CTA Section */}
      <MotionSection initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="rounded-lg bg-primary p-8 text-center text-white md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Kitchen Operations?</h2>
          <p className="mb-6 text-lg opacity-90">Join thousands of successful food businesses using Kyantra</p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link href="/register">Start Your Free Trial</Link>
          </Button>
        </div>
      </MotionSection>
    </div>
  )
}

