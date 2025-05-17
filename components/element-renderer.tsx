"use client"

import type React from "react"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Element, DeviceType, ThemeSettings } from "../lib/types"
import { Trash2, Copy, ArrowUp, ArrowDown } from "lucide-react"
import { memo } from "react"

interface ElementRendererProps {
  element: Element
  isPreview?: boolean
  deviceType: DeviceType
  theme: ThemeSettings
}

function ElementRenderer({ element, isPreview = false, deviceType, theme }: ElementRendererProps) {
  const { type, content, styles, children = [] } = element

  // Combine base styles with responsive styles for current device
  const combinedStyles = {
    ...styles,
    ...(element.responsiveStyles?.[deviceType] || {}),
  }

  // Apply animation styles if they exist
  const animationStyles: React.CSSProperties = {}
  if (!isPreview && element.animation && element.animation.type !== "none") {
    const { type, duration, delay, easing, trigger } = element.animation

    if (trigger === "onload") {
      animationStyles.animationName = type
      animationStyles.animationDuration = `${duration}s`
      animationStyles.animationDelay = `${delay}s`
      animationStyles.animationTimingFunction = easing
      animationStyles.animationFillMode = "both"
    }
  }

  // Then merge these styles with combinedStyles:
  const finalStyles = {
    ...combinedStyles,
    ...animationStyles,
  }

  // Apply theme settings where appropriate
  if (type.includes("heading") && theme.headingFont) {
    finalStyles.fontFamily = theme.headingFont
  }

  if (type.includes("button") && theme.primaryColor) {
    finalStyles.backgroundColor = theme.primaryColor
  }

  // Render different elements based on type
  switch (type) {
    case "sidebar-0":
    case "sidebar-0-2":
    case "sidebar-0-3": {
      const HeadingTag = type === "sidebar-0" ? "h1" : type === "sidebar-0-2" ? "h2" : "h3"
      return <HeadingTag style={finalStyles}>{content}</HeadingTag>
    }

    case "sidebar-1": // Paragraph
      return <p style={finalStyles}>{content}</p>

    case "sidebar-2": // Button
      return <button style={finalStyles}>{content}</button>

    case "sidebar-3": // Image
      return <img src={content || "/placeholder.svg"} alt="Content" style={finalStyles} />

    case "sidebar-separator": // Separator
      return <hr style={finalStyles} />

    case "sidebar-container": // Container
      return <ContainerElement element={element} isPreview={isPreview} deviceType={deviceType} theme={theme} />

    case "sidebar-columns-2": // 2 Columns
    case "sidebar-columns-3": // 3 Columns
    case "sidebar-columns-4": // 4 Columns
      return <ColumnsElement element={element} isPreview={isPreview} deviceType={deviceType} theme={theme} />

    case "sidebar-form": // Form
      return (
        <form style={finalStyles} onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="Your email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea className="w-full p-2 border rounded" rows={4} placeholder="Your message"></textarea>
            </div>
            <button
              className="px-4 py-2 rounded"
              style={{
                backgroundColor: theme.primaryColor || "#4F46E5",
                color: "#FFFFFF",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      )

    case "sidebar-video": // Video
      return (
        <div style={finalStyles}>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={content || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            ></iframe>
          </div>
        </div>
      )

    case "sidebar-map": // Map
      return (
        <div style={finalStyles}>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={
                content ||
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1619756483453!5m2!1sen!2sca"
              }
              allowFullScreen
              loading="lazy"
              className="w-full h-full rounded"
            ></iframe>
          </div>
        </div>
      )

    case "sidebar-testimonial": // Testimonial
      return (
        <div style={finalStyles} className="p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
            <div>
              <h4 className="font-medium">John Doe</h4>
              <p className="text-sm text-gray-500">CEO, Example Company</p>
            </div>
          </div>
          <p className="italic">
            {content || "This product has completely transformed our business operations. Highly recommended!"}
          </p>
          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      )

    case "sidebar-feature": // Feature Card
      return (
        <div style={finalStyles} className="p-6 border rounded-lg">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Feature Title</h3>
          <p className="text-gray-600">
            {content || "This feature will help you accomplish amazing things with very little effort."}
          </p>
        </div>
      )

    default:
      return <div style={finalStyles}>{content || "Unknown element type"}</div>
  }
}

export default memo(ElementRenderer)

interface ContainerElementProps {
  element: Element
  isPreview: boolean
  deviceType: DeviceType
  theme: ThemeSettings
}

function ContainerElement({ element, isPreview, deviceType, theme }: ContainerElementProps) {
  const { setNodeRef } = useDroppable({
    id: element.id,
    disabled: isPreview,
  })

  const combinedStyles = {
    ...element.styles,
    ...(element.responsiveStyles?.[deviceType] || {}),
  }

  // Apply display flex if not already set
  if (!combinedStyles.display) {
    combinedStyles.display = "flex"
    combinedStyles.flexDirection = "column"
  }

  return (
    <div
      ref={setNodeRef}
      style={combinedStyles}
      className={`p-4 border border-dashed ${isPreview ? "border-transparent" : "border-gray-300"} rounded-lg min-h-[100px]`}
    >
      {element.children && element.children.length > 0 ? (
        <SortableContext items={element.children.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          {element.children.map((child) => (
            <NestedSortableElement
              key={child.id}
              element={child}
              isPreview={isPreview}
              deviceType={deviceType}
              theme={theme}
            />
          ))}
        </SortableContext>
      ) : !isPreview ? (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm">Drop elements here</div>
      ) : null}
    </div>
  )
}

interface ColumnsElementProps {
  element: Element
  isPreview: boolean
  deviceType: DeviceType
  theme: ThemeSettings
}

function ColumnsElement({ element, isPreview, deviceType, theme }: ColumnsElementProps) {
  // Determine number of columns from element type
  let columnCount = 2
  if (element.type === "sidebar-columns-3") columnCount = 3
  if (element.type === "sidebar-columns-4") columnCount = 4

  // For mobile, always use 1 column
  if (deviceType === "mobile") columnCount = 1
  // For tablet, max 2 columns
  if (deviceType === "tablet" && columnCount > 2) columnCount = 2

  const combinedStyles = {
    ...element.styles,
    ...(element.responsiveStyles?.[deviceType] || {}),
  }

  // Create empty column placeholders if needed
  const columns = Array.from({ length: columnCount }).map((_, index) => {
    return (
      element.children?.[index] || {
        id: `${element.id}-col-${index}`,
        type: "column-placeholder",
        position: index,
        content: "",
        styles: {},
        parentId: element.id,
        children: [],
      }
    )
  })

  return (
    <div
      style={{
        ...combinedStyles,
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: combinedStyles.gap || "1rem",
      }}
    >
      {columns.map((column, index) => (
        <div
          key={column.id}
          className={`${isPreview ? "" : "border border-dashed border-gray-300"} rounded-lg p-2 min-h-[100px]`}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: combinedStyles.justifyContent || "flex-start",
            alignItems: combinedStyles.alignItems || "stretch",
          }}
        >
          {column.type !== "column-placeholder" ? (
            <ElementRenderer element={column} isPreview={isPreview} deviceType={deviceType} theme={theme} />
          ) : !isPreview ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">Column {index + 1}</div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

interface NestedSortableElementProps {
  element: Element
  isPreview: boolean
  deviceType: DeviceType
  theme: ThemeSettings
}

function NestedSortableElement({ element, isPreview, deviceType, theme }: NestedSortableElementProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: element.id,
    disabled: isPreview,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative my-2">
      {!isPreview && (
        <div className="absolute right-0 top-0 flex z-10 bg-white/80 rounded-bl">
          <div {...attributes} {...listeners} className="cursor-move bg-gray-200 p-1 text-xs">
            <ArrowUp className="h-4 w-4" />
            <ArrowDown className="h-4 w-4" />
          </div>
          <button
            className="bg-blue-500 text-white p-1"
            onClick={(e) => {
              e.stopPropagation()
              // Clone functionality would go here
              console.log("Clone element:", element.id)
            }}
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            className="bg-red-500 text-white p-1"
            onClick={(e) => {
              e.stopPropagation()
              // Delete functionality would go here
              console.log("Delete element:", element.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <ElementRenderer element={element} isPreview={isPreview} deviceType={deviceType} theme={theme} />
    </div>
  )
}
