'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Monitor as Monitor2, Tablet as Tablet2, Smartphone as Smartphone2, Eye, EyeOff, SlidersHorizontal, Settings } from 'lucide-react'

interface ResponsiveEditorProps {
  element: any
  currentDevice: 'desktop' | 'tablet' | 'mobile'
  onUpdate: (element: any) => void
}

export function ResponsiveEditor({ element, currentDevice, onUpdate }: ResponsiveEditorProps) {
  const getDeviceStyle = (device: 'desktop' | 'tablet' | 'mobile') => {
    return element.style?.responsive?.[device] || {}
  }

  const updateDeviceStyle = (device: 'desktop' | 'tablet' | 'mobile', key: string, value: any) => {
    const updatedElement = {
      ...element,
      style: {
        ...element.style,
        responsive: {
          ...element.style?.responsive,
          [device]: {
            ...getDeviceStyle(device),
            [key]: value
          }
        }
      }
    }
    onUpdate(updatedElement)
  }

  const renderVisibilityControls = () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-3">Device Visibility</div>
      
      {(['desktop', 'tablet', 'mobile'] as const).map(device => (
        <div key={device} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {device === 'desktop' && <Monitor2 className="w-4 h-4" />}
            {device === 'tablet' && <Tablet2 className="w-4 h-4" />}
            {device === 'mobile' && <Smartphone2 className="w-4 h-4" />}
            <Label className="text-sm capitalize">{device}</Label>
          </div>
          <Switch
            checked={!getDeviceStyle(device).hidden}
            onCheckedChange={(checked) => updateDeviceStyle(device, 'hidden', !checked)}
          />
        </div>
      ))}
    </div>
  )

  const renderDeviceSpecificStyles = () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-3">
        Styles for {currentDevice}
      </div>
      
      <div>
        <Label className="text-sm font-medium">Font Size</Label>
        <div className="mt-2">
          <Slider
            value={[getDeviceStyle(currentDevice).fontSize || element.style?.fontSize || 16]}
            onValueChange={([value]) => updateDeviceStyle(currentDevice, 'fontSize', value)}
            max={72}
            min={8}
            step={1}
          />
          <div className="text-xs text-gray-500 mt-1">
            {getDeviceStyle(currentDevice).fontSize || element.style?.fontSize || 16}px
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Line Height</Label>
        <div className="mt-2">
          <Slider
            value={[getDeviceStyle(currentDevice).lineHeight || element.style?.lineHeight || 1.5]}
            onValueChange={([value]) => updateDeviceStyle(currentDevice, 'lineHeight', value)}
            max={3}
            min={1}
            step={0.1}
          />
          <div className="text-xs text-gray-500 mt-1">
            {getDeviceStyle(currentDevice).lineHeight || element.style?.lineHeight || 1.5}
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
              value={getDeviceStyle(currentDevice).paddingTop || element.style?.paddingTop || 0}
              onChange={(e) => updateDeviceStyle(currentDevice, 'paddingTop', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Bottom</Label>
            <Input
              type="number"
              value={getDeviceStyle(currentDevice).paddingBottom || element.style?.paddingBottom || 0}
              onChange={(e) => updateDeviceStyle(currentDevice, 'paddingBottom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Left</Label>
            <Input
              type="number"
              value={getDeviceStyle(currentDevice).paddingLeft || element.style?.paddingLeft || 0}
              onChange={(e) => updateDeviceStyle(currentDevice, 'paddingLeft', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Right</Label>
            <Input
              type="number"
              value={getDeviceStyle(currentDevice).paddingRight || element.style?.paddingRight || 0}
              onChange={(e) => updateDeviceStyle(currentDevice, 'paddingRight', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Margin</Label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div>
            <Label className="text-xs text-gray-500">Top</Label>
            <Input
              type="number"
              value={getDeviceStyle(currentDevice).marginTop || element.style?.marginTop || 0}
              onChange={(e) => updateDeviceStyle(currentDevice, 'marginTop', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Bottom</Label>
            <Input
              type="number"
              value={getDeviceStyle(currentDevice).marginBottom || element.style?.marginBottom || 0}
              onChange={(e) => updateDeviceStyle(currentDevice, 'marginBottom', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Left</Label>
            <Input
              type="number"
              value={getDeviceStyle(currentDevice).marginLeft || element.style?.marginLeft || 0}
              onChange={(e) => updateDeviceStyle(currentDevice, 'marginLeft', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Right</Label>
            <Input
              type="number"
              value={getDeviceStyle(currentDevice).marginRight || element.style?.marginRight || 0}
              onChange={(e) => updateDeviceStyle(currentDevice, 'marginRight', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Text Alignment</Label>
        <Select
          value={getDeviceStyle(currentDevice).textAlign || element.style?.textAlign || 'left'}
          onValueChange={(value) => updateDeviceStyle(currentDevice, 'textAlign', value)}
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
      
      {element.type === 'column' && (
        <div>
          <Label className="text-sm font-medium">Column Direction</Label>
          <Select
            value={getDeviceStyle(currentDevice).flexDirection || element.style?.flexDirection || 'row'}
            onValueChange={(value) => updateDeviceStyle(currentDevice, 'flexDirection', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="row">Horizontal</SelectItem>
              <SelectItem value="column">Vertical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div>
        <Label className="text-sm font-medium">Display</Label>
        <Select
          value={getDeviceStyle(currentDevice).display || element.style?.display || 'block'}
          onValueChange={(value) => updateDeviceStyle(currentDevice, 'display', value)}
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
    </div>
  )

  const renderBreakpointSettings = () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-3">Custom Breakpoints</div>
      
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">Tablet Breakpoint</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              value={element.style?.breakpoints?.tablet || 768}
              onChange={(e) => {
                const breakpoints = {
                  ...element.style?.breakpoints,
                  tablet: parseInt(e.target.value) || 768
                }
                onUpdate({
                  ...element,
                  style: {
                    ...element.style,
                    breakpoints
                  }
                })
              }}
              className="w-20"
              placeholder="768"
            />
            <span className="text-sm text-gray-500">px</span>
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium">Mobile Breakpoint</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              value={element.style?.breakpoints?.mobile || 480}
              onChange={(e) => {
                const breakpoints = {
                  ...element.style?.breakpoints,
                  mobile: parseInt(e.target.value) || 480
                }
                onUpdate({
                  ...element,
                  style: {
                    ...element.style,
                    breakpoints
                  }
                })
              }}
              className="w-20"
              placeholder="480"
            />
            <span className="text-sm text-gray-500">px</span>
          </div>
        </div>
      </div>
      
      <div className="pt-3 border-t">
        <Label className="text-sm font-medium">Responsive Behavior</Label>
        <Select
          value={element.style?.responsiveBehavior || 'default'}
          onValueChange={(value) => onUpdate({
            ...element,
            style: {
              ...element.style,
              responsiveBehavior: value
            }
          })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default (Scale down)</SelectItem>
            <SelectItem value="stack">Stack elements</SelectItem>
            <SelectItem value="hide">Hide on smaller screens</SelectItem>
            <SelectItem value="custom">Custom responsive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Responsive Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visibility" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visibility" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              Visibility
            </TabsTrigger>
            <TabsTrigger value="device-styles" className="text-xs">
              <Smartphone2 className="w-3 h-3 mr-1" />
              Device Styles
            </TabsTrigger>
            <TabsTrigger value="breakpoints" className="text-xs">
              <Settings className="w-3 h-3 mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="visibility" className="mt-4">
            {renderVisibilityControls()}
          </TabsContent>
          
          <TabsContent value="device-styles" className="mt-4">
            {renderDeviceSpecificStyles()}
          </TabsContent>
          
          <TabsContent value="breakpoints" className="mt-4">
            {renderBreakpointSettings()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}