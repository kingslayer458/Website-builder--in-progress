"use client"

import { useCallback, useEffect } from "react"

export function useHotkeys(keyCombo: string, callback: (e: KeyboardEvent) => void, deps: any[] = []) {
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
