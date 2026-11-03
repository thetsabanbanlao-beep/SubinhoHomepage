import React from 'react';
import { 
  X, 
  Award, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Share2,
  Atom,
  Binary
} from 'lucide-react';
import { TeacherProfile } from '../types/portal';
import { SchoolSeal } from './SchoolSeal';

interface TeacherProfileModalProps {
  profile: TeacherProfile;
  onClose: () => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  profile,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl relative flex flex-col">
        
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-6 sm:p-8 rounded-t-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Portrait */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-800 shrink-0">
              <img
                src={profile.profileImage || 'Gemini-subinho.jpg'}
                alt={profile.teacherName}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Titles & Bio */}
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-0.5 rounded-full shadow-xs">
                  <Award className="w-3.5 h-3.5 text-slate-950" />
                  {profile.academicStanding}
                </span>
                <span className="inline-flex items-center gap-1 bg-blue-800/80 text-blue-200 border border-blue-400/30 text-xs px-2.5 py-0.5 rounded-full">
                  {profile.position}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {profile.teacherName}
              </h2>

              <p className="text-sm text-blue-200 font-medium">
                {profile.schoolName}
              </p>

              <p className="text-xs text-blue-300/80">
                {profile.department}
              </p>
            </div>

            {/* School Seal */}
            <div className="hidden md:flex flex-col items-center justify-center bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-md shrink-0">
              <SchoolSeal className="w-16 h-16" />
              <span className="text-[10px] text-amber-300 font-bold mt-1">ตราประจำโรงเรียน</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Teaching Responsibility Card */}
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
              <Atom className="w-4 h-4 text-blue-600" />
              <span>ภาระงานสอนและกลุ่มสาระการเรียนรู้</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2.5">
                <Binary className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">ระดับชั้นที่ปฏิบัติการสอน</span>
                  <span className="font-bold text-slate-800">{profile.teachingLevels}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2.5">
                <Atom className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">กลุ่มสาระการเรียนรู้</span>
                  <span className="font-bold text-slate-800">{profile.learningArea}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy / Vision */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>วิสัยทัศน์และการจัดการเรียนรู้ (Active Learning)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              "{profile.motto}"
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {profile.bio}
            </p>
          </div>

          {/* Academic Key Achievements */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>ผลงานและนวัตกรรมทางการศึกษาเด่น</span>
            </h3>

            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900">การพัฒนาสื่อดิจิทัลและ Google Apps Script:</strong>
                  <span className="text-slate-600 block text-xs mt-0.5">
                    ระบบจัดการห้องเรียนออนไลน์และคลังข้อสอบอัตโนมัติ สำหรับนักเรียนระดับมัธยมศึกษา
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900">โครงงานวิทยาการคำนวณและสะเต็มศึกษา (STEM):</strong>
                  <span className="text-slate-600 block text-xs mt-0.5">
                    ฝึกทักษะการแก้ปัญหาในชุมชนผ่านการเขียนโปรแกรมและการเชื่อมต่อเซนเซอร์ IoT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-t border-slate-200 pt-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">ช่องทางการติดต่อ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{profile.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์ข้อมูลประวัติ</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
