"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { SectionWrapper } from "../section-wrapper"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const testimonials = [
  {
    name: "Mrs. Naganadhini S",
    role: "Executive Director , Bharatiya Samaj Seva Kendra",
    quote:
      "Aditya has been an invaluable asset to BSSK. His perseverance, dedication, and willingness to contribute towards our mission are qualities that will undoubtedly take him far!",
    avatar: "/logos/bssk.jpg",
  },
]

export function TestimonialsSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <SectionWrapper id="testimonials">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            What Others Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Testimonials from colleagues and mentors.</p>
        </div>
        <div className="w-full max-w-2xl mx-auto mt-12">
          <Card className="relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            <CardContent className="relative p-6 sm:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 rounded-full border-4 border-primary/10 bg-muted" />
                </div>
                <div className="h-24 w-full bg-muted rounded-lg mb-6" />
                <div className="h-6 w-32 bg-muted rounded" />
                <div className="h-4 w-48 bg-muted rounded mt-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="testimonials">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          What Others Say
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">Testimonials from colleagues and mentors.</p>
      </div>
      
      <div className="w-full max-w-2xl mx-auto mt-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <CardContent className="relative p-6 sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl" />
                    <div className="relative w-20 h-20">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        sizes="(max-width: 640px) 80px, 80px"
                        className="rounded-full border-4 border-primary/10 object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <blockquote className="text-lg sm:text-xl text-muted-foreground italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
