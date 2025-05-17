"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Element, DeviceType, ThemeSettings } from "../lib/types"
import { Trash2, Copy, ArrowUp, ArrowDown } from "lucide-react"
import ElementRenderer from "./element-renderer"
import { memo, useMemo } from "react"

interface CanvasProps {
  elements: Element[]
  selectedElementId: string | undefined
  setSelectedElement: (element: Element | null) => void
  deleteElement: (id: string) => void
  isPreviewMode: boolean
  deviceType: DeviceType
  theme: ThemeSettings
}

function Canvas({
  elements,
  selectedElementId,
  setSelectedElement,
  deleteElement,
  isPreviewMode,
  deviceType,
  theme,
}: CanvasProps) {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  })

  // Calculate canvas width based on device type
  const getCanvasWidth = () => {
    switch (deviceType) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-2xl"
      case "desktop":
      default:
        return "max-w-6xl"
    }
  }

  const sortableItems = useMemo(() => elements.map((e) => e.id), [elements])

  return (
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
      <div
        ref={setNodeRef}
        className={`bg-white rounded-lg shadow-sm min-h-[calc(100vh-8rem)] mx-auto transition-all duration-300 ${getCanvasWidth()}`}
        style={{
          ...(theme.backgroundColor ? { backgroundColor: theme.backgroundColor } : {}),
          ...(theme.textColor ? { color: theme.textColor } : {}),
        }}
      >
        <div className="p-6 min-h-[calc(100vh-8rem)]">
          {elements.length === 0 && !isPreviewMode && (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">Drag and drop elements here</p>
            </div>
          )}

          <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
            {elements.map((element) => (
              <SortableElement
                key={element.id}
                element={element}
                isSelected={element.id === selectedElementId}
                setSelectedElement={setSelectedElement}
                deleteElement={deleteElement}
                isPreviewMode={isPreviewMode}
                deviceType={deviceType}
                theme={theme}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  )
}

export default memo(Canvas)

interface SortableElementProps {
  element: Element
  isSelected: boolean
  setSelectedElement: (element: Element | null) => void
  deleteElement: (id: string) => void
  isPreviewMode: boolean
  deviceType: DeviceType
  theme: ThemeSettings
}

function SortableElement({
  element,
  isSelected,
  setSelectedElement,
  deleteElement,
  isPreviewMode,
  deviceType,
  theme,
}: SortableElementProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: element.id,
    disabled: isPreviewMode,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Handle container elements differently
  const isContainer =
    element.type === "sidebar-container" ||
    element.type === "sidebar-columns-2" ||
    element.type === "sidebar-columns-3" ||
    element.type === "sidebar-columns-4"

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative my-2 ${isSelected && !isPreviewMode ? "outline outline-2 outline-blue-500" : ""}`}
      onClick={(e) => {
        if (!isPreviewMode) {
          e.stopPropagation()
          setSelectedElement(element)
        }
      }}
    >
      {!isPreviewMode && (
        <div className="absolute right-0 top-0 flex z-10 bg-white/80 rounded-bl">
          <div {...attributes} {...listeners} className="cursor-move bg-gray-200 p-1 text-xs">
            <ArrowUp className="h-4 w-4" />
            <ArrowDown className="h-4 w-4" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              // Clone element functionality would go here
            }}
            className="bg-blue-500 text-white p-1"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteElement(element.id)
            }}
            className="bg-red-500 text-white p-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <ElementRenderer element={element} isPreview={isPreviewMode} deviceType={deviceType} theme={theme} />
    </div>
  )
}
