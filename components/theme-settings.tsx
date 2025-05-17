"use client"

import { useState } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ScrollArea } from "../components/ui/scroll-area"
import type { ThemeSettings as ThemeSettingsType } from "../lib/types"

interface ThemeSettingsProps {
  theme: ThemeSettingsType
  setTheme: (theme: ThemeSettingsType) => void
}

export default function ThemeSettings({ theme, setTheme }: ThemeSettingsProps) {
  const [localTheme, setLocalTheme] = useState<ThemeSettingsType>({ ...theme })

  const updateTheme = (key: keyof ThemeSettingsType, value: string) => {
    setLocalTheme({ ...localTheme, [key]: value })
  }

  const saveTheme = () => {
    setTheme(localTheme)
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Theme Settings</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <Tabs defaultValue="colors">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="colors" className="flex-1">
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex-1">
              Typography
            </TabsTrigger>
            <TabsTrigger value="spacing" className="flex-1">
              Spacing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  type="color"
                  id="primaryColor"
                  value={localTheme.primaryColor || "#4F46E5"}
                  onChange={(e) => updateTheme("primaryColor", e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={localTheme.primaryColor || "#4F46E5"}
                  onChange={(e) => updateTheme("primaryColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  type="color"
                  id="secondaryColor"
                  value={localTheme.secondaryColor || "#10B981"}
                  onChange={(e) => updateTheme("secondaryColor", e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={localTheme.secondaryColor || "#10B981"}
                  onChange={(e) => updateTheme("secondaryColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  type="color"
                  id="backgroundColor"
                  value={localTheme.backgroundColor || "#FFFFFF"}
                  onChange={(e) => updateTheme("backgroundColor", e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={localTheme.backgroundColor || "#FFFFFF"}
                  onChange={(e) => updateTheme("backgroundColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  type="color"
                  id="textColor"
                  value={localTheme.textColor || "#111827"}
                  onChange={(e) => updateTheme("textColor", e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={localTheme.textColor || "#111827"}
                  onChange={(e) => updateTheme("textColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div>
              <Label htmlFor="fontFamily">Base Font Family</Label>
              <Input
                type="text"
                id="fontFamily"
                value={localTheme.fontFamily || ""}
                onChange={(e) => updateTheme("fontFamily", e.target.value)}
                placeholder="e.g., 'Inter', sans-serif"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="headingFont">Heading Font Family</Label>
              <Input
                type="text"
                id="headingFont"
                value={localTheme.headingFont || ""}
                onChange={(e) => updateTheme("headingFont", e.target.value)}
                placeholder="e.g., 'Poppins', sans-serif"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="baseFontSize">Base Font Size (px)</Label>
              <Input
                type="number"
                id="baseFontSize"
                value={localTheme.baseFontSize || "16"}
                onChange={(e) => updateTheme("baseFontSize", e.target.value)}
                className="mt-1"
              />
            </div>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-4">
            <div>
              <Label htmlFor="containerWidth">Max Container Width (px)</Label>
              <Input
                type="number"
                id="containerWidth"
                value={localTheme.containerWidth || "1200"}
                onChange={(e) => updateTheme("containerWidth", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="spacingUnit">Base Spacing Unit (px)</Label>
              <Input
                type="number"
                id="spacingUnit"
                value={localTheme.spacingUnit || "4"}
                onChange={(e) => updateTheme("spacingUnit", e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                This value will be used as the base for all spacing calculations
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={saveTheme} className="w-full">
            Apply Theme Settings
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
