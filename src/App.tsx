import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Bot,
  User,
  Settings,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Bell,
  BookOpen,
  Smartphone,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  Lock,
  Bookmark,
  ChevronRight,
  Info,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Mail,
  Zap,
  Shield,
  Clock,
  Sparkles,
  X,
  PlusCircle,
  HelpCircle,
  Grid,
  ClipboardList,
  Fingerprint,
  CreditCard,
  Vote,
  ShoppingBag,
  Car,
  Baby,
  IdCard,
  HeartPulse,
  FileText
} from "lucide-react";

import {
  INITIAL_SCHEMES,
  INITIAL_JOBS,
  INITIAL_SCHOLARSHIPS,
  SERVICES_DATA,
  INITIAL_UPDATES,
  Scheme,
  Job,
  Scholarship,
  ServiceItem,
  AppUpdate
} from "./data";

import AiAssistant from "./components/AiAssistant";
import AdminPanel from "./components/AdminPanel";

const renderOfficialLogo = (id: string) => {
  switch (id) {
    case "srv1": // Aadhaar Card
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <g transform="translate(50,52)">
            {[...Array(12)].map((_, i) => (
              <path
                key={i}
                d="M 0,-14 L 3,-40 L -3,-40 Z"
                fill="#E96A1F"
                transform={`rotate(${i * 30})`}
              />
            ))}
            <circle cx="0" cy="0" r="24" fill="#FFFBEB" stroke="#E96A1F" strokeWidth="1.5" />
            <path
              d="M -11,0 C -11,-12 11,-12 11,0 M -8,4 C -8,-6 8,-6 8,4 M -4,8 C -4,-1 4,-1 4,8 M -14,-4 C -14,-17 14,-17 14,-4"
              stroke="#1D4ED8"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );
    case "srv2": // PAN Card
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <rect x="5" y="16" width="90" height="68" rx="8" fill="url(#panColorGrad)" stroke="#1E40AF" strokeWidth="1" />
          <defs>
            <linearGradient id="panColorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>
          </defs>
          <g transform="translate(50,38) scale(0.65)" fill="#FBBF24" opacity="0.9">
            <path d="M 0,-15 Q -5,-8 -5,0 L 5,0 Q 5,-8 0,-15 Z M -7,0 L 7,0 L 5,14 L -5,14 Z" />
          </g>
          <text x="50" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" letterSpacing="0.5">INCOME TAX</text>
          <rect x="70" y="24" width="16" height="20" fill="#E2E8F0" rx="1" />
          <circle cx="78" cy="31" r="3.5" fill="#475569" />
          <path d="M 72,41 C 72,36 84,36 84,41" fill="#475569" />
        </svg>
      );
    case "srv3": // Birth Certificate
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,3" />
          <g fill="#B45309" stroke="none">
            <ellipse cx="41" cy="52" rx="4" ry="7.5" transform="rotate(-15, 41, 52)" />
            <circle cx="35" cy="40" r="1.5" />
            <circle cx="39" cy="38" r="1.3" />
            <circle cx="43" cy="39" r="1.2" />
            <circle cx="46" cy="41" r="1.1" />
            <ellipse cx="59" cy="52" rx="4" ry="7.5" transform="rotate(15, 59, 52)" />
            <circle cx="65" cy="40" r="1.5" />
            <circle cx="61" cy="38" r="1.3" />
            <circle cx="57" cy="39" r="1.2" />
            <circle cx="54" cy="41" r="1.1" />
          </g>
          <text x="50" y="90" textAnchor="middle" fill="#78350F" fontSize="7" fontWeight="bold">BIRTH</text>
        </svg>
      );
    case "srv4": // Caste Certificate
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#FDF4FF" stroke="#A21CAF" strokeWidth="2.5" />
          <g transform="translate(50,42) scale(0.7)" fill="#C084FC">
            <path d="M 0,-20 L 18,12 L -18,12 Z" />
            <polygon points="0,-10 8,10 -8,10" fill="#E879F9" />
          </g>
          <rect x="25" y="65" width="50" height="6" rx="1.5" fill="#C084FC" />
          <text x="50" y="88" textAnchor="middle" fill="#701A75" fontSize="7.5" fontWeight="bold">CASTE</text>
        </svg>
      );
    case "srv5": // Income Certificate
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#F0FDF4" stroke="#15803D" strokeWidth="2.5" />
          <rect x="26" y="24" width="48" height="40" rx="3" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2" />
          <line x1="34" y1="34" x2="66" y2="34" stroke="#16A34A" strokeWidth="2" />
          <line x1="34" y1="44" x2="66" y2="44" stroke="#16A34A" strokeWidth="2" />
          <line x1="34" y1="54" x2="54" y2="54" stroke="#16A34A" strokeWidth="2" />
          <circle cx="64" cy="54" r="5" fill="#F59E0B" />
          <text x="50" y="88" textAnchor="middle" fill="#14532D" fontSize="7.5" fontWeight="black" letterSpacing="0.2">INCOME</text>
        </svg>
      );
    case "srv6": // PAN & Aadhaar Link
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#F0FDFA" stroke="#0D9488" strokeWidth="2.5" />
          <circle cx="38" cy="46" r="14" fill="none" stroke="#E96A1F" strokeWidth="3.5" />
          <circle cx="62" cy="46" r="14" fill="none" stroke="#1E3A8A" strokeWidth="3.5" />
          <path d="M 46,55 L 54,63 L 70,47" stroke="#14B8A6" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <text x="50" y="88" textAnchor="middle" fill="#115E59" fontSize="7" fontWeight="bold">LINKING</text>
        </svg>
      );
    case "srv7": // Voter ID
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#FAFAF9" stroke="#1E3A8A" strokeWidth="2.5" />
          <path d="M 12,28 C 30,30 70,30 88,28" stroke="#EA580C" strokeWidth="3.5" fill="none" />
          <path d="M 10,48 C 30,50 70,50 90,48" stroke="#1E53A3" strokeWidth="3.5" fill="none" />
          <path d="M 12,68 C 30,70 70,70 88,68" stroke="#16A34A" strokeWidth="3.5" fill="none" />
          <g transform="translate(18, 5) scale(0.65)" stroke="#1E293B" strokeWidth="2.5" fill="#FFFFFF" strokeLinejoin="round">
            <path d="M 30,85 L 30,50 Q 30,40 40,40 Q 50,40 50,55 L 50,85 Z" />
            <path d="M 50,60 Q 60,60 60,70 L 60,85" />
            <path d="M 60,65 Q 70,65 70,75 L 70,85" />
            <path d="M 30,55 L 30,15 C 30,5 50,5 50,15 L 50,55" />
            <path d="M 40,10 L 40,28" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
          </g>
          <text x="50" y="91" textAnchor="middle" fill="#1E3A8A" fontSize="7" fontWeight="black" letterSpacing="0.2">ECI / VOTER</text>
        </svg>
      );
    case "srv8": // Ration Card
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#ECFDF5" stroke="#059669" strokeWidth="2.5" />
          <ellipse cx="50" cy="50" rx="38" ry="38" fill="none" stroke="#10B981" strokeWidth="0.5" strokeDasharray="3,3" />
          <g stroke="#D97706" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 50,80 Q 50,45 35,26" />
            <path d="M 50,80 Q 50,45 65,26" />
            <path d="M 50,80 Q 50,40 50,22" />
            <circle cx="35" cy="26" r="2" fill="#FBBF24" stroke="none" />
            <circle cx="39" cy="33" r="2" fill="#FBBF24" stroke="none" />
            <circle cx="43" cy="40" r="2" fill="#FBBF24" stroke="none" />
            <circle cx="65" cy="26" r="2" fill="#FBBF24" stroke="none" />
            <circle cx="61" cy="33" r="2" fill="#FBBF24" stroke="none" />
            <circle cx="57" cy="40" r="2" fill="#FBBF24" stroke="none" />
          </g>
          <text x="50" y="92" textAnchor="middle" fill="#047857" fontSize="7" fontWeight="black">খাদ্যসাথী</text>
        </svg>
      );
    case "srv9": // Passport
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <rect x="22" y="10" width="56" height="80" rx="5" fill="#0F172A" stroke="#475569" strokeWidth="1" />
          <g transform="translate(50,45) scale(0.6)" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5">
            <path d="M -10,-10 C -15,-20 15,-20 10,-10 C 15,-10 15,10 10,12 L -10,12 Z" />
            <rect x="-12" y="12" width="24" height="4" rx="1" />
            <path d="M -8,16 L -10,32 L 10,32 L 8,16" />
          </g>
          <text x="50" y="21" textAnchor="middle" fill="#FBBF24" fontSize="6" fontWeight="bold">PASSPORT</text>
          <text x="50" y="85" textAnchor="middle" fill="#FBBF24" fontSize="6.5" fontWeight="bold">REPUBLIC OF INDIA</text>
        </svg>
      );
    case "srv10": // Driving License
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#F0F9FF" stroke="#0369A1" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#0284C7" strokeWidth="5.5" />
          <circle cx="50" cy="50" r="8" fill="#0284C7" />
          <line x1="50" y1="50" x2="50" y2="78" stroke="#0284C7" strokeWidth="5" />
          <line x1="50" y1="50" x2="25" y2="35" stroke="#0284C7" strokeWidth="5" />
          <line x1="50" y1="50" x2="75" y2="35" stroke="#0284C7" strokeWidth="5" />
          <text x="50" y="92" textAnchor="middle" fill="#0369A1" fontSize="7" fontWeight="bold">SARATHI</text>
        </svg>
      );
    case "srv11": // Death Certificate
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#F8FAFC" stroke="#475569" strokeWidth="2.5" />
          <g stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0, 3)">
            <path d="M 32,45 C 40,43 50,49 50,49 C 50,49 60,43 68,45 L 68,72 C 60,70 50,76 50,76 C 50,76 40,70 32,72 Z" />
            <line x1="50" y1="49" x2="50" y2="76" />
            <path d="M 68,34 C 68,34 56,36 54,48" stroke="#64748B" strokeWidth="1.5" />
          </g>
          <text x="50" y="91" textAnchor="middle" fill="#334155" fontSize="7.5" fontWeight="bold">DEATH CERT</text>
        </svg>
      );
    case "srv12": // ABHA Card
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5" />
          <path d="M 15,50 L 35,50 L 42,20 L 50,80 L 58,40 L 63,55 L 70,50 L 85,50" fill="none" stroke="#1D4ED8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <g transform="translate(42,32) scale(0.35)" fill="#EA580C">
            <path d="M 25,0 L 50,15 L 50,45 C 50,65 25,80 25,80 C 25,80 0,65 0,45 L 0,15 Z" />
            <rect x="21" y="20" width="8" height="25" fill="#FFFFFF" rx="1" />
            <rect x="12" y="29" width="26" height="8" fill="#FFFFFF" rx="1" />
          </g>
          <text x="50" y="92" textAnchor="middle" fill="#1D4ED8" fontSize="7.5" fontWeight="black" letterSpacing="0.5">ABHA</text>
        </svg>
      );
    case "srv_swasthya": // Swasthya Sathi Card
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2.5" />
          <path d="M 50,75 C 15,50 30,22 50,38 C 70,22 85,50 50,75 Z" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
          <g fill="#15803D" stroke="none" transform="translate(0, 1)">
            <circle cx="43" cy="46" r="3.2" />
            <path d="M 38,58 C 38,51 48,51 48,58 L 46,69 L 40,69 Z" />
            <circle cx="57" cy="48" r="3" />
            <path d="M 52,60 C 52,53 62,53 62,60 L 60,69 L 54,69 Z" />
          </g>
          <text x="50" y="91" textAnchor="middle" fill="#15803D" fontSize="7" fontWeight="bold">SWASTHYA</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 select-none">
          <circle cx="50" cy="50" r="45" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" fill="#64748B" />
        </svg>
      );
  }
};

export default function App() {
  // Global States (shared state for instant reactions)
  const [schemes, setSchemes] = useState<Scheme[]>(INITIAL_SCHEMES);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [updates, setUpdates] = useState<AppUpdate[]>(INITIAL_UPDATES);
  const [scholarships, setScholarships] = useState<Scholarship[]>(INITIAL_SCHOLARSHIPS);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);

  // Fetch all databases on load
  useEffect(() => {
    const loadAllDataAndStatus = async () => {
      try {
        const [schemesR, jobsR, scholarshipsR, servicesR, statusR] = await Promise.all([
          fetch("/api/schemes").then(r => r.json()),
          fetch("/api/jobs").then(r => r.json()),
          fetch("/api/scholarships").then(r => r.json()),
          fetch("/api/services").then(r => r.json()),
          fetch("/api/supabase/status").then(r => r.json()).catch(() => null)
        ]);

        if (Array.isArray(schemesR)) setSchemes(schemesR);
        if (Array.isArray(jobsR)) setJobs(jobsR);
        if (Array.isArray(scholarshipsR)) setScholarships(scholarshipsR);
        if (Array.isArray(servicesR)) setServices(servicesR);
        if (statusR) setSupabaseStatus(statusR);
      } catch (err) {
        console.error("Failed to fetch initial application data:", err);
      }
    };
    loadAllDataAndStatus();
  }, []);

  const handleCreateScheme = async (scheme: Scheme) => {
    try {
      await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheme)
      });
      setSchemes((prev) => [scheme, ...prev]);
    } catch (err) {
      console.error("Error creating scheme:", err);
    }
  };
  const handleSaveScheme = async (scheme: Scheme) => {
    try {
      await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheme)
      });
      setSchemes((prev) => prev.map((s) => (s.id === scheme.id ? scheme : s)));
    } catch (err) {
      console.error("Error saving scheme:", err);
    }
  };
  const handleDeleteScheme = async (id: string) => {
    try {
      await fetch(`/api/schemes/${id}`, { method: "DELETE" });
      setSchemes((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting scheme:", err);
    }
  };

  const handleCreateJob = async (job: Job) => {
    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job)
      });
      setJobs((prev) => [job, ...prev]);
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };
  const handleSaveJob = async (job: Job) => {
    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job)
      });
      setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
    } catch (err) {
      console.error("Error saving job:", err);
    }
  };
  const handleDeleteJob = async (id: string) => {
    try {
      await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  const handleCreateScholarship = async (scholarship: Scholarship) => {
    try {
      await fetch("/api/scholarships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scholarship)
      });
      setScholarships((prev) => [scholarship, ...prev]);
    } catch (err) {
      console.error("Error creating scholarship:", err);
    }
  };
  const handleSaveScholarship = async (scholarship: Scholarship) => {
    try {
      await fetch("/api/scholarships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scholarship)
      });
      setScholarships((prev) => prev.map((s) => (s.id === scholarship.id ? scholarship : s)));
    } catch (err) {
      console.error("Error saving scholarship:", err);
    }
  };
  const handleDeleteScholarship = async (id: string) => {
    try {
      await fetch(`/api/scholarships/${id}`, { method: "DELETE" });
      setScholarships((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting scholarship:", err);
    }
  };

  const handleCreateService = async (service: ServiceItem) => {
    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service)
      });
      setServices((prev) => [service, ...prev]);
    } catch (err) {
      console.error("Error creating service:", err);
    }
  };
  const handleSaveService = async (service: ServiceItem) => {
    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service)
      });
      setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
    } catch (err) {
      console.error("Error saving service:", err);
    }
  };
  const handleDeleteService = async (id: string) => {
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  // Filter and Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSchemeTab, setActiveSchemeTab] = useState<"all" | "women" | "students" | "farmers" | "senior" | "workers">("all");
  const [activeJobTab, setActiveJobTab] = useState<"all" | "wbpsc" | "police" | "railway" | "banking" | "defence" | "private" | "internship">("all");

  // Dialog/Modal states
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Widget Toggles
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Admin Official Login Password states
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");

  const handleAdminPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === "100") {
      setIsAdminOpen(true);
      setShowAdminPasswordModal(false);
      setAdminPasswordInput("");
      setAdminPasswordError("");
      triggerPushBroadcast("অফিসিয়াল অ্যাডমিন লগইন সফল! আপনি এখন স্কলারশিপ, প্রকল্প ও চাকরি এডিট করতে পারবেন।");
    } else {
      setAdminPasswordError("ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।");
    }
  };

  // Dynamic user bookmarked schemes & jobs (Saved lists)
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  // Simulation Alert/Push Notifications State
  const [broadcastNotices, setBroadcastNotices] = useState<string[]>([
    "স্বাগতম! বাংলার সরকার নাগরিক সেবা পোর্টালে পশ্চিমবঙ্গ রাজ্য সরকারের সমস্ত সামাজিক প্রকল্প, নিয়োগ এবং বৃত্তি সংক্রান্ত নির্ভরযোগ্য তথ্য বাংলায় পাবেন।"
  ]);

  // Subscription Alerts (WhatsApp & Telegram signup)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subType, setSubType] = useState<"WhatsApp" | "Telegram" | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [subSuccess, setSubTypeSuccess] = useState(false);

  // Additional user interface states (satisfying design constraints)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("হোম");
  const [showMoreServicesModal, setShowMoreServicesModal] = useState(false);
  const [docCategory, setDocCategory] = useState<"all" | "identity" | "utility" | "health" | "jobs" | "scholarships" | "welfare" | "land">("all");
  const [activeLegalModal, setActiveLegalModal] = useState<"terms" | "disclaimer" | "privacy" | null>(null);

  // Bookmark toggler helpers
  const toggleSaveScheme = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedSchemeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSaveJob = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const savedSchemesList = useMemo(() => {
    return schemes.filter((s) => savedSchemeIds.includes(s.id));
  }, [schemes, savedSchemeIds]);

  const savedJobsList = useMemo(() => {
    return jobs.filter((j) => savedJobIds.includes(j.id));
  }, [jobs, savedJobIds]);

  // Search logic covering titles, categories, subtitles, descriptions, etc.
  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesSearch =
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.benefits.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.eligibility.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeSchemeTab === "all" || scheme.category === activeSchemeTab;
      return matchesSearch && matchesTab;
    });
  }, [schemes, searchQuery, activeSchemeTab]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.qualification.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeJobTab === "all" || job.category === activeJobTab;
      return matchesSearch && matchesTab;
    });
  }, [jobs, searchQuery, activeJobTab]);

  const triggerPushBroadcast = (text: string) => {
    setBroadcastNotices((prev) => [text, ...prev]);
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber) return;
    setSubTypeSuccess(true);
    setTimeout(() => {
      setShowSubscriptionModal(false);
      setMobileNumber("");
      setSubTypeSuccess(false);
    }, 2500);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9FBFC] text-slate-800 transition-all duration-300 text-sm">
      
      {/* 1. TOP BROADCAST ALERT BAND (Persistent Info) */}
      <div className="bg-gradient-to-r from-[#A94F12] to-[#E96A1F] text-white py-1.5 px-4 shadow-inner text-center text-xs md:text-sm font-semibold flex items-center justify-center gap-2 relative z-50">
        <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase leading-none shrink-0 tracking-wider animate-pulse">আজকের বিজ্ঞপ্তি</span>
        <p className="truncate">পশ্চিমবঙ্গ নতুন জনকল্যাণ প্রকল্প, নিয়োগ বিজ্ঞপ্তি ও স্কলারশিপের সর্বশেষ নির্ভরযোগ্য তথ্য জানতে এআই সহায়তা চ্যাট ব্যবহার করুন।</p>
      </div>

      {/* 2. TOP METADATA & ACCESSIBILITY WIDGETS BAR */}
      <div className="bg-slate-50 border-b border-slate-200/50 px-4 md:px-8 py-1 text-slate-600 text-xs flex flex-wrap items-center justify-between gap-2.5 select-none">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">বেসরকারি নাগরিক পোর্টাল</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-550">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>সার্ভার স্ট্যাটাস: <strong className="text-slate-700">সক্রিয়</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Official Login (Admin switch with password) */}
          <button
            id="admin-btn"
            onClick={() => {
              if (isAdminOpen) {
                setIsAdminOpen(false);
                triggerPushBroadcast("অফিসিয়াল সেশন সমাপ্ত করা হয়েছে।");
              } else {
                setAdminPasswordInput("");
                setAdminPasswordError("");
                setShowAdminPasswordModal(true);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md border text-[11px] font-semibold transition-all cursor-pointer ${
              isAdminOpen
                ? "bg-slate-900 border-slate-900 text-white shadow-xs scale-[1.01]"
                : "bg-white border-slate-300 text-slate-700 hover:bg-[#E96A1F]/5"
            }`}
          >
            <Settings className={`h-3.5 w-3.5 ${isAdminOpen ? "animate-spin" : ""}`} />
            <span>{isAdminOpen ? "হোমপেজ ফিরুন" : "অফিসিয়াল লগইন"}</span>
          </button>
        </div>
      </div>
      <header className="bg-white py-3.5 px-4 md:px-8 border-b border-orange-100/50 flex flex-col md:flex-row items-center justify-between gap-3 relative select-none">
        {/* Left Side: Brand Name & Double Tagline aligned cleanly to the left margins */}
        <div className="w-full md:w-auto">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl md:text-2xl text-[#E96A1F] tracking-tight leading-none">
                বাংলার সরকার
              </h1>
              <span className="bg-[#E96A1F]/10 text-[#A94F12] text-[9px] font-extrabold px-1.5 py-0.5 rounded">নাগরিক গাইড</span>
            </div>
            {/* Tagline 1 */}
            <p className="text-[11px] text-slate-800 font-semibold leading-normal mt-1.5">
              আপনার সেবা, আপনার তথ্য, এক প্ল্যাটফর্মে (বেসরকারি উদ্যোগ)
            </p>
            {/* Tagline 2 */}
            <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">
              পশ্চিমবঙ্গ রাজ্য সামাজিক সুরক্ষা ও জনকল্যাণ প্রকল্প নির্দেশিকা
            </p>
          </div>
        </div>
      </header>

      {/* 4. TOTAL WIDTH ACCESSIBLE NAVIGATION BAR (Official Government Portal style) */}
      <nav className="bg-[#A94F12] text-white shadow-sm relative z-40 select-none border-b border-[#8D3F0D]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-0 flex items-center justify-between">
          
          {/* Desktop Links (Visible on Tablet/Desktop) - Professional non-button flat design */}
          <ul className="hidden lg:flex items-center flex-wrap">
            {[
              { label: "হোম", href: "#hero" },
              { label: "অফিসিয়াল ওয়েবসাইট", href: "#services" },
              { label: "সাহায্য ও সহায়তা", href: "#help" }
            ].map((item, idx) => {
              const isActive = activeNav === item.label;
              return (
                <li key={idx} className="border-r border-white/10 last:border-0">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      setActiveNav(item.label);
                      if (item.label === "সাহায্য ও সহায়তা") {
                        e.preventDefault();
                        setIsAiOpen(true);
                      } else if (item.label === "হোম") {
                        e.preventDefault();
                        setSearchQuery("");
                        setActiveSchemeTab("all");
                        setActiveJobTab("all");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else if (item.label === "অফিসিয়াল ওয়েবসাইট") {
                        e.preventDefault();
                        document.getElementById("services-anchor")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`inline-flex items-center px-4.5 py-3 text-xs font-bold uppercase transition-all tracking-wide relative group cursor-pointer ${
                      isActive
                        ? "text-amber-300 bg-[#8D3F0D]/60"
                        : "text-orange-50 hover:text-white hover:bg-[#8D3F0D]/20"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {item.label === "সাহায্য ও সহায়তা" && (
                        <MessageSquare className="h-3.5 w-3.5 text-amber-300 animate-pulse shrink-0" />
                      )}
                      <span>{item.label === "সাহায্য ও সহায়তা" ? "সাহায্য ও সহায়তা (এআই চ্যাট)" : item.label}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Navigation bar with direct compact links (Clean official flat tabs, not buttons) */}
          <div className="lg:hidden flex items-center justify-between w-full py-0 overflow-x-auto scrollbar-none gap-2">
            <div className="flex items-center whitespace-nowrap overflow-x-auto scrollbar-none">
              {[
                { label: "হোম", target: "hero" },
                { label: "অফিসিয়াল ওয়েবসাইট", target: "services" }
              ].map((item, idx) => {
                const isItemActive = activeNav === item.label;
                return (
                  <button
                    key={idx}
                    onClick={(e) => {
                      setActiveNav(item.label);
                      if (item.target === "hero") {
                        setSearchQuery("");
                        setActiveSchemeTab("all");
                        setActiveJobTab("all");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else if (item.target === "services") {
                        document.getElementById("services-anchor")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`px-3 py-2.5 text-xs font-bold transition-all relative cursor-pointer ${
                      isItemActive
                        ? "text-amber-300 bg-[#8D3F0D]/60 font-extrabold"
                        : "text-orange-100 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isItemActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-amber-400"></span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Simple Help / Ai shortcut - styled as a refined clean text tab link with chat icon */}
            <button
              onClick={() => {
                setActiveNav("সাহায্য ও সহায়তা");
                setIsAiOpen(true);
              }}
              className={`px-3 py-2.5 text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer relative ${
                activeNav === "সাহায্য ও সহায়তা" ? "bg-[#8D3F0D]/60 font-extrabold" : ""
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-amber-300 animate-pulse shrink-0" />
              <span>সহায়তা (এআই চ্যাট)</span>
              {activeNav === "সাহায্য ও সহায়তা" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-amber-400"></span>
              )}
            </button>
          </div>
 
        </div>
      </nav>





      {/* Main Container / Content Conditional (re-wired properly) */}
      <main className="flex-grow">
        {isAdminOpen ? (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
            <AdminPanel
              schemes={schemes}
              onCreateScheme={handleCreateScheme}
              onSaveScheme={handleSaveScheme}
              onDeleteScheme={handleDeleteScheme}
              jobs={jobs}
              onCreateJob={handleCreateJob}
              onSaveJob={handleSaveJob}
              onDeleteJob={handleDeleteJob}
              scholarships={scholarships}
              onCreateScholarship={handleCreateScholarship}
              onSaveScholarship={handleSaveScholarship}
              onDeleteScholarship={handleDeleteScholarship}
              services={services}
              onCreateService={handleCreateService}
              onSaveService={handleSaveService}
              onDeleteService={handleDeleteService}
              updates={updates}
              setUpdates={setUpdates}
              onClose={() => setIsAdminOpen(false)}
              triggerPushNotification={triggerPushBroadcast}
            />
          </div>
        ) : (
          <>
            {/* 1. SEAMLESS COMPACT SEARCH HERO (Lightened, modern light-orange-cream gradient) */}
            <div className="w-full bg-gradient-to-b from-amber-50/75 to-[#FFF8F4] py-14 px-4 md:px-8 border-b border-orange-100/70 select-none relative overflow-hidden">
              {/* Subtle background abstract shapes */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>
              
              <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
                <h2 className="font-extrabold text-xl md:text-3xl text-slate-800 tracking-tight leading-tight">
                  পশ্চিমবঙ্গ রাজ্য সামাজিক সুরক্ষা ও জনকল্যাণ প্রকল্প নির্দেশিকা
                </h2>
                <p className="text-xs md:text-sm text-slate-500 font-semibold max-w-xl mx-auto">
                  আপনার প্রয়োজনীয় সরকারি প্রকল্প, চাকরি বা বৃত্তির সঠিক তথ্য বাংলায় অনুসন্ধান করুন
                </p>

                {/* Main Interactive Search Input */}
                <div className="max-w-2xl mx-auto mt-4 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none font-bold">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="অনুসন্ধান করুন..."
                    className="w-full bg-white text-slate-900 border border-orange-100/85 rounded-2xl pl-11 pr-4 py-3.5 text-sm md:text-base font-bold placeholder-slate-405 focus:outline-none focus:ring-4 focus:ring-orange-105/50 shadow-md"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 font-bold"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                  )}
                </div>

                {/* Dynamic Eye-Catching Compact Categories Grid */}
                <div className="max-w-4xl mx-auto mt-6 pt-4 border-t border-orange-100/40">
                  <p className="text-[10px] md:text-xs text-slate-400 font-bold tracking-widest uppercase mb-3.5 text-center">
                    সরাসরি প্রয়োজনীয় ডকুমেন্টস বা সরকারি কার্ড বিভাগে এগিয়ে যান
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 px-1">
                    {[
                      {
                        id: "all",
                        label: "সব নথি ও কার্ড",
                        desc: "৩১+ সরকারি সেবা",
                        icon: Grid,
                        bgActive: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-orange-600 shadow-md",
                        bgDefault: "bg-white hover:bg-amber-50/15 text-slate-700 border-slate-200/70 hover:border-amber-305",
                        iconBgActive: "bg-white/20 text-white",
                        iconBgDefault: "bg-amber-50 text-amber-600",
                      },
                      {
                        id: "jobs",
                        label: "সরকারি চাকরি",
                        desc: "PSC, পুলিশ ও নিয়োগ",
                        icon: Briefcase,
                        bgActive: "bg-gradient-to-r from-blue-600 to-indigo-650 text-white border-blue-700 shadow-md",
                        bgDefault: "bg-white hover:bg-blue-50/15 text-slate-700 border-slate-200/70 hover:border-blue-300",
                        iconBgActive: "bg-white/20 text-white",
                        iconBgDefault: "bg-blue-50 text-blue-600",
                      },
                      {
                        id: "scholarships",
                        label: "স্কলারশিপ",
                        desc: "SVMCM ও অনুদান",
                        icon: GraduationCap,
                        bgActive: "bg-gradient-to-r from-emerald-600 to-teal-650 text-white border-emerald-700 shadow-md",
                        bgDefault: "bg-white hover:bg-emerald-50/15 text-slate-700 border-slate-200/70 hover:border-emerald-300",
                        iconBgActive: "bg-white/20 text-white",
                        iconBgDefault: "bg-emerald-50 text-emerald-600",
                      },
                      {
                        id: "welfare",
                        label: "সরকারি প্রকল্প",
                        desc: "লক্ষ্মীর ভাণ্ডার ও সেবা",
                        icon: Award,
                        bgActive: "bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-600 shadow-md",
                        bgDefault: "bg-white hover:bg-orange-50/15 text-slate-700 border-slate-200/70 hover:border-orange-300",
                        iconBgActive: "bg-white/20 text-white",
                        iconBgDefault: "bg-orange-50 text-bengali-orange",
                      },
                      {
                        id: "identity",
                        label: "পরিচয় ও কার্ড",
                        desc: "আধার, ভোটার ও রেশন",
                        icon: IdCard,
                        bgActive: "bg-gradient-to-r from-violet-600 to-purple-650 text-white border-violet-700 shadow-md",
                        bgDefault: "bg-white hover:bg-violet-50/15 text-slate-700 border-slate-200/70 hover:border-violet-300",
                        iconBgActive: "bg-white/20 text-white",
                        iconBgDefault: "bg-violet-50 text-violet-600",
                      },
                      {
                        id: "utility",
                        label: "শংসাপত্র",
                        desc: "জন্ম, জাতি ও সার্টিফিকেট",
                        icon: FileText,
                        bgActive: "bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-teal-600 shadow-md",
                        bgDefault: "bg-white hover:bg-teal-50/15 text-slate-700 border-slate-200/70 hover:border-teal-300",
                        iconBgActive: "bg-white/20 text-white",
                        iconBgDefault: "bg-teal-50 text-teal-600",
                      },
                      {
                        id: "health",
                        label: "হেলথ ও বিমা",
                        desc: "স্বাস্থ্য সাথী ও ABHA",
                        icon: HeartPulse,
                        bgActive: "bg-gradient-to-r from-rose-500 to-pink-605 text-white border-rose-600 shadow-md",
                        bgDefault: "bg-white hover:bg-rose-50/15 text-slate-700 border-slate-200/70 hover:border-rose-300",
                        iconBgActive: "bg-white/20 text-white",
                        iconBgDefault: "bg-rose-50 text-rose-600",
                      },
                      {
                        id: "land",
                        label: "জমি ও পরচা",
                        desc: "বাংলারভূমি ও খাজনা",
                        icon: MapPin,
                        bgActive: "bg-gradient-to-r from-amber-600 to-[#8D3F0D] text-white border-[#75340A] shadow-md",
                        bgDefault: "bg-white hover:bg-amber-50/15 text-slate-700 border-slate-200/70 hover:border-amber-400",
                        iconBgActive: "bg-white/20 text-white",
                        iconBgDefault: "bg-amber-50 text-amber-700",
                      },
                    ].map((cat) => {
                      const IconComponent = cat.icon;
                      const isActive = docCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setDocCategory(cat.id as any);
                            setTimeout(() => {
                              document.getElementById("digital-document-hub-section")?.scrollIntoView({ behavior: "smooth" });
                            }, 50);
                          }}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-left transition-all duration-200 transform scale-100 hover:scale-[1.01] active:scale-95 cursor-pointer relative overflow-hidden group ${
                            isActive ? cat.bgActive : cat.bgDefault
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg transition-all ${
                            isActive ? cat.iconBgActive : cat.iconBgDefault
                          }`}>
                            <IconComponent className="h-3.8 w-3.8 shrink-0" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-[11px] leading-tight truncate">
                              {cat.label}
                            </span>
                            <span className={`text-[8.5px] font-semibold mt-0.5 truncate leading-none ${isActive ? "text-white/85" : "text-slate-400"}`}>
                              {cat.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. GANABHABAN BRANDED HUB OF OFFICIAL PORTALS - FLUSH WITH HERO */}
            <div id="services-anchor" />
            <section id="digital-document-hub-section" className="w-full bg-gradient-to-b from-[#FFF8F4] to-[#F9FBFC] pb-10 pt-4 px-4 md:px-8 border-b border-orange-100/40 animate-fade-in select-none">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100/60 pb-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-orange-50 to-amber-100/60 text-bengali-orange rounded-2xl border border-orange-250/20 shadow-2xs">
                      <Shield className="h-5.5 w-5.5 text-bengali-orange animate-pulse" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-base md:text-lg text-slate-800 tracking-tight">বাংলার সরকারের সমস্ত অফিসিয়াল ওয়েবসাইট</h3>
                        {docCategory !== "all" && (
                          <span className="px-2 py-0.5 text-[10px] md:text-xs bg-orange-100 text-bengali-orange border border-orange-200/50 rounded-lg font-bold animate-fade-in">
                            {
                              {
                                jobs: "সরকারি চাকরি",
                                scholarships: "স্কলারশিপ",
                                welfare: "সরকারি প্রকল্প",
                                identity: "পরিচয় ও কার্ড",
                                utility: "শংসাপত্র",
                                health: "হেলথ ও বিমা",
                                land: "জমি ও পরচা"
                              }[docCategory]
                            }
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">অরিジナル লোগো ও ডিজিটাল চিপ সংবলিত স্মার্ট কার্ড ডিরেক্টরি</p>
                    </div>
                  </div>
                </div>

                {/* Compact side-by-side cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
                  {[
                    // West Bengal Cards & Core Documents (identity)
                    { id: "srv1", title: "আধার কার্ড", subtitle: "Aadhaar Card", cat: "identity", badge: "UIDAI", btnText: "আধার সেবা", description: "আধার কার্ড ভারতীয় নাগরিকদের অন্যতম প্রধান পরিচয়পত্র। নতুন কার্ড আবেদন বা বায়োমেট্রিক ও নাম ঠিকানা আপডেট করার অফিসিয়াল সেবা পোর্টাল।", steps: ["'My Aadhaar' পোর্টালে ভিজিট করুন।", "আধার কেন্দ্র অ্যাপয়েন্টমেন্ট বুকিং সম্পন্ন করুন বা বায়োমেট্রিক স্লট বেছে নিন।", "প্রয়োজনীয় নথি যেমন পরিচয় ও ঠিকানার প্রমাণপত্র নিয়ে কেন্দ্রে যান।", "বাচ্চাদের ক্ষেত্রে ৫ ও ১৫ বছর বয়সে বাধ্যতামুলক বায়োমেট্রিক আপডেট করান।"], officialUrl: "https://uidai.gov.in/" },
                    { id: "srv2", title: "প্যান কার্ড", subtitle: "PAN Card Registration", cat: "identity", badge: "Income Tax", btnText: "প্যান সেবা", description: "ব্যাংকিং ও ট্যাক্স লেনদেনের জন্য ই-প্যান বা ফিজিক্যাল প্যান কার্ড নতুন আবেদন বা বিবরণী সংশোধন প্রসেস পোর্টাল।", steps: ["অনলাইন NSDL/UTIITSL প্যান পোর্টালে ফর্ম ৪৯এ (Form 49A) সিলেক্ট করুন।", "আপনার সঠিক আধার কার্ড অনুযায়ী নাম, জন্মতারিখ ও পিতা লিখুন।", "আধার ওটিপির মাধ্যমে ই-কেওয়াইসি সম্পন্ন করুন সম্পূর্ণ ডিজিটাল পদ্ধতিতে।", "ডিজিটাল প্যান কয়েক ঘণ্টার মধ্যেই ইমেইলে চলে আসবে, ফিজিক্যাল কার্ড পোস্ট অফ থ্রু আসবে।"], officialUrl: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
                    { id: "srv7", title: "ভোটার কার্ড", subtitle: "Voter Card / e-EPIC", cat: "identity", badge: "ECI India", btnText: "ভোটার পোর্টাল", description: "জাতীয় ভোটার সেবা পোর্টালে নতুন ভোটার নাম নথিভুক্তকরণ, নাম সংশোধন বা ডিজিটাল ভোটার কার্ড ডাউনলোড প্রসেস।", steps: ["ভারতের নির্বাচন কমিশন ভোটার সার্ভিস পোর্টালে (voters.eci.gov.in) সাইন ইন করুন।", "নতুন ভোটারের জন্য ফর্ম-৬ বা সংশোধনের জন্য ফর্ম-৮ পূরণ করুন।", "বয়স ও ঠিকানার প্রমাণপত্র স্ক্যান করে আপলোড করুন।", "অনুমোদনের পর বিএলও আপনার বাড়িতে গিয়ে ডিজিটাল ভোটার কার্ড ডেলিভারি করে দেবে।"], officialUrl: "https://voters.eci.gov.in/" },
                    { id: "srv8", title: "রেশন কার্ড", subtitle: "Ration Card (Khadya)", cat: "identity", badge: "Khadya Sathi", btnText: "খাদ্যসাথী", description: "পশ্চিমবঙ্গ খাদ্য ও সরবরাহ মন্ত্রকের অধীনে ডিজিটাল রেশন কার্ড স্ট্যাটাস, মোবাইল লিঙ্কিং ও দোকান বদলের পোর্টাল।", steps: ["খাদ্য দপ্তরের অফিসিয়াল পোর্টালে গিয়ে 'Citizen Card Status' ট্যাব খুলুন।", "আধার কার্ড সংযুক্ত করতে 'Link Aadhaar with Ration Card' নির্বাচন করুন।", "ওটিপি দিয়ে মেম্বার ট্রান্সফার বা নতুন সদস্যের আবেদন সম্পূর্ণ করুন।", "প্রয়োজনে ই-রেশন কার্ড ডাউনলোড করে তৎক্ষণাৎ চাল-গম তুলুন বিনা মূল্যে।"], officialUrl: "https://food.wb.gov.in/" },
                    { id: "srv9", title: "পাসপোর্ট", subtitle: "Passport Services", cat: "identity", badge: "Govt of India", btnText: "পাসপোর্ট পোর্টাল", description: "সহজ পদ্ধতিতে অনলাইন পোর্টালের মাধ্যমে নতুন পাসপোর্ট আবেদন ও নিকটবর্তী পাসপোর্ট সেবা কেন্দ্রে অ্যাপয়েন্টমেন্ট বুকিং গাইড।", steps: ["ভারতের পাসপোর্ট সেবা পোর্টালে নতুন ইউজার রেজিস্ট্রেশন করুন।", "Fresh Passport ফর্ম পূরণ করে ব্যক্তিগত ও ঠিকানার বিবরণ খতিয়ে জমা দিন।", "অ্যাপয়েন্টমেন্ট স্লট পছন্দ করে অনলাইন পেমেন্ট সম্পন্ন করুন।", "রিসিভ কপি নিয়ে পাসপোর্ট অফিসে ডকুমেন্ট স্ক্রিনিং করান ও পুলিশ ভেরিফিকেশন ফেস করুন।"], officialUrl: "https://www.passportindia.gov.in/" },
                    { id: "srv10", title: "ড্রাইভিং লাইসেন্স", subtitle: "Driving License", cat: "identity", badge: "Sarathi PM", btnText: "পরিবহন লাইসেন্স", description: "লার্নার্স লাইসেন্স টেস্ট এবং স্থায়ী ড্রাইভিং লাইসেন্স অ্যাপয়েন্টমেন্ট প্রক্রিয়া সম্পন্ন করুন সম্পূর্ণ ডিজিটালভাবে আরটিও বা আরটিআই সেবায়।", steps: ["সারথি পরিবহন সেবা পোর্টালে গিয়ে রাজ্য 'West Bengal' সিলেক্ট করুন।", "'Apply for Learner's Licence' ক্লিক করে আধার ই-কেওয়াইসি সম্পন্ন করুন।", "ঘরে বসেই অনলাইনে লার্নার টেস্ট দিয়ে শংসাপত্র ডাউনলোড করুন।", "স্থায়ী লাইসেন্সের জন্য RTO ড্রাইভিং ট্রায়াল বুক করুন ও পাস করলেই কার্ড পান।"], officialUrl: "https://sarathi.parivahan.gov.in/" },
                    
                    // West Bengal Certificates (utility)
                    { id: "srv3", title: "জন্ম শংসাপত্র", subtitle: "Birth Certificate", cat: "utility", badge: "Govt of WB", btnText: "জন্ম তথ্য", description: "পশ্চিমবঙ্গে জন্মগ্রহণকারী শিশুদের বা পুরোনো নাগরিকদের জন্য ডিজিটালভাবে বার্থ সার্টিফিকেট ডিরেক্ট আবেদন ও ডাউনলোডের পোর্টাল।", steps: ["'জন্ম-মৃত্যু তথ্য' পোর্টাল (janma-mrityutathya.wb.gov.in) ভিজিট করুন।", "সিটিজেন ট্যাব থেকে 'Birth' এবং 'Apply for New Application' ক্লিক করুন।", "শিশুর জন্ম ও হাসপাতাল রিলিজ স্লিপের স্ক্যান কপি আপলোড করুন।", "অ্যাপ্রুভ হওয়ার পর একই পোর্টাল থেকে ডিজিটাল শংসাপত্র ডাউনলোড করুন।"], officialUrl: "https://janma-mrityutathya.wb.gov.in/" },
                    { id: "srv4", title: "জাতিগত শংসাপত্র", subtitle: "Caste Certificate", cat: "utility", badge: "Kalyan Dept", btnText: "কাস্ট সার্টিফিকেট", description: "পশ্চিমবঙ্গে তপশিলি জাতি (SC), উপজাতি (ST) এবং OBC শংসাপত্র পাওয়ার ব্যাকওয়ার্ড ক্লাসেস উন্নয়ন দপ্তরের পোর্টাল।", steps: ["ব্যাকওয়ার্ড ডেস্কে অ্যাপ্লিকেশন লিঙ্কে ক্লিক করে ফর্ম খুলুন।", "আবেদনকারীর শিক্ষাগত বিবরণ ও রক্তের সম্পর্কযুক্ত আত্মীয়ের কাস্ট কার্ডের বিবরণ দিন।", "ঠিকানা ও জাতি প্রমাণের স্বঘোষণাপত্র বা প্রধানের শংসাপত্র আপলোড করুন।", "SDO/BDO অফিসে হেয়ারিং শেষে সার্টিফিকেট ডিজিটালভাবে ডাউনলোড বা সংগ্রহ করুন।"], officialUrl: "http://casterepresentationwb.gov.in/" },
                    { id: "srv5", title: "আয় শংসাপত্র", subtitle: "Income Certificate", cat: "utility", badge: "e-District", btnText: "ইনকাম গাইড", description: "স্কলারশিপের মেধা বা ঋণের জন্য পশ্চিমবঙ্গ ই-ডিস্ট্রিক্ট পোর্টাল ২.০ এর মাধ্যমে বিডিও (BDO) দ্বারা অনুমোদিত আয় শংসাপত্রের পোর্টাল।", steps: ["পশ্চিমবঙ্গ ই-ডিস্ট্রিক্ট পোর্টালে নিজের নাগরিক আইডি দিয়ে লগইন করুন।", "সার্ভিস লিস্ট থেকে 'Income Certificate' বিকল্প বেছে নিন।", "আবেদনকারীর আয়ের বিবরণী ও স্থানীয় প্রধান/মিউনিসিপ্যালিটি প্যাড আপলোড করুন।", "বিডিও ই-সাইন করার পর ৩ দিনের মাথায় ডিজিটাল বারকোড শংসাপত্র ডাউনলোড করুন।"], officialUrl: "https://edistrict.wb.gov.in/" },
                    { id: "srv11", title: "মৃত্যু শংসাপত্র", subtitle: "Death Certificate", cat: "utility", badge: "Govt of WB", btnText: "ডেথ রেকর্ড", description: "পশ্চিমবঙ্গ সরকারের জন্ম-মৃত্যু তথ্য পোর্টাল ব্যবহার করে মৃত ব্যক্তির ডেথ সার্টিফিকেটের অনলাইন আবেদন ও ভেরিফিকেশন।", steps: ["'জন্ম-মৃত্যু তথ্য' পোর্টাল ওপেন করুন ও সিটিজেন সেকশন নির্বাচন করুন।", "'Death' সেগমেন্ট থেকে নতুন ডিজিটাল ডেথ রেজিস্ট্রি ফর্ম ফিল আপ করুন।", "হাসপাতাল বা শবদাহ প্রমাণের নথি আপলোড করুন।", "ডিজিটাল ভেরিফায়েড সই যুক্ত শংসাপত্র ফ্রিতে ডাউনলোড করুন।"], officialUrl: "https://janma-mrityutathya.wb.gov.in/" },
                    
                    // West Bengal Government Jobs & Exams (jobs)
                    { id: "job_psc", title: "WBPSC ক্লার্টশিপ ও বিবিধ", subtitle: "PSC Clerkship, Miscellaneous", cat: "jobs", badge: "WBPSC", btnText: "পিএসসি পোর্টাল", description: "পশ্চিমবঙ্গ পাবলিক সার্ভিস কমিশন দ্বারা গ্রুপ-সি, গ্রুপ-ডি, মিউনিসিপ্যাল, ক্লার্কশিপ ও সিভিল সার্ভিস নিয়োগ সংক্রান্ত অফিসিয়াল পোর্টাল।", steps: ["অফিসিয়াল WBPSC পোর্টালে (psc.wb.gov.in) ভিজিট করুন।", "নতুন ওটিআর (One Time Registration) সম্পন্ন করুন অথবা পুরোনো আইডি দিয়ে লগইন করুন।", "অ্যাক্টিভ নোটিফিকেশন থেকে ক্লাকশিপ বা ফুড এসআই বা মিসলেনিয়াস সিলেক্ট করে অ্যাপ্লিকেশন ফর্ম ফিলাপ করুন।", "নির্ভুলভাবে ছবি, স্বাক্ষর ও প্রামাণ্য নথিপত্র আপলোড করে সাবমিট করুন ও ফর্ম ডাউনলোড করুন।"], officialUrl: "https://psc.wb.gov.in" },
                    { id: "job_police", title: "পশ্চিমবঙ্গ পুলিশ কনস্টেবল", subtitle: "WBP Constable Recruit", cat: "jobs", badge: "WBPB", btnText: "পুলিশ নিয়োগ", description: "পশ্চিমবঙ্গ পুলিশ রিক্রুটমেন্ট বোর্ড দ্বারা কনস্টেবল এবং সাব-ইন্সপেক্টর পদে সরাসরি পুরুষ এবং মহিলা প্রার্থী নিয়োগ আবেদন।", steps: ["পশ্চিমবঙ্গ পুলিশ রিক্রুটমেন্ট বোর্ড (prb.wb.gov.in) অফিশিয়াল ওয়েবপেজটি খুলুন।", "চলতি রিক্রুটমেন্ট ট্যাবে 'Apply Online' বাটনে ক্লিক করুন।", "ব্যক্তিগত তথ্য, শিক্ষাগত যোগ্যতা এবং পছন্দের পরীক্ষার জেলা সিলেক্ট করুন।", "পাসপোর্ট সাইজ রঙিন ছবি এবং স্বাক্ষর স্ক্যান করে আপলোড করুন ও সাবমিট করুন।"], officialUrl: "https://prb.wb.gov.in" },
                    { id: "job_tet", title: "WB Primary TET ও শিক্ষকতা", subtitle: "Primary Teacher Eligibility Test", cat: "jobs", badge: "WBBPE", btnText: "টেট আবেদন", description: "পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ দ্বারা প্রাথমিকে শিক্ষক নিয়োগ সংক্রান্ত টেট শংসাপত্র ও সরাসরি বিজ্ঞপ্তির ফর্ম ফিলআপ।", steps: ["প্রাথমিক শিক্ষা পর্ষদের অফিশিয়াল সাইট (wbbprimaryeducation.org) খুলুন।", "'TET Query & Application' ট্যাবে গিয়ে আপনার মোবাইল ও আধার বিবরণ দিয়ে সাইন ইন করুন।", "আপনার শিক্ষকতার প্রশিক্ষণ (D.El.Ed / B.Ed) ও শিক্ষাগত শংসাপত্র কপি আপলোড করুন।", "আবেদন ফি অনলাইনে পেমেন্ট করে চূড়ান্ত ক্যানডিডেট কপি সংগ্রহে রাখুন।"], officialUrl: "https://www.wbbprimaryeducation.org" },
                    { id: "job_ssc", title: "WB School Service Commission", subtitle: "Assistant Teacher & Group C/D", cat: "jobs", badge: "WBSSC", btnText: "এসএসসি পোর্টাল", description: "পশ্চিমবঙ্গ স্কুল সার্ভিস কমিশন দ্বারা রানিং স্কুলের মাধ্যমিক ও উচ্চ মাধ্যমিক স্তরে শিক্ষক ও শিক্ষাকর্মী নতুন নিয়োগ প্রক্রিয়ার পোর্টাল।", steps: ["স্কুল সার্ভিস কমিশন (westbengalssc.com) পোর্টাল খুলুন।", "নতুন নিয়োগ আবেদনের অনলাইন লিংকে ক্লিক করুন বা অ্যাডভার্টাইজ তালিকা বাছুন।", "রোল নম্বর ও রেজিস্ট্রেশন দিয়ে লগইন করে নির্দেশাবলী অনুযায়ী ফর্ম ফিলাপ করুন।", "আবেদন ফি সাবমিট করে চূড়ান্ত ডিক্লারেশন সাবমিট করে পৃষ্ঠা প্রিন্ট করে রাখুন।"], officialUrl: "http://www.westbengalssc.com" },
                    { id: "job_msc", title: "মিউনিসিপ্যাল কর্পোরেশন চাকরি", subtitle: "Municipal Service Recruit", cat: "jobs", badge: "MSCWB", btnText: "পৌরসভা চাকরি", description: "কলকাতা পৌরনিগম ও রাজ্যের বিভিন্ন পৌরসভায় সাব-অ্যাসিস্ট্যান্ট ইঞ্জিনিয়ার, ক্লার্ক ও গ্রুপ-ডি পদের সরাসরি নিয়োগের তথ্য।", steps: ["পৌর নিয়োগ বোর্ড (mscwb.org) সাইটটি খুলুন।", "নতুন অ্যাকাউন্ট নিবন্ধন সম্পন্ন করে 'Apply online for active advertisements' ক্লিক করুন।", "আপনার শিক্ষাগত যোগ্যতা ও কাজের অভিজ্ঞতা সঠিক তথ্য দিয়ে ড্রাফট করুন ও নথিপত্র আপলোড করুন।", "অনলাইন নেট ব্যাংকিং বা ইউপিআই দিয়ে আবেদন ফি জমা করে পে স্লিপ এবং ফর্মটি ডাউনলোড করুন।"], officialUrl: "https://www.mscwb.org" },
                    { id: "job_health", title: "স্বাস্থ্য দপ্তর কর্মী নিয়োগ", subtitle: "WB Health Recruitment Board", cat: "jobs", badge: "WBHRB", btnText: "স্বাস্থ্য নিয়োগ", description: "পশ্চিমবঙ্গ স্বাস্থ্য ও পরিবার কল্যাণ দপ্তরের অধীনে ডাক্তার, স্টাফ নার্স, মেডিকেল টেকনিশিয়ান পদে সরাসরি বিজ্ঞপ্তির আবেদন পদ্ধতি।", steps: ["স্বাস্থ্য নিয়োগ বোর্ড (hrb.wb.gov.in) পোর্টালে ভিজিট করুন।", "ইমেইল ও মোবাইল দিয়ে পোর্টাল রেজিস্ট্রেশন সম্পন্ন করুন ও ওটিপি ভেরিফাই করুন।", "আপনার নার্সিং কাউন্সিল বা ওয়েস্ট বেঙ্গল ডেন্টাল কাউন্সিল সার্টিফিকেশন এবং শিক্ষাগত মার্কশিট আপলোড করুন।", "সব তথ্য পুনরায় ভেরিফাই করে অনলাইন সার্ভারে সাবমিট করুন ও প্রিন্টআউট নিন।"], officialUrl: "https://www.hrb.wb.gov.in" },
                    
                    // Student Scholarships (scholarships)
                    { id: "sc_svmcm", title: "স্বামী বিবেকানন্দ স্কলারশিপ", subtitle: "SVMCM Merit Scholarship", cat: "scholarships", badge: "WBHED", btnText: "SVMCM পোর্টাল", description: "মেধাবী শিক্ষার্থীদের জন্য পশ্চিমবঙ্গ উচ্চশিক্ষা দপ্তরের বাৎসরিক ১২,০০০ থেকে ৯৬,০০০ টাকার স্কলারশিপের ফর্ম ফিলাপ পোর্টাল।", steps: ["স্বামী বিবেকানন্দ পোর্টাল (svmcm.wbhed.gov.in) ওপেন করুন।", "Fresh Application ট্যাবে গিয়ে আধার ও সর্বশেষ বোর্ড পরীক্ষার মার্কশিট আপলোড করুন (৬০% নম্বর আবশ্যক)।", "পারিবারিক বার্ষিক আয়ের ঘোষণা ও ব্যাংক পাসবই কপি স্ক্যান করুন।", "প্রতিষ্ঠানের আইডি দিয়ে ভেরিফাই সম্পন্ন হলে সরাসরি ব্যাংক অ্যাকাউন্টে টাকা ঢুকবে।"], officialUrl: "https://svmcm.wbhed.gov.in/" },
                    { id: "sc_oasis", title: "ওএসিস কাস্ট স্কলারশিপ", subtitle: "OASIS SC/ST/OBC Relief", cat: "scholarships", badge: "BCW Dept", btnText: "ওএসিস পোর্টাল", description: "তপশিলি জাতি, উপজাতি এবং অনগ্রসর ছাত্রছাত্রীদের জন্য বাৎসরিক পোস্ট-মেট্রিক স্কলারশিপের ডিজিটাল আবেদন।", steps: ["ওএসিস অফিসিয়াল স্কলারশিপ পোর্টাল (oasis.gov.in) ওপেন করে 'Student Registration' করুন।", "আপনার জেলা ও কাস্ট সার্টিফিকেটের নম্বর দিয়ে প্রোফাইল রেজিস্টার করুন।", "ইনস্টিটিউট প্রোফাইল ও কোর্স বিবরণ পূরণ করে আবেদন প্রিন্টআউট নিন।", "প্রিন্টআউট ও প্রয়োজনীয় প্রশংসাপত্র প্রতিষ্ঠানে ভেরিফিকেশনের জন্য জমা দিন।"], officialUrl: "https://oasis.gov.in/" },
                    { id: "sc_aikyashree", title: "ঐক্যশ্রী সংখ্যালঘু স্কলারশিপ", subtitle: "Aikyashree Minorities", cat: "scholarships", badge: "WBMDFC", btnText: "ঐক্যশ্রী পোর্টাল", description: "পশ্চিমবঙ্গের সংখ্যালঘু মুসলিম, শিখ, খ্রিস্টান, বৌদ্ধ ছাত্রছাত্রীদের জন্য ঐক্যশ্রী যোজনার অধীনে স্কলারশিপ পোর্টাল।", steps: ["WBMDFC স্কলারশিপ ওয়েবসাইটটিতে গিয়ে 'Minority Scholarship' সিলেক্ট করুন।", "শিক্ষা স্তর প্রাক-মেট্রিক বা পোস্ট-মেট্রিক অনুযায়ী ফর্ম সাবমিশন প্রক্রিয়া শুরু করুন।", "ব্যাংক একাউন্ট ডিটেলস ও আধার নম্বর ভেরিফাই করুন।", "ইনস্টিটিউট লগইন ভেরিফাই করার পর আপনার একাউন্টে ডিরেক্ট টাকা পাঠানো হবে।"], officialUrl: "https://wbmdfcscholarship.org/" },
                    { id: "sc_nabanna", title: "নবান্ন মুখ্যমন্ত্রী ত্রাণ তহবিল", subtitle: "Chief Minister's Relief Fund", cat: "scholarships", badge: "WB Govt", btnText: "নবান্ন আবেদন", description: "পশ্চিমবঙ্গ সরকারের মুখ্যমন্ত্রী ত্রাণ তহবিল থেকে মেধাবী অসচ্ছল ছাত্রছাত্রীদের এককালীন ১০,০০০ টাকার আর্থিক সাহায্য।", steps: ["মুখ্যমন্ত্রী সচিবালয় বা নবান্ন অফিসিয়াল অ্যাপ্লিকেশনে 'Apply for Financial Assistance for Education' এ যান।", "আপনার পরিবারের বাৎসরিক আয়ের প্রশংসাপত্র ও বিধায়ক বা মন্ত্রীর রেকমেন্ডেশন লেটার আপলোড করুন।", "নিজের ও অভিভাবকের আধার কার্ড সহ সর্বশেষ মার্কশিট সংযুক্ত করুন।", "অফিসিয়াল হার্ডকপি সরাসরি নবান্ন বা উত্তরণ ডেস্কে ব্যক্তিগত বা কুরিয়ারে জমা করতে হয়।"], officialUrl: "https://wbcmo.gov.in" },
                    
                    // Social Welfare Schemes (welfare)
                    { id: "s_lakshmir", title: "লক্ষ্মীর ভাণ্ডার প্রকল্প", subtitle: "Lakshmir Bhandar WB", cat: "welfare", badge: "WCD&SW", btnText: "লক্ষ্মীর ভাণ্ডার", description: "পশ্চিমবঙ্গ সরকারের অন্যতম জনপ্রিয় সামাজিক প্রকল্প যা উপার্জনকারী নারীদের প্রতি মাসে ১০০০ বা ১২০০ টাকা নগদ সাহায্য দিয়ে স্বাবলম্বী করে।", steps: ["দুয়ারে সরকার ক্যাম্প বা পঞ্চায়েত অফিস থেকে কুপন সংবলিত ইউনিক ফর্ম সংগ্রহ করুন।", "স্বাস্থ্য সাথী কার্ড, আধার কার্ড ও ব্যাংক পাসবুক জেরক্স দিয়ে ফর্মটি সুন্দরভাবে পূরণ করুন।", "বিডিও বা ক্যাম্প ভেরিফিকেশন অফিসারকে ফর্ম এবং নথি জমা করে প্রাপ্তি রসিদ (Acknowledgement) লিন।", "অনুমোদনের পর প্রতি মাসের ১-১০ তারিখের মধ্যে টাকা সরাসরি ব্যাংক একাউন্টে ঢুকে যাবে।"], officialUrl: "https://socialsecurity.wb.gov.in/" },
                    { id: "s_krishak", title: "কৃষক বন্ধু (নতুন) প্রকল্প", subtitle: "Krishak Bandhu Financial Aid", cat: "welfare", badge: "Krishi Dept", btnText: "কৃষক বন্ধু", description: "পশ্চিমবঙ্গের কৃষকদের চাষাবাদের আর্থিক সাহায্য এবং ২ লক্ষ টাকার জীবন বিমা কভারেজ প্রদান করার কৃষি প্রকল্প।", steps: ["নিকটবর্তী কৃষি অধিকর্তা (ADAI) বা দুয়ারে সরকার ক্যাম্পে গিয়ে ফর্ম সংগ্রহ করুন।", "জমির বর্তমান পর্চা (খতিয়ান রেকর্ড), আধার, ভোটার ও ব্যাংক পাসবুক জেরক্স সংযুক্ত করুন।", "কৃষি আধিকারিক দ্বারা আপনার তথ্য নিবন্ধিত ও স্যাংশন সম্পন্ন করুন।", "খরিফ ও রবি মরশুমের পূর্বে দুটি কিস্তিতে টাকা অ্যাকাউন্টে জমা হবে।"], officialUrl: "https://krishakbandhu.wb.gov.in/" },
                    { id: "s_kanyashree", title: "কন্যাশ্রী প্রকল্প (K1/K2)", subtitle: "Kanyashree Girl Support", cat: "welfare", badge: "WB Govt", btnText: "কন্যাশ্রী", description: "বাল্যবিবাহ রোখার উদ্দেশ্যে শিক্ষাপ্রতিষ্ঠানে পড়ুয়া ১৩-১৮ বছর মেয়েদের বাৎসরিক এবং ১৮ বছরে এককালীন ২৫,০০০ টাকার প্রকল্প।", steps: ["আপনার পড়তে থাকা বিদ্যালয় বা কলেজ অফিস থেকে কন্যাশ্রী ফর্ম এবং আইডি নম্বর সংগ্রহ করুন।", "ছাত্রীর নিজস্ব সিঙ্গেল ব্যাংক সেভিংস অ্যাকাউন্টের পাসবুক এবং আধার কার্ড ফটোকপি সংযুক্ত করুন।", "অবিবাহিত থাকার স্বঘোষণাপত্র ও অভিভাবকের স্বাক্ষর সহ স্কুলে ফর্মটি জমা করুন।", "স্কুল প্রধান ফর্মটি অনলাইনে ভেরিফাই করলেই আপনার টাকা বরাদ্দ হবে।"], officialUrl: "https://www.wbkanyashree.gov.in/" },
                    { id: "s_rupashree", title: "রূপশ্রী বিবাহের অনুদান", subtitle: "Rupashree Marriage Grant", cat: "welfare", badge: "Social Welfare", btnText: "রূপশ্রী গাইড", description: "দরিদ্র পরিবারের মেয়েদের বিয়ের খরচ মেটাতে পশ্চিমবঙ্গ সরকারের ২৫,০০০ টাকার এককালীন বিয়ের আগে আর্থিক সাহায্য।", steps: ["বিয়ের প্রস্তাবিত তারিখের ন্যূনতম ৩০ দিন আগে স্থানীয় বিডিও বা মিউনিসিপালিটি অফিসে ফর্ম জমা করতে হবে।", "মেয়ের বয়স ১৮+ ও বরের বয়স ২১+ প্রমাণপত্র (মাধ্যমিক অ্যাডমিট/বার্থ সার্টিফিকেট) জেরক্স যোগ করুন।", "বিয়ের কার্ড, প্রস্তাবিত বিয়ের স্থান প্রমাণ ও পারিবারিক আয়ের স্বঘোষণাপত্র দিন।", "যাচাইকরণ সফল হলে বিয়ের অন্তত ৫ দিন পূর্বে মেয়ের নিজস্ব ব্যাংক অ্যাকাউন্টে ২৫,০০০ টাকা ঢুকে যাবে।"], officialUrl: "https://www.wbrupashree.gov.in/" },
                    { id: "s_ssy", title: "সামাজিক সুরক্ষা যোজনা (BM-SSY)", subtitle: "Bina Mulya Samajik Suraksha", cat: "welfare", badge: "Labour Dept", btnText: "সামাজিক সুরক্ষা", description: "অসংগঠিত ক্ষেত্রের শ্রমিক, রিকশাচালক ও দিনমজুরদের ভবিষ্যৎ ক্যাশলেস চিকিৎসা এবং দুর্ঘটনা পেনশনের রাজ্য প্রকল্প।", steps: ["শ্রমিক কল্যাণ দপ্তরের পোর্টালে (bmssy.wblabour.gov.in) ভিজিট করুন।", "আপনার ভোটার কার্ড, আধার, রেশন কার্ড ও পেশাগত নামের স্বঘোষণা পত্র নিয়ে রেজিস্ট্রেশন করুন।", "নমিনিদের বিবরণ এবং একটি সচল ব্যাংক পাসবুকের ফ্রন্ট পেজের কপি আপলোড করুন।", "মিউনিসিপ্যালিটি বা পঞ্চায়েতের অনুমোদনের পর লেবার ওয়েলফেয়ার থেকে ই-কার্ড বা বই পেয়ে যাবেন।"], officialUrl: "https://bmssy.wblabour.gov.in/" },
                    
                    // West Bengal Land Records (land)
                    { id: "land_record", title: "বাংলারভূমি পরচা ও খতিয়ান", subtitle: "Banglarbhumi Land Records", cat: "land", badge: "L&LR Dept", btnText: "বাংলারভূমি", description: "পশ্চিমবঙ্গ সরকারের ভূমি ও ভূমি সংস্কার দপ্তরের মাধ্যমে অনলাইনে রেকর্ড অফ রাইট বা খতিয়ান পরচা এবং আরএস-এলআর মাপ দেখা।", steps: ["বাংলারভূমি অফিসিয়াল পোর্টাল (banglarbhumi.gov.in) এ গিয়ে 'Know Your Property' খুলুন।", "আপনার সংশ্লিষ্ট জেলা, ব্লক এবং মৌজা সঠিক খতিয়ান নং বা দাগ নং দিয়ে সার্চ করুন।", "ক্যাপচা কোড এন্টার করে মুহূর্তেই পরচা ও জমির মিউটেশন বিবরণ দেখে নিন।", "সার্টিফায়েড ডিজিটাল কপি ডাউনলোড করতে আইডি ক্রিয়েট করে ন্যূনতম ফি পে করুন।"], officialUrl: "https://banglarbhumi.gov.in/" },
                    { id: "land_deed", title: "দলিল পঞ্জীকরণ ও রেজিস্ট্রেশন", subtitle: "Search & Register Deed", cat: "land", badge: "Registration", btnText: "দলিল রেজিস্ট্রি", description: "জমির ফিজিক্যাল দলিলের মার্কেট ভ্যালু চেক এবং অনলাইনে ই-দলিল খোজা বা নতুন দলিল খসড়া তৈরি করা পোর্টাল।", steps: ["ডাইরেক্টরেট অফ রেজিস্ট্রেশন সার্ভিস (wbregistration.gov.in) পোর্টাল ওপেন করুন।", "'Market Value of Land' এ দাগ ও খতিয়ান দিয়ে জমির বর্তমান বাজারমূল্য জেনে নিন।", "নতুন ক্রয়ের ক্ষেত্রে ই-দলিল খসড়া সাবমিট করে স্ট্যাম্প ডিউটি হিসেব করতে পারেন।", "সম্পন্ন দলিলের সার্টিফায়েড অনুলিপি দেখতে 'Search Your Deed' অপশনে গিয়ে ক্রেতা/বিক্রেতার নাম দিন।"], officialUrl: "https://wbregistration.gov.in/" },
                    { id: "land_mutation", title: "মিউটেশন ও কনভার্সন", subtitle: "Mutation & Conversion", cat: "land", badge: "L&LR Portal", btnText: "মিউটেশন গাইড", description: "ক্রয়কৃত জমির নাম সংশোধন বা রেকর্ড নিজের নামের করার জন্য অনলাইন মিউটেশন বা জমির শ্রেণী বদল (শ্রেণী পরিবর্তন)।", steps: ["বাংলারভূমি পোর্টালে নিজের ইউজার রেজিস্টার সম্পন্ন করে Citizen Services এ যান।", "'Online Application' ট্যাব থেকে 'Mutation Application' সিলেক্ট করে ফর্ম পূরণ করুন।", "রেজিস্টার ডিড (দলিল কপি), বিক্রেতার পর্চা এবং সেল ডিডের প্রথম ৭ পাতার কপি আপলোড করুন।", "অনলাইনে প্রসেস চার্জ পেমেন্ট সম্পন্ন করে হেয়ারিং এর নোটিশের জন্য অপেক্ষা করুন ও বিএলআরও অফিসে জমা দিন।"], officialUrl: "https://banglarbhumi.gov.in/" },
                    { id: "land_revenue", title: "খাজনা ও অনলাইন ল্যান্ড ট্যাক্স", subtitle: "Land Revenue (Khajna)", cat: "land", badge: "WB Revenue", btnText: "অনলাইন খাজনা", description: "পশ্চিমবঙ্গে কৃষিজমি বা ডাঙ্গা জমির বার্ষিক ল্যান্ড রেভিনিউ বা খাজনা অনলাইনে জমা করে কিস্তিবন্ডী টিকিট বা রসিদ পাওয়া।", steps: ["বাংলারভূমি পোর্টালে নাগরিক লগইন সম্পন্ন করে 'Land Revenue Application' ক্লিক করুন।", "আপনার জমির বিবরণ ও পূর্ববর্তী খাজনার শেষ বছরের রসিদের তথ্য ইনপুট করুন।", "বকেয়া হিসেব দেখার পর আপনার মোবাইল নম্বরে ওটিপি দিয়ে কনফার্ম করুন।", "নেট ব্যাংকিং বা জিআরআইপিএস (GRIPS) দিয়ে অনলাইন খাজনা পে করে তৎক্ষণাৎ খাজনা দাখিলা ডাউনলোড করুন।"], officialUrl: "https://banglarbhumi.gov.in/" },
                    
                    // West Bengal Digital Health Services (health)
                    { id: "srv12", title: "ABHA হেলথ আইডি", subtitle: "Digital Health ID", cat: "health", badge: "NHA India", btnText: "হেলথ কার্ড", description: "আয়ুষ্মান ভারত পোর্টালের সাহায্যে নাগরিকদের ডিজিটাল হেলথ লকার বা ১৪ সংখ্যার অনন্য এবিএইচএ নম্বর প্রাপ্তির গাইড।", steps: ["ABHA অফিসিয়াল পোর্টাল খুলুন ও আপনার আধার নম্বর ইনপুট করুন।", "আধার লিংকড মোবাইলে আসা ওটিপি দিয়ে বিবরণ মিলিয়ে নিন।", "পছন্দসই স্বাস্থ্য সচল কোড তৈরি করুন।", "মুহূর্তেই আপনার ABHA ডিজিটাল হেলথ ইউনিক কার্ড ডাউনলোড করুন।"], officialUrl: "https://abha.abdm.gov.in/" },
                    { id: "srv_swasthya", title: "স্বাস্থ্য সাথী কার্ড", subtitle: "Swasthya Sathi", cat: "health", badge: "WB Govt Health", btnText: "স্বাস্থ্য বীমা", description: "প্রতি পরিবারে বাৎসরিক ৫ লক্ষ টাকা পর্যন্ত ক্যাশলেস আধুনিক চিকিৎসা পরিষেবার জন্য স্বাস্থ্য সাথী কার্ড গাইড।", steps: ["আপনার পরিবারের আধার ও রেশন কার্ড বিবরণ সহ আবেদন ফর্ম-বি পূরণ করুন।", "দুয়ারে সরকার ক্যাম্প বা স্থানীয় পঞ্চায়েত অফিসে ফর্মটি জমা দিন।", "নির্ধারিত তারিখে বায়োমেট্রিক ও ছবি তোলার ক্যাম্পে সপরিবারে উপস্থিত থাকুন।", "অনুমোদনের পর পরিবারের মহিলা কর্ত্রীর নামে ৫ লক্ষ টাকার বীমা কার্ড ইস্যু করা হবে।"], officialUrl: "https://swasthyasathi.gov.in/" }
                  ]
                    .filter((item) => docCategory === "all" || item.cat === docCategory)
                    .map((item) => {
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            const srvObj = SERVICES_DATA.find((u) => u.id === item.id);
                            if (srvObj) {
                              setSelectedService(srvObj);
                            } else {
                              setSelectedService({
                                id: item.id,
                                title: item.title,
                                description: (item as any).description || `${item.title} সংক্রান্ত নির্দেশিকা ও অনলাইন আবেদন পদ্ধতি।`,
                                steps: (item as any).steps || [
                                  "অফিসিয়াল সরকারী পোর্টালে ভিজিট করুন।",
                                  "মোবাইল ও আধার ওটিপি দিয়ে সিটিজেন লগইন সম্পন্ন করুন।",
                                  "প্রয়োজনীয় নথিপত্র আপলোড করে আবেদনপত্র সাবমিট করুন।"
                                ],
                                officialUrl: (item as any).officialUrl || "https://wb.gov.in"
                              });
                            }
                          }}
                          className="relative bg-white border border-slate-200/80 rounded-2xl p-3 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 duration-300 flex flex-col justify-between h-[155px] overflow-hidden group select-none hover:border-orange-250/90"
                        >
                          {/* Glow Gradient Stripe on Top simulating Real Plastic Smartcard overlay */}
                          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-400 opacity-80" />

                          <div className="space-y-2">
                            {/* Top Header Row of Card: Official Icon + Gold Chip */}
                            <div className="flex items-center justify-between">
                              {/* SVG Logo container */}
                              <div className="group-hover:scale-108 transition-transform duration-250 shrink-0">
                                {renderOfficialLogo(item.id)}
                              </div>

                              {/* Holographic Smartcard Golden Microchip & Dept Initials */}
                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="text-[7.5px] font-extrabold text-slate-400 bg-slate-50 px-1 py-0.2 rounded-sm uppercase tracking-wider font-mono">
                                  {item.badge}
                                </span>
                                
                                {/* Glowing Embedded Microchip Graphic */}
                                <div className="w-5.5 h-4 rounded-sm bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-200 border border-amber-400 p-[1.5px] flex flex-col justify-between relative overflow-hidden shrink-0 shadow-3xs">
                                  <div className="h-[0.5px] bg-amber-700/30 w-full" />
                                  <div className="flex justify-between">
                                    <div className="w-[0.5px] bg-amber-700/30 h-full" />
                                    <div className="w-1.5 h-1.5 rounded-full border border-amber-700/20 bg-amber-200/40" />
                                    <div className="w-[0.5px] bg-amber-700/30 h-full" />
                                  </div>
                                  <div className="h-[0.5px] bg-amber-700/30 w-full" />
                                </div>
                              </div>
                            </div>

                            {/* Titles inside the card */}
                            <div className="pt-1.5">
                              <h4 className="font-extrabold text-[12px] md:text-[12.5px]/[13px] text-slate-800 leading-tight tracking-tight group-hover:text-bengali-orange transition-colors duration-200 line-clamp-1">
                                {item.title}
                              </h4>
                              <p className="text-[9.5px] text-slate-400 font-mono tracking-wider leading-none mt-0.5 uppercase">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Card bottom footer with compact CTA */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[8.5px] font-extrabold text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-md">
                              {item.btnText}
                            </span>
                            <span className="text-[9px] font-black text-bengali-orange flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform duration-200">
                              আবেদন →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>

        </>
      )}

      </main>

      {/* 4. PREMIUM FOOTER TRUST BADGES CONTAINER */}
      <section className="bg-warm-cream/90 border-y border-orange-100 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center text-xs">
          <div className="space-y-1.5">
            <CheckCircle2 className="h-6 w-6 text-orange-600 mx-auto" />
            <h5 className="font-bold text-slate-800">১০০% নির্ভরযোগ্য তথ্য</h5>
            <p className="text-[10px] text-slate-500">সরকারি অফিশিয়াল সোর্স থেকে প্রামাণ্য নথির সংগ্রহ</p>
          </div>
          <div className="space-y-1.5">
            <Zap className="h-6 w-6 text-amber-500 mx-auto" />
            <h5 className="font-bold text-slate-800">সহজ ও দ্রুত</h5>
            <p className="text-[10px] text-slate-500">জটিল ইংরেজি পরিভাষা এড়িয়ে সহজ ভাষায় বাংলা গাইড</p>
          </div>
          <div className="space-y-1.5">
            <Clock className="h-6 w-6 text-indigo-600 mx-auto" />
            <h5 className="font-bold text-slate-800">আপডেটেড তথ্য</h5>
            <p className="text-[10px] text-slate-500">নিয়মিত আবেদন ডেট ও শেষ সময় সতর্কবার্তা</p>
          </div>
          <div className="space-y-1.5">
            <Bot className="h-6 w-6 text-[#A94F12] mx-auto animate-pulse" />
            <h5 className="font-bold text-slate-800">এআই সহায়ক</h5>
            <p className="text-[10px] text-slate-500">যেকোনো প্রশ্ন জিজ্ঞেস করার ২৪x৭ এআই চ্যাট জিপিটি</p>
          </div>
          <div className="space-y-1.5 col-span-2 md:col-span-1">
            <Shield className="h-6 w-6 text-emerald-600 mx-auto" />
            <h5 className="font-bold text-slate-800">নিরাপদ ড্যাশবোর্ড</h5>
            <p className="text-[10px] text-slate-500">আপনার সংরক্ষিত পোর্টালে ব্যক্তিগত ডেটা সম্পূর্ণ নিরাপদ</p>
          </div>
        </div>
      </section>

      {/* 5. USER DISCLAIMER BAR (STRICT ASSIGNED TEXT) */}
      <footer className="bg-[#1E3A5F] text-white py-8 px-6 border-t border-slate-900/40 text-xs text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-4 text-white/50 text-[11px] mb-2 font-medium">
            <button onClick={() => setActiveLegalModal("terms")} className="hover:text-white transition-colors cursor-pointer focus:outline-hidden">পরিষেবা নির্দেশিকা</button>
            <span>•</span>
            <button onClick={() => setActiveLegalModal("disclaimer")} className="hover:text-white transition-colors cursor-pointer focus:outline-hidden">আইনী নোটিশ</button>
            <span>•</span>
            <button onClick={() => setActiveLegalModal("privacy")} className="hover:text-white transition-colors cursor-pointer focus:outline-hidden">গোপনীয়তা নীতি</button>
          </div>
          <p className="leading-relaxed text-slate-300 font-medium">
            "বাংলার সরকার কোনো সরকারি ওয়েবসাইট নয়। আমরা শুধুমাত্র বিভিন্ন সরকারি পরিষেবা, প্রকল্প, চাকরি এবং স্কলারশিপ সংক্রান্ত অফিসিয়াল তথ্য ও লিংক একত্রে প্রদান করি। সকল আবেদন সংশ্লিষ্ট অফিসিয়াল ওয়েবসাইটে সম্পন্ন হয়।"
          </p>
          <p className="text-[10px] text-slate-400 font-mono pt-2 border-t border-white/5">
            © 2026 বাংলার সরকার সিটিজেন গাইডস ট্রাস্ট। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>

      {/* ========================================================
          MODAL OVERLAYS AND INTERACTIVE POPUPS (COMPREHENSIVE)
         ======================================================== */}

      {/* MODAL 1: SCHEME DETAILS DIALOG WINDOW */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-[650px] max-h-[85vh] overflow-y-auto border border-orange-50 shadow-2xl">
            {/* Modal Head */}
            <div className="bg-gradient-to-r from-bengali-orange to-[#8D3F0D] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-white/20 text-white font-bold p-1 rounded-full uppercase">
                  {selectedScheme.categoryName}
                </span>
                <h3 className="font-bold text-lg md:text-xl text-white mt-1.5">{selectedScheme.title}</h3>
              </div>
              <button onClick={() => setSelectedScheme(null)} className="text-white hover:bg-white/10 rounded-lg p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 border-b border-orange-100 pb-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-bengali-orange block"></span>
                  প্রকল্পের মূল বিবরণ:
                </h4>
                <p className="text-slate-650 font-normal">{selectedScheme.description}</p>
              </div>

              <div className="space-y-2 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <h4 className="font-extrabold text-bengali-orange flex items-center gap-1.5">
                  <StarIcon className="h-4 w-4 shrink-0" />
                  পাওয়া অনুদান বা সুযোগ-সুবিধা:
                </h4>
                <p className="text-slate-800 font-medium">{selectedScheme.benefits}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 border-b border-orange-100 pb-1">আবেদনের আবশ্যিক যোগ্যতা:</h4>
                <p className="text-slate-650 font-normal">{selectedScheme.eligibility}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 border-b border-orange-100 pb-1 flex items-center gap-1.5">
                  <span>চেকলিস্ট: আবশ্যিক প্রামাণ্য নথিসমূহ:</span>
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-650 text-xs">
                  {selectedScheme.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="h-4 w-4 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0">✓</span>
                      <span className="truncate">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-disclaimer inside details */}
              <div className="bg-slate-100 px-4 py-3 rounded-lg border border-slate-200 text-xs text-slate-500">
                <strong>গুরুত্বপূর্ণ তথ্য:</strong> অনুগ্রহ করে মনে রাখবেন যে বাংলার সরকার কোনো অফিসিয়াল সরকারি সংস্থা নয়। আপনার নথিসমূহ নিয়ে অফিশিয়াল সরকারি পোর্টালেই আবেদন জমা দিন।
              </div>
            </div>

            {/* Modal foot */}
            <div className="bg-slate-50 p-4 border-t border-slate-150 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  toggleSaveScheme(selectedScheme.id);
                  setSelectedScheme(null);
                }}
                className={`text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-2 border transition-colors ${
                  savedSchemeIds.includes(selectedScheme.id)
                    ? "bg-orange-50 border-orange-200 text-bengali-orange"
                    : "border-slate-300 hover:bg-slate-100/50"
                }`}
              >
                <Bookmark className="h-4 w-4" />
                <span>{savedSchemeIds.includes(selectedScheme.id) ? "সংরক্ষিত আছে" : "বুকমার্ক সংরক্ষণ করুন"}</span>
              </button>
              <a
                href={selectedScheme.officialUrl}
                target="_blank"
                rel="noreferrer referrer"
                className="text-xs font-semibold py-2 px-5 bg-bengali-orange text-white hover:bg-orange-bengali-orange-hover rounded-lg flex items-center gap-1 shadow-sm transition-transform active:scale-95 text-center leading-none"
              >
                <span>অফিশিয়াল ওয়েবসাইটে যান</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: JOB VACANCY DETAILS DIALOG */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[85vh] overflow-y-auto border border-emerald-50 shadow-2xl">
            {/* Job head */}
            <div className="bg-indigo-950 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-white/20 text-indigo-200 font-bold p-1 rounded-full uppercase tracking-wider">
                  {selectedJob.categoryName}
                </span>
                <h3 className="font-bold text-lg text-white mt-1.5">{selectedJob.title}</h3>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-white hover:bg-white/10 rounded-lg p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Job info list parameters */}
            <div className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-450 uppercase block font-semibold">কার্যকর শূন্যপদ:</span>
                  <span className="text-base font-bold text-[#1E3A5F]">{selectedJob.vacancy}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-450 uppercase block font-semibold">মাসিক বেতন / স্কেল:</span>
                  <span className="text-base font-bold text-emerald-800">{selectedJob.salary || "গ্রেড পে অনুযায়ী"}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900">আবশ্যক শিক্ষাগত যোগ্যতা এবং পরিমাপ:</h4>
                <p className="text-slate-650 bg-slate-50 p-3.5 rounded-xl border border-slate-100">{selectedJob.qualification}</p>
              </div>

              <div className="space-y-1 bg-red-50 text-red-900 p-3 rounded-xl border border-red-100 text-xs">
                <strong className="font-bold">আবেদনের সময়সীমা ও সতর্কতা:</strong>
                <p>সবচেয়ে দেরিতে আবেদনের তারিখ হল: <strong>{selectedJob.lastDate}</strong>। অনুগ্রহ করে নথির মাপকাঠি মিলিয়ে লাস্ট ডেইটের আগে রেজিস্ট্রেশন সাবমিট করুন।</p>
              </div>
            </div>

            {/* job modal foot */}
            <div className="bg-slate-50 p-4 border-t border-slate-150 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  toggleSaveJob(selectedJob.id);
                  setSelectedJob(null);
                }}
                className={`text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-2 border transition-colors ${
                  savedJobIds.includes(selectedJob.id)
                    ? "bg-slate-100 border-slate-300 text-emerald-700"
                    : "border-slate-300 hover:bg-slate-100/50"
                }`}
              >
                <Bookmark className="h-4 w-4" />
                <span>{savedJobIds.includes(selectedJob.id) ? "সংরক্ষিত আছে" : "বুকমার্ক সেভ করুন"}</span>
              </button>
              <a
                href={selectedJob.officialUrl}
                target="_blank"
                rel="noreferrer referrer"
                className="text-xs font-semibold py-2 px-5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg flex items-center gap-1 shadow-sm transition-transform active:scale-95"
              >
                <span>অফিশিয়াল নিয়োগ লিংকে যান</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: STEP-BY-STEP SERVICE ASSISTANCE MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-[550px] max-h-[85vh] overflow-y-auto border border-orange-50 shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-bengali-orange to-[#8D3F0D] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-white/20 text-white font-bold p-1 rounded-full uppercase tracking-wider">
                  নথিপত্র সেবা নির্দেশিকা
                </span>
                <h3 className="font-bold text-lg text-white mt-1">{selectedService.title}</h3>
              </div>
              <button onClick={() => setSelectedService(null)} className="text-white hover:bg-white/15 rounded-lg p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Details and Steps progress layout */}
            <div className="p-6 space-y-4 text-sm text-slate-700">
              <p className="text-slate-500 font-medium text-xs leading-normal">{selectedService.description}</p>
              
              <div className="space-y-3.5">
                <h4 className="font-extrabold text-slate-900 border-b border-orange-50 pb-1 text-xs uppercase tracking-wider text-slate-500">অনলাইন আবেদনের সহজ ধাপগুলি:</h4>
                <div className="space-y-3">
                  {selectedService.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="h-5 w-5 rounded-full bg-orange-100 text-bengali-orange font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-650 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Foot */}
            <div className="bg-slate-50 p-4 border-t border-slate-150 flex items-center justify-end">
              <a
                href={selectedService.officialUrl}
                target="_blank"
                rel="noreferrer referrer"
                className="text-xs font-semibold py-2 px-5 bg-bengali-orange text-white hover:bg-orange-bengali-orange-hover rounded-lg flex items-center gap-1 shadow-sm transition-transform active:scale-95"
              >
                <span>সরাসরি অফিসিয়াল পোর্টাল লিংক</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: PREMIUM SUBSCRIPTION WHATSAPP / TELEGRAM PROMPT POPUP */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-[420px] p-6 shadow-2xl border border-slate-100 relative">
            
            <button
              onClick={() => {
                setShowSubscriptionModal(false);
                setMobileNumber("");
                setSubTypeSuccess(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1"
            >
              <X className="h-5 w-5" />
            </button>

            {subSuccess ? (
              <div className="text-center py-6 space-y-3 animate-pulse">
                <div className="h-14 w-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl">✓</div>
                <h3 className="font-extrabold text-lg text-slate-900">সুপারিশ করা অ্যালার্ট সফল!</h3>
                <p className="text-xs text-slate-500 leading-normal px-2">
                  ধন্যবাদ! আপনার মোবাইল নম্বর সফলভাবে ভেরিফাই করা হয়েছে। এখন থেকে নতুন সামাজিক স্কিম এবং নিয়োগের সকল খবর নিয়মিত <strong>{subType}</strong> সঙ্কেত দ্বারা পাঠানো হবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribeSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${subType === "WhatsApp" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"}`}>
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-950 text-sm">বাংলার {subType} অ্যালার্ট একটিভ করুন</h3>
                    <p className="text-[10px] text-slate-500">তাৎক্ষণিক আপডেট নোটিফিকেশন সঙ্কেত</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600 block">আপনার ১০ সংখ্যার কার্যকর মোবাইল নাম্বার লিখুন *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">{subType === "WhatsApp" ? "+৯১" : "@"}</span>
                    <input
                      type="text"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/10 text-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full font-bold text-xs py-3 rounded-xl text-white transition-all shadow-sm active:scale-95 ${
                    subType === "WhatsApp" ? "bg-emerald-650 hover:bg-emerald-700 shadow-emerald-500/20" : "bg-sky-600 hover:bg-sky-700 shadow-sky-500/20"
                  }`}
                >
                  ফ্রি মেম্বারশিপ একটিভ করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 5: ALL SERVICES QUICK EXPLORER POPUP */}
      {showMoreServicesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-[720px] max-h-[85vh] overflow-y-auto border border-orange-100 shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-bengali-orange to-[#8D3F0D] text-white p-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
              <div>
                <h3 className="font-extrabold text-lg text-white">বাংলার নাগরিক সেবা ডিরেক্টরি (সমস্ত নথি ও পোর্টাল)</h3>
                <p className="text-[11px] text-orange-100 mt-1">মোট ১১+ জরুরি ডিজিটাল নাগরিক নথি গাইড ও আবেদনের সরাসরি লিংক</p>
              </div>
              <button
                onClick={() => setShowMoreServicesModal(false)}
                className="text-white hover:bg-white/15 rounded-lg p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List and Grid */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES_DATA.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      setSelectedService(srv);
                      setShowMoreServicesModal(false);
                    }}
                    className="bg-slate-50 hover:bg-orange-50/20 p-4 rounded-2xl border border-slate-200/60 cursor-pointer transition-all hover:border-orange-200 flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-500 block"></span>
                        <h4 className="font-extrabold text-xs text-slate-800 group-hover:text-bengali-orange transition-colors">
                          {srv.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-450 mt-1 lines-clamp-2 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-bengali-orange border-t border-slate-100 pt-2 mt-1">
                      <span>নির্দেশিকা দেখুন ↓</span>
                      <span className="text-slate-400 font-mono text-[9px]">ID: {srv.id}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer notice */}
              <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 text-xs text-[#8D3F0D] leading-relaxed">
                <strong>অনুগ্রহ করে সতর্ক থাকুন:</strong> এটি কোনো অফিশিয়াল সরকারি ওয়েব আবেদন কেন্দ্র নয়। গাইডলাইনসমূহ অনুসরণের পর কোনো তথ্য প্রদান বা পেমেন্ট শুধুমাত্র অফিসিয়াল সরকারি পোর্টালগুলোতে প্রবেশ করেই সম্পন্ন করবেন।
              </div>
            </div>

            {/* Sticky Foot */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end sticky bottom-0">
              <button
                onClick={() => setShowMoreServicesModal(false)}
                className="text-xs font-bold py-2 px-5 bg-slate-800 text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. AI CONVERSATIONAL FLOATING TRIGGER BUTTON REMOVED IN RESP TO USER REQUEST */}

      {/* AI Bot floating window interface */}
      <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      {/* MODAL: LEGAL, DISCLAIMER & PRIVACY DIALOG WINDOW */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-[650px] max-h-[85vh] overflow-hidden border border-orange-50 shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-400" />
                <h3 className="font-extrabold text-base md:text-lg text-white">
                  {activeLegalModal === "terms" && "পরিষেবা নির্দেশিকা (Terms of Service)"}
                  {activeLegalModal === "disclaimer" && "আইনী নোটিশ (Legal Disclaimer)"}
                  {activeLegalModal === "privacy" && "গোপনীয়তা নীতি (Privacy Policy)"}
                </h3>
              </div>
              <button 
                onClick={() => setActiveLegalModal(null)} 
                className="text-white bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-all cursor-pointer"
                title="বন্ধ করুন"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 text-sm text-slate-700 leading-relaxed overflow-y-auto">
              {activeLegalModal === "terms" && (
                <div className="space-y-4">
                  <div className="bg-orange-50/70 border border-orange-100 p-4 rounded-xl text-xs text-[#8D3F0D] font-medium leading-relaxed">
                    <strong>গুরুত্বপূর্ণ গাইডলাইন:</strong> এই নাগরিক নির্দেশিকা পোর্টালটি সম্পূর্ণ বিনামূল্যে এবং সাধারণ ব্যবহারের জন্য তৈরি। এটি ব্যবহারের আগে নিচের নিয়ামাবলী পড়ে নিন।
                  </div>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">১. সাধারণ ব্যবহার বিধি</h4>
                    <p className="text-slate-650">
                      "সব নথি ও সরকারি কার্ড গাইড" পোর্টালটি পশ্চিমবঙ্গের নাগরিকদের সুবিধার্থে বিভিন্ন প্রকল্প, স্কলারশিপ ও চাকরির নির্ভরযোগ্য তথ্য একসাথে এক ক্লিকে দেখার ব্যবস্থা করেছে। এই তথ্যগুলো ব্যবহার করে নাগরিকেরা স্বতঃস্ফূর্তভাবে দিকনির্দেশনা ও সরাসরি অফিশিয়াল লিংক পেতে পারেন।
                    </p>
                  </section>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">২. কোনো অফিশিয়াল লেনদেন নয়</h4>
                    <p className="text-slate-650">
                      আমাদের প্ল্যাটফর্মে কোনো সরকারি টাকা বা আবেদন ফি জমা নেওয়া হয় না এবং অফিশিয়াল আবেদনপত্র সরাসরি আমাদের সার্ভারে জমা হয় না। সকল আর্থিক কার্যক্রম ও ফর্ম ফিলাপ সংশ্লিষ্ট সরকারি বা দপ্তরীয় পোর্টালেই গিয়ে সম্পন্ন করতে হবে।
                    </p>
                  </section>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">৩. তথ্যগত নির্ভুলতা</h4>
                    <p className="text-slate-650">
                      আমরা সর্বদা সরকারি গেজেট, অফিশিয়াল নিয়োগ বিজ্ঞপ্তি এবং নির্ভরযোগ্য দাপ্তরিক সোর্সের ভিত্তিতে ডেটা আপডেট রাখতে সচেষ্ট থাকি। তবুও, আবেদন বা কোনো তথ্য পেশ করার পূর্বে অবশ্যই অফিসিয়াল পিডিফ বিজ্ঞপ্তি বা মূল সরকারি সাইটটি খতিয়ে দেখে নেওয়া নাগরিকের নিজ দায়িত্ব।
                    </p>
                  </section>
                </div>
              )}

              {activeLegalModal === "disclaimer" && (
                <div className="space-y-4">
                  <div className="bg-red-50/70 border border-red-105/40 p-4 rounded-xl text-xs text-red-850 font-bold leading-relaxed">
                    🚨 আইনী নোটিশ / অবমাননা পরিহার নোটিশ (Disclaimer)
                  </div>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">১. প্রাতিষ্ঠানিক অসংলগ্নতা</h4>
                    <p className="text-slate-650 font-bold">
                      "সব নথি ও সরকারি কার্ড গাইড" একটি সম্পূর্ণ স্বাধীন ব্যক্তিগত নাগরিক সহায়ক এবং তথ্য একত্রীকরণ ডিরেক্টরি। এটি পশ্চিমবঙ্গ সরকার (Govt of West Bengal), ভারত সরকার (Govt of India), বা কোনো সরকারি অফিস বা মন্ত্রণালয়ের সাথে অনুমোদিত, স্পনসরড বা কোনোভাবেই অফিশিয়ালভাবে যুক্ত নয়।
                    </p>
                  </section>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">২. ট্রেডমার্ক এবং লোগো স্বত্বাধিকার</h4>
                    <p className="text-slate-650">
                      অ্যাপ্লিকেশনটিতে প্রদর্শিত বা ব্যবহৃত সমস্ত সরকারি কার্ডের নাম, অফিশিয়াল লোগো, ডোমেন নেম এবং স্লোগানগুলি সংশ্লিষ্ট সরকারি দপ্তর, মন্ত্রণালয় ও ভারত সরকারের নিজস্ব মেধা সম্পদ। আমরা শুধুমাত্র সাধারণ নাগরিকদের সহজ নেভিগেশন ও সরাসরি অ্যাক্সেস সুবিধার্থে রেফারেন্স স্বরুপ এগুলি প্রদর্শন করেছি। এর থেকে কোনো বাণিজ্যিক বা কপিরাইট দাবি করা আমাদের কাম্য নয়।
                    </p>
                  </section>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">৩. দায়বদ্ধতা সীমা</h4>
                    <p className="text-slate-[#E96A1F]">
                      কোনো ব্যবহারকারী ভুল তথ্যের ভিত্তিতে বা কোনো জাল সাইট বা থার্ড-পার্টি লিঙ্কের জন্য ক্ষতিগ্রস্ত হলে আমাদের প্ল্যাটফর্ম বা এর ডেভেলপার পক্ষ আইনগতভাবে বা আর্থিকভাবে দায়বদ্ধ থাকবে না। সর্বদা ব্যবহারকারীকে নিশ্চিত করতে হবে যেন আবেদন লিঙ্কটি .gov.in বা .nic.in এ শেষ হয়।
                    </p>
                  </section>
                </div>
              )}

              {activeLegalModal === "privacy" && (
                <div className="space-y-4">
                  <div className="bg-emerald-50/70 border border-emerald-100 p-4 rounded-xl text-xs text-emerald-800 font-medium leading-relaxed">
                    🔒 আপনার ডেটার নিরাপত্তা আমাদের পরম অগ্রাধিকার। আমরা কোনো গোপন তথ্য সংগ্রহ করি না।
                  </div>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">১. শংসাপত্র ও ব্যক্তিগত নথি তথ্য</h4>
                    <p className="text-slate-650">
                      আমরা আপনার কোনো ব্যক্তিগত বা সরকারি আইডি কার্ড নম্বর (আধার, ভোটার, প্যান) বা সংবেদনশীল ফাইল আমাদের সার্ভারে জমা রাখি না বা সংগ্রহ করি না। আমরা আধার সংক্রান্ত কোনো ডেটাবেস প্রস্তুত ও সংরক্ষণ করি না। সম্পূর্ণ অ্যাপ্লিকেশনটি আপনার তথ্য ব্রাউজার স্তরে সুরক্ষিত রাখতে সাহায্য করে।
                    </p>
                  </section>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">২. লোকাল ডাটাবেস এবং বুকমার্ক</h4>
                    <p className="text-slate-650">
                      আপনার মনপছন্দ বা বুকমার্ক করা চাকরি, কার্ড এবং স্কলারশিপের তালিকা শুধুমাত্র আপনার ব্রাউজারের "Local Storage"-এ সংরক্ষিত থাকে। আপনি পেজটি রিসেট বা ব্রাউজার ডাটা ক্লিয়ার করলে এই ডেটা মুছে যাবে, আমাদের রিমোট সার্ভারে এর কোনো রেকর্ড থাকে না।
                    </p>
                  </section>
                  <section className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-[15px] border-b border-slate-100 pb-1">৩. বিজ্ঞপ্তি সাবস্ক্রিপশন ও যোগাযোগ</h4>
                    <p className="text-slate-650">
                      যখন আপনি হোয়াটসঅ্যাপ বা টেলিগ্রাম বিজ্ঞপ্তির জন্য অনুরোধ করেন, তখন নম্বরটি কেবলমাত্র সেই বিজ্ঞপ্তি প্রেরণের জন্য সাময়িকভাবে সংরক্ষিত হয় এবং আপনি যেকোনো সময়ে চ্যাটে এসে "Stop" লিখে আনসাবস্ক্রাইব করতে পারেন।
                    </p>
                  </section>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-150 flex items-center justify-end shrink-0">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-xs font-bold py-2 px-5 bg-slate-800 text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer focus:outline-hidden"
              >
                আমি সচেতন ও সম্মত
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADMIN PASSWORD VERIFICATION (ONLY ACCESSED BY TYPING "100") */}
      {showAdminPasswordModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in animate-duration-200">
          <div className="bg-white rounded-2xl w-full max-w-[420px] overflow-hidden border border-orange-50 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-850 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-400" />
                <h3 className="font-extrabold text-sm md:text-base text-white">অফিসিয়াল লগইন</h3>
              </div>
              <button 
                onClick={() => {
                  setShowAdminPasswordModal(false);
                  setAdminPasswordError("");
                  setAdminPasswordInput("");
                }} 
                className="text-white bg-white/10 hover:bg-white/20 rounded-lg p-1.5 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAdminPasswordSubmit} className="p-6 space-y-4">
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                এই বিভাগটি শুধুমাত্র প্যানেল অ্যাডমিন ও আধিকারিকদের জন্য সংরক্ষিত। অনুগ্রহ করে অ্যাক্সেস পাসওয়ার্ড প্রদান করুন।
              </p>

              {adminPasswordError && (
                <div className="bg-red-50 border border-red-105/50 p-3 rounded-xl text-xs text-red-600 font-bold leading-normal animate-shake">
                  ⚠️ {adminPasswordError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">ডিভাইস সিকিউরিটি কোড (পাসওয়ার্ড)</label>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="অ্যাডমিন সিকিউর পাসওয়ার্ড লিখুন..."
                  className="w-full px-4 py-2 text-xs border border-slate-205 rounded-xl text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#E96A1F] focus:border-[#E96A1F] transition-all bg-slate-50/50"
                  autoFocus
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminPasswordModal(false);
                    setAdminPasswordError("");
                    setAdminPasswordInput("");
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-extrabold text-white bg-slate-850 hover:bg-slate-950 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  প্রবেশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}

// Simple star SVG icon helper inline
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
