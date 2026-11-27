"use client";

import React, { useEffect, useState, useMemo } from "react";
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
  Trash2,
  AlertTriangle,
  LogOut,
  Layers,
  BarChart3,
  Sliders,
  UserCheck,
  Activity,
  Database,
  Filter,
  ArrowRight,
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
  birthday_number?: number;
  expression_number?: number;
  number_1?: number;
  number_2?: number;
  number_3?: number;
  formatted_numbers?: string;
  is_master_number?: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bottom navbar navigation tabs: profiles | users | analytics | settings
  const [adminTab, setAdminTab] = useState<"profiles" | "users" | "analytics" | "settings">("profiles");

  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<AdminProfile | null>(null);
  const [profileToDelete, setProfileToDelete] = useState<AdminProfile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      life_path_number: 8,
      birthday_number: 9,
      expression_number: 7,
      number_1: 8,
      number_2: 9,
      number_3: 7,
      formatted_numbers: "8 • 9 • 7",
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
      birthday_number: 3,
      expression_number: 6,
      number_1: 11,
      number_2: 3,
      number_3: 6,
      formatted_numbers: "11 • 3 • 6",
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
      birthday_number: 4,
      expression_number: 8,
      number_1: 3,
      number_2: 4,
      number_3: 8,
      formatted_numbers: "3 • 4 • 8",
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
      // Filter out records deleted by admin
      const deletedMarkers: string[] = JSON.parse(localStorage.getItem("magic3_deleted_profiles") || "[]");
      const activeRecords = merged.filter((m) => {
        const idKey = String(m.id);
        const nameDateKey = `${m.full_name}-${m.birth_date}`;
        return !deletedMarkers.includes(idKey) && !deletedMarkers.includes(nameDateKey);
      });
      // Deduplicate by full_name + birth_date
      const unique = Array.from(new Map(activeRecords.map((m) => [`${m.full_name}-${m.birth_date}`, m])).values());
      setProfiles(unique);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setProfiles(SEED_PROFILES);
    } finally {
      setLoading(false);
    }
  };

  // Filtered Profiles for Tab 1
  const filteredProfiles = useMemo(() => {
    if (!search.trim()) return profiles;
    const q = search.toLowerCase();
    return profiles.filter((p) => {
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
  }, [profiles, search]);

  // Derived unique users for Tab 2
  const uniqueUsers = useMemo(() => {
    const userMap = new Map<
      string,
      {
        key: string;
        name: string;
        email: string;
        isGuest: boolean;
        profilesCount: number;
        lastActive: string;
        city?: string;
        latestNumbers?: string;
        masterCount: number;
      }
    >();

    profiles.forEach((p) => {
      const emailLower = p.email?.trim().toLowerCase();
      const hasRealEmail = emailLower && !emailLower.includes("guest@magic3numbers.com") && !emailLower.includes("guest");
      const key = hasRealEmail ? emailLower : `name-${p.full_name.trim().toLowerCase()}`;

      const num1 = p.number_1 || p.life_path_number;
      const num2 = p.number_2 || p.birthday_number || 1;
      const num3 = p.number_3 || p.expression_number || 1;
      const formatted = p.formatted_numbers || `${num1} • ${num2} • ${num3}`;
      const isMaster = p.is_master_number || [11, 22, 33].includes(num1);

      if (!userMap.has(key)) {
        userMap.set(key, {
          key,
          name: p.full_name,
          email: hasRealEmail ? p.email! : "Guest Explorer",
          isGuest: !hasRealEmail,
          profilesCount: 1,
          lastActive: p.created_at,
          city: p.birth_city,
          latestNumbers: formatted,
          masterCount: isMaster ? 1 : 0,
        });
      } else {
        const existing = userMap.get(key)!;
        existing.profilesCount += 1;
        if (isMaster) existing.masterCount += 1;
        if (new Date(p.created_at) > new Date(existing.lastActive)) {
          existing.lastActive = p.created_at;
          existing.latestNumbers = formatted;
          if (p.birth_city) existing.city = p.birth_city;
        }
      }
    });

    return Array.from(userMap.values());
  }, [profiles]);

  const filteredUsers = useMemo(() => {
    if (!userSearch.trim()) return uniqueUsers;
    const q = userSearch.toLowerCase();
    return uniqueUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.city && u.city.toLowerCase().includes(q))
    );
  }, [uniqueUsers, userSearch]);

  // Derived Analytics for Tab 3
  const analyticsData = useMemo(() => {
    const total = profiles.length;
    const masterCount = profiles.filter((p) => p.is_master_number || [11, 22, 33].includes(p.life_path_number)).length;
    const exactTimeCount = profiles.filter((p) => p.birth_time && !p.is_time_unknown).length;

    // Life path counts
    const lifePathCounts: Record<number, number> = {};
    profiles.forEach((p) => {
      const lp = p.life_path_number;
      lifePathCounts[lp] = (lifePathCounts[lp] || 0) + 1;
    });

    // Sun sign counts
    const sunSignCounts: Record<string, number> = {};
    profiles.forEach((p) => {
      if (p.sun_sign) {
        sunSignCounts[p.sun_sign] = (sunSignCounts[p.sun_sign] || 0) + 1;
      }
    });

    // Moon sign counts
    const moonSignCounts: Record<string, number> = {};
    profiles.forEach((p) => {
      if (p.moon_sign) {
        moonSignCounts[p.moon_sign] = (moonSignCounts[p.moon_sign] || 0) + 1;
      }
    });

    return {
      total,
      masterCount,
      exactTimeCount,
      timeAccuracyPct: total > 0 ? Math.round((exactTimeCount / total) * 100) : 0,
      lifePathCounts,
      sunSignCounts,
      moonSignCounts,
      registeredUsersCount: uniqueUsers.filter((u) => !u.isGuest).length,
      guestUsersCount: uniqueUsers.filter((u) => u.isGuest).length,
    };
  }, [profiles, uniqueUsers]);

  // Delete profile record
  const handleDeleteProfile = async (target: AdminProfile) => {
    setIsDeleting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl && typeof target.id === "number") {
        try {
          await fetch(`${apiUrl}/api/v1/admin/profiles/${target.id}`, {
            method: "DELETE",
          });
        } catch (apiErr) {
          console.warn("Backend API delete warning:", apiErr);
        }
      }

      // Track deleted markers in local storage
      try {
        const deletedMarkers: string[] = JSON.parse(localStorage.getItem("magic3_deleted_profiles") || "[]");
        const idKey = String(target.id);
        const nameDateKey = `${target.full_name}-${target.birth_date}`;
        localStorage.setItem("magic3_deleted_profiles", JSON.stringify([...deletedMarkers, idKey, nameDateKey]));

        const localStored = localStorage.getItem("magic3_admin_records");
        if (localStored) {
          const parsed = JSON.parse(localStored);
          const filtered = parsed.filter(
            (p: any) => String(p.id) !== idKey && `${p.full_name}-${p.birth_date}` !== nameDateKey
          );
          localStorage.setItem("magic3_admin_records", JSON.stringify(filtered));
        }
      } catch (e) {}

      setProfiles((prev) =>
        prev.filter((p) => String(p.id) !== String(target.id) && `${p.full_name}-${p.birth_date}` !== `${target.full_name}-${target.birth_date}`)
      );

      setToastMessage(`Profile record for "${target.full_name}" deleted successfully.`);
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      console.error("Error deleting profile:", err);
    } finally {
      setIsDeleting(false);
      setProfileToDelete(null);
    }
  };

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
      "The 3 Numbers",
      "Number 1 (Life Path)",
      "Number 2 (Birthday)",
      "Number 3 (Expression)",
      "Is Master Number",
      "Calculated At",
    ];

    const rows = filteredProfiles.map((p) => {
      const num1 = p.number_1 || p.life_path_number;
      const num2 = p.number_2 || p.birthday_number || 1;
      const num3 = p.number_3 || p.expression_number || 1;
      const formatted = p.formatted_numbers || `${num1} • ${num2} • ${num3}`;

      return [
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
        `"${formatted}"`,
        num1,
        num2,
        num3,
        p.is_master_number ? "YES" : "NO",
        p.created_at,
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `magic3numbers_profiles_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Jump from Users tab to Profiles tab filtered by user
  const handleInspectUserProfiles = (userName: string) => {
    setSearch(userName);
    setAdminTab("profiles");
  };

  // 1. Passcode Gate Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#0D0B1A] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-[#16122C] border border-[#CFC6F6]/20 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center drop-shadow-lg">
            <Image
              src="/logo.png"
              alt="magic3numbers emblem"
              width={90}
              height={90}
              className="w-full h-full object-contain"
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
    <div className="min-h-screen w-full bg-[#E7E3FB] text-[#0D0B1A] flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#5B3BD1]/15 px-3 sm:px-8 py-3 sm:py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo & Admin Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            <BrandLogo className="w-7 h-7 sm:w-8 sm:h-8" showText={true} />
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#5B3BD1] text-white shadow-xs">
              Admin
            </span>
          </div>

          {/* Action Buttons: Neatly aligned and never clipped */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            <button
              onClick={fetchProfiles}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-[#5B3BD1]/20 text-xs font-semibold hover:border-[#5B3BD1] text-[#0D0B1A] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Refresh records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-[#5B3BD1] text-white text-xs font-semibold hover:bg-[#3A1F8C] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 sm:p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 transition-all flex items-center justify-center shadow-xs flex-shrink-0 cursor-pointer"
              title="Log out of admin console"
              aria-label="Log out of admin console"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area (padded bottom to prevent overlap with webapp dock) */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-6 sm:pt-8 pb-28 sm:pb-32 flex-1">
        {/* =========================================================================
            TAB 1: PROFILES / CALCULATIONS RECORDS
            ========================================================================= */}
        {adminTab === "profiles" && (
          <div className="animate-fade-in space-y-6">
            {/* Quick KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-white shadow-sm flex flex-col justify-between">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#4A4568]">
                  Stored Profiles
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#5B3BD1] mt-1">
                  {profiles.length}
                </span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-white shadow-sm flex flex-col justify-between">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#4A4568]">
                  Master Vibrations
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#3A1F8C] mt-1">
                  {analyticsData.masterCount}
                </span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-white shadow-sm flex flex-col justify-between">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#4A4568]">
                  Unique Users
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#5B3BD1] mt-1">
                  {uniqueUsers.length}
                </span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-white shadow-sm flex flex-col justify-between">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#4A4568]">
                  Filtered Count
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
                  {filteredProfiles.length}
                </span>
              </div>
            </div>

            {/* Search Bar & Counter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name, email, city, sign, or number..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#5B3BD1]/20 text-xs sm:text-sm text-[#0D0B1A] focus:outline-none focus:border-[#5B3BD1] shadow-xs"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                  >
                    &times;
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#4A4568]">
                <span>Showing {filteredProfiles.length} of {profiles.length} records</span>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-[#5B3BD1] font-semibold hover:underline"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Profiles Table */}
            <div className="bg-white rounded-3xl border border-white shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#E7E3FB] text-[#0D0B1A] font-bold border-b border-[#5B3BD1]/15 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">User / Name</th>
                      <th className="p-4">Birth Parameters</th>
                      <th className="p-4 text-center">The 3 Numbers</th>
                      <th className="p-4">Western Sun</th>
                      <th className="p-4">Vedic Moon &amp; Asterism</th>
                      <th className="p-4">Date Recorded</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#5B3BD1]/10">
                    {filteredProfiles.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-10 text-center text-gray-500">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Layers className="w-8 h-8 text-gray-400" />
                            <p className="font-semibold text-sm">No records match the current filter.</p>
                            <p className="text-xs text-gray-400">Try searching for a different name, email, or zodiac sign.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredProfiles.map((p) => {
                        const num1 = p.number_1 || p.life_path_number;
                        const num2 = p.number_2 || p.birthday_number || 1;
                        const num3 = p.number_3 || p.expression_number || 1;

                        return (
                          <tr key={p.id} className="hover:bg-[#E7E3FB]/40 transition-colors">
                            <td className="p-4 font-semibold text-[#0D0B1A]">
                              <div className="text-sm font-bold">{p.full_name}</div>
                              {p.email && <div className="text-[11px] text-gray-500 font-normal">{p.email}</div>}
                            </td>
                            <td className="p-4 text-[#4A4568]">
                              <div>{p.birth_date} {p.birth_time ? `@ ${p.birth_time}` : ""}</div>
                              <div className="text-[11px] text-gray-500">{p.birth_city || "-"}</div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5B3BD1]/10 text-[#5B3BD1] font-mono font-bold text-xs border border-[#5B3BD1]/20 shadow-xs">
                                <span
                                  className="w-6 h-6 rounded-lg bg-[#5B3BD1] text-white flex items-center justify-center text-xs font-extrabold shadow-xs"
                                  title="1st Number: Life Path"
                                >
                                  {num1}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span
                                  className="w-6 h-6 rounded-lg bg-[#3A1F8C] text-white flex items-center justify-center text-xs font-extrabold shadow-xs"
                                  title="2nd Number: Birthday"
                                >
                                  {num2}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span
                                  className="w-6 h-6 rounded-lg bg-[#5B3BD1] text-white flex items-center justify-center text-xs font-extrabold shadow-xs"
                                  title="3rd Number: Expression"
                                >
                                  {num3}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 font-bold text-[#5B3BD1]">{p.sun_sign}</td>
                            <td className="p-4">
                              <span className="font-semibold text-[#0D0B1A]">{p.moon_sign}</span>
                              <span className="block text-[11px] text-gray-500">
                                {p.nakshatra} (Pada {p.pada || 1})
                              </span>
                            </td>
                            <td className="p-4 text-gray-500 font-mono text-[11px]">
                              {new Date(p.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-right">
                              <div className="inline-flex items-center gap-1.5 justify-end">
                                <button
                                  onClick={() => setSelectedProfile(p)}
                                  className="px-2.5 py-1.5 rounded-lg bg-[#E7E3FB] text-[#5B3BD1] hover:bg-[#5B3BD1] hover:text-white transition-colors text-xs font-semibold inline-flex items-center gap-1"
                                  title="Inspect parameters"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">Inspect</span>
                                </button>
                                <button
                                  onClick={() => setProfileToDelete(p)}
                                  className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-xs font-semibold inline-flex items-center gap-1"
                                  title="Delete profile"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: USERS / MEMBER DIRECTORY
            ========================================================================= */}
        {adminTab === "users" && (
          <div className="animate-fade-in space-y-6">
            {/* Header description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#0D0B1A] tracking-tight">Customer &amp; Member Directory</h3>
                <p className="text-xs sm:text-sm text-[#4A4568]">
                  Aggregated directory of unique member accounts and guest explorers who calculated blueprints.
                </p>
              </div>

              {/* User search bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user accounts..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#5B3BD1]/20 text-xs sm:text-sm text-[#0D0B1A] focus:outline-none focus:border-[#5B3BD1] shadow-xs"
                />
              </div>
            </div>

            {/* User Breakdown Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-white shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568] block">
                    Total Unique Accounts
                  </span>
                  <span className="text-3xl font-extrabold text-[#5B3BD1] mt-1 block">
                    {uniqueUsers.length}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#5B3BD1]/10 text-[#5B3BD1] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-white shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568] block">
                    Registered Members
                  </span>
                  <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">
                    {analyticsData.registeredUsersCount}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-white shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568] block">
                    Guest Explorers
                  </span>
                  <span className="text-3xl font-extrabold text-[#3A1F8C] mt-1 block">
                    {analyticsData.guestUsersCount}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#3A1F8C]/10 text-[#3A1F8C] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Users Grid / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.length === 0 ? (
                <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-white shadow-sm text-gray-500">
                  <UserCheck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-semibold text-sm">No user accounts found matching your query.</p>
                </div>
              ) : (
                filteredUsers.map((u) => (
                  <div
                    key={u.key}
                    className="p-5 rounded-3xl bg-white border border-[#5B3BD1]/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header of User Card */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5B3BD1] to-[#3A1F8C] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-[#0D0B1A] leading-tight">{u.name}</h4>
                            <p className="text-[11px] text-gray-500 truncate max-w-[160px]">{u.email}</p>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            u.isGuest
                              ? "bg-purple-100 text-[#5B3BD1]"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {u.isGuest ? "Guest" : "Member"}
                        </span>
                      </div>

                      {/* User Metadata */}
                      <div className="p-3 rounded-2xl bg-[#E7E3FB]/50 space-y-1.5 text-xs text-[#4A4568] mb-4">
                        <div className="flex items-center justify-between">
                          <span>Calculations:</span>
                          <span className="font-bold text-[#0D0B1A]">{u.profilesCount} blueprint{u.profilesCount > 1 ? "s" : ""}</span>
                        </div>
                        {u.city && (
                          <div className="flex items-center justify-between">
                            <span>Birth City:</span>
                            <span className="font-medium text-[#0D0B1A] truncate max-w-[130px]">{u.city}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span>Sacred Numbers:</span>
                          <span className="font-mono font-bold text-[#5B3BD1]">{u.latestNumbers || "-"}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-[#5B3BD1]/10">
                          <span>Last Active:</span>
                          <span>{new Date(u.lastActive).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button: View user records in Tab 1 */}
                    <button
                      onClick={() => handleInspectUserProfiles(u.name)}
                      className="w-full py-2.5 rounded-xl bg-[#5B3BD1]/10 hover:bg-[#5B3BD1] text-[#5B3BD1] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Calculations ({u.profilesCount})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: ANALYTICS / STATS
            ========================================================================= */}
        {adminTab === "analytics" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0D0B1A] tracking-tight">Calculation Telemetry &amp; Insights</h3>
              <p className="text-xs sm:text-sm text-[#4A4568]">
                Real-time astronomical distributions and numerological frequency across all customer calculations.
              </p>
            </div>

            {/* KPI Summary Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-white shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568] block">
                  Total Profiles
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#5B3BD1] mt-2 block">
                  {analyticsData.total}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 block">Deterministic calculations</span>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-white shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568] block">
                  Master Vibrations
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#3A1F8C] mt-2 block">
                  {analyticsData.masterCount}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 block">
                  {analyticsData.total > 0 ? `${Math.round((analyticsData.masterCount / analyticsData.total) * 100)}% of total profiles` : "0%"}
                </span>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-white shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568] block">
                  Exact Time Coverage
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mt-2 block">
                  {analyticsData.timeAccuracyPct}%
                </span>
                <span className="text-[11px] text-gray-500 mt-1 block">
                  {analyticsData.exactTimeCount} with precise birth time
                </span>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-white shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568] block">
                  Member Conversion
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#5B3BD1] mt-2 block">
                  {uniqueUsers.length > 0
                    ? `${Math.round((analyticsData.registeredUsersCount / uniqueUsers.length) * 100)}%`
                    : "0%"}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 block">
                  {analyticsData.registeredUsersCount} registered accounts
                </span>
              </div>
            </div>

            {/* Life Path Number Distribution */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-white shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-[#0D0B1A] text-base">Life Path Number Distribution</h4>
                  <p className="text-xs text-[#4A4568]">Frequency of root vibration numbers and master numbers (11/22/33)</p>
                </div>
                <span className="text-xs font-bold text-[#5B3BD1] bg-[#5B3BD1]/10 px-3 py-1 rounded-full">
                  Pythagorean Matrix
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                  const count = analyticsData.lifePathCounts[num] || 0;
                  const isMaster = [11, 22, 33].includes(num);
                  const pct = analyticsData.total > 0 ? Math.round((count / analyticsData.total) * 100) : 0;

                  return (
                    <div
                      key={num}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        isMaster
                          ? "bg-gradient-to-b from-[#3A1F8C]/10 to-[#5B3BD1]/10 border-[#3A1F8C]/30"
                          : "bg-[#E7E3FB]/40 border-[#5B3BD1]/15"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span className="font-semibold">{isMaster ? "MASTER" : "NUMBER"}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className={`text-2xl font-black ${isMaster ? "text-[#3A1F8C]" : "text-[#5B3BD1]"}`}>
                        {num}
                      </div>
                      <div className="text-[11px] font-bold text-[#0D0B1A] mt-1">
                        {count} profile{count !== 1 ? "s" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Western Sun Signs & Vedic Moon Placements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Western Sun Signs */}
              <div className="p-6 rounded-3xl bg-white border border-white shadow-md">
                <h4 className="font-bold text-[#0D0B1A] text-base mb-1">Western Sun Sign Distribution</h4>
                <p className="text-xs text-[#4A4568] mb-4">Tropical zodiac sun positions calculated for users</p>

                <div className="space-y-2.5">
                  {Object.entries(analyticsData.sunSignCounts).length === 0 ? (
                    <p className="text-xs text-gray-400">No zodiac records calculated yet.</p>
                  ) : (
                    Object.entries(analyticsData.sunSignCounts)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 6)
                      .map(([sign, count]) => {
                        const pct = analyticsData.total > 0 ? Math.round((count / analyticsData.total) * 100) : 0;
                        return (
                          <div key={sign} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#0D0B1A]">{sign}</span>
                              <span className="text-gray-500 font-semibold">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className="h-full bg-[#5B3BD1] rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>

              {/* Vedic Moon Placements */}
              <div className="p-6 rounded-3xl bg-white border border-white shadow-md">
                <h4 className="font-bold text-[#0D0B1A] text-base mb-1">Vedic Sidereal Moon Signs</h4>
                <p className="text-xs text-[#4A4568] mb-4">Lahiri Ayanamsa lunar rasi alignments recorded</p>

                <div className="space-y-2.5">
                  {Object.entries(analyticsData.moonSignCounts).length === 0 ? (
                    <p className="text-xs text-gray-400">No lunar records calculated yet.</p>
                  ) : (
                    Object.entries(analyticsData.moonSignCounts)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 6)
                      .map(([sign, count]) => {
                        const pct = analyticsData.total > 0 ? Math.round((count / analyticsData.total) * 100) : 0;
                        return (
                          <div key={sign} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#0D0B1A]">{sign}</span>
                              <span className="text-gray-500 font-semibold">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className="h-full bg-[#3A1F8C] rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: SETTINGS / ENGINE & EXPORT
            ========================================================================= */}
        {adminTab === "settings" && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0D0B1A] tracking-tight">System &amp; Console Settings</h3>
              <p className="text-xs sm:text-sm text-[#4A4568]">
                Administrative configuration, database export, ephemeris status, and active session controls.
              </p>
            </div>

            {/* Storage & Engine Status */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-white shadow-md space-y-4">
              <h4 className="font-bold text-[#0D0B1A] text-base">Astronomical Calculation Engine Status</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#E7E3FB]/50 border border-[#5B3BD1]/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Planetary Ephemeris</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                  </div>
                  <p className="font-bold text-sm text-[#0D0B1A]">VSOP87 &amp; Swiss Ephemeris</p>
                  <p className="text-[11px] text-gray-500">High precision tropical coordinates + Sidereal Lahiri Ayanamsa</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#E7E3FB]/50 border border-[#5B3BD1]/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Numerology Engine</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                  </div>
                  <p className="font-bold text-sm text-[#0D0B1A]">Pythagorean Letter Matrix</p>
                  <p className="text-[11px] text-gray-500">Master vibration preservation (11, 22, 33) &amp; Expression reduction</p>
                </div>
              </div>
            </div>

            {/* Data Management & Export */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-white shadow-md space-y-4">
              <h4 className="font-bold text-[#0D0B1A] text-base">Data Management &amp; Export</h4>
              <p className="text-xs text-[#4A4568]">
                Export calculation records, astronomical parameters, and customer profiles into standard formats.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-5 py-3 rounded-2xl bg-[#5B3BD1] hover:bg-[#3A1F8C] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete CSV Export ({profiles.length} Records)</span>
                </button>

                <button
                  type="button"
                  onClick={fetchProfiles}
                  className="px-5 py-3 rounded-2xl bg-white border border-[#5B3BD1]/20 hover:border-[#5B3BD1] text-[#0D0B1A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  <span>Synchronize Remote Records</span>
                </button>
              </div>
            </div>

            {/* Session Management */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-[#0D0B1A] text-base">Administrative Session</h4>
                <p className="text-xs text-[#4A4568] mt-0.5">
                  Current authenticated operator session. End session to lock console.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Admin Console</span>
              </button>
            </div>
          </div>
        )}

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed bottom-24 right-6 z-50 p-4 rounded-2xl bg-emerald-700 text-white shadow-xl flex items-center gap-2 text-xs sm:text-sm font-semibold animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {profileToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-[28px] bg-white border border-red-200 shadow-2xl relative text-left">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#0D0B1A]">Delete Profile Record?</h4>
              <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                Are you sure you want to permanently delete the profile for <strong>{profileToDelete.full_name}</strong> ({profileToDelete.email || "No email"})? This action removes the calculated numbers and ephemeris record from the database.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProfileToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProfile(profileToDelete)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors flex items-center gap-1.5 disabled:opacity-60"
                >
                  {isDeleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

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

              <div className="space-y-3.5 text-xs text-[#0D0B1A]">
                {/* The 3 Numbers Highlight Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#5B3BD1]/10 via-[#E7E3FB] to-[#5B3BD1]/10 border border-[#5B3BD1]/20 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B3BD1] block mb-2">
                    The 3 Sacred Numbers
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-[#5B3BD1] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                        {selectedProfile.number_1 || selectedProfile.life_path_number}
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 mt-1">1: Life Path</span>
                    </div>

                    <span className="text-xl font-extrabold text-[#5B3BD1]">•</span>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-[#3A1F8C] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                        {selectedProfile.number_2 || selectedProfile.birthday_number || 1}
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 mt-1">2: Birthday</span>
                    </div>

                    <span className="text-xl font-extrabold text-[#5B3BD1]">•</span>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-xl bg-[#5B3BD1] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                        {selectedProfile.number_3 || selectedProfile.expression_number || 1}
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 mt-1">3: Expression</span>
                    </div>
                  </div>
                </div>

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
                    <span className="font-bold text-[#0D0B1A]">
                      {selectedProfile.nakshatra} (Pada {selectedProfile.pada || 1})
                    </span>
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
      </main>

      {/* =========================================================================
          BOTTOM WEBAPP NAVBAR DOCK: Profiles, Users, Analytics, Settings
          ========================================================================= */}
      <nav
        role="navigation"
        aria-label="Admin console navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#0D0B1A]/95 backdrop-blur-xl border-t border-[#3A1F8C]/40 text-white shadow-2xl px-4 py-2 sm:py-2.5"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
          <button
            onClick={() => setAdminTab("profiles")}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer select-none focus:outline-none ${
              adminTab === "profiles"
                ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40 font-bold"
                : "text-[#CFC6F6]/70 hover:text-white hover:bg-white/5 font-medium"
            }`}
          >
            <Layers className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] tracking-tight">Profiles</span>
          </button>

          <button
            onClick={() => setAdminTab("users")}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer select-none focus:outline-none ${
              adminTab === "users"
                ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40 font-bold"
                : "text-[#CFC6F6]/70 hover:text-white hover:bg-white/5 font-medium"
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] tracking-tight">Users</span>
          </button>

          <button
            onClick={() => setAdminTab("analytics")}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer select-none focus:outline-none ${
              adminTab === "analytics"
                ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40 font-bold"
                : "text-[#CFC6F6]/70 hover:text-white hover:bg-white/5 font-medium"
            }`}
          >
            <BarChart3 className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] tracking-tight">Analytics</span>
          </button>

          <button
            onClick={() => setAdminTab("settings")}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer select-none focus:outline-none ${
              adminTab === "settings"
                ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40 font-bold"
                : "text-[#CFC6F6]/70 hover:text-white hover:bg-white/5 font-medium"
            }`}
          >
            <Sliders className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] tracking-tight">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
