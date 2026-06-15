import React, { useState } from "react";
import { Scheme, Job, Scholarship, ServiceItem, AppUpdate } from "../data";
import { 
  Plus, 
  Trash, 
  Settings, 
  PieChart, 
  Bell, 
  Check, 
  PlusCircle, 
  AlertCircle, 
  FileText, 
  Edit3, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Layers,
  FileCheck
} from "lucide-react";

interface AdminPanelProps {
  schemes: Scheme[];
  onCreateScheme: (scheme: Scheme) => Promise<void>;
  onSaveScheme: (scheme: Scheme) => Promise<void>;
  onDeleteScheme: (id: string) => Promise<void>;

  jobs: Job[];
  onCreateJob: (job: Job) => Promise<void>;
  onSaveJob: (job: Job) => Promise<void>;
  onDeleteJob: (id: string) => Promise<void>;

  scholarships: Scholarship[];
  onCreateScholarship: (scholarship: Scholarship) => Promise<void>;
  onSaveScholarship: (scholarship: Scholarship) => Promise<void>;
  onDeleteScholarship: (id: string) => Promise<void>;

  services: ServiceItem[];
  onCreateService: (service: ServiceItem) => Promise<void>;
  onSaveService: (service: ServiceItem) => Promise<void>;
  onDeleteService: (id: string) => Promise<void>;

  updates: AppUpdate[];
  setUpdates: React.Dispatch<React.SetStateAction<AppUpdate[]>>;
  onClose: () => void;
  triggerPushNotification: (text: string) => void;
}

export default function AdminPanel({
  schemes,
  onCreateScheme,
  onSaveScheme,
  onDeleteScheme,
  jobs,
  onCreateJob,
  onSaveJob,
  onDeleteJob,
  scholarships,
  onCreateScholarship,
  onSaveScholarship,
  onDeleteScholarship,
  services,
  onCreateService,
  onSaveService,
  onDeleteService,
  updates,
  setUpdates,
  onClose,
  triggerPushNotification
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"analytics" | "schemes" | "jobs" | "scholarships" | "services" | "updates" | "push">("analytics");
  const [notificationMsg, setNotificationMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Schemes state & editing
  const [editingSchemeId, setEditingSchemeId] = useState<string | null>(null);
  const [schemeTitle, setSchemeTitle] = useState("");
  const [schemeCategory, setSchemeCategory] = useState<Scheme["category"]>("women");
  const [schemeBenefits, setSchemeBenefits] = useState("");
  const [schemeDescription, setSchemeDescription] = useState("");
  const [schemeEligibility, setSchemeEligibility] = useState("");
  const [schemeDocs, setSchemeDocs] = useState("");
  const [schemeUrl, setSchemeUrl] = useState("");
  const [schemeLogoUrl, setSchemeLogoUrl] = useState("");

  // 2. Jobs state & editing
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState<Job["category"]>("wbpsc");
  const [jobVacancy, setJobVacancy] = useState("");
  const [jobQual, setJobQual] = useState("");
  const [jobLastDate, setJobLastDate] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [jobLogoUrl, setJobLogoUrl] = useState("");

  // 3. Scholarships state & editing
  const [editingScholarshipId, setEditingScholarshipId] = useState<string | null>(null);
  const [scholarshipTitle, setScholarshipTitle] = useState("");
  const [scholarshipAmount, setScholarshipAmount] = useState("");
  const [scholarshipEligibility, setScholarshipEligibility] = useState("");
  const [scholarshipLastDate, setScholarshipLastDate] = useState("");
  const [scholarshipUrl, setScholarshipUrl] = useState("");
  const [scholarshipDescription, setScholarshipDescription] = useState("");
  const [scholarshipLogoUrl, setScholarshipLogoUrl] = useState("");

  // 4. Digital Services state & editing
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceCategory, setServiceCategory] = useState<ServiceItem["category"]>("aadhaar_pan");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceSteps, setServiceSteps] = useState("");
  const [serviceUrl, setServiceUrl] = useState("");
  const [serviceLogoUrl, setServiceLogoUrl] = useState("");

  // 5. App Updates
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateCategory, setUpdateCategory] = useState<AppUpdate["category"]>("General");

  // 6. Push notification
  const [pushBody, setPushBody] = useState("");

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(""), 3500);
  };

  // Schemes Handlers: add / edit / save / delete
  const startEditScheme = (item: Scheme) => {
    setEditingSchemeId(item.id);
    setSchemeTitle(item.title);
    setSchemeCategory(item.category);
    setSchemeBenefits(item.benefits);
    setSchemeDescription(item.description || "");
    setSchemeEligibility(item.eligibility || "");
    setSchemeDocs(item.documents ? item.documents.join(", ") : "");
    setSchemeUrl(item.officialUrl || "");
    setSchemeLogoUrl(item.logoUrl || "");
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const cancelSchemeEdit = () => {
    setEditingSchemeId(null);
    setSchemeTitle("");
    setSchemeBenefits("");
    setSchemeDescription("");
    setSchemeEligibility("");
    setSchemeDocs("");
    setSchemeUrl("");
    setSchemeLogoUrl("");
  };

  const handleSchemeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schemeTitle || !schemeBenefits) return;
    setIsSubmitting(true);

    const data: Scheme = {
      id: editingSchemeId || `s-admin-${Date.now()}`,
      title: schemeTitle,
      titleEn: schemeTitle,
      category: schemeCategory,
      categoryName:
        schemeCategory === "women"
          ? "মহিলা ও শিশু কল্যাণ"
          : schemeCategory === "students"
          ? "শিক্ষার্থী কল্যাণ"
          : schemeCategory === "farmers"
          ? "কৃষক কল্যাণ"
          : schemeCategory === "senior"
          ? "প্রবীণ ও বয়স্ক কল্যাণ"
          : "শ্রমিক কল্যাণ",
      description: schemeDescription || "প্রশাসনিক প্যানেল দ্বারা সংযুক্ত প্রকল্প।",
      benefits: schemeBenefits,
      eligibility: schemeEligibility || "পশ্চিমবঙ্গের উপযুক্ত যোগ্যতাসম্পন্ন স্থায়ী নাগরিক।",
      documents: schemeDocs ? schemeDocs.split(",").map((d) => d.trim()) : ["আধার কার্ড", "আয়ের শংসাপত্র"],
      officialUrl: schemeUrl || "https://wb.gov.in",
      logoUrl: schemeLogoUrl || "",
      isPopular: true
    };

    try {
      if (editingSchemeId) {
        await onSaveScheme(data);
        showNotification("প্রকল্পটির পরিবর্তন রিয়েল-টাইমে সেভ করা হয়েছে!");
      } else {
        await onCreateScheme(data);
        showNotification("নতুন সরকারি প্রকল্প সফলভাবে লাইভ ডেটাবেসে যুক্ত হয়েছে!");
      }
      cancelSchemeEdit();
    } catch (err) {
      alert("তথ্য সেভ করতে ত্রুটি ঘটেছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Jobs Handlers: add / edit / save / delete
  const startEditJob = (item: Job) => {
    setEditingJobId(item.id);
    setJobTitle(item.title);
    setJobCategory(item.category);
    setJobVacancy(item.vacancy);
    setJobQual(item.qualification);
    setJobLastDate(item.lastDate);
    setJobSalary(item.salary || "");
    setJobUrl(item.officialUrl || "");
    setJobLogoUrl(item.logoUrl || "");
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const cancelJobEdit = () => {
    setEditingJobId(null);
    setJobTitle("");
    setJobVacancy("");
    setJobQual("");
    setJobLastDate("");
    setJobSalary("");
    setJobUrl("");
    setJobLogoUrl("");
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobVacancy) return;
    setIsSubmitting(true);

    const data: Job = {
      id: editingJobId || `j-admin-${Date.now()}`,
      title: jobTitle,
      subtitle: jobTitle,
      category: jobCategory,
      categoryName:
        jobCategory === "wbpsc"
          ? "WBPSC सरकारी नौकरी"
          : jobCategory === "police"
          ? "পুলিশ ও সুরক্ষা বাহিনী"
          : jobCategory === "railway"
          ? "রেলওয়ে নিয়োগ বোর্ড"
          : jobCategory === "banking"
          ? "ব্যাংকিং ও ফাইনান্স"
          : jobCategory === "defence"
          ? "কেন্দ্রীয় সুরক্ষা বাহিনী"
          : jobCategory === "private"
          ? "বেসরকারি ও চুক্তিভিত্তিক চাকরি"
          : "ইন্টার্নশিপ ও প্রশিক্ষণ",
      vacancy: jobVacancy,
      qualification: jobQual || "মাধ্যমিক বা উচ্চমাধ্যমিক পাস।",
      lastDate: jobLastDate || "২০২৬-১২-৩১",
      salary: jobSalary || "গ্রেড পে অনুযায়ী চমৎকার ভাতা",
      officialUrl: jobUrl || "https://wb.gov.in",
      logoUrl: jobLogoUrl || ""
    };

    try {
      if (editingJobId) {
        await onSaveJob(data);
        showNotification("চাকরির বিজ্ঞপ্তি রিয়েল-টাইমে আপডেট করা হয়েছে!");
      } else {
        await onCreateJob(data);
        showNotification("নতুন চাকরির বিজ্ঞপ্তি সফলভাবে লাইভ ডেটাবেসে পোস্ট করা হয়েছে!");
      }
      cancelJobEdit();
    } catch (err) {
      alert("তথ্য সেভ করতে ত্রুটি ঘটেছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scholarships Handlers: add / edit / save / delete
  const startEditScholarship = (item: Scholarship) => {
    setEditingScholarshipId(item.id);
    setScholarshipTitle(item.title);
    setScholarshipAmount(item.amount);
    setScholarshipEligibility(item.eligibility);
    setScholarshipLastDate(item.lastDate);
    setScholarshipUrl(item.officialUrl);
    setScholarshipDescription(item.description);
    setScholarshipLogoUrl(item.logoUrl || "");
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const cancelScholarshipEdit = () => {
    setEditingScholarshipId(null);
    setScholarshipTitle("");
    setScholarshipAmount("");
    setScholarshipEligibility("");
    setScholarshipLastDate("");
    setScholarshipUrl("");
    setScholarshipDescription("");
    setScholarshipLogoUrl("");
  };

  const handleScholarshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scholarshipTitle || !scholarshipAmount) return;
    setIsSubmitting(true);

    const data: Scholarship = {
      id: editingScholarshipId || `sc-admin-${Date.now()}`,
      title: scholarshipTitle,
      amount: scholarshipAmount,
      eligibility: scholarshipEligibility || "যোগ্য মাধ্যমিক বা উচ্চমাধ্যমিক মেধা সম্পন্ন পশ্চিমবঙ্গের স্থায়ী ছাত্রছাত্রী।",
      lastDate: scholarshipLastDate || "২০২৬-১০-৩১",
      officialUrl: scholarshipUrl || "https://wb.gov.in",
      description: scholarshipDescription || "আর্থিকভাবে অসচ্ছল শিক্ষার্থীদের উচ্চশিক্ষায় অগ্রসর করার জন্য রাজ্যবৃত্তি পোর্টাল।",
      logoUrl: scholarshipLogoUrl || ""
    };

    try {
      if (editingScholarshipId) {
        await onSaveScholarship(data);
        showNotification("স্কলারশিপ বিবরণ রিয়েল-টাইমে আপডেট করা হয়েছে!");
      } else {
        await onCreateScholarship(data);
        showNotification("নতুন স্কলারশিপ প্রকল্প সফলভাবে লাইভ ডেটাবেসে সংযু্ক্ত হয়েছে!");
      }
      cancelScholarshipEdit();
    } catch (err) {
      alert("তথ্য সেভ করতে ত্রুটি ঘটেছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Services Handlers: add / edit / save / delete
  const startEditService = (item: ServiceItem) => {
    setEditingServiceId(item.id);
    setServiceTitle(item.title);
    setServiceCategory(item.category);
    setServiceDescription(item.description);
    setServiceSteps(item.steps ? item.steps.join("\n") : "");
    setServiceUrl(item.officialUrl);
    setServiceLogoUrl(item.logoUrl || "");
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const cancelServiceEdit = () => {
    setEditingServiceId(null);
    setServiceTitle("");
    setServiceDescription("");
    setServiceSteps("");
    setServiceUrl("");
    setServiceLogoUrl("");
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle || !serviceDescription) return;
    setIsSubmitting(true);

    const data: ServiceItem = {
      id: editingServiceId || `srv-admin-${Date.now()}`,
      title: serviceTitle,
      category: serviceCategory,
      categoryName: serviceCategory === "aadhaar_pan" ? "আধার ও প্যান কার্ড" : "শংসাপত্র ও সার্টিফিকেট",
      description: serviceDescription,
      steps: serviceSteps ? serviceSteps.split("\n").map(s => s.trim()).filter(Boolean) : [
        "অফিসিয়াল সরকারী পোর্টালে ভিজিট করুন।",
        "সিটিজেন লগইন সম্পন্ন করুন ও ওটিপি ভেরিফাই করুন।",
        "প্রয়োজনীয় নথি আপলোড করে আবেদন সমাপ্ত করুন।"
      ],
      officialUrl: serviceUrl || "https://wb.gov.in",
      logoUrl: serviceLogoUrl || ""
    };

    try {
      if (editingServiceId) {
        await onSaveService(data);
        showNotification("ডিজিটাল সিটিজেন সার্ভিস বিবরণ রিয়েল-টাইমে আপডেট করা হয়েছে!");
      } else {
        await onCreateService(data);
        showNotification("নতুন ডিজিটাল সিটিজেন সার্ভিস সফলভাবে লাইভ ডেটাবেসে যুক্ত হয়েছে!");
      }
      cancelServiceEdit();
    } catch (err) {
      alert("তথ্য সেভ করতে ত্রুটি ঘটেছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updates Handlers
  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle) return;

    const newUpdate: AppUpdate = {
      id: `up-admin-${Date.now()}`,
      title: updateTitle,
      date: new Date().toISOString().split("T")[0],
      category: updateCategory
    };

    setUpdates((prev) => [newUpdate, ...prev]);
    showNotification("সফলভাবে নতুন আপডেট নোটিশ যুক্ত করা হয়েছে!");
    setUpdateTitle("");
  };

  const handleDeleteUpdate = (id: string) => {
    setUpdates((prev) => prev.filter((u) => u.id !== id));
  };

  // Broadcast Handler
  const handleDispatchPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushBody) return;
    triggerPushNotification(pushBody);
    setPushBody("");
    showNotification("পোর্টাল জুড়ে ব্রডকাস্ট पुश ঘোষণা তাৎক্ষণিক সফল!");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" id="admin-panel-component">
      {/* Admin Title */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-bengali-orange animate-spin" />
          <div>
            <h2 className="font-semibold text-lg text-white">অ্যাডমিন কন্ট্রোল পোর্টাল</h2>
            <p className="text-xs text-slate-400">রিয়েল-টাইম লাইভ ফায়ারবেস ডেটাবেস সিঙ্ক্রোনাইজেশন প্যানেল</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-xs px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-slate-300 transition-colors font-bold cursor-pointer"
        >
          বন্ধ করুন
        </button>
      </div>

      {notificationMsg && (
        <div className="bg-emerald-50 border-b border-emerald-500/20 px-6 py-3 flex items-center gap-2 text-emerald-700 text-sm font-semibold animate-fade-in">
          <Check className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Tabs list */}
      <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/50">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "analytics"
              ? "border-bengali-orange text-bengali-orange bg-white"
              : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <PieChart className="h-3.5 w-3.5 inline mr-1" /> সার্বিক অ্যানালিটিক্স
        </button>
        <button
          onClick={() => setActiveTab("schemes")}
          className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "schemes"
              ? "border-bengali-orange text-bengali-orange bg-white"
              : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Layers className="h-3.5 w-3.5 inline mr-1" /> স্কিম পরিচালনা ({schemes.length})
        </button>
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "jobs"
              ? "border-bengali-orange text-bengali-orange bg-white"
              : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Briefcase className="h-3.5 w-3.5 inline mr-1" /> চাকরি পরিচালনা ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab("scholarships")}
          className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "scholarships"
              ? "border-bengali-orange text-bengali-orange bg-white"
              : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5 inline mr-1" /> স্কলারশিপ ({scholarships.length})
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "services"
              ? "border-bengali-orange text-bengali-orange bg-white"
              : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <FileCheck className="h-3.5 w-3.5 inline mr-1" /> ডিজিটাল সেবা ({services.length})
        </button>
        <button
          onClick={() => setActiveTab("updates")}
          className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "updates"
              ? "border-bengali-orange text-bengali-orange bg-white"
              : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <FileCheck className="h-3.5 w-3.5 inline mr-1" /> নোটিশ আপডেট
        </button>
        <button
          onClick={() => setActiveTab("push")}
          className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "push"
              ? "border-bengali-orange text-bengali-orange bg-white"
              : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Bell className="h-3.5 w-3.5 inline mr-1" /> পুশ ব্রডকাস্ট
        </button>
      </div>

      <div className="p-6">
        {/* TAB 1: ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">মোট নাগরিক তথ্য পরিদর্শক</span>
                <span className="text-2xl font-black text-slate-900 block mt-1">৩,৮৯,৪২০ +</span>
                <span className="text-[11px] text-emerald-600 font-bold block mt-1">★ ১৫.৪% বৃদ্ধি গত সপ্তাহ</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">লাইভ সরকারি স্কিমসমূহ</span>
                <span className="text-2xl font-black text-bengali-orange block mt-1">{schemes.length} টি</span>
                <p className="text-[11px] text-slate-450 mt-1">লাইফ ফায়ারবেস ডেটাবেস সিঙ্কড</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">সক্রিয় বৃত্তি ও স্কলারশিপ</span>
                <span className="text-2xl font-black text-indigo-650 block mt-1">{scholarships.length} টি</span>
                <p className="text-[11px] text-slate-450 mt-1">অনলাইন সরাসরি আবেদনযোগ্য</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">ডিজিটাল নাগরিক নথি সেবা</span>
                <span className="text-2xl font-black text-emerald-700 block mt-1">{services.length} টি</span>
                <span className="text-[11px] text-emerald-600 font-bold block mt-1">আধার, প্যান, ভোটার গাইড</span>
              </div>
            </div>

            {/* Simulated interactive charts */}
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-6">
              <h3 className="font-semibold text-slate-800 text-sm mb-4">নাগরিক অনুসন্ধান বিশ্লেষণ (বিভাগভিত্তিক রেশিও)</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">লক্ষ্মীর ভাণ্ডার ও মহিলা ও শিশু কল্যাণ সম্পর্কিত অনুসন্ধান</span>
                    <span className="text-slate-850 text-xs font-black">৪৫%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-bengali-orange h-2.5 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">মাধ্যমিক ও উচ্চ মাধ্যমিক স্তরের স্কলারশিপসমূহ (SVMCM, OASIS)</span>
                    <span className="text-slate-850 text-xs font-black">২৭%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-[#1E3A5F] h-2.5 rounded-full" style={{ width: "27%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">পশ্চিমবঙ্গ পুলিশ ও WBPSC চাকরির নিয়োগ প্রক্রিয়া</span>
                    <span className="text-slate-850 text-xs font-black">১৮%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">আধার কার্ড বায়োমেট্রিক এবং প্যান পরিষেবা সংক্রান্ত</span>
                    <span className="text-slate-850 text-xs font-black">১০%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SCHEME MANAGE */}
        {activeTab === "schemes" && (
          <div className="space-y-6">
            <form onSubmit={handleSchemeSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm md:text-base">
                <PlusCircle className="h-4.5 w-4.5 text-bengali-orange" />
                {editingSchemeId ? "সরকারি স্কিমটি সংশোধন করুন" : "নতুন সরকারি স্কিম বা প্রকল্প লাইভ যুক্ত করুন"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">প্রকল্পের নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={schemeTitle}
                    onChange={(e) => setSchemeTitle(e.target.value)}
                    placeholder="যেমন: পথশ্রী পথদিশা প্রকল্প"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">বিভাগ বা ক্যাটাগরি *</label>
                  <select
                    value={schemeCategory}
                    onChange={(e) => setSchemeCategory(e.target.value as Scheme["category"])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  >
                    <option value="women">নারীদের জন্য (মহিলা ও শিশু কল্যাণ)</option>
                    <option value="students">ছাত্র-ছাত্রীদের জন্য (শিক্ষার্থী কল্যাণ)</option>
                    <option value="farmers">কৃষক কল্যাণ</option>
                    <option value="senior">প্রবীণ ও বয়স্ক কল্যাণ</option>
                    <option value="workers">শ্রমিক ও দিনমজুর কল্যাণ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 block mb-1">প্রকল্পের সংক্ষিপ্ত বিবরণী *</label>
                  <input
                    type="text"
                    required
                    value={schemeDescription}
                    onChange={(e) => setSchemeDescription(e.target.value)}
                    placeholder="যেমন: পশ্চিমবঙ্গের স্থায়ী বাসিন্দাদের যাতায়াত ও রাস্তার উন্নয়নে রাজ্য সরকারি প্রকল্প।"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">লোগো ইমেজ লিঙ্ক (URL - লোগো পরিবর্তন করতে) *</label>
                  <input
                    type="text"
                    value={schemeLogoUrl}
                    onChange={(e) => setSchemeLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">প্রাপ্ত অনুদান বা সুবিধা *</label>
                  <textarea
                    required
                    value={schemeBenefits}
                    onChange={(e) => setSchemeBenefits(e.target.value)}
                    placeholder="যেমন: বছরে এককালীন ১০,০০০ টাকা বা বিনামূল্যে চিকিৎসা ব্যবস্থা"
                    rows={2}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">আবেদনের যোগ্যতা</label>
                  <textarea
                    value={schemeEligibility}
                    onChange={(e) => setSchemeEligibility(e.target.value)}
                    placeholder="যেমন: বয়স ২৫ থেকে ৬০ বছরের মধ্যে এবং নিজস্ব স্বীয় ব্যাংক অ্যাকাউন্ট।"
                    rows={2}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">প্রয়োজনীয় নথি (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    value={schemeDocs}
                    onChange={(e) => setSchemeDocs(e.target.value)}
                    placeholder="যেমন: আধার কার্ড, স্বাস্হ্য সাথী কার্ড, রঙিন ছবি"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">অফিশিয়াল পোর্টাল লিংক (URL)</label>
                  <input
                    type="text"
                    value={schemeUrl}
                    onChange={(e) => setSchemeUrl(e.target.value)}
                    placeholder="যেমন: https://socialsecurity.wb.gov.in"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-bengali-orange border border-orange-600 font-extrabold text-[#FFF] text-xs py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-55 cursor-pointer"
                >
                  {isSubmitting ? "সংরক্ষিত হচ্ছে..." : editingSchemeId ? "স্কিম আপডেট নিশ্চিত করুন" : "স্কিম লাইভ পাবলিশ করুন"}
                </button>
                {editingSchemeId && (
                  <button
                    type="button"
                    onClick={cancelSchemeEdit}
                    className="bg-slate-350 hover:bg-slate-400 text-slate-900 border border-slate-300 font-bold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    বাতিল
                  </button>
                )}
              </div>
            </form>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                    <th className="px-4 py-3">লোগো</th>
                    <th className="px-4 py-3">নাম</th>
                    <th className="px-4 py-3">বিভাগ</th>
                    <th className="px-4 py-3">সুবিধা</th>
                    <th className="px-4 py-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-xs text-slate-850">
                  {schemes.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        {s.logoUrl ? (
                          <img src={s.logoUrl} className="w-8 h-8 rounded-lg object-cover border border-slate-200 overflow-hidden" referrerPolicy="no-referrer" alt="" />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono">Default SVG</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{s.title}</td>
                      <td className="px-4 py-3 text-[10px]">
                        <span className="bg-orange-50 text-bengali-orange font-bold px-2 py-0.5 rounded-full border border-orange-100">
                          {s.categoryName}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-[250px] truncate text-slate-650">{s.benefits}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => startEditScheme(s)}
                            className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer"
                            title="এডিট করুন"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("এই প্রকল্পটি মুছে ফেলতে চান?")) {
                                onDeleteScheme(s.id);
                                showNotification("প্রকল্পটি মুছে ফেলা হয়েছে!");
                              }
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: JOBS MANAGE */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <form onSubmit={handleJobSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm md:text-base">
                <PlusCircle className="h-4.5 w-4.5 text-bengali-orange" />
                {editingJobId ? "চাকরির বিজ্ঞপ্তিটি পরিবর্তন করুন" : "নতুন সরকারি/বেসরকারি চাকরির বিজ্ঞপ্তি পাবলিশ করুন"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">পদের টাইটেল বা বর্ণনা *</label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="যেমন: ওয়েস্ট বেঙ্গল কনস্টেবল রিক্রুটমেন্ট ২০২৬"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">চাকরির বোর্ড/ক্যাটাগরি *</label>
                  <select
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value as Job["category"])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  >
                    <option value="wbpsc">WBPSC সরকারি চাকরি</option>
                    <option value="police">পুলিশ ও সুরক্ষা বাহিনী</option>
                    <option value="railway">রেলওয়ে নিয়োগ বোর্ড</option>
                    <option value="banking">ব্যাংকিং ও ফাইনান্স</option>
                    <option value="defence">কেন্দ্রীয় সুরক্ষা বাহিনী (Defence)</option>
                    <option value="private">বেসরকারি ও চুক্তিভিত্তিক চাকরি</option>
                    <option value="internship">ইন্টার্নশিপ ও প্রশিক্ষণ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">মোট শূন্যপদ *</label>
                  <input
                    type="text"
                    required
                    value={jobVacancy}
                    onChange={(e) => setJobVacancy(e.target.value)}
                    placeholder="যেমন: ৩,৫০০ টি সিট"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">শিক্ষাগত যোগ্যতা</label>
                  <input
                    type="text"
                    value={jobQual}
                    onChange={(e) => setJobQual(e.target.value)}
                    placeholder="যেমন: ১০ম / ১২ম পাস"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">লোগো লিঙ্ক (URL - লোগো পরিবর্তন করতে)</label>
                  <input
                    type="text"
                    value={jobLogoUrl}
                    onChange={(e) => setJobLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">আবেদনের শেষ তারিখ (যেমন: ২০২৬-০৮-১৫)</label>
                  <input
                    type="date"
                    value={jobLastDate}
                    onChange={(e) => setJobLastDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">বেতন বা ভাতা (গ্রস স্কিল)</label>
                  <input
                    type="text"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    placeholder="যেমন: ₹২২,৭০০ - ₹৫৮,৫০০ প্রতি মাসে"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">অফিশিয়াল আবেদনের লিংক (URL)</label>
                  <input
                    type="text"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="যেমন: https://prb.wb.gov.in"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-bengali-orange border border-orange-600 font-extrabold text-[#FFF] text-xs py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-55 cursor-pointer"
                >
                  {isSubmitting ? "সংরক্ষিত হচ্ছে..." : editingJobId ? "চাকরি বিজ্ঞপ্তি নিশ্চিত সংরক্ষণ" : "চাকরির বিজ্ঞপ্তি প্রকাশ করুন"}
                </button>
                {editingJobId && (
                  <button
                    type="button"
                    onClick={cancelJobEdit}
                    className="bg-slate-350 hover:bg-slate-400 text-slate-900 border border-slate-300 font-bold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    বাতিল
                  </button>
                )}
              </div>
            </form>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                    <th className="px-4 py-3">লোগো</th>
                    <th className="px-4 py-3">বিজ্ঞপ্তির বিবরণ</th>
                    <th className="px-4 py-3">শূন্যপদ</th>
                    <th className="px-4 py-3">শেষ তারিখ</th>
                    <th className="px-4 py-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-xs text-slate-800">
                  {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        {j.logoUrl ? (
                          <img src={j.logoUrl} className="w-8 h-8 rounded-lg object-cover border border-slate-200 overflow-hidden" referrerPolicy="no-referrer" alt="" />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono">Default SVG</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{j.title}</div>
                        <div className="text-[10.5px] text-slate-450 font-semibold mt-0.5">{j.categoryName}</div>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-700">{j.vacancy}</td>
                      <td className="px-4 py-3 text-xs font-bold text-red-600">{j.lastDate}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => startEditJob(j)}
                            className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer"
                            title="এডিট করুন"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("এই চাকরির খবরটি ডিলিট করতে চান?")) {
                                onDeleteJob(j.id);
                                showNotification("চাকরির খবরটি ডিলিট করা হয়েছে!");
                              }
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SCHOLARSHIPS MANAGE */}
        {activeTab === "scholarships" && (
          <div className="space-y-6">
            <form onSubmit={handleScholarshipSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm md:text-base">
                <PlusCircle className="h-4.5 w-4.5 text-bengali-orange" />
                {editingScholarshipId ? "স্কলারশিপ বিবরণী সংশোধন করুন" : "নতুন মেধাবী স্কলারশিপ বা সহায়তা প্রকল্প যোগ করুন"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">স্কলারশিপ বা বৃত্তির নাম *</label>
                  <input
                    type="text"
                    required
                    value={scholarshipTitle}
                    onChange={(e) => setScholarshipTitle(e.target.value)}
                    placeholder="যেমন: স্বামী বিবেকানন্দ স্কলারশিপ পোর্টাল"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">সহায়তা পরিমাণ / বাৎসরিক স্কলারশিপ রাশি *</label>
                  <input
                    type="text"
                    required
                    value={scholarshipAmount}
                    onChange={(e) => setScholarshipAmount(e.target.value)}
                    placeholder="যেমন: বাৎসরিক ১২,০০০ টাকা থেকে ৯৬,০০০ টাকা"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 block mb-1">স্কলারশিপের সংক্ষিপ্ত বিবরণী *</label>
                  <input
                    type="text"
                    required
                    value={scholarshipDescription}
                    onChange={(e) => setScholarshipDescription(e.target.value)}
                    placeholder="মেধাবী শিক্ষার্থীদের জন্য পশ্চিমবঙ্গ উচ্চশিক্ষা দপ্তরের বিশেষ আর্থিক সহায়তা যোজনা..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">লোগো ছবি (URL - পরিবর্তন করার জন্য)</label>
                  <input
                    type="text"
                    value={scholarshipLogoUrl}
                    onChange={(e) => setScholarshipLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 block mb-1">আবশ্যিক যোগ্যতা বা মার্কস বিবরণী *</label>
                  <input
                    type="text"
                    value={scholarshipEligibility}
                    onChange={(e) => setScholarshipEligibility(e.target.value)}
                    placeholder="যেমন: সর্বশেষ পরীক্ষায় ৬০% নম্বর সহ পশ্চিমবঙ্গের স্থায়ী বাসিন্দা।"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">আবেদনের শেষ তারিখ</label>
                  <input
                    type="text"
                    value={scholarshipLastDate}
                    onChange={(e) => setScholarshipLastDate(e.target.value)}
                    placeholder="যেমন: ২০২৬-১০-১৫ বা রানিং পিরিয়ড"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">অফিশিয়াল পোর্টাল আবেদন লিংক (URL)</label>
                <input
                  type="text"
                  value={scholarshipUrl}
                  onChange={(e) => setScholarshipUrl(e.target.value)}
                  placeholder="https://svmcm.wbhed.gov.in/"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-bengali-orange border border-orange-600 font-extrabold text-[#FFF] text-xs py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-55 cursor-pointer"
                >
                  {isSubmitting ? "সংরক্ষিত হচ্ছে..." : editingScholarshipId ? "স্কলারশিপ আপডেট সংরক্ষণ" : "বৃত্তি প্রকাশ করুন"}
                </button>
                {editingScholarshipId && (
                  <button
                    type="button"
                    onClick={cancelScholarshipEdit}
                    className="bg-slate-350 hover:bg-slate-400 text-slate-900 border border-slate-300 font-bold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    বাতিল
                  </button>
                )}
              </div>
            </form>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                    <th className="px-4 py-3">লোগো</th>
                    <th className="px-4 py-3">স্কলারশিপ নাম</th>
                    <th className="px-4 py-3">পরিমাণ</th>
                    <th className="px-4 py-3">যোগ্যতা</th>
                    <th className="px-4 py-3">শেষ তারিখ</th>
                    <th className="px-4 py-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-xs text-slate-800">
                  {scholarships.map((sc) => (
                    <tr key={sc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        {sc.logoUrl ? (
                          <img src={sc.logoUrl} className="w-8 h-8 rounded-lg object-cover border border-slate-200 overflow-hidden" referrerPolicy="no-referrer" alt="" />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono">Default SVG</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{sc.title}</td>
                      <td className="px-4 py-3 font-semibold text-indigo-700">{sc.amount}</td>
                      <td className="px-4 py-3 text-slate-650 max-w-[200px] truncate">{sc.eligibility}</td>
                      <td className="px-4 py-3 font-bold text-red-600">{sc.lastDate}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => startEditScholarship(sc)}
                            className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer"
                            title="এডিট করুন"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("এই স্কলারশিপ বিবরণ মুছে ফেলতে চান?")) {
                                onDeleteScholarship(sc.id);
                                showNotification("স্কলারশিপ মুছে ফেলা হয়েছে!");
                              }
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: DIGITAL SERVICES MANAGE */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <form onSubmit={handleServiceSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm md:text-base">
                <PlusCircle className="h-4.5 w-4.5 text-bengali-orange" />
                {editingServiceId ? "সিটিজেন ডিজিটাল সার্ভিস বিবরণ সংশোধন করুন" : "নতুন জরুরি নাগরিক ডিজিটাল সেবা (Aadhaar, PAN, Voter) গাইড যুক্ত করুন"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">পরিষেবার টাইটেল বা নাম *</label>
                  <input
                    type="text"
                    required
                    value={serviceTitle}
                    onChange={(e) => setServiceTitle(e.target.value)}
                    placeholder="যেমন: নতুন ভোটার আইডি আবেদন এবং ভোটার কার্ড লিঙ্কিং প্রসেস"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">সার্ভিস ক্যাটাগরি *</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value as ServiceItem["category"])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  >
                    <option value="aadhaar_pan">আধার ও প্যান কার্ড (Demographics)</option>
                    <option value="certificates">শংসাপত্র ও সার্টিফিকেট (Birth, Caste, Income, Voter, etc.)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">পরিষেবার সংক্ষিপ্ত ডেসক্রিপশন *</label>
                  <textarea
                    required
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    placeholder="আধার কার্ড ভারতীয় নাগরিকদের প্রধান পরিচয়পত্র। নতুন কার্ড সম্পর্কিত সম্পূর্ণ অনলাইন গাইড এবং সরাসরি লিঙ্ক।"
                    rows={2}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">অনলাইন আবেদনের প্রধান পদক্ষেপসমূহ (প্রতি লাইনে একটি করে স্টেপ)</label>
                  <textarea
                    value={serviceSteps}
                    onChange={(e) => setServiceSteps(e.target.value)}
                    placeholder="১. ভারতের প্রধান নির্বাচন কমিশনের ওয়েবসাইট ওপেন করুন।&#10;২. ওটিআর ও মোবাইল ওটিপি দিয়ে নিবন্ধন সম্পন্ন করুন।&#10;৩. ফর্ম-৬ নতুন ভোটারের জন্য পূরণ করে আধার প্রমাণ আপলোড করুন।"
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">লোগো ছবি (URL - পরিবর্তন করার জন্য)</label>
                  <input
                    type="text"
                    value={serviceLogoUrl}
                    onChange={(e) => setServiceLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">অফিশিয়াল আবেদনের সরাসরি ওয়েব লিঙ্ক (URL)</label>
                  <input
                    type="text"
                    value={serviceUrl}
                    onChange={(e) => setServiceUrl(e.target.value)}
                    placeholder="https://voters.eci.gov.in"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-bengali-orange border border-orange-600 font-extrabold text-[#FFF] text-xs py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-55 cursor-pointer"
                >
                  {isSubmitting ? "সংরক্ষিত হচ্ছে..." : editingServiceId ? "সার্ভিস বিবরণ রিয়েল-টাইম আপডেট" : "ডিজিটাল সার্ভিস যুক্ত করুন"}
                </button>
                {editingServiceId && (
                  <button
                    type="button"
                    onClick={cancelServiceEdit}
                    className="bg-slate-350 hover:bg-slate-400 text-slate-900 border border-slate-300 font-bold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    বাতিল
                  </button>
                )}
              </div>
            </form>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                    <th className="px-4 py-3">লোগো</th>
                    <th className="px-4 py-3">পরিষেবার নাম ও ডেসক্রিপশন</th>
                    <th className="px-4 py-3">ক্যাটাগরি</th>
                    <th className="px-4 py-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-xs text-slate-800">
                  {services.map((srv) => (
                    <tr key={srv.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        {srv.logoUrl ? (
                          <img src={srv.logoUrl} className="w-8 h-8 rounded-lg object-cover border border-slate-200 overflow-hidden" referrerPolicy="no-referrer" alt="" />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono">Default SVG</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{srv.title}</div>
                        <div className="text-[10.5px] text-slate-450 font-medium truncate max-w-[320px] mt-0.5">{srv.description}</div>
                      </td>
                      <td className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase font-mono">{srv.categoryName || srv.category}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => startEditService(srv)}
                            className="text-indigo-600 hover:text-indigo-800 p-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer"
                            title="এডিট করুন"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("এই ডিজিটাল সেবা গাইডটি ডিলিট করতে চান?")) {
                                onDeleteService(srv.id);
                                showNotification("ডিজিটাল নাগরিক সেবা বিবরণ টি ডিলিট করা হয়েছে!");
                              }
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: UPDATES MANAGE */}
        {activeTab === "updates" && (
          <div className="space-y-6">
            <form onSubmit={handleAddUpdate} className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs md:text-sm">
                <PlusCircle className="h-4 w-4 text-bengali-orange" />
                নতুন তাৎক্ষণিক আপডেট বা বিজ্ঞপ্তি যোগ করুন
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">আপডেটের বিবরণ (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    placeholder="যেমন: স্টুডেন্ট ক্রেডিট কার্ডের নতুন আবেদনের পোর্টাল খোলা হয়েছে"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">শ্রেণীবিভাগ বা ট্যাগ</label>
                  <select
                    value={updateCategory}
                    onChange={(e) => setUpdateCategory(e.target.value as AppUpdate["category"])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                  >
                    <option value="General">সাধারণ আপডেট</option>
                    <option value="Scheme">স্কিম / প্রকল্প সংবাদ</option>
                    <option value="Job">চাকরির খবর</option>
                    <option value="Scholarship">স্কলারশিপ অ্যালার্ট</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-bengali-orange text-white text-xs font-extrabold py-2 px-6 rounded-lg hover:bg-orange-650 transition-colors cursor-pointer"
              >
                আপডেট পোস্ট করুন
              </button>
            </form>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-slate-850 text-xs md:text-sm mb-3">সাম্প্রতিক নোটিশসমূহ</h3>
              <div className="space-y-1.5">
                {updates.map((u) => (
                  <div key={u.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100 mt-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0">
                        {u.category}
                      </span>
                      <p className="text-xs text-slate-700 font-bold">{u.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] text-slate-400 font-mono font-bold leading-none">{u.date}</span>
                      <button
                        onClick={() => handleDeleteUpdate(u.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: BROADCAST PUSH */}
        {activeTab === "push" && (
          <div className="space-y-6">
            <form onSubmit={handleDispatchPush} className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-1.5 text-base">
                <Bell className="h-5 w-5 text-bengali-orange" />
                নাগরিকদের জন্য ব্রডকাস্ট বিজ্ঞপ্তি (Push Broadcast)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                এখানে টাইপ করা ঘোষণা বা জরুরি নোটিশটি পোর্টালের সকল সক্রিয় দর্শকদের ওয়েব ব্রাউজারের উপরে তাৎক্ষণিক রিয়েল-টাইম পুশ অ্যালার্ট হিসেবে দৃশ্যমান হবে।
              </p>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">বিজ্ঞপ্তির সংক্ষিপ্ত বাক্য *</label>
                <textarea
                  required
                  value={pushBody}
                  onChange={(e) => setPushBody(e.target.value)}
                  placeholder="যেমন: জরুরি বার্তা! দুয়ারে সরকার ক্যাম্পের সময়সীমা আগামী ৩০শে জুন পর্যন্ত বাড়ানো হয়েছে।"
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-bengali-orange"
                />
              </div>
              <button
                type="submit"
                className="bg-bengali-orange text-[#FFF] text-xs font-extrabold py-2.5 px-6 rounded-lg hover:bg-orange-600 transition-transform active:scale-95 shadow-sm shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer border border-orange-600"
              >
                <Bell className="h-4 w-4" />
                তাৎক্ষণিক ব্রডকাস্ট করুন
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
