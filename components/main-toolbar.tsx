"use client"

import {
  Undo2,
  Redo2,
  Save,
  Eye,
  EyeOff,
  Laptop,
  Tablet,
  Smartphone,
  Layers,
  PanelLeft,
  PanelRight,
  History,
  Settings,
  Palette,
  FileOutput,
  ImageIcon,
  Bot,
  Grid3x3,
  LayoutTemplate,
  SmartphoneIcon as MobilePreviewIcon,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { Separator } from "../components/ui/separator"
import type { DeviceType } from "../lib/types"

interface MainToolbarProps {
  currentView: "editor" | "preview"
  toggleView: () => void
  deviceType: DeviceType
  setDeviceType: (device: DeviceType) => void
  sidebarView:
    | "elements"
    | "templates"
    | "sections"
    | "assets"
    | "theme"
    | "export"
    | "ai"
    | "global-styles"
    | "animations"
    | "seo"
    | "custom-code"
  setSidebarView: (
    view:
      | "elements"
      | "templates"
      | "sections"
      | "assets"
      | "theme"
      | "export"
      | "ai"
      | "global-styles"
      | "animations"
      | "seo"
      | "custom-code",
  ) => void
  rightPanelView: "properties" | "history"
  setRightPanelView: (view: "properties" | "history") => void
  toggleSidebar: () => void
  toggleRightPanel: () => void
  onUndo: () => void
  onRedo: () => void
  onSave: () => void
  canUndo: boolean
  canRedo: boolean
  toggleResponsivePreview: () => void
}

export default function MainToolbar({
  currentView,
  toggleView,
  deviceType,
  setDeviceType,
  sidebarView,
  setSidebarView,
  rightPanelView,
  setRightPanelView,
  toggleSidebar,
  toggleRightPanel,
  onUndo,
  onRedo,
  onSave,
  canUndo,
  canRedo,
  toggleResponsivePreview,
}: MainToolbarProps) {
  return (
    <TooltipProvider>
      <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold px-2">Website Builder</h1>

          <Separator orientation="vertical" className="h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
                <PanelLeft className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle sidebar</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("elements")}
                aria-label="Elements panel"
                className={sidebarView === "elements" ? "bg-gray-100" : ""}
              >
                <Layers className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Elements</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("templates")}
                aria-label="Templates panel"
                className={sidebarView === "templates" ? "bg-gray-100" : ""}
              >
                <Grid3x3 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Templates</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("sections")}
                aria-label="Section templates"
                className={sidebarView === "sections" ? "bg-gray-100" : ""}
              >
                <LayoutTemplate className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Section Templates</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("assets")}
                aria-label="Assets panel"
                className={sidebarView === "assets" ? "bg-gray-100" : ""}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Assets</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("theme")}
                aria-label="Theme panel"
                className={sidebarView === "theme" ? "bg-gray-100" : ""}
              >
                <Palette className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Theme</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("export")}
                aria-label="Export panel"
                className={sidebarView === "export" ? "bg-gray-100" : ""}
              >
                <FileOutput className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("ai")}
                aria-label="AI Assistant"
                className={sidebarView === "ai" ? "bg-gray-100" : ""}
              >
                <Bot className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>AI Assistant</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("global-styles")}
                aria-label="Global Styles"
                className={sidebarView === "global-styles" ? "bg-gray-100" : ""}
              >
                <Palette className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Global Styles</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("animations")}
                aria-label="Animations"
                className={sidebarView === "animations" ? "bg-gray-100" : ""}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Animations</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("seo")}
                aria-label="SEO Settings"
                className={sidebarView === "seo" ? "bg-gray-100" : ""}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>SEO Settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarView("custom-code")}
                aria-label="Custom Code"
                className={sidebarView === "custom-code" ? "bg-gray-100" : ""}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Custom Code</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onUndo} disabled={!canUndo} aria-label="Undo">
                <Undo2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onRedo} disabled={!canRedo} aria-label="Redo">
                <Redo2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onSave} aria-label="Save">
                <Save className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save (Ctrl+S)</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={deviceType === "desktop" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setDeviceType("desktop")}
                aria-label="Desktop view"
              >
                <Laptop className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Desktop view</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={deviceType === "tablet" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setDeviceType("tablet")}
                aria-label="Tablet view"
              >
                <Tablet className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tablet view</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={deviceType === "mobile" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setDeviceType("mobile")}
                aria-label="Mobile view"
              >
                <Smartphone className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mobile view</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleResponsivePreview} aria-label="Responsive preview">
                <MobilePreviewIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Responsive preview</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRightPanelView("properties")}
                aria-label="Properties panel"
                className={rightPanelView === "properties" ? "bg-gray-100" : ""}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Properties</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRightPanelView("history")}
                aria-label="History panel"
                className={rightPanelView === "history" ? "bg-gray-100" : ""}
              >
                <History className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>History</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleRightPanel} aria-label="Toggle right panel">
                <PanelRight className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle right panel</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={currentView === "preview" ? "default" : "outline"}
                onClick={toggleView}
                className="flex items-center gap-2"
              >
                {currentView === "preview" ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span>Exit Preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{currentView === "preview" ? "Exit preview mode" : "Enter preview mode"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
