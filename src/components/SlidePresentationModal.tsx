import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Lightbulb,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { WebPage, SlideItem } from '../types/portal';

interface SlidePresentationModalProps {
  page: WebPage;
  onClose: () => void;
}

export const SlidePresentationModal: React.FC<SlidePresentationModalProps> = ({
  page,
  onClose,
}) => {
  // Aggregate all slides from presentation blocks
  const allSlides: SlideItem[] = page.blocks
    .filter((b) => b.type === 'presentation_slide')
    .flatMap((b) => b.slides || []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  const currentSlide = allSlides[currentIndex] || {
    id: 'empty',
    title: page.title,
    subtitle: 'ไม่มีสไลด์ในหน้านี้',
    content: page.shortDescription,
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentIndex((prev) => Math.min(allSlides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allSlides.length, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden animate-fadeIn select-none">
      
      {/* Top Header Bar */}
      <div className="bg-slate-900/90 border-b border-white/10 px-6 py-3 flex items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-md">
            โหมดฉายสไลด์การสอน
          </span>
          <div className="overflow-hidden">
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {page.title}
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              ครูสุบิน คำมุลนา • โรงเรียนเทศบาล ๓ บ้านเหล่า
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              showNotes 
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' 
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 inline mr-1" />
            <span>คำอธิบายเพิ่มเติม</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
            title="ขยายเต็มหน้าจอ"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-white transition-colors cursor-pointer"
            title="ปิดหน้าจอฉาย (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="max-w-4xl w-full bg-gradient-to-br from-slate-900 to-indigo-950 border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase">
              สไลด์ {currentIndex + 1} / {Math.max(1, allSlides.length)}
            </span>
            {currentSlide.subtitle && (
              <span className="text-xs sm:text-sm text-blue-300 font-medium">
                {currentSlide.subtitle}
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {currentSlide.title}
          </h3>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-light">
            {currentSlide.content}
          </p>

          {/* Bullet points */}
          {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
            <div className="space-y-3 pt-2">
              {currentSlide.bulletPoints.map((bp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl text-sm sm:text-base text-slate-100"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key Takeaway box */}
          {showNotes && currentSlide.keyTakeaway && (
            <div className="bg-amber-500/15 border-l-4 border-amber-400 p-4 rounded-r-xl text-sm sm:text-base text-amber-200 font-medium animate-fadeIn">
              {currentSlide.keyTakeaway}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Slide Controller Bar */}
      <div className="bg-slate-900/90 border-t border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
        
        {/* Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-md py-1">
          {allSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ก่อนหน้า</span>
          </button>

          <button
            disabled={currentIndex === allSlides.length - 1}
            onClick={() => setCurrentIndex((prev) => Math.min(allSlides.length - 1, prev + 1))}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
          >
            <span>ถัดไป</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
