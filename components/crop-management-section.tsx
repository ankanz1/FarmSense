"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Sprout, Bug, Droplets, Zap, Leaf } from "lucide-react"

export function CropManagementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

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
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Crop Management</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Optimize your farming practices with AI-powered recommendations for planting, pest control, and resource
            management.
          </p>
        </div>

        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Tabs defaultValue="planting" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="planting">Planting Calendar</TabsTrigger>
              <TabsTrigger value="pest">Pest Management</TabsTrigger>
              <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
              <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
            </TabsList>

            <TabsContent value="planting">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Optimal Planting Schedule</CardTitle>
                    </div>
                    <CardDescription>
                      AI-generated planting calendar based on local climate data and crop requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium text-gray-900">Rice (Kharif)</div>
                          <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Recommended Now
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">Optimal planting window: June 15 - July 10</div>
                        <div className="flex justify-between text-sm">
                          <span>Expected harvest: October</span>
                          <span>Yield potential: High</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium text-gray-900">Wheat (Rabi)</div>
                          <div className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Upcoming</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Optimal planting window: November 1 - November 20
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Expected harvest: March-April</span>
                          <span>Yield potential: Medium-High</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium text-gray-900">Mustard</div>
                          <div className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Upcoming</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Optimal planting window: October 15 - November 15
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Expected harvest: February</span>
                          <span>Yield potential: Medium</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sprout className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Crop Rotation Recommendations</CardTitle>
                    </div>
                    <CardDescription>Optimize soil health with smart crop rotation plans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Field 1 Rotation Plan</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span>Current: Rice</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                            <span>Next: Wheat</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                            <span>Following: Legumes</span>
                          </li>
                        </ul>
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            className="w-full border-green-600 text-green-600 hover:bg-green-50"
                          >
                            View Full Rotation Plan
                          </Button>
                        </div>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Benefits of This Rotation</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Improves soil nitrogen content</li>
                          <li>Reduces pest pressure</li>
                          <li>Enhances water retention</li>
                          <li>Prevents nutrient depletion</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pest">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Bug className="h-5 w-5 text-amber-500 mr-2" />
                      <CardTitle>Pest & Disease Alerts</CardTitle>
                    </div>
                    <CardDescription>Early warnings based on weather conditions and regional reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex items-start">
                          <Bug className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-900">High Risk: Rice Stem Borer</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              Current weather conditions favor stem borer development. Inspect fields regularly and
                              consider preventive measures.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                        <div className="flex items-start">
                          <Bug className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-900">Medium Risk: Leaf Blast</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              Moderate risk of leaf blast due to recent humidity levels. Monitor for early symptoms.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-500 p-4">
                        <div className="flex items-start">
                          <Bug className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-900">Low Risk: Brown Plant Hopper</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              Current conditions are unfavorable for brown plant hopper. Continue routine monitoring.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Zap className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Recommended Actions</CardTitle>
                    </div>
                    <CardDescription>AI-powered treatment recommendations based on current conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">For Rice Stem Borer</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                          <li>Apply neem-based organic pesticide within the next 48 hours</li>
                          <li>Set up pheromone traps at 10 traps per acre</li>
                          <li>Consider releasing Trichogramma parasitoids as biological control</li>
                        </ul>
                        <Button className="mt-3 w-full bg-green-600 hover:bg-green-700">View Application Guide</Button>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Preventive Measures</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                          <li>Maintain field hygiene by removing crop residues</li>
                          <li>Adjust water levels to discourage pest breeding</li>
                          <li>Consider early planting to avoid peak pest pressure</li>
                        </ul>
                      </div>

                      <div className="mt-4">
                        <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                          Request Expert Consultation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="irrigation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                      <CardTitle>Smart Irrigation Schedule</CardTitle>
                    </div>
                    <CardDescription>
                      Water optimization based on soil moisture, weather forecast, and crop needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">Field 1: Rice</h4>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Next: Tomorrow
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">Current soil moisture: 65% (Adequate)</p>
                        <p className="text-sm text-gray-700">
                          Recommendation: Light irrigation (15mm) tomorrow morning
                        </p>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">Field 2: Vegetables</h4>
                          <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">Urgent: Today</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">Current soil moisture: 32% (Low)</p>
                        <p className="text-sm text-gray-700">Recommendation: Immediate irrigation (25mm) required</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">Field 3: Maize</h4>
                          <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                            Next: In 3 days
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">Current soil moisture: 58% (Adequate)</p>
                        <p className="text-sm text-gray-700">Recommendation: Schedule irrigation for Friday (20mm)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                      <CardTitle>Water Conservation Tips</CardTitle>
                    </div>
                    <CardDescription>Maximize water efficiency with these AI-recommended practices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Recommended for Your Farm</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                          <li>Implement drip irrigation for vegetable crops to reduce water usage by up to 40%</li>
                          <li>Apply mulching to reduce evaporation and maintain soil moisture</li>
                          <li>Consider alternate wetting and drying technique for rice to save water</li>
                          <li>Irrigate during early morning or evening to minimize evaporation loss</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Potential Water Savings</h4>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">25-30%</div>
                            <div className="text-sm text-gray-600">
                              Estimated water savings with recommended practices
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Custom Irrigation Plan</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="fertilizer">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Sprout className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Fertilizer Recommendations</CardTitle>
                    </div>
                    <CardDescription>
                      Precision nutrient management based on soil analysis and crop requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">Field 1: Rice</h4>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Next Application: 7 days
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">Current stage: Vegetative growth</p>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Nitrogen (N):</span> 30 kg/ha
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Phosphorus (P):</span> 15 kg/ha
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Potassium (K):</span> 20 kg/ha
                          </p>
                        </div>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">Field 2: Vegetables</h4>
                          <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Urgent: Deficiency Detected
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">Issue: Phosphorus deficiency detected</p>
                        <p className="text-sm text-gray-700">
                          Recommendation: Apply 25 kg/ha of phosphatic fertilizer within 3 days
                        </p>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        View Complete Fertilizer Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Leaf className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Sustainable Practices</CardTitle>
                    </div>
                    <CardDescription>Eco-friendly nutrient management recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Organic Alternatives</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                          <li>Use vermicompost (5 tons/ha) to improve soil structure and fertility</li>
                          <li>Apply neem cake (2 tons/ha) as an organic nitrogen source</li>
                          <li>Consider green manuring with Sesbania or Azolla before rice planting</li>
                          <li>Incorporate crop residues to improve soil organic matter</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Benefits of Integrated Nutrient Management</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Reduces chemical fertilizer usage by 30-40%</li>
                          <li>Improves long-term soil health and biodiversity</li>
                          <li>Enhances crop quality and nutritional value</li>
                          <li>Reduces environmental pollution and groundwater contamination</li>
                        </ul>
                      </div>

                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                        Get Organic Farming Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
