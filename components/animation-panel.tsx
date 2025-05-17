"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ScrollArea } from "../components/ui/scroll-area"
import { Slider } from "../components/ui/slider"
import { Check, Play } from "lucide-react"
import type { Element } from "../lib/types"

interface AnimationPanelProps {
  element: Element
  updateElementProperties: (id: string, properties: Partial<Element>) => void
}

export default function AnimationPanel({ element, updateElementProperties }: AnimationPanelProps) {
  const [animationType, setAnimationType] = useState(element.animation?.type || "none")
  const [animationDuration, setAnimationDuration] = useState(element.animation?.duration || 0.5)
  const [animationDelay, setAnimationDelay] = useState(element.animation?.delay || 0)
  const [animationEasing, setAnimationEasing] = useState(element.animation?.easing || "ease")
  const [animationTrigger, setAnimationTrigger] = useState(element.animation?.trigger || "onload")
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)

  const animationOptions = [
    { value: "none", label: "None" },
    { value: "fade-in", label: "Fade In" },
    { value: "fade-up", label: "Fade Up" },
    { value: "fade-down", label: "Fade Down" },
    { value: "fade-left", label: "Fade Left" },
    { value: "fade-right", label: "Fade Right" },
    { value: "zoom-in", label: "Zoom In" },
    { value: "zoom-out", label: "Zoom Out" },
    { value: "flip-x", label: "Flip X" },
    { value: "flip-y", label: "Flip Y" },
    { value: "bounce", label: "Bounce" },
    { value: "pulse", label: "Pulse" },
    { value: "shake", label: "Shake" },
  ]

  const easingOptions = [
    { value: "ease", label: "Ease" },
    { value: "ease-in", label: "Ease In" },
    { value: "ease-out", label: "Ease Out" },
    { value: "ease-in-out", label: "Ease In Out" },
    { value: "linear", label: "Linear" },
  ]

  const triggerOptions = [
    { value: "onload", label: "On Page Load" },
    { value: "onscroll", label: "On Scroll" },
    { value: "onclick", label: "On Click" },
    { value: "onhover", label: "On Hover" },
  ]

  const applyAnimation = () => {
    if (animationType === "none") {
      // Remove animation if set to none
      const { animation, ...restStyles } = element.styles
      updateElementProperties(element.id, { styles: restStyles, animation: undefined })
      return
    }

    // Update element with animation properties
    updateElementProperties(element.id, {
      animation: {
        type: animationType,
        duration: animationDuration,
        delay: animationDelay,
        easing: animationEasing,
        trigger: animationTrigger,
      },
    })
  }

  const playPreview = () => {
    setIsPreviewPlaying(true)
    setTimeout(() => setIsPreviewPlaying(false), animationDuration * 1000 + 100)
  }

  // Generate CSS for preview
  const getPreviewStyle = () => {
    if (animationType === "none" || !isPreviewPlaying) {
      return {}
    }

    const baseStyles = {
      animationDuration: `${animationDuration}s`,
      animationDelay: `${animationDelay}s`,
      animationTimingFunction: animationEasing,
      animationFillMode: "both",
    }

    // Add specific animation keyframes
    switch (animationType) {
      case "fade-in":
        return {
          ...baseStyles,
          animationName: "fadeIn",
        }
      case "fade-up":
        return {
          ...baseStyles,
          animationName: "fadeUp",
        }
      case "fade-down":
        return {
          ...baseStyles,
          animationName: "fadeDown",
        }
      case "fade-left":
        return {
          ...baseStyles,
          animationName: "fadeLeft",
        }
      case "fade-right":
        return {
          ...baseStyles,
          animationName: "fadeRight",
        }
      case "zoom-in":
        return {
          ...baseStyles,
          animationName: "zoomIn",
        }
      case "zoom-out":
        return {
          ...baseStyles,
          animationName: "zoomOut",
        }
      case "flip-x":
        return {
          ...baseStyles,
          animationName: "flipX",
        }
      case "flip-y":
        return {
          ...baseStyles,
          animationName: "flipY",
        }
      case "bounce":
        return {
          ...baseStyles,
          animationName: "bounce",
        }
      case "pulse":
        return {
          ...baseStyles,
          animationName: "pulse",
        }
      case "shake":
        return {
          ...baseStyles,
          animationName: "shake",
        }
      default:
        return {}
    }
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Animation Settings</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <Tabs defaultValue="basic">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="basic" className="flex-1">
              Basic
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div>
              <Label htmlFor="animation-type">Animation Type</Label>
              <select
                id="animation-type"
                value={animationType}
                onChange={(e) => setAnimationType(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md mt-1"
              >
                {animationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="animation-duration">Duration (seconds)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="animation-duration"
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={[animationDuration]}
                  onValueChange={(value) => setAnimationDuration(value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{animationDuration}s</span>
              </div>
            </div>

            <div>
              <Label htmlFor="animation-delay">Delay (seconds)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="animation-delay"
                  min={0}
                  max={2}
                  step={0.1}
                  value={[animationDelay]}
                  onValueChange={(value) => setAnimationDelay(value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{animationDelay}s</span>
              </div>
            </div>

            <div>
              <Label htmlFor="animation-trigger">Trigger</Label>
              <select
                id="animation-trigger"
                value={animationTrigger}
                onChange={(e) => setAnimationTrigger(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md mt-1"
              >
                {triggerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="h-32 border rounded-md flex items-center justify-center bg-white">
                  <div className="p-4 bg-primary text-primary-foreground rounded-md" style={getPreviewStyle()}>
                    Animation Preview
                  </div>
                </div>
                <div className="mt-2 flex justify-center">
                  <Button onClick={playPreview} disabled={animationType === "none" || isPreviewPlaying} size="sm">
                    <Play className="h-4 w-4 mr-1" /> Play Animation
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div>
              <Label htmlFor="animation-easing">Easing</Label>
              <select
                id="animation-easing"
                value={animationEasing}
                onChange={(e) => setAnimationEasing(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md mt-1"
              >
                {easingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="animation-custom-css">Custom Animation CSS</Label>
              <textarea
                id="animation-custom-css"
                placeholder="@keyframes customAnimation { ... }"
                className="w-full h-32 px-3 py-2 bg-background border border-input rounded-md mt-1 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Advanced users can define custom keyframes and animations here
              </p>
            </div>

            <div className="pt-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-blue-700 mb-2">Animation Tips</h3>
                <ul className="text-xs text-blue-600 space-y-1 list-disc pl-4">
                  <li>Use subtle animations for better user experience</li>
                  <li>Avoid animations on elements that contain important information</li>
                  <li>Consider users who prefer reduced motion</li>
                  <li>Animations triggered on scroll can improve engagement</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={applyAnimation} className="w-full">
            <Check className="h-4 w-4 mr-1" /> Apply Animation
          </Button>
        </div>

        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeLeft {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeRight {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes zoomOut {
            from { opacity: 0; transform: scale(1.2); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes flipX {
            from { transform: perspective(400px) rotateX(90deg); opacity: 0; }
            to { transform: perspective(400px) rotateX(0deg); opacity: 1; }
          }
          @keyframes flipY {
            from { transform: perspective(400px) rotateY(90deg); opacity: 0; }
            to { transform: perspective(400px) rotateY(0deg); opacity: 1; }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}</style>
      </ScrollArea>
    </div>
  )
}
