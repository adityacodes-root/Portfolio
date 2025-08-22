"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { SectionWrapper } from "../section-wrapper"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const testimonials = [
	{
		id: "chetan",
		name: "Chetan Garje",
		role: "Backend Developer | Python Engineer | API & Automation Specialist",
		quote:
			"I had the pleasure of working with Aditya on a project during his summer internship at Jio, and he was a real standout. He jumped into our work with confidence, whether it was streamlining backend code, or keeping things moving under tight deadlines. Aditya picks up new tech super fast, brings sharp ideas to the table, and gels with everyone like he's been part of the team forever. His positive energy and strong skills made our project better. He's got the kind of talent and drive that would make him a great fit for any team.",
		avatar: "/logos/jio.png",
		org: "Jio Platforms Ltd.",
	},
	{
		id: "bssk",
		name: "Mrs. Naganadhini S",
		role: "Executive Director , Bharatiya Samaj Seva Kendra",
		quote:
			"Aditya has been an invaluable asset to BSSK. His perseverance, dedication, and willingness to contribute towards our mission are qualities that will undoubtedly take him far!",
		avatar: "/logos/bssk.jpg",
		org: "Bharatiya Samaj Seva Kendra",
	},
]

export function TestimonialsSection() {
	const [active, setActive] = useState(testimonials[0])
	const [touchStart, setTouchStart] = useState<number | null>(null)
	const [touchEnd, setTouchEnd] = useState<number | null>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const minSwipeDistance = 50

	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null)
		setTouchStart(e.targetTouches[0].clientX)
	}

	const onTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX)
	}

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return
		const distance = touchStart - touchEnd
		const isLeftSwipe = distance > minSwipeDistance
		const isRightSwipe = distance < -minSwipeDistance
		if (isLeftSwipe) {
			const currentIndex = testimonials.findIndex(t => t.id === active.id)
			const nextIndex = (currentIndex + 1) % testimonials.length
			setActive(testimonials[nextIndex])
		} else if (isRightSwipe) {
			const currentIndex = testimonials.findIndex(t => t.id === active.id)
			const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
			setActive(testimonials[prevIndex])
		}
	}

	if (!isMounted) {
		return (
			<SectionWrapper id="testimonials">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						What Others Say
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">Testimonials from colleagues and mentors.</p>
				</div>
				<div className="w-full max-w-4xl mx-auto mt-12">
					<div className="h-64 bg-muted rounded-lg animate-pulse" />
				</div>
			</SectionWrapper>
		)
	}

	return (
		<SectionWrapper id="testimonials">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<motion.h2 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-3xl font-bold tracking-tight sm:text-4xl"
					>
						What Others Say
					</motion.h2>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
					>
						Testimonials from colleagues and mentors.
					</motion.p>
				</motion.div>

				{/* Tab Navigation (mirrors Experience) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="flex justify-center mb-8"
				>
					<div className="flex gap-1 p-1 rounded-xl border bg-card/50 backdrop-blur-sm">
						{testimonials.map((t) => (
							<button
								key={t.id}
								onClick={() => {
									setTimeout(() => setActive(t), 50)
								}}
								className={`relative flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none ${
									active.id === t.id
										? 'bg-primary text-primary-foreground shadow-lg pointer-events-none'
										: 'text-muted-foreground hover:text-foreground hover:bg-card/80'
								}`}
							>
								<div className={`relative h-6 w-6 rounded-lg border p-1 transition-all duration-300 ${
									active.id === t.id 
										? 'bg-primary-foreground/20 border-primary-foreground/30' 
										: 'bg-background/50 border-border'
								}`}>
									<Image
										src={t.avatar}
										alt={t.name}
										fill
										sizes="24px"
										className="object-contain rounded"
									/>
								</div>
								<span className="hidden sm:inline font-medium">{t.org}</span>
								{active.id === t.id && (
									<motion.div
										layoutId="activeTestimonialsTab"
										className="absolute inset-0 bg-primary rounded-lg -z-10 pointer-events-none"
										initial={false}
										transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
									/>
								)}
							</button>
						))}
					</div>
				</motion.div>

				{/* Content - Swipeable on mobile */}
				<div
					ref={contentRef}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					className="touch-pan-y"
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={active.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<Card className="border bg-card/50 backdrop-blur-sm">
								<CardHeader className="pb-6">
									<div className="flex flex-col sm:flex-row sm:items-start gap-6">
										{/* Avatar */}
										<div className="flex-shrink-0">
											<div className="relative h-16 w-16 rounded-xl border bg-background/50 p-3">
												<Image
													src={active.avatar}
													alt={active.name}
													fill
													sizes="64px"
													className="object-contain rounded"
												/>
											</div>
										</div>

										{/* Person Info */}
										<div className="flex-1 min-w-0">
											<CardTitle className="text-xl font-semibold tracking-tight mb-1">
												{active.name}
											</CardTitle>
											<p className="text-base font-medium text-muted-foreground">
												{active.role}
											</p>
										</div>
									</div>
								</CardHeader>

								<CardContent className="space-y-6">
									<div>
										<h4 className="text-sm font-medium text-muted-foreground mb-3">Recommendation</h4>
										<blockquote className="text-sm sm:text-base text-muted-foreground leading-relaxed">
											“{active.quote}”
										</blockquote>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</SectionWrapper>
	)
}
