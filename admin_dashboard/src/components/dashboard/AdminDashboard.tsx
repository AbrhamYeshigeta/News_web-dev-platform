import React, { useState, useMemo } from "react";
import { Article } from "./data/articles";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  BarChart2,
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  FileText,
  ArrowDown,
  Sparkles,
  RefreshCw,
  X,
  Eye,
  Shield,
  DollarSign,
  CloudLightning,
  Copy,
  Check,
  Briefcase,
  PlusCircle,
  FileCheck,
  Layers,
  Image as ImageIcon,
  Folder,
  UserCheck,
  HardDrive,
  UploadCloud,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNewsStore, useUserStore, useUiStore } from "./store";

// Preset sample photo categories for easy selection
const CATEGORY_IMAGE_PRESETS = [
  {
    label: "ስፖርት (Sports)",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
  },
  {
    label: "ቴክኖሎጂ (Tech)",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  },
  {
    label: "ቢዝነስ (Business)",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    label: "ዓለም-አቀፍ (World)",
    url: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&q=80&w=800",
  },
  {
    label: "ጤና (Health)",
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
  },
];

const CATEGORIES = [
  "ስፖርት",
  "ዓለም-አቀፍ",
  "ቢዝነስ",
  "ቴክኖሎጂ",
  "ጤና",
  "ሳይንስ",
  "መዝናኛ",
  "ኢኮኖሚ",
  "ባህል",
  "ፖለቲካ",
];

interface Comment {
  id: string;
  articleId: string;
  articleTitle: string;
  author: string;
  content: string;
  date: string;
  status: "PENDING" | "APPROVED" | "FLAGGED";
}

interface Employee {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "JOURNALIST";
  avatarUrl: string;
  articlesCount: number;
  status: "ACTIVE" | "ON_LEAVE" | "SUSPENDED";
  joinedDate: string;
}

interface SponsorCampaign {
  id: string;
  sponsorName: string;
  bannerUrl: string;
  targetCategory: string;
  clicks: number;
  views: number;
  budget: number;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
  endDate: string;
}

interface MediaAsset {
  id: string;
  name: string;
  url: string;
  fileSize: string;
  category: string;
  dimensions: string;
}

interface AdminDashboardProps {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  onClose: () => void;
}

export default function AdminDashboard({
  articles: propArticles,
  setArticles: propSetArticles,
  onClose,
}: AdminDashboardProps) {
  // Bind directly to Zustand
  const { articlesList: globalArticles, setArticlesList: globalSetArticles } =
    useNewsStore();
  const { user, setUser } = useUserStore();
  const {
    setIsAdminView,
    adminTab: activeTab,
    setAdminTab: setActiveTab,
  } = useUiStore();

  const articles = globalArticles || propArticles;
  const setArticles = (newVal: any) => {
    globalSetArticles(newVal);
    if (propSetArticles) {
      propSetArticles(newVal);
    }
  };

  // Local Admin Dashboard states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<
    "ALL" | "PUBLISHED" | "DRAFT"
  >("ALL");
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  // Bulk Operations State
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);
  const [bulkCategoryTarget, setBulkCategoryTarget] = useState("");

  // Modals controller
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  // Custom Media Upload status simulation
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // Editing state
  const [editingArticle, setEditingArticle] = useState<
    (Article & { status?: "PUBLISHED" | "DRAFT" }) | null
  >(null);

  // Form input bindings
  const [formTitle, setFormTitle] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formCategory, setFormCategory] = useState("ስፖርት");
  const [formAuthor, setFormAuthor] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formReadTime, setFormReadTime] = useState("5 ደቂቃ በፊት");
  const [formStatus, setFormStatus] = useState<"PUBLISHED" | "DRAFT">(
    "PUBLISHED",
  );

  // Employee Form bindings
  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empRole, setEmpRole] = useState<"ADMIN" | "EDITOR" | "JOURNALIST">(
    "JOURNALIST",
  );
  const [empAvatar, setEmpAvatar] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  );

  // Sponsor Form bindings
  const [sponName, setSponName] = useState("");
  const [sponCategory, setSponCategory] = useState("ስፖርት");
  const [sponBanner, setSponBanner] = useState(
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
  );
  const [sponBudget, setSponBudget] = useState(250);

  // Role switching controller for simple live simulation & testing
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Stateful list of Employees
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "emp-1",
      name: "አብርሃም አይኑ",
      email: "abrhamaynu@gmail.com",
      role: "ADMIN",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      articlesCount: 14,
      status: "ACTIVE",
      joinedDate: "ግንቦት 12, 2017",
    },
    {
      id: "emp-2",
      name: "ብስራት ገብሬ",
      email: "bisrat.gebre@newsflow.et",
      role: "EDITOR",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      articlesCount: 22,
      status: "ACTIVE",
      joinedDate: "ጥቅምት 05, 2018",
    },
    {
      id: "emp-3",
      name: "ዘውዱ በቀለ",
      email: "zewdu.bekele@newsflow.et",
      role: "JOURNALIST",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      articlesCount: 9,
      status: "ACTIVE",
      joinedDate: "መስከረም 21, 2018",
    },
    {
      id: "emp-4",
      name: "ቃልኪዳን ተስፋዬ",
      email: "kalkidan.tesfaye@newsflow.et",
      role: "JOURNALIST",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      articlesCount: 6,
      status: "ON_LEAVE",
      joinedDate: "ታኅሣሥ 15, 2018",
    },
  ]);

  // Stateful list of Ad campaigns
  const [sponsors, setSponsors] = useState<SponsorCampaign[]>([
    {
      id: "sp-1",
      sponsorName: "ኢትዮ ቴሌኮም (Ethio Telecom)",
      bannerUrl:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      targetCategory: "ቴክኖሎጂ",
      clicks: 2341,
      views: 24900,
      budget: 1200,
      status: "ACTIVE",
      endDate: "ሐምሌ 30, 2018",
    },
    {
      id: "sp-2",
      sponsorName: "የኢትዮጵያ ንግድ ባንክ (CBE)",
      bannerUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      targetCategory: "ቢዝነስ",
      clicks: 1821,
      views: 19400,
      budget: 950,
      status: "ACTIVE",
      endDate: "ሰኔ 15, 2018",
    },
    {
      id: "sp-3",
      sponsorName: "አዋሽ ባንክ (Awash Bank)",
      bannerUrl:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
      targetCategory: "ኢኮኖሚ",
      clicks: 140,
      views: 1530,
      budget: 500,
      status: "PAUSED",
      endDate: "ነሐሴ 10, 2018",
    },
  ]);

  // Stateful Media Library images list
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([
    {
      id: "m-1",
      name: "Sports Stadium Pitch",
      url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
      fileSize: "1.2 MB",
      category: "ስፖርት",
      dimensions: "1920x1080",
    },
    {
      id: "m-2",
      name: "Modern Microchips Tech",
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      fileSize: "840 KB",
      category: "ቴክኖሎጂ",
      dimensions: "1200x800",
    },
    {
      id: "m-3",
      name: "Financial Graph Trends",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      fileSize: "420 KB",
      category: "ቢዝነስ",
      dimensions: "1000x650",
    },
    {
      id: "m-4",
      name: "World map globe connection",
      url: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&q=80&w=800",
      fileSize: "1.8 MB",
      category: "ዓለም-አቀፍ",
      dimensions: "1920x1200",
    },
    {
      id: "m-5",
      name: "Stethoscope Medicine Lab",
      url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
      fileSize: "650 KB",
      category: "ጤና",
      dimensions: "1280x720",
    },
  ]);

  // Simulated Comments State
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      articleId: "1",
      articleTitle: "አፕል በ iOS 19 ውስጥ አብዮታዊ የ AI ባህሪያትን ይፋ አደረገ",
      author: "ብስራት ገብሬ",
      content: "ይህ ባህሪ በጣም የሚገርም ነው! በመላው አገሪቱ መቼ እንደሚለቀቅ ለማወቅ ጓጉቻለሁ።",
      date: "3 ሰዓታት በፊት",
      status: "PENDING",
    },
    {
      id: "c2",
      articleId: "1",
      articleTitle: "አፕል በ iOS 19 ውስጥ አብዮታዊ የ AI ባህሪያትን ይፋ አደረገ",
      author: "ዮናታን ኃይሉ",
      content: "የግላዊነት ጉዳዮች እንዴት እንደሚፈቱ መታየት አለበት።",
      date: "4 ሰዓታት በፊት",
      status: "APPROVED",
    },
    {
      id: "c3",
      articleId: "6",
      articleTitle: "ያልተጠበቀው ቡድን ለሻምፒዮናው ፍፃሜ አለፈ",
      author: "ዘውዱ በቀለ",
      content: "ይገባቸዋል! አስደናቂ ታሪክ እና ትጋት ነው ያሳዩት።",
      date: "5 ሰዓታት በፊት",
      status: "APPROVED",
    },
    {
      id: "c4",
      articleId: "3",
      articleTitle: "የዋጋ ግሽበት የመቀዝቀዝ ምልክቶች በማሳየቱ የአለም ገበያዎች ተነቃቅተዋል",
      author: "ቃልኪዳን ተስፋዬ",
      content: "ስፓም አስተያየት እባካችሁ አጥፉት። crypto free link here",
      date: "1 ሰዓት በፊት",
      status: "FLAGGED",
    },
    {
      id: "c5",
      articleId: "15",
      articleTitle: "የኢትዮጵያ አትሌቶች በአለም አቀፉ የማራቶን ውድድር አዲስ የድል ታሪክ ጻፉ",
      author: "ሳሙኤል አበራ",
      content: "ለመላው ሕዝባችን ትልቅ ኩራት ነው። እንኳን ደስ አለን!",
      date: "6 ሰዓታት በፊት",
      status: "PENDING",
    },
  ]);

  // Role based authorizations checklist
  const currentRole = user?.role || "ADMIN";

  // Computed Stats
  const stats = useMemo(() => {
    const totalArticles = articles.length;
    const totalComments = comments.length;

    const catCounts: { [key: string]: number } = {};
    articles.forEach((a) => {
      catCounts[a.category] = (catCounts[a.category] || 0) + 1;
    });

    let topCategory = "ስፖርት";
    let maxCount = 0;
    Object.entries(catCounts).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = cat;
      }
    });

    const activeSponsorSpending = sponsors
      .filter((s) => s.status === "ACTIVE")
      .reduce((sum, s) => sum + s.clicks * 0.15 + s.views * 0.005, 0);

    return {
      totalArticles,
      totalComments,
      topCategory,
      totalViewsSimulated: totalArticles * 1830,
      monthlyRevenue: Math.round(5200 + activeSponsorSpending),
      engagementRate: "8.4%",
    };
  }, [articles, comments, sponsors]);

  // Filtered Articles with status filter support
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "ALL" || a.category === selectedCategory;

      const statusField = (a as any).status || "PUBLISHED";
      const matchesStatus =
        selectedStatusFilter === "ALL" || statusField === selectedStatusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [articles, searchQuery, selectedCategory, selectedStatusFilter]);

  // Bulk Operations Handlers
  const toggleSelectArticle = (id: string) => {
    setSelectedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAllArticles = () => {
    if (selectedArticleIds.length === filteredArticles.length) {
      setSelectedArticleIds([]);
    } else {
      setSelectedArticleIds(filteredArticles.map((a) => a.id));
    }
  };

  const handleBulkPublish = () => {
    if (selectedArticleIds.length === 0) return;
    setArticles((prevList: any[]) =>
      prevList.map((a) =>
        selectedArticleIds.includes(a.id) ? { ...a, status: "PUBLISHED" } : a,
      ),
    );
    setSelectedArticleIds([]);
    alert(
      `የተመረጡት ${selectedArticleIds.length} ዜናዎች በተሳካ ሁኔታ ይፋዊ (PUBLISHED) ተደርገዋል።`,
    );
  };

  const handleBulkDraft = () => {
    if (selectedArticleIds.length === 0) return;
    setArticles((prevList: any[]) =>
      prevList.map((a) =>
        selectedArticleIds.includes(a.id) ? { ...a, status: "DRAFT" } : a,
      ),
    );
    setSelectedArticleIds([]);
    alert(`የተመረጡት ${selectedArticleIds.length} ዜናዎች ወደ ረቂቅነት (DRAFT) ተመልሰዋል።`);
  };

  const handleBulkDelete = () => {
    if (selectedArticleIds.length === 0) return;
    if (
      confirm(`እርግጠኛ ነዎት የተመረጡትን ${selectedArticleIds.length} ዜናዎች ማጥፋት ይፈልጋሉ?`)
    ) {
      setArticles((prevList: any[]) =>
        prevList.filter((a) => !selectedArticleIds.includes(a.id)),
      );
      setSelectedArticleIds([]);
    }
  };

  const handleBulkCategorize = () => {
    if (selectedArticleIds.length === 0 || !bulkCategoryTarget) return;
    setArticles((prevList: any[]) =>
      prevList.map((a) =>
        selectedArticleIds.includes(a.id)
          ? { ...a, category: bulkCategoryTarget }
          : a,
      ),
    );
    setSelectedArticleIds([]);
    setBulkCategoryTarget("");
    alert(`የተመረጡት ዜናዎች ወደ ምድብ "${bulkCategoryTarget}" ተዛውረዋል።`);
  };

  // Create & Edit Modal setup
  const handleOpenCreateModal = () => {
    setEditingArticle(null);
    setFormTitle("");
    setFormExcerpt("");
    setFormCategory("ስፖርት");
    setFormAuthor(user?.name || "አብርሃም አይኑ");
    setFormImageUrl(CATEGORY_IMAGE_PRESETS[0].url);
    setFormReadTime("5 ደቂቃ በፊት");
    setFormStatus("PUBLISHED");
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (article: Article) => {
    setEditingArticle(article);
    setFormTitle(article.title);
    setFormExcerpt(article.excerpt);
    setFormCategory(article.category);
    setFormAuthor(article.author);
    setFormImageUrl(article.imageUrl);
    setFormReadTime(article.readTime || "5 ደቂቃ በፊት");
    setFormStatus((article as any).status || "PUBLISHED");
    setIsFormOpen(true);
  };

  // Mock Text Formatting tags append tool
  const handleAppendFormat = (tag: string) => {
    if (tag === "bold") setFormExcerpt((prev) => prev + " **ደማቅ ጽሑፍ** ");
    if (tag === "italic") setFormExcerpt((prev) => prev + " *ያጋደለ ጽሑፍ* ");
    if (tag === "quote")
      setFormExcerpt((prev) => prev + '\n> "ይህ የተጠቀሰ የአንባቢ ድምፅ ነው"\n');
    if (tag === "header")
      setFormExcerpt((prev) => prev + "\n### ንዑስ ርዕስ እዚህ ያስገቡ\n");
    if (tag === "link")
      setFormExcerpt((prev) => prev + " [የመረጃ ሊንክ](https://google.com) ");
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formExcerpt || !formAuthor || !formImageUrl) {
      alert("እባክዎ ሁሉንም አስፈላጊ መረጃዎች በትክክል ይሙሉ!");
      return;
    }

    if (editingArticle) {
      // Update existing
      setArticles((prev: any[]) =>
        prev.map((a) =>
          a.id === editingArticle.id
            ? {
                ...a,
                title: formTitle,
                excerpt: formExcerpt,
                category: formCategory,
                author: formAuthor,
                imageUrl: formImageUrl,
                readTime: formReadTime,
                status: formStatus,
                slug:
                  formTitle
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "") || `news-${a.id}`,
              }
            : a,
        ),
      );
    } else {
      // Add new
      const newId = String(
        Math.max(...articles.map((a) => Number(a.id) || 0)) + 1,
      );
      const newArticle: Article = {
        id: newId,
        title: formTitle,
        excerpt: formExcerpt,
        category: formCategory,
        imageUrl: formImageUrl,
        author: formAuthor,
        date: "አሁን",
        slug:
          formTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "") || `news-${newId}`,
        readTime: formReadTime,
        commentsCount: 0,
      };
      (newArticle as any).status = formStatus;

      setArticles((prev: any[]) => [newArticle, ...prev]);
    }

    setIsFormOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("እርግጠኛ ነዎት ይህንን ዜና መሰረዝ ይፈልጋሉ?")) {
      setArticles((prev: any[]) => prev.filter((a) => a.id !== id));
    }
  };

  // Comments Actions
  const handleApproveComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "APPROVED" } : c)),
    );
  };

  const handleFlagComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "FLAGGED" } : c)),
    );
  };

  const handleDeleteComment = (id: string) => {
    if (confirm("ይህን አስተያየት መሰረዝ ይፈልጋሉ?")) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Simulated Media Library cloudUpload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateFileUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateFileUpload(e.target.files[0].name);
    }
  };

  const simulateFileUpload = (fileName: string) => {
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const randomSeed = Math.floor(Math.random() * 100);
            const newAsset: MediaAsset = {
              id: `m-${Date.now()}`,
              name: fileName.split(".")[0] || "Uploaded Asset",
              url: `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800`,
              fileSize: `${(Math.random() * 1.5 + 0.2).toFixed(1)} MB`,
              category: "ማህደር",
              dimensions: "1024x768",
            };
            setMediaAssets((prevAssets) => [newAsset, ...prevAssets]);
            setIsUploading(false);
            setUploadProgress(0);
            alert(`"${fileName}" በCloudinary አስተማማኝ አገልጋይ ላይ በስኬት ተጭኗል!`);
          }, 350);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  // Copy Image Link helpers
  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  // Stateful Employee Hiring Action
  const handleHireEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName || !empEmail) return;

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      name: empName,
      email: empEmail,
      role: empRole,
      avatarUrl: empAvatar,
      articlesCount: 0,
      status: "ACTIVE",
      joinedDate: "Today",
    };

    setEmployees((prev) => [...prev, newEmp]);
    setIsEmployeeModalOpen(false);
    setEmpName("");
    setEmpEmail("");
    alert(`New team member "${empName}" has been hired as ${empRole}!`);
  };

  const handleFireEmployee = (id: string, name: string) => {
    if (confirm(`Are you sure you want to dismiss ${name}?`)) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const handleChangeEmployeeStatus = (
    id: string,
    nextStatus: "ACTIVE" | "ON_LEAVE" | "SUSPENDED",
  ) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: nextStatus } : emp)),
    );
  };

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponName || !sponBanner) return;

    const newSpon: SponsorCampaign = {
      id: `sp-${Date.now()}`,
      sponsorName: sponName,
      bannerUrl: sponBanner,
      targetCategory: sponCategory,
      clicks: 0,
      views: 0,
      budget: sponBudget,
      status: "ACTIVE",
      endDate: "July 30, 2025",
    };

    setSponsors((prev) => [newSpon, ...prev]);
    setIsSponsorModalOpen(false);
    setSponName("");
    alert(`Ad campaign for "${sponName}" has been launched!`);
  };

  const handleToggleSponsorStatus = (
    id: string,
    currentStatus: "ACTIVE" | "COMPLETED" | "PAUSED",
  ) => {
    const next: "ACTIVE" | "PAUSED" =
      currentStatus === "ACTIVE" ? "PAUSED" : "ACTIVE";
    setSponsors((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: next } : s)),
    );
  };

  // Helper values for active views simulation
  const chartData = [
    { day: "Mon", views: 3100, comments: 140, revenue: 120 },
    { day: "Tue", views: 4200, comments: 210, revenue: 154 },
    { day: "Wed", views: 3600, comments: 180, revenue: 138 },
    { day: "Thu", views: 5900, comments: 390, revenue: 221 },
    { day: "Fri", views: 5100, comments: 280, revenue: 194 },
    { day: "Sat", views: 7200, comments: 420, revenue: 295 },
    { day: "Sun", views: 8100, comments: 510, revenue: 320 },
  ];

  const maxViews = Math.max(...chartData.map((d) => d.views));

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-accent-blue selection:text-white"
      id="admin-dashboard-root"
    >
      {/* Admin Top Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-900 bg-slate-900/95 backdrop-blur-md px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-accent-green" />
            <h1 className="text-sm font-black tracking-tight text-white uppercase italic">
              NEWSFLOW <span className="text-accent-blue">ADMIN</span>
            </h1>
          </div>
        </div>

        {/* User profile & interactive role switching */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-left text-xs font-bold text-slate-200 hover:border-slate-600 transition-all cursor-pointer select-none"
            >
              <Shield className="w-3.5 h-3.5 text-accent-blue" />
              <div className="hidden sm:block">
                <span className="text-[10px] block text-slate-500 font-black uppercase truncate tracking-widest">
                  {user?.role || "ADMIN"} PORTAL
                </span>
                <span className="truncate max-w-[100px] block -mt-0.5">
                  {user?.name || "Member"}
                </span>
              </div>
              <ArrowDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <>
                <div
                  onClick={() => setIsRoleDropdownOpen(false)}
                  className="fixed inset-0 z-30"
                />
                <div className="absolute right-0 mt-2.5 w-52 rounded-2xl bg-slate-900 border border-slate-800/90 shadow-2xl p-2 z-40 text-xs font-bold space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-500 tracking-wider px-3.5 py-2 border-b border-slate-800">
                    Switch Role
                  </p>

                  <button
                    onClick={() => {
                      setUser({
                        name: "አብርሃም አይኑ",
                        email: "abrhamaynu@gmail.com",
                        role: "ADMIN",
                      });
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-left ${user?.role === "ADMIN" ? "text-accent-blue" : "text-slate-300"}`}
                  >
                    <span>👑 Admin</span>
                    {user?.role === "ADMIN" && (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setUser({
                        name: "ብስራት ገብሬ",
                        email: "bisrat.gebre@newsflow.et",
                        role: "EDITOR",
                      });
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-left ${user?.role === "EDITOR" ? "text-accent-blue" : "text-slate-300"}`}
                  >
                    <span>📝 Editor</span>
                    {user?.role === "EDITOR" && (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setUser({
                        name: "ዘውዱ በቀለ",
                        email: "zewdu.bekele@newsflow.et",
                        role: "JOURNALIST",
                      });
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-left ${user?.role === "JOURNALIST" ? "text-accent-blue" : "text-slate-300"}`}
                  >
                    <span>✍️ Journalist</span>
                    {user?.role === "JOURNALIST" && (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue hover:bg-accent-blue/90 text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-accent-blue/10 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">New Article</span>
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-1.5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
            Navigation
          </p>

          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left border ${
              activeTab === "overview"
                ? "bg-accent-blue/10 text-accent-blue border-accent-blue/30 shadow-md"
                : "hover:bg-slate-900 border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Overview & Analytics
          </button>

          <button
            onClick={() => setActiveTab("articles")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left border ${
              activeTab === "articles"
                ? "bg-accent-blue/10 text-accent-blue border-accent-blue/30 shadow-md"
                : "hover:bg-slate-900 border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Articles ({articles.length})
          </button>

          <button
            onClick={() => setActiveTab("comments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left border ${
              activeTab === "comments"
                ? "bg-accent-blue/10 text-accent-blue border-accent-blue/30 shadow-md"
                : "hover:bg-slate-900 border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Comments ({comments.length})
          </button>

          <button
            onClick={() => setActiveTab("employees" as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left border ${
              (activeTab as any) === "employees"
                ? "bg-accent-blue/10 text-accent-blue border-accent-blue/30 shadow-md"
                : "hover:bg-slate-900 border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Team ({employees.length})
          </button>

          <button
            onClick={() => setActiveTab("sponsors" as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left border ${
              (activeTab as any) === "sponsors"
                ? "bg-accent-blue/10 text-accent-blue border-accent-blue/30 shadow-md"
                : "hover:bg-slate-900 border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Ad Campaigns ({sponsors.length})
          </button>

          <button
            onClick={() => setActiveTab("media" as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left border ${
              (activeTab as any) === "media"
                ? "bg-accent-blue/10 text-accent-blue border-accent-blue/30 shadow-md"
                : "hover:bg-slate-900 border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <HardDrive className="w-4 h-4" />
            Media Library
          </button>
        </aside>

        {/* Dashboard Content Container */}
        <main className="lg:col-span-9 space-y-8 min-w-0">
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Stat Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-2 group hover:border-accent-blue/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Total Articles
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-800 text-accent-blue">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white font-mono">
                      {stats.totalArticles}
                    </h3>
                    <p className="text-[10.5px] font-bold text-accent-green flex items-center gap-1 mt-1 uppercase">
                      <TrendingUp className="w-3.5 h-3.5" /> +2 in recent hours
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-2 group hover:border-accent-green/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Total Views
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-800 text-accent-green">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white font-mono">
                      {stats.totalViewsSimulated}
                    </h3>
                    <p className="text-[10.5px] font-bold text-accent-green flex items-center gap-1 mt-1 uppercase">
                      <TrendingUp className="w-3.5 h-3.5" /> +15.2% from last
                      week
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-2 group hover:border-accent-blue/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Monthly Revenue ($)
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-800 text-accent-blue">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white font-mono">
                      ${stats.monthlyRevenue}
                    </h3>
                    <p className="text-[10.5px] font-bold text-accent-green flex items-center gap-1 mt-1 uppercase">
                      <TrendingUp className="w-3.5 h-3.5" /> +18.5% incl. ad
                      revenue
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-2 group hover:border-accent-green/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Top Category
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-800 text-accent-green">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white italic uppercase tracking-wider">
                      {stats.topCategory}
                    </h3>
                    <p className="text-[10.5px] font-bold text-slate-400 mt-1.5 uppercase">
                      Most engaged readers
                    </p>
                  </div>
                </div>
              </div>

              {/* Analytics Chart Block */}
              <div className="bg-slate-900 border border-slate-800/85 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-black text-white uppercase italic">
                      Weekly Traffic Statistics
                    </h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">
                      Views & engagement trend (Live)
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-slate-800 border border-slate-700 font-mono text-[10px] text-accent-blue rounded-lg">
                    LIVE UDP
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="h-64 w-full bg-slate-950/40 rounded-2xl relative border border-slate-800/50 p-4 pt-10 flex flex-col justify-between">
                    {/* Grid Lines */}
                    <div className="absolute inset-x-0 top-1/4 border-t border-slate-900/40 border-dashed" />
                    <div className="absolute inset-x-0 top-2/4 border-t border-slate-900/40 border-dashed" />
                    <div className="absolute inset-x-0 top-3/4 border-t border-slate-900/40 border-dashed" />

                    {/* Bar Representation */}
                    <div className="h-44 flex items-end justify-between px-4 lg:px-8 relative z-10">
                      {chartData.map((data, idx) => {
                        const percentHeight = (data.views / maxViews) * 100;
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center gap-1 group/bar w-[11%]"
                          >
                            <div
                              className="w-full relative rounded-t bg-gradient-to-t from-accent-blue/40 to-accent-blue hover:to-accent-green hover:from-accent-green/40 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer animate-pulse"
                              style={{ height: `${percentHeight}%` }}
                            >
                              <div className="w-full h-full bg-white/10" />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 mt-2 font-mono">
                              {data.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Pending Comments Quick Moderation */}
              <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white uppercase italic">
                    Pending Reader Comments
                  </h3>
                  <button
                    onClick={() => setActiveTab("comments")}
                    className="text-[10px] font-black text-accent-blue uppercase tracking-widest hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3.5">
                  {comments
                    .filter((c) => c.status === "PENDING")
                    .slice(0, 3)
                    .map((comment) => (
                      <div
                        key={comment.id}
                        className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-200">
                              {comment.author}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono font-bold">
                              {comment.date}
                            </span>
                            <span className="text-[9px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                              PENDING
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed font-semibold italic">
                            "{comment.content}"
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveComment(comment.id)}
                            className="px-3 py-1.5 rounded-lg bg-accent-green text-slate-950 hover:bg-accent-green/90 transition-all text-[10px] font-black uppercase tracking-wider"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleFlagComment(comment.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/25 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-black uppercase tracking-wider transition-all"
                          >
                            Flag
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES MANAGEMENT */}
          {activeTab === "articles" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Filter controls */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex flex-1 items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 w-full md:w-auto">
                  <Search className="w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-xs text-slate-200 focus:outline-none w-full font-bold placeholder-slate-600"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-950 text-xs text-slate-300 font-bold uppercase px-3 py-2 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Categories</option>
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedStatusFilter}
                    onChange={(e) =>
                      setSelectedStatusFilter(e.target.value as any)
                    }
                    className="bg-slate-950 text-xs text-slate-300 font-bold uppercase px-3 py-2 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>

                  <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue text-xs font-black uppercase text-white hover:bg-accent-blue/90 font-bold tracking-widest"
                  >
                    <Plus className="w-4 h-4" /> New Article
                  </button>
                </div>
              </div>

              {/* Floating Bulk Operational Panel when checked */}
              {selectedArticleIds.length > 0 && (
                <div className="bg-slate-900 border-2 border-accent-blue/50 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse"></span>
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      {selectedArticleIds.length} articles selected — Bulk
                      Actions
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleBulkPublish}
                      className="px-3.5 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      Publish
                    </button>
                    <button
                      onClick={handleBulkDraft}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      Set as Draft
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      className="px-3.5 py-1.5 rounded-xl bg-red-650 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      Delete
                    </button>

                    <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
                      <select
                        value={bulkCategoryTarget}
                        onChange={(e) => setBulkCategoryTarget(e.target.value)}
                        className="bg-slate-950 text-[10px] text-slate-300 font-bold uppercase p-1.5 rounded-lg border border-slate-800"
                      >
                        <option value="">Change category...</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleBulkCategorize}
                        disabled={!bulkCategoryTarget}
                        className="p-1 px-2 text-[10px] bg-accent-blue text-white font-black uppercase tracking-widest rounded-lg disabled:opacity-40"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Articles Data Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="py-4 px-6 text-center w-12">
                          <input
                            type="checkbox"
                            checked={
                              filteredArticles.length > 0 &&
                              selectedArticleIds.length ===
                                filteredArticles.length
                            }
                            onChange={toggleSelectAllArticles}
                            className="rounded accent-accent-blue cursor-pointer"
                          />
                        </th>
                        <th className="py-4 px-6">Title & Info</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Author</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-xs">
                      {filteredArticles.map((article) => {
                        const articleStatus =
                          (article as any).status || "PUBLISHED";
                        const isSelected = selectedArticleIds.includes(
                          article.id,
                        );
                        return (
                          <tr
                            key={article.id}
                            className={`hover:bg-slate-900/60 transition-colors ${isSelected ? "bg-accent-blue/5" : ""}`}
                          >
                            <td className="py-4 px-6 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectArticle(article.id)}
                                className="rounded accent-accent-blue cursor-pointer"
                              />
                            </td>
                            <td className="py-4 px-6 max-w-sm">
                              <div className="flex items-center gap-3">
                                <img
                                  src={article.imageUrl}
                                  aria-hidden
                                  alt=""
                                  className="w-12 h-12 object-cover rounded-lg border border-slate-805"
                                />
                                <div className="space-y-0.5">
                                  <h4 className="font-extrabold text-slate-100 line-clamp-1 group-hover:text-accent-blue transition-colors">
                                    {article.title}
                                  </h4>
                                  <p className="text-[10px] text-slate-400 line-clamp-1">
                                    {article.excerpt}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                                {article.category}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-slate-300 font-bold">
                              {article.author}
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  articleStatus === "PUBLISHED"
                                    ? "bg-accent-green/10 text-accent-green"
                                    : "bg-slate-700/30 text-slate-400"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${articleStatus === "PUBLISHED" ? "bg-accent-green" : "bg-slate-500"}`}
                                />
                                {articleStatus}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditModal(article)}
                                  className="p-1 px-2.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-500 transition-all text-[10px] uppercase font-black"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteArticle(article.id)
                                  }
                                  className="p-1 px-2.5 rounded-lg bg-red-450/10 hover:bg-red-450 text-red-400 hover:text-white transition-all text-[10px] uppercase font-black"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredArticles.length === 0 && (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-12 text-center text-slate-500 font-bold uppercase"
                          >
                            No articles found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMMENTS MANAGEMENT */}
          {activeTab === "comments" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white uppercase italic">
                    Comment Moderation Center
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                    Approve, flag or delete reader comments
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      comment.status === "PENDING"
                        ? "bg-slate-900 border-amber-600/30 shadow-lg shadow-amber-900/5"
                        : comment.status === "FLAGGED"
                          ? "bg-slate-900 border-red-900/40 opacity-70"
                          : "bg-slate-900/60 border-slate-800"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xs font-black text-slate-200">
                            {comment.author}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono font-bold">
                            {comment.date}
                          </span>
                          <span className="text-[10px] text-accent-blue font-bold tracking-wider max-w-[200px] truncate">
                            On: "{comment.articleTitle}"
                          </span>

                          <span
                            className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                              comment.status === "APPROVED"
                                ? "bg-accent-green/10 text-accent-green"
                                : comment.status === "FLAGGED"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-amber-400/15 text-amber-400"
                            }`}
                          >
                            {comment.status === "APPROVED"
                              ? "Approved"
                              : comment.status === "FLAGGED"
                                ? "Flagged"
                                : "Pending"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-semibold italic">
                          "{comment.content}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {comment.status !== "APPROVED" && (
                          <button
                            onClick={() => handleApproveComment(comment.id)}
                            className="px-3 py-1.5 rounded-lg bg-accent-green text-slate-950 hover:bg-accent-green/90 transition-all text-[10px] font-black uppercase tracking-wider"
                          >
                            Approve
                          </button>
                        )}
                        {comment.status !== "FLAGGED" && (
                          <button
                            onClick={() => handleFlagComment(comment.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:text-white hover:bg-red-500 text-[10px] font-black uppercase tracking-wider transition-all"
                          >
                            Flag
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-1.5 rounded-lg border border-slate-800 text-slate-500 hover:text-red-400 transition-all"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EMPLOYEES MANAGEMENT */}
          {(activeTab as any) === "employees" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white uppercase italic">
                    Journalists & Editors
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                    Manage team status, permissions and roles
                  </p>
                </div>
                <button
                  onClick={() => setIsEmployeeModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950 bg-accent-green hover:bg-accent-green/90 rounded-xl"
                >
                  <PlusCircle className="w-4 h-4" /> Hire Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatarUrl}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <h4 className="text-xs font-black text-white">
                            {emp.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-mono italic">
                            {emp.email}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          emp.role === "ADMIN"
                            ? "bg-accent-blue/10 text-accent-blue"
                            : emp.role === "EDITOR"
                              ? "bg-accent-green/10 text-accent-green"
                              : "bg-slate-850 text-slate-400"
                        }`}
                      >
                        {emp.role}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800 text-[10px] font-bold text-slate-400 uppercase">
                      <div>
                        <span className="block text-slate-600 text-[8px] font-black">
                          Articles
                        </span>
                        <span className="font-mono text-white text-xs">
                          {emp.articlesCount} written
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-600 text-[8px] font-black">
                          Joined
                        </span>
                        <span className="text-white text-[10px]">
                          {emp.joinedDate}
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-600 text-[8px] font-black">
                          Status
                        </span>
                        <span
                          className={`font-black ${emp.status === "ACTIVE" ? "text-accent-green" : "text-amber-400"}`}
                        >
                          {emp.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            handleChangeEmployeeStatus(emp.id, "ACTIVE")
                          }
                          className="px-2 py-1 text-[9px] border border-slate-800 rounded-md text-slate-400 hover:text-white font-bold uppercase transition-all"
                        >
                          Set Active
                        </button>
                        <button
                          onClick={() =>
                            handleChangeEmployeeStatus(emp.id, "ON_LEAVE")
                          }
                          className="px-2 py-1 text-[9px] border border-slate-800 rounded-md text-slate-450 hover:text-amber-400 font-bold uppercase transition-all"
                        >
                          ፈቃድ On Leave
                        </button>
                      </div>

                      <button
                        onClick={() => handleFireEmployee(emp.id, emp.name)}
                        className="px-2.5 py-1 rounded bg-red-650/15 text-red-400 hover:bg-red-600 hover:text-white text-[9px] font-black uppercase tracking-wider"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SPONSORS & CAMPAIGNS */}
          {(activeTab as any) === "sponsors" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white uppercase italic">
                    Ad Campaigns
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                    Manage sponsor banner ads
                  </p>
                </div>
                <button
                  onClick={() => setIsSponsorModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950 bg-accent-green hover:bg-accent-green/90 rounded-xl"
                >
                  <PlusCircle className="w-4 h-4" /> New Campaign
                </button>
              </div>

              <div className="space-y-4">
                {sponsors.map((campaign) => {
                  const estSpending =
                    campaign.clicks * 0.15 + campaign.views * 0.005;
                  return (
                    <div
                      key={campaign.id}
                      className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex flex-1 items-start gap-4">
                        <img
                          src={campaign.bannerUrl}
                          alt=""
                          className="w-24 h-16 object-cover rounded-xl border border-slate-700"
                        />
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">
                            {campaign.sponsorName}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">
                            Target:{" "}
                            <span className="text-accent-blue">
                              {campaign.targetCategory}
                            </span>{" "}
                            | Ends:{" "}
                            <span className="text-amber-400">
                              {campaign.endDate}
                            </span>
                          </p>
                          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 pt-1">
                            <span>
                              Views:{" "}
                              <b className="text-white">{campaign.views}</b>
                            </span>
                            <span>
                              Clicks:{" "}
                              <b className="text-white">{campaign.clicks}</b>
                            </span>
                            <span>
                              Budget:{" "}
                              <b className="text-accent-green">
                                ${campaign.budget}
                              </b>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-[8px] font-black uppercase text-slate-500">
                            የተጠቀመው በጀት
                          </p>
                          <p className="text-sm font-black text-accent-green font-mono">
                            ${estSpending.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                          <button
                            onClick={() =>
                              handleToggleSponsorStatus(
                                campaign.id,
                                campaign.status,
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                              campaign.status === "ACTIVE"
                                ? "bg-amber-400/10 text-amber-400 hover:bg-amber-400 hover:text-slate-950"
                                : "bg-accent-green/10 text-accent-green hover:bg-accent-green hover:text-slate-950"
                            }`}
                          >
                            {campaign.status === "ACTIVE" ? "አቁም" : "ቀጥል"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: MEDIA ARCHIVE (LIBRARY) */}
          {(activeTab as any) === "media" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-accent-blue" />{" "}
                  Cloudinary የፋይል መጫኛ
                </h3>

                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-accent-blue bg-accent-blue/10 scale-[0.99]"
                      : "border-slate-800 hover:border-slate-650 bg-slate-950/20"
                  }`}
                >
                  <input
                    type="file"
                    id="cloudinary-upload-input"
                    multiple={false}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="cloudinary-upload-input"
                    className="cursor-pointer space-y-3.5 block"
                  >
                    <div className="mx-auto w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-slate-850">
                      <ImageIcon className="w-6 h-6 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white uppercase">
                        የምስል ፋይል እዚህ ይጎትቱ ወይም ይጫኑ
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold mt-1.5 uppercase">
                        የፋይል መጠኑ ከ 10MB መብለጥ የለበትም።
                      </p>
                    </div>
                  </label>
                </div>

                {isUploading && (
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400">
                      <span>ፋይል በመጫን ላይ (Cloudinary Server)...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-accent-blue h-full transition-all duration-150"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Media Grid representation */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {mediaAssets.map((asset) => {
                  const isCopied = copiedUrlId === asset.id;
                  return (
                    <div
                      key={asset.id}
                      className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl aspect-square flex flex-col justify-end"
                    >
                      <img
                        src={asset.url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-100 group-hover:via-slate-950/20" />

                      <div className="relative p-3.5 space-y-1.5 z-10">
                        <span className="inline-block px-1.5 py-0.5 bg-accent-blue/20 text-accent-blue text-[8px] font-black uppercase tracking-wider rounded-md">
                          {asset.category}
                        </span>
                        <h4 className="text-[11px] font-black text-white truncate">
                          {asset.name}
                        </h4>

                        <div className="flex items-center justify-between gap-2 text-[9px] font-mono text-slate-400 pt-1">
                          <span>{asset.dimensions}</span>
                          <span>{asset.fileSize}</span>
                        </div>

                        <button
                          onClick={() => handleCopyLink(asset.url, asset.id)}
                          className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-950/80 text-[10px] font-black uppercase text-slate-250 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-accent-green" />
                              <span className="text-accent-green">
                                ኮፒ ተደርጓል!
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-accent-blue" />
                              <span>ሊንክ ቅዳ (Copy Link)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER COOPERATIVE SYSTEM DEPORTATION */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-auto">
        የNewsFlow የመጣጥፍና የድርጅታዊ አስተዳደር ረዳት። © {new Date().getFullYear()} ሁሉም
        መብቶች የተጠበቁ ናቸው።
      </footer>

      {/* FORM MODAL AREA: CREATE / EDIT ARTICLES */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-805 flex items-center justify-between bg-slate-950/60">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-accent-blue" />
                  <h3 className="text-sm font-black text-white uppercase italic">
                    {editingArticle
                      ? "የዜና መጣጥፍ ማስተካከያ (Edit Article)"
                      : "አዲስ የዜና መጣጥፍ ማዘጋጃ (New Article)"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 px-2.5 rounded bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✖
                </button>
              </div>

              {/* Scrollable Form Body */}
              <form
                onSubmit={handleSaveArticle}
                className="p-6 space-y-5 overflow-y-auto flex-1 text-slate-300"
              >
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    የዜና ርዕስ (Article Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="አጭርና ግልጽ የሆነ ርዕስ እዚህ ያስገቡ..."
                    className="w-full bg-slate-950 rounded-xl border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-blue font-bold placeholder-slate-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      የዜና ምድብ (Category) *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-slate-950 rounded-xl border border-slate-800 px-4 py-2.5 text-xs text-slate-300 font-bold focus:outline-none cursor-pointer"
                    >
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      ሁኔታ (Publish Status)
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="w-full bg-slate-950 rounded-xl border border-slate-800 px-4 py-2.5 text-xs text-slate-300 font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="PUBLISHED">
                        ወዲያው ፖስት ይሁን (PUBLISHED)
                      </option>
                      <option value="DRAFT">እንደ ረቂቅ ይቆይ (DRAFT)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      ጸሐፊ (Author Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      placeholder="የጸሐፊው ስም..."
                      className="w-full bg-slate-950 rounded-xl border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none font-bold placeholder-slate-705"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      የሚያስፈልገው ሰዓት (Read Time)
                    </label>
                    <input
                      type="text"
                      value={formReadTime}
                      onChange={(e) => setFormReadTime(e.target.value)}
                      placeholder="ለምሳሌ: 5 ደቂቃ በፊት ወይም 8 ደቂቃ ንባብ..."
                      className="w-full bg-slate-950 rounded-xl border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none font-bold placeholder-slate-705"
                    />
                  </div>
                </div>

                {/* Cover Image Input Preset option picker */}
                <div className="space-y-2 border border-slate-805 bg-slate-950/40 p-4 rounded-2xl">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    የሽፋን ምስል መለያ (Article Image URL) *
                  </label>
                  <input
                    type="url"
                    required
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/your-photo-path..."
                    className="w-full bg-slate-950 rounded-xl border border-slate-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-blue font-mono text-[10px]"
                  />

                  {/* Preset picker list */}
                  <div className="space-y-1 pt-1.5">
                    <p className="text-[8px] font-black uppercase text-slate-550">
                      ምሳሌ ምስሎች (Presets)
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORY_IMAGE_PRESETS.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setFormImageUrl(preset.url)}
                          className="px-2 py-1 text-[9px] border border-slate-800 bg-slate-900 rounded hover:border-slate-500 font-bold uppercase transition-all flex items-center gap-1"
                        >
                          <ImageIcon className="w-3 h-3 text-accent-blue" />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Markdown text editor helper buttons */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      የዜናው ይዘትና ዝርዝር መግለጫ (Excerpt / Markdown Text) *
                    </label>

                    {/* formatting bar */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleAppendFormat("bold")}
                        className="p-1 px-1.5 text-[9px] bg-slate-950 rounded border border-slate-800 hover:border-slate-600 font-black"
                        title="Bold text"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAppendFormat("italic")}
                        className="p-1 px-1.5 text-[9px] bg-slate-950 rounded border border-slate-800 hover:border-slate-600 italic font-black"
                        title="Italic text"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAppendFormat("header")}
                        className="p-1 px-1.5 text-[9px] bg-slate-950 rounded border border-slate-800 hover:border-slate-600 font-bold"
                        title="Insert Subtitle"
                      >
                        H
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAppendFormat("quote")}
                        className="p-1 px-1.5 text-[9px] bg-slate-950 rounded border border-slate-800 hover:border-slate-600 font-mono"
                        title="Insert Quote"
                      >
                        ”
                      </button>
                    </div>
                  </div>

                  <textarea
                    required
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    rows={8}
                    placeholder="ጥልቅ የሆነውን የዜና ይዘት እዚህ ይጻፉ። ጽሁፉ Markdown ለመፃፍ የተመቸ ነው..."
                    className="w-full bg-slate-950 rounded-2xl border border-slate-800 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent-blue leading-relaxed font-semibold placeholder-slate-705"
                  />
                </div>

                <div className="pt-4 border-t border-slate-805 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-black uppercase hover:bg-slate-800 transition-all text-slate-400"
                  >
                    ሰርዝ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-accent-blue text-xs font-black uppercase text-white hover:bg-accent-blue/90 transition-all shadow-lg"
                  >
                    {editingArticle ? "ለውጦችን መዝግብ" : "ሁሉንም መዝግብ (Publish)"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL AREA 2: EMPLOYEE RECRUITMENT */}
      <AnimatePresence>
        {isEmployeeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEmployeeModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-slate-300"
            >
              <div className="flex items-center justify-between border-b border-slate-805 pb-3">
                <h3 className="text-sm font-black text-white uppercase italic">
                  አዲስ የስራ ባልደረባ መቅጠሪያ (Hire Member)
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
                  className="text-sm font-bold"
                >
                  ✖
                </button>
              </div>

              <form onSubmit={handleHireEmployee} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    ሙሉ ስም (Full Name)
                  </label>
                  <input
                    type="text"
                    required
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                    placeholder="አስቴር ከበደ..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    ኢሜይል አድራሻ (Email Address)
                  </label>
                  <input
                    type="email"
                    required
                    value={empEmail}
                    onChange={(e) => setEmpEmail(e.target.value)}
                    placeholder="aster.kebede@newsflow.et..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    የትከሻ ማዕረግ (Employee Role)
                  </label>
                  <select
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none"
                  >
                    <option value="JOURNALIST">ጋዜጠኛ (JOURNALIST)</option>
                    <option value="EDITOR">ዋና አዘጋጅ (EDITOR)</option>
                    <option value="ADMIN">ጠቅላላ መሪ (ADMIN)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    የፎቶ መለያ (Avatar Presets)
                  </label>
                  <select
                    value={empAvatar}
                    onChange={(e) => setEmpAvatar(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none"
                  >
                    <option value="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200">
                      Female Professional (Unsplash)
                    </option>
                    <option value="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200">
                      Male Journalist (Unsplash)
                    </option>
                    <option value="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200">
                      Creative Editor (Unsplash)
                    </option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsEmployeeModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-black uppercase text-slate-300 rounded-xl"
                  >
                    ሰርዝ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent-blue hover:bg-accent-blue/90 text-xs font-black uppercase text-white rounded-xl"
                  >
                    ስራ ቅጥር ፈጽም
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL AREA 3: SPONSOR LAUNCH */}
      <AnimatePresence>
        {isSponsorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSponsorModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-slate-300"
            >
              <div className="flex items-center justify-between border-b border-slate-805 pb-3">
                <h3 className="text-sm font-black text-white uppercase italic">
                  አዲስ የ Ad ዘመቻ ጀምር (Start Campaign)
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSponsorModalOpen(false)}
                  className="text-sm font-bold"
                >
                  ✖
                </button>
              </div>

              <form onSubmit={handleLaunchCampaign} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    ማህበር/ድርጅት ስም (Sponsor name)
                  </label>
                  <input
                    type="text"
                    required
                    value={sponName}
                    onChange={(e) => setSponName(e.target.value)}
                    placeholder="ለምሳሌ: ዳሽን ባንክ (Dashen Bank)..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    ሰንደቅ ምስል (Banner image url preset)
                  </label>
                  <select
                    value={sponBanner}
                    onChange={(e) => setSponBanner(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none"
                  >
                    <option value="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800">
                      Telecom Tech Banner (Unsplash)
                    </option>
                    <option value="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800">
                      Financial Business Banner (Unsplash)
                    </option>
                    <option value="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800">
                      Active Sports Arena (Unsplash)
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      ታለመ ምድብ (Target category)
                    </label>
                    <select
                      value={sponCategory}
                      onChange={(e) => setSponCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 font-mono">
                      ጠቅላላ በጀት (Budget $)
                    </label>
                    <input
                      type="number"
                      required
                      value={sponBudget}
                      onChange={(e) => setSponBudget(Number(e.target.value))}
                      placeholder="500"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsSponsorModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-black uppercase text-slate-300 rounded-xl"
                  >
                    ሰርዝ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent-blue hover:bg-accent-blue/90 text-xs font-black uppercase text-white rounded-xl"
                  >
                    ዘመቻ ጀምር
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
