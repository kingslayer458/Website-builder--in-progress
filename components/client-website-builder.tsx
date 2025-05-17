"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import the WebsiteBuilder component with SSR disabled
const DynamicWebsiteBuilder = dynamic(() => import("./website-builder"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Website Builder</h1>
        <div className="w-24 h-10 bg-gray-200 rounded"></div>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <p className="text-gray-500">Loading website builder...</p>
        </div>
      </div>
    </div>
  ),
})

export default function ClientWebsiteBuilder() {
  return <DynamicWebsiteBuilder />
}
