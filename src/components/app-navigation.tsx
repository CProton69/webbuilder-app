'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Layout, 
  FileText, 
  Settings, 
  Monitor, 
  Plus,
  Save,
  Eye,
  Menu,
  X,
  FolderOpen,
  HelpCircle
} from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

interface AppNavigationProps {
  onSave?: () => void
  onPreview?: () => void
  onSaveAsTemplate?: () => void
}

export function AppNavigation({ onSave, onPreview, onSaveAsTemplate }: AppNavigationProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    {
      name: 'Builder',
      href: '/',
      icon: Layout,
      description: 'Create and edit pages'
    },
    {
      name: 'Templates',
      href: '/templates',
      icon: FileText,
      description: 'Manage page templates'
    },
    {
      name: 'How To',
      href: '/how-to',
      icon: HelpCircle,
      description: 'Learn how to use templates'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Configure site settings'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Layout className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">Page Builder</h1>
                <p className="text-xs text-muted-foreground">Drag & Drop Website Builder</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {pathname === '/' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPreview}
                  className="hidden sm:flex"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSaveAsTemplate}
                  className="hidden sm:flex"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Save as Template
                </Button>
                <Button
                  size="sm"
                  onClick={onSave}
                  className="hidden sm:flex"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </>
            )}
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                )
              })}
              
              {pathname === '/' && (
                <div className="px-3 py-2 space-y-2 border-t border-border mt-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onPreview?.()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full justify-start"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onSaveAsTemplate?.()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full justify-start"
                  >
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Save as Template
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      onSave?.()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full justify-start"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}