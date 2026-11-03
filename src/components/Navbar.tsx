import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Settings, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Cloud,
  CheckCircle2,
  Share2,
  Check,
  Globe
} from 'lucide-react';
import { TeacherProfile, WebPage } from '../types/portal';
import { SchoolSeal } from './SchoolSeal';

interface NavbarProps {
  profile: TeacherProfile;
  pages: WebPage[];
  activePageId: string | null;
  onSelectPage: (pageId: string | null) => void;
  onOpenAdmin: () => void;
  onOpenProfile: () => void;
  gasConnected: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  pages,
  activePageId,
  onSelectPage,
  onOpenAdmin,
  onOpenProfile,
  gasConnected,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [todayThaiStr, setTodayThaiStr] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyOnlineUrl = () => {
    const onlineUrl = 'https://ais-pre-bzzxz5fh6ornob6lxn6iye-958694204553.asia-southeast1.run.app';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(onlineUrl);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  useEffect(() => {
    const date = new Date();
    const thaiDays = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const dayName = thaiDays[date.getDay()];
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    setTodayThaiStr(`${dayName}ที่ ${day} ${month} ${year}`);
  }, []);

  const categories = Array.from(new Set(pages.map((p) => p.category)));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-200">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-blue-400/30">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            {profile.schoolName}
          </span>
          <span className="hidden md:inline text-blue-200/70">|</span>
          <span className="hidden md:inline text-blue-200 font-light truncate">
            {profile.department}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-blue-200/90 ml-auto">
          <span className="hidden sm:inline font-light">{todayThaiStr}</span>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded font-semibold text-[11px] transition-all shadow-xs cursor-pointer active:scale-95"
            title="เปิดระบบจัดการหลังบ้าน"
          >
            <Settings className="w-3 h-3 text-slate-950" />
            <span>ระบบหลังบ้าน</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 bg-slate-100/90 backdrop-blur-sm">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo & Teacher Branding */}
          <div 
            onClick={() => onSelectPage(null)}
            className="flex items-center gap-3.5 cursor-pointer group select-none py-1"
          >
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 p-0.5 shadow-md group-hover:shadow-xl transition-all transform group-hover:scale-105 flex items-center justify-center">
                {profile.schoolLogo && profile.schoolLogo.startsWith('data:image') ? (
                  <img
                    src={profile.schoolLogo}
                    alt={profile.schoolName}
                    className="w-full h-full object-contain rounded-[14px] bg-white p-1"
                  />
                ) : (
                  <div className="w-full h-full rounded-[14px] bg-white p-0.5 flex items-center justify-center overflow-hidden">
                    <SchoolSeal className="w-full h-full" />
                  </div>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                  {profile.teacherName}
                </h1>
                <span className="hidden sm:inline-block bg-amber-100 text-amber-900 border border-amber-300/80 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {profile.academicStanding}
                </span>
              </div>
              <p className="text-xs text-[#050506] font-medium truncate max-w-[240px] sm:max-w-md">
                {profile.schoolName} • {profile.learningArea}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => onSelectPage(null)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePageId === null
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              หน้าแรก
            </button>

            <button
              onClick={onOpenProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md transition-all cursor-pointer border border-blue-700"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>ประวัติและผลงานครูผู้สอน</span>
            </button>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2">
            {/* Search Box */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-slate-100 rounded-lg px-2.5 py-1.5 border border-blue-400 focus-within:ring-2 focus-within:ring-blue-300 w-48 sm:w-64 transition-all animate-fadeIn">
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="ค้นหาบทเรียน สไลด์..."
                    className="w-full text-xs bg-transparent focus:outline-none text-slate-800"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setShowSearchInput(false); onSearchChange(''); }}
                    className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="ค้นหา"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Teacher Admin Studio Button */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Settings className="w-4 h-4" />
              <span>จัดการข้อมูล</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="เปิดเมนู"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <button
            onClick={() => {
              onSelectPage(null);
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activePageId === null
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🏠 หน้าแรก (Homepage)
          </button>

          <div className="pt-2 pb-1 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1">
              เว็บเพจและหน่วยการเรียนรู้
            </p>
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  onSelectPage(page.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between ${
                  activePageId === page.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="truncate pr-2">{page.title}</span>
                {page.targetGrade && (
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded shrink-0">
                    {page.targetGrade}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>ประวัติและผลงานครูสุบิน คำมุลนา</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center font-semibold rounded-lg shadow text-sm flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>เปิดระบบจัดการหลังบ้าน (CMS)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
