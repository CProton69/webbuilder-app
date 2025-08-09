'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { X, Globe, Palette, Layout, Save, Grid, Settings } from 'lucide-react'

interface GlobalSettings {
  siteTitle: string
  siteDescription: string
  theme: 'light' | 'dark' | 'auto'
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showGrid: boolean
  autoSave: boolean
}

interface GlobalSettingsPanelProps {
  settings: GlobalSettings
  onUpdate: (settings: Partial<GlobalSettings>) => void
  onClose: () => void
}

export function GlobalSettingsPanel({ settings, onUpdate, onClose }: GlobalSettingsPanelProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Global Settings</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Site Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="w-4 h-4" />
                  Site Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={settings.siteTitle}
                    onChange={(e) => onUpdate({ siteTitle: e.target.value })}
                    placeholder="Enter your site title"
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => onUpdate({ siteDescription: e.target.value })}
                    placeholder="Enter your site description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Palette className="w-4 h-4" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value: 'light' | 'dark' | 'auto') => onUpdate({ theme: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto (System)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Layout */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layout className="w-4 h-4" />
                  Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="maxWidth">Max Width</Label>
                  <Select value={settings.maxWidth} onValueChange={(value: 'sm' | 'md' | 'lg' | 'xl' | 'full') => onUpdate({ maxWidth: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small (640px)</SelectItem>
                      <SelectItem value="md">Medium (768px)</SelectItem>
                      <SelectItem value="lg">Large (1024px)</SelectItem>
                      <SelectItem value="xl">Extra Large (1280px)</SelectItem>
                      <SelectItem value="full">Full Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Grid className="w-4 h-4" />
                    <Label htmlFor="showGrid">Show Grid</Label>
                  </div>
                  <Switch
                    id="showGrid"
                    checked={settings.showGrid}
                    onCheckedChange={(checked) => onUpdate({ showGrid: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Editor Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Save className="w-4 h-4" />
                  Editor Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <Label htmlFor="autoSave">Auto Save</Label>
                  </div>
                  <Switch
                    id="autoSave"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => onUpdate({ autoSave: checked })}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  When enabled, your work will be automatically saved every 30 seconds.
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose}>
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}