"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Check, AlertCircle } from "lucide-react"
import { Label } from "../components/ui/label"

interface CustomCodePanelProps {
  customCode: {
    head: string
    css: string
    javascript: string
  }
  updateCustomCode: (code: { head: string; css: string; javascript: string }) => void
}

export default function CustomCodePanel({
  customCode = { head: "", css: "", javascript: "" },
  updateCustomCode,
}: CustomCodePanelProps) {
  const [localCode, setLocalCode] = useState({
    head: customCode.head || "",
    css: customCode.css || "",
    javascript: customCode.javascript || "",
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleCodeChange = (section: "head" | "css" | "javascript", value: string) => {
    setLocalCode((prev) => ({
      ...prev,
      [section]: value,
    }))

    // Clear validation errors when editing
    if (validationErrors[section]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[section]
        return newErrors
      })
    }
  }

  const validateCode = () => {
    const errors: Record<string, string> = {}

    // Validate HTML
    if (localCode.head) {
      try {
        // Basic validation - check for unclosed tags
        const unclosedTags = (localCode.head.match(/<[^/][^>]*>/g) || []).filter((tag) => {
          const tagName = tag.match(/<([^\s>]+)/)?.[1]
          if (!tagName) return false
          // Self-closing tags don't need to be closed
          if (tag.endsWith("/>") || ["meta", "link", "img", "br", "hr", "input"].includes(tagName)) {
            return false
          }
          // Check if there's a closing tag
          const closingTagRegex = new RegExp(`<\\/${tagName}[^>]*>`, "g")
          return !localCode.head.match(closingTagRegex)
        })

        if (unclosedTags.length > 0) {
          errors.head = `Unclosed HTML tags found: ${unclosedTags.join(", ")}`
        }
      } catch (error) {
        errors.head = "Invalid HTML"
      }
    }

    // Validate CSS
    if (localCode.css) {
      try {
        // Basic validation - check for unclosed braces
        const openBraces = (localCode.css.match(/{/g) || []).length
        const closeBraces = (localCode.css.match(/}/g) || []).length
        if (openBraces !== closeBraces) {
          errors.css = "Unclosed CSS braces found"
        }
      } catch (error) {
        errors.css = "Invalid CSS"
      }
    }

    // Validate JavaScript
    if (localCode.javascript) {
      try {
        // Try to parse the JavaScript
        new Function(localCode.javascript)
      } catch (error: any) {
        errors.javascript = `JavaScript error: ${error.message}`
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const saveCustomCode = () => {
    if (validateCode()) {
      updateCustomCode(localCode)
    }
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Custom Code</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-medium text-amber-700">Advanced Feature</h3>
          </div>
          <p className="text-xs text-amber-600">
            Custom code allows you to add advanced functionality to your website. Incorrect code may cause issues with
            your site. Use with caution.
          </p>
        </div>

        <Tabs defaultValue="head">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="head" className="flex-1">
              Head
            </TabsTrigger>
            <TabsTrigger value="css" className="flex-1">
              CSS
            </TabsTrigger>
            <TabsTrigger value="javascript" className="flex-1">
              JavaScript
            </TabsTrigger>
          </TabsList>

          <TabsContent value="head" className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="head-code">Custom Head Code</Label>
                <span className="text-xs text-gray-500">HTML</span>
              </div>
              <div className="relative">
                <textarea
                  id="head-code"
                  value={localCode.head}
                  onChange={(e) => handleCodeChange("head", e.target.value)}
                  className={`w-full h-64 p-3 font-mono text-sm bg-gray-50 border rounded-md ${
                    validationErrors.head ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="<!-- Add custom meta tags, scripts, or other elements to the <head> section -->"
                  spellCheck="false"
                />
                {validationErrors.head && <div className="mt-1 text-xs text-red-500">{validationErrors.head}</div>}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Add custom meta tags, analytics scripts, or other elements to the &lt;head&gt; section of your website.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Examples</h3>
              <pre className="text-xs text-blue-600 bg-blue-100 p-2 rounded overflow-x-auto">
                {`<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Custom Font -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">`}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="css" className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="css-code">Custom CSS</Label>
                <span className="text-xs text-gray-500">CSS</span>
              </div>
              <div className="relative">
                <textarea
                  id="css-code"
                  value={localCode.css}
                  onChange={(e) => handleCodeChange("css", e.target.value)}
                  className={`w-full h-64 p-3 font-mono text-sm bg-gray-50 border rounded-md ${
                    validationErrors.css ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="/* Add custom CSS styles here */"
                  spellCheck="false"
                />
                {validationErrors.css && <div className="mt-1 text-xs text-red-500">{validationErrors.css}</div>}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Add custom CSS styles to override or extend the default styling of your website.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Examples</h3>
              <pre className="text-xs text-blue-600 bg-blue-100 p-2 rounded overflow-x-auto">
                {`/* Custom button style */
.custom-button {
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}`}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="javascript" className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="js-code">Custom JavaScript</Label>
                <span className="text-xs text-gray-500">JavaScript</span>
              </div>
              <div className="relative">
                <textarea
                  id="js-code"
                  value={localCode.javascript}
                  onChange={(e) => handleCodeChange("javascript", e.target.value)}
                  className={`w-full h-64 p-3 font-mono text-sm bg-gray-50 border rounded-md ${
                    validationErrors.javascript ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="// Add custom JavaScript code here"
                  spellCheck="false"
                />
                {validationErrors.javascript && (
                  <div className="mt-1 text-xs text-red-500">{validationErrors.javascript}</div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Add custom JavaScript to implement interactive features or functionality.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Examples</h3>
              <pre className="text-xs text-blue-600 bg-blue-100 p-2 rounded overflow-x-auto">
                {`// Smooth scroll to anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Show/hide header on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scroll down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scroll up
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
});`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={saveCustomCode} className="w-full">
            <Check className="h-4 w-4 mr-1" /> Save Custom Code
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
