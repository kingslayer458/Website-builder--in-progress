"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import type { Element, DeviceType, ThemeSettings } from "../lib/types"
import { getElementTypeName } from "../lib/element-utils"

interface PropertiesPanelProps {
  element: Element
  updateElementProperties: (id: string, properties: Partial<Element>) => void
  deviceType: DeviceType
  theme: ThemeSettings
}

export default function PropertiesPanel({ element, updateElementProperties, deviceType, theme }: PropertiesPanelProps) {
  const [localContent, setLocalContent] = useState(element.content)
  const [localStyles, setLocalStyles] = useState({ ...element.styles })
  const [localResponsiveStyles, setLocalResponsiveStyles] = useState({
    mobile: { ...element.responsiveStyles?.mobile } || {},
    tablet: { ...element.responsiveStyles?.tablet } || {},
    desktop: { ...element.responsiveStyles?.desktop } || {},
  })
  const [activeDevice, setActiveDevice] = useState<DeviceType>(deviceType)

  // Update local state when element or device type changes
  useEffect(() => {
    setLocalContent(element.content)
    setLocalStyles({ ...element.styles })
    setLocalResponsiveStyles({
      mobile: { ...element.responsiveStyles?.mobile } || {},
      tablet: { ...element.responsiveStyles?.tablet } || {},
      desktop: { ...element.responsiveStyles?.desktop } || {},
    })
    setActiveDevice(deviceType)
  }, [element, deviceType])

  const handleContentChange = (value: string) => {
    setLocalContent(value)
    updateElementProperties(element.id, { content: value })
  }

  const handleStyleChange = (property: string, value: string) => {
    const updatedStyles = { ...localStyles, [property]: value }
    setLocalStyles(updatedStyles)
    updateElementProperties(element.id, { styles: updatedStyles })
  }

  const handleResponsiveStyleChange = (device: DeviceType, property: string, value: string) => {
    const updatedResponsiveStyles = {
      ...localResponsiveStyles,
      [device]: {
        ...localResponsiveStyles[device],
        [property]: value,
      },
    }

    setLocalResponsiveStyles(updatedResponsiveStyles)
    updateElementProperties(element.id, {
      responsiveStyles: updatedResponsiveStyles,
    })
  }

  // Get the appropriate styles based on active device
  const getActiveStyles = () => {
    if (activeDevice === "desktop") return localStyles
    return {
      ...localStyles,
      ...localResponsiveStyles[activeDevice],
    }
  }

  const activeStyles = getActiveStyles()

  return (
    <div className="p-4 overflow-y-auto h-full">
      <h2 className="font-semibold text-lg mb-4">Properties</h2>

      <Tabs defaultValue="content">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="content" className="flex-1">
            Content
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1">
            Style
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex-1">
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {/* Content Section */}
          <div>
            <div className="mb-4">
              <Label>Element Type</Label>
              <div className="text-sm bg-gray-100 p-2 rounded mt-1">{getElementTypeName(element.type)}</div>
            </div>

            {element.type === "sidebar-1" ? (
              <div>
                <Label htmlFor="content">Text Content</Label>
                <Textarea
                  id="content"
                  value={localContent}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full mt-1"
                  rows={6}
                />
              </div>
            ) : element.type === "sidebar-3" ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={localContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Image URL"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter image URL or use placeholder</p>
                </div>

                <div>
                  <Label htmlFor="altText">Alt Text</Label>
                  <Input
                    id="altText"
                    value={activeStyles.altText || ""}
                    onChange={(e) => handleStyleChange("altText", e.target.value)}
                    placeholder="Image description for accessibility"
                    className="mt-1"
                  />
                </div>

                <div className="pt-2">
                  <img
                    src={localContent || "/placeholder.svg"}
                    alt={activeStyles.altText || "Preview"}
                    className="max-h-40 mx-auto object-contain rounded border"
                  />
                </div>
              </div>
            ) : element.type === "sidebar-2" ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={localContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Button text"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={activeStyles.href || ""}
                    onChange={(e) => handleStyleChange("href", e.target.value)}
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  value={localContent}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Content"
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          {/* Style Section */}
          <div className="mb-4">
            <Label className="mb-2 block">Device Mode</Label>
            <div className="flex border rounded-md overflow-hidden">
              <button
                type="button"
                className={`flex-1 py-2 px-3 text-sm font-medium ${
                  activeDevice === "desktop" ? "bg-primary text-primary-foreground" : "bg-transparent"
                }`}
                onClick={() => setActiveDevice("desktop")}
              >
                Desktop
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-3 text-sm font-medium ${
                  activeDevice === "tablet" ? "bg-primary text-primary-foreground" : "bg-transparent"
                }`}
                onClick={() => setActiveDevice("tablet")}
              >
                Tablet
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-3 text-sm font-medium ${
                  activeDevice === "mobile" ? "bg-primary text-primary-foreground" : "bg-transparent"
                }`}
                onClick={() => setActiveDevice("mobile")}
              >
                Mobile
              </button>
            </div>
            {activeDevice !== "desktop" && (
              <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                Editing styles for {activeDevice} view. These will override desktop styles.
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                id="fontSize"
                type="text"
                value={activeStyles.fontSize || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("fontSize", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "fontSize", e.target.value)
                  }
                }}
                placeholder="16px"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="fontWeight">Font Weight</Label>
              <Input
                id="fontWeight"
                type="text"
                value={activeStyles.fontWeight || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("fontWeight", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "fontWeight", e.target.value)
                  }
                }}
                placeholder="normal"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="color">Text Color</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  type="color"
                  id="color"
                  value={activeStyles.color || theme.textColor || "#000000"}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("color", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "color", e.target.value)
                    }
                  }}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={activeStyles.color || theme.textColor || "#000000"}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("color", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "color", e.target.value)
                    }
                  }}
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
                  value={activeStyles.backgroundColor || "transparent"}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("backgroundColor", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "backgroundColor", e.target.value)
                    }
                  }}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={activeStyles.backgroundColor || "transparent"}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("backgroundColor", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "backgroundColor", e.target.value)
                    }
                  }}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Label className="mb-2 block">Alignment</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="textAlign">Text Align</Label>
                <select
                  id="textAlign"
                  value={activeStyles.textAlign || "left"}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("textAlign", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "textAlign", e.target.value)
                    }
                  }}
                  className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>

              <div>
                <Label htmlFor="verticalAlign">Vertical Align</Label>
                <select
                  id="verticalAlign"
                  value={activeStyles.verticalAlign || "top"}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("verticalAlign", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "verticalAlign", e.target.value)
                    }
                  }}
                  className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                >
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add Flexbox alignment controls for container elements */}
          {(element.type === "sidebar-container" ||
            element.type === "sidebar-columns-2" ||
            element.type === "sidebar-columns-3" ||
            element.type === "sidebar-columns-4") && (
            <div className="mt-4">
              <Label className="mb-2 block">Container Alignment</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="justifyContent">Horizontal Alignment</Label>
                  <select
                    id="justifyContent"
                    value={activeStyles.justifyContent || "flex-start"}
                    onChange={(e) => {
                      if (activeDevice === "desktop") {
                        handleStyleChange("justifyContent", e.target.value)
                      } else {
                        handleResponsiveStyleChange(activeDevice, "justifyContent", e.target.value)
                      }
                    }}
                    className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                  >
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                    <option value="space-between">Space Between</option>
                    <option value="space-around">Space Around</option>
                    <option value="space-evenly">Space Evenly</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="alignItems">Vertical Alignment</Label>
                  <select
                    id="alignItems"
                    value={activeStyles.alignItems || "stretch"}
                    onChange={(e) => {
                      if (activeDevice === "desktop") {
                        handleStyleChange("alignItems", e.target.value)
                      } else {
                        handleResponsiveStyleChange(activeDevice, "alignItems", e.target.value)
                      }
                    }}
                    className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                  >
                    <option value="flex-start">Top</option>
                    <option value="center">Center</option>
                    <option value="flex-end">Bottom</option>
                    <option value="stretch">Stretch</option>
                    <option value="baseline">Baseline</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Label className="mb-2 block">Spacing</Label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="gap">Gap Between Items</Label>
                <Input
                  id="gap"
                  type="text"
                  value={activeStyles.gap || ""}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("gap", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "gap", e.target.value)
                    }
                  }}
                  placeholder="1rem"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="margin">Margin</Label>
                <Input
                  id="margin"
                  type="text"
                  value={activeStyles.margin || ""}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("margin", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "margin", e.target.value)
                    }
                  }}
                  placeholder="0px"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="padding">Padding</Label>
                <Input
                  id="padding"
                  type="text"
                  value={activeStyles.padding || ""}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("padding", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "padding", e.target.value)
                    }
                  }}
                  placeholder="0px"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="borderRadius">Border Radius</Label>
                <Input
                  id="borderRadius"
                  type="text"
                  value={activeStyles.borderRadius || ""}
                  onChange={(e) => {
                    if (activeDevice === "desktop") {
                      handleStyleChange("borderRadius", e.target.value)
                    } else {
                      handleResponsiveStyleChange(activeDevice, "borderRadius", e.target.value)
                    }
                  }}
                  placeholder="0px"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paddingTop">Padding Top</Label>
              <Input
                id="paddingTop"
                type="text"
                value={activeStyles.paddingTop || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("paddingTop", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "paddingTop", e.target.value)
                  }
                }}
                placeholder="0px"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="paddingBottom">Padding Bottom</Label>
              <Input
                id="paddingBottom"
                type="text"
                value={activeStyles.paddingBottom || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("paddingBottom", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "paddingBottom", e.target.value)
                  }
                }}
                placeholder="0px"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="paddingLeft">Padding Left</Label>
              <Input
                id="paddingLeft"
                type="text"
                value={activeStyles.paddingLeft || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("paddingLeft", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "paddingLeft", e.target.value)
                  }
                }}
                placeholder="0px"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="paddingRight">Padding Right</Label>
              <Input
                id="paddingRight"
                type="text"
                value={activeStyles.paddingRight || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("paddingRight", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "paddingRight", e.target.value)
                  }
                }}
                placeholder="0px"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marginTop">Margin Top</Label>
              <Input
                id="marginTop"
                type="text"
                value={activeStyles.marginTop || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("marginTop", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "marginTop", e.target.value)
                  }
                }}
                placeholder="0px"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="marginBottom">Margin Bottom</Label>
              <Input
                id="marginBottom"
                type="text"
                value={activeStyles.marginBottom || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("marginBottom", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "marginBottom", e.target.value)
                  }
                }}
                placeholder="0px"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="marginLeft">Margin Left</Label>
              <Input
                id="marginLeft"
                type="text"
                value={activeStyles.marginLeft || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("marginLeft", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "marginLeft", e.target.value)
                  }
                }}
                placeholder="0px"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="marginRight">Margin Right</Label>
              <Input
                id="marginRight"
                type="text"
                value={activeStyles.marginRight || ""}
                onChange={(e) => {
                  if (activeDevice === "desktop") {
                    handleStyleChange("marginRight", e.target.value)
                  } else {
                    handleResponsiveStyleChange(activeDevice, "marginRight", e.target.value)
                  }
                }}
                placeholder="0px"
                className="mt-1"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          {/* Advanced Section */}
          <div>
            <Label htmlFor="customCss">Custom CSS</Label>
            <Textarea
              id="customCss"
              value={activeStyles.customCss || ""}
              onChange={(e) => {
                if (activeDevice === "desktop") {
                  handleStyleChange("customCss", e.target.value)
                } else {
                  handleResponsiveStyleChange(activeDevice, "customCss", e.target.value)
                }
              }}
              placeholder="Enter custom CSS properties"
              className="mt-1 font-mono text-sm"
              rows={6}
            />
            <p className="text-xs text-gray-500 mt-1">Enter custom CSS properties in the format: property: value;</p>
          </div>

          <div>
            <Label htmlFor="elementId">Element ID</Label>
            <Input
              id="elementId"
              type="text"
              value={activeStyles.id || ""}
              onChange={(e) => handleStyleChange("id", e.target.value)}
              placeholder="my-element-id"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">Used for linking and JavaScript targeting</p>
          </div>

          <div>
            <Label htmlFor="elementClass">Element Class</Label>
            <Input
              id="elementClass"
              type="text"
              value={activeStyles.className || ""}
              onChange={(e) => handleStyleChange("className", e.target.value)}
              placeholder="my-custom-class"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">Add custom CSS classes separated by spaces</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
