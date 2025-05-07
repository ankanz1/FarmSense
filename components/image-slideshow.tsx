"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  image: string
  title: string
  description: string
}

export function ImageSlideshow() {
  const slides: Slide[] = [
    {
      image: "/images/farmer-harvesting.jpeg",
      title: "Empowering Traditional Farmers",
      description:
        "FarmSense helps smallholder farmers increase yields and improve livelihoods through accessible AI technology.",
    },
    {
      image: "/images/aerial-harvesting.jpeg",
      title: "Modernizing Agricultural Practices",
      description:
        "Optimize harvesting schedules and resource allocation with data-driven insights and precision farming techniques.",
    },
    {
      image: "/images/crop-spraying.jpeg",
      title: "Sustainable Crop Management",
      description:
        "Reduce chemical usage with targeted pest management and smart application recommendations for healthier crops.",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How FarmSense Transforms Agriculture</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-powered solutions are helping farmers around the world improve productivity and
            sustainability.
          </p>
        </div>

        <div
          className={`relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          {/* Slideshow */}
          <div className="relative aspect-[16/9] bg-gray-200">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-base md:text-lg max-w-2xl">{slide.description}</p>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentSlide === index ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button className="bg-green-600 hover:bg-green-700">Learn More About Our Solutions</Button>
        </div>
      </div>
    </section>
  )
}
