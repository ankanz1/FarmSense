"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  Upload,
  Leaf,
  AlertCircle,
  Droplets,
  Zap,
  Clock,
  CheckCircle2,
  Info,
  History,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ScanResult {
  id: string
  date: string
  image: string
  cropType: string
  healthStatus: "healthy" | "warning" | "danger"
  healthScore: number
  issues: {
    title: string
    description: string
    severity: "low" | "medium" | "high"
    icon: React.ReactNode
  }[]
  recommendations: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
}

export function CropScannerSection() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([
    {
      id: "scan-001",
      date: "July 10, 2025",
      image: "/images/crop-spraying.jpeg",
      cropType: "Rice",
      healthStatus: "warning",
      healthScore: 65,
      issues: [
        {
          title: "Leaf Discoloration",
          description: "Yellow patches detected on leaves indicating possible nutrient deficiency",
          severity: "medium",
          icon: <Leaf className="h-5 w-5 text-amber-500" />,
        },
        {
          title: "Early Stage Pest",
          description: "Signs of stem borer infestation detected",
          severity: "medium",
          icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
        },
      ],
      recommendations: [
        {
          title: "Apply Nitrogen Fertilizer",
          description: "Recommended application: 5kg/acre of urea within 3-5 days",
          icon: <Zap className="h-5 w-5 text-green-600" />,
        },
        {
          title: "Pest Management",
          description: "Apply neem-based organic pesticide to control early stage infestation",
          icon: <AlertCircle className="h-5 w-5 text-green-600" />,
        },
        {
          title: "Adjust Irrigation",
          description: "Maintain consistent moisture levels to support recovery",
          icon: <Droplets className="h-5 w-5 text-green-600" />,
        },
      ],
    },
    {
      id: "scan-002",
      date: "July 5, 2025",
      image: "/images/farmer-harvesting.jpeg",
      cropType: "Wheat",
      healthStatus: "healthy",
      healthScore: 92,
      issues: [
        {
          title: "Minor Water Stress",
          description: "Slight signs of water stress detected in some areas",
          severity: "low",
          icon: <Droplets className="h-5 w-5 text-blue-500" />,
        },
      ],
      recommendations: [
        {
          title: "Maintain Current Practices",
          description: "Continue with current management as crop is in excellent condition",
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
        },
        {
          title: "Slight Irrigation Adjustment",
          description: "Consider 5% increase in irrigation frequency during hot days",
          icon: <Droplets className="h-5 w-5 text-green-600" />,
        },
      ],
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [permissionError, setPermissionError] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      // Set a state to show a user-friendly error message
      setPermissionError(true)
      // Default back to upload tab
      setActiveTab("upload")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL("image/png")
        setPreviewImage(imageDataUrl)
        stopCamera()
      }
    }
  }

  const resetScan = () => {
    setPreviewImage(null)
    setScanComplete(false)
    setCurrentScan(null)
    setPermissionError(false)
  }

  const startScan = () => {
    if (!previewImage) return

    setIsScanning(true)
    setScanProgress(0)

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setScanComplete(true)
          // Generate mock scan result
          const mockResult: ScanResult = {
            id: `scan-${Date.now()}`,
            date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            image: previewImage,
            cropType: "Rice",
            healthStatus: Math.random() > 0.7 ? "healthy" : Math.random() > 0.5 ? "warning" : "danger",
            healthScore: Math.floor(Math.random() * 40) + 60, // 60-100
            issues: [
              {
                title: "Leaf Discoloration",
                description: "Yellow patches detected on leaves indicating possible nutrient deficiency",
                severity: "medium",
                icon: <Leaf className="h-5 w-5 text-amber-500" />,
              },
              {
                title: "Early Stage Pest",
                description: "Signs of stem borer infestation detected",
                severity: "medium",
                icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
              },
            ],
            recommendations: [
              {
                title: "Apply Nitrogen Fertilizer",
                description: "Recommended application: 5kg/acre of urea within 3-5 days",
                icon: <Zap className="h-5 w-5 text-green-600" />,
              },
              {
                title: "Pest Management",
                description: "Apply neem-based organic pesticide to control early stage infestation",
                icon: <AlertCircle className="h-5 w-5 text-green-600" />,
              },
              {
                title: "Adjust Irrigation",
                description: "Maintain consistent moisture levels to support recovery",
                icon: <Droplets className="h-5 w-5 text-green-600" />,
              },
            ],
          }
          setCurrentScan(mockResult)
          setScanHistory((prev) => [mockResult, ...prev])
          return 100
        }
        return prev + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }

  const deleteScan = (id: string) => {
    setScanHistory((prev) => prev.filter((scan) => scan.id !== id))
  }

  useEffect(() => {
    // Reset permission error when changing tabs
    setPermissionError(false)
  }, [activeTab])

  return (
    <section id="crop-scanner" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Scan Your Crop</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Upload or capture an image of your crop to receive instant AI-powered analysis and recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Crop Scanner</CardTitle>
                    <CardDescription>Upload or take a photo of your crop for instant analysis</CardDescription>
                  </div>
                  <div className="relative group">
                    <Info className="h-5 w-5 text-gray-400 cursor-help" />
                    <div className="absolute right-0 w-64 p-3 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 text-sm text-gray-600">
                      Our AI analyzes your crop images to identify health issues, pests, diseases, and nutrient
                      deficiencies, then provides tailored recommendations.
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!scanComplete && !isScanning && (
                  <div>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="upload" onClick={() => stopCamera()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </TabsTrigger>
                        <TabsTrigger value="camera" onClick={startCamera}>
                          <Camera className="h-4 w-4 mr-2" />
                          Use Camera
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="upload" className="mt-0">
                        <div
                          className={`border-2 border-dashed rounded-lg p-6 text-center ${
                            previewImage ? "border-green-300 bg-green-50" : "border-gray-300 hover:border-green-300"
                          } transition-colors cursor-pointer`}
                          onClick={triggerFileInput}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                          />
                          {previewImage ? (
                            <div className="space-y-4">
                              <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden">
                                <img
                                  src={previewImage || "/placeholder.svg"}
                                  alt="Crop preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="text-green-600 font-medium">Image uploaded successfully!</p>
                              <div className="flex justify-center gap-3">
                                <Button
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    resetScan()
                                  }}
                                >
                                  Change Image
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    startScan()
                                  }}
                                >
                                  Analyze Crop
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                <Upload className="h-8 w-8 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-gray-700 font-medium">Drag and drop your image here</p>
                                <p className="text-gray-500 text-sm mt-1">or click to browse files</p>
                              </div>
                              <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP (Max 10MB)</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="camera" className="mt-0">
                        <div className="space-y-4">
                          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                            {previewImage ? (
                              <img
                                src={previewImage || "/placeholder.svg"}
                                alt="Captured"
                                className="w-full h-full object-cover"
                              />
                            ) : permissionError ? (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
                                <AlertCircle className="h-12 w-12 text-amber-500 mb-2" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Camera access denied</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                  Please allow camera access in your browser settings to use this feature.
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setPermissionError(false)
                                    startCamera()
                                  }}
                                  className="mb-2"
                                >
                                  Try Again
                                </Button>
                                <button
                                  className="text-sm text-blue-600 hover:underline"
                                  onClick={() => {
                                    setPermissionError(false)
                                    setActiveTab("upload")
                                  }}
                                >
                                  Switch to Image Upload
                                </button>
                              </div>
                            ) : (
                              <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover"
                              ></video>
                            )}
                            <canvas ref={canvasRef} className="hidden"></canvas>
                          </div>

                          <div className="flex justify-center gap-3">
                            {cameraActive && !previewImage ? (
                              <Button onClick={captureImage}>Capture Image</Button>
                            ) : previewImage ? (
                              <>
                                <Button variant="outline" onClick={resetScan}>
                                  Retake
                                </Button>
                                <Button onClick={startScan}>Analyze Crop</Button>
                              </>
                            ) : !permissionError ? (
                              <Button onClick={startCamera} disabled={cameraActive}>
                                Start Camera
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {isScanning && (
                  <div className="py-8 text-center space-y-6">
                    <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden">
                      <img src={previewImage || ""} alt="Scanning crop" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Analyzing your crop...</h3>
                      <div className="max-w-md mx-auto">
                        <Progress value={scanProgress} className="h-2" />
                      </div>
                      <p className="text-sm text-gray-500">
                        Our AI is identifying crop type, health issues, and generating recommendations
                      </p>
                    </div>
                  </div>
                )}

                {scanComplete && currentScan && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="relative rounded-lg overflow-hidden aspect-square">
                          <img
                            src={currentScan.image || "/placeholder.svg"}
                            alt="Analyzed crop"
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={cn(
                              "absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm font-medium",
                              currentScan.healthStatus === "healthy"
                                ? "bg-green-500"
                                : currentScan.healthStatus === "warning"
                                  ? "bg-amber-500"
                                  : "bg-red-500",
                            )}
                          >
                            {currentScan.healthStatus === "healthy"
                              ? "Healthy"
                              : currentScan.healthStatus === "warning"
                                ? "Needs Attention"
                                : "Critical Issues"}
                          </div>
                        </div>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Crop Health Score</h4>
                            <span
                              className={cn(
                                "font-bold",
                                currentScan.healthScore > 80
                                  ? "text-green-600"
                                  : currentScan.healthScore > 60
                                    ? "text-amber-500"
                                    : "text-red-500",
                              )}
                            >
                              {currentScan.healthScore}/100
                            </span>
                          </div>
                          <Progress
                            value={currentScan.healthScore}
                            className="h-2 bg-gray-200"
                            indicatorClassName={cn(
                              currentScan.healthScore > 80
                                ? "bg-green-500"
                                : currentScan.healthScore > 60
                                  ? "bg-amber-500"
                                  : "bg-red-500",
                            )}
                          />
                          <div className="mt-4 text-sm">
                            <div className="flex justify-between">
                              <span>Crop Type:</span>
                              <span className="font-medium">{currentScan.cropType}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span>Scan Date:</span>
                              <span className="font-medium">{currentScan.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-2/3 space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                            Detected Issues
                          </h3>
                          <div className="space-y-3">
                            {currentScan.issues.map((issue, index) => (
                              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-start">
                                  <div className="mr-3 mt-0.5">{issue.icon}</div>
                                  <div>
                                    <h4 className="font-medium flex items-center">
                                      {issue.title}
                                      <span
                                        className={cn(
                                          "ml-2 text-xs px-2 py-0.5 rounded-full",
                                          issue.severity === "high"
                                            ? "bg-red-100 text-red-800"
                                            : issue.severity === "medium"
                                              ? "bg-amber-100 text-amber-800"
                                              : "bg-blue-100 text-blue-800",
                                        )}
                                      >
                                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Severity
                                      </span>
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <Zap className="h-5 w-5 text-green-600 mr-2" />
                            Recommendations
                          </h3>
                          <div className="space-y-3">
                            {currentScan.recommendations.map((rec, index) => (
                              <div key={index} className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-start">
                                  <div className="mr-3 mt-0.5">{rec.icon}</div>
                                  <div>
                                    <h4 className="font-medium">{rec.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={resetScan}>
                            Scan Another Crop
                          </Button>
                          <Button>Get Expert Advice</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-none shadow-md">
              <CardHeader>
                <div className="flex items-center">
                  <History className="h-5 w-5 text-green-600 mr-2" />
                  <CardTitle>Scan History</CardTitle>
                </div>
                <CardDescription>View your previous crop scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {scanHistory.length > 0 ? (
                    scanHistory.map((scan) => (
                      <div
                        key={scan.id}
                        className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                        onClick={() => {
                          setCurrentScan(scan)
                          setScanComplete(true)
                          setIsScanning(false)
                        }}
                      >
                        <div className="flex items-start">
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={scan.image || "/placeholder.svg"}
                              alt="Crop scan"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{scan.cropType}</h4>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {scan.date}
                                </div>
                              </div>
                              <div
                                className={cn(
                                  "px-2 py-0.5 rounded-full text-xs font-medium",
                                  scan.healthStatus === "healthy"
                                    ? "bg-green-100 text-green-800"
                                    : scan.healthStatus === "warning"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800",
                                )}
                              >
                                {scan.healthScore}/100
                              </div>
                            </div>
                            <div className="mt-1 flex justify-between items-center">
                              <span className="text-xs text-gray-600">
                                {scan.issues.length} {scan.issues.length === 1 ? "issue" : "issues"} detected
                              </span>
                              <button
                                className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteScan(scan.id)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <History className="h-8 w-8 text-gray-400" />
                      </div>
                      <p>No scan history yet</p>
                      <p className="text-sm mt-1">Your previous scans will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    resetScan()
                    setActiveTab("upload")
                  }}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  New Scan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
