import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { socket } from "../../../socket/socket";
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  Search,
  Tag,
  User,
  Home,
  ChevronDown,
  Inbox,
  Clock,
  Filter,
  RefreshCw,
} from "lucide-react";

// ─── helpers ─────────────────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Deterministic color from name initial
const AVATAR_COLORS = [
  ["#D1FAE5", "#065F46"],
  ["#DBEAFE", "#1E40AF"],
  ["#FEF3C7", "#92400E"],
  ["#FCE7F3", "#9D174D"],
  ["#EDE9FE", "#5B21B6"],
  ["#FEE2E2", "#991B1B"],
];

function avatarColor(name = "") {
  const idx = (name.charCodeAt(0) || 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

// ─── Type badge ───────────────────────────────────────────────────────────────
function TypeBadge({ type }) {
  const isContact = type === "contact";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
        isContact
          ? "bg-blue-100 text-blue-700"
          : "bg-[#D1FAE5] text-[#065F46]"
      }`}
    >
      {isContact ? <Mail size={9} /> : <MessageSquare size={9} />}
      {type}
    </span>
  );
}

// ─── Meta pill ────────────────────────────────────────────────────────────────
function MetaPill({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 bg-[#F3EFE4] rounded-xl px-3 py-2.5">
      <Icon size={13} className="text-[#1B4332] mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide leading-none mb-0.5">
          {label}
        </p>
        <p className="text-xs font-semibold text-[#1B2B22] truncate">{value}</p>
      </div>
    </div>
  );
}

// ─── Message Card ─────────────────────────────────────────────────────────────
function MessageCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const [bg, fg] = avatarColor(item.name);
  const initial = (item.name || "?")[0].toUpperCase();
  const hasMessage = !!item.message;
  const msgPreview = item.message?.slice(0, 100);
  const isTruncated = (item.message?.length || 0) > 100;

  const metaFields = [
    { icon: Phone,       label: "Phone",       value: item.phone },
    { icon: Mail,        label: "Email",       value: item.email },
    { icon: Tag,         label: "Role",        value: item.role },
    { icon: Search,      label: "Looking For", value: item.lookingFor },
    { icon: MapPin,      label: "Location",    value: item.location },
    { icon: IndianRupee, label: "Budget",      value: item.budget },
    { icon: MessageSquare, label: "Subject",   value: item.subject },
  ].filter((f) => f.value);

  return (
    <div
      className="bg-[#FBF9F3] rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Accent bar + header */}
      <div className="flex items-start gap-4 p-5">
        {/* Left accent bar */}
        <div
          className="w-1 self-stretch rounded-full shrink-0 mt-0.5"
          style={{ backgroundColor: item.type === "contact" ? "#3B82F6" : "#1B4332", minHeight: 40 }}
        />

        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 mt-0.5"
          style={{ backgroundColor: bg, color: fg }}
        >
          {initial}
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="font-bold text-[#1B2B22] text-sm leading-tight">
                {item.name || "Anonymous"}
              </p>
              {item.email && (
                <p className="text-xs text-gray-400 mt-0.5 truncate">{item.email}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TypeBadge type={item.type} />
              <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium whitespace-nowrap">
                <Clock size={9} />
                {timeAgo(item.createdAt)}
              </span>
            </div>
          </div>

          {/* Subject line if present */}
          {item.subject && (
            <p className="mt-2 text-xs font-semibold text-[#1B4332] bg-[#D1FAE5]/50 rounded-lg px-2.5 py-1 inline-block">
              {item.subject}
            </p>
          )}
        </div>
      </div>

      {/* Meta pills grid */}
      {metaFields.length > 0 && (
        <div className="px-5 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {metaFields.map((f) => (
              <MetaPill key={f.label} {...f} />
            ))}
          </div>
        </div>
      )}

      {/* Message body */}
      {hasMessage && (
        <div className="mx-5 mb-5 bg-[#F3EFE4] rounded-xl p-4">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
            Message
          </p>
          <p className="text-sm text-[#1B2B22] leading-relaxed whitespace-pre-wrap">
            {expanded ? item.message : msgPreview}
            {isTruncated && !expanded && "…"}
          </p>
          {isTruncated && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#1B4332] hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown
                size={12}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      )}

      {/* Footer strip */}
      <div className="px-5 py-2.5 border-t border-[#EFEBDD] flex items-center justify-between">
        <span className="text-[10px] text-gray-400">
          {formatDate(item.createdAt)}
        </span>
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
          #{item._id?.slice(-6).toUpperCase()}
        </span>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all"); 
  const [data,setData]=useState(null)
  // all | contact | enquiry

  const fetchMessages = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/enquery/all`
      );
      setMessages(data.data || []);
      setData(data)
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    if (localStorage.getItem("Messages") === "Messages") {
      localStorage.removeItem("Messages");
    }

    const handleNewEnquiry = async (data) => {
      if (data?.type === "Messages") {
        await fetchMessages(true);
      }
    };

    socket.on("newEnquiry", handleNewEnquiry);
    return () => { socket.off("newEnquiry", handleNewEnquiry); };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMessages(true);
    setRefreshing(false);
    toast.success("Messages refreshed");
  };

  // Filter + search
  const visible = messages.filter((m) => {
    const matchesType = filter === "all" || m.type === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (m.name || "").toLowerCase().includes(q) ||
      (m.email || "").toLowerCase().includes(q) ||
      (m.message || "").toLowerCase().includes(q) ||
      (m.subject || "").toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const contactCount  = data?.stats?.totalContacts
  const enquiryCount  = data?.stats?.totalEnquiries
  const total= contactCount + enquiryCount

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3EFE4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#1B4332]/20 border-t-[#1B4332] animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading messages…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3EFE4] font-['Inter',sans-serif]">
      {/* ── Header ── */}
      <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4332] tracking-tight">Messages</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {messages.length} total · {contactCount} contacts · {enquiryCount} enquiries
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 w-52 text-gray-700 shadow-sm"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 rounded-full bg-white text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="px-6 pb-8 max-w-[1100px] mx-auto space-y-5">
        {/* ── Summary cards ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "All Messages", count: total, key: "all",     bg: "bg-[#1B4332]",  text: "text-white",       sub: "text-white/70" },
            { label: "Contacts",     count: contactCount,    key: "contact",  bg: "bg-[#FBF9F3]",  text: "text-[#1B2B22]",   sub: "text-gray-400" },
            { label: "Enquiries",    count: enquiryCount,    key: "enquiry",  bg: "bg-[#FBF9F3]",  text: "text-[#1B2B22]",   sub: "text-gray-400" },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`rounded-2xl p-4 text-left shadow-sm transition-all ${s.bg} ${
                filter === s.key && s.key !== "all"
                  ? "ring-2 ring-[#1B4332]"
                  : ""
              }`}
            >
              <p className={`text-2xl font-black ${s.text}`}>{s.count}</p>
              <p className={`text-xs font-semibold uppercase tracking-wide mt-0.5 ${s.sub}`}>
                {s.label}
              </p>
            </button>
          ))}
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-gray-400" />
          {["all", "contact", "enquiry"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === f
                  ? "bg-[#1B4332] text-white"
                  : "bg-[#FBF9F3] text-gray-500 hover:bg-[#EFEBDD]"
              }`}
            >
              {f === "all" ? "All" : f === "contact" ? "Contacts" : "Enquiries"}
            </button>
          ))}
          {search && (
            <span className="ml-auto text-xs text-gray-400">
              {visible.length} result{visible.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* ── Empty state ── */}
        {visible.length === 0 ? (
          <div className="bg-[#FBF9F3] rounded-3xl p-16 flex flex-col items-center gap-3 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#D1FAE5] flex items-center justify-center">
              <Inbox size={24} className="text-[#1B4332]" />
            </div>
            <p className="font-bold text-[#1B2B22]">No messages found</p>
            <p className="text-sm text-gray-400">
              {search ? "Try a different search term." : "New messages will appear here."}
            </p>
          </div>
        ) : (
          /* ── Message list ── */
          <div className="grid gap-4">
            {visible.map((item, i) => (
              <MessageCard key={item._id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;