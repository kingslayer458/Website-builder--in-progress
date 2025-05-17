export type ElementType =
  | "sidebar-0" // Heading 1
  | "sidebar-0-2" // Heading 2
  | "sidebar-0-3" // Heading 3
  | "sidebar-1" // Paragraph
  | "sidebar-2" // Button
  | "sidebar-3" // Image
  | "sidebar-separator" // Separator
  | "sidebar-container" // Container
  | "sidebar-columns-2" // 2 Columns
  | "sidebar-columns-3" // 3 Columns
  | "sidebar-columns-4" // 4 Columns
  | "sidebar-form" // Form
  | "sidebar-input" // Input
  | "sidebar-textarea" // Textarea
  | "sidebar-checkbox" // Checkbox
  | "sidebar-radio" // Radio
  | "sidebar-select" // Select
  | "sidebar-video" // Video
  | "sidebar-map" // Map
  | "sidebar-icon" // Icon
  | "sidebar-list" // List
  | "sidebar-table" // Table
  | "sidebar-testimonial" // Testimonial
  | "sidebar-pricing" // Pricing Table
  | "sidebar-social" // Social Links
  | "sidebar-feature" // Feature Card
  | "column-placeholder" // Column placeholder

export type DeviceType = "mobile" | "tablet" | "desktop"

export interface Element {
  id: string
  type: ElementType
  position: number
  content: string
  styles: Record<string, string>
  parentId: string | null
  children: Element[]
  responsiveStyles?: {
    mobile: Record<string, string>
    tablet: Record<string, string>
    desktop: Record<string, string>
  }
  animation?: {
    type: string
    duration: number
    delay: number
    easing: string
    trigger: string
  }
}

export interface HistoryAction {
  id: string
  elements: Element[]
  timestamp: string
}

export interface ThemeSettings {
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  textColor?: string
  fontFamily?: string
  headingFont?: string
  baseFontSize?: string
  containerWidth?: string
  spacingUnit?: string
  h1FontSize?: string
  h1FontWeight?: string
  h2FontSize?: string
  h2FontWeight?: string
  bodyFontSize?: string
  bodyLineHeight?: string
}

export interface Template {
  id: string
  name: string
  category: string
  thumbnail?: string
  elements: Element[]
}

export interface Asset {
  id: string
  name: string
  type: string
  size: number
  url: string
  dateAdded: string
}
