"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Settings,
  Layout,
  Type,
  Image as ImageIcon,
  Video,
  Square,
  Star,
  Divide,
  Map,
  Shapes,
  Box,
  Grid,
  List,
  MessageSquare,
  BarChart,
  Music,
  Code,
  Anchor,
  TriangleAlert,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Monitor,
  Tablet,
  Smartphone,
  Undo,
  Redo,
  Save,
  Eye,
  Menu,
  Trash2,
  Copy,
  Layers,
  Search,
  Minus,
  // Enhanced icons
  FolderOpen,
  FileText,
  Image as ImageIcon2,
  Film,
  MousePointer,
  GripVertical,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  FolderTree,
  History,
  LayoutTemplate,
  Palette,
  SlidersHorizontal,
  Smartphone as Smartphone2,
  Tablet as Tablet2,
  Monitor as Monitor2,
  Columns,
  Rows,
  Grid3X3,
  GalleryHorizontalEnd,
  GalleryVerticalEnd,
  Sparkles,
  Wand2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link as Link2,
  Maximize,
  Move,
  RotateCcw,
  EyeOff,
  Lock,
  Unlock,
  Zap,
  File,
  Folder,
  Archive,
  Download,
  Upload,
  Share2,
  Heart,
  Star as Star2,
  Flag,
  Tag,
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Users,
  Building,
  Home,
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  Gift,
  Bell,
  MessageCircle,
  Send,
  Paperclip,
  FileImage,
  FileVideo,
  FileMusic,
  FileCode,
  FileArchive,
  FileText as FileText2,
  FileSpreadsheet,
  FilePresentation,
  FileQuestion,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Lightbulb,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart2,
  PieChart,
  Activity,
  Zap as Zap2,
  Shield,
  Key,
  Fingerprint,
  Wifi,
  Bluetooth,
  Battery,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video as Video2,
  VideoOff,
  Camera,
  CameraOff,
  Image as ImageIcon3,
  ImageOff,
  Music as Music2,
  MusicOff,
  Radio,
  RadioOff,
  Disc,
  Disc3,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume1,
  Volume3,
  Headphones,
  Speaker,
  Maximize2,
  Minimize2,
  RotateCw,
  RotateCcw2,
  Move3D,
  MoveHorizontal,
  MoveVertical,
  MoveDiagonal,
  MoveDiagonal2,
  Expand,
  Compress,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowDownLeft,
  ChevronUp,
  ChevronDown2,
  ChevronLeft,
  ChevronRight2,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronFirst,
  ChevronLast,
  CornerUpLeft,
  CornerUpRight,
  CornerDownLeft,
  CornerDownRight,
  Triangle,
  Triangle2,
  Circle,
  Square2,
  Pentagon,
  Hexagon,
  Octagon,
  Circle2,
  CircleDot,
  CircleSlash,
  CircleDashed,
  CircleCheck,
  CircleX,
  CirclePlus,
  CircleMinus,
  CircleDivide,
  Slash,
  Minus2,
  Plus2,
  X,
  Divide2,
  Hash,
  DollarSign,
  PoundSterling,
  Euro,
  Yen,
  Rupee,
  Yen2,
  Lira,
  Ruble,
  Bitcoin,
  Ethereum,
  Litecoin,
  Monero,
  Tether,
  BinanceCoin,
  Solana,
  Polkadot,
  Dogecoin,
  ShibaInu,
  Aave,
  Chainlink,
  Uniswap,
  Polygon,
  Cosmos,
  Cardano,
  Ripple,
  Stellar,
  Tron,
  VeChain,
  Theta,
  Filecoin,
  InternetComputer,
  Avalanche,
  Near,
  Algorand,
  Flow,
  Tezos,
  Elrond,
  Hedera,
  Harmony,
  Helium,
  TheGraph,
  Chain,
  Link3,
  Unlink,
  Link2 as Link4,
  Link2Off,
  Paperclip2,
  PaperclipOff,
  Scissors,
  Scissors2,
  Copy2,
  Copy3,
  Copy4,
  Copy5,
  Copy6,
  Copy7,
  Copy8,
  Copy9,
  Copy10,
  Copy11,
  Copy12,
  Copy13,
  Copy14,
  Copy15,
  Copy16,
  Copy17,
  Copy18,
  Copy19,
  Copy20,
  Copy21,
  Copy22,
  Copy23,
  Copy24,
  Copy25,
  Copy26,
  Copy27,
  Copy28,
  Copy29,
  Copy30,
  Copy31,
  Copy32,
  Copy33,
  Copy34,
  Copy35,
  Copy36,
  Copy37,
  Copy38,
  Copy39,
  Copy40,
  Copy41,
  Copy42,
  Copy43,
  Copy44,
  Copy45,
  Copy46,
  Copy47,
  Copy48,
  Copy49,
  Copy50,
  Copy51,
  Copy52,
  Copy53,
  Copy54,
  Copy55,
  Copy56,
  Copy57,
  Copy58,
  Copy59,
  Copy60,
  Copy61,
  Copy62,
  Copy63,
  Copy64,
  Copy65,
  Copy66,
  Copy67,
  Copy68,
  Copy69,
  Copy70,
  Copy71,
  Copy72,
  Copy73,
  Copy74,
  Copy75,
  Copy76,
  Copy77,
  Copy78,
  Copy79,
  Copy80,
  Copy81,
  Copy82,
  Copy83,
  Copy84,
  Copy85,
  Copy86,
  Copy87,
  Copy88,
  Copy89,
  Copy90,
  Copy91,
  Copy92,
  Copy93,
  Copy94,
  Copy95,
  Copy96,
  Copy97,
  Copy98,
  Copy99,
  Copy100,
  // New slider icons
  ZoomIn,
  Frame,
} from "lucide-react";
import { DragDropProvider } from "@/components/page-builder/drag-drop-context";
import {
  HistoryProvider,
  useHistory,
} from "@/components/page-builder/history-manager";
import { WidgetItem } from "@/components/page-builder/widget-item";
import { CanvasElement } from "@/components/page-builder/canvas-element";
import { NavigatorElement } from "@/components/page-builder/navigator-element";
import { ContentEditor } from "@/components/page-builder/content-editor";
import { StyleEditor } from "@/components/page-builder/style-editor";
import { ResponsiveEditor } from "@/components/page-builder/responsive-editor";
import { GlobalSettingsPanel } from "@/components/page-builder/global-settings-panel";
import { GlobalSmoothScroll } from "@/components/page-builder/global-smooth-scroll";
import { PageManager } from "@/components/page-builder/page-manager";
import { MenuBuilder } from "@/components/page-builder/menu-builder";
import { AppNavigation } from "@/components/app-navigation";
import { TwentyTwentySlider } from "@/components/page-builder/widgets/twentytwenty-slider";
import { BeforeAfterCarousel } from "@/components/page-builder/widgets/before-after-carousel";

interface Widget {
  id: string;
  type: string;
  name: string;
  icon: React.ReactNode;
  category: string;
}

interface PageElement {
  id: string;
  type: string;
  content: any;
  style: any;
  children: PageElement[];
  parent?: PageElement;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  path: string;
  template: string;
  status: "published" | "draft" | "private";
  isHome: boolean;
  isLanding: boolean;
  is404: boolean;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  createdAt: string;
  updatedAt: string;
  elements: PageElement[];
}

interface Menu {
  id: string;
  name: string;
  description: string;
  location: "header" | "footer" | "custom";
  items: any[];
  createdAt: string;
  updatedAt: string;
}

interface GlobalSettings {
  siteTitle: string;
  siteDescription: string;
  theme: "light" | "dark" | "auto";
  maxWidth: "sm" | "md" | "lg" | "xl" | "full";
  showGrid: boolean;
  autoSave: boolean;
}

const widgets: Widget[] = [
  // Layout Structure Widgets
  {
    id: "section",
    type: "section",
    name: "Section",
    icon: <LayoutTemplate className="w-4 h-4" />,
    category: "layout",
  },
  {
    id: "column",
    type: "column",
    name: "Column",
    icon: <Columns className="w-4 h-4" />,
    category: "layout",
  },
  {
    id: "container",
    type: "container",
    name: "Container",
    icon: <Box className="w-4 h-4" />,
    category: "layout",
  },
  {
    id: "grid",
    type: "grid",
    name: "Grid",
    icon: <Grid3X3 className="w-4 h-4" />,
    category: "layout",
  },
  {
    id: "header",
    type: "header",
    name: "Header",
    icon: <PanelTop className="w-4 h-4" />,
    category: "layout",
  },
  {
    id: "footer",
    type: "footer",
    name: "Footer",
    icon: <PanelBottom className="w-4 h-4" />,
    category: "layout",
  },

  // Basic Content Widgets
  {
    id: "heading",
    type: "heading",
    name: "Heading",
    icon: <Type className="w-4 h-4" />,
    category: "basic",
  },
  {
    id: "text",
    type: "text",
    name: "Text Editor",
    icon: <FileText className="w-4 h-4" />,
    category: "basic",
  },
  {
    id: "image",
    type: "image",
    name: "Image",
    icon: <ImageIcon className="w-4 h-4" />,
    category: "basic",
  },
  {
    id: "video",
    type: "video",
    name: "Video",
    icon: <Film className="w-4 h-4" />,
    category: "basic",
  },
  {
    id: "button",
    type: "button",
    name: "Button",
    icon: <MousePointer className="w-4 h-4" />,
    category: "basic",
  },
  {
    id: "divider",
    type: "divider",
    name: "Divider",
    icon: <Divide className="w-4 h-4" />,
    category: "basic",
  },
  {
    id: "spacer",
    type: "spacer",
    name: "Spacer",
    icon: <Minimize2 className="w-4 h-4" />,
    category: "basic",
  },
  {
    id: "icon",
    type: "icon",
    name: "Icon",
    icon: <Sparkles className="w-4 h-4" />,
    category: "basic",
  },
  {
    id: "alert",
    type: "alert",
    name: "Alert",
    icon: <AlertTriangle className="w-4 h-4" />,
    category: "basic",
  },

  // Content Widgets
  {
    id: "icon-box",
    type: "icon-box",
    name: "Icon Box",
    icon: <Box className="w-4 h-4" />,
    category: "content",
  },
  {
    id: "testimonial",
    type: "testimonial",
    name: "Testimonial",
    icon: <MessageCircle className="w-4 h-4" />,
    category: "content",
  },
  {
    id: "progress",
    type: "progress",
    name: "Progress Bar",
    icon: <BarChart2 className="w-4 h-4" />,
    category: "content",
  },
  {
    id: "tabs",
    type: "tabs",
    name: "Tabs",
    icon: <FolderOpen className="w-4 h-4" />,
    category: "content",
  },
  {
    id: "accordion",
    type: "accordion",
    name: "Accordion",
    icon: <ChevronDown className="w-4 h-4" />,
    category: "content",
  },
  {
    id: "toggle",
    type: "toggle",
    name: "Toggle",
    icon: <ChevronRight className="w-4 h-4" />,
    category: "content",
  },

  // Media Widgets
  {
    id: "gallery",
    type: "gallery",
    name: "Gallery",
    icon: <GalleryHorizontalEnd className="w-4 h-4" />,
    category: "media",
  },
  {
    id: "carousel",
    type: "carousel",
    name: "Carousel",
    icon: <GalleryVerticalEnd className="w-4 h-4" />,
    category: "media",
  },
  {
    id: "maps",
    type: "maps",
    name: "Google Maps",
    icon: <MapPin className="w-4 h-4" />,
    category: "media",
  },
  {
    id: "soundcloud",
    type: "soundcloud",
    name: "SoundCloud",
    icon: <Music className="w-4 h-4" />,
    category: "media",
  },
  {
    id: "twentytwenty",
    type: "twentytwenty",
    name: "TwentyTwenty Slider",
    icon: <ZoomIn className="w-4 h-4" />,
    category: "media",
  },
  {
    id: "before-after-carousel",
    type: "before-after-carousel",
    name: "Before/After Carousel",
    icon: <Frame className="w-4 h-4" />,
    category: "media",
  },

  // Advanced Widgets
  {
    id: "html",
    type: "html",
    name: "HTML",
    icon: <Code className="w-4 h-4" />,
    category: "advanced",
  },
  {
    id: "shortcode",
    type: "shortcode",
    name: "Shortcode",
    icon: <Tag className="w-4 h-4" />,
    category: "advanced",
  },
  {
    id: "menu-anchor",
    type: "menu-anchor",
    name: "Menu Anchor",
    icon: <Anchor className="w-4 h-4" />,
    category: "advanced",
  },
  {
    id: "menu",
    type: "menu",
    name: "Menu",
    icon: <Menu className="w-4 h-4" />,
    category: "advanced",
  },
];

const categories = ["layout", "basic", "content", "media", "advanced"];

function getDefaultContent(type: string): any {
  switch (type) {
    case "section":
      return {
        layout: "boxed", // boxed, full-width, full-screen
        label: "Section",
        height: "auto",
        minHeight: "100px",
        background: {
          type: "color",
          color: "#ffff",
          gradient: {
            type: "linear",
            direction: "180deg",
            colors: ["#f8fafc", "#f1f5f9"],
          },
          image: {
            url: "",
            size: "cover",
            position: "center",
            repeat: "no-repeat",
          },
        },
        padding: { top: 40, right: 20, bottom: 40, left: 20, linked: true },
        margin: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
        border: {
          style: "none",
          color: "#e5e7eb",
          width: 1,
          radius: 0,
        },
        responsive: {
          desktop: { visible: true },
          tablet: { visible: true },
          mobile: { visible: true },
        },
      };
    case "column":
      return {
        width: "100%",
        spacing: 20,
        background: {
          type: "color",
          color: "transparent",
        },
        padding: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
        margin: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
        border: {
          style: "none",
          color: "#e5e7eb",
          width: 1,
          radius: 0,
        },
        responsive: {
          desktop: { visible: true, width: "100%" },
          tablet: { visible: true, width: "100%" },
          mobile: { visible: true, width: "100%" },
        },
      };
    case "heading":
      return { text: "Heading Text", level: "h2", alignment: "left" };
    case "text":
      return {
        text: "This is a text paragraph. Click to edit the content.",
        alignment: "left",
      };
    case "button":
      return {
        text: "Button Text",
        url: "",
        target: "_self",
        style: "primary",
        fullWidth: false,
        alignment: "left",
      };
    case "image":
      return {
        url: "",
        alt: "",
        width: "",
        height: "",
        alignment: "center",
        action: "none",
      };
    case "html":
      return { html: "" };
    case "menu-anchor":
      return { anchorId: "", label: "Anchor" };
    case "divider":
      return {
        style: "solid",
        color: "#e5e7eb",
        thickness: 1,
        alignment: "center",
      };
    case "spacer":
      return { height: 50 };
    case "alert":
      return {
        type: "info",
        message: "This is an alert message.",
        dismissible: false,
      };
    case "shortcode":
      return { shortcode: "" };
    case "menu":
      return {
        menuId: "",
        menuName: "Main Menu",
        alignment: "left",
        style: "horizontal",
        dropdown: true,
      };
    case "icon-box":
      return {
        title: "Icon Box Title",
        description: "Enter your description here...",
        icon: "star",
      };
    case "testimonial":
      return {
        quote:
          "This is a testimonial quote from one of our satisfied customers.",
        author: "John Doe",
        role: "CEO, Company",
      };
    case "progress":
      return {
        value: 75,
        label: "Progress Label",
      };
    case "tabs":
      return {
        tabs: [
          { title: "Tab 1", content: "Content for tab 1" },
          { title: "Tab 2", content: "Content for tab 2" },
        ],
      };
    case "accordion":
      return {
        items: [
          { title: "Item 1", content: "Content for item 1" },
          { title: "Item 2", content: "Content for item 2" },
        ],
      };
    case "gallery":
      return {
        images: [
          { url: "", alt: "Gallery Image 1" },
          { url: "", alt: "Gallery Image 2" },
        ],
      };
    case "carousel":
      return {
        slides: [
          { title: "Slide 1", image: "" },
          { title: "Slide 2", image: "" },
        ],
      };
    case "maps":
      return {
        location: "New York, NY",
        height: 400,
      };
    case "soundcloud":
      return {
        url: "",
        autoPlay: false,
      };
    case "twentytwenty":
      return {
        beforeImage: "",
        afterImage: "",
        defaultPosition: 50,
        orientation: "horizontal",
        beforeLabel: "Before",
        afterLabel: "After",
      };
    case "before-after-carousel":
      return {
        items: [
          {
            id: "item-1",
            beforeImage: "",
            afterImage: "",
            title: "Before & After 1",
            description: "First comparison",
          },
          {
            id: "item-2",
            beforeImage: "",
            afterImage: "",
            title: "Before & After 2",
            description: "Second comparison",
          },
        ],
        defaultPosition: 50,
        thumbnailSize: "medium",
        autoPlay: "false",
      };
    case "toggle":
      return {
        title: "Toggle Title",
        content: "Toggle content goes here...",
        open: false,
        icon: "",
      };
    case "container":
      return {
        layout: "flex", // flex, grid, block
        label: "Container",
        width: "100%",
        maxWidth: "",
        height: "auto",
        padding: { top: 20, right: 20, bottom: 20, left: 20, linked: true },
        margin: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
        background: {
          type: "color", // color, gradient, image, video
          color: "#ffff",
          gradient: {
            type: "linear",
            direction: "180deg",
            colors: ["#ffff", "#f3f4f6"],
          },
          image: {
            url: "",
            size: "cover",
            position: "center",
            repeat: "no-repeat",
          },
        },
        border: {
          style: "none",
          color: "#e5e7eb",
          width: 1,
          radius: 0,
        },
        shadow: {
          enabled: false,
          color: "#0000",
          x: 0,
          y: 0,
          blur: 10,
          spread: 0,
        },
        flex: {
          direction: "row",
          wrap: "nowrap",
          justify: "flex-start",
          align: "stretch",
          gap: 10,
        },
        grid: {
          columns: 1,
          rows: "auto",
          gap: 0,
          template: "",
        },
        responsive: {
          desktop: { visible: true },
          tablet: { visible: true },
          mobile: { visible: true },
        },
        positioning: {
          type: "default", // default, inline, absolute, fixed
          zIndex: 1,
        },
      };
    case "header":
      return {
        layout: "horizontal", // horizontal, vertical, centered
        logo: {
          type: "text", // text, image
          text: "MySite",
          imageUrl: "",
          alt: "Logo",
        },
        menu: {
          menuId: "main-menu",
          alignment: "right",
          style: "horizontal",
          dropdown: true,
        },
        actionButton: {
          enabled: false,
          text: "Get Started",
          url: "",
          target: "_self",
          style: "primary",
        },
        sticky: false,
        background: {
          type: "color",
          color: "#ffff",
          gradient: {
            type: "linear",
            direction: "180deg",
            colors: ["#ffff", "#f8fafc"],
          },
          image: {
            url: "",
            size: "cover",
            position: "center",
            repeat: "no-repeat",
          },
        },
        padding: { top: 20, right: 40, bottom: 20, left: 40, linked: false },
        margin: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
        border: {
          style: "none",
          color: "#e5e7eb",
          width: 1,
          radius: 0,
        },
        responsive: {
          desktop: { visible: true },
          tablet: { visible: true, layout: "horizontal" },
          mobile: { visible: true, layout: "vertical" },
        },
      };
    case "footer":
      return {
        layout: "columns", // columns, centered, minimal
        columns: 4,
        logo: {
          enabled: true,
          type: "text",
          text: "MySite",
          imageUrl: "",
          alt: "Footer Logo",
        },
        sections: [
          {
            title: "About Us",
            content: "Learn more about our company and mission.",
            links: [
              { text: "Our Story", url: "/about" },
              { text: "Team", url: "/team" },
              { text: "Careers", url: "/careers" },
            ],
          },
          {
            title: "Services",
            content: "Explore our range of services.",
            links: [
              { text: "Web Design", url: "/services/web-design" },
              { text: "Development", url: "/services/development" },
              { text: "Consulting", url: "/services/consulting" },
            ],
          },
          {
            title: "Contact",
            content: "Get in touch with us.",
            links: [
              { text: "Contact Form", url: "/contact" },
              { text: "Email Us", url: "mailto:info@example.com" },
              { text: "Phone", url: "tel:+1234567890" },
            ],
          },
        ],
        socialLinks: {
          enabled: true,
          platforms: [
            { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
            { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
            { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
            {
              name: "Instagram",
              url: "https://instagram.com",
              icon: "instagram",
            },
          ],
        },
        copyright: {
          enabled: true,
          text: "© 2025 MySite. All rights reserved.",
        },
        background: {
          type: "color",
          color: "#f8fafc",
          gradient: {
            type: "linear",
            direction: "180deg",
            colors: ["#f8fafc", "#f1f5f9"],
          },
          image: {
            url: "",
            size: "cover",
            position: "center",
            repeat: "no-repeat",
          },
        },
        padding: { top: 40, right: 40, bottom: 40, left: 40, linked: true },
        margin: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
        border: {
          style: "none",
          color: "#e5e7eb",
          width: 1,
          radius: 0,
        },
        responsive: {
          desktop: { visible: true, columns: 4 },
          tablet: { visible: true, columns: 2 },
          mobile: { visible: true, columns: 1 },
        },
      };
    default:
      return {};
  }
}

interface PageBuilderContentProps {
  pageElements: PageElement[];
  setPageElements: (elements: PageElement[]) => void;
  onSave?: () => void;
  onPreview?: () => void;
}

function PageBuilderContent({
  pageElements,
  setPageElements,
  onSave,
  onPreview,
}: PageBuilderContentProps) {
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(
    null
  );
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showGlobalSettings, setShowGlobalSettings] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    siteTitle: "My Website",
    siteDescription: "Built with Page Builder",
    theme: "light",
    maxWidth: "lg",
    showGrid: false,
    autoSave: true,
  });

  // Page management state
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  // Menu management state
  const [menus, setMenus] = useState<Menu[]>([]);
  const [activeTab, setActiveTab] = useState<
    "widgets" | "navigator" | "history" | "pages" | "menus"
  >("widgets");

  const { pushState, undo, redo, canUndo, canRedo, getHistoryPanel } =
    useHistory();

  // Auto-save effect
  useEffect(() => {
    if (globalSettings.autoSave) {
      const autoSaveInterval = setInterval(() => {
        const pageData = {
          elements: pageElements,
          timestamp: new Date().toISOString(),
          version: "1.0",
        };
        localStorage.setItem("pageBuilderData", JSON.stringify(pageData));
        console.log("Auto-saved at", new Date().toLocaleTimeString());
      }, 30000); // Auto-save every 30 seconds

      return () => clearInterval(autoSaveInterval);
    }
  }, [pageElements, globalSettings.autoSave]);

  // Load saved data on mount
  useEffect(() => {
    // Load saved page data
    try {
      const savedData = localStorage.getItem("pageBuilderData");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setPageElements(parsed.elements || []);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }

    // Load global settings
    try {
      const savedSettings = localStorage.getItem("globalSettings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setGlobalSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error("Error loading global settings:", error);
    }
  }, []);

  const handleAddSection = () => {
    const newSection: PageElement = {
      id: `section-${Date.now()}`,
      type: "section",
      content: {},
      style: {},
      children: [
        {
          id: `column-${Date.now()}`,
          type: "column",
          content: {},
          style: {},
          children: [],
        },
      ],
    };
    const newElements = [...pageElements, newSection];
    setPageElements(newElements);
    pushState(newElements, "Added section");
  };

  const handleElementSelect = (element: PageElement) => {
    console.log("handleElementSelect called:", element.type, element.id);
    console.log(
      "Previous selectedElement:",
      selectedElement?.type,
      selectedElement?.id
    );
    setSelectedElement(element);
    console.log("New selectedElement set:", element.type, element.id);
  };

  const handleElementUpdate = (updatedElement: PageElement) => {
    const updateElement = (elements: PageElement[]): PageElement[] => {
      return elements.map((el) => {
        if (el.id === updatedElement.id) {
          return updatedElement;
        }
        if (el.children && el.children.length > 0) {
          return {
            ...el,
            children: updateElement(el.children),
          };
        }
        return el;
      });
    };

    const newElements = updateElement(pageElements);
    setPageElements(newElements);
    setSelectedElement(updatedElement);
    pushState(newElements, `Updated ${updatedElement.type}`);
  };

  const handleElementDelete = (elementId: string) => {
    const deleteElement = (elements: PageElement[]): PageElement[] => {
      return elements.filter((el) => {
        if (el.id === elementId) {
          return false;
        }
        if (el.children && el.children.length > 0) {
          return {
            ...el,
            children: deleteElement(el.children),
          };
        }
        return true;
      });
    };

    const newElements = deleteElement(pageElements);
    setPageElements(newElements);
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
    pushState(newElements, "Deleted element");
  };

  const handleElementDuplicate = (element: PageElement) => {
    const duplicateElement = (el: PageElement): PageElement => ({
      ...el,
      id: `${el.type}-${Date.now()}`,
      children: el.children ? el.children.map(duplicateElement) : [],
    });

    const duplicatedElement = duplicateElement(element);
    const newElements = [...pageElements, duplicatedElement];
    setPageElements(newElements);
    pushState(newElements, `Duplicated ${element.type}`);
  };

  const handleElementDrop = (
    newElement: PageElement,
    targetElement: PageElement,
    position: "before" | "after" | "inside"
  ) => {
    // Check if this is a new element or moving an existing one
    const isExistingElement = pageElements.some(
      (el) => el.id === newElement.id
    );

    if (isExistingElement) {
      // Handle element reordering
      const moveElement = (elements: PageElement[]): PageElement[] => {
        // First, remove the element from its current position
        const filteredElements = elements.filter(
          (el) => el.id !== newElement.id
        );

        // Then, insert it at the new position
        return filteredElements
          .map((el) => {
            if (el.id === targetElement.id) {
              if (position === "before") {
                return [newElement, el];
              } else if (position === "after") {
                return [el, newElement];
              } else if (
                position === "inside" &&
                (el.type === "section" ||
                  el.type === "column" ||
                  el.type === "container")
              ) {
                return {
                  ...el,
                  children: [...(el.children || []), newElement],
                };
              }
            }
            if (el.children && el.children.length > 0) {
              return {
                ...el,
                children: moveElement(el.children),
              };
            }
            return el;
          })
          .flat();
      };

      const newElements = moveElement(pageElements);
      setPageElements(newElements);
      pushState(newElements, `Moved ${newElement.type}`);
    } else {
      // Handle adding new element
      const addElement = (elements: PageElement[]): PageElement[] => {
        return elements
          .map((el) => {
            if (el.id === targetElement.id) {
              if (position === "before") {
                return [newElement, el];
              } else if (position === "after") {
                return [el, newElement];
              } else if (
                position === "inside" &&
                (el.type === "section" ||
                  el.type === "column" ||
                  el.type === "container")
              ) {
                return {
                  ...el,
                  children: [...(el.children || []), newElement],
                };
              }
            }
            if (el.children && el.children.length > 0) {
              return {
                ...el,
                children: addElement(el.children),
              };
            }
            return el;
          })
          .flat();
      };

      const newElements = addElement(pageElements);
      setPageElements(newElements);
      pushState(newElements, `Added ${newElement.type}`);
    }
  };

  const handleElementMoveUp = (element: PageElement) => {
    const findElementAndParent = (
      elements: PageElement[],
      targetId: string,
      parent?: PageElement
    ): {
      element: PageElement;
      parent: PageElement | undefined;
      index: number;
    } | null => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === targetId) {
          return { element: elements[i], parent, index: i };
        }
        if (elements[i].children && elements[i].children.length > 0) {
          const found = findElementAndParent(
            elements[i].children!,
            targetId,
            elements[i]
          );
          if (found) return found;
        }
      }
      return null;
    };

    const result = findElementAndParent(pageElements, element.id);
    if (!result) return;

    const { element: foundElement, parent, index } = result;

    if (!parent) {
      // Top-level element
      if (index > 0) {
        const newElements = [...pageElements];
        [newElements[index - 1], newElements[index]] = [
          newElements[index],
          newElements[index - 1],
        ];
        setPageElements(newElements);
        pushState(newElements, `Moved ${element.type} up`);
      }
    } else {
      // Nested element
      if (index > 0) {
        const newChildren = [...parent.children!];
        [newChildren[index - 1], newChildren[index]] = [
          newChildren[index],
          newChildren[index - 1],
        ];
        const updatedParent = { ...parent, children: newChildren };

        const updateParentInTree = (elements: PageElement[]): PageElement[] => {
          return elements.map((el) => {
            if (el.id === parent.id) {
              return updatedParent;
            }
            if (el.children && el.children.length > 0) {
              return {
                ...el,
                children: updateParentInTree(el.children),
              };
            }
            return el;
          });
        };

        const newElements = updateParentInTree(pageElements);
        setPageElements(newElements);
        pushState(newElements, `Moved ${element.type} up`);
      }
    }
  };

  const handleElementMoveDown = (element: PageElement) => {
    const findElementAndParent = (
      elements: PageElement[],
      targetId: string,
      parent?: PageElement
    ): {
      element: PageElement;
      parent: PageElement | undefined;
      index: number;
    } | null => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === targetId) {
          return { element: elements[i], parent, index: i };
        }
        if (elements[i].children && elements[i].children.length > 0) {
          const found = findElementAndParent(
            elements[i].children!,
            targetId,
            elements[i]
          );
          if (found) return found;
        }
      }
      return null;
    };

    const result = findElementAndParent(pageElements, element.id);
    if (!result) return;

    const { element: foundElement, parent, index } = result;

    if (!parent) {
      // Top-level element
      if (index < pageElements.length - 1) {
        const newElements = [...pageElements];
        [newElements[index], newElements[index + 1]] = [
          newElements[index + 1],
          newElements[index],
        ];
        setPageElements(newElements);
        pushState(newElements, `Moved ${element.type} down`);
      }
    } else {
      // Nested element
      if (index < parent.children!.length - 1) {
        const newChildren = [...parent.children!];
        [newChildren[index], newChildren[index + 1]] = [
          newChildren[index + 1],
          newChildren[index],
        ];
        const updatedParent = { ...parent, children: newChildren };

        const updateParentInTree = (elements: PageElement[]): PageElement[] => {
          return elements.map((el) => {
            if (el.id === parent.id) {
              return updatedParent;
            }
            if (el.children && el.children.length > 0) {
              return {
                ...el,
                children: updateParentInTree(el.children),
              };
            }
            return el;
          });
        };

        const newElements = updateParentInTree(pageElements);
        setPageElements(newElements);
        pushState(newElements, `Moved ${element.type} down`);
      }
    }
  };

  const canMoveElementUp = (elementId: string): boolean => {
    const findElementAndParent = (
      elements: PageElement[],
      targetId: string,
      parent?: PageElement
    ): {
      element: PageElement;
      parent: PageElement | undefined;
      index: number;
    } | null => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === targetId) {
          return { element: elements[i], parent, index: i };
        }
        if (elements[i].children && elements[i].children.length > 0) {
          const found = findElementAndParent(
            elements[i].children!,
            targetId,
            elements[i]
          );
          if (found) return found;
        }
      }
      return null;
    };

    const result = findElementAndParent(pageElements, elementId);
    if (!result) return false;

    const { parent, index } = result;

    if (!parent) {
      // Top-level element
      return index > 0;
    } else {
      // Nested element
      return index > 0;
    }
  };

  const canMoveElementDown = (elementId: string): boolean => {
    const findElementAndParent = (
      elements: PageElement[],
      targetId: string,
      parent?: PageElement
    ): {
      element: PageElement;
      parent: PageElement | undefined;
      index: number;
    } | null => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === targetId) {
          return { element: elements[i], parent, index: i };
        }
        if (elements[i].children && elements[i].children.length > 0) {
          const found = findElementAndParent(
            elements[i].children!,
            targetId,
            elements[i]
          );
          if (found) return found;
        }
      }
      return null;
    };

    const result = findElementAndParent(pageElements, elementId);
    if (!result) return false;

    const { parent, index } = result;

    if (!parent) {
      // Top-level element
      return index < pageElements.length - 1;
    } else {
      // Nested element
      return index < parent.children!.length - 1;
    }
  };

  const handleSave = () => {
    // Save the current page state to localStorage or backend
    const pageData = {
      elements: pageElements,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };

    // Save to localStorage for now
    localStorage.setItem("pageBuilderData", JSON.stringify(pageData));

    // Show success message using a more user-friendly notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    notification.textContent = "✓ Page saved successfully!";
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const handlePreview = () => {
    // Open preview in new window or modal
    const pageData = {
      elements: pageElements,
      timestamp: new Date().toISOString(),
    };

    // Save preview data to localStorage
    localStorage.setItem("pageBuilderPreview", JSON.stringify(pageData));

    // Open preview in new window
    const previewUrl = `${window.location.origin}/preview`;
    window.open(previewUrl, "_blank");
  };

  const handleSettings = () => {
    // Toggle global settings panel
    setShowGlobalSettings(!showGlobalSettings);
  };

  const handleGlobalSettingsUpdate = (newSettings: Partial<GlobalSettings>) => {
    const updatedSettings = { ...globalSettings, ...newSettings };
    setGlobalSettings(updatedSettings);

    // Save to localStorage
    localStorage.setItem("globalSettings", JSON.stringify(updatedSettings));
  };

  // Page management functions
  const handleCreatePage = (
    pageData: Omit<Page, "id" | "createdAt" | "updatedAt">
  ) => {
    const newPage: Page = {
      ...pageData,
      id: `page-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newPages = [...pages, newPage];
    setPages(newPages);

    // Auto-select the new page
    setCurrentPage(newPage);
    setPageElements(newPage.elements);

    // Save to localStorage
    localStorage.setItem("pageBuilderPages", JSON.stringify(newPages));
    console.log("Created new page:", newPage.title);
  };

  const handleUpdatePage = (pageId: string, updates: Partial<Page>) => {
    const updatedPages = pages.map((page) =>
      page.id === pageId
        ? { ...page, ...updates, updatedAt: new Date().toISOString() }
        : page
    );

    setPages(updatedPages);

    // Update current page if it's the one being edited
    if (currentPage?.id === pageId) {
      const updatedCurrentPage = updatedPages.find((p) => p.id === pageId);
      if (updatedCurrentPage) {
        setCurrentPage(updatedCurrentPage);
      }
    }

    // Save to localStorage
    localStorage.setItem("pageBuilderPages", JSON.stringify(updatedPages));
    console.log("Updated page:", pageId);
  };

  const handleDeletePage = (pageId: string) => {
    const newPages = pages.filter((page) => page.id !== pageId);
    setPages(newPages);

    // If deleting current page, switch to another page or clear
    if (currentPage?.id === pageId) {
      const nextPage = newPages[0] || null;
      setCurrentPage(nextPage);
      setPageElements(nextPage?.elements || []);
    }

    // Save to localStorage
    localStorage.setItem("pageBuilderPages", JSON.stringify(newPages));
    console.log("Deleted page:", pageId);
  };

  const handleDuplicatePage = (pageId: string) => {
    const pageToDuplicate = pages.find((p) => p.id === pageId);
    if (!pageToDuplicate) return;

    const duplicatedPage: Page = {
      ...pageToDuplicate,
      id: `page-${Date.now()}`,
      title: `${pageToDuplicate.title} (Copy)`,
      slug: `${pageToDuplicate.slug}-copy`,
      path: `${pageToDuplicate.path}-copy`,
      isHome: false,
      isLanding: false,
      is404: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newPages = [...pages, duplicatedPage];
    setPages(newPages);
    setCurrentPage(duplicatedPage);
    setPageElements(duplicatedPage.elements);

    // Save to localStorage
    localStorage.setItem("pageBuilderPages", JSON.stringify(newPages));
    console.log("Duplicated page:", duplicatedPage.title);
  };

  const handleSelectPage = (page: Page) => {
    // Save current page elements before switching
    if (currentPage) {
      const updatedPages = pages.map((p) =>
        p.id === currentPage.id
          ? {
              ...p,
              elements: pageElements,
              updatedAt: new Date().toISOString(),
            }
          : p
      );
      setPages(updatedPages);
      localStorage.setItem("pageBuilderPages", JSON.stringify(updatedPages));
    }

    // Switch to selected page
    setCurrentPage(page);
    setPageElements(page.elements);
    setSelectedElement(null);
    console.log("Switched to page:", page.title);
  };

  // Load pages on mount
  useEffect(() => {
    try {
      const savedPages = localStorage.getItem("pageBuilderPages");
      if (savedPages) {
        const parsed = JSON.parse(savedPages);
        setPages(parsed);

        // Set current page to first page or home page
        const homePage = parsed.find((p: Page) => p.isHome);
        const firstPage = parsed[0];
        const pageToLoad = homePage || firstPage;

        if (pageToLoad) {
          setCurrentPage(pageToLoad);
          setPageElements(pageToLoad.elements || []);
        }
      } else {
        // Create default home page if no pages exist
        const defaultPage: Page = {
          id: `page-${Date.now()}`,
          title: "Home",
          slug: "home",
          path: "/",
          template: "default",
          status: "published",
          isHome: true,
          isLanding: false,
          is404: false,
          meta: {
            title: "Home - My Website",
            description: "Welcome to my website built with Page Builder",
            keywords: "home, welcome, website",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          elements: [],
        };

        setPages([defaultPage]);
        setCurrentPage(defaultPage);
        setPageElements([]);
        localStorage.setItem("pageBuilderPages", JSON.stringify([defaultPage]));
      }
    } catch (error) {
      console.error("Error loading pages:", error);
    }
  }, []);

  // Auto-save current page elements when they change
  useEffect(() => {
    if (currentPage && globalSettings.autoSave) {
      const autoSaveInterval = setInterval(() => {
        const updatedPages = pages.map((p) =>
          p.id === currentPage.id
            ? {
                ...p,
                elements: pageElements,
                updatedAt: new Date().toISOString(),
              }
            : p
        );
        setPages(updatedPages);
        localStorage.setItem("pageBuilderPages", JSON.stringify(updatedPages));
        console.log("Auto-saved page elements for:", currentPage.title);
      }, 30000); // Auto-save every 30 seconds

      return () => clearInterval(autoSaveInterval);
    }
  }, [pageElements, currentPage, globalSettings.autoSave]);

  // Menu management functions
  const handleCreateMenu = (
    menuData: Omit<Menu, "id" | "createdAt" | "updatedAt">
  ) => {
    const newMenu: Menu = {
      ...menuData,
      id: `menu-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newMenus = [...menus, newMenu];
    setMenus(newMenus);

    // Save to localStorage
    localStorage.setItem("pageBuilderMenus", JSON.stringify(newMenus));
    console.log("Created new menu:", newMenu.name);
  };

  const handleUpdateMenu = (menuId: string, updates: Partial<Menu>) => {
    const updatedMenus = menus.map((menu) =>
      menu.id === menuId
        ? { ...menu, ...updates, updatedAt: new Date().toISOString() }
        : menu
    );

    setMenus(updatedMenus);

    // Save to localStorage
    localStorage.setItem("pageBuilderMenus", JSON.stringify(updatedMenus));
    console.log("Updated menu:", menuId);
  };

  const handleDeleteMenu = (menuId: string) => {
    const newMenus = menus.filter((menu) => menu.id !== menuId);
    setMenus(newMenus);

    // Save to localStorage
    localStorage.setItem("pageBuilderMenus", JSON.stringify(newMenus));
    console.log("Deleted menu:", menuId);
  };

  const handleDuplicateMenu = (menuId: string) => {
    const menuToDuplicate = menus.find((m) => m.id === menuId);
    if (!menuToDuplicate) return;

    const duplicatedMenu: Menu = {
      ...menuToDuplicate,
      id: `menu-${Date.now()}`,
      name: `${menuToDuplicate.name} (Copy)`,
      items: JSON.parse(JSON.stringify(menuToDuplicate.items)), // Deep copy items
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newMenus = [...menus, duplicatedMenu];
    setMenus(newMenus);

    // Save to localStorage
    localStorage.setItem("pageBuilderMenus", JSON.stringify(newMenus));
    console.log("Duplicated menu:", duplicatedMenu.name);
  };

  // Get available anchors from current page
  const getAvailableAnchors = () => {
    const anchors: Array<{ id: string; label: string; elementId: string }> = [];

    const findAnchors = (elements: PageElement[]) => {
      elements.forEach((element) => {
        if (element.type === "menu-anchor" && element.content?.anchorId) {
          anchors.push({
            id: `anchor-${element.id}`,
            label:
              element.content?.label || element.content?.anchorId || "Anchor",
            elementId: element.content.anchorId,
          });
        }
        if (element.children && element.children.length > 0) {
          findAnchors(element.children);
        }
      });
    };

    findAnchors(pageElements);
    return anchors;
  };

  // Load menus on mount
  useEffect(() => {
    try {
      const savedMenus = localStorage.getItem("pageBuilderMenus");
      if (savedMenus) {
        const parsed = JSON.parse(savedMenus);
        setMenus(parsed);
      } else {
        // Create default main menu if no menus exist
        const defaultMenu: Menu = {
          id: `menu-${Date.now()}`,
          name: "Main Menu",
          description: "Primary navigation menu for the website",
          location: "header",
          items: [
            {
              id: "menu-item-home",
              text: "Home",
              url: "/",
              type: "page",
              target: "_self",
              children: [],
              order: 0,
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setMenus([defaultMenu]);
        localStorage.setItem("pageBuilderMenus", JSON.stringify([defaultMenu]));
      }
    } catch (error) {
      console.error("Error loading menus:", error);
    }
  }, []);

  const filteredWidgets = widgets.filter(
    (widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Top Toolbar */}
      <div className="h-12 border-b bg-white flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />

          {/* Current Page Indicator */}
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {currentPage?.title || "No Page"}
            </span>
            {currentPage && (
              <Badge variant="outline" className="text-xs">
                {currentPage.status}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            title="Save Page"
            onClick={handleSave}
          >
            <Save className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title="Preview"
            onClick={handlePreview}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title="Settings"
            onClick={handleSettings}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={deviceView === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDeviceView("desktop")}
            title="Desktop View"
          >
            <Monitor2 className="w-4 h-4" />
          </Button>
          <Button
            variant={deviceView === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDeviceView("tablet")}
            title="Tablet View"
          >
            <Tablet2 className="w-4 h-4" />
          </Button>
          <Button
            variant={deviceView === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setDeviceView("mobile")}
            title="Mobile View"
          >
            <Smartphone2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Widgets */}
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={30}
          collapsedSize={0}
          collapsible
        >
          <div className="h-full border-r bg-gray-50 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold flex items-center gap-2">
                  <FolderTree className="w-4 h-4" />
                  Elements
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search widgets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(
                  value as
                    | "widgets"
                    | "navigator"
                    | "history"
                    | "pages"
                    | "menus"
                )
              }
            >
              <TabsList className="grid w-full grid-cols-5 m-2">
                <TabsTrigger
                  value="widgets"
                  className="text-xs flex items-center gap-1"
                >
                  <LayoutTemplate className="w-3 h-3" />
                  Widgets
                </TabsTrigger>
                <TabsTrigger
                  value="navigator"
                  className="text-xs flex items-center gap-1"
                >
                  <FolderTree className="w-3 h-3" />
                  Navigator
                </TabsTrigger>
                <TabsTrigger
                  value="pages"
                  className="text-xs flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  Pages
                </TabsTrigger>
                <TabsTrigger
                  value="menus"
                  className="text-xs flex items-center gap-1"
                >
                  <Menu className="w-3 h-3" />
                  Menus
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="text-xs flex items-center gap-1"
                >
                  <History className="w-3 h-3" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="widgets"
                className="mt-0 flex-1 overflow-hidden"
              >
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        {categories.map((category) => (
                          <TabsTrigger
                            key={category}
                            value={category}
                            className="text-xs flex items-center gap-1"
                          >
                            {category === "basic" && (
                              <LayoutTemplate className="w-3 h-3" />
                            )}
                            {category === "layout" && (
                              <Grid3X3 className="w-3 h-3" />
                            )}
                            {category === "content" && (
                              <FileText className="w-3 h-3" />
                            )}
                            {category === "media" && (
                              <GalleryHorizontalEnd className="w-3 h-3" />
                            )}
                            {category === "advanced" && (
                              <Code className="w-3 h-3" />
                            )}
                            {category.charAt(0).toUpperCase()}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {categories.map((category) => (
                        <TabsContent
                          key={category}
                          value={category}
                          className="mt-4"
                        >
                          <div className="space-y-2">
                            {filteredWidgets
                              .filter((widget) => widget.category === category)
                              .map((widget) => (
                                <WidgetItem key={widget.id} widget={widget} />
                              ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="navigator"
                className="mt-0 flex-1 overflow-hidden"
              >
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <div className="space-y-2">
                      {pageElements.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                          <FolderTree className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No elements yet</p>
                        </div>
                      ) : (
                        pageElements.map((element) => (
                          <NavigatorElement
                            key={element.id}
                            element={element}
                            isSelected={selectedElement?.id === element.id}
                            onSelect={handleElementSelect}
                            onDuplicate={handleElementDuplicate}
                            onDelete={handleElementDelete}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="pages"
                className="mt-0 flex-1 overflow-hidden"
              >
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <PageManager
                      currentPage={currentPage}
                      pages={pages}
                      onSelectPage={handleSelectPage}
                      onCreatePage={handleCreatePage}
                      onUpdatePage={handleUpdatePage}
                      onDeletePage={handleDeletePage}
                      onDuplicatePage={handleDuplicatePage}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="menus"
                className="mt-0 flex-1 overflow-hidden"
              >
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <MenuBuilder
                      menus={menus}
                      pages={pages}
                      anchors={getAvailableAnchors()}
                      onCreateMenu={handleCreateMenu}
                      onUpdateMenu={handleUpdateMenu}
                      onDeleteMenu={handleDeleteMenu}
                      onDuplicateMenu={handleDuplicateMenu}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="history"
                className="mt-0 flex-1 overflow-hidden"
              >
                <ScrollArea className="h-full">
                  <div className="p-4">{getHistoryPanel()}</div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel - Canvas */}
        <ResizablePanel defaultSize={60}>
          <div className="h-full bg-white flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4" />
                  Canvas
                </h2>
                <Button size="sm" onClick={handleAddSection}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-gray-100">
              <div
                className={`mx-auto p-8 ${
                  deviceView === "desktop"
                    ? "max-w-7xl"
                    : deviceView === "tablet"
                    ? "max-w-3xl"
                    : "max-w-md"
                }`}
              >
                <div
                  className="min-h-[800px] bg-white rounded-lg shadow-sm p-8"
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // Handle drop on empty canvas
                    if (pageElements.length === 0) {
                      const dragItemStr = e.dataTransfer.getData("text/plain");
                      if (dragItemStr) {
                        try {
                          const dragItem = JSON.parse(dragItemStr);
                          if (dragItem.type === "widget") {
                            const newElement = {
                              id: `${dragItem.data.type}-${Date.now()}`,
                              type: dragItem.data.type,
                              content: getDefaultContent(dragItem.data.type),
                              style: {},
                              children: [],
                            };
                            const newElements = [...pageElements, newElement];
                            setPageElements(newElements);
                            pushState(
                              newElements,
                              `Added ${dragItem.data.type}`
                            );
                          }
                        } catch (error) {
                          console.error("Error parsing drag data:", error);
                        }
                      }
                    }
                  }}
                >
                  {pageElements.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                      <Layout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg mb-2">Start building your page</p>
                      <p className="text-sm">
                        Drag widgets from the left panel or click "Add Section"
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pageElements.map((element, index) => (
                        <CanvasElement
                          key={element.id}
                          element={element}
                          isSelected={selectedElement?.id === element.id}
                          selectedElement={selectedElement}
                          onSelect={handleElementSelect}
                          onUpdate={handleElementUpdate}
                          onDelete={handleElementDelete}
                          onDuplicate={handleElementDuplicate}
                          onDrop={handleElementDrop}
                          onMoveUp={handleElementMoveUp}
                          onMoveDown={handleElementMoveDown}
                          canMoveUp={index > 0}
                          canMoveDown={index < pageElements.length - 1}
                          getDefaultContent={getDefaultContent}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Settings */}
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={30}
          collapsedSize={0}
          collapsible
        >
          <div className="h-full border-l bg-gray-50 flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </h2>
            </div>

            {selectedElement ? (
              <ScrollArea className="flex-1">
                <div className="p-4">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger
                        value="content"
                        className="flex items-center gap-1 text-xs"
                      >
                        <FileText className="w-3 h-3" />
                        Content
                      </TabsTrigger>
                      <TabsTrigger
                        value="style"
                        className="flex items-center gap-1 text-xs"
                      >
                        <Palette className="w-3 h-3" />
                        Style
                      </TabsTrigger>
                      <TabsTrigger
                        value="responsive"
                        className="flex items-center gap-1 text-xs"
                      >
                        <Smartphone2 className="w-3 h-3" />
                        Responsive
                      </TabsTrigger>
                      <TabsTrigger
                        value="advanced"
                        className="flex items-center gap-1 text-xs"
                      >
                        <SlidersHorizontal className="w-3 h-3" />
                        Advanced
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="mt-4">
                      <ContentEditor
                        element={selectedElement}
                        onUpdate={handleElementUpdate}
                      />
                    </TabsContent>

                    <TabsContent value="style" className="mt-4">
                      <StyleEditor
                        element={selectedElement}
                        onUpdate={handleElementUpdate}
                      />
                    </TabsContent>

                    <TabsContent value="responsive" className="mt-4">
                      <ResponsiveEditor
                        element={selectedElement}
                        currentDevice={deviceView}
                        onUpdate={handleElementUpdate}
                      />
                    </TabsContent>

                    <TabsContent value="advanced" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">
                            Advanced Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">
                              Element ID
                            </Label>
                            <div className="text-sm text-gray-600 mt-1 font-mono">
                              {selectedElement.id}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">
                              CSS Classes
                            </Label>
                            <Input
                              value={selectedElement.style?.className || ""}
                              onChange={(e) =>
                                handleElementUpdate({
                                  ...selectedElement,
                                  style: {
                                    ...selectedElement.style,
                                    className: e.target.value,
                                  },
                                })
                              }
                              className="mt-1"
                              placeholder="custom-class-1 custom-class-2"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">
                              Custom CSS
                            </Label>
                            <textarea
                              value={selectedElement.style?.customCss || ""}
                              onChange={(e) =>
                                handleElementUpdate({
                                  ...selectedElement,
                                  style: {
                                    ...selectedElement.style,
                                    customCss: e.target.value,
                                  },
                                })
                              }
                              className="mt-1 w-full p-2 border rounded text-sm font-mono"
                              rows={4}
                              placeholder="color: red;\nfont-size: 16px;"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Settings className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Select an element to edit</p>
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Global Settings Panel */}
      {showGlobalSettings && (
        <GlobalSettingsPanel
          settings={globalSettings}
          onUpdate={handleGlobalSettingsUpdate}
          onClose={() => setShowGlobalSettings(false)}
        />
      )}
    </div>
  );
}

function NavigatorElement({
  element,
  isSelected,
  onSelect,
  onDuplicate,
  onDelete,
}: {
  element: PageElement;
  isSelected: boolean;
  onSelect: (element: PageElement) => void;
  onDuplicate: (element: PageElement) => void;
  onDelete: (elementId: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [customName, setCustomName] = useState(element.content?.name || "");

  const getIcon = (type: string) => {
    switch (type) {
      case "section":
        return <LayoutTemplate className="w-3 h-3" />;
      case "column":
        return <Columns className="w-3 h-3" />;
      case "heading":
        return <Type className="w-3 h-3" />;
      case "text":
        return <FileText className="w-3 h-3" />;
      case "button":
        return <MousePointer className="w-3 h-3" />;
      case "image":
        return <ImageIcon className="w-3 h-3" />;
      case "video":
        return <Film className="w-3 h-3" />;
      case "icon":
        return <Sparkles className="w-3 h-3" />;
      case "alert":
        return <AlertTriangle className="w-3 h-3" />;
      case "divider":
        return <Divide className="w-3 h-3" />;
      case "spacer":
        return <Minimize2 className="w-3 h-3" />;
      case "container":
        return <Box className="w-3 h-3" />;
      case "grid":
        return <Grid3X3 className="w-3 h-3" />;
      case "icon-box":
        return <Box className="w-3 h-3" />;
      case "testimonial":
        return <MessageCircle className="w-3 h-3" />;
      case "progress":
        return <BarChart2 className="w-3 h-3" />;
      case "tabs":
        return <FolderOpen className="w-3 h-3" />;
      case "accordion":
        return <ChevronDown className="w-3 h-3" />;
      case "gallery":
        return <GalleryHorizontalEnd className="w-3 h-3" />;
      case "carousel":
        return <GalleryVerticalEnd className="w-3 h-3" />;
      case "maps":
        return <MapPin className="w-3 h-3" />;
      case "soundcloud":
        return <Music className="w-3 h-3" />;
      case "html":
        return <Code className="w-3 h-3" />;
      case "shortcode":
        return <Tag className="w-3 h-3" />;
      case "menu-anchor":
        return <Anchor className="w-3 h-3" />;
      default:
        return <Box className="w-3 h-3" />;
    }
  };

  const getElementName = () => {
    if (element.content?.name) {
      return element.content.name;
    }

    switch (element.type) {
      case "heading":
        return `Heading: ${
          element.content?.text?.substring(0, 20) || "No text"
        }...`;
      case "text":
        return `Text: ${
          element.content?.text?.substring(0, 20) || "No text"
        }...`;
      case "button":
        return `Button: ${element.content?.text || "No text"}`;
      case "image":
        return `Image: ${element.content?.alt || "No alt text"}`;
      default:
        return element.type.charAt(0).toUpperCase() + element.type.slice(1);
    }
  };

  const handleNameSave = () => {
    if (customName.trim()) {
      onSelect({
        ...element,
        content: {
          ...element.content,
          name: customName.trim(),
        },
      });
    }
    setIsRenaming(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSave();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
      setCustomName(element.content?.name || "");
    }
  };

  const hasChildren = element.children && element.children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-2 p-2 rounded cursor-pointer text-sm group ${
          isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
        }`}
        onClick={() => onSelect(element)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            {expanded ? "▼" : "▶"}
          </button>
        )}

        {!hasChildren && <div className="w-4 h-4"></div>}

        <div className="text-blue-500 flex-shrink-0">
          {getIcon(element.type)}
        </div>

        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <Input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={handleNameKeyDown}
              className="h-6 text-xs"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="truncate" title={getElementName()}>
              {getElementName()}
            </div>
          )}
        </div>

        {isSelected && (
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
              }}
            >
              <Type className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(element);
              }}
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(element.id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>

      {expanded && hasChildren && (
        <div className="ml-4 border-l border-gray-200 pl-2">
          {element.children.map((child) => (
            <NavigatorElement
              key={child.id}
              element={child}
              isSelected={isSelected}
              onSelect={onSelect}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PageBuilder() {
  const [pageElements, setPageElements] = useState<PageElement[]>([]);

  // Check for selected template on component mount
  useEffect(() => {
    const selectedTemplate = localStorage.getItem("selectedTemplate");
    if (selectedTemplate) {
      try {
        const template = JSON.parse(selectedTemplate);
        if (template.elements && Array.isArray(template.elements)) {
          setPageElements(template.elements);
          // Show success message
          const notification = document.createElement("div");
          notification.className =
            "fixed top-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
          notification.textContent = `✓ Template "${template.name}" loaded successfully!`;
          document.body.appendChild(notification);

          // Remove notification after 3 seconds
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 3000);
        }
        // Clear the selected template after loading
        localStorage.removeItem("selectedTemplate");
      } catch (error) {
        console.error("Error loading template:", error);
      }
    }
  }, []);

  // Handle state restore from undo/redo operations
  const handleStateRestore = useCallback((elements: PageElement[]) => {
    setPageElements(elements);
  }, []);

  // Save functionality
  const handleSave = useCallback(() => {
    const pageData = {
      elements: pageElements,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };

    // Save to localStorage
    localStorage.setItem("pageBuilderData", JSON.stringify(pageData));

    // Show success message
    alert("Page saved successfully!");
  }, [pageElements]);

  // Preview functionality
  const handlePreview = useCallback(() => {
    // Save current state first
    const pageData = {
      elements: pageElements,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };
    // Save to preview-specific key for immediate preview
    localStorage.setItem("pageBuilderPreview", JSON.stringify(pageData));

    // Open preview in new tab
    window.open("/preview", "_blank");
  }, [pageElements]);

  // Save as Template functionality
  const handleSaveAsTemplate = useCallback(() => {
    const templateName = prompt("Enter template name:");
    if (!templateName?.trim()) return;

    const templateDescription = prompt("Enter template description:") || "";

    const template = {
      id: Date.now().toString(),
      name: templateName.trim(),
      description: templateDescription,
      category: "general",
      elements: pageElements,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Get existing templates
    const existingTemplates = JSON.parse(
      localStorage.getItem("pageBuilderTemplates") || "[]"
    );
    const updatedTemplates = [...existingTemplates, template];

    // Save to localStorage
    localStorage.setItem(
      "pageBuilderTemplates",
      JSON.stringify(updatedTemplates)
    );

    // Show success message
    alert("Template saved successfully!");
  }, [pageElements]);

  return (
    <HistoryProvider onStateRestore={handleStateRestore}>
      <DragDropProvider>
        <GlobalSmoothScroll />
        <AppNavigation
          onSave={handleSave}
          onPreview={handlePreview}
          onSaveAsTemplate={handleSaveAsTemplate}
        />
        <PageBuilderContent
          pageElements={pageElements}
          setPageElements={setPageElements}
          onSave={handleSave}
          onPreview={handlePreview}
        />
      </DragDropProvider>
    </HistoryProvider>
  );
}
