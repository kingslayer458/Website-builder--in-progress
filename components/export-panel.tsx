"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ScrollArea } from "../components/ui/scroll-area"
import type { Element, ThemeSettings } from "../lib/types"
import { Check, Download, Copy } from "lucide-react"

interface ExportPanelProps {
  elements: Element[]
  theme: ThemeSettings
}

export default function ExportPanel({ elements, theme }: ExportPanelProps) {
  const [copied, setCopied] = useState(false)
  const [exportFormat, setExportFormat] = useState<"html" | "react" | "nextjs">("html")

  const generateHTML = () => {
    // This is a simplified version - a real implementation would be more complex
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Website</title>
  <style>
    body {
      font-family: ${theme.fontFamily || "sans-serif"};
      color: ${theme.textColor || "#111827"};
      background-color: ${theme.backgroundColor || "#FFFFFF"};
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: ${theme.containerWidth || "1200"}px;
      margin: 0 auto;
      padding: 1rem;
    }
    /* More styles would be generated here */
  </style>
</head>
<body>
  <div class="container">
    <!-- Content would be generated here -->
  </div>
</body>
</html>`

    return html
  }

  const generateReact = () => {
    // Simplified version
    const react = `import React from 'react'

export default function ExportedWebsite() {
  return (
    <div className="container mx-auto p-4">
      {/* Content would be generated here */}
    </div>
  )
}`

    return react
  }

  const generateNextJS = () => {
    // Simplified version
    const nextjs = `export default function Home() {
  return (
    <main className="container mx-auto p-4">
      {/* Content would be generated here */}
    </main>
  )
}`

    return nextjs
  }

  const getExportCode = () => {
    switch (exportFormat) {
      case "html":
        return generateHTML()
      case "react":
        return generateReact()
      case "nextjs":
        return generateNextJS()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getExportCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    const element = document.createElement("a")
    const file = new Blob([getExportCode()], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `export.${exportFormat === "html" ? "html" : "jsx"}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Export</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-4">
          <Tabs
            defaultValue="html"
            value={exportFormat}
            onValueChange={(value) => setExportFormat(value as "html" | "react" | "nextjs")}
          >
            <TabsList className="w-full mb-4">
              <TabsTrigger value="html" className="flex-1">
                HTML
              </TabsTrigger>
              <TabsTrigger value="react" className="flex-1">
                React
              </TabsTrigger>
              <TabsTrigger value="nextjs" className="flex-1">
                Next.js
              </TabsTrigger>
            </TabsList>

            <TabsContent value="html" className="space-y-4">
              <p className="text-sm text-gray-600">Export as a static HTML file with CSS styles.</p>
            </TabsContent>

            <TabsContent value="react" className="space-y-4">
              <p className="text-sm text-gray-600">Export as React components with Tailwind CSS.</p>
            </TabsContent>

            <TabsContent value="nextjs" className="space-y-4">
              <p className="text-sm text-gray-600">Export as Next.js pages with App Router structure.</p>
            </TabsContent>
          </Tabs>

          <div className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">Preview</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8">
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCode} className="h-8">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-auto max-h-80">
              <code>{getExportCode()}</code>
            </pre>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Next Steps</h3>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Download the code and customize as needed</li>
              <li>Add additional functionality with JavaScript</li>
              <li>Deploy to your preferred hosting platform</li>
            </ul>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
