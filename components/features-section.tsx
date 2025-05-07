"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Droplets, Sun, Cloud, CloudRain, Leaf, AlertCircle, TrendingUp, ArrowUp } from "lucide-react"

export function FeaturesSection() {
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
    <section id="features" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Solutions for Agriculture</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our intelligent dashboard provides real-time insights and actionable recommendations for smallholder
            farmers.
          </p>
        </div>

        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Today's Conditions Card */}
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-white p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Thermometer className="h-5 w-5 text-amber-500 mr-2" />
                      <h3 className="font-medium text-gray-900">Today's Conditions</h3>
                    </div>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">Kolkata</span>
                  </div>
                  <div className="flex justify-around text-center">
                    <div className="flex flex-col items-center">
                      <Cloud className="h-8 w-8 text-gray-500 mb-2" />
                      <span className="text-2xl font-bold text-gray-900">24°C</span>
                      <span className="text-sm text-gray-500">Temp</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                      <span className="text-2xl font-bold text-gray-900">45%</span>
                      <span className="text-sm text-gray-500">Humidity</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Sun className="h-8 w-8 text-amber-500 mb-2" />
                      <span className="text-2xl font-bold text-gray-900">UV 4</span>
                      <span className="text-sm text-gray-500">Moderate</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soil Health Card */}
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-white p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Leaf className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium text-gray-900">Soil Health</h3>
                    </div>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">Field 1</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Moisture</span>
                        <span className="text-sm font-medium text-gray-700">65%</span>
                      </div>
                      <Progress value={65} className="h-2 bg-green-100" indicatorClassName="bg-green-600" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Nutrients</span>
                        <span className="text-sm font-medium text-gray-700">42%</span>
                      </div>
                      <Progress value={42} className="h-2 bg-green-100" indicatorClassName="bg-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts Card */}
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-white p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      <h3 className="font-medium text-gray-900">Alerts</h3>
                    </div>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">3 New</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CloudRain className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">Rain expected tomorrow, consider adjusting irrigation</p>
                    </div>
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">Low phosphorus detected in Field 2</p>
                    </div>
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">Maize prices rising, good time to sell</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Tabs defaultValue="farm-overview" className="w-full">
              <div className="border-b">
                <TabsList className="flex h-12 bg-gray-50">
                  <TabsTrigger
                    value="farm-overview"
                    id="farm-overview"
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none border-r"
                  >
                    Farm Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="crop-management"
                    id="crop-management"
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none border-r"
                  >
                    Crop Management
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    id="resources"
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none border-r"
                  >
                    Resources
                  </TabsTrigger>
                  <TabsTrigger
                    value="market-analysis"
                    id="market-analysis"
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none"
                  >
                    Market Analysis
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="farm-overview" className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Weather Forecast */}
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Cloud className="h-6 w-6 text-blue-500 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-900">Weather Forecast</h3>
                      </div>

                      <div className="flex items-center mb-4">
                        <Thermometer className="h-10 w-10 text-blue-500 mr-4" />
                        <div>
                          <div className="text-3xl font-bold text-gray-900">24°C</div>
                          <div className="text-gray-600">Partly Cloudy</div>
                        </div>
                        <div className="ml-auto">
                          <div className="text-gray-700">Kolkata, West Bengal</div>
                          <div className="text-sm text-gray-500">Updated 10 min ago</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {["Mon", "Tue", "Wed", "Thu"].map((day, i) => (
                          <div key={i} className="bg-gray-50 p-3 rounded-lg text-center">
                            <div className="font-medium mb-1">{day}</div>
                            <Cloud className="h-6 w-6 mx-auto text-blue-500 mb-1" />
                            <div className="text-gray-900">23°C</div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-gray-700">
                        <div className="font-semibold text-amber-700 mb-1">Alert:</div>
                        Light rain expected in the next 48 hours. Consider adjusting irrigation schedules.
                      </div>
                    </CardContent>
                  </Card>

                  {/* Crop Health Monitor */}
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Leaf className="h-6 w-6 text-green-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-900">Crop Health Monitor</h3>
                      </div>

                      <div className="mb-6">
                        <div className="text-gray-700 mb-1">Current Crop:</div>
                        <div className="flex justify-between items-center">
                          <div className="text-xl font-medium text-gray-900">Maize (Stage: Flowering)</div>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Healthy
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="text-gray-700 mb-2">Recent Analysis:</div>
                        <p className="text-gray-600">No signs of common diseases detected in your last scan.</p>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">Scan Crop for Diseases</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="crop-management" className="p-6">
                <div className="text-center py-8">
                  <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Crop Management Tools</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Access planting calendars, crop rotation recommendations, and pest management strategies tailored to
                    your specific crops and location.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">View Crop Management Tools</Button>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="p-6">
                <div className="text-center py-8">
                  <ArrowUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Agricultural Resources</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Access educational materials, best practices, and connect with agricultural experts for personalized
                    advice.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">Explore Resources</Button>
                </div>
              </TabsContent>

              <TabsContent value="market-analysis" className="p-6">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Insights</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Track crop prices, identify market trends, and receive recommendations on the best time to sell your
                    produce.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">View Market Data</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
