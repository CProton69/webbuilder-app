"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Download, Upload, RefreshCw } from "lucide-react"; // Only valid icons imported

interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  logo: {
    type: "text" | "image";
    text: string;
    imageUrl: string;
    alt: string;
  };
  favicon: string;
  theme: "light" | "dark" | "auto";
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: string;
    lineHeight: string;
  };
  layout: {
    maxWidth: string;
    containerPadding: string;
    borderRadius: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  analytics: {
    googleAnalyticsId: string;
    facebookPixelId: string;
  };
  advanced: {
    customCss: string;
    customJs: string;
    headCode: string;
    bodyCode: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: "My Website",
    siteDescription: "Built with Page Builder",
    siteUrl: "https://example.com",
    logo: {
      type: "text",
      text: "MySite",
      imageUrl: "",
      alt: "Logo",
    },
    favicon: "",
    theme: "light",
    colors: {
      primary: "#3b82f6",
      secondary: "#64748b",
      accent: "#10b981",
      background: "#ffff",
      text: "#1f2937",
    },
    typography: {
      headingFont: "Inter",
      bodyFont: "Inter",
      fontSize: "16",
      lineHeight: "1.6",
    },
    layout: {
      maxWidth: "1200",
      containerPadding: "20",
      borderRadius: "8",
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      ogImage: "",
    },
    analytics: {
      googleAnalyticsId: "",
      facebookPixelId: "",
    },
    advanced: {
      customCss: "",
      customJs: "",
      headCode: "",
      bodyCode: "",
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("pageBuilderSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (
    section: keyof SiteSettings,
    field: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleNestedSettingChange = (
    section: keyof SiteSettings,
    subsection: string,
    field: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section as any][subsection],
          [field]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("pageBuilderSettings", JSON.stringify(settings));
    setHasChanges(false);
    // In a real app, this would save to a backend
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "site-settings.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setSettings(imported);
          setHasChanges(true);
        } catch (error) {
          alert("Invalid settings file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      setSettings({
        siteTitle: "My Website",
        siteDescription: "Built with Page Builder",
        siteUrl: "https://example.com",
        logo: {
          type: "text",
          text: "MySite",
          imageUrl: "",
          alt: "Logo",
        },
        favicon: "",
        theme: "light",
        colors: {
          primary: "#3b82f6",
          secondary: "#64748b",
          accent: "#10b981",
          background: "#ffff",
          text: "#1f2937",
        },
        typography: {
          headingFont: "Inter",
          bodyFont: "Inter",
          fontSize: "16",
          lineHeight: "1.6",
        },
        layout: {
          maxWidth: "1200",
          containerPadding: "20",
          borderRadius: "8",
        },
        seo: {
          metaTitle: "",
          metaDescription: "",
          keywords: [],
          ogImage: "",
        },
        analytics: {
          googleAnalyticsId: "",
          facebookPixelId: "",
        },
        advanced: {
          customCss: "",
          customJs: "",
          headCode: "",
          bodyCode: "",
        },
      });
      setHasChanges(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Configure your website settings and preferences
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportSettings}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Label htmlFor="import-settings" className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </span>
              </Button>
            </Label>
            <input
              id="import-settings"
              type="file"
              accept=".json"
              onChange={handleImportSettings}
              className="hidden"
            />
            <Button variant="outline" onClick={handleResetSettings}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSaveSettings} disabled={!hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input
                    id="site-title"
                    value={settings.siteTitle}
                    onChange={(e) =>
                      handleSettingChange(
                        "siteTitle",
                        "siteTitle",
                        e.target.value
                      )
                    }
                    placeholder="My Website"
                  />
                </div>
                <div>
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    value={settings.siteDescription}
                    onChange={(e) =>
                      handleSettingChange(
                        "siteDescription",
                        "siteDescription",
                        e.target.value
                      )
                    }
                    placeholder="Brief description of your website"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input
                    id="site-url"
                    value={settings.siteUrl}
                    onChange={(e) =>
                      handleSettingChange("siteUrl", "siteUrl", e.target.value)
                    }
                    placeholder="https://example.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo & Favicon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="logo-type">Logo Type</Label>
                  <Select
                    value={settings.logo.type}
                    onValueChange={(value) =>
                      handleNestedSettingChange("logo", "logo", "type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Logo</SelectItem>
                      <SelectItem value="image">Image Logo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {settings.logo.type === "text" ? (
                  <div>
                    <Label htmlFor="logo-text">Logo Text</Label>
                    <Input
                      id="logo-text"
                      value={settings.logo.text}
                      onChange={(e) =>
                        handleNestedSettingChange(
                          "logo",
                          "logo",
                          "text",
                          e.target.value
                        )
                      }
                      placeholder="MySite"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="logo-image">Logo Image URL</Label>
                    <Input
                      id="logo-image"
                      value={settings.logo.imageUrl}
                      onChange={(e) =>
                        handleNestedSettingChange(
                          "logo",
                          "logo",
                          "imageUrl",
                          e.target.value
                        )
                      }
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="favicon">Favicon URL</Label>
                  <Input
                    id="favicon"
                    value={settings.favicon}
                    onChange={(e) =>
                      handleSettingChange("favicon", "favicon", e.target.value)
                    }
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="theme">Default Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) =>
                      handleSettingChange("theme", "theme", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">
                        Auto (System Preference)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        value={settings.colors.primary}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "colors",
                            "colors",
                            "primary",
                            e.target.value
                          )
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.colors.primary}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "colors",
                            "colors",
                            "primary",
                            e.target.value
                          )
                        }
                        placeholder="#3b82f6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={settings.colors.secondary}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "colors",
                            "colors",
                            "secondary",
                            e.target.value
                          )
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.colors.secondary}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "colors",
                            "colors",
                            "secondary",
                            e.target.value
                          )
                        }
                        placeholder="#64748b"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="accent-color"
                        type="color"
                        value={settings.colors.accent}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "colors",
                            "colors",
                            "accent",
                            e.target.value
                          )
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.colors.accent}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "colors",
                            "colors",
                            "accent",
                            e.target.value
                          )
                        }
                        placeholder="#10b981"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="background-color">Background Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="background-color"
                        type="color"
                        value={settings.colors.background}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "colors",
                            "colors",
                            "background",
                            e.target.value
                          )
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.colors.background}
                        onChange={(e) =>
                          handleNestedSettingChange(
                            "colors",
                            "colors",
                            "background",
                            e.target.value
                          )
                        }
                        placeholder="#ffff"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Layout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="max-width">Max Width (px)</Label>
                  <Input
                    id="max-width"
                    type="number"
                    value={settings.layout.maxWidth}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "layout",
                        "layout",
                        "maxWidth",
                        e.target.value
                      )
                    }
                    placeholder="1200"
                  />
                </div>
                <div>
                  <Label htmlFor="container-padding">
                    Container Padding (px)
                  </Label>
                  <Input
                    id="container-padding"
                    type="number"
                    value={settings.layout.containerPadding}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "layout",
                        "layout",
                        "containerPadding",
                        e.target.value
                      )
                    }
                    placeholder="20"
                  />
                </div>
                <div>
                  <Label htmlFor="border-radius">Border Radius (px)</Label>
                  <Input
                    id="border-radius"
                    type="number"
                    value={settings.layout.borderRadius}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "layout",
                        "layout",
                        "borderRadius",
                        e.target.value
                      )
                    }
                    placeholder="8"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Typography Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heading-font">Heading Font</Label>
                  <Select
                    value={settings.typography.headingFont}
                    onValueChange={(value) =>
                      handleNestedSettingChange(
                        "typography",
                        "typography",
                        "headingFont",
                        value
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Playfair Display">
                        Playfair Display
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="body-font">Body Font</Label>
                  <Select
                    value={settings.typography.bodyFont}
                    onValueChange={(value) =>
                      handleNestedSettingChange(
                        "typography",
                        "typography",
                        "bodyFont",
                        value
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Playfair Display">
                        Playfair Display
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="font-size">Base Font Size (px)</Label>
                  <Input
                    id="font-size"
                    type="number"
                    value={settings.typography.fontSize}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "typography",
                        "typography",
                        "fontSize",
                        e.target.value
                      )
                    }
                    placeholder="16"
                  />
                </div>
                <div>
                  <Label htmlFor="line-height">Line Height</Label>
                  <Input
                    id="line-height"
                    type="number"
                    step="0.1"
                    value={settings.typography.lineHeight}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "typography",
                        "typography",
                        "lineHeight",
                        e.target.value
                      )
                    }
                    placeholder="1.6"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={settings.seo.metaTitle}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "seo",
                        "seo",
                        "metaTitle",
                        e.target.value
                      )
                    }
                    placeholder="Default meta title for search engines"
                  />
                </div>
                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    value={settings.seo.metaDescription}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "seo",
                        "seo",
                        "metaDescription",
                        e.target.value
                      )
                    }
                    placeholder="Default meta description for search engines"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="og-image">Open Graph Image</Label>
                  <Input
                    id="og-image"
                    value={settings.seo.ogImage}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "seo",
                        "seo",
                        "ogImage",
                        e.target.value
                      )
                    }
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="google-analytics">Google Analytics ID</Label>
                  <Input
                    id="google-analytics"
                    value={settings.analytics.googleAnalyticsId}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "analytics",
                        "analytics",
                        "googleAnalyticsId",
                        e.target.value
                      )
                    }
                    placeholder="G-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                  <Input
                    id="facebook-pixel"
                    value={settings.analytics.facebookPixelId}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "analytics",
                        "analytics",
                        "facebookPixelId",
                        e.target.value
                      )
                    }
                    placeholder="XXXX"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="custom-css">Custom CSS</Label>
                  <Textarea
                    id="custom-css"
                    value={settings.advanced.customCss}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "advanced",
                        "advanced",
                        "customCss",
                        e.target.value
                      )
                    }
                    placeholder="/* Add your custom CSS here */"
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="custom-js">Custom JavaScript</Label>
                  <Textarea
                    id="custom-js"
                    value={settings.advanced.customJs}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "advanced",
                        "advanced",
                        "customJs",
                        e.target.value
                      )
                    }
                    placeholder="// Add your custom JavaScript here"
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Header & Footer Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="head-code">Head Code (HTML)</Label>
                  <Textarea
                    id="head-code"
                    value={settings.advanced.headCode}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "advanced",
                        "advanced",
                        "headCode",
                        e.target.value
                      )
                    }
                    placeholder="<!-- Add code to be inserted in <head> -->"
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="body-code">Body Code (HTML)</Label>
                  <Textarea
                    id="body-code"
                    value={settings.advanced.bodyCode}
                    onChange={(e) =>
                      handleNestedSettingChange(
                        "advanced",
                        "advanced",
                        "bodyCode",
                        e.target.value
                      )
                    }
                    placeholder="<!-- Add code to be inserted before </body> -->"
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
