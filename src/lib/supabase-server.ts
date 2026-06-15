import { createClient } from "@supabase/supabase-js";
import { 
  Scheme, 
  Job, 
  Scholarship, 
  ServiceItem,
  INITIAL_SCHEMES, 
  INITIAL_JOBS, 
  INITIAL_SCHOLARSHIPS, 
  SERVICES_DATA 
} from "../data.ts";

/**
 * Configure Supabase credentials
 * We use user-provided parameters as fallback values for instant zero-config experience.
 */
const SUPABASE_URL = process.env.SUPABASE_URL || "https://xloshheropsxiuqezaum.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_secret_nV6cNWcBWGr60-ReL-vG-A_uDooHrYi";

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

// Clean in-memory fallback state to ensure perfect reliability
const localMemoryStore = {
  schemes: [...INITIAL_SCHEMES] as Scheme[],
  jobs: [...INITIAL_JOBS] as Job[],
  scholarships: [...INITIAL_SCHOLARSHIPS] as Scholarship[],
  services: [...SERVICES_DATA] as ServiceItem[],
};

// Log connectivity state
console.log(`[Supabase] Initializing connection with endpoint: ${SUPABASE_URL}`);

/**
 * Interface representing table availability status
 */
export interface SupabaseStatus {
  connected: boolean;
  tablesExist: {
    schemes: boolean;
    jobs: boolean;
    scholarships: boolean;
    services: boolean;
  };
  hasError: boolean;
  errorMessage: string | null;
}

/**
 * Checks whether the tables exist in the user's Supabase workspace
 */
export async function getSupabaseStatus(): Promise<SupabaseStatus> {
  const status: SupabaseStatus = {
    connected: false,
    tablesExist: {
      schemes: false,
      jobs: false,
      scholarships: false,
      services: false,
    },
    hasError: false,
    errorMessage: null,
  };

  try {
    // 1. Try schemes
    const testSchemes = await supabase.from("schemes").select("id").limit(1);
    status.tablesExist.schemes = !testSchemes.error || testSchemes.error.code !== "42P01";
    
    // 2. Try jobs
    const testJobs = await supabase.from("jobs").select("id").limit(1);
    status.tablesExist.jobs = !testJobs.error || testJobs.error.code !== "42P01";

    // 3. Try scholarships
    const testScholarships = await supabase.from("scholarships").select("id").limit(1);
    status.tablesExist.scholarships = !testScholarships.error || testScholarships.error.code !== "42P01";

    // 4. Try services
    const testServices = await supabase.from("services").select("id").limit(1);
    status.tablesExist.services = !testServices.error || testServices.error.code !== "42P01";

    status.connected = true;
    if (testSchemes.error && testSchemes.error.code !== "42P01") {
      status.hasError = true;
      status.errorMessage = testSchemes.error.message;
    }
  } catch (err: any) {
    status.connected = false;
    status.hasError = true;
    status.errorMessage = err.message || String(err);
  }

  return status;
}

/**
 * SCHEMES OPERATIONS
 */
export async function getSchemes(): Promise<Scheme[]> {
  try {
    const { data, error } = await supabase.from("schemes").select("*").order("created_at", { ascending: false });
    if (error) {
      if (error.code === "42P01") {
        console.warn("[Supabase] schemes table not found. Using local in-memory fallback.");
        return localMemoryStore.schemes;
      }
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("[Supabase] schemes table is empty. Auto-seeding initial schemes...");
      const mapped = INITIAL_SCHEMES.map(item => ({
        id: item.id,
        title: item.title,
        titleEn: item.titleEn,
        category: item.category,
        categoryName: item.categoryName,
        description: item.description,
        benefits: item.benefits,
        eligibility: item.eligibility,
        documents: item.documents,
        officialUrl: item.officialUrl,
        isPopular: item.isPopular || false,
        logoUrl: item.logoUrl || ""
      }));
      
      const { error: seedError } = await supabase.from("schemes").insert(mapped);
      if (!seedError) {
        return mapped as Scheme[];
      } else {
        console.error("[Supabase] Seeding schemes failed:", seedError.message);
      }
      return INITIAL_SCHEMES;
    }

    return data as Scheme[];
  } catch (err) {
    console.error("[Supabase] Error in getSchemes:", err);
    return localMemoryStore.schemes;
  }
}

export async function upsertScheme(scheme: Scheme): Promise<void> {
  const payload = {
    id: scheme.id,
    title: scheme.title,
    titleEn: scheme.titleEn || "",
    category: scheme.category,
    categoryName: scheme.categoryName,
    description: scheme.description,
    benefits: scheme.benefits,
    eligibility: scheme.eligibility,
    documents: scheme.documents || [],
    officialUrl: scheme.officialUrl,
    isPopular: scheme.isPopular || false,
    logoUrl: scheme.logoUrl || "",
    created_at: new Date().toISOString()
  };

  // Keep memory in sync
  const idx = localMemoryStore.schemes.findIndex(s => s.id === scheme.id);
  if (idx !== -1) {
    localMemoryStore.schemes[idx] = scheme;
  } else {
    localMemoryStore.schemes.unshift(scheme);
  }

  try {
    const { error } = await supabase.from("schemes").upsert(payload, { onConflict: "id" });
    if (error && error.code !== "42P01") throw error;
  } catch (err) {
    console.error(`[Supabase] Error in upsertScheme for ${scheme.id}:`, err);
  }
}

export async function removeScheme(id: string): Promise<void> {
  localMemoryStore.schemes = localMemoryStore.schemes.filter(s => s.id !== id);
  try {
    const { error } = await supabase.from("schemes").delete().eq("id", id);
    if (error && error.code !== "42P01") throw error;
  } catch (err) {
    console.error(`[Supabase] Error in removeScheme for ${id}:`, err);
  }
}

/**
 * JOBS OPERATIONS
 */
export async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    if (error) {
      if (error.code === "42P01") {
        console.warn("[Supabase] jobs table not found. Using local in-memory fallback.");
        return localMemoryStore.jobs;
      }
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("[Supabase] jobs table is empty. Auto-seeding initial jobs...");
      const mapped = INITIAL_JOBS.map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle || "",
        category: item.category,
        categoryName: item.categoryName,
        vacancy: item.vacancy,
        qualification: item.qualification,
        lastDate: item.lastDate,
        officialUrl: item.officialUrl,
        salary: item.salary || "",
        isPopular: item.isPopular || false,
        logoUrl: item.logoUrl || ""
      }));

      const { error: seedError } = await supabase.from("jobs").insert(mapped);
      if (!seedError) {
        return mapped as unknown as Job[];
      }
      return INITIAL_JOBS;
    }

    return data as unknown as Job[];
  } catch (err) {
    console.error("[Supabase] Error in getJobs:", err);
    return localMemoryStore.jobs;
  }
}

export async function upsertJob(job: Job): Promise<void> {
  const payload = {
    id: job.id,
    title: job.title,
    subtitle: job.subtitle || "",
    category: job.category,
    categoryName: job.categoryName,
    vacancy: job.vacancy,
    qualification: job.qualification,
    lastDate: job.lastDate,
    officialUrl: job.officialUrl,
    salary: job.salary || "",
    isPopular: job.isPopular || false,
    logoUrl: job.logoUrl || "",
    created_at: new Date().toISOString()
  };

  const idx = localMemoryStore.jobs.findIndex(j => j.id === job.id);
  if (idx !== -1) {
    localMemoryStore.jobs[idx] = job;
  } else {
    localMemoryStore.jobs.unshift(job);
  }

  try {
    const { error } = await supabase.from("jobs").upsert(payload, { onConflict: "id" });
    if (error && error.code !== "42P01") throw error;
  } catch (err) {
    console.error(`[Supabase] Error in upsertJob for ${job.id}:`, err);
  }
}

export async function removeJob(id: string): Promise<void> {
  localMemoryStore.jobs = localMemoryStore.jobs.filter(j => j.id !== id);
  try {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error && error.code !== "42P01") throw error;
  } catch (err) {
    console.error(`[Supabase] Error in removeJob for ${id}:`, err);
  }
}

/**
 * SCHOLARSHIPS OPERATIONS
 */
export async function getScholarships(): Promise<Scholarship[]> {
  try {
    const { data, error } = await supabase.from("scholarships").select("*").order("created_at", { ascending: false });
    if (error) {
      if (error.code === "42P01") {
        console.warn("[Supabase] scholarships table not found. Using local in-memory fallback.");
        return localMemoryStore.scholarships;
      }
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("[Supabase] scholarships table is empty. Auto-seeding initial scholarships...");
      const mapped = INITIAL_SCHOLARSHIPS.map(item => ({
        id: item.id,
        title: item.title,
        amount: item.amount,
        eligibility: item.eligibility,
        lastDate: item.lastDate,
        officialUrl: item.officialUrl,
        description: item.description,
        logoUrl: item.logoUrl || ""
      }));

      const { error: seedError } = await supabase.from("scholarships").insert(mapped);
      if (!seedError) {
        return mapped as Scholarship[];
      }
      return INITIAL_SCHOLARSHIPS;
    }

    return data as Scholarship[];
  } catch (err) {
    console.error("[Supabase] Error in getScholarships:", err);
    return localMemoryStore.scholarships;
  }
}

export async function upsertScholarship(scholarship: Scholarship): Promise<void> {
  const payload = {
    id: scholarship.id,
    title: scholarship.title,
    amount: scholarship.amount,
    eligibility: scholarship.eligibility,
    lastDate: scholarship.lastDate,
    officialUrl: scholarship.officialUrl,
    description: scholarship.description,
    logoUrl: scholarship.logoUrl || "",
    created_at: new Date().toISOString()
  };

  const idx = localMemoryStore.scholarships.findIndex(s => s.id === scholarship.id);
  if (idx !== -1) {
    localMemoryStore.scholarships[idx] = scholarship;
  } else {
    localMemoryStore.scholarships.unshift(scholarship);
  }

  try {
    const { error } = await supabase.from("scholarships").upsert(payload, { onConflict: "id" });
    if (error && error.code !== "42P01") throw error;
  } catch (err) {
    console.error(`[Supabase] Error in upsertScholarship for ${scholarship.id}:`, err);
  }
}

export async function removeScholarship(id: string): Promise<void> {
  localMemoryStore.scholarships = localMemoryStore.scholarships.filter(s => s.id !== id);
  try {
    const { error } = await supabase.from("scholarships").delete().eq("id", id);
    if (error && error.code !== "42P01") throw error;
  } catch (err) {
    console.error(`[Supabase] Error in removeScholarship for ${id}:`, err);
  }
}

/**
 * DIGITAL SERVICES OPERATIONS
 */
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    if (error) {
      if (error.code === "42P01") {
        console.warn("[Supabase] services table not found. Using local in-memory fallback.");
        return localMemoryStore.services;
      }
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("[Supabase] services table is empty. Auto-seeding initial services...");
      const mapped = SERVICES_DATA.map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle || "",
        category: item.category,
        categoryName: item.categoryName,
        badge: item.badge || "",
        btnText: item.btnText || "",
        description: item.description,
        steps: item.steps || [],
        officialUrl: item.officialUrl,
        logoUrl: item.logoUrl || ""
      }));

      const { error: seedError } = await supabase.from("services").insert(mapped);
      if (!seedError) {
        return mapped as ServiceItem[];
      }
      return SERVICES_DATA;
    }

    return data as ServiceItem[];
  } catch (err) {
    console.error("[Supabase] Error in getServices:", err);
    return localMemoryStore.services;
  }
}

export async function upsertService(service: ServiceItem): Promise<void> {
  const payload = {
    id: service.id,
    title: service.title,
    subtitle: service.subtitle || "",
    category: service.category,
    categoryName: service.categoryName,
    badge: service.badge || "",
    btnText: service.btnText || "",
    description: service.description,
    steps: service.steps || [],
    officialUrl: service.officialUrl,
    logoUrl: service.logoUrl || "",
    created_at: new Date().toISOString()
  };

  const idx = localMemoryStore.services.findIndex(s => s.id === service.id);
  if (idx !== -1) {
    localMemoryStore.services[idx] = service;
  } else {
    localMemoryStore.services.unshift(service);
  }

  try {
    const { error } = await supabase.from("services").upsert(payload, { onConflict: "id" });
    if (error && error.code !== "42P01") throw error;
  } catch (err) {
    console.error(`[Supabase] Error in upsertService for ${service.id}:`, err);
  }
}

export async function removeService(id: string): Promise<void> {
  localMemoryStore.services = localMemoryStore.services.filter(s => s.id !== id);
  try {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error && error.code !== "42P01") throw error;
  } catch (err) {
    console.error(`[Supabase] Error in removeService for ${id}:`, err);
  }
}
