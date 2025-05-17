"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import {
  Heading1,
  Heading2,
  Heading3,
  Text,
  BoxIcon as ButtonIcon,
  ImageIcon,
  LayoutGrid,
  Columns,
  FormInput,
  Video,
  Map,
  ListOrdered,
  Table,
  SeparatorVerticalIcon as SeparatorIcon,
  Sparkles,
  ShoppingCart,
  MessageSquare,
  Share2,
  Star,
  ChevronDown,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

export default function ElementsSidebar() {
  const elementCategories = [
    {
      id: "basic",
      name: "Basic Elements",
      elements: [
        { id: "sidebar-0", icon: Heading1, label: "Heading 1" },
        { id: "sidebar-0-2", icon: Heading2, label: "Heading 2" },
        { id: "sidebar-0-3", icon: Heading3, label: "Heading 3" },
        { id: "sidebar-1", icon: Text, label: "Paragraph" },
        { id: "sidebar-2", icon: ButtonIcon, label: "Button" },
        { id: "sidebar-3", icon: ImageIcon, label: "Image" },
        { id: "sidebar-separator", icon: SeparatorIcon, label: "Separator" },
      ],
    },
    {
      id: "layout",
      name: "Layout",
      elements: [
        { id: "sidebar-container", icon: LayoutGrid, label: "Container" },
        { id: "sidebar-columns-2", icon: Columns, label: "2 Columns" },
        { id: "sidebar-columns-3", icon: Columns, label: "3 Columns" },
        { id: "sidebar-columns-4", icon: Columns, label: "4 Columns" },
      ],
    },
    {
      id: "forms",
      name: "Forms",
      elements: [
        { id: "sidebar-form", icon: FormInput, label: "Form" },
        { id: "sidebar-input", icon: FormInput, label: "Input" },
        { id: "sidebar-textarea", icon: Text, label: "Textarea" },
        { id: "sidebar-checkbox", icon: ButtonIcon, label: "Checkbox" },
        { id: "sidebar-radio", icon: ButtonIcon, label: "Radio" },
        { id: "sidebar-select", icon: ChevronDown, label: "Select" },
      ],
    },
    {
      id: "media",
      name: "Media",
      elements: [
        { id: "sidebar-video", icon: Video, label: "Video" },
        { id: "sidebar-map", icon: Map, label: "Map" },
        { id: "sidebar-icon", icon: Star, label: "Icon" },
      ],
    },
    {
      id: "content",
      name: "Content",
      elements: [
        { id: "sidebar-list", icon: ListOrdered, label: "List" },
        { id: "sidebar-table", icon: Table, label: "Table" },
        { id: "sidebar-testimonial", icon: MessageSquare, label: "Testimonial" },
        { id: "sidebar-pricing", icon: ShoppingCart, label: "Pricing Table" },
        { id: "sidebar-social", icon: Share2, label: "Social Links" },
        { id: "sidebar-feature", icon: Sparkles, label: "Feature Card" },
      ],
    },
  ]

  return (
    <div className="p-4 overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">Elements</h2>

      <div className="space-y-2">
        <Accordion type="multiple" defaultValue={["basic"]}>
          {elementCategories.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="py-2">{category.name}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 py-2">
                  {category.elements.map((element) => (
                    <DraggableElement key={element.id} id={element.id} icon={element.icon} label={element.label} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

function DraggableElement({ id, icon: Icon, label }: { id: string; icon: any; label: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-2 rounded border border-gray-200 flex flex-col items-center gap-1 cursor-move hover:border-gray-400 transition-colors touch-none text-center"
    >
      <Icon className="h-5 w-5 text-gray-600" />
      <span className="text-xs">{label}</span>
    </div>
  )
}
