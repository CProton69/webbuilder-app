'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Copy, ChevronRight, ChevronDown, LayoutTemplate, Columns, Type, FileText, MousePointer, ImageIcon, Box } from 'lucide-react'

interface NavigatorElementProps {
  element: any
  isSelected: boolean
  onSelect: (element: any) => void
  onDuplicate: (element: any) => void
  onDelete: (elementId: string) => void
  depth?: number
}

export function NavigatorElement({ 
  element, 
  isSelected, 
  onSelect, 
  onDuplicate, 
  onDelete, 
  depth = 0 
}: NavigatorElementProps) {
  const [isExpanded, setIsExpanded] = React.useState(true)

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'section':
        return <LayoutTemplate className="w-3 h-3" />
      case 'column':
        return <Columns className="w-3 h-3" />
      case 'heading':
        return <Type className="w-3 h-3" />
      case 'text':
        return <FileText className="w-3 h-3" />
      case 'button':
        return <MousePointer className="w-3 h-3" />
      case 'image':
        return <ImageIcon className="w-3 h-3" />
      default:
        return <Box className="w-3 h-3" />
    }
  }

  const hasChildren = element.children && element.children.length > 0

  return (
    <div className="w-full">
      <Card 
        className={`cursor-pointer transition-colors ${
          isSelected ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
        }`}
        onClick={() => onSelect(element)}
        style={{ marginLeft: `${depth * 16}px` }}
      >
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {hasChildren && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-4 h-4 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsExpanded(!isExpanded)
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </Button>
              )}
              {!hasChildren && <div className="w-4" />}
              <div className="text-gray-500">
                {getElementIcon(element.type)}
              </div>
              <div className="text-sm font-medium truncate">
                {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
              </div>
            </div>
            {isSelected && (
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-4 h-4 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDuplicate(element)
                  }}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-4 h-4 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(element.id)
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {element.children.map((child: any) => (
            <NavigatorElement
              key={child.id}
              element={child}
              isSelected={isSelected}
              onSelect={onSelect}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}