import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Contact Sales</CardTitle>
          <CardDescription>Get in touch with our sales team</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message">Message</label>
              <Textarea id="message" placeholder="Your message" />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

