'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { CanvasElement } from '@/components/page-builder/canvas-element'

interface PageElement {
  id: string
  type: string
  content: any
  style: any
  children: PageElement[]
}

export default function PreviewPage() {
  const params = useParams()
  const [pageElements, setPageElements] = useState<PageElement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load page data from localStorage or API
    try {
      // First check if there's a specific preview data (from canvas preview)
      const previewData = localStorage.getItem('pageBuilderPreview')
      if (previewData) {
        const parsed = JSON.parse(previewData)
        setPageElements(parsed.elements || [])
        // Clear the preview data after loading
        localStorage.removeItem('pageBuilderPreview')
      } else {
        // Then check if there's a template preview (only for template previews)
        const previewTemplate = localStorage.getItem('previewTemplate')
        if (previewTemplate) {
          const template = JSON.parse(previewTemplate)
          setPageElements(template.elements || [])
          // Clear the preview template after loading
          localStorage.removeItem('previewTemplate')
        } else {
          // Finally, load the regular page data (current canvas state)
          const savedData = localStorage.getItem('pageBuilderData')
          if (savedData) {
            const parsed = JSON.parse(savedData)
            setPageElements(parsed.elements || [])
          }
        }
      }
    } catch (err) {
      setError('Failed to load page data')
    } finally {
      setLoading(false)
    }
  }, [])

  const renderElement = (element: PageElement) => {
    switch (element.type) {
      case 'header':
        return (
          <header className="w-full bg-white shadow-sm border-b">
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
              element.content?.layout === 'centered' ? 'justify-center' :
              element.content?.layout === 'vertical' ? 'flex-col items-start space-y-4' : 'flex items-center justify-between'
            }`}>
              <div className={`flex items-center gap-3 ${
                element.content?.layout === 'centered' ? 'order-1' : ''
              }`}>
                {element.content?.logo?.type === 'image' ? (
                  <img 
                    src={element.content?.logo?.imageUrl || '/placeholder-logo.png'} 
                    alt={element.content?.logo?.alt || 'Logo'}
                    className="h-8 w-auto"
                  />
                ) : (
                  <div className="text-xl font-bold text-gray-900">
                    {element.content?.logo?.text || 'MySite'}
                  </div>
                )}
              </div>
              <nav className={`${
                element.content?.layout === 'centered' ? 'order-3' :
                element.content?.menu?.alignment === 'left' ? 'order-first' :
                element.content?.menu?.alignment === 'center' ? 'order-2 mx-auto' : ''
              }`}>
                <div className="flex space-x-8">
                  <a href="#" className="text-gray-500 hover:text-gray-900">Home</a>
                  <a href="#" className="text-gray-500 hover:text-gray-900">About</a>
                  <a href="#" className="text-gray-500 hover:text-gray-900">Services</a>
                  <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
                </div>
              </nav>
            </div>
          </header>
        )
      
      case 'footer':
        return (
          <footer className={`w-full bg-gray-900 text-white ${
            element.content?.layout === 'centered' ? 'text-center' :
            element.content?.layout === 'minimal' ? 'text-center text-sm' : ''
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {element.content?.layout === 'columns' ? (
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <p className="text-gray-400">Learn more about our company and mission.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Services</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white">Web Design</a></li>
                      <li><a href="#" className="hover:text-white">Development</a></li>
                      <li><a href="#" className="hover:text-white">Consulting</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white">Contact Form</a></li>
                      <li><a href="#" className="hover:text-white">Email Us</a></li>
                      <li><a href="#" className="hover:text-white">Phone</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-white">FB</a>
                      <a href="#" className="text-gray-400 hover:text-white">TW</a>
                      <a href="#" className="text-gray-400 hover:text-white">IN</a>
                      <a href="#" className="text-gray-400 hover:text-white">IG</a>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {element.content?.logo?.enabled && (
                    <div className="text-lg font-semibold mb-4">
                      {element.content?.logo?.text || 'MySite'}
                    </div>
                  )}
                  {element.content?.copyright?.enabled && (
                    <div className="text-gray-400">
                      {element.content?.copyright?.text || '© 2025 MySite. All rights reserved.'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </footer>
        )
      
      case 'section':
        return (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {element.children?.map((child) => renderElement(child))}
            </div>
          </section>
        )
      
      case 'column':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {element.children?.map((child) => renderElement(child))}
          </div>
        )
      
      case 'heading':
        const HeadingTag = element.content?.level || 'h2'
        return (
          <HeadingTag 
            className={`${
              element.content?.alignment === 'center' ? 'text-center' :
              element.content?.alignment === 'right' ? 'text-right' : 'text-left'
            } font-bold mb-4`}
          >
            {element.content?.text || 'Heading'}
          </HeadingTag>
        )
      
      case 'text':
        return (
          <p className={`${
            element.content?.alignment === 'center' ? 'text-center' :
            element.content?.alignment === 'right' ? 'text-right' : 'text-left'
          } text-gray-600 mb-6`}>
            {element.content?.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>
        )
      
      case 'button':
        return (
          <a 
            href={element.content?.url || '#'}
            target={element.content?.target || '_self'}
            className={`inline-block px-6 py-3 rounded-md font-medium ${
              element.content?.style === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' :
              element.content?.style === 'secondary' ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' :
              element.content?.style === 'outline' ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' :
              'text-blue-600 hover:text-blue-700'
            }`}
          >
            {element.content?.text || 'Button'}
          </a>
        )
      
      case 'image':
        return (
          <div className={`${
            element.content?.alignment === 'center' ? 'text-center' :
            element.content?.alignment === 'right' ? 'text-right' : 'text-left'
          } mb-6`}>
            <img 
              src={element.content?.url || '/placeholder-image.png'}
              alt={element.content?.alt || 'Image'}
              width={element.content?.width || 'auto'}
              height={element.content?.height || 'auto'}
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        )
      
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading preview...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {pageElements.map((element) => (
        <div key={element.id}>
          {renderElement(element)}
        </div>
      ))}
    </div>
  )
}