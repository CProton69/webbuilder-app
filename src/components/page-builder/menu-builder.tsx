"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Menu,
  Link as Link2,
  ExternalLink,
  Hash,
  FileText,
  Settings,
  Copy,
  Trash2,
  Edit,
  GripVertical,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Globe,
} from "lucide-react";

interface MenuItem {
  id: string;
  text: string;
  url: string;
  type: "page" | "anchor" | "external" | "custom";
  target: "_self" | "_blank";
  children: MenuItem[];
  icon?: string;
  description?: string;
  order: number;
}

interface Menu {
  id: string;
  name: string;
  description: string;
  location: "header" | "footer" | "custom";
  items: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

interface MenuBuilderProps {
  menus: Menu[];
  pages: Array<{ id: string; title: string; path: string; slug: string }>;
  anchors: Array<{ id: string; label: string; elementId: string }>;
  onCreateMenu: (menu: Omit<Menu, "id" | "createdAt" | "updatedAt">) => void;
  onUpdateMenu: (menuId: string, updates: Partial<Menu>) => void;
  onDeleteMenu: (menuId: string) => void;
  onDuplicateMenu: (menuId: string) => void;
}

export function MenuBuilder({
  menus,
  pages,
  anchors,
  onCreateMenu,
  onUpdateMenu,
  onDeleteMenu,
  onDuplicateMenu,
}: MenuBuilderProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    location: "header" as const,
    items: [],
  });

  const handleCreateMenu = () => {
    if (!newMenu.name.trim()) return;

    onCreateMenu({
      ...newMenu,
      items: [],
    });

    setNewMenu({
      name: "",
      description: "",
      location: "header",
      items: [],
    });
    setShowCreateDialog(false);
  };

  const handleDuplicateMenu = (menuId: string) => {
    const menu = menus.find((m) => m.id === menuId);
    if (!menu) return;

    const duplicateMenu = {
      ...menu,
      name: `${menu.name} (Copy)`,
      items: JSON.parse(JSON.stringify(menu.items)), // Deep copy items
    };

    delete duplicateMenu.id;
    delete duplicateMenu.createdAt;
    delete duplicateMenu.updatedAt;

    onCreateMenu(duplicateMenu);
  };

  const handleDeleteMenu = (menuId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this menu? This action cannot be undone."
      )
    ) {
      onDeleteMenu(menuId);
    }
  };

  const getLocationColor = (location: Menu["location"]) => {
    switch (location) {
      case "header":
        return "bg-blue-100 text-blue-800";
      case "footer":
        return "bg-gray-100 text-gray-800";
      case "custom":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Menu className="w-4 h-4" />
              Menu Builder
            </CardTitle>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-3 h-3 mr-1" />
                  New Menu
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Menu</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="menu-name">Menu Name</Label>
                    <Input
                      id="menu-name"
                      value={newMenu.name}
                      onChange={(e) =>
                        setNewMenu({ ...newMenu, name: e.target.value })
                      }
                      placeholder="Main Menu, Footer Menu, etc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="menu-description">Description</Label>
                    <Textarea
                      id="menu-description"
                      value={newMenu.description}
                      onChange={(e) =>
                        setNewMenu({ ...newMenu, description: e.target.value })
                      }
                      placeholder="Brief description of this menu's purpose"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="menu-location">Menu Location</Label>
                    <Select
                      value={newMenu.location}
                      onValueChange={(value: any) =>
                        setNewMenu({ ...newMenu, location: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="header">Header Menu</SelectItem>
                        <SelectItem value="footer">Footer Menu</SelectItem>
                        <SelectItem value="custom">Custom Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleCreateMenu} className="flex-1">
                      Create Menu
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
              {menus.map((menu) => (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  pages={pages}
                  anchors={anchors}
                  onEdit={() => setEditingMenu(menu)}
                  onDuplicate={() => handleDuplicateMenu(menu.id)}
                  onDelete={() => handleDeleteMenu(menu.id)}
                  onUpdateMenu={onUpdateMenu}
                />
              ))}

              {menus.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Menu className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No menus created yet</p>
                  <p className="text-xs">
                    Click "New Menu" to create your first menu
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Edit Menu Dialog */}
      <Dialog open={!!editingMenu} onOpenChange={() => setEditingMenu(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Menu: {editingMenu?.name}</DialogTitle>
          </DialogHeader>
          {editingMenu && (
            <MenuEditor
              menu={editingMenu}
              pages={pages}
              anchors={anchors}
              onSave={(updatedMenu) => {
                onUpdateMenu(editingMenu.id, updatedMenu);
                setEditingMenu(null);
              }}
              onCancel={() => setEditingMenu(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MenuCardProps {
  menu: Menu;
  pages: Array<{ id: string; title: string; path: string; slug: string }>;
  anchors: Array<{ id: string; label: string; elementId: string }>;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onUpdateMenu: (menuId: string, updates: Partial<Menu>) => void;
}

function MenuCard({
  menu,
  pages,
  anchors,
  onEdit,
  onDuplicate,
  onDelete,
  onUpdateMenu,
}: MenuCardProps) {
  const itemCount =
    menu.items.length +
    menu.items.reduce((sum, item) => sum + item.children.length, 0);

  return (
    <div className="p-3 border rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-blue-500">
            <Menu className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm">{menu.name}</div>
            <div className="text-xs text-gray-500">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={`text-xs ${getLocationColor(menu.location)}`}>
                {menu.location}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0"
            onClick={onEdit}
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0"
            onClick={onDuplicate}
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
            onClick={onDelete}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface MenuEditorProps {
  menu: Menu;
  pages: Array<{ id: string; title: string; path: string; slug: string }>;
  anchors: Array<{ id: string; label: string; elementId: string }>;
  onSave: (menu: Partial<Menu>) => void;
  onCancel: () => void;
}

function MenuEditor({
  menu,
  pages,
  anchors,
  onSave,
  onCancel,
}: MenuEditorProps) {
  const [editingMenu, setEditingMenu] = useState(menu);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const addMenuItem = (parentId?: string) => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      text: "New Menu Item",
      url: "",
      type: "page",
      target: "_self",
      children: [],
      order: 0,
    };

    if (parentId) {
      const parent = findMenuItemById(editingMenu.items, parentId);
      if (parent) {
        parent.children.push(newItem);
      }
    } else {
      editingMenu.items.push(newItem);
    }

    setEditingMenu({ ...editingMenu });
  };

  const updateMenuItem = (itemId: string, updates: Partial<MenuItem>) => {
    const item = findMenuItemById(editingMenu.items, itemId);
    if (item) {
      Object.assign(item, updates);
      setEditingMenu({ ...editingMenu });
    }
  };

  const deleteMenuItem = (itemId: string) => {
    const removeItem = (items: MenuItem[]): MenuItem[] => {
      return items.filter((item) => {
        if (item.id === itemId) return false;
        if (item.children.length > 0) {
          item.children = removeItem(item.children);
        }
        return true;
      });
    };

    editingMenu.items = removeItem(editingMenu.items);
    setEditingMenu({ ...editingMenu });
  };

  const findMenuItemById = (items: MenuItem[], id: string): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children.length > 0) {
        const found = findMenuItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const getLocationColor = (location: Menu["location"]) => {
    switch (location) {
      case "header":
        return "bg-blue-100 text-blue-800";
      case "footer":
        return "bg-gray-100 text-gray-800";
      case "custom":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Menu Settings */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="edit-menu-name">Menu Name</Label>
          <Input
            id="edit-menu-name"
            value={editingMenu.name}
            onChange={(e) =>
              setEditingMenu({ ...editingMenu, name: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="edit-menu-description">Description</Label>
          <Textarea
            id="edit-menu-description"
            value={editingMenu.description}
            onChange={(e) =>
              setEditingMenu({ ...editingMenu, description: e.target.value })
            }
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="edit-menu-location">Menu Location</Label>
          <Select
            value={editingMenu.location}
            onValueChange={(value: any) =>
              setEditingMenu({ ...editingMenu, location: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="header">Header Menu</SelectItem>
              <SelectItem value="footer">Footer Menu</SelectItem>
              <SelectItem value="custom">Custom Location</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Menu Items</Label>
          <Button size="sm" onClick={() => addMenuItem()}>
            <Plus className="w-3 h-3 mr-1" />
            Add Item
          </Button>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50 min-h-[200px]">
          {editingMenu.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Menu className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No menu items yet</p>
              <p className="text-xs">
                Click "Add Item" to create your first menu item
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {editingMenu.items.map((item, index) => (
                <MenuItemEditor
                  key={item.id}
                  item={item}
                  level={0}
                  pages={pages}
                  anchors={anchors}
                  expanded={expandedItems.has(item.id)}
                  onToggleExpand={() => toggleExpanded(item.id)}
                  onUpdate={(updates) => updateMenuItem(item.id, updates)}
                  onDelete={() => deleteMenuItem(item.id)}
                  onAddChild={() => addMenuItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onSave(editingMenu)} className="flex-1">
          Save Menu
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

interface MenuItemEditorProps {
  item: MenuItem;
  level: number;
  pages: Array<{ id: string; title: string; path: string; slug: string }>;
  anchors: Array<{ id: string; label: string; elementId: string }>;
  expanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (updates: Partial<MenuItem>) => void;
  onDelete: () => void;
  onAddChild: () => void;
}

function MenuItemEditor({
  item,
  level,
  pages,
  anchors,
  expanded,
  onToggleExpand,
  onUpdate,
  onDelete,
  onAddChild,
}: MenuItemEditorProps) {
  const getTypeIcon = (type: MenuItem["type"]) => {
    switch (type) {
      case "page":
        return <FileText className="w-3 h-3" />;
      case "anchor":
        return <Hash className="w-3 h-3" />;
      case "external":
        return <ExternalLink className="w-3 h-3" />;
      case "custom":
        return <Link2 className="w-3 h-3" />;
      default:
        return <Link2 className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 p-2 bg-white border rounded">
        <div className="flex items-center gap-1">
          <GripVertical className="w-3 h-3 text-gray-400" />
          {item.children.length > 0 && (
            <button
              onClick={onToggleExpand}
              className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              {expanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          )}
          {item.children.length === 0 && <div className="w-4 h-4"></div>}
        </div>

        <div className="flex items-center gap-2 flex-1">
          <div className="text-blue-500">{getTypeIcon(item.type)}</div>
          <Input
            value={item.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="flex-1 text-sm"
            placeholder="Menu item text"
          />
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0"
            onClick={onAddChild}
            title="Add child item"
          >
            <Plus className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
            onClick={onDelete}
            title="Delete item"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Item Settings */}
      <div className="ml-6 p-3 bg-gray-50 border rounded space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Link Type</Label>
            <Select
              value={item.type}
              onValueChange={(value: any) => onUpdate({ type: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="page">Page</SelectItem>
                <SelectItem value="anchor">Anchor</SelectItem>
                <SelectItem value="external">External URL</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Target</Label>
            <Select
              value={item.target}
              onValueChange={(value: any) => onUpdate({ target: value })}
            >
              <SelectTrigger className="h-8 text-xs">
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
          <Label className="text-xs">
            {item.type === "page"
              ? "Select Page"
              : item.type === "anchor"
              ? "Select Anchor"
              : item.type === "external"
              ? "External URL"
              : "Custom URL"}
          </Label>
          {item.type === "page" && (
            <Select
              value={item.url}
              onValueChange={(value) => onUpdate({ url: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Choose a page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.path}>
                    {page.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {item.type === "anchor" && (
            <Select
              value={item.url}
              onValueChange={(value) => onUpdate({ url: value })}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Choose an anchor" />
              </SelectTrigger>
              <SelectContent>
                {anchors.map((anchor) => (
                  <SelectItem key={anchor.id} value={`#${anchor.elementId}`}>
                    {anchor.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {(item.type === "external" || item.type === "custom") && (
            <Input
              value={item.url}
              onChange={(e) => onUpdate({ url: e.target.value })}
              className="h-8 text-xs"
              placeholder="https://example.com or /custom-path"
            />
          )}
        </div>
      </div>

      {/* Child Items */}
      {expanded && item.children.length > 0 && (
        <div className="ml-6 space-y-2">
          {item.children.map((child, index) => (
            <MenuItemEditor
              key={child.id}
              item={child}
              level={level + 1}
              pages={pages}
              anchors={anchors}
              expanded={expanded}
              onToggleExpand={() => {}}
              onUpdate={(updates) => {
                const updatedChild = { ...child, ...updates };
                const newChildren = item.children.map((c) =>
                  c.id === child.id ? updatedChild : c
                );
                onUpdate({ children: newChildren });
              }}
              onDelete={() => {
                const newChildren = item.children.filter(
                  (c) => c.id !== child.id
                );
                onUpdate({ children: newChildren });
              }}
              onAddChild={() => {
                const newChild: MenuItem = {
                  id: `item-${Date.now()}`,
                  text: "New Child Item",
                  url: "",
                  type: "page",
                  target: "_self",
                  children: [],
                  order: 0,
                };
                onUpdate({ children: [...item.children, newChild] });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function getLocationColor(location: Menu["location"]) {
  switch (location) {
    case "header":
      return "bg-blue-100 text-blue-800";
    case "footer":
      return "bg-gray-100 text-gray-800";
    case "custom":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
