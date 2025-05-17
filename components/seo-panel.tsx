"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { ScrollArea } from "../components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Check, AlertCircle, Globe, Share2 } from "lucide-react"

interface SEOSettings {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  canonicalUrl: string
  robots: string
  structuredData: string
}

interface SEOPanelProps {
  seoSettings: SEOSettings
  updateSeoSettings: (settings: SEOSettings) => void
}

const defaultSeoSettings: SEOSettings = {
  title: "",
  description: "",
  keywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  canonicalUrl: "",
  robots: "index, follow",
  structuredData: "",
}

export default function SEOPanel({ seoSettings = defaultSeoSettings, updateSeoSettings }: SEOPanelProps) {
  const [localSettings, setLocalSettings] = useState<SEOSettings>({ ...defaultSeoSettings, ...seoSettings })
  const [activeTab, setActiveTab] = useState("basic")

  const handleChange = (field: keyof SEOSettings, value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    updateSeoSettings(localSettings)
  }

  const copyToSocial = () => {
    setLocalSettings((prev) => ({
      ...prev,
      ogTitle: prev.title,
      ogDescription: prev.description,
      twitterTitle: prev.title,
      twitterDescription: prev.description,
    }))
  }

  // Calculate SEO score based on filled fields
  const calculateSeoScore = () => {
    let score = 0
    const totalFields = 5 // Basic fields that matter most

    if (localSettings.title && localSettings.title.length >= 10 && localSettings.title.length <= 60) score++
    if (localSettings.description && localSettings.description.length >= 50 && localSettings.description.length <= 160)
      score++
    if (localSettings.keywords && localSettings.keywords.split(",").length >= 3) score++
    if (localSettings.ogTitle && localSettings.ogImage) score++
    if (localSettings.canonicalUrl) score++

    return (score / totalFields) * 100
  }

  const seoScore = calculateSeoScore()

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">SEO Settings</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="mb-6">
          <div
            className={`p-4 rounded-md ${seoScore < 40 ? "bg-red-50" : seoScore < 70 ? "bg-amber-50" : "bg-green-50"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle
                className={`h-5 w-5 ${
                  seoScore < 40 ? "text-red-500" : seoScore < 70 ? "text-amber-500" : "text-green-500"
                }`}
              />
              <h3
                className={`font-medium ${
                  seoScore < 40 ? "text-red-700" : seoScore < 70 ? "text-amber-700" : "text-green-700"
                }`}
              >
                SEO Score: {Math.round(seoScore)}%
              </h3>
            </div>
            <div
              className={`text-sm ${
                seoScore < 40 ? "text-red-600" : seoScore < 70 ? "text-amber-600" : "text-green-600"
              }`}
            >
              {seoScore < 40
                ? "Your SEO needs improvement. Fill in the required fields below."
                : seoScore < 70
                  ? "Your SEO is average. Complete more fields to improve."
                  : "Great job! Your SEO settings are well optimized."}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="basic" className="flex-1">
              Basic
            </TabsTrigger>
            <TabsTrigger value="social" className="flex-1">
              Social
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div>
              <Label htmlFor="title">
                Page Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={localSettings.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter page title (50-60 characters recommended)"
                className="mt-1"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">Appears in browser tab and search results</p>
                <p className={`text-xs ${localSettings.title.length > 60 ? "text-red-500" : "text-gray-500"}`}>
                  {localSettings.title.length}/60
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="description">
                Meta Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={localSettings.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter meta description (150-160 characters recommended)"
                className="mt-1"
                rows={3}
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">Appears in search engine results</p>
                <p className={`text-xs ${localSettings.description.length > 160 ? "text-red-500" : "text-gray-500"}`}>
                  {localSettings.description.length}/160
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={localSettings.keywords}
                onChange={(e) => handleChange("keywords", e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
            </div>

            <div>
              <Label htmlFor="canonicalUrl">Canonical URL</Label>
              <Input
                id="canonicalUrl"
                value={localSettings.canonicalUrl}
                onChange={(e) => handleChange("canonicalUrl", e.target.value)}
                placeholder="https://example.com/page"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Use this to prevent duplicate content issues</p>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={copyToSocial}>
                <Share2 className="h-4 w-4 mr-1" /> Copy from basic SEO
              </Button>
            </div>

            <div className="p-4 border rounded-md mb-4">
              <h3 className="font-medium flex items-center mb-2">
                <Globe className="h-4 w-4 mr-1" /> Open Graph (Facebook, LinkedIn)
              </h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="ogTitle">OG Title</Label>
                  <Input
                    id="ogTitle"
                    value={localSettings.ogTitle}
                    onChange={(e) => handleChange("ogTitle", e.target.value)}
                    placeholder="Title for social sharing"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="ogDescription">OG Description</Label>
                  <Textarea
                    id="ogDescription"
                    value={localSettings.ogDescription}
                    onChange={(e) => handleChange("ogDescription", e.target.value)}
                    placeholder="Description for social sharing"
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="ogImage">OG Image URL</Label>
                  <Input
                    id="ogImage"
                    value={localSettings.ogImage}
                    onChange={(e) => handleChange("ogImage", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended size: 1200 x 630 pixels</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium flex items-center mb-2">
                <svg
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                </svg>
                Twitter Card
              </h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="twitterCard">Card Type</Label>
                  <select
                    id="twitterCard"
                    value={localSettings.twitterCard}
                    onChange={(e) => handleChange("twitterCard", e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md mt-1"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary with Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="twitterTitle">Twitter Title</Label>
                  <Input
                    id="twitterTitle"
                    value={localSettings.twitterTitle}
                    onChange={(e) => handleChange("twitterTitle", e.target.value)}
                    placeholder="Title for Twitter"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="twitterDescription">Twitter Description</Label>
                  <Textarea
                    id="twitterDescription"
                    value={localSettings.twitterDescription}
                    onChange={(e) => handleChange("twitterDescription", e.target.value)}
                    placeholder="Description for Twitter"
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="twitterImage">Twitter Image URL</Label>
                  <Input
                    id="twitterImage"
                    value={localSettings.twitterImage}
                    onChange={(e) => handleChange("twitterImage", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div>
              <Label htmlFor="robots">Robots Meta Tag</Label>
              <select
                id="robots"
                value={localSettings.robots}
                onChange={(e) => handleChange("robots", e.target.value)}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md mt-1"
              >
                <option value="index, follow">Index, Follow (Default)</option>
                <option value="noindex, follow">No Index, Follow</option>
                <option value="index, nofollow">Index, No Follow</option>
                <option value="noindex, nofollow">No Index, No Follow</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Controls how search engines crawl and index your page</p>
            </div>

            <div>
              <Label htmlFor="structuredData">Structured Data (JSON-LD)</Label>
              <Textarea
                id="structuredData"
                value={localSettings.structuredData}
                onChange={(e) => handleChange("structuredData", e.target.value)}
                placeholder='{"@context": "https://schema.org", "@type": "WebPage", ...}'
                className="mt-1 font-mono text-sm"
                rows={8}
              />
              <p className="text-xs text-gray-500 mt-1">
                Add structured data in JSON-LD format for rich search results
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-700 mb-2">SEO Best Practices</h3>
              <ul className="text-xs text-blue-600 space-y-1 list-disc pl-4">
                <li>Use unique, descriptive titles for each page</li>
                <li>Include relevant keywords naturally in your content</li>
                <li>Optimize images with descriptive alt text</li>
                <li>Ensure your site is mobile-friendly</li>
                <li>Use structured data to enhance search results</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={handleSave} className="w-full">
            <Check className="h-4 w-4 mr-1" /> Save SEO Settings
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
