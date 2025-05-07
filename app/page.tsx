"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ImageSlideshow } from "@/components/image-slideshow"
import { CropScannerSection } from "@/components/crop-scanner-section"
import { FarmOverviewSection } from "@/components/farm-overview-section"
import { CropManagementSection } from "@/components/crop-management-section"
import { ResourcesSection } from "@/components/resources-section"
import { MarketAnalysisSection } from "@/components/market-analysis-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [activeTab, setActiveTab] = useState("farm-overview")

  return (
    <div className="min-h-screen relative">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 opacity-10"
        style={{
          backgroundImage: "url('/images/wheat-field-golden.png')",
        }}
      />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="relative z-10">
        <HeroSection />
        <ImageSlideshow />
        <CropScannerSection />

        {/* Conditionally render sections based on active tab */}
        {activeTab === "farm-overview" && <FarmOverviewSection />}
        {activeTab === "crop-management" && <CropManagementSection />}
        {activeTab === "resources" && <ResourcesSection />}
        {activeTab === "market-analysis" && <MarketAnalysisSection />}

        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
