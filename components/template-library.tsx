"use client"

import type { Template } from "../lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"

interface TemplateLibraryProps {
  templates: Template[]
  applyTemplate: (template: Template) => void
}

export default function TemplateLibrary({ templates, applyTemplate }: TemplateLibraryProps) {
  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Templates</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 gap-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription>{template.category}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={template.thumbnail || "/placeholder.svg?height=200&width=400&query=website+template"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => applyTemplate(template)}>
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
