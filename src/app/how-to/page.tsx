'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Save, 
  FolderOpen, 
  Eye, 
  Download, 
  Upload, 
  Copy, 
  Trash2,
  Plus,
  LayoutTemplate,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  Star,
  Settings
} from 'lucide-react'
import Link from 'next/link'

export default function HowToPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">How To Use Templates</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the template system to speed up your workflow and create consistent, professional websites in minutes.
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Star className="w-6 h-6 mr-2" />
              Quick Start: 5 Minutes to Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                <h3 className="font-semibold mb-1">Create Layout</h3>
                <p className="text-sm text-gray-600">Build a page with drag & drop</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                <h3 className="font-semibold mb-1">Save Template</h3>
                <p className="text-sm text-gray-600">Click "Save as Template"</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                <h3 className="font-semibold mb-1">Manage Templates</h3>
                <p className="text-sm text-gray-600">Go to Templates page</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
                <h3 className="font-semibold mb-1">Apply Template</h3>
                <p className="text-sm text-gray-600">Click "Use Template"</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">✓</div>
                <h3 className="font-semibold mb-1">Done!</h3>
                <p className="text-sm text-gray-600">Your template is ready</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Creating Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Save className="w-6 h-6 mr-2" />
                Creating Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Method 1: From Current Page</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Save any page you're working on as a template for future use.
                  </p>
                  <ol className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>1. Build your page layout using drag & drop widgets</li>
                    <li>2. Click "Save as Template" in the top navigation</li>
                    <li>3. Enter a name and description for your template</li>
                    <li>4. Choose a category (business, portfolio, etc.)</li>
                    <li>5. Click "Create Template"</li>
                  </ol>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Method 2: Templates Page</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Create templates directly from the templates management page.
                  </p>
                  <ol className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>1. Navigate to the <Link href="/templates" className="text-blue-600 hover:underline">Templates page</Link></li>
                    <li>2. Click "Create Template" button</li>
                    <li>3. Fill in template details</li>
                    <li>4. Current page content will be automatically captured</li>
                  </ol>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-1">Pro Tip</h5>
                    <p className="text-sm text-blue-700">
                      Create templates for common layouts like landing pages, contact sections, 
                      or feature grids to reuse across multiple projects.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Using Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <FolderOpen className="w-6 h-6 mr-2" />
                Using Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Applying Templates</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Load any template into the page builder with a single click.
                  </p>
                  <ol className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>1. Go to the <Link href="/templates" className="text-blue-600 hover:underline">Templates page</Link></li>
                    <li>2. Browse available templates or use search/filter</li>
                    <li>3. Click "Preview" to see how the template looks</li>
                    <li>4. Click "Use Template" to apply it to the builder</li>
                    <li>5. You'll be redirected to the builder with template loaded</li>
                  </ol>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">After Applying</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Once a template is loaded, you can customize it to fit your needs.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Edit text content by clicking on any text element</li>
                    <li>• Replace images by clicking on image widgets</li>
                    <li>• Change colors and styles using the Style panel</li>
                    <li>• Add or remove elements as needed</li>
                    <li>• Save your customized version as a new template</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-green-800 mb-1">Success!</h5>
                    <p className="text-sm text-green-700">
                      When a template loads successfully, you'll see a blue notification 
                      confirming the template name has been applied.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Managing Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <LayoutTemplate className="w-6 h-6 mr-2" />
                Managing Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Copy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h5 className="font-semibold mb-1">Duplicate</h5>
                  <p className="text-xs text-gray-600">
                    Create a copy of any template to modify without affecting the original
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h5 className="font-semibold mb-1">Export</h5>
                  <p className="text-xs text-gray-600">
                    Download templates as JSON files to share or backup
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Upload className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h5 className="font-semibold mb-1">Import</h5>
                  <p className="text-xs text-gray-600">
                    Upload JSON files to add templates from other sources
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Trash2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <h5 className="font-semibold mb-1">Delete</h5>
                  <p className="text-xs text-gray-600">
                    Remove templates you no longer need
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-yellow-800 mb-1">Important</h5>
                    <p className="text-sm text-yellow-700">
                      Templates are stored in your browser's localStorage. 
                      Clearing browser data will remove all templates. 
                      Export important templates regularly!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700">
                <Plus className="w-6 h-6 mr-2" />
                Template Categories & Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Available Categories</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Business</Badge>
                  <Badge variant="secondary">Portfolio</Badge>
                  <Badge variant="secondary">E-commerce</Badge>
                  <Badge variant="secondary">Blog</Badge>
                  <Badge variant="secondary">General</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Organize your templates by category to find them quickly later.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Best Practices</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Descriptive Names:</strong> Use clear names like "Landing Page - Hero Section" or "Contact Form Layout"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Good Descriptions:</strong> Explain what the template is for and what it includes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Consistent Styling:</strong> Use consistent colors, fonts, and spacing within templates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Mobile-First:</strong> Ensure templates look good on all device sizes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Regular Updates:</strong> Keep templates updated with your latest design standards</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Star className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-indigo-800 mb-1">Template Ideas</h5>
                    <p className="text-sm text-indigo-700">
                      Create templates for: landing pages, about sections, service grids, 
                      contact forms, testimonial sections, portfolio layouts, pricing tables, 
                      FAQ sections, newsletter signups, and footer designs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Troubleshooting */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Common Issues</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-red-300 pl-4">
                    <h5 className="font-medium text-red-800">Template Not Loading</h5>
                    <p className="text-sm text-gray-600">
                      Check browser console for errors. Ensure template data is valid JSON.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-300 pl-4">
                    <h5 className="font-medium text-yellow-800">Missing Elements</h5>
                    <p className="text-sm text-gray-600">
                      Some widgets may not be available. Update your page builder to the latest version.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-300 pl-4">
                    <h5 className="font-medium text-blue-800">Styles Not Applied</h5>
                    <p className="text-sm text-gray-600">
                      Template styles may conflict with global theme settings. Check the Style panel.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Solutions</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-300 pl-4">
                    <h5 className="font-medium text-green-800">Clear Browser Data</h5>
                    <p className="text-sm text-gray-600">
                      Clear localStorage and refresh the page if templates are not displaying.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-300 pl-4">
                    <h5 className="font-medium text-green-800">Export & Import</h5>
                    <p className="text-sm text-gray-600">
                      Export templates before clearing browser data, then import them back.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-300 pl-4">
                    <h5 className="font-medium text-green-800">Check Browser Support</h5>
                    <p className="text-sm text-gray-600">
                      Use modern browsers like Chrome, Firefox, Safari, or Edge for best results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Help */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <FileText className="w-6 h-6 mr-2" />
              Need More Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <LayoutTemplate className="w-6 h-6" />
                </div>
                <h5 className="font-semibold mb-2">Builder Guide</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Learn the basics of drag & drop building
                </p>
                <Button size="sm" variant="outline">
                  View Guide
                </Button>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6" />
                </div>
                <h5 className="font-semibold mb-2">Video Tutorials</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Watch step-by-step video guides
                </p>
                <Button size="sm" variant="outline">
                  Watch Videos
                </Button>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Copy className="w-6 h-6" />
                </div>
                <h5 className="font-semibold mb-2">Sample Templates</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Download pre-made template packs
                </p>
                <Button size="sm" variant="outline">
                  Download Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <Button className="flex items-center">
                  <LayoutTemplate className="w-4 h-4 mr-2" />
                  Go to Builder
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" className="flex items-center">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  View Templates
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}