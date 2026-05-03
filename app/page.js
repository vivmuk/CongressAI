"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import styles from "../styles/Home.module.css";

const DEFAULT_MODEL = "kimi-k2-5";

/* ─── Inline SVG Icon Components ─── */
function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconAgenda() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function IconHCP() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconInsights() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconBookmark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IconUpload() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function IconSave() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
    </svg>
  );
}
function IconMic() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── Tabs ─── */
const TABS = [
  { key: "dashboard", label: "Dashboard", icon: IconDashboard },
  { key: "agenda", label: "Agenda", icon: IconAgenda },
  { key: "hcp", label: "HCP Intelligence", icon: IconHCP },
  { key: "insights", label: "Insights", icon: IconInsights },
  { key: "copilot", label: "Research Copilot", icon: IconChat },
  { key: "bookmarks", label: "Bookmarks", icon: IconBookmark },
  { key: "settings", label: "Settings", icon: IconSettings },
];

/* ─── Helpers ─── */
function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

function uniqueTopics(sessions) {
  const set = new Set();
  (sessions || []).forEach(s => (s.topics || []).forEach(t => set.add(t)));
  return [...set];
}

function uniqueSpeakers(sessions) {
  const set = new Set();
  (sessions || []).forEach(s => (s.speakers || []).forEach(sp => set.add(sp.name || sp)));
  return [...set];
}

/* ─── Main Component ─── */
export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // ── Core state ──
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [file, setFile] = useState(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [agendaJson, setAgendaJson] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Chat ──
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "You are a congress agenda assistant specialized in medical affairs." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ── Embeddings / Semantic ──
  const [sessionEmbeddings, setSessionEmbeddings] = useState(null);
  const [semanticQuery, setSemanticQuery] = useState("");
  const [semanticResults, setSemanticResults] = useState([]);

  // ── Save / Load ──
  const [savedId, setSavedId] = useState(null);
  const [savedList, setSavedList] = useState([]);

  // ── Agenda filters ──
  const [agendaFilter, setAgendaFilter] = useState({ track: "", topic: "", date: "", speaker: "" });
  const [expandedSession, setExpandedSession] = useState(null);
  const [uploadMode, setUploadMode] = useState("pdf"); // pdf | url | screenshot | excel

  // ── HCP ──
  const [hcpSearchName, setHcpSearchName] = useState("");
  const [hcpSearchAffil, setHcpSearchAffil] = useState("");
  const [hcpSearchResults, setHcpSearchResults] = useState([]);
  const [hcpList, setHcpList] = useState([]);
  const [hcpProfile, setHcpProfile] = useState(null);
  const [hcpLoading, setHcpLoading] = useState(false);

  // ── Insights ──
  const [briefing, setBriefing] = useState(null);
  const [competitive, setCompetitive] = useState(null);
  const [clusters, setClusters] = useState(null);
  const [mustAttend, setMustAttend] = useState(null);
  const [kolRankings, setKolRankings] = useState(null);
  const [insightLoading, setInsightLoading] = useState("");
  const [activeInsight, setActiveInsight] = useState("briefing");

  // ── Bookmarks ──
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // ── TTS ──
  const [ttsLoading, setTtsLoading] = useState(false);

  // ── Mobile sidebar ──
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Effects ──
  useEffect(() => {
    fetch("/api/models").then(r => r.json()).then(data => {
      setModels(data.data?.filter(m => m.type === "text") || []);
    }).catch(() => setModels([]));

    loadSavedList();
  }, []);

  useEffect(() => {
    if (agendaJson) loadBookmarks();
  }, [savedId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function loadSavedList() {
    fetch("/api/list").then(r => r.json()).then(data => setSavedList(data.items || [])).catch(() => {});
  }

  function loadBookmarks() {
    if (!agendaJson) return;
    // Use savedId if we have one, else derive from data
    const cid = savedId || "current";
    fetch(`/api/bookmarks/list?congressId=${cid}`).then(r => r.json()).then(data => setBookmarks(data.bookmarks || data.items || [])).catch(() => {});
  }

  // ── Derived ──
  const agendaContext = useMemo(() => {
    if (!agendaJson) return null;
    return JSON.stringify(agendaJson).slice(0, 8000);
  }, [agendaJson]);

  const sessions = agendaJson?.sessions || [];
  const topics = useMemo(() => uniqueTopics(sessions), [sessions]);
  const speakers = useMemo(() => uniqueSpeakers(sessions), [sessions]);
  const tracks = useMemo(() => [...new Set(sessions.map(s => s.track).filter(Boolean))], [sessions]);
  const dates = useMemo(() => [...new Set(sessions.map(s => s.date).filter(Boolean))], [sessions]);

  const filteredSessions = useMemo(() => {
    return sessions.filter(s => {
      if (agendaFilter.track && s.track !== agendaFilter.track) return false;
      if (agendaFilter.topic && !(s.topics || []).includes(agendaFilter.topic)) return false;
      if (agendaFilter.date && s.date !== agendaFilter.date) return false;
      if (agendaFilter.speaker && !(s.speakers || []).some(sp => (sp.name || sp).toLowerCase().includes(agendaFilter.speaker.toLowerCase()))) return false;
      return true;
    });
  }, [sessions, agendaFilter]);

  // ── Handlers ──
  async function handlePdfAnalyze(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true); setError("");
    try {
      const form = new FormData(); form.append("file", file);
      const res = await fetch("/api/analyze/pdf", { method: "POST", body: form });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAgendaJson(data);
      setSummary(data?.highlights?.join("\n") || "");
      setSessionEmbeddings(null); setSemanticResults([]);
      setActiveTab("agenda");
    } catch (err) { setError(err.message || "Failed to analyze PDF"); }
    finally { setLoading(false); }
  }

  async function handleWebsiteAnalyze(e) {
    e.preventDefault();
    if (!websiteUrl) return;
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/analyze/website", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: websiteUrl }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAgendaJson(data);
      setSummary(data?.highlights?.join("\n") || "");
      setSessionEmbeddings(null); setSemanticResults([]);
      setActiveTab("agenda");
    } catch (err) { setError(err.message || "Failed to analyze website"); }
    finally { setLoading(false); }
  }

  async function handleScreenshotAnalyze(e) {
    e.preventDefault();
    if (!imageFile) return;
    setLoading(true); setError("");
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch("/api/analyze/screenshot", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: reader.result }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setAgendaJson(data);
        setSummary(data?.highlights?.join("\n") || "");
        setSessionEmbeddings(null); setSemanticResults([]);
        setActiveTab("agenda");
      } catch (err) { setError(err.message || "Failed to analyze screenshot"); }
      finally { setLoading(false); }
    };
    reader.readAsDataURL(imageFile);
  }

  async function handleExcelAnalyze(e) {
    e.preventDefault();
    if (!excelFile) return;
    setLoading(true); setError("");
    try {
      const form = new FormData(); form.append("file", excelFile);
      const res = await fetch("/api/analyze/excel", { method: "POST", body: form });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAgendaJson(data);
      setSummary(data?.highlights?.join("\n") || "");
      setSessionEmbeddings(null); setSemanticResults([]);
      setActiveTab("agenda");
    } catch (err) { setError(err.message || "Failed to analyze file"); }
    finally { setLoading(false); }
  }

  async function handleChatSend() {
    if (!chatInput.trim() || chatLoading) return;
    const next = [...chatMessages, { role: "user", content: chatInput }];
    setChatMessages(next); setChatInput(""); setChatLoading(true);
    try {
      const systemAugmented = agendaContext
        ? [{ role: "system", content: `You have this agenda context: ${agendaContext}` }, ...next]
        : next;
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: systemAugmented, model: selectedModel }),
      });
      const data = await res.json();
      const assistantContent = data.content || "";
      const citations = data.citations || [];
      setChatMessages([...next, { role: "assistant", content: assistantContent, citations }]);
    } catch { setChatMessages([...next, { role: "assistant", content: "Sorry, an error occurred." }]); }
    finally { setChatLoading(false); }
  }

  async function handleTTS() {
    if (!summary || ttsLoading) return;
    setTtsLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary, voice: "af_nova", speed: 1.0 }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "summary.mp3"; a.click();
      URL.revokeObjectURL(url);
    } catch {} finally { setTtsLoading(false); }
  }

  async function handleEmbedSessions() {
    if (!sessions.length) return;
    const texts = sessions.map(s => `${s.title} ${s.abstract || ""} ${(s.topics || []).join(" ")}`);
    const res = await fetch("/api/embeddings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: texts }),
    });
    const data = await res.json();
    setSessionEmbeddings(data.data || []);
  }

  async function handleSemanticSearch() {
    if (!semanticQuery || !sessionEmbeddings?.length) return;
    const res = await fetch("/api/embeddings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: semanticQuery }),
    });
    const data = await res.json();
    const q = data.data?.[0]?.embedding;
    if (!q) return;
    const scored = sessionEmbeddings.map((e, idx) => ({
      idx, score: cosineSim(q, e.embedding),
    })).sort((a, b) => b.score - a.score).slice(0, 5);
    setSemanticResults(scored.map(s => ({ score: s.score, session: sessions[s.idx] })));
  }

  async function handleSave() {
    if (!agendaJson) return;
    try {
      const res = await fetch("/api/save", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: agendaJson?.conference?.name, data: agendaJson, source_url: websiteUrl || null }),
      });
      const data = await res.json();
      if (data.id) {
        setSavedId(data.id);
        await loadSavedList();
      }
    } catch {}
  }

  async function handleLoadCongress(id) {
    setLoading(true); setError("");
    try {
      const res = await fetch(`/api/get?id=${id}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setAgendaJson(data);
      setSummary(data?.highlights?.join("\n") || "");
      setSavedId(id);
      setSessionEmbeddings(null); setSemanticResults([]);
      setActiveTab("agenda");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function handleExportCSV() {
    if (!savedId) return;
    window.open(`/api/export?id=${savedId}`, "_blank");
  }

  async function handleExportIcal() {
    if (!savedId) return;
    window.open(`/api/ical?id=${savedId}`, "_blank");
  }

  // ── HCP Handlers ──
  async function handleHcpSearch(e) {
    e.preventDefault();
    if (!hcpSearchName && !hcpSearchAffil) return;
    setHcpLoading(true);
    try {
      const res = await fetch("/api/hcp/search", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: hcpSearchName, affiliation: hcpSearchAffil }),
      });
      const data = await res.json();
      setHcpSearchResults(data.results || data || []);
    } catch {} finally { setHcpLoading(false); }
  }

  async function handleHcpLoad(congressId) {
    setHcpLoading(true);
    try {
      const res = await fetch(`/api/hcp/list?congressId=${congressId || savedId || "current"}`);
      const data = await res.json();
      setHcpList(data.hcps || data.results || data || []);
    } catch {} finally { setHcpLoading(false); }
  }

  async function handleHcpProfile(name, affiliation) {
    setHcpLoading(true);
    try {
      const res = await fetch("/api/hcp/profile", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, affiliation, congressId: savedId || "current" }),
      });
      const data = await res.json();
      setHcpProfile(data);
    } catch {} finally { setHcpLoading(false); }
  }

  // ── Insights Handlers ──
  async function handleInsightGenerate(type) {
    if (!agendaJson) return;
    setInsightLoading(type);
    try {
      const res = await fetch(`/api/insights/${type}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ congressData: agendaJson }),
      });
      const data = await res.json();
      if (type === "briefing") setBriefing(data);
      else if (type === "competitive") setCompetitive(data);
      else if (type === "clusters") setClusters(data);
      else if (type === "must-attend") setMustAttend(data);
      else if (type === "kol") setKolRankings(data);
    } catch {} finally { setInsightLoading(""); }
  }

  // ── Bookmark Handlers ──
  async function handleBookmarkSave(itemType, itemId) {
    if (!savedId) return;
    setBookmarkLoading(true);
    try {
      await fetch("/api/bookmarks/save", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ congressId: savedId, itemType, itemId }),
      });
      await loadBookmarks();
    } catch {} finally { setBookmarkLoading(false); }
  }

  async function handleBookmarkRemove(id) {
    setBookmarkLoading(true);
    try {
      await fetch("/api/bookmarks/remove", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await loadBookmarks();
    } catch {} finally { setBookmarkLoading(false); }
  }

  async function handleExportBriefing() {
    if (!agendaJson) return;
    try {
      const res = await fetch("/api/export/briefing", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ congressData: agendaJson, format: "html" }),
      });
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "briefing.json"; a.click();
      URL.revokeObjectURL(url);
    } catch {}
  }

  /* ═══════════════════════════════════════════
     RENDER: Tab Content
     ═══════════════════════════════════════════ */

  function renderDashboard() {
    const totalSessions = sessions.length;
    const uniqueSpeakersCount = speakers.length;
    const topicCount = topics.length;
    const mustAttendCount = sessions.filter(s => s.priority === "must-attend" || s.must_attend).length;

    return (
      <div className={styles.tabContent}>
        <div className={styles.sectionHeader}>
          <h2>Congress Dashboard</h2>
          <p>{agendaJson ? (agendaJson.conference?.name || "Congress Overview") : "Load a congress agenda to see analytics"}</p>
        </div>

        {/* KPI Cards */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconBlue}><IconAgenda /></div>
            <div className={styles.kpiInfo}>
              <span className={styles.kpiLabel}>Total Sessions</span>
              <span className={styles.kpiValue}>{totalSessions}</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconPurple}><IconHCP /></div>
            <div className={styles.kpiInfo}>
              <span className={styles.kpiLabel}>Unique Speakers</span>
              <span className={styles.kpiValue}>{uniqueSpeakersCount}</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconTeal}><IconInsights /></div>
            <div className={styles.kpiInfo}>
              <span className={styles.kpiLabel}>Key Topics</span>
              <span className={styles.kpiValue}>{topicCount}</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIconAmber}><IconStar /></div>
            <div className={styles.kpiInfo}>
              <span className={styles.kpiLabel}>Must-Attend</span>
              <span className={styles.kpiValue}>{mustAttendCount}</span>
            </div>
          </div>
        </div>

        {/* Daily Briefing Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Daily Briefing</h3>
            <button className={styles.btnPrimary} onClick={() => handleInsightGenerate("briefing")} disabled={!agendaJson || insightLoading === "briefing"}>
              {insightLoading === "briefing" ? <><IconSpinner /> Generating...</> : "Generate Briefing"}
            </button>
          </div>
          <div className={styles.cardBody}>
            {briefing ? (
              <div className={styles.briefingContent}>
                {briefing.insights ? briefing.insights.map((item, i) => (
                  <div key={i} className={styles.briefingItem}>
                    <span className={styles.briefingNum}>{i + 1}</span>
                    <div>
                      <strong>{item.title || item.headline}</strong>
                      <p>{item.summary || item.description}</p>
                    </div>
                  </div>
                )) : (
                  <pre className={styles.jsonBlock}>{JSON.stringify(briefing, null, 2).slice(0, 2000)}</pre>
                )}
              </div>
            ) : (
              <p className={styles.emptyState}>Load a congress agenda and generate a briefing to see key insights for your medical affairs team.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h3>Quick Actions</h3></div>
          <div className={styles.cardBody}>
            <div className={styles.quickActions}>
              <button className={styles.btnSecondary} onClick={() => setActiveTab("agenda")} disabled={!agendaJson}>
                <IconAgenda /> View Full Agenda
              </button>
              <button className={styles.btnSecondary} onClick={() => setActiveTab("hcp")} disabled={!agendaJson}>
                <IconHCP /> HCP Intelligence
              </button>
              <button className={styles.btnSecondary} onClick={() => setActiveTab("insights")} disabled={!agendaJson}>
                <IconInsights /> Generate Insights
              </button>
              <button className={styles.btnSecondary} onClick={() => setActiveTab("copilot")} disabled={!agendaJson}>
                <IconChat /> Research Copilot
              </button>
            </div>
          </div>
        </div>

        {/* Saved Congresses */}
        {savedList.length > 0 && (
          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>Saved Congresses</h3></div>
            <div className={styles.cardBody}>
              <div className={styles.savedGrid}>
                {savedList.map(c => (
                  <div key={c.id} className={styles.savedCard} onClick={() => handleLoadCongress(c.id)}>
                    <div className={styles.savedCardName}>{c.name || c.id}</div>
                    <div className={styles.savedCardDate}>{new Date(c.created_at).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderAgenda() {
    return (
      <div className={styles.tabContent}>
        <div className={styles.sectionHeader}>
          <h2>Congress Agenda</h2>
          <p>Upload, parse, and explore the structured agenda</p>
        </div>

        {/* Upload Section */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Upload Agenda Source</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.uploadTabs}>
              {["pdf", "url", "screenshot", "excel"].map(mode => (
                <button key={mode}
                  className={`${styles.uploadTab} ${uploadMode === mode ? styles.uploadTabActive : ""}`}
                  onClick={() => setUploadMode(mode)}
                >
                  {mode === "pdf" ? "PDF" : mode === "url" ? "Website URL" : mode === "screenshot" ? "Screenshot" : "CSV / Excel"}
                </button>
              ))}
            </div>

            {uploadMode === "pdf" && (
              <form onSubmit={handlePdfAnalyze} className={styles.uploadForm}>
                <div className={styles.fileInputWrap}>
                  <input type="file" id="pdf-file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} className={styles.fileInputHidden} />
                  <label htmlFor="pdf-file" className={styles.fileInputLabel}>
                    <IconUpload />
                    <span>{file ? file.name : "Choose PDF file..."}</span>
                  </label>
                </div>
                <button type="submit" className={styles.btnPrimary} disabled={loading || !file}>
                  {loading ? <><IconSpinner /> Analyzing...</> : "Analyze PDF"}
                </button>
              </form>
            )}

            {uploadMode === "url" && (
              <form onSubmit={handleWebsiteAnalyze} className={styles.uploadForm}>
                <input type="url" placeholder="https://conference.org/agenda" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} className={styles.textInput} />
                <button type="submit" className={styles.btnPrimary} disabled={loading || !websiteUrl}>
                  {loading ? <><IconSpinner /> Analyzing...</> : "Analyze Website"}
                </button>
              </form>
            )}

            {uploadMode === "screenshot" && (
              <form onSubmit={handleScreenshotAnalyze} className={styles.uploadForm}>
                <div className={styles.fileInputWrap}>
                  <input type="file" id="img-file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className={styles.fileInputHidden} />
                  <label htmlFor="img-file" className={styles.fileInputLabel}>
                    <IconUpload />
                    <span>{imageFile ? imageFile.name : "Choose screenshot..."}</span>
                  </label>
                </div>
                <button type="submit" className={styles.btnPrimary} disabled={loading || !imageFile}>
                  {loading ? <><IconSpinner /> Analyzing...</> : "Analyze Screenshot"}
                </button>
              </form>
            )}

            {uploadMode === "excel" && (
              <form onSubmit={handleExcelAnalyze} className={styles.uploadForm}>
                <div className={styles.fileInputWrap}>
                  <input type="file" id="excel-file" accept=".csv,.xlsx,.xls" onChange={e => setExcelFile(e.target.files?.[0] || null)} className={styles.fileInputHidden} />
                  <label htmlFor="excel-file" className={styles.fileInputLabel}>
                    <IconUpload />
                    <span>{excelFile ? excelFile.name : "Choose CSV/XLSX file..."}</span>
                  </label>
                </div>
                <button type="submit" className={styles.btnPrimary} disabled={loading || !excelFile}>
                  {loading ? <><IconSpinner /> Analyzing...</> : "Analyze Spreadsheet"}
                </button>
              </form>
            )}

            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
        </div>

        {/* Agenda Data */}
        {agendaJson && (
          <>
            {/* Actions Bar */}
            <div className={styles.actionsBar}>
              <div className={styles.actionsLeft}>
                <button className={styles.btnPrimary} onClick={handleSave}><IconSave /> Save to Database</button>
                {savedId && <button className={styles.btnSecondary} onClick={handleExportCSV}><IconDownload /> Export CSV</button>}
                {savedId && <button className={styles.btnSecondary} onClick={handleExportIcal}><IconDownload /> Export iCal</button>}
              </div>
              {savedId && <span className={styles.savedBadge}><IconCheck /> Saved: {savedId}</span>}
            </div>

            {/* Conference Meta */}
            {agendaJson.conference && (
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <div className={styles.conferenceMeta}>
                    <h3>{agendaJson.conference.name}</h3>
                    {agendaJson.conference.location && <span>{agendaJson.conference.location}</span>}
                    {agendaJson.conference.dates && <span>{agendaJson.conference.dates}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className={styles.card}>
              <div className={styles.cardHeader}><h3>Filter Sessions</h3></div>
              <div className={styles.cardBody}>
                <div className={styles.filterGrid}>
                  <select value={agendaFilter.track} onChange={e => setAgendaFilter({...agendaFilter, track: e.target.value})} className={styles.selectInput}>
                    <option value="">All Tracks</option>
                    {tracks.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select value={agendaFilter.topic} onChange={e => setAgendaFilter({...agendaFilter, topic: e.target.value})} className={styles.selectInput}>
                    <option value="">All Topics</option>
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select value={agendaFilter.date} onChange={e => setAgendaFilter({...agendaFilter, date: e.target.value})} className={styles.selectInput}>
                    <option value="">All Dates</option>
                    {dates.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <input placeholder="Search speakers..." value={agendaFilter.speaker} onChange={e => setAgendaFilter({...agendaFilter, speaker: e.target.value})} className={styles.textInput} />
                </div>
                <div className={styles.filterStats}>
                  Showing {filteredSessions.length} of {sessions.length} sessions
                </div>
              </div>
            </div>

            {/* Highlights Summary */}
            {summary && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Highlights Summary</h3>
                  <button className={styles.btnSecondary} onClick={handleTTS} disabled={ttsLoading}>
                    <IconMic /> {ttsLoading ? "Generating..." : "Listen"}
                  </button>
                </div>
                <div className={styles.cardBody}>
                  <textarea className={styles.textarea} value={summary} onChange={e => setSummary(e.target.value)} rows={4} />
                </div>
              </div>
            )}

            {/* Session List */}
            <div className={styles.sessionList}>
              {filteredSessions.map((s, idx) => (
                <div key={idx} className={styles.sessionCard}>
                  <div className={styles.sessionHeader} onClick={() => setExpandedSession(expandedSession === idx ? null : idx)}>
                    <div className={styles.sessionTitleRow}>
                      <div>
                        <span className={styles.sessionTitle}>{s.title}</span>
                        {(s.priority === "must-attend" || s.must_attend) && <span className={styles.mustAttendBadge}>Must Attend</span>}
                      </div>
                      <span className={styles.chevron}><IconChevronDown /></span>
                    </div>
                    <div className={styles.sessionMeta}>
                      {s.date && <span>{s.date}</span>}
                      {s.time && <span>{s.time}</span>}
                      {s.track && <span className={styles.trackBadge}>{s.track}</span>}
                      {s.location && <span>{s.location}</span>}
                    </div>
                  </div>
                  {expandedSession === idx && (
                    <div className={styles.sessionExpanded}>
                      {s.abstract && <p className={styles.sessionAbstract}>{s.abstract}</p>}
                      {s.speakers && s.speakers.length > 0 && (
                        <div className={styles.speakerList}>
                          <strong>Speakers:</strong>
                          {s.speakers.map((sp, si) => (
                            <span key={si} className={styles.speakerBadge}>
                              {typeof sp === "string" ? sp : sp.name}{sp.role ? ` (${sp.role})` : ""}
                            </span>
                          ))}
                        </div>
                      )}
                      {s.topics && s.topics.length > 0 && (
                        <div className={styles.topicList}>
                          {s.topics.map((t, ti) => <span key={ti} className={styles.topicBadge}>{t}</span>)}
                        </div>
                      )}
                      <div className={styles.sessionActions}>
                        <button className={styles.btnSmall} onClick={() => handleBookmarkSave("session", s.id || idx)}>Bookmark</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Semantic Search */}
            <div className={styles.card}>
              <div className={styles.cardHeader}><h3>Semantic Search</h3></div>
              <div className={styles.cardBody}>
                <div className={styles.searchRow}>
                  <button className={styles.btnSecondary} onClick={handleEmbedSessions} disabled={!sessions.length}>
                    {sessionEmbeddings ? "Re-index" : "Index Sessions"}
                  </button>
                  <input value={semanticQuery} onChange={e => setSemanticQuery(e.target.value)} placeholder="Search sessions (e.g., CAR-T, biomarkers)..." className={styles.textInput} />
                  <button className={styles.btnPrimary} onClick={handleSemanticSearch} disabled={!sessionEmbeddings?.length}>Search</button>
                </div>
                {sessionEmbeddings && <span className={styles.embedStatus}>{sessionEmbeddings.length} sessions indexed</span>}
                <div className={styles.semanticResults}>
                  {semanticResults.map((r, i) => (
                    <div key={i} className={styles.semanticCard}>
                      <div className={styles.semanticScore}>Score: {r.score.toFixed(3)}</div>
                      <div className={styles.semanticTitle}>{r.session?.title}</div>
                      <div className={styles.semanticAbstract}>{r.session?.abstract}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {!agendaJson && !loading && (
          <div className={styles.card}>
            <div className={styles.emptyState}>
              <IconUpload />
              <p>Upload a congress agenda to get started. Supported formats: PDF, website URL, screenshot, or spreadsheet.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderHCP() {
    return (
      <div className={styles.tabContent}>
        <div className={styles.sectionHeader}>
          <h2>HCP Intelligence</h2>
          <p>Search and profile healthcare professionals relevant to your congress</p>
        </div>

        {/* Search */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><h3>Search HCPs</h3></div>
          <div className={styles.cardBody}>
            <form onSubmit={handleHcpSearch} className={styles.hcpSearchForm}>
              <input className={styles.textInput} placeholder="HCP Name (e.g., Dr. Jane Smith)" value={hcpSearchName} onChange={e => setHcpSearchName(e.target.value)} />
              <input className={styles.textInput} placeholder="Affiliation (optional)" value={hcpSearchAffil} onChange={e => setHcpSearchAffil(e.target.value)} />
              <button type="submit" className={styles.btnPrimary} disabled={hcpLoading}>Search</button>
            </form>
          </div>
        </div>

        {/* Load from congress */}
        {agendaJson && (
          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>HCPs from Current Congress</h3></div>
            <div className={styles.cardBody}>
              <button className={styles.btnSecondary} onClick={() => handleHcpLoad()} disabled={hcpLoading}>
                Load HCP List
              </button>
            </div>
          </div>
        )}

        {hcpLoading && <div className={styles.loadingBox}><IconSpinner /> Loading HCP data...</div>}

        {/* Search Results */}
        {hcpSearchResults.length > 0 && (
          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>Search Results</h3></div>
            <div className={styles.cardBody}>
              <div className={styles.hcpGrid}>
                {hcpSearchResults.map((hcp, i) => (
                  <div key={i} className={styles.hcpCard} onClick={() => handleHcpProfile(hcp.name, hcp.affiliation)}>
                    <div className={styles.hcpAvatar}>{(hcp.name || "?")[0]}</div>
                    <div className={styles.hcpInfo}>
                      <div className={styles.hcpName}>{hcp.name}</div>
                      <div className={styles.hcpAffil}>{hcp.affiliation || hcp.affiliation}</div>
                      {hcp.specialty && <div className={styles.hcpSpecialty}>{hcp.specialty}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HCP List from congress */}
        {hcpList.length > 0 && (
          <div className={styles.card}>
            <div className={styles.cardHeader}><h3>Congress HCPs</h3></div>
            <div className={styles.cardBody}>
              <div className={styles.hcpGrid}>
                {hcpList.map((hcp, i) => (
                  <div key={i} className={styles.hcpCard} onClick={() => handleHcpProfile(hcp.name, hcp.affiliation)}>
                    <div className={styles.hcpAvatar}>{(hcp.name || "?")[0]}</div>
                    <div className={styles.hcpInfo}>
                      <div className={styles.hcpName}>{hcp.name}</div>
                      <div className={styles.hcpAffil}>{hcp.affiliation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HCP Profile Detail */}
        {hcpProfile && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>HCP Profile: {hcpProfile.name}</h3>
              <button className={styles.btnSmall} onClick={() => handleBookmarkSave("hcp", hcpProfile.name)}>Bookmark</button>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.profileGrid}>
                <div className={styles.profileField}><label>Affiliation</label><span>{hcpProfile.affiliation || "N/A"}</span></div>
                <div className={styles.profileField}><label>Specialty</label><span>{hcpProfile.specialty || "N/A"}</span></div>
                <div className={styles.profileField}><label>Influence Score</label>
                  <span className={styles.influenceScore}>
                    {hcpProfile.influence_score || hcpProfile.influence || "N/A"} / 10
                  </span>
                </div>
              </div>

              {hcpProfile.why_this_hcp_matters && (
                <div className={styles.profileSection}>
                  <h4>Why This HCP Matters</h4>
                  <p>{hcpProfile.why_this_hcp_matters}</p>
                </div>
              )}

              {hcpProfile.publications && hcpProfile.publications.length > 0 && (
                <div className={styles.profileSection}>
                  <h4>Publications</h4>
                  <ul className={styles.pubList}>
                    {hcpProfile.publications.slice(0, 10).map((pub, i) => (
                      <li key={i}>{pub.title || pub}<span className={styles.pubMeta}>{pub.journal ? ` — ${pub.journal}` : ""}{pub.year ? ` (${pub.year})` : ""}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {hcpProfile.clinical_trials && hcpProfile.clinical_trials.length > 0 && (
                <div className={styles.profileSection}>
                  <h4>Clinical Trials</h4>
                  <ul className={styles.pubList}>
                    {hcpProfile.clinical_trials.slice(0, 10).map((trial, i) => (
                      <li key={i}>{trial.title || trial.name || trial}<span className={styles.pubMeta}>{trial.phase ? ` — Phase ${trial.phase}` : ""}{trial.status ? ` (${trial.status})` : ""}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {hcpProfile.speaking_history && hcpProfile.speaking_history.length > 0 && (
                <div className={styles.profileSection}>
                  <h4>Speaking History</h4>
                  <ul className={styles.pubList}>
                    {hcpProfile.speaking_history.slice(0, 10).map((ev, i) => (
                      <li key={i}>{ev.congress || ev.name || ev}{ev.year ? ` (${ev.year})` : ""}{ev.topic ? ` — ${ev.topic}` : ""}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hcpProfile.network && hcpProfile.network.length > 0 && (
                <div className={styles.profileSection}>
                  <h4>Network Connections</h4>
                  <div className={styles.networkList}>
                    {hcpProfile.network.map((conn, i) => (
                      <div key={i} className={styles.networkItem}>
                        <span className={styles.networkName}>{conn.co_presenter || conn.name}</span>
                        <span className={styles.networkSession}>{conn.session || conn.session_title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.profileRaw}>
                <details>
                  <summary>Raw Profile Data</summary>
                  <pre className={styles.jsonBlock}>{JSON.stringify(hcpProfile, null, 2).slice(0, 3000)}</pre>
                </details>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderInsights() {
    const insightCards = [
      { key: "briefing", label: "Daily Briefing", desc: "Top 10 key insights for your team", data: briefing },
      { key: "competitive", label: "Competitive Landscape", desc: "Competitor mentions and drug tracking", data: competitive },
      { key: "clusters", label: "Topic Clusters", desc: "AI-grouped themes with session counts", data: clusters },
      { key: "must-attend", label: "Must-Attend Sessions", desc: "Priority-ranked sessions", data: mustAttend },
      { key: "kol", label: "KOL Dashboard", desc: "Speaker rankings with influence scores", data: kolRankings },
    ];

    return (
      <div className={styles.tabContent}>
        <div className={styles.sectionHeader}>
          <h2>Congress Insights</h2>
          <p>Generate AI-powered insights from the agenda data</p>
        </div>

        {!agendaJson && (
          <div className={styles.card}>
            <div className={styles.emptyState}>
              <IconInsights />
              <p>Load a congress agenda first, then generate insights.</p>
            </div>
          </div>
        )}

        {agendaJson && (
          <>
            <div className={styles.insightCards}>
              {insightCards.map(ic => (
                <div key={ic.key} className={`${styles.insightCard} ${activeInsight === ic.key ? styles.insightCardActive : ""}`} onClick={() => setActiveInsight(ic.key)}>
                  <div className={styles.insightCardLabel}>{ic.label}</div>
                  <div className={styles.insightCardDesc}>{ic.desc}</div>
                  {ic.data && <span className={styles.insightCardBadge}>Generated</span>}
                </div>
              ))}
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{insightCards.find(i => i.key === activeInsight)?.label}</h3>
                <button className={styles.btnPrimary} onClick={() => handleInsightGenerate(activeInsight)} disabled={insightLoading === activeInsight}>
                  {insightLoading === activeInsight ? <><IconSpinner /> Generating...</> : "Generate"}
                </button>
              </div>
              <div className={styles.cardBody}>
                {insightLoading === activeInsight && (
                  <div className={styles.loadingBox}><IconSpinner /> Analyzing congress data...</div>
                )}

                {activeInsight === "briefing" && briefing && (
                  <div className={styles.insightContent}>
                    {briefing.insights ? briefing.insights.map((item, i) => (
                      <div key={i} className={styles.briefingItem}>
                        <span className={styles.briefingNum}>{i + 1}</span>
                        <div>
                          <strong>{item.title || item.headline}</strong>
                          <p>{item.summary || item.description}</p>
                        </div>
                      </div>
                    )) : <pre className={styles.jsonBlock}>{JSON.stringify(briefing, null, 2).slice(0, 3000)}</pre>}
                  </div>
                )}

                {activeInsight === "competitive" && competitive && (
                  <div className={styles.insightContent}>
                    {competitive.competitors ? competitive.competitors.map((comp, i) => (
                      <div key={i} className={styles.competitorCard}>
                        <strong>{comp.name || comp.company}</strong>
                        <p>{comp.summary || comp.description}</p>
                        {comp.mentions && <span className={styles.mentionCount}>{comp.mentions} mentions</span>}
                      </div>
                    )) : <pre className={styles.jsonBlock}>{JSON.stringify(competitive, null, 2).slice(0, 3000)}</pre>}
                  </div>
                )}

                {activeInsight === "clusters" && clusters && (
                  <div className={styles.insightContent}>
                    {clusters.clusters ? clusters.clusters.map((cl, i) => (
                      <div key={i} className={styles.clusterCard}>
                        <div className={styles.clusterHeader}>
                          <strong>{cl.name || cl.topic}</strong>
                          <span className={styles.clusterCount}>{cl.session_count || cl.count || 0} sessions</span>
                        </div>
                        <p>{cl.description}</p>
                      </div>
                    )) : <pre className={styles.jsonBlock}>{JSON.stringify(clusters, null, 2).slice(0, 3000)}</pre>}
                  </div>
                )}

                {activeInsight === "must-attend" && mustAttend && (
                  <div className={styles.insightContent}>
                    {mustAttend.sessions ? mustAttend.sessions.map((s, i) => (
                      <div key={i} className={styles.mustAttendCard}>
                        <span className={styles.mustAttendRank}>#{i + 1}</span>
                        <div>
                          <strong>{s.title}</strong>
                          <p>{s.reason || s.why || ""}</p>
                          <div className={styles.mustAttendMeta}>
                            {s.date && <span>{s.date}</span>}
                            {s.time && <span>{s.time}</span>}
                          </div>
                        </div>
                      </div>
                    )) : <pre className={styles.jsonBlock}>{JSON.stringify(mustAttend, null, 2).slice(0, 3000)}</pre>}
                  </div>
                )}

                {activeInsight === "kol" && kolRankings && (
                  <div className={styles.insightContent}>
                    {kolRankings.kols ? kolRankings.kols.map((kol, i) => (
                      <div key={i} className={styles.kolCard}>
                        <span className={styles.kolRank}>#{i + 1}</span>
                        <div className={styles.kolInfo}>
                          <strong>{kol.name}</strong>
                          <p>{kol.affiliation || kol.institution || ""}</p>
                          <div className={styles.kolMeta}>
                            <span>Influence: {kol.influence_score || kol.influence || "N/A"}/10</span>
                            <span>{kol.specialty || ""}</span>
                            {kol.reason && <p className={styles.kolReason}>{kol.reason}</p>}
                          </div>
                        </div>
                      </div>
                    )) : <pre className={styles.jsonBlock}>{JSON.stringify(kolRankings, null, 2).slice(0, 3000)}</pre>}
                  </div>
                )}

                {!insightLoading && !insightCards.find(i => i.key === activeInsight)?.data && (
                  <div className={styles.emptyState}>Click "Generate" to create this insight.</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  function renderCopilot() {
    return (
      <div className={styles.tabContent}>
        <div className={styles.sectionHeader}>
          <h2>Research Copilot</h2>
          <p>AI-powered chat with full congress context and citations</p>
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.chatMessages}>
            {chatMessages.filter(m => m.role !== "system").map((m, i) => (
              <div key={i} className={`${styles.chatBubble} ${m.role === "user" ? styles.chatBubbleUser : styles.chatBubbleBot}`}>
                <div className={styles.chatBubbleRole}>{m.role === "user" ? "You" : "AI Assistant"}</div>
                <div className={styles.chatBubbleContent}>
                  {m.content}
                  {m.citations && m.citations.length > 0 && (
                    <div className={styles.citations}>
                      <strong>Citations:</strong>
                      {m.citations.map((c, ci) => (
                        <span key={ci} className={styles.citation}>
                          {typeof c === "string" ? c : c.title || c.url || JSON.stringify(c)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className={`${styles.chatBubble} ${styles.chatBubbleBot}`}>
                <div className={styles.chatBubbleRole}>AI Assistant</div>
                <div className={styles.chatBubbleContent}><IconSpinner /> Thinking...</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className={styles.chatInputBar}>
            <input
              className={styles.chatTextInput}
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder={agendaJson ? "Ask about sessions, speakers, or topics..." : "Ask a question (load an agenda for context)..."}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleChatSend(); }}}
            />
            <button className={styles.chatSendBtn} onClick={handleChatSend} disabled={chatLoading || !chatInput.trim()}>
              Send
            </button>
          </div>

          <div className={styles.chatContext}>
            {agendaJson
              ? <span className={styles.contextActive}><IconCheck /> Congress data loaded — chat has full agenda context</span>
              : <span className={styles.contextInactive}>No congress data loaded — load an agenda on the Agenda tab for context-aware answers</span>
            }
          </div>
        </div>
      </div>
    );
  }

  function renderBookmarks() {
    return (
      <div className={styles.tabContent}>
        <div className={styles.sectionHeader}>
          <h2>Bookmarks</h2>
          <p>Saved sessions and HCPs for quick reference</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Your Bookmarks</h3>
            <div className={styles.actionsRight}>
              <button className={styles.btnSecondary} onClick={handleExportBriefing} disabled={!agendaJson}>
                <IconDownload /> Export Briefing
              </button>
              <button className={styles.btnSecondary} onClick={loadBookmarks}>Refresh</button>
            </div>
          </div>
          <div className={styles.cardBody}>
            {bookmarkLoading && <div className={styles.loadingBox}><IconSpinner /> Loading bookmarks...</div>}

            {bookmarks.length > 0 ? (
              <div className={styles.bookmarkList}>
                {bookmarks.map((bm, i) => (
                  <div key={bm.id || i} className={styles.bookmarkItem}>
                    <div className={styles.bookmarkInfo}>
                      <span className={styles.bookmarkType}>{bm.itemType || bm.item_type || "item"}</span>
                      <span className={styles.bookmarkName}>{bm.itemId || bm.item_id || bm.name || `Bookmark ${i + 1}`}</span>
                    </div>
                    <button className={styles.bookmarkRemove} onClick={() => handleBookmarkRemove(bm.id)}>
                      <IconX /> Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <IconBookmark />
                <p>No bookmarks yet. Save sessions or HCPs from the Agenda and HCP tabs.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className={styles.tabContent}>
        <div className={styles.sectionHeader}>
          <h2>Settings</h2>
          <p>Configure your CongressAI instance</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}><h3>Chat Model</h3></div>
          <div className={styles.cardBody}>
            <div className={styles.settingsRow}>
              <label className={styles.settingsLabel}>Active Model</label>
              <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} className={styles.selectInput}>
                <option value={DEFAULT_MODEL}>{DEFAULT_MODEL}</option>
                {models.map(m => <option key={m.id} value={m.id}>{m.id}</option>)}
              </select>
            </div>
            <p className={styles.settingsHint}>This model will be used for all chat interactions and AI-powered features.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}><h3>API Health</h3></div>
          <div className={styles.cardBody}>
            <button className={styles.btnSecondary} onClick={async () => {
              try {
                const r = await fetch("/api/health");
                const d = await r.json();
                alert(`API Status: ${d.status || "OK"}\n\n${JSON.stringify(d, null, 2)}`);
              } catch { alert("API unreachable"); }
            }}>Check Health</button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}><h3>About</h3></div>
          <div className={styles.cardBody}>
            <div className={styles.aboutInfo}>
              <p><strong>CongressAI</strong> — Medical Affairs Congress Intelligence Platform</p>
              <p>Upload congress agendas (PDF, URL, screenshot, or spreadsheet) and extract structured session data. Use AI to analyze sessions, profile HCPs, generate insights, and create briefing materials.</p>
              <p className={styles.settingsHint}>Powered by Venice AI. All data is processed locally through your configured API endpoints.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     RENDER: Layout
     ═══════════════════════════════════════════ */
  const tabRenderers = {
    dashboard: renderDashboard,
    agenda: renderAgenda,
    hcp: renderHCP,
    insights: renderInsights,
    copilot: renderCopilot,
    bookmarks: renderBookmarks,
    settings: renderSettings,
  };

  return (
    <div className={styles.appShell}>
      {/* Mobile hamburger */}
      <button className={styles.hamburger} onClick={() => setSidebarOpen(!sidebarOpen)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && <div className={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoMark}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#4f46e5" />
              <path d="M8 10h16M8 16h16M8 22h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>CongressAI</span>
            <span className={styles.logoSub}>Medical Affairs</span>
          </div>
        </div>

        <div className={styles.sidebarNav}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                className={`${styles.navItem} ${activeTab === tab.key ? styles.navItemActive : ""}`}
                onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
              >
                <Icon />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.sidebarFooter}>
          {agendaJson && (
            <div className={styles.sidebarStatus}>
              <span className={styles.statusDot}></span>
              <span>Data Loaded</span>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className={styles.mainContent}>
        {error && (
          <div className={styles.globalError}>
            <span>{error}</span>
            <button onClick={() => setError("")}><IconX /></button>
          </div>
        )}

        {loading && (
          <div className={styles.globalLoading}>
            <IconSpinner /> Processing...
          </div>
        )}

        {tabRenderers[activeTab]?.()}
      </main>
    </div>
  );
}