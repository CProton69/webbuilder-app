"use client";

import React, { useRef, useEffect, useState } from "react";
import { useDragDrop } from "./drag-drop-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Copy,
  Settings,
  GripVertical,
  MoreVertical,
  LayoutTemplate,
  Columns,
  Type,
  FileText,
  MousePointer,
  ImageIcon,
  Box,
  ChevronUp,
  ChevronDown,
  Code,
  Anchor,
  Divide,
  Minimize2,
  AlertTriangle,
  Tag,
  Menu,
  ChevronRight,
  FolderOpen,
  ChevronDown as ChevronDown2,
  BarChart2,
  MapPin,
  Music,
  MessageCircle,
  Film,
  PanelTop,
  PanelBottom,
  Star,
  Plus,
} from "lucide-react";
import { TwentyTwentySlider } from "./widgets/twentytwenty-slider";
import { BeforeAfterCarousel } from "./widgets/before-after-carousel";

interface CanvasElementProps {
  element: any;
  isSelected: boolean;
  selectedElement: any | null;
  onSelect: (element: any) => void;
  onUpdate: (element: any) => void;
  onDelete: (elementId: string) => void;
  onDuplicate: (element: any) => void;
  onDrop: (
    newElement: any,
    targetElement: any,
    position: "before" | "after" | "inside"
  ) => void;
  onMoveUp?: (element: any) => void;
  onMoveDown?: (element: any) => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  depth?: number;
  getDefaultContent?: (type: string) => any;
}

export function CanvasElement({
  element,
  isSelected,
  selectedElement,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onDrop,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
  depth = 0,
  getDefaultContent,
}: CanvasElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { dropZones, setDropZones, dragItem, clearDropZones } = useDragDrop();
  const [isDropTarget, setIsDropTarget] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<"before" | "after" | "inside">(
    "after"
  );

  useEffect(() => {
    if (elementRef.current && dragItem) {
      const rect = elementRef.current.getBoundingClientRect();

      // Create drop zones for this element
      const zones = [
        {
          id: `${element.id}-before`,
          elementId: element.id,
          position: "before" as const,
          rect: {
            ...rect,
            height: 4,
            bottom: rect.top + 4,
          },
        },
        {
          id: `${element.id}-after`,
          elementId: element.id,
          position: "after" as const,
          rect: {
            ...rect,
            top: rect.bottom - 4,
            height: 4,
          },
        },
      ];

      // Add inside drop zone for containers
      if (
        element.type === "section" ||
        element.type === "column" ||
        element.type === "container"
      ) {
        zones.push({
          id: `${element.id}-inside`,
          elementId: element.id,
          position: "inside" as const,
          rect: rect,
        });
      }

      setDropZones((prev) => [...prev, ...zones]);
    }

    return () => {
      // Clean up drop zones when element unmounts
      if (elementRef.current) {
        setDropZones((prev) =>
          prev.filter((zone) => !zone.id.startsWith(`${element.id}-`))
        );
      }
    };
  }, [element.id, element.type, dragItem, setDropZones]);

  const handleDragStart = (e: React.DragEvent) => {
    // Allow all elements to be dragged
    setIsDragging(true);

    const dragItem = {
      type: "element",
      data: element,
      source: "canvas",
    };

    // Set drag data for compatibility
    e.dataTransfer.setData("text/plain", JSON.stringify(dragItem));

    // Create a smaller, cleaner drag image
    const dragImage = document.createElement("div");
    dragImage.className =
      "px-3 py-2 bg-blue-600 text-white text-xs rounded-md shadow-lg whitespace-nowrap";
    dragImage.textContent = element.type;
    dragImage.style.position = "absolute";
    dragImage.style.top = "-1000px";
    dragImage.style.left = "-1000px";
    document.body.appendChild(dragImage);

    // Set drag image with offset to center it on cursor
    const rect = dragImage.getBoundingClientRect();
    e.dataTransfer.setDragImage(dragImage, rect.width / 2, rect.height / 2);

    // Remove drag image after a short delay
    setTimeout(() => {
      if (dragImage.parentNode) {
        dragImage.parentNode.removeChild(dragImage);
      }
    }, 100);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (dragItem && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;

      let newPosition: "before" | "after" | "inside" = "after";

      if (y < height * 0.25) {
        newPosition = "before";
      } else if (y > height * 0.75) {
        newPosition = "after";
      } else if (
        element.type === "section" ||
        element.type === "column" ||
        element.type === "container"
      ) {
        newPosition = "inside";
      }

      setPosition(newPosition);
      setIsDropTarget(true);
    }
  };

  const handleDragLeave = () => {
    setIsDropTarget(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (dragItem && getDefaultContent) {
      // Handle the drop based on drag item type
      if (dragItem.type === "widget") {
        // Create new element from widget
        const newElement = {
          id: `${dragItem.data.type}-${Date.now()}`,
          type: dragItem.data.type,
          content: getDefaultContent(dragItem.data.type),
          style: {},
          children: [],
        };

        // Call the onDrop callback directly
        onDrop(newElement, element, position);
      } else if (dragItem.type === "element") {
        // Handle element reordering
        const movedElement = dragItem.data;
        onDrop(movedElement, element, position);
      }

      setIsDropTarget(false);
      clearDropZones();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Edit button clicked for element:", element.type, element.id);
    onSelect(element);
  };

  const renderElementContent = () => {
    const baseClasses = `p-4 border-2 rounded-lg transition-all duration-200 ${
      isSelected
        ? "border-primary bg-primary/10"
        : "border-border hover:border-border/80"
    } ${isDropTarget ? "bg-primary/20 border-primary/60" : ""} ${
      isDragging ? "opacity-50" : ""
    }`;

    switch (element.type) {
      case "section":
        return (
          <div
            className={`${baseClasses} bg-muted min-h-[100px]`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-foreground flex items-center gap-2">
                  <LayoutTemplate className="w-3 h-3" />
                  Section
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2 min-h-[50px] border-2 border-dashed border-border rounded p-2">
              {element.children?.map((child: any, index: number) => (
                <CanvasElement
                  key={child.id}
                  element={child}
                  isSelected={selectedElement?.id === child.id}
                  selectedElement={selectedElement}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  onDrop={onDrop}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  canMoveUp={index > 0}
                  canMoveDown={index < element.children.length - 1}
                  depth={depth + 1}
                  getDefaultContent={getDefaultContent}
                />
              ))}
            </div>
          </div>
        );

      case "column":
        return (
          <div
            className={`${baseClasses} bg-muted min-h-[100px]`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Columns className="w-3 h-3" />
                  Column
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2 min-h-[50px] border-2 border-dashed border-border rounded p-2">
              {element.children?.map((child: any, index: number) => (
                <CanvasElement
                  key={child.id}
                  element={child}
                  isSelected={selectedElement?.id === child.id}
                  selectedElement={selectedElement}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  onDrop={onDrop}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  canMoveUp={index > 0}
                  canMoveDown={index < element.children.length - 1}
                  depth={depth + 1}
                  getDefaultContent={getDefaultContent}
                />
              ))}
            </div>
          </div>
        );

      case "heading":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Type className="w-3 h-3" />
                  Heading
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <h2
              className={`text-2xl font-bold ${
                element.content?.alignment === "center"
                  ? "text-center"
                  : element.content?.alignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
              contentEditable={isSelected}
            >
              {element.content?.text || "Heading Text"}
            </h2>
          </div>
        );

      case "text":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Text
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <p
              className={`text-gray-700 ${
                element.content?.alignment === "center"
                  ? "text-center"
                  : element.content?.alignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
              contentEditable={isSelected}
            >
              {element.content?.text ||
                "This is a text paragraph. Click to edit the content."}
            </p>
          </div>
        );

      case "button":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MousePointer className="w-3 h-3" />
                  Button
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div
              className={`w-full ${
                element.content?.alignment === "center"
                  ? "text-center"
                  : element.content?.alignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {element.content?.text || "Button Text"}
              </button>
            </div>
          </div>
        );

      case "image":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" />
                  Image
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div
              className={`w-full ${
                element.content?.alignment === "center"
                  ? "text-center"
                  : element.content?.alignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {element.content?.url ? (
                <div className="relative inline-block">
                  <img
                    src={element.content.url}
                    alt={element.content?.alt || "Image"}
                    className="h-auto rounded max-h-64 object-contain"
                    style={{
                      width: element.content?.width
                        ? `${element.content.width}px`
                        : "auto",
                      height: element.content?.height
                        ? `${element.content.height}px`
                        : "auto",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      console.error(
                        "Image failed to load:",
                        element.content.url
                      );
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const errorDiv = document.createElement("div");
                        errorDiv.className =
                          "w-full h-32 bg-red-50 rounded flex items-center justify-center border-2 border-dashed border-red-300";
                        errorDiv.innerHTML = `
    <div class="text-center">
    <div class="text-red-400 text-sm mb-1">Image failed to load</div>
    <div class="text-xs text-red-500">Check the URL or try uploading again</div>
    </div>
    `;
                        parent.appendChild(errorDiv);
                      }
                    }}
                    onLoad={() => {
                      console.log(
                        "Image loaded successfully:",
                        element.content.url
                      );
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {element.content?.width && element.content?.height
                      ? `${element.content.width}×${element.content.height}`
                      : "Auto"}
                  </div>
                </div>
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-sm text-gray-500">
                      No image selected
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Click "Upload" to add an image
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "html":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Code className="w-3 h-3" />
                  HTML
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="border rounded p-3 bg-gray-50 min-h-[100px]">
              {element.content?.html ? (
                <div
                  dangerouslySetInnerHTML={{ __html: element.content.html }}
                  className="html-content"
                />
              ) : (
                <div className="text-center text-gray-500 py-4">
                  <Code className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm">No HTML content</div>
                </div>
              )}
            </div>
          </div>
        );

      case "menu-anchor":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Anchor className="w-3 h-3" />
                  Menu Anchor
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-blue-600" />
                <div className="text-sm">
                  {element.content?.anchorId ? (
                    <span className="font-mono text-blue-700">
                      #{element.content.anchorId}
                    </span>
                  ) : (
                    <span className="text-gray-500">No anchor ID set</span>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {element.content?.label || "Anchor Point"}
              </div>
            </div>
            {/* Invisible anchor element for smooth scrolling */}
            {element.content?.anchorId && (
              <div
                id={element.content.anchorId}
                className="menu-anchor"
                style={{
                  display: "block",
                  height: "0",
                  overflow: "hidden",
                  position: "relative",
                  top: "-100px",
                }}
                data-label={element.content?.label}
                aria-label={`Anchor point: ${
                  element.content?.label || element.content.anchorId
                }`}
              />
            )}
          </div>
        );

      case "divider":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Divide className="w-3 h-3" />
                  Divider
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full">
              <hr
                style={{
                  borderStyle: element.content?.style || "solid",
                  borderColor: element.content?.color || "#e5e7eb",
                  borderWidth: `${element.content?.thickness || 1}px`,
                }}
              />
            </div>
          </div>
        );

      case "spacer":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Minimize2 className="w-3 h-3" />
                  Spacer
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full bg-gray-100 rounded flex items-center justify-center text-gray-500 text-sm">
              <div className="text-center py-2">
                <Minimize2 className="w-4 h-4 mx-auto mb-1" />
                Spacer: {element.content?.height || 50}px
              </div>
            </div>
          </div>
        );

      case "alert":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" />
                  Alert
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div
              className={`p-4 rounded-lg border ${
                element.content?.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : element.content?.type === "warning"
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                  : element.content?.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              }`}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  {element.content?.message || "This is an alert message."}
                  {element.content?.dismissible && (
                    <button className="ml-2 text-sm underline">Dismiss</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "shortcode":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  Shortcode
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="p-3 bg-gray-100 rounded border">
              <div className="text-sm text-gray-600 font-mono">
                {element.content?.shortcode ? (
                  <div>{element.content.shortcode}</div>
                ) : (
                  <div className="text-gray-400">[shortcode]</div>
                )}
              </div>
            </div>
          </div>
        );

      case "container":
        const containerContent = element.content || {};
        const layout = containerContent.layout || "flex";
        const label = containerContent.label || "Container";
        const padding = containerContent.padding || {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        };
        const margin = containerContent.margin || {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        };
        const background = containerContent.background || {
          type: "color",
          color: "#ffff",
        };
        const border = containerContent.border || {
          style: "none",
          color: "#e5e7eb",
          width: 1,
          radius: 0,
        };

        // Generate container styles
        const containerStyles: React.CSSProperties = {
          padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
          margin: `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
          backgroundColor:
            background.type === "color" ? background.color : "transparent",
          borderStyle: border.style,
          borderColor: border.color,
          borderWidth: border.style !== "none" ? `${border.width}px` : "0",
          borderRadius: `${border.radius}px`,
        };

        // Add background image if set
        if (background.type === "image" && background.image?.url) {
          containerStyles.backgroundImage = `url(${background.image.url})`;
          containerStyles.backgroundSize = background.image.size || "cover";
          containerStyles.backgroundPosition =
            background.image.position || "center";
          containerStyles.backgroundRepeat =
            background.image.repeat || "no-repeat";
        }

        // Add gradient background if set
        if (background.type === "gradient" && background.gradient?.colors) {
          const colors = background.gradient.colors.join(", ");
          containerStyles.background = `${background.gradient.type}-gradient(${
            background.gradient.direction || "180deg"
          }, ${colors})`;
        }

        // Add flex layout styles
        if (layout === "flex" && containerContent.flex) {
          containerStyles.display = "flex";
          containerStyles.flexDirection =
            containerContent.flex.direction || "row";
          containerStyles.flexWrap = containerContent.flex.wrap || "nowrap";
          containerStyles.justifyContent =
            containerContent.flex.justify || "flex-start";
          containerStyles.alignItems = containerContent.flex.align || "stretch";
          containerStyles.gap = `${containerContent.flex.gap || 0}px`;
        }

        // Add grid layout styles
        if (layout === "grid" && containerContent.grid) {
          containerStyles.display = "grid";
          containerStyles.gridTemplateColumns = `repeat(${
            containerContent.grid.columns || 1
          }, 1fr)`;
          containerStyles.gridAutoRows = containerContent.grid.rows || "auto";
          containerStyles.gap = `${containerContent.grid.gap || 0}px`;
        }

        return (
          <div
            className={`${baseClasses} overflow-visible`}
            style={containerStyles}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Box className="w-3 h-3" />
                  Container: {label}
                  <span className="text-xs text-gray-500">({layout})</span>
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2 min-h-[50px] border-2 border-dashed border-gray-300 rounded p-2 bg-white/50">
              {element.children?.map((child: any, index: number) => (
                <CanvasElement
                  key={child.id}
                  element={child}
                  isSelected={selectedElement?.id === child.id}
                  selectedElement={selectedElement}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  onDrop={onDrop}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                  canMoveUp={index > 0}
                  canMoveDown={index < element.children.length - 1}
                  depth={depth + 1}
                  getDefaultContent={getDefaultContent}
                />
              ))}
              {(!element.children || element.children.length === 0) && (
                <div className="text-center text-gray-400 text-sm py-4">
                  Drop widgets here or click to add content
                </div>
              )}
            </div>
          </div>
        );

      case "header":
        return (
          <div
            className={`${baseClasses} bg-blue-50 border-blue-200`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <PanelTop className="w-3 h-3" />
                  Header
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-white rounded border p-4">
              <div
                className={`flex items-center justify-between ${
                  element.content?.layout === "centered"
                    ? "justify-center"
                    : element.content?.layout === "vertical"
                    ? "flex-col items-start space-y-4"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center gap-3 ${
                    element.content?.layout === "centered" ? "order-1" : ""
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
                    {element.content?.logo?.text?.charAt(0) || "M"}
                  </div>
                  <div className="font-semibold text-gray-800">
                    {element.content?.logo?.text || "MySite"}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-4 ${
                    element.content?.layout === "centered"
                      ? "order-3"
                      : element.content?.menu?.alignment === "left"
                      ? "order-first"
                      : element.content?.menu?.alignment === "center"
                      ? "order-2 mx-auto"
                      : ""
                  }`}
                >
                  <div className="text-sm text-gray-500">Menu</div>
                  {element.content?.actionButton?.enabled && (
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                      {element.content.actionButton.text || "Button"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "footer":
        return (
          <div
            className={`${baseClasses} bg-gray-50 border-gray-200`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <PanelBottom className="w-3 h-3" />
                  Footer
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-white rounded border p-4">
              <div
                className={`${
                  element.content?.layout === "centered"
                    ? "text-center"
                    : element.content?.layout === "minimal"
                    ? "text-center text-sm"
                    : "text-left"
                }`}
              >
                {element.content?.logo?.enabled && (
                  <div className="text-sm text-gray-600 mb-2">
                    {element.content?.logo?.text || "MySite"}
                  </div>
                )}
                {element.content?.layout === "columns" && (
                  <div className="text-xs text-gray-500 mb-2">
                    Multi-column footer layout
                  </div>
                )}
                {element.content?.copyright?.enabled && (
                  <div className="text-xs text-gray-500">
                    {element.content?.copyright?.text ||
                      "© 2025 MySite. All rights reserved."}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "icon-box":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Box className="w-3 h-3" />
                  Icon Box
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {element.content?.title || "Icon Box Title"}
              </h3>
              <p className="text-sm text-gray-600">
                {element.content?.description ||
                  "Enter your description here..."}
              </p>
            </div>
          </div>
        );

      case "testimonial":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MessageCircle className="w-3 h-3" />
                  Testimonial
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-600 italic mb-3">
                "
                {element.content?.quote ||
                  "This is a testimonial quote from one of our satisfied customers."}
                "
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {(element.content?.author || "JD").charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {element.content?.author || "John Doe"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {element.content?.role || "CEO, Company"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "progress":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <BarChart2 className="w-3 h-3" />
                  Progress Bar
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {element.content?.label || "Progress Label"}
                </span>
                <span className="text-gray-600">
                  {element.content?.value || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${element.content?.value || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        );

      case "tabs":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FolderOpen className="w-3 h-3" />
                  Tabs
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="border rounded-lg">
              <div className="flex border-b">
                {element.content?.tabs?.map((tab: any, index: number) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-sm font-medium ${
                      index === 0
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab.title || `Tab ${index + 1}`}
                  </button>
                ))}
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  {element.content?.tabs?.[0]?.content || "Content for tab 1"}
                </p>
              </div>
            </div>
          </div>
        );

      case "accordion":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ChevronDown className="w-3 h-3" />
                  Accordion
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {element.content?.items?.map((item: any, index: number) => (
                <div key={index} className="border rounded-lg">
                  <button className="w-full px-4 py-3 text-left flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      {item.title || `Item ${index + 1}`}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="px-4 pb-3">
                    <p className="text-sm text-gray-600">
                      {item.content || "Content for this item"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "gallery":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <GalleryHorizontalEnd className="w-3 h-3" />
                  Gallery
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {element.content?.images?.map((image: any, index: number) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded flex items-center justify-center"
                >
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              ))}
              <div className="aspect-square bg-gray-100 rounded flex items-center justify-center border-2 border-dashed border-gray-300">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        );

      case "carousel":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <GalleryVerticalEnd className="w-3 h-3" />
                  Carousel
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                {element.content?.slides?.[0]?.image ? (
                  <img
                    src={element.content.slides[0].image}
                    alt={element.content.slides[0].title || "Slide 1"}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Add slides to carousel
                    </p>
                  </div>
                )}
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {element.content?.slides?.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === 0 ? "bg-white" : "bg-white bg-opacity-50"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        );

      case "maps":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Google Maps
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div
              className="bg-gray-100 rounded-lg flex items-center justify-center"
              style={{ height: `${element.content?.height || 400}px` }}
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  {element.content?.location || "New York, NY"}
                </p>
                <p className="text-xs text-gray-500">
                  Google Maps will be displayed here
                </p>
              </div>
            </div>
          </div>
        );

      case "soundcloud":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Music className="w-3 h-3" />
                  SoundCloud
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-orange-100 rounded-lg p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-orange-800 mb-1">
                  SoundCloud Player
                </div>
                <div className="text-sm text-orange-600">
                  {element.content?.url || "Add SoundCloud URL to embed player"}
                </div>
              </div>
            </div>
          </div>
        );

      case "menu":
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Menu className="w-3 h-3" />
                  Menu
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="flex gap-4">
                <div className="text-sm text-gray-600">Menu</div>
                {element.content?.actionButton?.enabled && (
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                    {element.content.actionButton.text || "Button"}
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case "twentytwenty":
        return (
          <TwentyTwentySlider
            element={element}
            isSelected={isSelected}
            selectedElement={selectedElement}
            onSelect={onSelect}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
            depth={depth}
          />
        );

      case "before-after-carousel":
        return (
          <BeforeAfterCarousel
            element={element}
            isSelected={isSelected}
            selectedElement={selectedElement}
            onSelect={onSelect}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
            depth={depth}
          />
        );

      default:
        return (
          <div
            className={baseClasses}
            onClick={handleClick}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-3 h-3" />
                </div>
                <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Box className="w-3 h-3" />
                  {element.type}
                </div>
              </div>
              {isSelected && (
                <div className="flex gap-1">
                  {canMoveUp && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveUp?.(element)}
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                  )}
                  {canMoveDown && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveDown?.(element)}
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDuplicate(element)}
                    title="Duplicate"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEditClick}
                    title="Edit"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(element.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">Widget content</div>
          </div>
        );
    }
  };

  return (
    <div
      ref={elementRef}
      className="relative group"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ marginLeft: `${depth * 20}px` }}
    >
      {renderElementContent()}

      {/* Drop zone indicators */}
      {isDropTarget && (
        <>
          {position === "before" && (
            <div className="absolute top-0 left-0 right-0 h-2 bg-blue-500 rounded-t"></div>
          )}
          {position === "after" && (
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-500 rounded-b"></div>
          )}
          {position === "inside" && (
            <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-lg bg-blue-50 bg-opacity-50"></div>
          )}
        </>
      )}
    </div>
  );
}
