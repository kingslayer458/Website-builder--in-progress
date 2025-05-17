import type { ThemeSettings } from "./types"

export const defaultTheme: ThemeSettings = {
  primaryColor: "#4F46E5",
  secondaryColor: "#10B981",
  backgroundColor: "#FFFFFF",
  textColor: "#111827",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  headingFont: "",
  baseFontSize: "16",
  containerWidth: "1200",
  spacingUnit: "4",
}

export const themePresets = [
  {
    id: "default",
    name: "Default",
    theme: { ...defaultTheme },
  },
  {
    id: "dark",
    name: "Dark Mode",
    theme: {
      primaryColor: "#6366F1",
      secondaryColor: "#10B981",
      backgroundColor: "#1F2937",
      textColor: "#F9FAFB",
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      headingFont: "",
      baseFontSize: "16",
      containerWidth: "1200",
      spacingUnit: "4",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    theme: {
      primaryColor: "#000000",
      secondaryColor: "#6B7280",
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      fontFamily: "'Inter', sans-serif",
      headingFont: "'Inter', sans-serif",
      baseFontSize: "16",
      containerWidth: "1200",
      spacingUnit: "4",
    },
  },
  {
    id: "colorful",
    name: "Colorful",
    theme: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#EC4899",
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      fontFamily: "'Poppins', sans-serif",
      headingFont: "'Poppins', sans-serif",
      baseFontSize: "16",
      containerWidth: "1200",
      spacingUnit: "4",
    },
  },
]
