"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send, MapPin, Phone, Copy, Check } from "lucide-react"
import { SectionWrapper } from "../section-wrapper"
import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    value: "aditya.d2676@gmail.com",
    link: "mailto:aditya.d2676@gmail.com",
    copyable: true,
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Location",
    value: "Mumbai",
    link: "#",
    copyable: false,
  },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      // Use the form endpoint with proper encoding
      const response = await fetch("https://formspree.io/f/xwpvdprd", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: new URLSearchParams(formData as any)
      })

      if (response.ok) {
        toast.success("Message sent successfully")
        form.reset()
      } else {
        const data = await response.json().catch(() => ({}))
        console.error('Form submission error:', data)
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyEmail = async (e: React.MouseEvent, email: string) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(true)
      toast.success("Email copied to clipboard")
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      toast.error("Failed to copy email")
    }
  }

  return (
    <SectionWrapper id="contact">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Let's Connect
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          Have a project in mind or want to discuss opportunities? I'd love to hear from you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form - First on mobile, left side on desktop */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 order-1 lg:order-2"
        >
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                encType="application/x-www-form-urlencoded"
              >
                <input type="hidden" name="_subject" value="New Contact Form Submission" />
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input 
                      id="name" 
                      name="name"
                      type="text"
                      placeholder="Your Name" 
                      className="bg-background/50 backdrop-blur-sm"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="Your Email" 
                      className="bg-background/50 backdrop-blur-sm"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input 
                    id="subject" 
                    name="subject"
                    type="text"
                    placeholder="Subject" 
                    className="bg-background/50 backdrop-blur-sm"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Your Message" 
                    rows={5} 
                    className="bg-background/50 backdrop-blur-sm resize-none"
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full group relative overflow-hidden"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information - Second on mobile, right side on desktop */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-6 order-2 lg:order-1"
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors group relative"
            >
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {info.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{info.title}</h3>
                <p className="text-sm text-muted-foreground">{info.value}</p>
              </div>
              {info.copyable && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={(e) => handleCopyEmail(e, info.value)}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </motion.a>
          ))}

          <div className="flex gap-4 pt-4">
            <Button variant="outline" size="icon" asChild className="hover:bg-primary/10">
              <a href="https://github.com/adityacodes-root" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild className="hover:bg-primary/10">
              <a href="https://www.linkedin.com/in/aditya-dubey-438a11301/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
