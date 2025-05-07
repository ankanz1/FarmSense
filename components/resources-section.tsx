"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Video, Users, FileText, ArrowRight, Calendar } from "lucide-react"

export function ResourcesSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resources</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access educational materials, connect with experts, and stay updated with the latest agricultural knowledge.
          </p>
        </div>

        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Tabs defaultValue="learning" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="learning">Learning Center</TabsTrigger>
              <TabsTrigger value="experts">Expert Connect</TabsTrigger>
              <TabsTrigger value="events">Events & Webinars</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>

            <TabsContent value="learning">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Sustainable Rice Cultivation",
                    description: "Learn modern techniques for eco-friendly rice farming with higher yields",
                    type: "Video Course",
                    duration: "2 hours",
                    level: "Beginner",
                    icon: <Video className="h-5 w-5 text-green-600" />,
                  },
                  {
                    title: "Advanced Pest Management",
                    description: "Integrated pest management strategies for reducing chemical usage",
                    type: "Interactive Guide",
                    duration: "1.5 hours",
                    level: "Intermediate",
                    icon: <BookOpen className="h-5 w-5 text-green-600" />,
                  },
                  {
                    title: "Water Conservation Techniques",
                    description: "Practical methods to reduce water usage while maintaining crop health",
                    type: "Video Course",
                    duration: "3 hours",
                    level: "All Levels",
                    icon: <Video className="h-5 w-5 text-green-600" />,
                  },
                  {
                    title: "Soil Health Management",
                    description: "Understanding soil testing and improving soil fertility naturally",
                    type: "Interactive Guide",
                    duration: "2 hours",
                    level: "Beginner",
                    icon: <BookOpen className="h-5 w-5 text-green-600" />,
                  },
                  {
                    title: "Climate-Smart Agriculture",
                    description: "Adapting farming practices to changing climate conditions",
                    type: "Video Course",
                    duration: "4 hours",
                    level: "Advanced",
                    icon: <Video className="h-5 w-5 text-green-600" />,
                  },
                  {
                    title: "Organic Certification Guide",
                    description: "Step-by-step process to achieve organic certification for your farm",
                    type: "Interactive Guide",
                    duration: "2.5 hours",
                    level: "Intermediate",
                    icon: <BookOpen className="h-5 w-5 text-green-600" />,
                  },
                ].map((course, index) => (
                  <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        {course.icon}
                      </div>
                      <CardDescription className="mt-1">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{course.type}</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="mt-1 text-sm">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                          {course.level}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full text-green-600 hover:bg-green-50 hover:text-green-700">
                        Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button className="bg-green-600 hover:bg-green-700">View All Courses</Button>
              </div>
            </TabsContent>

            <TabsContent value="experts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Connect with Agricultural Experts</CardTitle>
                    </div>
                    <CardDescription>Get personalized advice from certified agricultural specialists</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Dr. Rajesh Kumar",
                          specialty: "Soil Science & Nutrient Management",
                          availability: "Available Today",
                          image: "/placeholder.svg?height=100&width=100",
                        },
                        {
                          name: "Dr. Priya Sharma",
                          specialty: "Pest Management & Crop Protection",
                          availability: "Available Tomorrow",
                          image: "/placeholder.svg?height=100&width=100",
                        },
                        {
                          name: "Dr. Amit Patel",
                          specialty: "Water Management & Irrigation",
                          availability: "Available Today",
                          image: "/placeholder.svg?height=100&width=100",
                        },
                      ].map((expert, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                              src={expert.image || "/placeholder.svg"}
                              alt={expert.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-grow">
                            <h4 className="font-medium text-gray-900">{expert.name}</h4>
                            <p className="text-sm text-gray-600">{expert.specialty}</p>
                          </div>
                          <div className="ml-2">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              {expert.availability}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Schedule a Consultation</Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Farmer Community</CardTitle>
                    </div>
                    <CardDescription>
                      Connect with other farmers, share experiences, and learn from peers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Active Discussions</h4>
                        <ul className="space-y-3">
                          {[
                            "Best practices for monsoon rice cultivation",
                            "Dealing with stem borer infestation naturally",
                            "Water conservation techniques during dry season",
                            "Experiences with new rice varieties in West Bengal",
                          ].map((topic, index) => (
                            <li key={index} className="text-sm">
                              <a href="#" className="text-blue-600 hover:underline flex items-start">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                                {topic}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Upcoming Community Events</h4>
                        <ul className="space-y-3">
                          {[
                            {
                              title: "Farmer Knowledge Exchange",
                              date: "July 15, 2025",
                              type: "Virtual",
                            },
                            {
                              title: "Organic Farming Workshop",
                              date: "July 22, 2025",
                              type: "In-person",
                            },
                          ].map((event, index) => (
                            <li key={index} className="text-sm flex justify-between">
                              <span className="text-gray-700">{event.title}</span>
                              <div>
                                <span className="text-gray-500 mr-2">{event.date}</span>
                                <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs">
                                  {event.type}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        Join Community
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700">Ask a Question</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Climate-Smart Agriculture Workshop",
                    date: "July 18, 2025",
                    time: "10:00 AM - 1:00 PM",
                    location: "Kolkata Agricultural Center",
                    description:
                      "Learn practical techniques to adapt your farming practices to changing climate conditions.",
                    type: "In-person",
                  },
                  {
                    title: "Digital Tools for Smallholder Farmers",
                    date: "July 25, 2025",
                    time: "2:00 PM - 4:00 PM",
                    location: "Online Webinar",
                    description:
                      "Discover how digital tools and mobile apps can help optimize your farming operations.",
                    type: "Virtual",
                  },
                  {
                    title: "Organic Certification Process",
                    date: "August 5, 2025",
                    time: "11:00 AM - 1:00 PM",
                    location: "Online Webinar",
                    description: "Step-by-step guide to achieving organic certification for your farm products.",
                    type: "Virtual",
                  },
                  {
                    title: "Soil Health Management Field Day",
                    date: "August 12, 2025",
                    time: "9:00 AM - 3:00 PM",
                    location: "Demonstration Farm, Newtown",
                    description: "Hands-on demonstrations of soil testing, composting, and natural soil amendments.",
                    type: "In-person",
                  },
                  {
                    title: "Water-Efficient Irrigation Systems",
                    date: "August 20, 2025",
                    time: "10:00 AM - 12:00 PM",
                    location: "Online Webinar",
                    description: "Learn about modern irrigation systems that can reduce water usage by up to 40%.",
                    type: "Virtual",
                  },
                  {
                    title: "Post-Harvest Management Workshop",
                    date: "September 8, 2025",
                    time: "10:00 AM - 2:00 PM",
                    location: "Kolkata Agricultural Center",
                    description: "Techniques to reduce post-harvest losses and maintain crop quality.",
                    type: "In-person",
                  },
                ].map((event, index) => (
                  <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="text-sm text-gray-700">
                          <div className="flex items-center">
                            <span className="font-medium w-20">Date:</span>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium w-20">Time:</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium w-20">Location:</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="pt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              event.type === "Virtual" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Register Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  View All Events
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="downloads">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Guides & Manuals</CardTitle>
                    </div>
                    <CardDescription>Downloadable resources for reference and offline learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          title: "Complete Guide to Rice Cultivation",
                          size: "4.2 MB",
                          type: "PDF",
                          popular: true,
                        },
                        {
                          title: "Pest and Disease Identification Handbook",
                          size: "8.5 MB",
                          type: "PDF",
                          popular: true,
                        },
                        {
                          title: "Soil Testing Manual for Smallholder Farmers",
                          size: "3.1 MB",
                          type: "PDF",
                          popular: false,
                        },
                        {
                          title: "Water Management Best Practices",
                          size: "2.8 MB",
                          type: "PDF",
                          popular: false,
                        },
                        {
                          title: "Organic Farming Transition Guide",
                          size: "5.7 MB",
                          type: "PDF",
                          popular: true,
                        },
                      ].map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{resource.title}</h4>
                              <p className="text-xs text-gray-500">
                                {resource.type} • {resource.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {resource.popular && (
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full mr-2">
                                Popular
                              </span>
                            )}
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-green-600 mr-2" />
                      <CardTitle>Mobile Apps & Tools</CardTitle>
                    </div>
                    <CardDescription>Digital tools to help you manage your farm more efficiently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "FarmSense Mobile App",
                          description: "Access all FarmSense features on your smartphone",
                          platforms: "Android & iOS",
                          image: "/placeholder.svg?height=60&width=60",
                        },
                        {
                          title: "Pest Identifier",
                          description: "Take photos of pests and diseases for instant identification",
                          platforms: "Android & iOS",
                          image: "/placeholder.svg?height=60&width=60",
                        },
                        {
                          title: "Weather Alert",
                          description: "Localized weather forecasts and extreme weather alerts",
                          platforms: "Android",
                          image: "/placeholder.svg?height=60&width=60",
                        },
                        {
                          title: "Crop Calculator",
                          description: "Calculate seed, fertilizer, and water requirements",
                          platforms: "Android & iOS",
                          image: "/placeholder.svg?height=60&width=60",
                        },
                      ].map((app, index) => (
                        <div key={index} className="flex p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-gray-200">
                            <img
                              src={app.image || "/placeholder.svg"}
                              alt={app.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-grow">
                            <h4 className="font-medium text-gray-900">{app.title}</h4>
                            <p className="text-xs text-gray-600 mb-1">{app.description}</p>
                            <p className="text-xs text-gray-500">{app.platforms}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 h-8 self-center">
                            Download
                          </Button>
                        </div>
                      ))}
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
