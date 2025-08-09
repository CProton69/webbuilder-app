'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2, Copy, Settings, GripVertical, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Image as ImageIcon, Plus } from 'lucide-react'

interface BeforeAfterItem {
  id: string
  beforeImage: string
  afterImage: string
  title: string
  description: string
}

interface BeforeAfterCarouselProps {
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

export function BeforeAfterCarousel({
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
}: BeforeAfterCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const items = element.content?.items || []

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

  useEffect(() => {
    // Reset slider position when changing items
    setSliderPosition(50)
  }, [currentIndex])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(element)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(element)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  const addNewItem = () => {
    const newItem: BeforeAfterItem = {
      id: `item-${Date.now()}`,
      beforeImage: '',
      afterImage: '',
      title: `Item ${items.length + 1}`,
      description: ''
    }
    
    onUpdate({
      ...element,
      content: {
        ...element.content,
        items: [...items, newItem]
      }
    })
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    onUpdate({
      ...element,
      content: {
        ...element.content,
        items: newItems
      }
    })
    
    if (currentIndex >= newItems.length && newItems.length > 0) {
      setCurrentIndex(newItems.length - 1)
    }
  }

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    
    onUpdate({
      ...element,
      content: {
        ...element.content,
        items: newItems
      }
    })
  }

  const currentItem = items[currentIndex] || {}

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
            Before/After Carousel
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

      {/* Main Slider */}
      <div className="mb-4">
        <div 
          ref={containerRef}
          className="relative w-full h-80 overflow-hidden rounded-lg border cursor-col-resize"
          onMouseDown={handleMouseDown}
        >
          {/* Before Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: currentItem.beforeImage ? `url(${currentItem.beforeImage})` : 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}
          >
            {!currentItem.beforeImage && (
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
              backgroundImage: currentItem.afterImage ? `url(${currentItem.afterImage})` : 'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}
          >
            {!currentItem.afterImage && (
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

          {/* Navigation Arrows */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onClick={handleNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Item Info */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded">
            <h3 className="font-semibold text-sm">{currentItem.title || `Item ${currentIndex + 1}`}</h3>
            <p className="text-xs opacity-90">{currentItem.description}</p>
          </div>

          {/* Item Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex-shrink-0 w-20 h-16 rounded-lg border-2 cursor-pointer transition-all ${
                index === currentIndex 
                  ? 'border-primary shadow-md' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="relative w-full h-full rounded overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: item.beforeImage ? `url(${item.beforeImage})` : 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%)',
                    backgroundSize: '10px 10px'
                  }}
                />
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: item.afterImage ? `url(${item.afterImage})` : 'linear-gradient(45deg, #e0e0e0 25%, transparent 25%)',
                    backgroundSize: '10px 10px',
                    clipPath: 'inset(0 50% 0 0)'
                  }}
                />
              </div>
            </div>
          ))}
          
          {/* Add Item Button */}
          <Button
            size="sm"
            variant="outline"
            className="flex-shrink-0 w-20 h-16 border-dashed"
            onClick={addNewItem}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="mt-4 space-y-4">
          {/* Current Item Settings */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Current Item Settings</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="currentBeforeImage">Before Image URL</Label>
                <Input
                  id="currentBeforeImage"
                  value={currentItem.beforeImage || ''}
                  onChange={(e) => updateItem(currentIndex, 'beforeImage', e.target.value)}
                  placeholder="https://example.com/before.jpg"
                />
              </div>
              <div>
                <Label htmlFor="currentAfterImage">After Image URL</Label>
                <Input
                  id="currentAfterImage"
                  value={currentItem.afterImage || ''}
                  onChange={(e) => updateItem(currentIndex, 'afterImage', e.target.value)}
                  placeholder="https://example.com/after.jpg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentTitle">Title</Label>
                <Input
                  id="currentTitle"
                  value={currentItem.title || ''}
                  onChange={(e) => updateItem(currentIndex, 'title', e.target.value)}
                  placeholder="Item title"
                />
              </div>
              <div>
                <Label htmlFor="currentDescription">Description</Label>
                <Input
                  id="currentDescription"
                  value={currentItem.description || ''}
                  onChange={(e) => updateItem(currentIndex, 'description', e.target.value)}
                  placeholder="Item description"
                />
              </div>
            </div>
            {items.length > 1 && (
              <Button
                size="sm"
                variant="destructive"
                className="mt-3"
                onClick={() => removeItem(currentIndex)}
              >
                Remove Current Item
              </Button>
            )}
          </div>

          {/* Global Settings */}
          <div>
            <Label>Default Slider Position</Label>
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
            <Label htmlFor="thumbnailSize">Thumbnail Size</Label>
            <Select 
              value={element.content?.thumbnailSize || 'medium'} 
              onValueChange={(value) => onUpdate({
                ...element,
                content: {
                  ...element.content,
                  thumbnailSize: value
                }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (60x48)</SelectItem>
                <SelectItem value="medium">Medium (80x64)</SelectItem>
                <SelectItem value="large">Large (100x80)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="autoPlay">Auto Play</Label>
            <Select 
              value={element.content?.autoPlay || 'false'} 
              onValueChange={(value) => onUpdate({
                ...element,
                content: {
                  ...element.content,
                  autoPlay: value
                }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Disabled</SelectItem>
                <SelectItem value="true">Enabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}