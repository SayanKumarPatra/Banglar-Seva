import React from "react";
import { Scheme, Job } from "../data";
import { Bookmark, Calendar, Briefcase, Award, Trash, ArrowRight, User, ShieldCheck } from "lucide-react";

interface UserDashboardProps {
  savedSchemes: Scheme[];
  unsaveScheme: (id: string) => void;
  savedJobs: Job[];
  unsaveJob: (id: string) => void;
  onOpenScheme: (scheme: Scheme) => void;
  onOpenJob: (job: Job) => void;
}

export default function UserDashboard({
  savedSchemes,
  unsaveScheme,
  savedJobs,
  unsaveJob,
  onOpenScheme,
  onOpenJob
}: UserDashboardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Dashboard header */}
      <div className="bg-[#1E3A5F] text-white px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-200 uppercase font-bold">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-semibold text-lg text-white">নাগরিক প্রোফাইল ও ড্যাশবোর্ড</h2>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                সুরক্ষিত
              </span>
            </div>
            <p className="text-xs text-indigo-200">সংরক্ষিত সরকারি প্রকল্প, স্কলারশিপ ও সক্রিয় সময়সীমা সঙ্কেত</p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: Saved schemes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
              <Award className="h-4 w-4 text-bengali-orange" />
              আমার সংরক্ষিত সামাজিক প্রকল্প ({savedSchemes.length})
            </h3>
          </div>

          {savedSchemes.length === 0 ? (
            <div className="bg-slate-50 rounded-xl p-6 border border-dashed border-slate-200 text-center space-y-2">
              <Bookmark className="h-8 w-8 text-slate-350 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">কোনো প্রকল্প সংরক্ষণ করা হয়নি।</p>
              <p className="text-[11px] text-slate-450 leading-relaxed max-w-xs mx-auto">
                হোমপেজে থাকা বিভিন্ন সরকারি প্রকল্পের পাশে দেওয়া বুকমার্ক চিহ্নে ক্লিক করে সহজেই এখানে সেভ করে রাখতে পারেন।
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {savedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-slate-50 hover:bg-slate-100/70 p-3 rounded-lg border border-slate-100 flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="min-w-0 flex-1 cursor-pointer" onClick={() => onOpenScheme(scheme)}>
                    <h4 className="font-semibold text-xs text-slate-800 truncate hover:text-bengali-orange">
                      {scheme.title}
                    </h4>
                    <p className="text-[11px] text-slate-450 truncate mt-0.5">{scheme.categoryName}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onOpenScheme(scheme)}
                      className="p-1 px-2 text-[10px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors"
                    >
                      বিস্তারিত দেখুন
                    </button>
                    <button
                      onClick={() => unsaveScheme(scheme.id)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Saved jobs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-emerald-600" />
              আমার সংরক্ষিত চাকরি ও বৃত্তিসমূহ ({savedJobs.length})
            </h3>
          </div>

          {savedJobs.length === 0 ? (
            <div className="bg-slate-50 rounded-xl p-6 border border-dashed border-slate-200 text-center space-y-2">
              <Calendar className="h-8 w-8 text-slate-350 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">কোনো চাকরির বিজ্ঞপ্তি বা স্কলারশিপ সেভ করা নেই।</p>
              <p className="text-[11px] text-slate-455 leading-relaxed max-w-xs mx-auto">
                সময়সীমা শেষ হওয়ার আগে আবেদন সম্পন্ন করার সুবিধার্থে চাকরির খবর ও স্কলারশিপ বুকমার্ক করুন।
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-50 hover:bg-slate-100/70 p-3 rounded-lg border border-slate-100 flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="min-w-0 flex-1 cursor-pointer" onClick={() => onOpenJob(job)}>
                    <h4 className="font-semibold text-xs text-slate-800 truncate hover:text-emerald-700">
                      {job.title}
                    </h4>
                    <p className="text-[11px] text-red-650 font-bold mt-0.5">শেষ তারিখ: {job.lastDate}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onOpenJob(job)}
                      className="p-1 px-2 text-[10px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors"
                    >
                      আবেদন লিংক
                    </button>
                    <button
                      onClick={() => unsaveJob(job.id)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
