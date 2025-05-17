"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import { createPortal } from "react-dom"

// Components
import MainToolbar from "./main-toolbar"
import ElementsSidebar from "./elements-sidebar"
import Canvas from "./canvas"
import PropertiesPanel from "./properties-panel"
import ElementRenderer from "./element-renderer"
import HistoryPanel from "./history-panel"
import TemplateLibrary from "./template-library"
import ResponsiveControls from "./responsive-controls"
import ThemeSettings from "./theme-settings"
import ExportPanel from "./export-panel"
import AssetManager from "./asset-manager"
import AIAssistant from "./ai-assistant"
import SectionTemplates from "./section-templates"
import ResponsivePreview from "./responsive-preview"
import GlobalStylesPanel from "./global-styles-panel"
import AnimationPanel from "./animation-panel"
import SEOPanel from "./seo-panel"
import CustomCodePanel from "./custom-code-panel"

// Types
import type {
  Element,
  ElementType,
  HistoryAction,
  DeviceType,
  ThemeSettings as ThemeSettingsType,
  Template,
  Asset,
} from "../lib/types"

// Utils
import { getDefaultContent, getDefaultStyles, generateElementId, generateUniqueId } from "../lib/element-utils"
import { defaultTheme } from "../lib/theme-utils"
import { defaultTemplates } from "../lib/template-utils"

// Inline hooks
// useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = useCallback(
    (value: T) => {
      try {
        // Save state
        setStoredValue(value)
        // Save to local storage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(value))
        }
      } catch (error) {
        console.log(error)
      }
    },
    [key],
  )

  return [storedValue, setValue]
}

// useHotkeys hook
function useHotkeys(keyCombo: string, callback: (e: KeyboardEvent) => void, deps: any[] = []) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keys = keyCombo.toLowerCase().split("+")

      // Check if the modifier keys match
      const modifierMatch = {
        ctrl: keys.includes("ctrl") === event.ctrlKey,
        alt: keys.includes("alt") === event.altKey,
        shift: keys.includes("shift") === event.shiftKey,
        meta: keys.includes("meta") === event.metaKey,
        mod: keys.includes("mod") === (event.metaKey || event.ctrlKey),
      }

      // Get the main key (the last one that's not a modifier)
      const mainKey = keys.filter((key) => !["ctrl", "alt", "shift", "meta", "mod"].includes(key))[0]

      // Check if all conditions are met
      const allModifiersMatch = Object.values(modifierMatch).every((match) => match)
      const mainKeyMatches = !mainKey || event.key.toLowerCase() === mainKey

      if (allModifiersMatch && mainKeyMatches) {
        event.preventDefault()
        callback(event)
      }
    },
    [keyCombo, callback, ...deps],
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [handleKeyDown])
}

// useToast hook (simplified)
function useToast() {
  const toast = useCallback(({ title, description }: { title: string; description: string }) => {
    if (typeof window !== "undefined") {
      console.log(`Toast: ${title} - ${description}`)
      // In a real implementation, this would show a toast notification
      // For now, we'll just log to the console
    }
  }, [])

  return { toast }
}

export default function WebsiteBuilder() {
  // Core state
  const [elements, setElements] = useState<Element[]>([])
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeElement, setActiveElement] = useState<Element | null>(null)

  // UI state
  const [currentView, setCurrentView] = useState<"editor" | "preview">("editor")
  const [sidebarView, setSidebarView] = useState<
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
  >("elements")
  const [rightPanelView, setRightPanelView] = useState<"properties" | "history">("properties")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)
  const [isResponsivePreviewOpen, setIsResponsivePreviewOpen] = useState(false)

  // Feature-specific state
  const [history, setHistory] = useState<HistoryAction[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")
  const [themeSettings, setThemeSettings] = useState<ThemeSettingsType>(defaultTheme)
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates)
  const [assets, setAssets] = useState<Asset[]>([])

  // Additional feature state
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({})
  const [customCode, setCustomCode] = useState<{ head: string; css: string; javascript: string }>({
    head: "",
    css: "",
    javascript: "",
  })
  const [seoSettings, setSeoSettings] = useState<any>({
    title: "My Website",
    description: "A website built with the Website Builder",
    keywords: "website, builder, drag and drop",
  })

  // Refs
  const isHistoryMutationRef = useRef(false)
  const prevElementsRef = useRef<Element[]>([])

  // Hooks
  const { toast } = useToast()

  // Persistence
  const [savedElements, setSavedElements] = useLocalStorage<Element[]>("website-builder-elements", [])
  const [savedTheme, setSavedTheme] = useLocalStorage<ThemeSettingsType>("website-builder-theme", defaultTheme)
  const [savedAssets, setSavedAssets] = useLocalStorage<Asset[]>("website-builder-assets", [])

  // Load persisted data on mount only
  useEffect(() => {
    if (savedElements.length > 0) {
      setElements(savedElements)
    }
    if (savedTheme) {
      setThemeSettings(savedTheme)
    }
    if (savedAssets.length > 0) {
      setAssets(savedAssets)
    }
  }, [savedElements, savedTheme, savedAssets])

  // Manual save function instead of automatic persistence
  const saveToLocalStorage = useCallback(() => {
    setSavedElements(elements)
    setSavedTheme(themeSettings)
    setSavedAssets(assets)
  }, [elements, themeSettings, assets, setSavedElements, setSavedTheme, setSavedAssets])

  // Initialize history when elements change (but not during history navigation)
  useEffect(() => {
    // Skip if we're in the middle of a history navigation
    if (isHistoryMutationRef.current) {
      isHistoryMutationRef.current = false
      return
    }

    // Skip if elements haven't actually changed (deep comparison would be better)
    const elementsJSON = JSON.stringify(elements)
    const prevElementsJSON = JSON.stringify(prevElementsRef.current)

    if (elementsJSON === prevElementsJSON) {
      return
    }

    // Update our ref for the next comparison
    prevElementsRef.current = JSON.parse(JSON.stringify(elements)) // Deep clone to avoid reference issues

    if (historyIndex >= -1) {
      // Remove any future history that would be lost by a new action
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push({
        id: generateUniqueId(),
        elements: JSON.parse(JSON.stringify(elements)), // Ensure deep clone
        timestamp: new Date().toISOString(),
      })

      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }, [elements, history, historyIndex])

  // Hotkeys
  useHotkeys("mod+z", handleUndo)
  useHotkeys("mod+shift+z", handleRedo)
  useHotkeys("mod+s", handleSave)

  // History management
  function handleUndo() {
    if (historyIndex > 0) {
      isHistoryMutationRef.current = true
      setHistoryIndex(historyIndex - 1)
      setElements(JSON.parse(JSON.stringify(history[historyIndex - 1].elements)))
    }
  }

  function handleRedo() {
    if (historyIndex < history.length - 1) {
      isHistoryMutationRef.current = true
      setHistoryIndex(historyIndex + 1)
      setElements(JSON.parse(JSON.stringify(history[historyIndex + 1].elements)))
    }
  }

  function handleSave() {
    saveToLocalStorage()
    toast({
      title: "Project saved",
      description: "Your project has been saved to local storage",
    })
  }

  // Drag and drop handlers
  const handleDragStart = useCallback(
    (event: any) => {
      const { active } = event
      setActiveId(active.id)

      // If dragging from sidebar, create a temporary element
      if (typeof active.id === "string" && active.id.startsWith("sidebar-")) {
        const elementType = active.id as ElementType
        const tempElement: Element = {
          id: `temp-${Date.now()}`,
          type: elementType,
          position: 0,
          content: getDefaultContent(elementType),
          styles: getDefaultStyles(elementType, deviceType, themeSettings),
          parentId: null,
          children: [],
          responsiveStyles: {
            mobile: {},
            tablet: {},
            desktop: {},
          },
        }
        setActiveElement(tempElement)
      } else {
        // If dragging an existing element
        const draggedElement = findElementById(active.id)
        if (draggedElement) {
          setActiveElement(draggedElement)
        }
      }
    },
    [elements, deviceType, themeSettings],
  )

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event

      setActiveId(null)
      setActiveElement(null)

      if (!over) return

      // If dragging from sidebar to canvas or container
      if (typeof active.id === "string" && active.id.startsWith("sidebar-")) {
        const elementType = active.id as ElementType
        const newElement: Element = {
          id: generateElementId(),
          type: elementType,
          position: elements.length,
          content: getDefaultContent(elementType),
          styles: getDefaultStyles(elementType, deviceType, themeSettings),
          parentId: over.id === "canvas" ? null : over.id,
          children: [],
          responsiveStyles: {
            mobile: {},
            tablet: {},
            desktop: {},
          },
        }

        if (over.id === "canvas") {
          // Add to root level
          setElements([...elements, newElement])
        } else {
          // Add to container
          const newElements = addElementToContainer(elements, over.id, newElement)
          setElements(newElements)
        }

        setSelectedElement(newElement)
        return
      }

      // If reordering within canvas or container
      if (active.id !== over.id) {
        // Handle reordering logic
        const newElements = reorderElements(elements, active.id, over.id)
        setElements(newElements)
      }
    },
    [elements, deviceType, themeSettings],
  )

  // Element management
  const updateElementProperties = useCallback(
    (id: string, properties: Partial<Element>) => {
      const newElements = updateElement(elements, id, properties)
      setElements(newElements)

      // Update selected element if it's the one being modified
      if (selectedElement?.id === id) {
        const updatedElement = findElementById(id, newElements)
        if (updatedElement) {
          setSelectedElement(updatedElement)
        }
      }
    },
    [elements, selectedElement],
  )

  const deleteElement = useCallback(
    (id: string) => {
      const newElements = removeElement(elements, id)
      setElements(newElements)

      if (selectedElement?.id === id) {
        setSelectedElement(null)
      }
    },
    [elements, selectedElement],
  )

  // Template management
  const applyTemplate = useCallback((template: Template) => {
    setElements(template.elements)
    toast({
      title: "Template applied",
      description: `Applied template: ${template.name}`,
    })
  }, [])

  // Section template management
  const applySectionTemplate = useCallback(
    (sectionElements: Element[]) => {
      // Generate new IDs for all elements to avoid conflicts
      const newElements = sectionElements.map((element) => ({
        ...element,
        id: generateElementId(),
      }))

      // Add the section elements to the existing elements
      setElements([...elements, ...newElements])
      toast({
        title: "Section added",
        description: "Section template has been added to your page",
      })
    },
    [elements],
  )

  // Toggle responsive preview
  const toggleResponsivePreview = useCallback(() => {
    setIsResponsivePreviewOpen(!isResponsivePreviewOpen)
  }, [isResponsivePreviewOpen])

  // Helper functions
  function findElementById(id: string, elementsArray = elements): Element | null {
    for (const element of elementsArray) {
      if (element.id === id) {
        return element
      }

      if (element.children && element.children.length > 0) {
        const found = findElementById(id, element.children)
        if (found) return found
      }
    }

    return null
  }

  function updateElement(elementsArray: Element[], id: string, properties: Partial<Element>): Element[] {
    return elementsArray.map((element) => {
      if (element.id === id) {
        return { ...element, ...properties }
      }

      if (element.children && element.children.length > 0) {
        return {
          ...element,
          children: updateElement(element.children, id, properties),
        }
      }

      return element
    })
  }

  function removeElement(elementsArray: Element[], id: string): Element[] {
    const filtered = elementsArray.filter((element) => element.id !== id)

    return filtered.map((element) => {
      if (element.children && element.children.length > 0) {
        return {
          ...element,
          children: removeElement(element.children, id),
        }
      }

      return element
    })
  }

  function addElementToContainer(elementsArray: Element[], containerId: string, newElement: Element): Element[] {
    return elementsArray.map((element) => {
      if (element.id === containerId) {
        return {
          ...element,
          children: [...(element.children || []), newElement],
        }
      }

      if (element.children && element.children.length > 0) {
        return {
          ...element,
          children: addElementToContainer(element.children, containerId, newElement),
        }
      }

      return element
    })
  }

  function reorderElements(elementsArray: Element[], activeId: string, overId: string): Element[] {
    // Find the elements and their parents
    let activeElement: Element | null = null
    let activeParentId: string | null = null
    let overElement: Element | null = null
    let overParentId: string | null = null

    // Helper to find elements and their parents
    function findElementAndParent(
      id: string,
      elements: Element[],
      parentId: string | null = null,
    ): { element: Element | null; parentId: string | null } {
      for (const element of elements) {
        if (element.id === id) {
          return { element, parentId }
        }

        if (element.children && element.children.length > 0) {
          const result = findElementAndParent(id, element.children, element.id)
          if (result.element) return result
        }
      }

      return { element: null, parentId: null }
    }

    // Find active element and its parent
    const activeResult = findElementAndParent(activeId, elementsArray)
    activeElement = activeResult.element
    activeParentId = activeResult.parentId

    // Find over element and its parent
    const overResult = findElementAndParent(overId, elementsArray)
    overElement = overResult.element
    overParentId = overResult.parentId

    if (!activeElement || !overElement) return elementsArray

    // If they're in the same parent, just reorder
    if (activeParentId === overParentId) {
      const parent = activeParentId === null ? elementsArray : findElementById(activeParentId)?.children || []
      const oldIndex = parent.findIndex((el) => el.id === activeId)
      const newIndex = parent.findIndex((el) => el.id === overId)

      if (oldIndex === -1 || newIndex === -1) return elementsArray

      // Create a new array with the reordered elements
      const newParent = [...parent]
      const [removed] = newParent.splice(oldIndex, 1)
      newParent.splice(newIndex, 0, removed)

      // If it's the root level, return directly
      if (activeParentId === null) {
        return newParent
      }

      // Otherwise update the parent's children
      return updateElement(elementsArray, activeParentId, { children: newParent })
    }

    // If they're in different parents, move from one to the other
    // Remove from old parent
    let newElements = removeElement(elementsArray, activeId)

    // Add to new parent
    if (overParentId === null) {
      // Add to root level
      const overIndex = elementsArray.findIndex((el) => el.id === overId)
      newElements.splice(overIndex, 0, activeElement)
    } else {
      // Add to container
      const parent = findElementById(overParentId, newElements)
      if (parent && parent.children) {
        const overIndex = parent.children.findIndex((el) => el.id === overId)
        const newChildren = [...parent.children]
        newChildren.splice(overIndex, 0, activeElement)
        newElements = updateElement(newElements, overParentId, { children: newChildren })
      }
    }

    return newElements
  }

  // View management
  const toggleView = useCallback(() => {
    setCurrentView(currentView === "editor" ? "preview" : "editor")
    if (currentView === "editor") {
      setSelectedElement(null)
    }
  }, [currentView])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen)
  }, [isSidebarOpen])

  const toggleRightPanel = useCallback(() => {
    setIsRightPanelOpen(!isRightPanelOpen)
  }, [isRightPanelOpen])

  return (
    <div
      className="flex flex-col h-screen"
      style={themeSettings.fontFamily ? { fontFamily: themeSettings.fontFamily } : {}}
    >
      <MainToolbar
        currentView={currentView}
        toggleView={toggleView}
        deviceType={deviceType}
        setDeviceType={setDeviceType}
        sidebarView={sidebarView}
        setSidebarView={setSidebarView}
        rightPanelView={rightPanelView}
        setRightPanelView={setRightPanelView}
        toggleSidebar={toggleSidebar}
        toggleRightPanel={toggleRightPanel}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSave}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        toggleResponsivePreview={toggleResponsivePreview}
      />

      {isResponsivePreviewOpen ? (
        <ResponsivePreview
          elements={elements}
          deviceType={deviceType}
          setDeviceType={setDeviceType}
          theme={themeSettings}
          onClose={toggleResponsivePreview}
        />
      ) : (
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="flex flex-1 overflow-hidden">
            {currentView === "editor" && isSidebarOpen && (
              <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
                {sidebarView === "elements" && <ElementsSidebar />}
                {sidebarView === "templates" && <TemplateLibrary templates={templates} applyTemplate={applyTemplate} />}
                {sidebarView === "sections" && <SectionTemplates onApplyTemplate={applySectionTemplate} />}
                {sidebarView === "assets" && <AssetManager assets={assets} setAssets={setAssets} />}
                {sidebarView === "theme" && <ThemeSettings theme={themeSettings} setTheme={setThemeSettings} />}
                {sidebarView === "export" && <ExportPanel elements={elements} theme={themeSettings} />}
                {sidebarView === "ai" && <AIAssistant elements={elements} setElements={setElements} />}
                {sidebarView === "global-styles" && (
                  <GlobalStylesPanel
                    theme={themeSettings}
                    setTheme={setThemeSettings}
                    cssVariables={cssVariables}
                    setCssVariables={setCssVariables}
                  />
                )}
                {sidebarView === "animations" && selectedElement && (
                  <AnimationPanel element={selectedElement} updateElementProperties={updateElementProperties} />
                )}
                {sidebarView === "seo" && <SEOPanel seoSettings={seoSettings} updateSeoSettings={setSeoSettings} />}
                {sidebarView === "custom-code" && (
                  <CustomCodePanel customCode={customCode} updateCustomCode={setCustomCode} />
                )}
              </div>
            )}

            <div className="flex-1 flex">
              <Canvas
                elements={elements}
                selectedElementId={selectedElement?.id}
                setSelectedElement={setSelectedElement}
                deleteElement={deleteElement}
                isPreviewMode={currentView === "preview"}
                deviceType={deviceType}
                theme={themeSettings}
              />
            </div>

            {currentView === "editor" && isRightPanelOpen && selectedElement && (
              <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
                {rightPanelView === "properties" && (
                  <PropertiesPanel
                    element={selectedElement}
                    updateElementProperties={updateElementProperties}
                    deviceType={deviceType}
                    theme={themeSettings}
                  />
                )}
                {rightPanelView === "history" && (
                  <HistoryPanel
                    history={history}
                    currentIndex={historyIndex}
                    goToHistoryState={(index) => {
                      isHistoryMutationRef.current = true
                      setHistoryIndex(index)
                      setElements(JSON.parse(JSON.stringify(history[index].elements)))
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {typeof window !== "undefined" &&
            createPortal(
              <DragOverlay>
                {activeId && activeElement && (
                  <div className="opacity-70">
                    <ElementRenderer
                      element={activeElement}
                      isPreview={true}
                      deviceType={deviceType}
                      theme={themeSettings}
                    />
                  </div>
                )}
              </DragOverlay>,
              document.body,
            )}
        </DndContext>
      )}

      {currentView === "editor" && !isResponsivePreviewOpen && (
        <ResponsiveControls deviceType={deviceType} setDeviceType={setDeviceType} />
      )}
    </div>
  )
}
