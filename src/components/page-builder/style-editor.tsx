'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, 
  Type, 
  Layout, 
  Move, 
  RotateCcw, 
  Eye, 
  EyeOff,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  FileText,
  LayoutTemplate,
  SlidersHorizontal,
  Smartphone,
  Tablet,
  Monitor,
  Columns,
  Rows,
  Grid3X3,
  GalleryHorizontalEnd,
  GalleryVerticalEnd,
  Sparkles,
  Wand2,
  Maximize,
  Move as Move2,
  RotateCcw as RotateCcw2,
  Lock,
  Unlock,
  Zap,
  Settings,
  MoreVertical
} from 'lucide-react'

interface StyleEditorProps {
  element: any
  onUpdate: (element: any) => void
}

export function StyleEditor({ element, onUpdate }: StyleEditorProps) {
  const handleStyleChange = (key: string, value: any) => {
    onUpdate({
      ...element,
      style: {
        ...element.style,
        [key]: value
      }
    })
  }

  const renderTypographyStyles = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Font Family</Label>
        <Select
          value={element.style?.fontFamily || 'Inter'}
          onValueChange={(value) => handleStyleChange('fontFamily', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Helvetica">Helvetica</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Georgia">Georgia</SelectItem>
            <SelectItem value="Courier New">Courier New</SelectItem>
            <SelectItem value="Verdana">Verdana</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Font Size</Label>
        <div className="mt-2">
          <Slider
            value={[element.style?.fontSize || 16]}
            onValueChange={([value]) => handleStyleChange('fontSize', value)}
            max={72}
            min={8}
            step={1}
          />
          <div className="text-xs text-gray-500 mt-1">
            {element.style?.fontSize || 16}px
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Font Weight</Label>
        <Select
          value={element.style?.fontWeight || 'normal'}
          onValueChange={(value) => handleStyleChange('fontWeight', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">Thin (100)</SelectItem>
            <SelectItem value="200">Extra Light (200)</SelectItem>
            <SelectItem value="300">Light (300)</SelectItem>
            <SelectItem value="normal">Normal (400)</SelectItem>
            <SelectItem value="500">Medium (500)</SelectItem>
            <SelectItem value="600">Semi Bold (600)</SelectItem>
            <SelectItem value="bold">Bold (700)</SelectItem>
            <SelectItem value="800">Extra Bold (800)</SelectItem>
            <SelectItem value="900">Black (900)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Text Transform</Label>
        <Select
          value={element.style?.textTransform || 'none'}
          onValueChange={(value) => handleStyleChange('textTransform', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="uppercase">Uppercase</SelectItem>
            <SelectItem value="lowercase">Lowercase</SelectItem>
            <SelectItem value="capitalize">Capitalize</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Line Height</Label>
        <div className="mt-2">
          <Slider
            value={[element.style?.lineHeight || 1.5]}
            onValueChange={([value]) => handleStyleChange('lineHeight', value)}
            max={3}
            min={1}
            step={0.1}
          />
          <div className="text-xs text-gray-500 mt-1">
            {element.style?.lineHeight || 1.5}
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Letter Spacing</Label>
        <div className="mt-2">
          <Slider
            value={[element.style?.letterSpacing || 0]}
            onValueChange={([value]) => handleStyleChange('letterSpacing', value)}
            max={10}
            min={-5}
            step={0.1}
          />
          <div className="text-xs text-gray-500 mt-1">
            {element.style?.letterSpacing || 0}px
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Text Decoration</Label>
        <div className="flex gap-2 mt-1">
          <Button
            variant={element.style?.textDecoration === 'underline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleStyleChange('textDecoration', 
              element.style?.textDecoration === 'underline' ? 'none' : 'underline'
            )}
          >
            <Underline className="w-4 h-4" />
          </Button>
          <Button
            variant={element.style?.fontStyle === 'italic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleStyleChange('fontStyle', 
              element.style?.fontStyle === 'italic' ? 'normal' : 'italic'
            )}
          >
            <Italic className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderColorStyles = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Text Color</Label>
        <div className="flex gap-2 mt-1">
          <Input
            type="color"
            value={element.style?.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="w-12 h-8 p-1"
          />
          <Input
            value={element.style?.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="flex-1"
            placeholder="#000000"
          />
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Background Color</Label>
        <div className="flex gap-2 mt-1">
          <Input
            type="color"
            value={element.style?.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-12 h-8 p-1"
          />
          <Input
            value={element.style?.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="flex-1"
            placeholder="#ffffff"
          />
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Border Color</Label>
        <div className="flex gap-2 mt-1">
          <Input
            type="color"
            value={element.style?.borderColor || '#e5e7eb'}
            onChange={(e) => handleStyleChange('borderColor', e.target.value)}
            className="w-12 h-8 p-1"
          />
          <Input
            value={element.style?.borderColor || '#e5e7eb'}
            onChange={(e) => handleStyleChange('borderColor', e.target.value)}
            className="flex-1"
            placeholder="#e5e7eb"
          />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <Label className="text-sm font-medium">Background Type</Label>
        <Select
          value={element.style?.backgroundType || 'color'}
          onValueChange={(value) => handleStyleChange('backgroundType', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="color">Solid Color</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {element.style?.backgroundType === 'gradient' && (
        <div className="space-y-2">
          <div>
            <Label className="text-sm font-medium">Gradient Start</Label>
            <Input
              type="color"
              value={element.style?.gradientStart || '#3b82f6'}
              onChange={(e) => handleStyleChange('gradientStart', e.target.value)}
              className="mt-1 h-8"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Gradient End</Label>
            <Input
              type="color"
              value={element.style?.gradientEnd || '#8b5cf6'}
              onChange={(e) => handleStyleChange('gradientEnd', e.target.value)}
              className="mt-1 h-8"
            />
          </div>
        </div>
      )}
    </div>
  )

  const renderSpacingStyles = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Margin</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <Label className="text-xs text-gray-500">Top</Label>
            <Input
              type="number"
              value={element.style?.marginTop || 0}
              onChange={(e) => handleStyleChange('marginTop', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Bottom</Label>
            <Input
              type="number"
              value={element.style?.marginBottom || 0}
              onChange={(e) => handleStyleChange('marginBottom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Left</Label>
            <Input
              type="number"
              value={element.style?.marginLeft || 0}
              onChange={(e) => handleStyleChange('marginLeft', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Right</Label>
            <Input
              type="number"
              value={element.style?.marginRight || 0}
              onChange={(e) => handleStyleChange('marginRight', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Padding</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <Label className="text-xs text-gray-500">Top</Label>
            <Input
              type="number"
              value={element.style?.paddingTop || 0}
              onChange={(e) => handleStyleChange('paddingTop', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Bottom</Label>
            <Input
              type="number"
              value={element.style?.paddingBottom || 0}
              onChange={(e) => handleStyleChange('paddingBottom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Left</Label>
            <Input
              type="number"
              value={element.style?.paddingLeft || 0}
              onChange={(e) => handleStyleChange('paddingLeft', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Right</Label>
            <Input
              type="number"
              value={element.style?.paddingRight || 0}
              onChange={(e) => handleStyleChange('paddingRight', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Border Width</Label>
        <div className="mt-2">
          <Slider
            value={[element.style?.borderWidth || 0]}
            onValueChange={([value]) => handleStyleChange('borderWidth', value)}
            max={10}
            min={0}
            step={1}
          />
          <div className="text-xs text-gray-500 mt-1">
            {element.style?.borderWidth || 0}px
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Border Radius</Label>
        <div className="mt-2">
          <Slider
            value={[element.style?.borderRadius || 0]}
            onValueChange={([value]) => handleStyleChange('borderRadius', value)}
            max={50}
            min={0}
            step={1}
          />
          <div className="text-xs text-gray-500 mt-1">
            {element.style?.borderRadius || 0}px
          </div>
        </div>
      </div>
    </div>
  )

  const renderLayoutStyles = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Width</Label>
        <Select
          value={element.style?.width || 'auto'}
          onValueChange={(value) => handleStyleChange('width', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto</SelectItem>
            <SelectItem value="100%">Full Width</SelectItem>
            <SelectItem value="fit-content">Fit Content</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Position</Label>
        <Select
          value={element.style?.position || 'static'}
          onValueChange={(value) => handleStyleChange('position', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="static">Static</SelectItem>
            <SelectItem value="relative">Relative</SelectItem>
            <SelectItem value="absolute">Absolute</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Display</Label>
        <Select
          value={element.style?.display || 'block'}
          onValueChange={(value) => handleStyleChange('display', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="block">Block</SelectItem>
            <SelectItem value="inline">Inline</SelectItem>
            <SelectItem value="inline-block">Inline Block</SelectItem>
            <SelectItem value="flex">Flex</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Text Alignment</Label>
        <Select
          value={element.style?.textAlign || 'left'}
          onValueChange={(value) => handleStyleChange('textAlign', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">
              <div className="flex items-center gap-2">
                <AlignLeft className="w-4 h-4" />
                Left
              </div>
            </SelectItem>
            <SelectItem value="center">
              <div className="flex items-center gap-2">
                <AlignCenter className="w-4 h-4" />
                Center
              </div>
            </SelectItem>
            <SelectItem value="right">
              <div className="flex items-center gap-2">
                <AlignRight className="w-4 h-4" />
                Right
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Z-Index</Label>
        <Input
          type="number"
          value={element.style?.zIndex || ''}
          onChange={(e) => handleStyleChange('zIndex', parseInt(e.target.value) || '')}
          className="mt-1"
          placeholder="auto"
        />
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Style Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="typography" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="typography" className="text-xs">
              <Type className="w-3 h-3 mr-1" />
              Type
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-xs">
              <Palette className="w-3 h-3 mr-1" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="spacing" className="text-xs">
              <Layout className="w-3 h-3 mr-1" />
              Space
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">
              <Move className="w-3 h-3 mr-1" />
              Layout
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="typography" className="mt-4">
            {renderTypographyStyles()}
          </TabsContent>
          
          <TabsContent value="colors" className="mt-4">
            {renderColorStyles()}
          </TabsContent>
          
          <TabsContent value="spacing" className="mt-4">
            {renderSpacingStyles()}
          </TabsContent>
          
          <TabsContent value="layout" className="mt-4">
            {renderLayoutStyles()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}