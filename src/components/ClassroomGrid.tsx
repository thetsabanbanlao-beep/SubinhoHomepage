import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Video, 
  FileText, 
  HelpCircle, 
  Plus, 
  Eye, 
  Calendar, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Presentation
} from 'lucide-react';
import { WebPage } from '../types/portal';

interface ClassroomGridProps {
  pages: WebPage[];
  onSelectPage: (pageId: string) => void;
  onOpenPresentation: (page: WebPage) => void;
  onOpenAdmin: () => void;
  searchQuery: string;
}

export const ClassroomGrid: React.FC<ClassroomGridProps> = ({
  pages,
  onSelectPage,
  onOpenPresentation,
  onOpenAdmin,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');

  const categories = ['ทั้งหมด', 'บทเรียน ม.1', 'บทเรียน ม.2', 'บทเรียน ม.3', 'สื่อและนวัตกรรม', 'ผลงานและรางวัล'];

  // Filter pages
  const filteredPages = pages.filter((page) => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || page.category === selectedCategory;
    const matchesSearch = 
      !searchQuery ||
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (page.targetGrade && page.targetGrade.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-8 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills & Quick Actions */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4 scrollbar-none mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-3.5 py-2 rounded-xl border border-slate-300 shadow-xs hover:shadow transition-all text-xs cursor-pointer shrink-0 ml-auto"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>สร้างเว็บเพจใหม่</span>
          </button>
        </div>

        {/* Grid of Webpage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => {
            // Count slide blocks
            const hasSlides = page.blocks.some((b) => b.type === 'presentation_slide');
            const hasVideo = page.blocks.some((b) => b.type === 'youtube_video');
            const hasQuiz = page.blocks.some((b) => b.type === 'interactive_quiz');
            const hasDownloads = page.blocks.some((b) => b.type === 'download_resource');

            return (
              <div
                key={page.id}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                {/* Card Cover Image */}
                <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                  <img
                    src={page.coverImage}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  
                  {/* Category & Grade Tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/20">
                      {page.category}
                    </span>
                    {page.targetGrade && (
                      <span className="bg-blue-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        {page.targetGrade}
                      </span>
                    )}
                  </div>

                  {/* Views / Date */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white/90 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Eye className="w-3 h-3 text-white" />
                    <span>{page.views || 350}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onSelectPage(page.id)}
                      className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {page.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {page.shortDescription}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {hasSlides && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
                          <Presentation className="w-3 h-3 text-amber-600" />
                          <span>สไลด์การสอน</span>
                        </span>
                      )}
                      {hasVideo && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md">
                          <Video className="w-3 h-3 text-red-600" />
                          <span>วิดีโอ YouTube</span>
                        </span>
                      )}
                      {hasQuiz && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md">
                          <HelpCircle className="w-3 h-3 text-purple-600" />
                          <span>แบบทดสอบ</span>
                        </span>
                      )}
                      {hasDownloads && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md">
                          <FileText className="w-3 h-3 text-blue-600" />
                          <span>ใบงาน/เอกสาร</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectPage(page.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      <span>เข้าสู่บทเรียน</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {hasSlides && (
                      <button
                        onClick={() => onOpenPresentation(page)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        title="ฉายสไลด์การสอนเต็มจอ"
                      >
                        <Presentation className="w-3.5 h-3.5 text-amber-600" />
                        <span>ฉายสไลด์</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Quick Create Card */}
          <div
            onClick={onOpenAdmin}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/40 transition-all group min-h-[300px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-all mb-3 shadow-xs">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700">
              เพิ่มเว็บเพจ / หน่วยการเรียนรู้ใหม่
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              ครูสามารถสร้างหน้าใหม่ ใส่สไลด์ วิดีโอ YouTube ใบงาน และแบบทดสอบได้ทันที
            </p>
            <span className="mt-4 text-xs font-semibold text-blue-600 underline">
              เปิดระบบจัดการหลังบ้าน &rarr;
            </span>
          </div>
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-700">ไม่พบบทเรียนที่ค้นหา</p>
            <p className="text-xs text-slate-500 mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น</p>
          </div>
        )}

      </div>
    </section>
  );
};
