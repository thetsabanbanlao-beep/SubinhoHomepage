import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Printer, 
  Presentation, 
  Video, 
  FileText, 
  HelpCircle, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  Sparkles, 
  Eye, 
  Calendar, 
  Award, 
  BookOpen, 
  ExternalLink,
  Maximize2
} from 'lucide-react';
import { WebPage, SlideBlock, SlideItem, QuizQuestion } from '../types/portal';
import { extractYoutubeId } from '../utils/storage';

interface PageViewerProps {
  page: WebPage;
  allPages: WebPage[];
  onBack: () => void;
  onSelectPage: (pageId: string) => void;
  onOpenPresentation: (page: WebPage) => void;
}

export const PageViewer: React.FC<PageViewerProps> = ({
  page,
  allPages,
  onBack,
  onSelectPage,
  onOpenPresentation,
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Interactive slide deck mini-state
  const [activeSlideIndexMap, setActiveSlideIndexMap] = useState<Record<string, number>>({});
  
  // Quiz user selections
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Lightbox image
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'large':
        return 'text-base sm:text-lg';
      case 'xlarge':
        return 'text-lg sm:text-xl';
      default:
        return 'text-sm sm:text-base';
    }
  };

  // Find next and previous pages
  const currentIndex = allPages.findIndex((p) => p.id === page.id);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 no-print">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าแรก</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Font size adjuster */}
            <div className="bg-white border border-slate-200 rounded-xl px-2 py-1 flex items-center gap-1 text-xs text-slate-600">
              <span className="text-[11px] text-slate-400 font-medium mr-1">ขนาดตัวอักษร:</span>
              <button
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2 py-1 rounded font-medium cursor-pointer ${
                  fontSizeLevel === 'normal' ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-100'
                }`}
              >
                ก
              </button>
              <button
                onClick={() => setFontSizeLevel('large')}
                className={`px-2 py-1 rounded font-medium text-sm cursor-pointer ${
                  fontSizeLevel === 'large' ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-100'
                }`}
              >
                ก+
              </button>
              <button
                onClick={() => setFontSizeLevel('xlarge')}
                className={`px-2 py-1 rounded font-medium text-base cursor-pointer ${
                  fontSizeLevel === 'xlarge' ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-100'
                }`}
              >
                ก++
              </button>
            </div>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="p-2 bg-white text-slate-600 hover:text-blue-600 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              title="พิมพ์เอกสาร / บันทึกเป็น PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-slate-700 hover:text-blue-600 border border-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="คัดลอกลิงก์แชร์"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">คัดลอกแล้ว!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>แชร์</span>
                </>
              )}
            </button>

            {/* Presentation trigger */}
            {page.blocks.some((b) => b.type === 'presentation_slide') && (
              <button
                onClick={() => onOpenPresentation(page)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Presentation className="w-4 h-4" />
                <span>ฉายสไลด์การสอน</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Page Banner Header */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl overflow-hidden shadow-xl mb-8 border border-slate-800">
          <div className="relative p-6 sm:p-10">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-semibold px-3 py-1 rounded-full">
                  {page.category}
                </span>
                {page.targetGrade && (
                  <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full">
                    {page.targetGrade}
                  </span>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  อัปเดตล่าสุด: {page.updatedAt}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {page.title}
              </h1>

              <p className="text-sm sm:text-base text-blue-200/90 font-light leading-relaxed">
                {page.shortDescription}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-300 border-t border-white/10">
                <span>ผู้สอน: ครูสุบิน คำมุลนา</span>
                <span>•</span>
                <span>โรงเรียนเทศบาล ๓ บ้านเหล่า</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Blocks List */}
        <div className={`space-y-8 ${getFontSizeClass()}`}>
          {page.blocks.map((block, bIdx) => {
            
            // 1. Rich Text Block
            if (block.type === 'rich_text') {
              return (
                <div key={block.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                  {block.badge && (
                    <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md mb-2">
                      {block.badge}
                    </span>
                  )}
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    {block.title}
                  </h2>
                  {block.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-500 mb-5 font-medium">
                      {block.subtitle}
                    </p>
                  )}
                  <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                    {block.content}
                  </div>
                </div>
              );
            }

            // 2. Presentation Slide Deck Block
            if (block.type === 'presentation_slide') {
              const slides = block.slides || [];
              const activeSlideIndex = activeSlideIndexMap[block.id] || 0;
              const currentSlide = slides[activeSlideIndex];

              return (
                <div key={block.id} className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
                  {/* Slide Deck Header */}
                  <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Presentation className="w-5 h-5 text-amber-400" />
                        <h2 className="text-base sm:text-lg font-bold text-white">
                          {block.title}
                        </h2>
                      </div>
                      <p className="text-xs text-blue-200/80 mt-0.5">
                        {block.subtitle || `สไลด์บทเรียนทั้งหมด ${slides.length} สไลด์`}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenPresentation(page)}
                      className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>โหมดฉายเต็มจอ</span>
                    </button>
                  </div>

                  {/* Active Slide Canvas */}
                  {currentSlide ? (
                    <div className="p-6 sm:p-10 bg-gradient-to-b from-blue-50/40 to-white min-h-[320px] flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                            สไลด์ที่ {activeSlideIndex + 1} จาก {slides.length}
                          </span>
                          {currentSlide.subtitle && (
                            <span className="text-xs text-slate-500 font-medium">
                              {currentSlide.subtitle}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                          {currentSlide.title}
                        </h3>

                        <p className="text-slate-700 leading-relaxed">
                          {currentSlide.content}
                        </p>

                        {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 mt-4">
                            {currentSlide.bulletPoints.map((bp, i) => (
                              <div key={i} className="flex items-start gap-2 text-slate-700 text-xs sm:text-sm">
                                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                <span>{bp}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {currentSlide.keyTakeaway && (
                          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg text-xs sm:text-sm text-amber-900 font-medium">
                            {currentSlide.keyTakeaway}
                          </div>
                        )}
                      </div>

                      {/* Slide Controls & Thumbnails */}
                      <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          {slides.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() =>
                                setActiveSlideIndexMap((prev) => ({ ...prev, [block.id]: idx }))
                              }
                              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeSlideIndex === idx
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            disabled={activeSlideIndex === 0}
                            onClick={() =>
                              setActiveSlideIndexMap((prev) => ({
                                ...prev,
                                [block.id]: Math.max(0, activeSlideIndex - 1),
                              }))
                            }
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <button
                            disabled={activeSlideIndex === slides.length - 1}
                            onClick={() =>
                              setActiveSlideIndexMap((prev) => ({
                                ...prev,
                                [block.id]: Math.min(slides.length - 1, activeSlideIndex + 1),
                              }))
                            }
                            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }

            // 3. YouTube Video Block
            if (block.type === 'youtube_video') {
              const videoId = extractYoutubeId(block.youtubeId || '');

              return (
                <div key={block.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-red-600" />
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                          {block.title}
                        </h2>
                      </div>
                      {block.subtitle && (
                        <p className="text-xs text-slate-500 mt-0.5">{block.subtitle}</p>
                      )}
                    </div>

                    {block.youtubeTime && (
                      <span className="text-xs bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-md font-medium">
                        ⏱️ {block.youtubeTime}
                      </span>
                    )}
                  </div>

                  {/* YouTube Embed Player */}
                  <div className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-lg bg-black border border-slate-200">
                    {videoId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                        title={block.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                        <Video className="w-12 h-12 mb-2 text-slate-600" />
                        <p className="text-sm">กรุณาระบุ YouTube Video ID หรือ Link ในระบบหลังบ้าน</p>
                      </div>
                    )}
                  </div>

                  {block.content && (
                    <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
                      {block.content}
                    </p>
                  )}
                </div>
              );
            }

            // 4. Download Resource Block
            if (block.type === 'download_resource') {
              return (
                <div key={block.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        {block.title}
                      </h2>
                    </div>
                    {block.subtitle && (
                      <p className="text-xs text-slate-500 mt-0.5">{block.subtitle}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {block.downloads?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/40 transition-all group"
                      >
                        <div className="space-y-1 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white">
                              {item.fileType}
                            </span>
                            {item.fileSize && (
                              <span className="text-[10px] text-slate-400">
                                {item.fileSize}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-700">
                            {item.title}
                          </h4>
                          {item.description && (
                            <p className="text-[11px] text-slate-500 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors shrink-0"
                          title="ดาวน์โหลดไฟล์"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // 5. Interactive Quiz Block
            if (block.type === 'interactive_quiz') {
              const questions = block.quizQuestions || [];
              const isSubmitted = quizSubmitted[block.id];

              const calculateScore = () => {
                let score = 0;
                questions.forEach((q) => {
                  if (quizAnswers[q.id] === q.correctIndex) {
                    score += 1;
                  }
                });
                return score;
              };

              return (
                <div key={block.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-purple-200 shadow-md space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-purple-600" />
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        {block.title}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {block.subtitle || 'เลือกคำตอบที่ถูกต้องที่สุดแล้วกดปุ่มตรวจคำตอบ'}
                    </p>
                  </div>

                  {/* Questions list */}
                  <div className="space-y-6">
                    {questions.map((q, qIndex) => {
                      const selected = quizAnswers[q.id];
                      const hasAnswered = selected !== undefined;

                      return (
                        <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <p className="text-sm sm:text-base font-bold text-slate-800">
                            ข้อที่ {qIndex + 1}. {q.question}
                          </p>

                          <div className="grid grid-cols-1 gap-2.5">
                            {q.options.map((opt, optIndex) => {
                              const isChoiceSelected = selected === optIndex;
                              const isCorrect = q.correctIndex === optIndex;

                              let buttonStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                              if (isSubmitted) {
                                if (isCorrect) {
                                  buttonStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                                } else if (isChoiceSelected && !isCorrect) {
                                  buttonStyle = 'bg-red-100 border-red-500 text-red-900';
                                }
                              } else if (isChoiceSelected) {
                                buttonStyle = 'bg-purple-100 border-purple-500 text-purple-900 font-semibold';
                              }

                              return (
                                <button
                                  key={optIndex}
                                  disabled={isSubmitted}
                                  onClick={() =>
                                    setQuizAnswers((prev) => ({ ...prev, [q.id]: optIndex }))
                                  }
                                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${buttonStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isSubmitted && isCorrect && (
                                    <Check className="w-4 h-4 text-emerald-600" />
                                  )}
                                  {isSubmitted && isChoiceSelected && !isCorrect && (
                                    <X className="w-4 h-4 text-red-600" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation after submit */}
                          {isSubmitted && q.explanation && (
                            <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-xs text-purple-900">
                              💡 <strong>คำอธิบาย:</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit / Reset Actions */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    {isSubmitted ? (
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-600 text-white font-bold px-4 py-2 rounded-xl text-sm">
                          คะแนนที่ได้: {calculateScore()} / {questions.length} คะแนน
                        </div>
                        <button
                          onClick={() => {
                            setQuizSubmitted((prev) => ({ ...prev, [block.id]: false }));
                            // clear answers for this quiz
                            const newAnswers = { ...quizAnswers };
                            questions.forEach((q) => delete newAnswers[q.id]);
                            setQuizAnswers(newAnswers);
                          }}
                          className="text-xs font-semibold text-purple-700 hover:underline cursor-pointer"
                        >
                          🔄 ทำแบบทดสอบใหม่อีกครั้ง
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          setQuizSubmitted((prev) => ({ ...prev, [block.id]: true }))
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        ตรวจคำตอบและส่งแบบทดสอบ
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            // 6. Image Gallery Block
            if (block.type === 'image_gallery') {
              return (
                <div key={block.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {block.title}
                    </h2>
                    {block.subtitle && (
                      <p className="text-xs text-slate-500 mt-0.5">{block.subtitle}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    {block.gallery?.map((img) => (
                      <div
                        key={img.id}
                        onClick={() => setLightboxImage({ url: img.url, title: img.title })}
                        className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                          <p className="text-xs font-bold text-white leading-tight">{img.title}</p>
                          {img.caption && (
                            <p className="text-[10px] text-slate-300 line-clamp-1">{img.caption}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Bottom Pagination & Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 no-print">
          {prevPage ? (
            <button
              onClick={() => onSelectPage(prevPage.id)}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-all group flex items-center gap-3 cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-600 shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[11px] font-semibold text-slate-400 block">บทเรียนก่อนหน้า</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 truncate block">
                  {prevPage.title}
                </span>
              </div>
            </button>
          ) : <div />}

          {nextPage && (
            <button
              onClick={() => onSelectPage(nextPage.id)}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-right transition-all group flex items-center justify-end gap-3 cursor-pointer shadow-xs"
            >
              <div className="overflow-hidden">
                <span className="text-[11px] font-semibold text-slate-400 block">บทเรียนถัดไป</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 truncate block">
                  {nextPage.title}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 shrink-0" />
            </button>
          )}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md cursor-pointer animate-fadeIn"
          >
            <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[80vh] w-auto rounded-xl shadow-2xl object-contain"
              />
              <p className="text-white text-sm mt-3 font-semibold text-center">
                {lightboxImage.title}
              </p>
              <p className="text-slate-400 text-xs mt-1">คลิกเพื่อปิด</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
