"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Search } from "lucide-react"
import type { Element } from "../lib/types"

interface SectionTemplate {
  id: string
  name: string
  category: string
  thumbnail: string
  elements: Element[]
}

interface SectionTemplatesProps {
  onApplyTemplate: (elements: Element[]) => void
}

export default function SectionTemplates({ onApplyTemplate }: SectionTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Sample section templates
  const sectionTemplates: SectionTemplate[] = [
    {
      id: "hero-1",
      name: "Hero Section with CTA",
      category: "hero",
      thumbnail: "/hero-call-to-action.png",
      elements: [
        {
          id: "hero-heading",
          type: "sidebar-0",
          position: 0,
          content: "Welcome to Our Platform",
          styles: {
            fontSize: "48px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "16px",
          },
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: { fontSize: "32px" },
            tablet: { fontSize: "40px" },
            desktop: {},
          },
        },
        {
          id: "hero-subheading",
          type: "sidebar-1",
          position: 1,
          content: "The most powerful solution for your business needs. Get started today and see the difference.",
          styles: {
            fontSize: "20px",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto 32px auto",
            color: "#666666",
          },
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: { fontSize: "16px" },
            tablet: { fontSize: "18px" },
            desktop: {},
          },
        },
        {
          id: "hero-button",
          type: "sidebar-2",
          position: 2,
          content: "Get Started",
          styles: {
            fontSize: "18px",
            padding: "12px 24px",
            borderRadius: "4px",
            backgroundColor: "#4F46E5",
            color: "#FFFFFF",
            fontWeight: "medium",
            margin: "0 auto",
            display: "block",
            width: "fit-content",
          },
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: {},
            tablet: {},
            desktop: {},
          },
        },
      ],
    },
    {
      id: "features-1",
      name: "Three Column Features",
      category: "features",
      thumbnail: "/placeholder-b05ty.png", // Make sure this file exists
      elements: [
        {
          id: "features-heading",
          type: "sidebar-0-2",
          position: 0,
          content: "Our Features",
          styles: {
            fontSize: "36px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "48px",
          },
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: { fontSize: "28px" },
            tablet: { fontSize: "32px" },
            desktop: {},
          },
        },
        {
          id: "features-container",
          type: "sidebar-columns-3",
          position: 1,
          content: "",
          styles: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
            width: "100%",
          },
          parentId: null,
          children: [
            {
              id: "feature-1",
              type: "sidebar-feature",
              position: 0,
              content: "This feature will help you accomplish amazing things with very little effort.",
              styles: {
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              },
              parentId: "features-container",
              children: [],
              responsiveStyles: {
                mobile: {},
                tablet: {},
                desktop: {},
              },
            },
            {
              id: "feature-2",
              type: "sidebar-feature",
              position: 1,
              content: "Another great feature that will transform how you work and boost productivity.",
              styles: {
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              },
              parentId: "features-container",
              children: [],
              responsiveStyles: {
                mobile: {},
                tablet: {},
                desktop: {},
              },
            },
            {
              id: "feature-3",
              type: "sidebar-feature",
              position: 2,
              content: "The third amazing feature that will make your life easier and more efficient.",
              styles: {
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              },
              parentId: "features-container",
              children: [],
              responsiveStyles: {
                mobile: {},
                tablet: {},
                desktop: {},
              },
            },
          ],
          responsiveStyles: {
            mobile: { gridTemplateColumns: "1fr" },
            tablet: { gridTemplateColumns: "1fr 1fr" },
            desktop: {},
          },
        },
      ],
    },
    {
      id: "testimonial-1",
      name: "Customer Testimonial",
      category: "testimonials",
      thumbnail: "/placeholder-74804.png", // Make sure this file exists
      elements: [
        {
          id: "testimonial-heading",
          type: "sidebar-0-2",
          position: 0,
          content: "What Our Customers Say",
          styles: {
            fontSize: "36px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "32px",
          },
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: { fontSize: "28px" },
            tablet: { fontSize: "32px" },
            desktop: {},
          },
        },
        {
          id: "testimonial-container",
          type: "sidebar-testimonial",
          position: 1,
          content:
            "This product has completely transformed our business operations. The interface is intuitive, and the support team is always ready to help. Highly recommended for any business looking to streamline their processes!",
          styles: {
            padding: "32px",
            backgroundColor: "#F9FAFB",
            borderRadius: "8px",
            maxWidth: "800px",
            margin: "0 auto",
            borderLeft: "4px solid #4F46E5",
          },
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: { padding: "24px" },
            tablet: {},
            desktop: {},
          },
        },
      ],
    },
    {
      id: "contact-1",
      name: "Contact Form",
      category: "contact",
      thumbnail: "/placeholder-anlor.png", // Make sure this file exists
      elements: [
        {
          id: "contact-heading",
          type: "sidebar-0-2",
          position: 0,
          content: "Get in Touch",
          styles: {
            fontSize: "36px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "32px",
          },
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: { fontSize: "28px" },
            tablet: { fontSize: "32px" },
            desktop: {},
          },
        },
        {
          id: "contact-form",
          type: "sidebar-form",
          position: 1,
          content: "",
          styles: {
            maxWidth: "600px",
            margin: "0 auto",
            padding: "32px",
            backgroundColor: "#F9FAFB",
            borderRadius: "8px",
          },
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: { padding: "24px" },
            tablet: {},
            desktop: {},
          },
        },
      ],
    },
  ]

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    return sectionTemplates.filter((template) => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = activeCategory === "all" || template.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeCategory])

  const categories = [
    { id: "all", name: "All Sections" },
    { id: "hero", name: "Hero Sections" },
    { id: "features", name: "Features" },
    { id: "testimonials", name: "Testimonials" },
    { id: "contact", name: "Contact" },
  ]

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Section Templates</h2>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
        <TabsList className="w-full flex overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-1 min-w-fit">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription className="capitalize">{template.category} Section</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={template.thumbnail || "/placeholder.svg?height=200&width=400&query=website+section+template"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-gow26.png"
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => onApplyTemplate(template.elements)}>
                  Add to Page
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
