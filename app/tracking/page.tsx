"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  PackageCheck,
  ArrowLeft,
  Copy,
  Package,
  ChevronDown,
  ChevronUp,
  Clock,
  Truck,
  CheckCircle,
  MapPin,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function TrackingPage() {
  const searchParams = useSearchParams()
  const trackingNumbersParam = searchParams.get("numbers") || ""
  const numbersArray = trackingNumbersParam.split("\n").filter((num) => num.trim() !== "")
  const displayTrackingNumber = numbersArray.length > 0 ? numbersArray[0] : "00370724763137261917" // Use first or default

  // Hardcoded tracking data for demonstration
  const trackingData = [
    {
      datetime: "2025-06-17 08:56:30",
      location: "TUEN MUN NT (HK)",
      label: "INFORMED",
      code: "97",
      description: "Manifested for customs",
    },
    {
      datetime: "2025-06-27 12:41:00",
      location: "Vestby",
      label: "DEP_RECEIVED",
      code: "3000",
      description: "Parcel has been received",
    },
    {
      datetime: "2025-06-27 12:41:00",
      location: "VestbySorter",
      label: "IN_TRANSIT",
      code: "5000",
      description: "Parcel is being loaded for transport",
    },
    {
      datetime: "2025-06-27 23:57:00",
      location: "Hokksund",
      label: "IN_TRANSIT",
      code: "5000",
      description: "Parcel is being loaded for transport",
    },
    {
      datetime: "2025-06-28 06:48:00",
      location: "HOKKSUND",
      label: "DELIVERED",
      code: "9000",
      description: "Parcel delivered",
    },
  ]

  const latestEvent = trackingData[trackingData.length - 1]
  const isDelivered = latestEvent?.label === "DELIVERED"

  const lastUpdateDate = latestEvent
    ? new Date(latestEvent.datetime).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "N/A"
  const lastUpdateLocation = latestEvent ? latestEvent.location : "N/A"
  const originLocation = trackingData[0] ? latestEvent.location : "NLD" // Use latest event location for origin if available, otherwise default

  const getProgressStage = (label: string) => {
    switch (label) {
      case "INFORMED":
        return 1
      case "DEP_RECEIVED":
        return 2
      case "IN_TRANSIT":
        return 3
      case "DELIVERED":
        return 4
      default:
        return 0
    }
  }

  const currentProgress = getProgressStage(latestEvent?.label || "")
  const progressStages = ["Preparing", "Picked up", "In transit", "Delivered"]

  const handleCopyTrackingNumbers = () => {
    navigator.clipboard.writeText(numbersArray.join("\n"))
    alert("All tracking numbers copied to clipboard!")
  }

  const handleCopySingleTrackingNumber = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Tracking number copied to clipboard!")
  }

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState("Pending") // Default status

  const getIconForLabel = (label: string) => {
    switch (label) {
      case "DELIVERED":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "IN_TRANSIT":
        return <Truck className="h-5 w-5 text-primary" />
      case "DEP_RECEIVED":
        return <Package className="h-5 w-5 text-primary" />
      case "INFORMED":
        return <Clock className="h-5 w-5 text-gray-500" />
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white shadow-sm">
        <Link href="/" className="flex items-center justify-center text-primary hover:underline">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Home
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center py-12 md:py-24 lg:py-32 px-4">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <PackageCheck className="h-20 w-20 mx-auto text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter">Shipment Tracking</h1>
            <p className="text-lg text-muted-foreground">Here are the details for your tracking numbers:</p>
            {numbersArray.length > 0 && (
              <Button
                onClick={handleCopyTrackingNumbers}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Copy className="mr-2 h-4 w-4" /> Copy All Tracking Numbers
              </Button>
            )}
          </div>

          {numbersArray.length > 0 ? (
            <Card className="p-6 shadow-lg text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Tracking number</span>
                  <span className="font-semibold text-lg">{displayTrackingNumber}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopySingleTrackingNumber(displayTrackingNumber)}
                    className="h-6 w-6 text-muted-foreground hover:text-primary"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy tracking number</span>
                  </Button>
                </div>
                <DropdownMenu open={statusDropdownOpen} onOpenChange={setStatusDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1 bg-transparent">
                      {currentStatus}
                      {statusDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setCurrentStatus("Pending")}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentStatus("In Transit")}>In Transit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentStatus("Delivered")}>Delivered</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h2 className="text-2xl font-bold mb-2">Estimated Delivery Jul 22, 2025</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Last update: {lastUpdateDate} | OSL: Pending Scan | Origin: {originLocation}
              </p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Shipment Progress</h3>
                <div className="flex items-center justify-between gap-2">
                  {progressStages.map((stage, index) => (
                    <div key={stage} className="flex flex-col items-center flex-1">
                      <div
                        className={`h-2 w-full rounded-full ${
                          index + 1 <= currentProgress ? (isDelivered ? "bg-green-500" : "bg-primary") : "bg-gray-200"
                        } ${index === 0 ? "rounded-l-full" : ""} ${
                          index === progressStages.length - 1 ? "rounded-r-full" : ""
                        }`}
                      />
                      <span
                        className={`mt-2 text-xs text-center ${
                          index + 1 <= currentProgress ? "font-medium text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {stage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Shipment Events</h3>
                <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
                  {/* Reverse the trackingData array for display */}
                  {[...trackingData].reverse().map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white">
                        {getIconForLabel(event.label)}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.datetime).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                          {/* "Latest" tag for the first item in the reversed array (which is the actual latest) */}
                          {index === 0 && (
                            <span className="ml-2 inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              Latest
                            </span>
                          )}
                        </p>
                        <h3
                          className={`font-semibold ${event.label === "DELIVERED" ? "text-green-600" : "text-foreground"}`}
                        >
                          {event.description}
                        </h3>
                        <p className="text-sm text-muted-foreground">Location: {event.location}</p>
                        <p className="text-xs text-gray-400">
                          Label: {event.label} (Code: {event.code})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <p className="text-lg text-muted-foreground">No tracking numbers provided.</p>
          )}

          <Link href="/" passHref>
            <Button className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">Go Back to Homepage</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
