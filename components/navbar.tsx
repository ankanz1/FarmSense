"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // Scroll to the top of the content area
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-gray-200/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={() => setActiveTab("farm-overview")}>
              <Image
                src="logom.png"
                alt="FarmSense Logo"
                width={40}
                height={40}
                className="h-10 w-10"
                priority
              />
              <span className="ml-2 text-xl font-bold text-gray-900">FarmSense</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("crop-scanner")}
              className="flex items-center text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Camera className="h-4 w-4 mr-1" />
              Crop Scanner
            </button>
            <button
              onClick={() => handleTabClick("farm-overview")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "farm-overview" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Farm Overview
            </button>
            <button
              onClick={() => handleTabClick("crop-management")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "crop-management" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Crop Management
            </button>
            <button
              onClick={() => handleTabClick("resources")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "resources" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => handleTabClick("market-analysis")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "market-analysis" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Market Analysis
            </button>
            <Link href="#contact">
              <Button variant="default" className="bg-green-600 hover:bg-green-700">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("crop-scanner")}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600"
            >
              <Camera className="h-4 w-4 mr-2" />
              Crop Scanner
            </button>
            <button
              onClick={() => handleTabClick("farm-overview")}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "farm-overview" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Farm Overview
            </button>
            <button
              onClick={() => handleTabClick("crop-management")}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "crop-management" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Crop Management
            </button>
            <button
              onClick={() => handleTabClick("resources")}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "resources" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => handleTabClick("market-analysis")}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "market-analysis" ? "bg-green-50 text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              Market Analysis
            </button>
            <Link href="#contact" onClick={toggleMenu}>
              <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
