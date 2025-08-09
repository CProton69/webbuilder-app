'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  FileText, 
  Home, 
  Settings, 
  Copy, 
  Trash2, 
  Edit,
  Globe,
  Layout,
  MoreVertical,
  ExternalLink,
  Eye
} from 'lucide-react'

interface Page {
  id: string
  title: string
  slug: string
  path: string
  template: string
  status: 'published' | 'draft' | 'private'
  isHome: boolean
  isLanding: boolean
  is404: boolean
  meta: {
    title: string
    description: string
    keywords: string
  }
  createdAt: string
  updatedAt: string
  elements: any[]
}

interface PageManagerProps {
  currentPage: Page | null
  pages: Page[]
  onSelectPage: (page: Page) => void
  onCreatePage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void
  onUpdatePage: (pageId: string, updates: Partial<Page>) => void
  onDeletePage: (pageId: string) => void
  onDuplicatePage: (pageId: string) => void
}

export function PageManager({
  currentPage,
  pages,
  onSelectPage,
  onCreatePage,
  onUpdatePage,
  onDeletePage,
  onDuplicatePage
}: PageManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    template: 'default',
    status: 'draft' as const,
    isHome: false,
    isLanding: false,
    is404: false,
    meta: {
      title: '',
      description: '',
      keywords: ''
    }
  })

  const handleCreatePage = () => {
    if (!newPage.title.trim()) return

    const slug = newPage.slug || newPage.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const path = slug === 'home' ? '/' : `/${slug}`

    onCreatePage({
      ...newPage,
      slug,
      path,
      elements: []
    })

    setNewPage({
      title: '',
      slug: '',
      template: 'default',
      status: 'draft',
      isHome: false,
      isLanding: false,
      is404: false,
      meta: {
        title: '',
        description: '',
        keywords: ''
      }
    })
    setShowCreateDialog(false)
  }

  const handleDuplicatePage = (pageId: string) => {
    const page = pages.find(p => p.id === pageId)
    if (!page) return

    const duplicatePage = {
      ...page,
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      path: `${page.path}-copy`,
      isHome: false,
      isLanding: false,
      is404: false
    }

    delete duplicatePage.id
    delete duplicatePage.createdAt
    delete duplicatePage.updatedAt

    onCreatePage(duplicatePage)
  }

  const handleDeletePage = (pageId: string) => {
    if (confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      onDeletePage(pageId)
    }
  }

  const getStatusColor = (status: Page['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'private': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPageIcon = (page: Page) => {
    if (page.isHome) return <Home className="w-4 h-4" />
    if (page.isLanding) return <Layout className="w-4 h-4" />
    if (page.is404) return <ExternalLink className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Page Manager
            </CardTitle>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-3 h-3 mr-1" />
                  New Page
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Page</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="page-title">Page Title</Label>
                    <Input
                      id="page-title"
                      value={newPage.title}
                      onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                      placeholder="Home, About, Contact, etc."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="page-slug">URL Slug</Label>
                    <Input
                      id="page-slug"
                      value={newPage.slug}
                      onChange={(e) => setNewPage({ ...newPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })}
                      placeholder="home, about, contact (optional)"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Leave empty to auto-generate from title
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="page-template">Template</Label>
                    <Select
                      value={newPage.template}
                      onValueChange={(value) => setNewPage({ ...newPage, template: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Template</SelectItem>
                        <SelectItem value="landing">Landing Page</SelectItem>
                        <SelectItem value="blog">Blog Post</SelectItem>
                        <SelectItem value="contact">Contact Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="page-status">Status</Label>
                    <Select
                      value={newPage.status}
                      onValueChange={(value: any) => setNewPage({ ...newPage, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleCreatePage} className="flex-1">
                      Create Page
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreateDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-96">
            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    currentPage?.id === page.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => onSelectPage(page)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-blue-500">
                        {getPageIcon(page)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {page.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {page.path}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${getStatusColor(page.status)}`}>
                            {page.status}
                          </Badge>
                          {page.isHome && (
                            <Badge variant="outline" className="text-xs">
                              Home
                            </Badge>
                          )}
                          {page.isLanding && (
                            <Badge variant="outline" className="text-xs">
                              Landing
                            </Badge>
                          )}
                          {page.is404 && (
                            <Badge variant="outline" className="text-xs">
                              404 Page
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingPage(page)
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDuplicatePage(page.id)
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePage(page.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {pages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No pages created yet</p>
                  <p className="text-xs">Click "New Page" to create your first page</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Edit Page Dialog */}
      <Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Page Settings</DialogTitle>
          </DialogHeader>
          {editingPage && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Page Title</Label>
                <Input
                  id="edit-title"
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-slug">URL Slug</Label>
                <Input
                  id="edit-slug"
                  value={editingPage.slug}
                  onChange={(e) => setEditingPage({ 
                    ...editingPage, 
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
                    path: e.target.value === 'home' ? '/' : `/${e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`
                  })}
                />
              </div>

              <div>
                <Label htmlFor="edit-template">Template</Label>
                <Select
                  value={editingPage.template}
                  onValueChange={(value) => setEditingPage({ ...editingPage, template: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Template</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="contact">Contact Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingPage.status}
                  onValueChange={(value: any) => setEditingPage({ ...editingPage, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Page Type</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingPage.isHome}
                      onChange={(e) => {
                        const updated = { ...editingPage, isHome: e.target.checked }
                        if (e.target.checked) {
                          updated.isLanding = false
                          updated.is404 = false
                        }
                        setEditingPage(updated)
                      }}
                    />
                    <span className="text-sm">Home Page</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingPage.isLanding}
                      onChange={(e) => {
                        const updated = { ...editingPage, isLanding: e.target.checked }
                        if (e.target.checked) {
                          updated.isHome = false
                          updated.is404 = false
                        }
                        setEditingPage(updated)
                      }}
                    />
                    <span className="text-sm">Landing Page</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingPage.is404}
                      onChange={(e) => {
                        const updated = { ...editingPage, is404: e.target.checked }
                        if (e.target.checked) {
                          updated.isHome = false
                          updated.isLanding = false
                        }
                        setEditingPage(updated)
                      }}
                    />
                    <span className="text-sm">404 Error Page</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">SEO Settings</Label>
                <div>
                  <Label htmlFor="meta-title" className="text-xs">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={editingPage.meta.title}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      meta: { ...editingPage.meta, title: e.target.value }
                    })}
                    placeholder="Page title for search engines"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="meta-description" className="text-xs">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    value={editingPage.meta.description}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      meta: { ...editingPage.meta, description: e.target.value }
                    })}
                    placeholder="Brief description for search results"
                    rows={2}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="meta-keywords" className="text-xs">Keywords</Label>
                  <Input
                    id="meta-keywords"
                    value={editingPage.meta.keywords}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      meta: { ...editingPage.meta, keywords: e.target.value }
                    })}
                    placeholder="keyword1, keyword2, keyword3"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    onUpdatePage(editingPage.id, editingPage)
                    setEditingPage(null)
                  }}
                  className="flex-1"
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingPage(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}