"use client"

import { formatDistanceToNow } from "date-fns"
import type { HistoryAction } from "../lib/types"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"

interface HistoryPanelProps {
  history: HistoryAction[]
  currentIndex: number
  goToHistoryState: (index: number) => void
}

export default function HistoryPanel({ history, currentIndex, goToHistoryState }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4">History</h2>
        <p className="text-gray-500 text-center py-8">No history available yet</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">History</h2>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2">
          {history.map((action, index) => {
            const isActive = index === currentIndex
            const date = new Date(action.timestamp)

            return (
              <Button
                key={action.id}
                variant={isActive ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => goToHistoryState(index)}
              >
                <div>
                  <div className="font-medium">{index === 0 ? "Initial State" : `Change ${index}`}</div>
                  <div className="text-xs opacity-70">{formatDistanceToNow(date, { addSuffix: true })}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
