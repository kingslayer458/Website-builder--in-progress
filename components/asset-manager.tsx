"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ScrollArea } from "../components/ui/scroll-area"
import type { Asset } from "../lib/types"
import { FileIcon, Trash2, Upload, Plus } from "lucide-react"

interface AssetManagerProps {
  assets: Asset[]
  setAssets: (assets: Asset[]) => void
}

export default function AssetManager({ assets, setAssets }: AssetManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [assetType, setAssetType] = useState<"all" | "images" | "other">("all")

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType =
      assetType === "all" ||
      (assetType === "images" && asset.type.startsWith("image/")) ||
      (assetType === "other" && !asset.type.startsWith("image/"))

    return matchesSearch && matchesType
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      if (!event.target) return

      const newAsset: Asset = {
        id: `asset-${Date.now()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: event.target.result as string,
        dateAdded: new Date().toISOString(),
      }

      setAssets([...assets, newAsset])
    }

    reader.readAsDataURL(file)
  }

  const deleteAsset = (id: string) => {
    setAssets(assets.filter((asset) => asset.id !== id))
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">Asset Manager</h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            className="flex-shrink-0"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </Button>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
        </div>

        <Tabs defaultValue="all" value={assetType} onValueChange={(v) => setAssetType(v as "all" | "images" | "other")}>
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="images" className="flex-1">
              Images
            </TabsTrigger>
            <TabsTrigger value="other" className="flex-1">
              Other
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium">No assets found</h3>
              <p className="text-xs text-gray-500 mt-1">Upload assets to use in your website</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="border rounded-md overflow-hidden bg-white">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                    {asset.type.startsWith("image/") ? (
                      <img
                        src={asset.url || "/placeholder.svg"}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileIcon className="h-10 w-10 text-gray-400" />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => deleteAsset(asset.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{asset.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(asset.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
  else return (bytes / 1048576).toFixed(1) + " MB"
}
