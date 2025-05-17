"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import type { ThemeSettings } from "../lib/types"
import { defaultTheme } from "../lib/theme-utils"
import { Plus, Trash2 } from "lucide-react"

interface GlobalStylesPanelProps {
  theme: ThemeSettings
  setTheme: (theme: ThemeSettings) => void
  cssVariables: Record<string, string>
  setCssVariables: (variables: Record<string, string>) => void
}

export default function GlobalStylesPanel({ theme, setTheme, cssVariables, setCssVariables }: GlobalStylesPanelProps) {
  const [localTheme, setLocalTheme] = useState<ThemeSettings>({ ...theme })
  const [localCssVariables, setLocalCssVariables] = useState<Record<string, string>>({ ...cssVariables })
  const [newVariableName, setNewVariableName] = useState("")
  const [newVariableValue, setNewVariableValue] = useState("")

  const updateTheme = (key: keyof ThemeSettings, value: string) => {
    setLocalTheme({ ...localTheme, [key]: value })
  }

  const saveTheme = () => {
    setTheme(localTheme)
  }

  const addCssVariable = () => {
    if (!newVariableName || !newVariableValue) return

    // Format the variable name to ensure it starts with --
    const formattedName = newVariableName.startsWith("--") ? newVariableName : `--${newVariableName}`

    setLocalCssVariables({
      ...localCssVariables,
      [formattedName]: newVariableValue,
    })

    setCssVariables({
      ...cssVariables,
      [formattedName]: newVariableValue,
    })

    setNewVariableName("")
    setNewVariableValue("")
  }

  const deleteCssVariable = (name: string) => {
    const updatedVariables = { ...localCssVariables }
    delete updatedVariables[name]

    setLocalCssVariables(updatedVariables)
    setCssVariables(updatedVariables)
  }

  const updateCssVariable = (name: string, value: string) => {
    setLocalCssVariables({
      ...localCssVariables,
      [name]: value,
    })

    setCssVariables({
      ...localCssVariables,
      [name]: value,
    })
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Global Styles</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <Tabs defaultValue="theme">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="theme" className="flex-1">
              Theme
            </TabsTrigger>
            <TabsTrigger value="variables" className="flex-1">
              CSS Variables
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex-1">
              Typography
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-4">
            <Accordion type="multiple" defaultValue={["colors"]}>
              <AccordionItem value="colors">
                <AccordionTrigger>Colors</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex mt-1 gap-2">
                        <Input
                          type="color"
                          id="primaryColor"
                          value={localTheme.primaryColor || defaultTheme.primaryColor}
                          onChange={(e) => updateTheme("primaryColor", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={localTheme.primaryColor || defaultTheme.primaryColor}
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
                          value={localTheme.secondaryColor || defaultTheme.secondaryColor}
                          onChange={(e) => updateTheme("secondaryColor", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={localTheme.secondaryColor || defaultTheme.secondaryColor}
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
                          value={localTheme.backgroundColor || defaultTheme.backgroundColor}
                          onChange={(e) => updateTheme("backgroundColor", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={localTheme.backgroundColor || defaultTheme.backgroundColor}
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
                          value={localTheme.textColor || defaultTheme.textColor}
                          onChange={(e) => updateTheme("textColor", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={localTheme.textColor || defaultTheme.textColor}
                          onChange={(e) => updateTheme("textColor", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="typography">
                <AccordionTrigger>Typography</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fontFamily">Base Font Family</Label>
                      <Input
                        type="text"
                        id="fontFamily"
                        value={localTheme.fontFamily || defaultTheme.fontFamily}
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
                        value={localTheme.baseFontSize || defaultTheme.baseFontSize}
                        onChange={(e) => updateTheme("baseFontSize", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="spacing">
                <AccordionTrigger>Spacing</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="containerWidth">Max Container Width (px)</Label>
                      <Input
                        type="number"
                        id="containerWidth"
                        value={localTheme.containerWidth || defaultTheme.containerWidth}
                        onChange={(e) => updateTheme("containerWidth", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="spacingUnit">Base Spacing Unit (px)</Label>
                      <Input
                        type="number"
                        id="spacingUnit"
                        value={localTheme.spacingUnit || defaultTheme.spacingUnit}
                        onChange={(e) => updateTheme("spacingUnit", e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This value will be used as the base for all spacing calculations
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6">
              <Button onClick={saveTheme} className="w-full">
                Apply Theme Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="variables" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Add New CSS Variable</h3>
              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <Label htmlFor="variableName" className="sr-only">
                    Variable Name
                  </Label>
                  <Input
                    id="variableName"
                    placeholder="--variable-name"
                    value={newVariableName}
                    onChange={(e) => setNewVariableName(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="variableValue" className="sr-only">
                    Variable Value
                  </Label>
                  <Input
                    id="variableValue"
                    placeholder="Value (e.g., #ff0000, 16px)"
                    value={newVariableValue}
                    onChange={(e) => setNewVariableValue(e.target.value)}
                  />
                </div>
                <Button onClick={addCssVariable} className="whitespace-nowrap">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                CSS variables can be used throughout your site for consistent styling
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Current CSS Variables</h3>
              {Object.keys(localCssVariables).length === 0 ? (
                <div className="text-sm text-gray-500 p-4 text-center border border-dashed rounded-md">
                  No CSS variables defined yet
                </div>
              ) : (
                <div className="space-y-2">
                  {Object.entries(localCssVariables).map(([name, value]) => (
                    <div key={name} className="flex items-center gap-2 p-2 bg-white border rounded-md">
                      <div className="flex-1">
                        <Label className="text-xs font-mono">{name}</Label>
                        <div className="flex gap-2">
                          <Input
                            value={value}
                            onChange={(e) => updateCssVariable(name, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCssVariable(name)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-700 mb-2">How to Use CSS Variables</h3>
              <p className="text-xs text-blue-600 mb-2">
                You can use these variables in your custom CSS by referencing them with var():
              </p>
              <pre className="bg-blue-100 p-2 rounded text-xs font-mono overflow-x-auto">
                color: var(--variable-name);
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="h1-style">Heading 1</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    id="h1-size"
                    placeholder="Font size (e.g., 32px)"
                    value={localTheme.h1FontSize || "32px"}
                    onChange={(e) => updateTheme("h1FontSize", e.target.value)}
                  />
                  <Input
                    id="h1-weight"
                    placeholder="Font weight (e.g., bold)"
                    value={localTheme.h1FontWeight || "bold"}
                    onChange={(e) => updateTheme("h1FontWeight", e.target.value)}
                  />
                </div>
                <div className="mt-2 p-2 border rounded-md">
                  <h1
                    style={{
                      fontSize: localTheme.h1FontSize || "32px",
                      fontWeight: localTheme.h1FontWeight || "bold",
                      fontFamily: localTheme.headingFont || localTheme.fontFamily,
                    }}
                  >
                    Heading 1 Preview
                  </h1>
                </div>
              </div>

              <div>
                <Label htmlFor="h2-style">Heading 2</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    id="h2-size"
                    placeholder="Font size (e.g., 24px)"
                    value={localTheme.h2FontSize || "24px"}
                    onChange={(e) => updateTheme("h2FontSize", e.target.value)}
                  />
                  <Input
                    id="h2-weight"
                    placeholder="Font weight (e.g., bold)"
                    value={localTheme.h2FontWeight || "bold"}
                    onChange={(e) => updateTheme("h2FontWeight", e.target.value)}
                  />
                </div>
                <div className="mt-2 p-2 border rounded-md">
                  <h2
                    style={{
                      fontSize: localTheme.h2FontSize || "24px",
                      fontWeight: localTheme.h2FontWeight || "bold",
                      fontFamily: localTheme.headingFont || localTheme.fontFamily,
                    }}
                  >
                    Heading 2 Preview
                  </h2>
                </div>
              </div>

              <div>
                <Label htmlFor="body-style">Body Text</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    id="body-size"
                    placeholder="Font size (e.g., 16px)"
                    value={localTheme.bodyFontSize || "16px"}
                    onChange={(e) => updateTheme("bodyFontSize", e.target.value)}
                  />
                  <Input
                    id="body-line-height"
                    placeholder="Line height (e.g., 1.5)"
                    value={localTheme.bodyLineHeight || "1.5"}
                    onChange={(e) => updateTheme("bodyLineHeight", e.target.value)}
                  />
                </div>
                <div className="mt-2 p-2 border rounded-md">
                  <p
                    style={{
                      fontSize: localTheme.bodyFontSize || "16px",
                      lineHeight: localTheme.bodyLineHeight || "1.5",
                      fontFamily: localTheme.fontFamily,
                    }}
                  >
                    This is a preview of your body text. It shows how paragraphs will appear on your website with the
                    current settings.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={saveTheme} className="w-full">
                Apply Typography Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  )
}
