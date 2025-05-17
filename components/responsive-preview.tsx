"use client"

import { useState } from "react"
import { Laptop, Tablet, Smartphone, X, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import type { DeviceType, Element, ThemeSettings } from "../lib/types"
import ElementRenderer from "./element-renderer"

interface ResponsivePreviewProps {
  elements: Element[]
  deviceType: DeviceType
  setDeviceType: (device: DeviceType) => void
  theme: ThemeSettings
  onClose: () => void
}

export default function ResponsivePreview({
  elements,
  deviceType,
  setDeviceType,
  theme,
  onClose,
}: ResponsivePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Remove these unused state variables since we're using getPreviewDimensions now
  // const [previewWidth, setPreviewWidth] = useState("100%")
  // const [previewHeight, setPreviewHeight] = useState("100%")

  // Calculate dimensions directly without state
  const getPreviewDimensions = () => {
    switch (deviceType) {
      case "mobile":
        return { width: "375px", height: "667px" }
      case "tablet":
        return { width: "768px", height: "1024px" }
      case "desktop":
        return { width: "100%", height: "100%" }
      default:
        return { width: "100%", height: "100%" }
    }
  }

  const previewDimensions = getPreviewDimensions()

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`bg-gray-900 text-white flex flex-col ${isFullscreen ? "fixed inset-0 z-50" : "h-full"}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="font-semibold">Responsive Preview</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={deviceType === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeviceType("desktop")}
            className="bg-gray-800 hover:bg-gray-700 border-gray-700"
          >
            <Laptop className="h-4 w-4 mr-1" />
            <span className="text-xs">Desktop</span>
          </Button>
          <Button
            variant={deviceType === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeviceType("tablet")}
            className="bg-gray-800 hover:bg-gray-700 border-gray-700"
          >
            <Tablet className="h-4 w-4 mr-1" />
            <span className="text-xs">Tablet</span>
          </Button>
          <Button
            variant={deviceType === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeviceType("mobile")}
            className="bg-gray-800 hover:bg-gray-700 border-gray-700"
          >
            <Smartphone className="h-4 w-4 mr-1" />
            <span className="text-xs">Mobile</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-gray-800 hover:bg-gray-700 border-gray-700"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 border-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div
          className={`bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
            deviceType !== "desktop" ? "border-8 border-gray-800 rounded-xl" : ""
          }`}
          style={{
            width: previewDimensions.width,
            height: previewDimensions.height,
            maxHeight: "calc(100vh - 8rem)",
          }}
        >
          <ScrollArea className="h-full">
            <div
              className="p-6"
              style={{
                ...(theme.backgroundColor ? { backgroundColor: theme.backgroundColor } : {}),
                ...(theme.textColor ? { color: theme.textColor } : {}),
                ...(theme.fontFamily ? { fontFamily: theme.fontFamily } : {}),
              }}
            >
              {elements.map((element) => (
                <div key={element.id} className="my-2">
                  <ElementRenderer element={element} isPreview={true} deviceType={deviceType} theme={theme} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="p-2 border-t border-gray-800 text-center text-xs text-gray-400">
        {deviceType === "mobile"
          ? "Mobile View (375 x 667px)"
          : deviceType === "tablet"
            ? "Tablet View (768 x 1024px)"
            : "Desktop View (Responsive)"}
      </div>
    </div>
  )
}
