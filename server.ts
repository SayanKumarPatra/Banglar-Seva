import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import {
  getSupabaseStatus,
  getSchemes,
  upsertScheme,
  removeScheme,
  getJobs,
  upsertJob,
  removeJob,
  getScholarships,
  upsertScholarship,
  removeScholarship,
  getServices,
  upsertService,
  removeService
} from "./src/lib/supabase-server.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Supabase API Status and Data Routes
app.get("/api/supabase/status", async (req, res) => {
  try {
    const status = await getSupabaseStatus();
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Schemes Endpoints
app.get("/api/schemes", async (req, res) => {
  const data = await getSchemes();
  res.json(data);
});

app.post("/api/schemes", async (req, res) => {
  try {
    await upsertScheme(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/schemes/:id", async (req, res) => {
  try {
    await removeScheme(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Jobs Endpoints
app.get("/api/jobs", async (req, res) => {
  const data = await getJobs();
  res.json(data);
});

app.post("/api/jobs", async (req, res) => {
  try {
    await upsertJob(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    await removeJob(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Scholarships Endpoints
app.get("/api/scholarships", async (req, res) => {
  const data = await getScholarships();
  res.json(data);
});

app.post("/api/scholarships", async (req, res) => {
  try {
    await upsertScholarship(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/scholarships/:id", async (req, res) => {
  try {
    await removeScholarship(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Services Endpoints
app.get("/api/services", async (req, res) => {
  const data = await getServices();
  res.json(data);
});

app.post("/api/services", async (req, res) => {
  try {
    await upsertService(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    await removeService(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Warning: GEMINI_API_KEY is not defined. AI Assistant will use mock responses.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const ai = getGeminiClient();

// Gemini API chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      return res.json({
        text: "নমস্কার! বর্তমানে এআই সিস্টেমে কানেকশন সমস্যা হচ্ছে। তবে আমি আপনাকে সাহায্য করতে এখানে আছি। আপনার কি কোনো নির্দিষ্ট সরকারি প্রকল্প বা স্কলারশিপ সম্পর্কে জানতে চান? (যেমন: লক্ষ্মীর ভাণ্ডার, রূপশ্রী, কন্যাশ্রী বা ওয়াসিস স্কলারশিপ)"
      });
    }

    const systemInstruction = `
You are the AI Assistant for "বাংলার সরকার" (Banglar Sarkar), a premium, modern, independent citizen service portal in West Bengal, India. 
Respond ONLY in clean, polite, helpful, and natural colloquial Bengali. 
Explain that you are an independent AI helper and "বাংলার সরকার" is an independent public resources portal (NOT an official government website) where information about state/national services, scholarships, certificates, and jobs is aggregated.
Always gently remind users that actual applications must be completed on official government sites, but you are here to guide them about eligibility, documents required, and direct application links.

Focus on guidelines for West Bengal Schemes:
1. লক্ষ্মীর ভাণ্ডার (Lakshmir Bhandar): For women aged 25-60, general get ₹1000/month, SC/ST get ₹1200/month (increased values). Required: Swasthya Sathi Card, Aadhaar, Caste certificate, Bank account.
2. কৃষক বন্ধু (Krishak Bandhu): Financial aid for farmers up to ₹10,000 yearly. Land records (Parcha) or voter card required.
3. স্বাস্থ্য সাথী (Swasthya Sathi): Health insurance up to ₹5 Lakh per family per year.
4. কন্যাশ্রী (Kanyashree): Scholarship for girls (K1 for girls 13-18 with ₹1000/yr, K2 one-time grant of ₹25,000 at age 18 if unmarried and studying).
5. রূপশ্রী (Rupashree): Financial grant of ₹25,000 for marriage of poor girls (aged 18+, income < ₹1.5 Lakh/yr).
6. ওয়াসিস (OASIS), স্বামী বিবেকানন্দ মেরিট স্কলারশিপ (SVMCM), আধার আপডেট, প্যান কার্ড, ড্রাইভিং লাইসেন্স এবং কাস্ট সার্টিফিকেট আবেদনের প্রক্রিয়াও সংক্ষিপ্ত ও স্পষ্ট বাংলায় বলবেন।

Format text clearly with bullet points and bold headers. Keep answers helpful for older citizens too (no complex english terms unless writing direct scheme names).
    `;

    // Process Gemini chat using the recommended gemini-3.5-flash model
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Load pre-existing chat history if any to maintain contest
    if (history && Array.isArray(history)) {
      // Re-hydrate the chats if needed. For simplicity we can pass the whole context in contents inside generateContent, 
      // or build a single text block. Let's build a single session prompt context to ensure maximum responsiveness.
    }

    // Call SDK to generate response
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
      }
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API Error in backend:", err);
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
});

// Configure Vite or server static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

startServer();
