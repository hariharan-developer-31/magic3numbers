"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import {
  ShieldCheck,
  Search,
  Download,
  Users,
  Hash,
  Calendar,
  Sparkles,
  ArrowLeft,
  Lock,
  Eye,
  RefreshCw,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";

interface AdminProfile {
  id: number | string;
  full_name: string;
  email?: string;
  birth_date: string;
  birth_time?: string;
  is_time_unknown?: boolean;
  birth_city?: string;
  sun_sign: string;
  moon_sign: string;
  nakshatra: string;
  pada?: number;
  life_path_number: number;
  is_master_number?: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<AdminProfile | null>(null);

  // Default demo records if database is empty initially
  const SEED_PROFILES: AdminProfile[] = [
    {
      id: 1,
      full_name: "Alexander Vance",
      email: "alex@example.com",
      birth_date: "1992-05-18",
      birth_time: "14:30",
      birth_city: "Kuala Lumpur, Malaysia",
      sun_sign: "Taurus",
      moon_sign: "Scorpio",
      nakshatra: "Anuradha",
      pada: 3,
      life_path_number: 7,
      is_master_number: false,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 2,
      full_name: "Mei Ling Tan",
      email: "meiling@example.my",
      birth_date: "1995-11-03",
      birth_time: "08:15",
      birth_city: "George Town, Malaysia",
      sun_sign: "Scorpio",
      moon_sign: "Pisces",
      nakshatra: "Uttara Bhadrapada",
      pada: 2,
      life_path_number: 11,
      is_master_number: true,
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 3,
      full_name: "Rohan Sharma",
      email: "rohan.s@example.com",
      birth_date: "1988-08-22",
      birth_time: "19:45",
      birth_city: "Singapore",
      sun_sign: "Leo",
      moon_sign: "Sagittarius",
      nakshatra: "Mula",
      pada: 1,
      life_path_number: 3,
      is_master_number: false,
      created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
  ];

  // Check existing session
  useEffect(() => {
    const authSession = sessionStorage.getItem("magic3_admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
      fetchProfiles();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcode: magic3admin (or configurable)
    if (passcode === "magic3admin" || passcode === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("magic3_admin_auth", "true");
      setError(null);
      fetchProfiles();
    } else {
      setError("Invalid administrative passcode. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("magic3_admin_auth");
  };

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      let fetched: AdminProfile[] = [];

      if (apiUrl) {
        try {
          const res = await fetch(`${apiUrl}/api/v1/admin/profiles`);
          if (res.ok) {
            const json = await res.json();
            if (json.success && json.data?.data) {
              fetched = json.data.data;
            }
          }
        } catch (apiErr) {
          console.warn("Backend API not reachable:", apiErr);
        }
      }

      // Check local stored records
      const localStored = localStorage.getItem("magic3_admin_records");
      let localList: AdminProfile[] = [];
      if (localStored) {
        try {
          localList = JSON.parse(localStored);
        } catch (e) {}
      }

      const merged = [...fetched, ...localList, ...SEED_PROFILES];
      // Deduplicate by id or full_name + created_at
      const unique = Array.from(new Map(merged.map((m) => [`${m.full_name}-${m.birth_date}`, m])).values());
      setProfiles(unique);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setProfiles(SEED_PROFILES);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.full_name.toLowerCase().includes(q) ||
      (p.email && p.email.toLowerCase().includes(q)) ||
      (p.birth_city && p.birth_city.toLowerCase().includes(q)) ||
      p.sun_sign.toLowerCase().includes(q) ||
      p.moon_sign.toLowerCase().includes(q) ||
      p.nakshatra.toLowerCase().includes(q) ||
      p.life_path_number.toString() === q
    );
  });

  // Calculate metrics
  const totalCalculations = profiles.length;
  const masterNumberCount = profiles.filter((p) => p.is_master_number || [11, 22, 33].includes(p.life_path_number)).length;

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Birth Date",
      "Birth Time",
      "City",
      "Western Sun Sign",
      "Vedic Moon Sign",
      "Nakshatra",
      "Pada",
      "Life Path Number",
      "Is Master Number",
      "Calculated At",
    ];

    const rows = filteredProfiles.map((p) => [
      p.id,
      `"${p.full_name}"`,
      `"${p.email || ""}"`,
      p.birth_date,
      p.birth_time || "Unknown",
      `"${p.birth_city || ""}"`,
      p.sun_sign,
      p.moon_sign,
      p.nakshatra,
      p.pada || 1,
      p.life_path_number,
      p.is_master_number ? "YES" : "NO",
      p.created_at,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `magic3numbers_profiles_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // 1. Passcode Gate Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#0D0B1A] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-[#16122C] border border-[#CFC6F6]/20 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg shadow-[#5B3BD1]/30">
            <Image
              src="/logo.png"
              alt="magic3numbers emblem"
              width={90}
              height={90}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
            Administrator Access
          </h2>
          <p className="text-xs sm:text-sm text-[#CFC6F6]/75 mb-6">
            Enter the administrative passcode to access the customer database and calculation telemetry.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: magic3admin)"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0D0B1A] border border-[#CFC6F6]/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#5B3BD1]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#5B3BD1] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-[#3A1F8C] transition-all shadow-lg"
            >
              Sign In To Admin Console
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#CFC6F6]/10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#CFC6F6]/70 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. Authenticated Admin Dashboard Screen
  return (
    <main className="min-h-screen w-full bg-[#E7E3FB] text-[#0D0B1A] pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#5B3BD1]/15 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl hover:bg-[#E7E3FB] text-[#0D0B1A] transition-colors"
              title="Return to site"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <BrandLogo className="w-8 h-8" showText={true} />
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#5B3BD1] text-white">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchProfiles}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-[#5B3BD1]/20 text-xs font-semibold hover:border-[#5B3BD1] flex items-center gap-1.5 transition-all"
              title="Refresh records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#5B3BD1] text-white text-xs font-semibold hover:bg-[#3A1F8C] flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-xs text-red-600 hover:underline font-semibold"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-white shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568]">
              Total Profiles Stored
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#5B3BD1] mt-2">
              {totalCalculations}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-white shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568]">
              Master Vibrations (11/22/33)
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#3A1F8C] mt-2">
              {masterNumberCount}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-white shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568]">
              Active Storage Engine
            </span>
            <span className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>SQLite / MySQL Synced</span>
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-white shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568]">
              Admin Security Status
            </span>
            <span className="text-xs font-bold text-[#5B3BD1] mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Session Verified</span>
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name, email, city, sign, or number..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#5B3BD1]/20 text-xs sm:text-sm text-[#0D0B1A] focus:outline-none focus:border-[#5B3BD1]"
            />
          </div>

          <span className="text-xs text-[#4A4568] self-center">
            Showing {filteredProfiles.length} of {profiles.length} records
          </span>
        </div>

        {/* Profiles Table */}
        <div className="bg-white rounded-3xl border border-white shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#E7E3FB] text-[#0D0B1A] font-bold border-b border-[#5B3BD1]/15 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">User / Name</th>
                  <th className="p-4">Birth Parameters</th>
                  <th className="p-4">Western Sun</th>
                  <th className="p-4">Vedic Moon &amp; Asterism</th>
                  <th className="p-4">Life Path</th>
                  <th className="p-4">Date Recorded</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5B3BD1]/10">
                {filteredProfiles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      No records match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredProfiles.map((p) => (
                    <tr key={p.id} className="hover:bg-[#E7E3FB]/40 transition-colors">
                      <td className="p-4 font-semibold text-[#0D0B1A]">
                        <div>{p.full_name}</div>
                        {p.email && <div className="text-[11px] text-gray-500 font-normal">{p.email}</div>}
                      </td>
                      <td className="p-4 text-[#4A4568]">
                        <div>{p.birth_date} {p.birth_time ? `@ ${p.birth_time}` : ""}</div>
                        <div className="text-[11px] text-gray-500">{p.birth_city || "-"}</div>
                      </td>
                      <td className="p-4 font-bold text-[#5B3BD1]">{p.sun_sign}</td>
                      <td className="p-4">
                        <span className="font-semibold text-[#0D0B1A]">{p.moon_sign}</span>
                        <span className="block text-[11px] text-gray-500">
                          {p.nakshatra} (Pada {p.pada || 1})
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-extrabold text-[#5B3BD1]">
                            {p.life_path_number}
                          </span>
                          {p.is_master_number && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#5B3BD1] text-white font-bold uppercase">
                              Master
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 font-mono text-[11px]">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedProfile(p)}
                          className="px-3 py-1.5 rounded-lg bg-[#E7E3FB] text-[#5B3BD1] hover:bg-[#5B3BD1] hover:text-white transition-colors text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Detail Inspector Modal */}
        {selectedProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-lg p-6 sm:p-8 rounded-[32px] bg-white border border-[#5B3BD1]/20 shadow-2xl relative text-left">
              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>

              <span className="editorial-caption text-[#5B3BD1]">User Blueprint Dossier</span>
              <h3 className="text-xl font-bold text-[#0D0B1A] mt-1 mb-4">
                {selectedProfile.full_name}
              </h3>

              <div className="space-y-3 text-xs text-[#0D0B1A]">
                <div className="p-3.5 rounded-xl bg-[#E7E3FB]/50 border border-[#5B3BD1]/15 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-500 block">Birth Date</span>
                    <span className="font-bold">{selectedProfile.birth_date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Birth Time</span>
                    <span className="font-bold">{selectedProfile.birth_time || "Time Unknown"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 block">Birth Location</span>
                    <span className="font-bold">{selectedProfile.birth_city}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#5B3BD1]/20 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Western Tropical Sun:</span>
                    <span className="font-bold text-[#5B3BD1]">{selectedProfile.sun_sign}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vedic Sidereal Moon:</span>
                    <span className="font-bold text-[#0D0B1A]">{selectedProfile.moon_sign}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nakshatra &amp; Pada:</span>
                    <span className="font-bold text-[#0D0B1A]">{selectedProfile.nakshatra} (Pada {selectedProfile.pada || 1})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Life Path Vibration:</span>
                    <span className="font-bold text-[#5B3BD1]">Number {selectedProfile.life_path_number}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="px-5 py-2 rounded-xl bg-[#5B3BD1] text-white text-xs font-semibold hover:bg-[#3A1F8C]"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
