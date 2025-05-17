"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { ScrollArea } from "../components/ui/scroll-area"
import type { Element } from "../lib/types"
import { Bot, Sparkles, Wand2 } from "lucide-react"

interface AIAssistantProps {
  elements: Element[]
  setElements: (elements: Element[]) => void
}

export default function AIAssistant({ elements, setElements }: AIAssistantProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const generateContent = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setResult(null)

    // Simulate AI generation
    setTimeout(() => {
      // This is just a mock response - in a real implementation,
      // you would call an actual AI API
      const mockResponses: Record<string, string> = {
        "hero section": `# Welcome to Our Platform
        
The most powerful solution for your business needs. Get started today and see the difference.`,
        "about us": `# About Our Company

Founded in 2020, we've been on a mission to transform how businesses operate. Our team of experts brings decades of experience to solve your most challenging problems.`,
        contact: `# Get in Touch

We'd love to hear from you! Reach out to our team for any questions or inquiries.

Email: contact@example.com
Phone: (123) 456-7890`,
      }

      // Find a matching response or generate a generic one
      let response =
        "# Generated Content\n\nThis is AI-generated content based on your prompt. You can edit this text or use it as a starting point for your website."

      for (const [key, value] of Object.entries(mockResponses)) {
        if (prompt.toLowerCase().includes(key)) {
          response = value
          break
        }
      }

      setResult(response)
      setIsGenerating(false)
    }, 1500)
  }

  const applyContent = () => {
    if (!result) return

    // Create a new paragraph element with the generated content
    const newElement: Element = {
      id: `element-${Date.now()}`,
      type: "sidebar-1", // Paragraph
      position: elements.length,
      content: result,
      styles: {
        fontSize: "16px",
        color: "#333333",
        lineHeight: "1.5",
        padding: "10px",
      },
      parentId: null,
      children: [],
      responsiveStyles: {
        mobile: {},
        tablet: {},
        desktop: {},
      },
    }

    setElements([...elements, newElement])
    setResult(null)
    setPrompt("")
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">AI Assistant</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium text-blue-700">AI Content Generator</h3>
            </div>
            <p className="text-sm text-blue-600 mb-3">
              Describe what kind of content you want to generate, and our AI will create it for you.
            </p>

            <div className="space-y-3">
              <Textarea
                placeholder="e.g., Generate a hero section for a marketing website"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />

              <Button onClick={generateContent} disabled={isGenerating || !prompt.trim()} className="w-full">
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          </div>

          {result && (
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-medium">Generated Content</h3>
              <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">{result}</div>
              <div className="flex justify-end">
                <Button onClick={applyContent}>Apply to Website</Button>
              </div>
            </div>
          )}

          <div className="space-y-2 mt-6">
            <h3 className="text-sm font-medium">Suggestions</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Generate a hero section for a business website",
                "Create an about us section with company history",
                "Write a product description for a new smartphone",
                "Create a contact section with form instructions",
                "Generate a testimonial from a satisfied customer",
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3"
                  onClick={() => setPrompt(suggestion)}
                >
                  <span className="text-xs text-left">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
