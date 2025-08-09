'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link as Link2, Image as ImageIcon, Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, FileText, Palette, LayoutTemplate, MousePointer, Film, Sparkles, MessageCircle, BarChart2, FolderOpen, ChevronDown, Code, Tag, Anchor, Trash2 } from 'lucide-react'

interface ContentEditorProps {
  element: any
  onUpdate: (element: any) => void
}

export function ContentEditor({ element, onUpdate }: ContentEditorProps) {
  const handleContentChange = (key: string, value: any) => {
    onUpdate({
      ...element,
      content: {
        ...element.content,
        [key]: value
      }
    })
  }

  const renderTextContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Text Content</Label>
        <Textarea
          value={element.content?.text || ''}
          onChange={(e) => handleContentChange('text', e.target.value)}
          className="mt-1"
          rows={4}
          placeholder="Enter your text content..."
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Text Alignment</Label>
        <Select
          value={element.content?.alignment || 'left'}
          onValueChange={(value) => handleContentChange('alignment', value)}
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
    </div>
  )

  const renderHeadingContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Heading Text</Label>
        <Input
          value={element.content?.text || ''}
          onChange={(e) => handleContentChange('text', e.target.value)}
          className="mt-1"
          placeholder="Enter heading text..."
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Heading Level</Label>
        <Select
          value={element.content?.level || 'h2'}
          onValueChange={(value) => handleContentChange('level', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="h1">H1 - Main Heading</SelectItem>
            <SelectItem value="h2">H2 - Subheading</SelectItem>
            <SelectItem value="h3">H3 - Minor Heading</SelectItem>
            <SelectItem value="h4">H4 - Small Heading</SelectItem>
            <SelectItem value="h5">H5 - Tiny Heading</SelectItem>
            <SelectItem value="h6">H6 - Smallest Heading</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Text Alignment</Label>
        <Select
          value={element.content?.alignment || 'left'}
          onValueChange={(value) => handleContentChange('alignment', value)}
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
    </div>
  )

  const renderButtonContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Button Text</Label>
        <Input
          value={element.content?.text || ''}
          onChange={(e) => handleContentChange('text', e.target.value)}
          className="mt-1"
          placeholder="Enter button text..."
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Button Link</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={element.content?.url || ''}
            onChange={(e) => handleContentChange('url', e.target.value)}
            placeholder="https://example.com"
            className="flex-1"
          />
          <Select
            value={element.content?.target || '_self'}
            onValueChange={(value) => handleContentChange('target', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_self">Same Tab</SelectItem>
              <SelectItem value="_blank">New Tab</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Button Style</Label>
        <Select
          value={element.content?.style || 'primary'}
          onValueChange={(value) => handleContentChange('style', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="ghost">Ghost</SelectItem>
            <SelectItem value="link">Link</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Full Width</Label>
        <Switch
          checked={element.content?.fullWidth || false}
          onCheckedChange={(checked) => handleContentChange('fullWidth', checked)}
        />
      </div>
    </div>
  )

  const renderImageContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Image Source</Label>
        <div className="space-y-2 mt-1">
          <div className="flex gap-2">
            <Input
              value={element.content?.url || ''}
              onChange={(e) => handleContentChange('url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1"
            />
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    // Check file size (limit to 10MB)
                    if (file.size > 10 * 1024 * 1024) {
                      alert('Image size must be less than 10MB')
                      return
                    }
                    
                    // Check file type
                    if (!file.type.startsWith('image/')) {
                      alert('Please select a valid image file')
                      return
                    }
                    
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      const result = e.target?.result as string
                      // Validate that it's a proper data URL
                      if (result && result.startsWith('data:image/')) {
                        handleContentChange('url', result)
                        if (!element.content?.alt) {
                          handleContentChange('alt', file.name.replace(/\.[^/.]+$/, ''))
                        }
                        console.log('Image uploaded successfully:', file.name, 'Size:', Math.round(file.size / 1024), 'KB')
                      } else {
                        console.error('Invalid image data URL:', result)
                        alert('Failed to process image. Please try again.')
                      }
                    }
                    reader.onerror = () => {
                      console.error('Error reading file')
                      alert('Failed to read image file. Please try again.')
                    }
                    reader.readAsDataURL(file)
                  }
                }
                input.click()
              }}
            >
              Upload
            </Button>
          </div>
          
          {/* Image Preview */}
          {element.content?.url && (
            <div className="mt-2 p-2 border rounded-lg bg-muted">
              <div className="text-xs font-medium text-muted-foreground mb-2">Preview:</div>
              <div className="flex justify-center">
                <img 
                  src={element.content.url} 
                  alt={element.content?.alt || 'Preview'}
                  className="max-w-full max-h-32 object-contain rounded border"
                  onError={(e) => {
                    console.error('Preview image failed to load:', element.content.url)
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      const errorDiv = document.createElement('div')
                      errorDiv.className = 'text-destructive text-xs text-center p-2'
                      errorDiv.textContent = 'Failed to load image preview'
                      parent.appendChild(errorDiv)
                    }
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1 text-center">
                {element.content.url.startsWith('data:image/') ? 'Uploaded image' : 'External URL'}
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            Enter a URL or upload an image from your device (max 10MB)
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Alt Text</Label>
        <Input
          value={element.content?.alt || ''}
          onChange={(e) => handleContentChange('alt', e.target.value)}
          className="mt-1"
          placeholder="Image description for accessibility"
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Image Size</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <Label className="text-xs text-muted-foreground">Width (px)</Label>
            <Input
              type="number"
              value={element.content?.width || ''}
              onChange={(e) => handleContentChange('width', e.target.value ? parseInt(e.target.value) : '')}
              placeholder="auto"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Height (px)</Label>
            <Input
              type="number"
              value={element.content?.height || ''}
              onChange={(e) => handleContentChange('height', e.target.value ? parseInt(e.target.value) : '')}
              placeholder="auto"
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Image Alignment</Label>
        <Select
          value={element.content?.alignment || 'center'}
          onValueChange={(value) => handleContentChange('alignment', value)}
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
        <Label className="text-sm font-medium">Action on Click</Label>
        <Select
          value={element.content?.action || 'none'}
          onValueChange={(value) => handleContentChange('action', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="lightbox">Open in Lightbox</SelectItem>
            <SelectItem value="link">Open Link</SelectItem>
            <SelectItem value="download">Download Image</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderVideoContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Video URL</Label>
        <Input
          value={element.content?.url || ''}
          onChange={(e) => handleContentChange('url', e.target.value)}
          className="mt-1"
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Video Source</Label>
        <Select
          value={element.content?.source || 'youtube'}
          onValueChange={(value) => handleContentChange('source', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="vimeo">Vimeo</SelectItem>
            <SelectItem value="self">Self-hosted</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Autoplay</Label>
        <Switch
          checked={element.content?.autoplay || false}
          onCheckedChange={(checked) => handleContentChange('autoplay', checked)}
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Show Controls</Label>
        <Switch
          checked={element.content?.controls !== false}
          onCheckedChange={(checked) => handleContentChange('controls', checked)}
        />
      </div>
    </div>
  )

  const renderIconContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Icon Name</Label>
        <Input
          value={element.content?.icon || ''}
          onChange={(e) => handleContentChange('icon', e.target.value)}
          className="mt-1"
          placeholder="heart, star, home, etc."
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Icon Size</Label>
        <Select
          value={element.content?.size || 'medium'}
          onValueChange={(value) => handleContentChange('size', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small (16px)</SelectItem>
            <SelectItem value="medium">Medium (24px)</SelectItem>
            <SelectItem value="large">Large (32px)</SelectItem>
            <SelectItem value="xlarge">Extra Large (48px)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Icon Color</Label>
        <Input
          type="color"
          value={element.content?.color || '#000000'}
          onChange={(e) => handleContentChange('color', e.target.value)}
          className="mt-1 h-8"
        />
      </div>
    </div>
  )

  const renderHtmlContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">HTML Content</Label>
        <Textarea
          value={element.content?.html || ''}
          onChange={(e) => handleContentChange('html', e.target.value)}
          className="mt-1 font-mono text-sm"
          rows={12}
          placeholder="<div>Your HTML code here...</div>"
        />
        <div className="text-xs text-gray-500 mt-1">
          Enter your HTML code. It will be rendered on the canvas.
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Quick HTML Templates</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleContentChange('html', '<div class="alert alert-info">\n  <strong>Info:</strong> This is an informational message.\n</div>')}
          >
            Alert Box
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleContentChange('html', '<div class="card">\n  <div class="card-body">\n    <h5 class="card-title">Card Title</h5>\n    <p class="card-text">Card content goes here.</p>\n  </div>\n</div>')}
          >
            Card
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleContentChange('html', '<table class="table">\n  <thead>\n    <tr>\n      <th>Header 1</th>\n      <th>Header 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Cell 1</td>\n      <td>Cell 2</td>\n    </tr>\n  </tbody>\n</table>')}
          >
            Table
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleContentChange('html', '<ul class="list-group">\n  <li class="list-group-item">Item 1</li>\n  <li class="list-group-item">Item 2</li>\n  <li class="list-group-item">Item 3</li>\n</ul>')}
          >
            List
          </Button>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">HTML Security</Label>
        <div className="text-xs text-gray-500 mt-1">
          ⚠️ HTML is rendered as-is. Be cautious with user-generated content.
        </div>
      </div>
    </div>
  )

  const renderContainerContent = () => (
    <div className="space-y-6">
      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout" className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Container Label</Label>
            <Input
              value={element.content?.label || 'Container'}
              onChange={(e) => handleContentChange('label', e.target.value)}
              className="mt-1"
              placeholder="Enter container name..."
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Layout Mode</Label>
            <Select
              value={element.content?.layout || 'flex'}
              onValueChange={(value) => handleContentChange('layout', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flex">Flexbox</SelectItem>
                <SelectItem value="grid">CSS Grid</SelectItem>
                <SelectItem value="block">Block</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {element.content?.layout === 'flex' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Flexbox Settings</h4>
              
              <div>
                <Label className="text-sm font-medium">Direction</Label>
                <Select
                  value={element.content?.flex?.direction || 'row'}
                  onValueChange={(value) => handleContentChange('flex', { ...element.content.flex, direction: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="row">Row</SelectItem>
                    <SelectItem value="column">Column</SelectItem>
                    <SelectItem value="row-reverse">Row Reverse</SelectItem>
                    <SelectItem value="column-reverse">Column Reverse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Wrap</Label>
                <Select
                  value={element.content?.flex?.wrap || 'nowrap'}
                  onValueChange={(value) => handleContentChange('flex', { ...element.content.flex, wrap: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nowrap">No Wrap</SelectItem>
                    <SelectItem value="wrap">Wrap</SelectItem>
                    <SelectItem value="wrap-reverse">Wrap Reverse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Justify Content</Label>
                <Select
                  value={element.content?.flex?.justify || 'flex-start'}
                  onValueChange={(value) => handleContentChange('flex', { ...element.content.flex, justify: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Start</SelectItem>
                    <SelectItem value="flex-end">End</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="space-between">Space Between</SelectItem>
                    <SelectItem value="space-around">Space Around</SelectItem>
                    <SelectItem value="space-evenly">Space Evenly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Align Items</Label>
                <Select
                  value={element.content?.flex?.align || 'stretch'}
                  onValueChange={(value) => handleContentChange('flex', { ...element.content.flex, align: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stretch">Stretch</SelectItem>
                    <SelectItem value="flex-start">Start</SelectItem>
                    <SelectItem value="flex-end">End</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="baseline">Baseline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Gap (px)</Label>
                <Input
                  type="number"
                  value={element.content?.flex?.gap || 0}
                  onChange={(e) => handleContentChange('flex', { ...element.content.flex, gap: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          )}
          
          {element.content?.layout === 'grid' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Grid Settings</h4>
              
              <div>
                <Label className="text-sm font-medium">Columns</Label>
                <Input
                  type="number"
                  value={element.content?.grid?.columns || 1}
                  onChange={(e) => handleContentChange('grid', { ...element.content.grid, columns: parseInt(e.target.value) || 1 })}
                  className="mt-1"
                  min="1"
                  max="12"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Rows</Label>
                <Select
                  value={element.content?.grid?.rows || 'auto'}
                  onValueChange={(value) => handleContentChange('grid', { ...element.content.grid, rows: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="minmax">Min-Max</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Gap (px)</Label>
                <Input
                  type="number"
                  value={element.content?.grid?.gap || 0}
                  onChange={(e) => handleContentChange('grid', { ...element.content.grid, gap: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="style" className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Width</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={element.content?.width || '100%'}
                onChange={(e) => handleContentChange('width', e.target.value)}
                placeholder="100%"
                className="flex-1"
              />
              <Select
                value={element.content?.widthUnit || '%'}
                onValueChange={(value) => handleContentChange('widthUnit', value)}
                className="w-20"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="vw">vw</SelectItem>
                  <SelectItem value="auto">auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Max Width</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={element.content?.maxWidth || ''}
                onChange={(e) => handleContentChange('maxWidth', e.target.value)}
                placeholder="1200"
                className="flex-1"
              />
              <Select
                value={element.content?.maxWidthUnit || 'px'}
                onValueChange={(value) => handleContentChange('maxWidthUnit', value)}
                className="w-20"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="vw">vw</SelectItem>
                  <SelectItem value="none">none</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Height</Label>
            <Select
              value={element.content?.height || 'auto'}
              onValueChange={(value) => handleContentChange('height', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="min-height">Min Height</SelectItem>
                <SelectItem value="viewport">Viewport</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Background Type</Label>
            <Select
              value={element.content?.background?.type || 'color'}
              onValueChange={(value) => handleContentChange('background', { ...element.content.background, type: value })}
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
          
          {element.content?.background?.type === 'color' && (
            <div>
              <Label className="text-sm font-medium">Background Color</Label>
              <Input
                type="color"
                value={element.content?.background?.color || '#ffffff'}
                onChange={(e) => handleContentChange('background', { ...element.content.background, color: e.target.value })}
                className="mt-1 h-8"
              />
            </div>
          )}
          
          {element.content?.background?.type === 'gradient' && (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Gradient Type</Label>
                <Select
                  value={element.content?.background?.gradient?.type || 'linear'}
                  onValueChange={(value) => handleContentChange('background', { 
                    ...element.content.background, 
                    gradient: { ...element.content.background.gradient, type: value }
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Direction</Label>
                <Select
                  value={element.content?.background?.gradient?.direction || '180deg'}
                  onValueChange={(value) => handleContentChange('background', { 
                    ...element.content.background, 
                    gradient: { ...element.content.background.gradient, direction: value }
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0deg">0°</SelectItem>
                    <SelectItem value="90deg">90°</SelectItem>
                    <SelectItem value="180deg">180°</SelectItem>
                    <SelectItem value="270deg">270°</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-sm font-medium">Color 1</Label>
                  <Input
                    type="color"
                    value={element.content?.background?.gradient?.colors?.[0] || '#ffffff'}
                    onChange={(e) => {
                      const colors = [...(element.content.background.gradient.colors || [])]
                      colors[0] = e.target.value
                      handleContentChange('background', { 
                        ...element.content.background, 
                        gradient: { ...element.content.background.gradient, colors }
                      })
                    }}
                    className="mt-1 h-8"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Color 2</Label>
                  <Input
                    type="color"
                    value={element.content?.background?.gradient?.colors?.[1] || '#f3f4f6'}
                    onChange={(e) => {
                      const colors = [...(element.content.background.gradient.colors || [])]
                      colors[1] = e.target.value
                      handleContentChange('background', { 
                        ...element.content.background, 
                        gradient: { ...element.content.background.gradient, colors }
                      })
                    }}
                    className="mt-1 h-8"
                  />
                </div>
              </div>
            </div>
          )}
          
          {element.content?.background?.type === 'image' && (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Image URL</Label>
                <Input
                  value={element.content?.background?.image?.url || ''}
                  onChange={(e) => handleContentChange('background', { 
                    ...element.content.background, 
                    image: { ...element.content.background.image, url: e.target.value }
                  })}
                  className="mt-1"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Size</Label>
                <Select
                  value={element.content?.background?.image?.size || 'cover'}
                  onValueChange={(value) => handleContentChange('background', { 
                    ...element.content.background, 
                    image: { ...element.content.background.image, size: value }
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover">Cover</SelectItem>
                    <SelectItem value="contain">Contain</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Position</Label>
                <Select
                  value={element.content?.background?.image?.position || 'center'}
                  onValueChange={(value) => handleContentChange('background', { 
                    ...element.content.background, 
                    image: { ...element.content.background.image, position: value }
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="spacing" className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Padding</Label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              <div>
                <Label className="text-xs text-gray-500">Top</Label>
                <Input
                  type="number"
                  value={element.content?.padding?.top || 20}
                  onChange={(e) => handleContentChange('padding', { 
                    ...element.content.padding, 
                    top: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1"
                  min="0"
                  max="200"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Right</Label>
                <Input
                  type="number"
                  value={element.content?.padding?.right || 20}
                  onChange={(e) => handleContentChange('padding', { 
                    ...element.content.padding, 
                    right: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1"
                  min="0"
                  max="200"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Bottom</Label>
                <Input
                  type="number"
                  value={element.content?.padding?.bottom || 20}
                  onChange={(e) => handleContentChange('padding', { 
                    ...element.content.padding, 
                    bottom: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1"
                  min="0"
                  max="200"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Left</Label>
                <Input
                  type="number"
                  value={element.content?.padding?.left || 20}
                  onChange={(e) => handleContentChange('padding', { 
                    ...element.content.padding, 
                    left: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1"
                  min="0"
                  max="200"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Margin</Label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              <div>
                <Label className="text-xs text-gray-500">Top</Label>
                <Input
                  type="number"
                  value={element.content?.margin?.top || 0}
                  onChange={(e) => handleContentChange('margin', { 
                    ...element.content.margin, 
                    top: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1"
                  min="0"
                  max="200"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Right</Label>
                <Input
                  type="number"
                  value={element.content?.margin?.right || 0}
                  onChange={(e) => handleContentChange('margin', { 
                    ...element.content.margin, 
                    right: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1"
                  min="0"
                  max="200"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Bottom</Label>
                <Input
                  type="number"
                  value={element.content?.margin?.bottom || 0}
                  onChange={(e) => handleContentChange('margin', { 
                    ...element.content.margin, 
                    bottom: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1"
                  min="0"
                  max="200"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Left</Label>
                <Input
                  type="number"
                  value={element.content?.margin?.left || 0}
                  onChange={(e) => handleContentChange('margin', { 
                    ...element.content.margin, 
                    left: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1"
                  min="0"
                  max="200"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Border</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <Label className="text-xs text-gray-500">Style</Label>
                <Select
                  value={element.content?.border?.style || 'none'}
                  onValueChange={(value) => handleContentChange('border', { ...element.content.border, style: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="dotted">Dotted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Width</Label>
                <Input
                  type="number"
                  value={element.content?.border?.width || 1}
                  onChange={(e) => handleContentChange('border', { ...element.content.border, width: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                  min="0"
                  max="20"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Border Color</Label>
            <Input
              type="color"
              value={element.content?.border?.color || '#e5e7eb'}
              onChange={(e) => handleContentChange('border', { ...element.content.border, color: e.target.value })}
              className="mt-1 h-8"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Border Radius (px)</Label>
            <Input
              type="number"
              value={element.content?.border?.radius || 0}
              onChange={(e) => handleContentChange('border', { ...element.content.border, radius: parseInt(e.target.value) || 0 })}
              className="mt-1"
              min="0"
              max="100"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Positioning</Label>
            <Select
              value={element.content?.positioning?.type || 'default'}
              onValueChange={(value) => handleContentChange('positioning', { ...element.content.positioning, type: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
                <SelectItem value="absolute">Absolute</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Z-Index</Label>
            <Input
              type="number"
              value={element.content?.positioning?.zIndex || 1}
              onChange={(e) => handleContentChange('positioning', { ...element.content.positioning, zIndex: parseInt(e.target.value) || 1 })}
              className="mt-1"
              min="1"
              max="9999"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Responsive Visibility</Label>
            <div className="space-y-2 mt-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">Desktop</span>
                <Switch
                  checked={element.content?.responsive?.desktop?.visible !== false}
                  onCheckedChange={(checked) => handleContentChange('responsive', { 
                    ...element.content.responsive, 
                    desktop: { visible: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tablet</span>
                <Switch
                  checked={element.content?.responsive?.tablet?.visible !== false}
                  onCheckedChange={(checked) => handleContentChange('responsive', { 
                    ...element.content.responsive, 
                    tablet: { visible: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mobile</span>
                <Switch
                  checked={element.content?.responsive?.mobile?.visible !== false}
                  onCheckedChange={(checked) => handleContentChange('responsive', { 
                    ...element.content.responsive, 
                    mobile: { visible: checked }
                  })}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderContent = () => {
    switch (element.type) {
      case 'heading':
        return renderHeadingContent()
      case 'text':
        return renderTextContent()
      case 'button':
        return renderButtonContent()
      case 'image':
        return renderImageContent()
      case 'video':
        return renderVideoContent()
      case 'icon':
        return renderIconContent()
      case 'html':
        return renderHtmlContent()
      case 'menu-anchor':
        return renderMenuAnchorContent()
      case 'section':
        return renderSectionContent()
      case 'column':
        return renderColumnContent()
      case 'divider':
        return renderDividerContent()
      case 'spacer':
        return renderSpacerContent()
      case 'alert':
        return renderAlertContent()
      case 'shortcode':
        return renderShortcodeContent()
      case 'container':
        return renderContainerContent()
      case 'header':
        return renderHeaderContent()
      case 'footer':
        return renderFooterContent()
      case 'icon-box':
        return renderIconBoxContent()
      case 'testimonial':
        return renderTestimonialContent()
      case 'progress':
        return renderProgressContent()
      case 'tabs':
        return renderTabsContent()
      case 'accordion':
        return renderAccordionContent()
      case 'gallery':
        return renderGalleryContent()
      case 'carousel':
        return renderCarouselContent()
      case 'maps':
        return renderMapsContent()
      case 'soundcloud':
        return renderSoundCloudContent()
      case 'menu':
        return renderMenuContent()
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <Type className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No content settings available for this element</p>
          </div>
        )
    }
  }

  const renderMenuAnchorContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Anchor ID</Label>
        <Input
          value={element.content?.anchorId || ''}
          onChange={(e) => {
            const value = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '')
            handleContentChange('anchorId', value)
          }}
          className="mt-1"
          placeholder="about, contact, features, etc."
        />
        <div className="text-xs text-gray-500 mt-1">
          Enter a unique identifier for this anchor point (letters, numbers, hyphens, and underscores only)
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Label</Label>
        <Input
          value={element.content?.label || ''}
          onChange={(e) => handleContentChange('label', e.target.value)}
          className="mt-1"
          placeholder="Anchor Point"
        />
        <div className="text-xs text-gray-500 mt-1">
          A descriptive label for reference (not shown on the live site)
        </div>
      </div>
      
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Anchor className="w-4 h-4 text-blue-600" />
          <div className="text-sm font-medium text-blue-800">How to use this anchor:</div>
        </div>
        <div className="text-xs text-blue-700 space-y-1">
          <div>• Link to this anchor using: <code className="bg-blue-100 px-1 rounded">#{element.content?.anchorId || 'your-anchor-id'}</code></div>
          <div>• Example: <code className="bg-blue-100 px-1 rounded">&lt;a href="#{element.content?.anchorId || 'your-anchor-id'}"&gt;Go to section&lt;/a&gt;</code></div>
          <div>• Works with buttons, navigation menus, and any link element</div>
        </div>
      </div>
      
      {element.content?.anchorId && (
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-sm font-medium text-green-800 mb-1">Anchor Preview:</div>
          <div className="text-xs text-green-700">
            This anchor will create an invisible target point on your page that can be linked to with <code className="bg-green-100 px-1 rounded">#{element.content.anchorId}</code>
          </div>
        </div>
      )}
    </div>
  )

  const renderSectionContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Section Layout</Label>
        <Select
          value={element.content?.layout || 'full-width'}
          onValueChange={(value) => handleContentChange('layout', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-width">Full Width</SelectItem>
            <SelectItem value="boxed">Boxed</SelectItem>
            <SelectItem value="narrow">Narrow</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Background Color</Label>
        <Input
          type="color"
          value={element.content?.backgroundColor || '#ffffff'}
          onChange={(e) => handleContentChange('backgroundColor', e.target.value)}
          className="mt-1 h-8"
        />
      </div>
    </div>
  )

  const renderColumnContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Column Width</Label>
        <Select
          value={element.content?.width || 'auto'}
          onValueChange={(value) => handleContentChange('width', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto</SelectItem>
            <SelectItem value="1/4">1/4</SelectItem>
            <SelectItem value="1/3">1/3</SelectItem>
            <SelectItem value="1/2">1/2</SelectItem>
            <SelectItem value="2/3">2/3</SelectItem>
            <SelectItem value="3/4">3/4</SelectItem>
            <SelectItem value="full">Full</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderDividerContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Divider Style</Label>
        <Select
          value={element.content?.style || 'solid'}
          onValueChange={(value) => handleContentChange('style', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="dashed">Dashed</SelectItem>
            <SelectItem value="dotted">Dotted</SelectItem>
            <SelectItem value="double">Double</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Divider Color</Label>
        <Input
          type="color"
          value={element.content?.color || '#e5e7eb'}
          onChange={(e) => handleContentChange('color', e.target.value)}
          className="mt-1 h-8"
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Thickness (px)</Label>
        <Input
          type="number"
          value={element.content?.thickness || 1}
          onChange={(e) => handleContentChange('thickness', parseInt(e.target.value) || 1)}
          className="mt-1"
          min="1"
          max="10"
        />
      </div>
    </div>
  )

  const renderSpacerContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Spacer Height (px)</Label>
        <Input
          type="number"
          value={element.content?.height || 50}
          onChange={(e) => handleContentChange('height', parseInt(e.target.value) || 50)}
          className="mt-1"
          min="10"
          max="500"
        />
      </div>
    </div>
  )

  const renderAlertContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Alert Type</Label>
        <Select
          value={element.content?.type || 'info'}
          onValueChange={(value) => handleContentChange('type', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Alert Message</Label>
        <Textarea
          value={element.content?.message || ''}
          onChange={(e) => handleContentChange('message', e.target.value)}
          className="mt-1"
          rows={3}
          placeholder="Enter your alert message..."
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Show Dismiss Button</Label>
        <Switch
          checked={element.content?.dismissible || false}
          onCheckedChange={(checked) => handleContentChange('dismissible', checked)}
        />
      </div>
    </div>
  )

  const renderShortcodeContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Shortcode</Label>
        <Textarea
          value={element.content?.shortcode || ''}
          onChange={(e) => handleContentChange('shortcode', e.target.value)}
          className="mt-1 font-mono text-sm"
          rows={4}
          placeholder="[gallery id='123']"
        />
        <div className="text-xs text-gray-500 mt-1">
          Enter your shortcode. It will be processed when the page is rendered.
        </div>
      </div>
    </div>
  )

  const renderHeaderContent = () => (
    <div className="space-y-6">
      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="button">Action Button</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>
        
        <TabsContent value="logo" className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Logo Type</Label>
            <Select
              value={element.content?.logo?.type || 'text'}
              onValueChange={(value) => handleContentChange('logo', { ...element.content?.logo, type: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Logo</SelectItem>
                <SelectItem value="image">Image Logo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {element.content?.logo?.type === 'text' ? (
            <div>
              <Label className="text-sm font-medium">Logo Text</Label>
              <Input
                value={element.content?.logo?.text || ''}
                onChange={(e) => handleContentChange('logo', { ...element.content?.logo, text: e.target.value })}
                className="mt-1"
                placeholder="MySite"
              />
            </div>
          ) : (
            <div>
              <Label className="text-sm font-medium">Logo Image</Label>
              <div className="space-y-2 mt-1">
                <div className="flex gap-2">
                  <Input
                    value={element.content?.logo?.imageUrl || ''}
                    onChange={(e) => handleContentChange('logo', { ...element.content?.logo, imageUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = 'image/*'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert('Logo size must be less than 5MB')
                            return
                          }
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            const result = e.target?.result as string
                            if (result && result.startsWith('data:image/')) {
                              handleContentChange('logo', { 
                                ...element.content?.logo, 
                                imageUrl: result,
                                alt: file.name.replace(/\.[^/.]+$/, '')
                              })
                            }
                          }
                          reader.readAsDataURL(file)
                        }
                      }
                      input.click()
                    }}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <Label className="text-sm font-medium">Alt Text</Label>
            <Input
              value={element.content?.logo?.alt || ''}
              onChange={(e) => handleContentChange('logo', { ...element.content?.logo, alt: e.target.value })}
              className="mt-1"
              placeholder="Logo description"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="menu" className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Menu ID</Label>
            <Input
              value={element.content?.menu?.menuId || ''}
              onChange={(e) => handleContentChange('menu', { ...element.content?.menu, menuId: e.target.value })}
              className="mt-1"
              placeholder="main-menu"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Menu Alignment</Label>
            <Select
              value={element.content?.menu?.alignment || 'right'}
              onValueChange={(value) => handleContentChange('menu', { ...element.content?.menu, alignment: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Menu Style</Label>
            <Select
              value={element.content?.menu?.style || 'horizontal'}
              onValueChange={(value) => handleContentChange('menu', { ...element.content?.menu, style: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Enable Dropdown</Label>
            <Switch
              checked={element.content?.menu?.dropdown !== false}
              onCheckedChange={(checked) => handleContentChange('menu', { ...element.content?.menu, dropdown: checked })}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="button" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Enable Action Button</Label>
            <Switch
              checked={element.content?.actionButton?.enabled || false}
              onCheckedChange={(checked) => handleContentChange('actionButton', { ...element.content?.actionButton, enabled: checked })}
            />
          </div>
          
          {element.content?.actionButton?.enabled && (
            <>
              <div>
                <Label className="text-sm font-medium">Button Text</Label>
                <Input
                  value={element.content?.actionButton?.text || ''}
                  onChange={(e) => handleContentChange('actionButton', { ...element.content?.actionButton, text: e.target.value })}
                  className="mt-1"
                  placeholder="Get Started"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Button URL</Label>
                <Input
                  value={element.content?.actionButton?.url || ''}
                  onChange={(e) => handleContentChange('actionButton', { ...element.content?.actionButton, url: e.target.value })}
                  className="mt-1"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Target</Label>
                <Select
                  value={element.content?.actionButton?.target || '_self'}
                  onValueChange={(value) => handleContentChange('actionButton', { ...element.content?.actionButton, target: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Same Tab</SelectItem>
                    <SelectItem value="_blank">New Tab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Button Style</Label>
                <Select
                  value={element.content?.actionButton?.style || 'primary'}
                  onValueChange={(value) => handleContentChange('actionButton', { ...element.content?.actionButton, style: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="layout" className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Header Layout</Label>
            <Select
              value={element.content?.layout || 'horizontal'}
              onValueChange={(value) => handleContentChange('layout', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
                <SelectItem value="centered">Centered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Sticky Header</Label>
            <Switch
              checked={element.content?.sticky || false}
              onCheckedChange={(checked) => handleContentChange('sticky', checked)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderFooterContent = () => (
    <div className="space-y-6">
      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout" className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Footer Layout</Label>
            <Select
              value={element.content?.layout || 'columns'}
              onValueChange={(value) => handleContentChange('layout', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="columns">Multi-Column</SelectItem>
                <SelectItem value="centered">Centered</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {element.content?.layout === 'columns' && (
            <div>
              <Label className="text-sm font-medium">Number of Columns</Label>
              <Select
                value={element.content?.columns?.toString() || '4'}
                onValueChange={(value) => handleContentChange('columns', parseInt(value))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Column</SelectItem>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="logo" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Logo</Label>
            <Switch
              checked={element.content?.logo?.enabled !== false}
              onCheckedChange={(checked) => handleContentChange('logo', { ...element.content?.logo, enabled: checked })}
            />
          </div>
          
          {element.content?.logo?.enabled && (
            <>
              <div>
                <Label className="text-sm font-medium">Logo Type</Label>
                <Select
                  value={element.content?.logo?.type || 'text'}
                  onValueChange={(value) => handleContentChange('logo', { ...element.content?.logo, type: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text Logo</SelectItem>
                    <SelectItem value="image">Image Logo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {element.content?.logo?.type === 'text' ? (
                <div>
                  <Label className="text-sm font-medium">Logo Text</Label>
                  <Input
                    value={element.content?.logo?.text || ''}
                    onChange={(e) => handleContentChange('logo', { ...element.content?.logo, text: e.target.value })}
                    className="mt-1"
                    placeholder="MySite"
                  />
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium">Logo Image</Label>
                  <div className="space-y-2 mt-1">
                    <div className="flex gap-2">
                      <Input
                        value={element.content?.logo?.imageUrl || ''}
                        onChange={(e) => handleContentChange('logo', { ...element.content?.logo, imageUrl: e.target.value })}
                        placeholder="https://example.com/logo.png"
                        className="flex-1"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = 'image/*'
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                alert('Logo size must be less than 5MB')
                                return
                              }
                              const reader = new FileReader()
                              reader.onload = (e) => {
                                const result = e.target?.result as string
                                if (result && result.startsWith('data:image/')) {
                                  handleContentChange('logo', { 
                                    ...element.content?.logo, 
                                    imageUrl: result,
                                    alt: file.name.replace(/\.[^/.]+$/, '')
                                  })
                                }
                              }
                              reader.readAsDataURL(file)
                            }
                          }
                          input.click()
                        }}
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="sections" className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Configure footer sections and links
          </div>
          
          {element.content?.sections?.map((section: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Section {index + 1}</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const newSections = [...(element.content?.sections || [])]
                    newSections.splice(index, 1)
                    handleContentChange('sections', newSections)
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Title</Label>
                <Input
                  value={section.title || ''}
                  onChange={(e) => {
                    const newSections = [...(element.content?.sections || [])]
                    newSections[index] = { ...newSections[index], title: e.target.value }
                    handleContentChange('sections', newSections)
                  }}
                  className="mt-1"
                  placeholder="Section Title"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Content</Label>
                <Textarea
                  value={section.content || ''}
                  onChange={(e) => {
                    const newSections = [...(element.content?.sections || [])]
                    newSections[index] = { ...newSections[index], content: e.target.value }
                    handleContentChange('sections', newSections)
                  }}
                  className="mt-1"
                  rows={2}
                  placeholder="Section description"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Links</Label>
                <div className="space-y-2 mt-2">
                  {section.links?.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className="flex gap-2">
                      <Input
                        value={link.text || ''}
                        onChange={(e) => {
                          const newSections = [...(element.content?.sections || [])]
                          newSections[index] = {
                            ...newSections[index],
                            links: newSections[index].links.map((l: any, i: number) => 
                              i === linkIndex ? { ...l, text: e.target.value } : l
                            )
                          }
                          handleContentChange('sections', newSections)
                        }}
                        placeholder="Link Text"
                        className="flex-1"
                      />
                      <Input
                        value={link.url || ''}
                        onChange={(e) => {
                          const newSections = [...(element.content?.sections || [])]
                          newSections[index] = {
                            ...newSections[index],
                            links: newSections[index].links.map((l: any, i: number) => 
                              i === linkIndex ? { ...l, url: e.target.value } : l
                            )
                          }
                          handleContentChange('sections', newSections)
                        }}
                        placeholder="URL"
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const newSections = [...(element.content?.sections || [])]
                          newSections[index] = {
                            ...newSections[index],
                            links: newSections[index].links.filter((_: any, i: number) => i !== linkIndex)
                          }
                          handleContentChange('sections', newSections)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newSections = [...(element.content?.sections || [])]
                      if (!newSections[index].links) {
                        newSections[index].links = []
                      }
                      newSections[index].links.push({ text: '', url: '' })
                      handleContentChange('sections', newSections)
                    }}
                  >
                    Add Link
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            onClick={() => {
              const newSections = [...(element.content?.sections || [])]
              newSections.push({
                title: '',
                content: '',
                links: []
              })
              handleContentChange('sections', newSections)
            }}
          >
            Add Section
          </Button>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Social Links</Label>
            <Switch
              checked={element.content?.socialLinks?.enabled !== false}
              onCheckedChange={(checked) => handleContentChange('socialLinks', { ...element.content?.socialLinks, enabled: checked })}
            />
          </div>
          
          {element.content?.socialLinks?.enabled && (
            <div className="space-y-3">
              {element.content?.socialLinks?.platforms?.map((platform: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={platform.name || ''}
                    onChange={(e) => {
                      const newPlatforms = [...(element.content?.socialLinks?.platforms || [])]
                      newPlatforms[index] = { ...newPlatforms[index], name: e.target.value }
                      handleContentChange('socialLinks', { ...element.content?.socialLinks, platforms: newPlatforms })
                    }}
                    placeholder="Platform Name"
                    className="flex-1"
                  />
                  <Input
                    value={platform.url || ''}
                    onChange={(e) => {
                      const newPlatforms = [...(element.content?.socialLinks?.platforms || [])]
                      newPlatforms[index] = { ...newPlatforms[index], url: e.target.value }
                      handleContentChange('socialLinks', { ...element.content?.socialLinks, platforms: newPlatforms })
                    }}
                    placeholder="URL"
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const newPlatforms = element.content?.socialLinks?.platforms?.filter((_: any, i: number) => i !== index) || []
                      handleContentChange('socialLinks', { ...element.content?.socialLinks, platforms: newPlatforms })
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  const newPlatforms = [...(element.content?.socialLinks?.platforms || [])]
                  newPlatforms.push({ name: '', url: '', icon: '' })
                  handleContentChange('socialLinks', { ...element.content?.socialLinks, platforms: newPlatforms })
                }}
              >
                Add Platform
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Copyright</Label>
            <Switch
              checked={element.content?.copyright?.enabled !== false}
              onCheckedChange={(checked) => handleContentChange('copyright', { ...element.content?.copyright, enabled: checked })}
            />
          </div>
          
          {element.content?.copyright?.enabled && (
            <div>
              <Label className="text-sm font-medium">Copyright Text</Label>
              <Textarea
                value={element.content?.copyright?.text || ''}
                onChange={(e) => handleContentChange('copyright', { ...element.content?.copyright, text: e.target.value })}
                className="mt-1"
                rows={2}
                placeholder="© 2025 MySite. All rights reserved."
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )

  // Basic content editors for missing widget types
  const renderIconBoxContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Title</Label>
        <Input
          value={element.content?.title || ''}
          onChange={(e) => handleContentChange('title', e.target.value)}
          className="mt-1"
          placeholder="Icon Box Title"
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Description</Label>
        <Textarea
          value={element.content?.description || ''}
          onChange={(e) => handleContentChange('description', e.target.value)}
          className="mt-1"
          rows={3}
          placeholder="Enter description..."
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Icon</Label>
        <Select
          value={element.content?.icon || 'star'}
          onValueChange={(value) => handleContentChange('icon', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="star">Star</SelectItem>
            <SelectItem value="heart">Heart</SelectItem>
            <SelectItem value="check">Check</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderTestimonialContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Quote</Label>
        <Textarea
          value={element.content?.quote || ''}
          onChange={(e) => handleContentChange('quote', e.target.value)}
          className="mt-1"
          rows={4}
          placeholder="Enter testimonial quote..."
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Author</Label>
        <Input
          value={element.content?.author || ''}
          onChange={(e) => handleContentChange('author', e.target.value)}
          className="mt-1"
          placeholder="Author Name"
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Role</Label>
        <Input
          value={element.content?.role || ''}
          onChange={(e) => handleContentChange('role', e.target.value)}
          className="mt-1"
          placeholder="Author Role/Company"
        />
      </div>
    </div>
  )

  const renderProgressContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Progress Value</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="number"
            min="0"
            max="100"
            value={element.content?.value || 0}
            onChange={(e) => handleContentChange('value', parseInt(e.target.value) || 0)}
            className="flex-1"
          />
          <span className="text-sm text-gray-500">%</span>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Label</Label>
        <Input
          value={element.content?.label || ''}
          onChange={(e) => handleContentChange('label', e.target.value)}
          className="mt-1"
          placeholder="Progress Label"
        />
      </div>
    </div>
  )

  const renderTabsContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Tabs</Label>
        <div className="space-y-2 mt-2">
          {element.content?.tabs?.map((tab: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={tab.title || ''}
                onChange={(e) => {
                  const newTabs = [...(element.content?.tabs || [])]
                  newTabs[index] = { ...tab, title: e.target.value }
                  handleContentChange('tabs', newTabs)
                }}
                placeholder="Tab Title"
                className="flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newTabs = element.content?.tabs?.filter((_: any, i: number) => i !== index) || []
                  handleContentChange('tabs', newTabs)
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const newTabs = [...(element.content?.tabs || []), { title: 'New Tab', content: '' }]
              handleContentChange('tabs', newTabs)
            }}
          >
            Add Tab
          </Button>
        </div>
      </div>
    </div>
  )

  const renderAccordionContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Items</Label>
        <div className="space-y-2 mt-2">
          {element.content?.items?.map((item: any, index: number) => (
            <div key={index} className="border rounded p-2 space-y-2">
              <Input
                value={item.title || ''}
                onChange={(e) => {
                  const newItems = [...(element.content?.items || [])]
                  newItems[index] = { ...item, title: e.target.value }
                  handleContentChange('items', newItems)
                }}
                placeholder="Item Title"
              />
              <Textarea
                value={item.content || ''}
                onChange={(e) => {
                  const newItems = [...(element.content?.items || [])]
                  newItems[index] = { ...item, content: e.target.value }
                  handleContentChange('items', newItems)
                }}
                placeholder="Item Content"
                rows={2}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newItems = element.content?.items?.filter((_: any, i: number) => i !== index) || []
                  handleContentChange('items', newItems)
                }}
              >
                Remove Item
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const newItems = [...(element.content?.items || []), { title: 'New Item', content: '' }]
              handleContentChange('items', newItems)
            }}
          >
            Add Item
          </Button>
        </div>
      </div>
    </div>
  )

  const renderGalleryContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Images</Label>
        <div className="space-y-2 mt-2">
          {element.content?.images?.map((image: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={image.url || ''}
                onChange={(e) => {
                  const newImages = [...(element.content?.images || [])]
                  newImages[index] = { ...image, url: e.target.value }
                  handleContentChange('images', newImages)
                }}
                placeholder="Image URL"
                className="flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newImages = element.content?.images?.filter((_: any, i: number) => i !== index) || []
                  handleContentChange('images', newImages)
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const newImages = [...(element.content?.images || []), { url: '', alt: '' }]
              handleContentChange('images', newImages)
            }}
          >
            Add Image
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCarouselContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Slides</Label>
        <div className="space-y-2 mt-2">
          {element.content?.slides?.map((slide: any, index: number) => (
            <div key={index} className="border rounded p-2 space-y-2">
              <Input
                value={slide.title || ''}
                onChange={(e) => {
                  const newSlides = [...(element.content?.slides || [])]
                  newSlides[index] = { ...slide, title: e.target.value }
                  handleContentChange('slides', newSlides)
                }}
                placeholder="Slide Title"
              />
              <Input
                value={slide.image || ''}
                onChange={(e) => {
                  const newSlides = [...(element.content?.slides || [])]
                  newSlides[index] = { ...slide, image: e.target.value }
                  handleContentChange('slides', newSlides)
                }}
                placeholder="Image URL"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const newSlides = element.content?.slides?.filter((_: any, i: number) => i !== index) || []
                  handleContentChange('slides', newSlides)
                }}
              >
                Remove Slide
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const newSlides = [...(element.content?.slides || []), { title: 'New Slide', image: '' }]
              handleContentChange('slides', newSlides)
            }}
          >
            Add Slide
          </Button>
        </div>
      </div>
    </div>
  )

  const renderMapsContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Location</Label>
        <Input
          value={element.content?.location || ''}
          onChange={(e) => handleContentChange('location', e.target.value)}
          className="mt-1"
          placeholder="Enter address or coordinates"
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Map Height</Label>
        <Input
          type="number"
          value={element.content?.height || 400}
          onChange={(e) => handleContentChange('height', parseInt(e.target.value) || 400)}
          className="mt-1"
          placeholder="400"
        />
      </div>
    </div>
  )

  const renderSoundCloudContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">SoundCloud URL</Label>
        <Input
          value={element.content?.url || ''}
          onChange={(e) => handleContentChange('url', e.target.value)}
          className="mt-1"
          placeholder="https://soundcloud.com/artist/track"
        />
      </div>
      
      <div>
        <Label className="text-sm font-medium">Auto Play</Label>
        <Switch
          checked={element.content?.autoPlay || false}
          onCheckedChange={(checked) => handleContentChange('autoPlay', checked)}
        />
      </div>
    </div>
  )

  const renderMenuContent = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Menu Source</Label>
        <Select
          value={element.content?.menuId || ''}
          onValueChange={(value) => handleContentChange('menuId', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a menu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main-menu">Main Menu</SelectItem>
            <SelectItem value="footer-menu">Footer Menu</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Menu Style</Label>
        <Select
          value={element.content?.style || 'horizontal'}
          onValueChange={(value) => handleContentChange('style', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="horizontal">Horizontal</SelectItem>
            <SelectItem value="vertical">Vertical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Content Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  )
}