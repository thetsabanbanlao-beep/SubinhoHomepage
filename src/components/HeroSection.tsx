import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  Award, 
  Layers, 
  CheckCircle, 
  Atom, 
  Binary,
  ExternalLink,
  GraduationCap,
  Trophy,
  Globe,
  Copy,
  Check,
  Cloud
} from 'lucide-react';
import { TeacherProfile, WebPage } from '../types/portal';
import { SchoolSeal } from './SchoolSeal';

interface HeroSectionProps {
  profile: TeacherProfile;
  featuredPages: WebPage[];
  onSelectPage: (pageId: string) => void;
  onOpenAdmin: () => void;
  onOpenProfile: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  featuredPages,
  onSelectPage,
  onOpenAdmin,
  onOpenProfile,
}) => {
  const [copiedAppScriptUrl, setCopiedAppScriptUrl] = useState(false);
  const gasWebAppUrl = 'https://script.google.com/macros/s/AKfycbxvm1xAKU6i7pSr92WPjebM-BDfyY0hjreQT0nQs8Tp_gLbnbCVxX-_6uXbiBbPcAin/exec';

  const handleCopyGasUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(gasWebAppUrl);
    }
    setCopiedAppScriptUrl(true);
    setTimeout(() => setCopiedAppScriptUrl(false), 2500);
  };
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white min-h-[690px] lg:h-[690px] py-6 lg:py-0 flex items-center">
      {/* Background Decorative Lighting & Circuit Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left / Main Teacher Intro & Badges */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badges line */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-sm shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                {profile.academicStanding}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 backdrop-blur-sm">
                <Atom className="w-3.5 h-3.5 text-blue-300" />
                {profile.learningArea}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-sm">
                <Binary className="w-3.5 h-3.5 text-emerald-300" />
                {profile.teachingLevels}
              </span>
            </div>

            {/* Teacher Name & School */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {profile.teacherName}
              </h1>
              <p className="text-lg sm:text-xl text-blue-200 font-medium">
                {profile.schoolName}
              </p>
              <p className="text-sm text-blue-300/80 font-light">
                {profile.department}
              </p>
            </div>

            {/* Motto Box */}
            <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border-l-4 border-amber-400 p-4 rounded-r-xl backdrop-blur-md shadow-inner text-left max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-amber-300">
                    ครูยุคใหม่ หัวใจนวัตกรรม
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                    "{profile.motto || 'มุ่งมั่นจัดการเรียนรู้วิทยาศาสตร์และเทคโนโลยี เพื่อพัฒนาผู้เรียนสู่ศตวรรษที่ 21'}"
                  </p>
                </div>
              </div>
            </div>

            {/* Bio summary */}
            <p className="text-sm text-slate-300/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              {profile.bio}
            </p>

            {/* Call to action buttons */}
            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="https://script.google.com/macros/s/AKfycbxvm1xAKU6i7pSr92WPjebM-BDfyY0hjreQT0nQs8Tp_gLbnbCVxX-_6uXbiBbPcAin/exec"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-5 py-3 rounded-xl border border-blue-400/40 shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ExternalLink className="w-5 h-5 text-blue-200" />
                <span>รายงานผลการปฏิบัติงานสายการสอน</span>
              </a>

              <a
                href="https://ais-dev-zo3g3ttdecuhytetinw5rg-958694204553.asia-southeast1.run.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-5 py-3 rounded-xl border border-emerald-400/40 shadow-lg hover:shadow-emerald-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span>รายงาน วPA</span>
                <ExternalLink className="w-4 h-4 text-emerald-200" />
              </a>

              <a
                href="https://ais-dev-7gn7vecyoycbwubpdhscbs-958694204553.asia-southeast1.run.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 hover:from-purple-500 hover:to-violet-500 text-white font-bold px-5 py-3 rounded-xl border border-purple-400/40 shadow-lg hover:shadow-purple-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <GraduationCap className="w-5 h-5 text-purple-200" />
                <span>SmartScore</span>
                <ExternalLink className="w-4 h-4 text-purple-200" />
              </a>

              <a
                href="https://ais-dev-nkva2sopmqx77b4kyddugi-958694204553.asia-southeast1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold px-5 py-3 rounded-xl border border-rose-400/40 shadow-lg hover:shadow-rose-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Trophy className="w-5 h-5 text-rose-200" />
                <span>SMART GRADE PRO</span>
                <ExternalLink className="w-4 h-4 text-rose-200" />
              </a>

              <button
                onClick={onOpenProfile}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Award className="w-5 h-5 text-slate-950" />
                <span>ประวัติและผลงานครูสุบิน</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
              >
                <Layers className="w-5 h-5 text-blue-300" />
                <span>ระบบจัดการข้อมูล (CMS)</span>
              </button>
            </div>
          </div>

          {/* Right / Visual Teacher Card Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-blue-600 to-indigo-600 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse-slow"></div>

              {/* Main Card */}
              <div className="relative bg-slate-900/90 border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
                
                {/* Photo container */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-800 border border-white/10 shadow-inner group">
                  <img
                    src={profile.profileImage || profile.fullBodyImage || 'Gemini-subinho.jpg'}
                    alt={profile.teacherName}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                  />

                  {/* School Seal Overlay Stamp */}
                  <div className="absolute top-2.5 right-2.5 bg-white/95 p-1 rounded-2xl shadow-xl border border-slate-200/80 backdrop-blur-md flex items-center justify-center">
                    {profile.schoolLogo && profile.schoolLogo.startsWith('data:image') ? (
                      <img
                        src={profile.schoolLogo}
                        alt="ตราโรงเรียน"
                        className="w-11 h-11 object-contain"
                      />
                    ) : (
                      <SchoolSeal className="w-11 h-11" />
                    )}
                  </div>

                  {/* Bottom overlay info */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 inline" />
                          ครูชำนาญการพิเศษ
                        </p>
                        <p className="text-sm font-bold text-white">
                          กลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี
                        </p>
                      </div>
                      <span className="text-[10px] bg-blue-600/80 px-2 py-0.5 rounded-full border border-blue-400/40">
                        ม.1 - ม.3
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
