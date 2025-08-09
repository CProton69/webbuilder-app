'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useDragDrop } from './drag-drop-context'

interface WidgetItemProps {
  widget: {
    id: string
    type: string
    name: string
    icon: React.ReactNode
    category: string
  }
}

export function WidgetItem({ widget }: WidgetItemProps) {
  const { setDragItem, setIsDragging, clearDropZones } = useDragDrop()

  const handleDragStart = (e: React.DragEvent) => {
    const dragItem = {
      type: 'widget',
      data: widget,
      source: 'panel'
    }
    
    setDragItem(dragItem)
    setIsDragging(true)
    
    // Set drag data for compatibility
    e.dataTransfer.setData('text/plain', JSON.stringify(dragItem))
    
    // Create a smaller, cleaner drag image
    const dragImage = document.createElement('div')
    dragImage.className = 'px-3 py-2 bg-primary text-primary-foreground text-xs rounded-md shadow-lg whitespace-nowrap'
    dragImage.textContent = widget.name
    dragImage.style.position = 'absolute'
    dragImage.style.top = '-1000px'
    dragImage.style.left = '-1000px'
    document.body.appendChild(dragImage)
    
    // Set drag image with offset to center it on cursor
    const rect = dragImage.getBoundingClientRect()
    e.dataTransfer.setDragImage(dragImage, rect.width / 2, rect.height / 2)
    
    // Remove drag image after a short delay
    setTimeout(() => {
      if (dragImage.parentNode) {
        dragImage.parentNode.removeChild(dragImage)
      }
    }, 100)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDragItem(null)
    clearDropZones()
  }

  return (
    <Card
      className="cursor-grab hover:shadow-md transition-shadow p-2"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardContent className="p-2 flex items-center gap-2">
        <div className="text-primary">
          {widget.icon}
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-foreground">{widget.name}</div>
        </div>
      </CardContent>
    </Card>
  )
}