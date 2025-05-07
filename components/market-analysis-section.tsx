"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, ShoppingCart, BarChart3, Map, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function MarketAnalysisSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Market Analysis</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Make informed decisions with real-time market data, price trends, and demand forecasts.
          </p>
        </div>

        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Tabs defaultValue="prices" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="prices">Price Trends</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
            </TabsList>

            <TabsContent value="prices">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  {
                    crop: "Rice",
                    currentPrice: "₹2,250/quintal",
                    change: "+5.2%",
                    trend: "up",
                    forecast: "Expected to rise further due to export demand",
                  },
                  {
                    crop: "Wheat",
                    currentPrice: "₹2,100/quintal",
                    change: "+2.8%",
                    trend: "up",
                    forecast: "Stable prices expected for next 2 months",
                  },
                  {
                    crop: "Maize",
                    currentPrice: "₹1,850/quintal",
                    change: "-1.5%",
                    trend: "down",
                    forecast: "Prices may recover after harvest season",
                  },
                ].map((crop, index) => (
                  <Card key={index} className="border-none shadow-md">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{crop.crop}</h3>
                        <div className={`flex items-center ${crop.trend === "up" ? "text-green-600" : "text-red-500"}`}>
                          {crop.trend === "up" ? (
                            <ArrowUpRight className="h-5 w-5 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-5 w-5 mr-1" />
                          )}
                          <span>{crop.change}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Current Market Price</div>
                        <div className="text-2xl font-bold text-gray-900">{crop.currentPrice}</div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Price Forecast</div>
                        <div className="text-sm text-gray-700">{crop.forecast}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-none shadow-md mb-6">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                    <CardTitle>Price Trends (Last 6 Months)</CardTitle>
                  </div>
                  <CardDescription>Historical price data to identify seasonal patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Price trend chart visualization would appear here</p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Price Alerts</CardTitle>
                    </div>
                    <CardDescription>Get notified when crop prices reach your target</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Your Active Price Alerts</h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center text-sm">
                            <span>Rice price above ₹2,300/quintal</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs border-red-500 text-red-500 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </li>
                          <li className="flex justify-between items-center text-sm">
                            <span>Wheat price above ₹2,200/quintal</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs border-red-500 text-red-500 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </li>
                        </ul>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">Set New Price Alert</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Market Insights</CardTitle>
                    </div>
                    <CardDescription>Expert analysis and market predictions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Rice Market Outlook</h4>
                        <p className="text-sm text-gray-700">
                          Government procurement is expected to increase next month, potentially driving prices up by
                          5-8%. Consider holding your stock if possible.
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Export Market Update</h4>
                        <p className="text-sm text-gray-700">
                          International demand for Indian rice remains strong. Export-quality rice is commanding a 15%
                          premium in current markets.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="marketplace">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="md:col-span-3 border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <ShoppingCart className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Digital Marketplace</CardTitle>
                    </div>
                    <CardDescription>
                      Connect directly with buyers and get better prices for your produce
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          buyer: "Organic Foods Pvt Ltd",
                          crop: "Organic Rice",
                          quantity: "50+ quintals",
                          price: "₹2,800/quintal",
                          location: "Kolkata",
                          premium: true,
                        },
                        {
                          buyer: "Eastern Grains Cooperative",
                          crop: "Wheat",
                          quantity: "100+ quintals",
                          price: "₹2,250/quintal",
                          location: "Howrah",
                          premium: false,
                        },
                        {
                          buyer: "Green Harvest Exports",
                          crop: "Basmati Rice",
                          quantity: "200+ quintals",
                          price: "₹3,500/quintal",
                          location: "Kolkata",
                          premium: true,
                        },
                        {
                          buyer: "Metro Supermarket Chain",
                          crop: "Vegetables (Mixed)",
                          quantity: "Ongoing",
                          price: "Market+10%",
                          location: "Multiple locations",
                          premium: false,
                        },
                        {
                          buyer: "Sunrise Food Processing",
                          crop: "Maize",
                          quantity: "150+ quintals",
                          price: "₹1,950/quintal",
                          location: "Durgapur",
                          premium: false,
                        },
                        {
                          buyer: "Pure Organics Ltd",
                          crop: "Organic Vegetables",
                          quantity: "Ongoing",
                          price: "Premium rates",
                          location: "Kolkata",
                          premium: true,
                        },
                      ].map((listing, index) => (
                        <div
                          key={index}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{listing.buyer}</h4>
                            {listing.premium && (
                              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                                Premium
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 text-sm mb-3">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Crop:</span>
                              <span className="font-medium text-gray-700">{listing.crop}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Quantity:</span>
                              <span className="font-medium text-gray-700">{listing.quantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Price:</span>
                              <span className="font-medium text-gray-700">{listing.price}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Location:</span>
                              <span className="font-medium text-gray-700">{listing.location}</span>
                            </div>
                          </div>
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-sm h-8">Contact Buyer</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-center">
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        View All Listings
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <ShoppingCart className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Sell Your Produce</CardTitle>
                    </div>
                    <CardDescription>List your crops on the marketplace to reach more buyers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Your Active Listings</h4>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-900">Rice (IR-36)</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Quantity: 35 quintals • Price: ₹2,200/quintal
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Listed on: July 1, 2025</span>
                            <span>5 interested buyers</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">Create New Listing</Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Marketplace Insights</CardTitle>
                    </div>
                    <CardDescription>Trends and opportunities in the current market</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">High Demand Crops</h4>
                        <ul className="space-y-2">
                          {[
                            {
                              crop: "Organic Rice",
                              demand: "Very High",
                              priceRange: "₹2,700-3,000/quintal",
                            },
                            {
                              crop: "Mustard",
                              demand: "High",
                              priceRange: "₹5,200-5,500/quintal",
                            },
                            {
                              crop: "Green Vegetables",
                              demand: "High",
                              priceRange: "15-20% above market",
                            },
                          ].map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                              <span className="text-gray-700">{item.crop}</span>
                              <div className="text-right">
                                <span className="text-green-600 font-medium">{item.demand}</span>
                                <div className="text-xs text-gray-500">{item.priceRange}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Buyer Activity</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          Buyer activity has increased by 22% compared to last month. Food processors are particularly
                          active in the market.
                        </p>
                        <p className="text-sm text-gray-700">
                          Tip: Consider listing your produce now to take advantage of increased demand.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="demand">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Demand Forecast</CardTitle>
                    </div>
                    <CardDescription>AI-powered predictions of market demand for the next 3 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          crop: "Rice",
                          demandTrend: "Increasing",
                          confidence: "High",
                          forecast: "Demand expected to rise by 15-20% in the next 2 months due to festival season",
                        },
                        {
                          crop: "Wheat",
                          demandTrend: "Stable",
                          confidence: "Medium",
                          forecast: "Demand likely to remain steady with slight increase of 5-8% in urban markets",
                        },
                        {
                          crop: "Vegetables",
                          demandTrend: "Increasing",
                          confidence: "High",
                          forecast: "Seasonal demand increase of 25-30% expected for leafy vegetables",
                        },
                        {
                          crop: "Pulses",
                          demandTrend: "Stable",
                          confidence: "Medium",
                          forecast: "Consistent demand with potential for 10% increase if export policies change",
                        },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">{item.crop}</h4>
                            <div className="flex items-center">
                              <span
                                className={`text-sm px-2 py-0.5 rounded-full ${
                                  item.demandTrend === "Increasing"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {item.demandTrend}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">({item.confidence} confidence)</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{item.forecast}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Planting Recommendations</CardTitle>
                    </div>
                    <CardDescription>Crop suggestions based on projected market demand</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Recommended Crops for Next Season</h4>
                        <ul className="space-y-3">
                          {[
                            {
                              crop: "Mustard",
                              potential: "High",
                              reason: "Expected price increase of 15-20% due to oil demand",
                            },
                            {
                              crop: "Green Peas",
                              potential: "High",
                              reason: "Early season crop with premium pricing potential",
                            },
                            {
                              crop: "Potato",
                              potential: "Medium",
                              reason: "Stable demand with good storage potential",
                            },
                          ].map((item, index) => (
                            <li key={index} className="bg-white p-3 rounded border border-gray-200">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-900">{item.crop}</span>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    item.potential === "High"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {item.potential} potential
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{item.reason}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Market Opportunity</h4>
                        <p className="text-sm text-gray-700">
                          Consider diversifying 20-30% of your land to high-value crops like vegetables and spices to
                          maximize returns. Current market trends show a 35% price premium for quality produce in these
                          categories.
                        </p>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">Get Personalized Crop Plan</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="logistics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Map className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Transportation Options</CardTitle>
                    </div>
                    <CardDescription>Find reliable transportation for your produce</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Available Transport Services</h4>
                        <div className="space-y-3">
                          {[
                            {
                              provider: "FastTrack Logistics",
                              vehicleType: "Mini Truck (1 ton)",
                              rate: "₹15/km",
                              availability: "Available Now",
                            },
                            {
                              provider: "Farmer's Cooperative Transport",
                              vehicleType: "Medium Truck (3 ton)",
                              rate: "₹22/km",
                              availability: "Available Tomorrow",
                            },
                            {
                              provider: "GreenCargo Services",
                              vehicleType: "Large Truck (8 ton)",
                              rate: "₹35/km",
                              availability: "Available in 2 days",
                            },
                          ].map((service, index) => (
                            <div key={index} className="bg-white p-3 rounded border border-gray-200">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-900">{service.provider}</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                  {service.availability}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                {service.vehicleType} • {service.rate}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-green-600 text-green-600 hover:bg-green-50"
                              >
                                Book Now
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">Request Custom Quote</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <ShoppingCart className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Storage Solutions</CardTitle>
                    </div>
                    <CardDescription>Find storage facilities to preserve your harvest quality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Available Storage Facilities</h4>
                        <div className="space-y-3">
                          {[
                            {
                              facility: "Kolkata Cold Storage",
                              type: "Temperature Controlled",
                              capacity: "Available: 25 tons",
                              rate: "₹2.50/kg per month",
                              distance: "15 km from your location",
                            },
                            {
                              facility: "Agri Warehouse Solutions",
                              type: "Standard Warehouse",
                              capacity: "Available: 50 tons",
                              rate: "₹1.75/kg per month",
                              distance: "8 km from your location",
                            },
                            {
                              facility: "Modern Grain Storage",
                              type: "Grain Silos",
                              capacity: "Available: 100 tons",
                              rate: "₹1.25/kg per month",
                              distance: "22 km from your location",
                            },
                          ].map((storage, index) => (
                            <div key={index} className="bg-white p-3 rounded border border-gray-200">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-900">{storage.facility}</span>
                                <span className="text-xs text-gray-500">{storage.distance}</span>
                              </div>
                              <div className="text-sm text-gray-600 mb-1">
                                {storage.type} • {storage.capacity}
                              </div>
                              <div className="text-sm text-gray-600 mb-2">Rate: {storage.rate}</div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-green-600 text-green-600 hover:bg-green-50"
                              >
                                Reserve Space
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Storage Tips</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Store rice at 14% moisture content or less to prevent mold</li>
                          <li>Consider cold storage for perishable vegetables to extend shelf life</li>
                          <li>Use hermetic bags for small quantities to prevent pest infestation</li>
                          <li>Monitor stored grains regularly for temperature and moisture changes</li>
                        </ul>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">Find All Storage Options</Button>
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
