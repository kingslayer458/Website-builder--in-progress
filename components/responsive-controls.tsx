"use client"

import { Laptop, Tablet, Smartphone } from "lucide-react"
import { Button } from "../components/ui/button"
import type { DeviceType } from "../lib/types"

interface ResponsiveControlsProps {
  deviceType: DeviceType
  setDeviceType: (device: DeviceType) => void
}

export default function ResponsiveControls({ deviceType, setDeviceType }: ResponsiveControlsProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-full shadow-md px-2 py-1 flex items-center space-x-1">
      <Button
        variant={deviceType === "desktop" ? "default" : "ghost"}
        size="sm"
        onClick={() => setDeviceType("desktop")}
        className="rounded-full"
      >
        <Laptop className="h-4 w-4 mr-1" />
        <span className="text-xs">Desktop</span>
      </Button>

      <Button
        variant={deviceType === "tablet" ? "default" : "ghost"}
        size="sm"
        onClick={() => setDeviceType("tablet")}
        className="rounded-full"
      >
        <Tablet className="h-4 w-4 mr-1" />
        <span className="text-xs">Tablet</span>
      </Button>

      <Button
        variant={deviceType === "mobile" ? "default" : "ghost"}
        size="sm"
        onClick={() => setDeviceType("mobile")}
        className="rounded-full"
      >
        <Smartphone className="h-4 w-4 mr-1" />
        <span className="text-xs">Mobile</span>
      </Button>
    </div>
  )
}
