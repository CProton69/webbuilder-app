'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface DragItem {
  type: 'widget' | 'element'
  data: any
  source?: 'panel' | 'canvas'
}

interface DropZone {
  id: string
  elementId: string
  position: 'before' | 'after' | 'inside'
  rect: DOMRect
}

interface DragDropContextType {
  dragItem: DragItem | null
  dropZones: DropZone[]
  isDragging: boolean
  setDragItem: (item: DragItem | null) => void
  setDropZones: (zones: DropZone[]) => void
  setIsDragging: (dragging: boolean) => void
  clearDropZones: () => void
}

const DragDropContext = createContext<DragDropContextType | null>(null)

export function DragDropProvider({ children }: { children: React.ReactNode }) {
  const [dragItem, setDragItem] = useState<DragItem | null>(null)
  const [dropZones, setDropZones] = useState<DropZone[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const clearDropZones = useCallback(() => {
    setDropZones([])
  }, [])

  return (
    <DragDropContext.Provider value={{
      dragItem,
      dropZones,
      isDragging,
      setDragItem,
      setDropZones,
      setIsDragging,
      clearDropZones
    }}>
      {children}
    </DragDropContext.Provider>
  )
}

export function useDragDrop() {
  const context = useContext(DragDropContext)
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider')
  }
  return context
}