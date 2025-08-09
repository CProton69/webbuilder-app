'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Download, Upload, Trash2, Copy, Eye } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  category: string
  elements: any[]
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

export default function TemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'general'
  })

  // Sample templates data
  const sampleTemplates: Template[] = [
    {
      id: '1',
      name: 'Business Landing Page',
      description: 'Professional landing page for businesses',
      category: 'business',
      elements: [],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Portfolio Template',
      description: 'Creative portfolio layout for artists and designers',
      category: 'portfolio',
      elements: [],
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'E-commerce Home',
      description: 'Online store homepage template',
      category: 'ecommerce',
      elements: [],
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13'
    },
    {
      id: '4',
      name: 'Blog Layout',
      description: 'Clean blog template with sidebar',
      category: 'blog',
      elements: [],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12'
    }
  ]

  useEffect(() => {
    // Load templates from localStorage or use sample data
    const savedTemplates = localStorage.getItem('pageBuilderTemplates')
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates))
    } else {
      setTemplates(sampleTemplates)
    }
  }, [])

  useEffect(() => {
    // Filter templates based on search and category
    let filtered = templates

    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory)
    }

    setFilteredTemplates(filtered)
  }, [templates, searchQuery, selectedCategory])

  const categories = ['all', 'business', 'portfolio', 'ecommerce', 'blog', 'general']

  const handleCreateTemplate = () => {
    if (!newTemplate.name.trim()) return

    // Get current page content from the builder
    const currentPageContent = localStorage.getItem('pageBuilderData')
    let elements = []
    
    if (currentPageContent) {
      try {
        const pageData = JSON.parse(currentPageContent)
        elements = pageData.elements || []
      } catch (error) {
        console.error('Error parsing page data:', error)
      }
    }

    const template: Template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category,
      elements: elements, // Include current page elements
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedTemplates = [...templates, template]
    setTemplates(updatedTemplates)
    localStorage.setItem('pageBuilderTemplates', JSON.stringify(updatedTemplates))

    setNewTemplate({ name: '', description: '', category: 'general' })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter(template => template.id !== id)
    setTemplates(updatedTemplates)
    localStorage.setItem('pageBuilderTemplates', JSON.stringify(updatedTemplates))
  }

  const handleDuplicateTemplate = (template: Template) => {
    const duplicated: Template = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedTemplates = [...templates, duplicated]
    setTemplates(updatedTemplates)
    localStorage.setItem('pageBuilderTemplates', JSON.stringify(updatedTemplates))
  }

  const handleExportTemplate = (template: Template) => {
    const dataStr = JSON.stringify(template, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-template.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleUseTemplate = (template: Template) => {
    // Store the selected template in localStorage for the main builder to pick up
    localStorage.setItem('selectedTemplate', JSON.stringify(template))
    // Navigate to the main builder using Next.js router
    router.push('/')
  }

  const handlePreviewTemplate = (template: Template) => {
    // Store template for preview and navigate to preview page
    localStorage.setItem('previewTemplate', JSON.stringify(template))
    window.open('/preview', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
            <p className="text-gray-600 mt-2">Manage and reuse your page templates</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Enter template name..."
                  />
                </div>
                <div>
                  <Label htmlFor="template-description">Description</Label>
                  <Textarea
                    id="template-description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Describe your template..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="template-category">Category</Label>
                  <Select
                    value={newTemplate.category}
                    onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTemplate}>
                    Create Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDuplicateTemplate(template)}
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleExportTemplate(template)}
                      title="Export"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTemplate(template.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  Created: {new Date(template.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => handlePreviewTemplate(template)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleUseTemplate(template)}>
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No templates found</div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Template
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}