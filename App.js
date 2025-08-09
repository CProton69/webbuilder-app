/**
 * Page Builder Pro - Main Application Entry Point
 * A comprehensive drag-and-drop website builder with header, footer, and template management
 * 
 * @version 1.0.0
 * @author Page Builder Team
 * @description Professional drag and drop website builder built with Next.js, TypeScript, and Tailwind CSS
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { AppNavigation } from '@/components/app-navigation';

// Import Page Components
import PageBuilder from './src/app/page';
import TemplatesPage from './src/app/templates/page';
import PreviewPage from './src/app/preview/page';
import HowToPage from './src/app/how-to/page';
import SettingsPage from './src/app/settings/page';
import WebSocketExample from './examples/websocket/page';

// Import UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import Icons
import { 
  Layout, 
  Settings, 
  FileText, 
  Eye, 
  HelpCircle, 
  Palette,
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Shield,
  Star
} from 'lucide-react';

/**
 * Main Application Component
 * Handles routing, theme management, and overall app structure
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('/');

  // Simulate app initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle route changes
  const handleRouteChange = useCallback((path) => {
    setCurrentRoute(path);
    window.scrollTo(0, 0);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Page Builder Pro</h2>
          <p className="text-muted-foreground">Loading your creative workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          {/* App Navigation */}
          <AppNavigation currentRoute={currentRoute} onRouteChange={handleRouteChange} />
          
          {/* Main Content Area */}
          <main className="container mx-auto px-4 py-6">
            <Routes>
              {/* Main Page Builder */}
              <Route path="/" element={<PageBuilder onRouteChange={handleRouteChange} />} />
              
              {/* Templates Management */}
              <Route path="/templates" element={<TemplatesPage onRouteChange={handleRouteChange} />} />
              
              {/* Preview Page */}
              <Route path="/preview" element={<PreviewPage onRouteChange={handleRouteChange} />} />
              
              {/* How To Guide */}
              <Route path="/how-to" element={<HowToPage onRouteChange={handleRouteChange} />} />
              
              {/* Settings */}
              <Route path="/settings" element={<SettingsPage onRouteChange={handleRouteChange} />} />
              
              {/* WebSocket Example */}
              <Route path="/examples/websocket" element={<WebSocketExample onRouteChange={handleRouteChange} />} />
              
              {/* Fallback to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Toast Notifications */}
          <Toaster />
        </div>
      </Router>
    </NextThemesProvider>
  );
}

/**
 * Landing Page Component
 * Welcome screen for new users
 */
function LandingPage({ onRouteChange }) {
  const features = [
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Drag & Drop Builder",
      description: "Intuitive drag-and-drop interface for building websites without coding"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "50+ Widgets",
      description: "Comprehensive widget library including sliders, carousels, forms, and more"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Build once, deploy everywhere with built-in responsive controls"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Template System",
      description: "Save, load, and manage templates for efficient workflow"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Live Preview",
      description: "Real-time preview of your website as you build it"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Advanced Settings",
      description: "Fine-tune every aspect of your website with advanced controls"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
            <Layout className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Page Builder Pro
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Professional drag-and-drop website builder with 50+ widgets, template management, and responsive design controls
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => onRouteChange('/')}
            className="px-8"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start Building
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onRouteChange('/how-to')}
            className="px-8"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Learn How
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-muted/50 rounded-lg p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Widgets</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Responsive</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <div className="text-muted-foreground">Templates</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">0</div>
            <div className="text-muted-foreground">Code Required</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Amazing Websites?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already creating stunning websites with Page Builder Pro
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => onRouteChange('/')}
            className="px-8"
          >
            Get Started Free
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onRouteChange('/templates')}
            className="px-8"
          >
            Browse Templates
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Error Boundary Component
 * Catches and displays errors gracefully
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle>Oops! Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                We encountered an unexpected error. Please try refreshing the page.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Export wrapped App with error boundary
 */
export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

// Export individual components for modular usage
export { App, LandingPage, ErrorBoundary };

// App metadata and configuration
export const appConfig = {
  name: "Page Builder Pro",
  version: "1.0.0",
  description: "Professional drag and drop website builder",
  author: "Page Builder Team",
  features: [
    "Drag & Drop Interface",
    "50+ Widgets",
    "Template Management",
    "Responsive Design",
    "Live Preview",
    "Header/Footer Builder",
    "Menu Management",
    "Theme Support"
  ],
  routes: [
    { path: "/", component: "PageBuilder", name: "Page Builder" },
    { path: "/templates", component: "TemplatesPage", name: "Templates" },
    { path: "/preview", component: "PreviewPage", name: "Preview" },
    { path: "/how-to", component: "HowToPage", name: "How To Guide" },
    { path: "/settings", component: "SettingsPage", name: "Settings" },
    { path: "/examples/websocket", component: "WebSocketExample", name: "WebSocket Example" }
  ],
  widgets: [
    "Layout Widgets",
    "Content Widgets", 
    "Media Widgets",
    "Advanced Widgets",
    "TwentyTwenty Slider",
    "Before/After Carousel"
  ]
};