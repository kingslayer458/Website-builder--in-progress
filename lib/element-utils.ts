import type { ElementType, DeviceType, ThemeSettings } from "./types"

export function getDefaultContent(type: ElementType): string {
  switch (type) {
    case "sidebar-0": // Heading 1
      return "Heading 1"
    case "sidebar-0-2": // Heading 2
      return "Heading 2"
    case "sidebar-0-3": // Heading 3
      return "Heading 3"
    case "sidebar-1": // Paragraph
      return "This is a paragraph of text. Click to edit this text."
    case "sidebar-2": // Button
      return "Click Me"
    case "sidebar-3": // Image
      return "/placeholder.svg?key=j1pld"
    case "sidebar-form": // Form
      return "Contact Form"
    case "sidebar-video": // Video
      return "https://www.youtube.com/embed/dQw4w9WgXcQ"
    case "sidebar-map": // Map
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1619756483453!5m2!1sen!2sca"
    case "sidebar-testimonial": // Testimonial
      return "This product has completely transformed our business operations. Highly recommended!"
    case "sidebar-feature": // Feature Card
      return "This feature will help you accomplish amazing things with very little effort."
    default:
      return ""
  }
}

export function getDefaultStyles(
  type: ElementType,
  deviceType: DeviceType,
  theme: ThemeSettings,
): Record<string, string> {
  const baseStyles: Record<string, Record<string, string>> = {
    "sidebar-0": {
      // Heading 1
      fontSize: "32px",
      fontWeight: "bold",
      color: theme.textColor || "#333333",
      textAlign: "left",
      padding: "10px",
      marginBottom: "20px",
      ...(theme.headingFont ? { fontFamily: theme.headingFont } : {}),
    },
    "sidebar-0-2": {
      // Heading 2
      fontSize: "24px",
      fontWeight: "bold",
      color: theme.textColor || "#333333",
      textAlign: "left",
      padding: "10px",
      marginBottom: "16px",
      ...(theme.headingFont ? { fontFamily: theme.headingFont } : {}),
    },
    "sidebar-0-3": {
      // Heading 3
      fontSize: "20px",
      fontWeight: "bold",
      color: theme.textColor || "#333333",
      textAlign: "left",
      padding: "10px",
      marginBottom: "12px",
      ...(theme.headingFont ? { fontFamily: theme.headingFont } : {}),
    },
    "sidebar-1": {
      // Paragraph
      fontSize: "16px",
      color: theme.textColor || "#666666",
      textAlign: "left",
      lineHeight: "1.5",
      padding: "10px",
      marginBottom: "16px",
    },
    "sidebar-2": {
      // Button
      backgroundColor: theme.primaryColor || "#4F46E5",
      color: "#FFFFFF",
      padding: "10px 20px",
      borderRadius: "4px",
      fontWeight: "medium",
      textAlign: "center",
      cursor: "pointer",
      border: "none",
      display: "inline-block",
    },
    "sidebar-3": {
      // Image
      width: "100%",
      maxWidth: "100%",
      height: "auto",
      objectFit: "cover",
      display: "block",
      marginBottom: "16px",
    },
    "sidebar-separator": {
      // Separator
      border: "none",
      borderTop: "1px solid #E5E7EB",
      margin: "20px 0",
      width: "100%",
    },
    "sidebar-container": {
      // Container
      width: "100%",
      padding: "20px",
      backgroundColor: "#FFFFFF",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
    "sidebar-columns-2": {
      // 2 Columns
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      width: "100%",
      marginBottom: "20px",
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
    "sidebar-columns-3": {
      // 3 Columns
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "20px",
      width: "100%",
      marginBottom: "20px",
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
    "sidebar-columns-4": {
      // 4 Columns
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: "20px",
      width: "100%",
      marginBottom: "20px",
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
    "sidebar-form": {
      // Form
      width: "100%",
      padding: "20px",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    "sidebar-video": {
      // Video
      width: "100%",
      marginBottom: "20px",
    },
    "sidebar-map": {
      // Map
      width: "100%",
      height: "300px",
      border: "none",
      marginBottom: "20px",
    },
    "sidebar-testimonial": {
      // Testimonial
      padding: "20px",
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
      marginBottom: "20px",
      borderLeft: `4px solid ${theme.primaryColor || "#4F46E5"}`,
    },
    "sidebar-feature": {
      // Feature Card
      padding: "20px",
      backgroundColor: "#FFFFFF",
      borderRadius: "8px",
      marginBottom: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      border: "1px solid #E5E7EB",
    },
  }

  // Apply responsive adjustments based on device type
  const responsiveAdjustments: Record<DeviceType, Partial<Record<ElementType, Record<string, string>>>> = {
    mobile: {
      "sidebar-columns-2": { gridTemplateColumns: "1fr" },
      "sidebar-columns-3": { gridTemplateColumns: "1fr" },
      "sidebar-columns-4": { gridTemplateColumns: "1fr" },
      "sidebar-0": { fontSize: "24px" },
      "sidebar-0-2": { fontSize: "20px" },
      "sidebar-0-3": { fontSize: "18px" },
    },
    tablet: {
      "sidebar-columns-3": { gridTemplateColumns: "1fr 1fr" },
      "sidebar-columns-4": { gridTemplateColumns: "1fr 1fr" },
    },
    desktop: {},
  }

  // Get base styles for the element type
  const styles = { ...(baseStyles[type] || {}) }

  // Apply responsive adjustments if they exist for this element type and device
  const adjustments = responsiveAdjustments[deviceType][type]
  if (adjustments) {
    Object.assign(styles, adjustments)
  }

  return styles
}

export function generateElementId(): string {
  return `element-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export function generateUniqueId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`
}

export function getElementTypeName(type: ElementType): string {
  const names: Record<ElementType, string> = {
    "sidebar-0": "Heading 1",
    "sidebar-0-2": "Heading 2",
    "sidebar-0-3": "Heading 3",
    "sidebar-1": "Paragraph",
    "sidebar-2": "Button",
    "sidebar-3": "Image",
    "sidebar-separator": "Separator",
    "sidebar-container": "Container",
    "sidebar-columns-2": "2 Columns",
    "sidebar-columns-3": "3 Columns",
    "sidebar-columns-4": "4 Columns",
    "sidebar-form": "Form",
    "sidebar-input": "Input",
    "sidebar-textarea": "Textarea",
    "sidebar-checkbox": "Checkbox",
    "sidebar-radio": "Radio",
    "sidebar-select": "Select",
    "sidebar-video": "Video",
    "sidebar-map": "Map",
    "sidebar-icon": "Icon",
    "sidebar-list": "List",
    "sidebar-table": "Table",
    "sidebar-testimonial": "Testimonial",
    "sidebar-pricing": "Pricing Table",
    "sidebar-social": "Social Links",
    "sidebar-feature": "Feature Card",
    "column-placeholder": "Column Placeholder",
  }

  return names[type] || "Unknown Element"
}
