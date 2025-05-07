"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Our Mission</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between advanced AI technology and smallholder farmers to create sustainable agricultural
            practices and ensure food security for future generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why AI for Smallholder Farmers?</h3>
            <p className="text-gray-700 mb-6">
              Smallholder farmers produce over 70% of the world's food but often lack access to modern agricultural
              technologies. Our AI solutions are designed to be accessible, affordable, and specifically tailored to the
              unique challenges faced by small-scale farming operations.
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Our Vision:</strong> A world where every farmer, regardless of scale, has access to cutting-edge
              technology that enhances productivity while preserving the environment.
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Our Mission:</strong> To democratize agricultural technology by developing AI solutions that
              address the specific challenges faced by smallholder farmers in India and beyond.
            </p>
            <p className="text-gray-700">
              By democratizing access to cutting-edge AI technologies, we're helping farmers make data-driven decisions,
              optimize resource usage, increase crop yields, and build resilience against climate change.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { title: "Farmers Supported", value: "10,000+", color: "bg-green-100 text-green-800" },
              { title: "Crop Yield Increase", value: "Up to 30%", color: "bg-amber-100 text-amber-800" },
              { title: "Water Savings", value: "25% Avg.", color: "bg-blue-100 text-blue-800" },
              { title: "Countries", value: "12", color: "bg-purple-100 text-purple-800" },
            ].map((stat, index) => (
              <Card
                key={index}
                className={`border-none shadow-md ${isVisible ? "animate-fadeIn" : "opacity-0"}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className={`p-6 text-center ${stat.color}`}>
                  <p className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm font-medium">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
