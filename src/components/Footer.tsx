import React from 'react';
import { Mail } from 'lucide-react';
import { TeacherProfile, WebPage } from '../types/portal';
import { SchoolSeal } from './SchoolSeal';

interface FooterProps {
  profile: TeacherProfile;
  pages: WebPage[];
  onSelectPage: (pageId: string | null) => void;
  onOpenAdmin: () => void;
  onOpenProfile: () => void;
  gasConnected: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  pages,
  onSelectPage,
  onOpenAdmin,
  onOpenProfile,
  gasConnected,
}) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 no-print h-[60px] min-h-[60px] max-h-[60px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Left: Teacher & School Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-900 p-0.5 border border-white/20 shrink-0 flex items-center justify-center overflow-hidden shadow-xs">
              {profile.schoolLogo && profile.schoolLogo.startsWith('data:image') ? (
                <img
                  src={profile.schoolLogo}
                  alt={profile.schoolName}
                  className="w-full h-full object-contain"
                />
              ) : (
                <SchoolSeal className="w-full h-full" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <h3 className="text-xs font-bold text-white leading-tight">
                  {profile.teacherName}
                </h3>
                <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.2 rounded-full font-semibold">
                  {profile.academicStanding}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-light leading-none mt-0.5">
                {profile.schoolName} • {profile.department}
              </p>
            </div>
          </div>

          {/* Center: Quick Links */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] text-slate-300">
            <button
              onClick={() => onSelectPage(null)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              หน้าแรก
            </button>
            <span>•</span>
            <button
              onClick={onOpenProfile}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              ประวัติครูผู้สอน
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              ระบบหลังบ้าน
            </button>
            <span>•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-500" />
              {profile.email}
            </span>
          </div>

          {/* Right: Copyright info */}
          <div className="text-center md:text-right text-[10px] text-slate-500 leading-tight">
            <p>
              © {new Date().getFullYear() + 543} {profile.schoolName}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
