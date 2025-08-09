'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2, Copy, Settings, GripVertical, ChevronUp, ChevronDown, Image as ImageIcon } from 'lucide-react'

interface TwentyTwentySliderProps {
  element: any
  isSelected: boolean
  selectedElement: any | null
  onSelect: (element: any) => void
  onUpdate: (element: any) => void
  onDelete: (elementId: string) => void
  onDuplicate: (element: any) => void
  onMoveUp?: (element: any) => void
  onMoveDown?: (element: any) => void
  canMoveUp?: boolean
  canMoveDown?: boolean
  depth?: number
}

export function TwentyTwentySlider({
  element,
  isSelected,
  selectedElement,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
  depth = 0
}: TwentyTwentySliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updateSliderPosition(e)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (e: MouseEvent | React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(element)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(element)
  }

  const baseClasses = `p-4 border-2 rounded-lg transition-all duration-200 ${
    isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-border/80'
  }`

  return (
    <div 
      className={baseClasses} 
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground cursor-grab active:cursor-grabbing">
            <GripVertical className="w-3 h-3" />
          </div>
          <div className="text-sm font-medium text-foreground flex items-center gap-2">
            <ImageIcon className="w-3 h-3" />
            TwentyTwenty Slider
          </div>
        </div>
        {isSelected && (
          <div className="flex gap-1">
            {canMoveUp && (
              <Button size="sm" variant="ghost" onClick={() => onMoveUp?.(element)} title="Move Up">
                <ChevronUp className="w-3 h-3" />
              </Button>
            )}
            {canMoveDown && (
              <Button size="sm" variant="ghost" onClick={() => onMoveDown?.(element)} title="Move Down">
                <ChevronDown className="w-3 h-3" />
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={() => onDuplicate(element)} title="Duplicate">
              <Copy className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleEditClick} title="Edit">
              <Settings className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(element.id)} title="Delete">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>

      {/* TwentyTwenty Slider */}
      <div 
        ref={containerRef}
        className="relative w-full h-64 overflow-hidden rounded-lg border cursor-col-resize"
        onMouseDown={handleMouseDown}
      >
        {/* Before Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: element.content?.beforeImage ? `url(${element.content.beforeImage})` : 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          {!element.content?.beforeImage && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                <p>Before Image</p>
              </div>
            </div>
          )}
        </div>

        {/* After Image (clipped) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: element.content?.afterImage ? `url(${element.content.afterImage})` : 'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
          }}
        >
          {!element.content?.afterImage && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                <p>After Image</p>
              </div>
            </div>
          )}
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-primary flex items-center justify-center">
            <div className="w-4 h-0.5 bg-primary rounded"></div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {element.content?.beforeLabel || 'Before'}
        </div>
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {element.content?.afterLabel || 'After'}
        </div>
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="beforeImage">Before Image URL</Label>
              <Input
                id="beforeImage"
                value={element.content?.beforeImage || ''}
                onChange={(e) => onUpdate({
                  ...element,
                  content: {
                    ...element.content,
                    beforeImage: e.target.value
                  }
                })}
                placeholder="https://example.com/before.jpg"
              />
            </div>
            <div>
              <Label htmlFor="afterImage">After Image URL</Label>
              <Input
                id="afterImage"
                value={element.content?.afterImage || ''}
                onChange={(e) => onUpdate({
                  ...element,
                  content: {
                    ...element.content,
                    afterImage: e.target.value
                  }
                })}
                placeholder="https://example.com/after.jpg"
              />
            </div>
          </div>
          
          <div>
            <Label>Default Position</Label>
            <Slider
              value={[element.content?.defaultPosition || 50]}
              onValueChange={([value]) => {
                setSliderPosition(value)
                onUpdate({
                  ...element,
                  content: {
                    ...element.content,
                    defaultPosition: value
                  }
                })
              }}
              max={100}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="orientation">Orientation</Label>
            <Select 
              value={element.content?.orientation || 'horizontal'} 
              onValueChange={(value) => onUpdate({
                ...element,
                content: {
                  ...element.content,
                  orientation: value
                }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="beforeLabel">Before Label</Label>
              <Input
                id="beforeLabel"
                value={element.content?.beforeLabel || 'Before'}
                onChange={(e) => onUpdate({
                  ...element,
                  content: {
                    ...element.content,
                    beforeLabel: e.target.value
                  }
                })}
              />
            </div>
            <div>
              <Label htmlFor="afterLabel">After Label</Label>
              <Input
                id="afterLabel"
                value={element.content?.afterLabel || 'After'}
                onChange={(e) => onUpdate({
                  ...element,
                  content: {
                    ...element.content,
                    afterLabel: e.target.value
                  }
                })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}