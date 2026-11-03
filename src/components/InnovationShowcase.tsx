import React from 'react';
import { 
  Atom, 
  Binary, 
  Cpu, 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb,
  Video,
  FileCheck,
  Rocket
} from 'lucide-react';
import { WebPage } from '../types/portal';

interface InnovationShowcaseProps {
  onSelectCategory: (category: string) => void;
  onSelectPage: (pageId: string) => void;
  pages: WebPage[];
}

export const InnovationShowcase: React.FC<InnovationShowcaseProps> = ({
  onSelectCategory,
  onSelectPage,
  pages,
}) => {
  const gradeTracks = [
    {
      grade: 'มัธยมศึกษาปีที่ 1',
      subject: 'วิทยาการคำนวณ (Computing Science)',
      icon: Binary,
      color: 'from-blue-600 to-cyan-600',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50/70',
      borderColor: 'border-blue-200',
      topics: [
        'การคิดเชิงคำนวณ (Computational Thinking 4 เสาหลัก)',
        'การออกแบบขั้นตอนวิธีและการเขียนโปรแกรม Scratch & Python',
        'การรู้เท่าทันสื่อดิจิทัลและความปลอดภัยไซเบอร์',
      ],
      pageId: pages.find((p) => p.targetGrade === 'ม.1')?.id,
    },
    {
      grade: 'มัธยมศึกษาปีที่ 2',
      subject: 'การออกแบบและเทคโนโลยี (Design & Tech)',
      icon: Cpu,
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-600',
      bgLight: 'bg-emerald-50/70',
      borderColor: 'border-emerald-200',
      topics: [
        'กระบวนการออกแบบเชิงวิศวกรรม 6 ขั้นตอน (EDP)',
        'กลไก เฟือง คาน รอก และระบบไฟฟ้าอิเล็กทรอนิกส์',
        'การสร้างชิ้นงานสิ่งประดิษฐ์แก้ปัญหาชุมชน',
      ],
      pageId: pages.find((p) => p.targetGrade === 'ม.2')?.id,
    },
    {
      grade: 'มัธยมศึกษาปีที่ 3',
      subject: 'สะเต็มศึกษา & AI (STEM & Artificial Intelligence)',
      icon: BrainCircuit,
      color: 'from-purple-600 to-indigo-600',
      textColor: 'text-purple-600',
      bgLight: 'bg-purple-50/70',
      borderColor: 'border-purple-200',
      topics: [
        'ปัญญาประดิษฐ์ (AI Literacy) และการประยุกต์ใช้งาน',
        'อินเทอร์เน็ตของสรรพสิ่ง (IoT) และระบบควบคุมอัตโนมัติ',
        'โครงงานนวัตกรรมสะเต็มศึกษาเพื่อการพัฒนาที่ยั่งยืน',
      ],
      pageId: pages.find((p) => p.targetGrade === 'ม.3')?.id,
    },
  ];

  const teachingPillars = [
    {
      title: 'Active Learning เชิงรุก',
      description: 'เน้นให้นักเรียนได้ลงมือปฏิบัติจริง แก้ปัญหาจริงในชีวิตประจำวัน',
      icon: Rocket,
      color: 'text-amber-500 bg-amber-100',
    },
    {
      title: 'สื่อวิดีโอ & สไลด์ Interactive',
      description: 'คลิป YouTube พร้อมสไลด์สรุปบทเรียนและเครื่องมือทดสอบออนไลน์',
      icon: Video,
      color: 'text-red-500 bg-red-100',
    },
    {
      title: 'วัดและประเมินผลตามสภาพจริง',
      description: 'แบบทดสอบออนไลน์พร้อมตรวจคำตอบและฟีดแบ็กทันที',
      icon: FileCheck,
      color: 'text-blue-500 bg-blue-100',
    },
    {
      title: 'นวัตกรรม Google Apps Script',
      description: 'เชื่อมโยงข้อมูลแบบเรียลไทม์ ปลอดภัย และสำเนาไปใช้กับบัญชี Google ได้',
      icon: Sparkles,
      color: 'text-emerald-500 bg-emerald-100',
    },
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300/80 shadow-xs">
            <Atom className="w-3.5 h-3.5 text-amber-600" />
            <span>กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            โครงสร้างหลักสูตรและระดับชั้นที่ปฏิบัติการสอน (ม.1 - ม.3)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            มุ่งเน้นเสริมสร้างสมรรถนะผู้เรียนด้านวิทยาศาสตร์ การคิดเชิงคำนวณ การออกแบบเทคโนโลยี และสะเต็มศึกษา
          </p>
        </div>

        {/* 3 Grade Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gradeTracks.map((track, i) => {
            const Icon = track.icon;
            return (
              <div
                key={i}
                className={`rounded-3xl p-6 border ${track.borderColor} ${track.bgLight} shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white text-slate-800 shadow-xs border border-slate-200">
                      {track.grade}
                    </span>
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${track.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {track.subject}
                  </h3>

                  <ul className="space-y-2 pt-2">
                    {track.topics.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${track.textColor}`} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60">
                  {track.pageId ? (
                    <button
                      onClick={() => onSelectPage(track.pageId!)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${track.color} hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all`}
                    >
                      <span>เข้าสู่บทเรียน {track.grade}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 block text-center py-2">
                      พร้อมเปิดสอนในระบบ
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Pillars Highlight Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              จุดเด่นระบบการจัดการเรียนรู้ ครูสุบิน คำมุลนา
            </h3>
            <p className="text-xs sm:text-sm text-blue-200/80">
              โรงเรียนเทศบาล ๓ บ้านเหล่า สำนักการศึกษา เทศบาลนครอุดรธานี
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachingPillars.map((pillar, pIdx) => {
              const PIcon = pillar.icon;
              return (
                <div
                  key={pIdx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm space-y-2 hover:bg-white/10 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${pillar.color}`}>
                    <PIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
