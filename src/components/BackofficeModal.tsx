import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Layers, 
  BookOpen, 
  Video, 
  HelpCircle, 
  FileText, 
  Image as ImageIcon, 
  Cloud, 
  Copy, 
  Check, 
  RefreshCw, 
  Upload, 
  ExternalLink, 
  Sliders, 
  Award, 
  GraduationCap, 
  Sparkles,
  Download,
  AlertCircle,
  FileUp,
  FolderSync,
  Lock,
  KeyRound,
  User,
  LogIn,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { PortalData, TeacherProfile, WebPage, SlideBlock, SlideItem, QuizQuestion, DownloadItem, GalleryItem } from '../types/portal';
import { generateGoogleAppsScriptCode } from '../utils/gasCodeGenerator';
import { testGasConnection, pushDataToGas, pullDataFromGas, exportToJson, extractYoutubeId } from '../utils/storage';
import { PRESET_IMAGES } from '../utils/imagePresets';

interface BackofficeModalProps {
  data: PortalData;
  onSave: (newData: PortalData) => void;
  onClose: () => void;
}

export const BackofficeModal: React.FC<BackofficeModalProps> = ({
  data,
  onSave,
  onClose,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'profile' | 'pages' | 'content' | 'gas' | 'media'>('profile');
  const [formData, setFormData] = useState<PortalData>(JSON.parse(JSON.stringify(data)));
  const [selectedPageId, setSelectedPageId] = useState<string>(formData.pages[0]?.id || '');
  
  // GAS sync states
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === 'subinho' && passwordInput === 'sk290860') {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
    setLoginError(null);
  };

  // Profile fields helper
  const handleProfileChange = (field: keyof TeacherProfile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  // Save changes locally
  const handleSaveAll = () => {
    onSave(formData);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  // Image Upload helper
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetField: 'profileImage' | 'schoolLogo' | 'heroBgImage' | 'coverImage',
    pageId?: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        if (targetField === 'coverImage' && pageId) {
          setFormData((prev) => ({
            ...prev,
            pages: prev.pages.map((p) => (p.id === pageId ? { ...p, coverImage: resultUrl } : p)),
          }));
        } else if (targetField !== 'coverImage') {
          handleProfileChange(targetField, resultUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new webpage
  const handleAddNewPage = () => {
    const newPageId = `page-${Date.now()}`;
    const newPage: WebPage = {
      id: newPageId,
      slug: `lesson-${formData.pages.length + 1}`,
      title: `หน่วยการเรียนรู้ใหม่ที่ ${formData.pages.length + 1}`,
      icon: 'BookOpen',
      category: 'บทเรียน ม.1',
      shortDescription: 'กรุณากรอกคำอธิบายย่อของบทเรียนหรือหน้าเว็บเพจนี้...',
      coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      featured: true,
      order: formData.pages.length + 1,
      published: true,
      targetGrade: 'ม.1',
      updatedAt: new Date().toISOString().slice(0, 10),
      blocks: [
        {
          id: `b-${Date.now()}-1`,
          type: 'rich_text',
          title: '🎯 สาระสำคัญและจุดประสงค์การเรียนรู้',
          subtitle: 'คำอธิบายเนื้อหา',
          content: 'กรอกเนื้อหาและคำอธิบายบทเรียนในส่วนนี้...',
        },
      ],
    };

    setFormData((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
    }));
    setSelectedPageId(newPageId);
    setActiveTab('content');
  };

  // Delete page
  const handleDeletePage = (pageId: string) => {
    if (confirm('คุณต้องการลบเว็บเพจนี้ใช่หรือไม่?')) {
      const remaining = formData.pages.filter((p) => p.id !== pageId);
      setFormData((prev) => ({ ...prev, pages: remaining }));
      if (selectedPageId === pageId && remaining.length > 0) {
        setSelectedPageId(remaining[0].id);
      }
    }
  };

  // Current selected page for content editing
  const selectedPage = formData.pages.find((p) => p.id === selectedPageId) || formData.pages[0];

  // Add block to current page
  const handleAddBlock = (type: SlideBlock['type']) => {
    if (!selectedPage) return;

    let newBlock: SlideBlock;
    const blockId = `b-${Date.now()}`;

    switch (type) {
      case 'presentation_slide':
        newBlock = {
          id: blockId,
          type: 'presentation_slide',
          title: '📊 สไลด์ประกอบการสอน',
          subtitle: 'คลิกเพื่อดูสไลด์การสอน',
          slides: [
            {
              id: `s-${Date.now()}-1`,
              title: 'หัวข้อสไลด์ที่ 1',
              subtitle: 'คำอธิบายย่อย',
              content: 'พิมพ์เนื้อหาของสไลด์ที่ 1 ในส่วนนี้...',
              bulletPoints: ['ประเด็นสำคัญที่ 1', 'ประเด็นสำคัญที่ 2'],
              keyTakeaway: '💡 เคล็ดลับหรือข้อควรจำ',
            },
          ],
        };
        break;
      case 'youtube_video':
        newBlock = {
          id: blockId,
          type: 'youtube_video',
          title: '🎬 วิดีโอคลิปการสอน YouTube',
          subtitle: 'บรรยายโดย ครูสุบิน คำมุลนา',
          youtubeId: 'p3E0v7x6E5c',
          youtubeTime: '15:00 นาที',
          content: 'สรุปประเด็นสำคัญจากคลิปวิดีโอ...',
        };
        break;
      case 'interactive_quiz':
        newBlock = {
          id: blockId,
          type: 'interactive_quiz',
          title: '📝 แบบทดสอบท้ายบทเรียน',
          subtitle: 'เลือกคำตอบที่ถูกต้องที่สุด',
          quizQuestions: [
            {
              id: `q-${Date.now()}-1`,
              question: 'คำถามข้อที่ 1...',
              options: ['ตัวเลือก ก', 'ตัวเลือก ข', 'ตัวเลือก ค', 'ตัวเลือก ง'],
              correctIndex: 0,
              explanation: 'คำอธิบายเหตุผลว่าทำไมตัวเลือกนี้ถึงถูกต้อง',
            },
          ],
        };
        break;
      case 'download_resource':
        newBlock = {
          id: blockId,
          type: 'download_resource',
          title: '📂 เอกสารและใบงานประกอบการเรียน',
          downloads: [
            {
              id: `d-${Date.now()}-1`,
              title: 'ใบงานที่ 1: การฝึกปฏิบัติ',
              fileType: 'PDF',
              fileSize: '1.2 MB',
              url: '#',
              description: 'เอกสารประกอบการทำกิจกรรมในห้องเรียน',
            },
          ],
        };
        break;
      case 'image_gallery':
        newBlock = {
          id: blockId,
          type: 'image_gallery',
          title: '📸 ภาพกิจกรรมการเรียนรู้',
          gallery: [
            {
              id: `g-${Date.now()}-1`,
              title: 'ภาพกิจกรรมในห้องเรียน',
              url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
              caption: 'บรรยากาศการเรียนรู้',
            },
          ],
        };
        break;
      default:
        newBlock = {
          id: blockId,
          type: 'rich_text',
          title: '📝 หัวข้อเนื้อหาใหม่',
          content: 'พิมพ์เนื้อหาบทเรียนที่ต้องการในส่วนนี้...',
        };
        break;
    }

    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === selectedPage.id ? { ...p, blocks: [...p.blocks, newBlock] } : p
      ),
    }));
  };

  // Delete Block
  const handleDeleteBlock = (blockId: string) => {
    if (!selectedPage) return;
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === selectedPage.id
          ? { ...p, blocks: p.blocks.filter((b) => b.id !== blockId) }
          : p
      ),
    }));
  };

  // Update Block
  const handleUpdateBlock = (blockId: string, updater: (b: SlideBlock) => SlideBlock) => {
    if (!selectedPage) return;
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === selectedPage.id
          ? {
              ...p,
              blocks: p.blocks.map((b) => (b.id === blockId ? updater(b) : b)),
            }
          : p
      ),
    }));
  };

  // Google Apps Script test connection
  const handleTestGas = async () => {
    setIsTesting(true);
    setTestResult(null);
    const result = await testGasConnection(formData.gasConfig.webAppUrl);
    setIsTesting(false);
    setTestResult(result);
  };

  // Google Apps Script push data
  const handlePushGas = async () => {
    setIsSyncing(true);
    const result = await pushDataToGas(formData.gasConfig.webAppUrl, formData);
    setIsSyncing(false);
    if (result.success) {
      setFormData((prev) => ({
        ...prev,
        gasConfig: {
          ...prev.gasConfig,
          lastSyncedAt: new Date().toISOString(),
          syncStatus: 'success',
        },
      }));
      alert('✅ ซิงค์และบันทึกข้อมูลขึ้น Google Cloud / Apps Script สำเร็จแล้ว!');
    } else {
      alert(`⚠️ ${result.message}`);
    }
  };

  // Pull data from GAS
  const handlePullGas = async () => {
    if (confirm('คุณต้องการดึงข้อมูลล่าสุดจาก Google Sheets / Apps Script มาทับข้อมูลปัจจุบันใช่หรือไม่?')) {
      setIsSyncing(true);
      const result = await pullDataFromGas(formData.gasConfig.webAppUrl);
      setIsSyncing(false);
      if (result.success && result.data) {
        setFormData(result.data);
        onSave(result.data);
        alert('✅ ดึงข้อมูลล่าสุดจาก Google Cloud สำเร็จแล้ว!');
      } else {
        alert(`⚠️ ${result.message}`);
      }
    }
  };

  // Copy GAS Code
  const handleCopyGasCode = () => {
    const code = generateGoogleAppsScriptCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // Import JSON backup
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.profile && parsed.pages) {
            setFormData(parsed);
            onSave(parsed);
            alert('✅ นำเข้าข้อมูลสำรองสำเร็จแล้ว!');
          } else {
            alert('ไฟล์ JSON ไม่ถูกต้องตามรูปแบบของพอร์ทัล');
          }
        } catch {
          alert('ไม่สามารถอ่านไฟล์ JSON ได้');
        }
      };
      reader.readAsText(file);
    }
  };

  // If not authenticated, show secure login screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
          
          {/* Top Decorative Header */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white p-6 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-amber-500 text-slate-950 shadow-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-slate-950" />
            </div>

            <h2 className="text-xl font-bold text-white">
              ระบบเข้าสู่ระบบหลังบ้าน
            </h2>
            <p className="text-xs text-blue-200 mt-1 font-light">
              {formData.profile.teacherName} • {formData.profile.schoolName}
            </p>
          </div>

          {/* Login Form Body */}
          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-4">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                ชื่อผู้ใช้งาน (Username)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="กรอกชื่อผู้ใช้งาน"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                รหัสผ่าน (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="กรอกรหัสผ่าน"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <LogIn className="w-4 h-4" />
                <span>เข้าสู่ระบบ (Sign In)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs rounded-xl transition-colors cursor-pointer"
              >
                ยกเลิก / ปิดหน้าต่าง
              </button>
            </div>

            <div className="text-center pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                ระบบความปลอดภัยสำหรับคุณครูผู้ดูแลระบบ
              </span>
            </div>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-xl text-slate-950 shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                ระบบจัดการหลังบ้าน (Teacher Admin CMS)
                <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  {formData.profile.teacherName}
                </span>
              </h2>
              <p className="text-xs text-blue-200/80">
                จัดการข้อมูลครู เว็บเพจ สไลด์ วิดีโอ YouTube และเชื่อมต่อ Google Apps Script
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveSuccessNotice && (
              <span className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 animate-fadeIn">
                <Check className="w-3.5 h-3.5" /> บันทึกเรียบร้อย
              </span>
            )}

            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกการเปลี่ยนแปลง</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              title="ออกจากระบบ"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>ออกจากระบบ</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>1. ข้อมูลครูและโรงเรียน</span>
          </button>

          <button
            onClick={() => setActiveTab('pages')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'pages'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>2. จัดการเว็บเพจ ({formData.pages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'content'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. สไลด์และเนื้อหาบทเรียน</span>
          </button>

          <button
            onClick={() => setActiveTab('gas')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'gas'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cloud className="w-4 h-4 text-emerald-600" />
            <span>4. ระบบออนไลน์เต็มรูปแบบ (Apps Script)</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'media'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>5. คลังรูปภาพ</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/50">
          
          {/* ================= TAB 1: TEACHER PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>ข้อมูลส่วนตัวและตำแหน่งทางวิชาการ</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      ชื่อ - สกุล ครูผู้สอน *
                    </label>
                    <input
                      type="text"
                      value={formData.profile.teacherName}
                      onChange={(e) => handleProfileChange('teacherName', e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      วิทยฐานะ *
                    </label>
                    <input
                      type="text"
                      value={formData.profile.academicStanding}
                      onChange={(e) => handleProfileChange('academicStanding', e.target.value)}
                      placeholder="วิทยฐานะ ครูชำนาญการพิเศษ"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      ตำแหน่ง
                    </label>
                    <input
                      type="text"
                      value={formData.profile.position}
                      onChange={(e) => handleProfileChange('position', e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      ระดับชั้นที่ปฏิบัติการสอน *
                    </label>
                    <input
                      type="text"
                      value={formData.profile.teachingLevels}
                      onChange={(e) => handleProfileChange('teachingLevels', e.target.value)}
                      placeholder="ปฏิบัติการสอน ระดับชั้นมัธยมศึกษาปีที่ 1 - 3"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      กลุ่มสาระการเรียนรู้ *
                    </label>
                    <input
                      type="text"
                      value={formData.profile.learningArea}
                      onChange={(e) => handleProfileChange('learningArea', e.target.value)}
                      placeholder="กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* School Info */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>ข้อมูลสถานศึกษาและสังกัด</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      ชื่อโรงเรียน *
                    </label>
                    <input
                      type="text"
                      value={formData.profile.schoolName}
                      onChange={(e) => handleProfileChange('schoolName', e.target.value)}
                      placeholder="โรงเรียนเทศบาล ๓ บ้านเหล่า"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      หน่วยงานต้นสังกัด *
                    </label>
                    <input
                      type="text"
                      value={formData.profile.department}
                      onChange={(e) => handleProfileChange('department', e.target.value)}
                      placeholder="สำนักการศึกษา เทศบาลนครอุดรธานี"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      สโลแกน / คติพจน์ห้องเรียน (Motto)
                    </label>
                    <input
                      type="text"
                      value={formData.profile.motto}
                      onChange={(e) => handleProfileChange('motto', e.target.value)}
                      placeholder="ครูยุคใหม่ หัวใจนวัตกรรม มุ่งมั่นพัฒนาผู้เรียนสู่ศตวรรษที่ 21"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      วิสัยทัศน์และการจัดการเรียนรู้ (Bio)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.profile.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Photos & Branding */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ImageIcon className="w-5 h-5 text-indigo-600" />
                  <span>รูปโปรไฟล์และภาพตราสัญลักษณ์</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Teacher Photo */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 block">
                      รูปถ่ายครูผู้สอน
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-24 rounded-xl bg-slate-100 overflow-hidden border border-slate-300 shrink-0">
                        <img
                          src={formData.profile.profileImage}
                          alt="Teacher"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-semibold cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>อัปโหลดรูปจากเครื่อง</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'profileImage')}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          value={formData.profile.profileImage}
                          onChange={(e) => handleProfileChange('profileImage', e.target.value)}
                          placeholder="หรือวาง URL รูปภาพ"
                          className="w-full text-[11px] p-2 rounded-lg border border-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* School Logo */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 block">
                      ตราโรงเรียนเทศบาล ๓ บ้านเหล่า
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden border border-slate-300 p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={formData.profile.schoolLogo}
                          alt="Logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-semibold cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>อัปโหลดตราโรงเรียน</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'schoolLogo')}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          value={formData.profile.schoolLogo}
                          onChange={(e) => handleProfileChange('schoolLogo', e.target.value)}
                          placeholder="หรือวาง URL ตราโรงเรียน"
                          className="w-full text-[11px] p-2 rounded-lg border border-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  ช่องทางการติดต่อ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">อีเมล</label>
                    <input
                      type="email"
                      value={formData.profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">เบอร์โทรศัพท์</label>
                    <input
                      type="text"
                      value={formData.profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">LINE ID</label>
                    <input
                      type="text"
                      value={formData.profile.lineId}
                      onChange={(e) => handleProfileChange('lineId', e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ที่อยู่โรงเรียน</label>
                    <input
                      type="text"
                      value={formData.profile.address}
                      onChange={(e) => handleProfileChange('address', e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: MANAGE PAGES ================= */}
          {activeTab === 'pages' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    รายการเว็บเพจทั้งหมด ({formData.pages.length} หน้า)
                  </h3>
                  <p className="text-xs text-slate-500">
                    สามารถสร้าง เพิ่ม ลบ หรือแก้ไขข้อมูลของแต่ละหน้าได้
                  </p>
                </div>

                <button
                  onClick={handleAddNewPage}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>เพิ่มเว็บเพจใหม่</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.pages.map((p, idx) => (
                  <div
                    key={p.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {p.category}
                          </span>
                          {p.targetGrade && (
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              {p.targetGrade}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">
                            {p.blocks.length} บล็อกเนื้อหา
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {p.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                      <button
                        onClick={() => {
                          setSelectedPageId(p.id);
                          setActiveTab('content');
                        }}
                        className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        แก้ไขเนื้อหา/สไลด์
                      </button>

                      <button
                        onClick={() => handleDeletePage(p.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="ลบเพจนี้"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: CONTENT & SLIDE BUILDER ================= */}
          {activeTab === 'content' && (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Select Active Page */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">กำลังแก้ไขหน้า:</span>
                  <select
                    value={selectedPageId}
                    onChange={(e) => setSelectedPageId(e.target.value)}
                    className="text-xs sm:text-sm font-bold p-2 bg-slate-50 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {formData.pages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">เพิ่มบล็อกใหม่:</span>
                  <button
                    onClick={() => handleAddBlock('presentation_slide')}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
                  >
                    + สไลด์การสอน
                  </button>
                  <button
                    onClick={() => handleAddBlock('youtube_video')}
                    className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs cursor-pointer"
                  >
                    + วิดีโอ YouTube
                  </button>
                  <button
                    onClick={() => handleAddBlock('interactive_quiz')}
                    className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs cursor-pointer"
                  >
                    + แบบทดสอบ
                  </button>
                  <button
                    onClick={() => handleAddBlock('rich_text')}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs cursor-pointer"
                  >
                    + ข้อความ
                  </button>
                  <button
                    onClick={() => handleAddBlock('download_resource')}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs cursor-pointer"
                  >
                    + ไฟล์ดาวน์โหลด
                  </button>
                </div>
              </div>

              {/* Page Metadata Settings */}
              {selectedPage && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    ข้อมูลพื้นฐานของหน้านี้
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        ชื่อหัวข้อบทเรียน / เว็บเพจ *
                      </label>
                      <input
                        type="text"
                        value={selectedPage.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            pages: prev.pages.map((p) =>
                              p.id === selectedPage.id ? { ...p, title: val } : p
                            ),
                          }));
                        }}
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">หมวดหมู่</label>
                        <select
                          value={selectedPage.category}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              pages: prev.pages.map((p) =>
                                p.id === selectedPage.id ? { ...p, category: val } : p
                              ),
                            }));
                          }}
                          className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
                        >
                          <option value="บทเรียน ม.1">บทเรียน ม.1</option>
                          <option value="บทเรียน ม.2">บทเรียน ม.2</option>
                          <option value="บทเรียน ม.3">บทเรียน ม.3</option>
                          <option value="สื่อและนวัตกรรม">สื่อและนวัตกรรม</option>
                          <option value="ผลงานและรางวัล">ผลงานและรางวัล</option>
                          <option value="ทั่วไป">ทั่วไป</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">ระดับชั้น</label>
                        <select
                          value={selectedPage.targetGrade || 'ทุกระดับชั้น'}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setFormData((prev) => ({
                              ...prev,
                              pages: prev.pages.map((p) =>
                                p.id === selectedPage.id ? { ...p, targetGrade: val } : p
                              ),
                            }));
                          }}
                          className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 bg-white"
                        >
                          <option value="ม.1">ม.1</option>
                          <option value="ม.2">ม.2</option>
                          <option value="ม.3">ม.3</option>
                          <option value="ทุกระดับชั้น">ทุกระดับชั้น</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        คำอธิบายย่อ
                      </label>
                      <input
                        type="text"
                        value={selectedPage.shortDescription}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            pages: prev.pages.map((p) =>
                              p.id === selectedPage.id ? { ...p, shortDescription: val } : p
                            ),
                          }));
                        }}
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Block List Editor */}
              {selectedPage && (
                <div className="space-y-4">
                  {selectedPage.blocks.map((block, idx) => (
                    <div
                      key={block.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
                    >
                      {/* Block Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold uppercase text-slate-500">
                            ประเภท: {block.type}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteBlock(block.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> ลบบล็อกนี้
                        </button>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            หัวข้อบล็อก
                          </label>
                          <input
                            type="text"
                            value={block.title}
                            onChange={(e) =>
                              handleUpdateBlock(block.id, (b) => ({ ...b, title: e.target.value }))
                            }
                            className="w-full text-xs p-2 rounded-xl border border-slate-300"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            หัวข้อย่อย
                          </label>
                          <input
                            type="text"
                            value={block.subtitle || ''}
                            onChange={(e) =>
                              handleUpdateBlock(block.id, (b) => ({ ...b, subtitle: e.target.value }))
                            }
                            className="w-full text-xs p-2 rounded-xl border border-slate-300"
                          />
                        </div>
                      </div>

                      {/* Specific Block Customizers */}

                      {/* Rich Text Block Content */}
                      {block.type === 'rich_text' && (
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            เนื้อหาข้อความ
                          </label>
                          <textarea
                            rows={4}
                            value={block.content || ''}
                            onChange={(e) =>
                              handleUpdateBlock(block.id, (b) => ({ ...b, content: e.target.value }))
                            }
                            className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                          />
                        </div>
                      )}

                      {/* YouTube Video Block */}
                      {block.type === 'youtube_video' && (
                        <div className="space-y-3 bg-red-50/50 p-4 rounded-xl border border-red-200">
                          <div>
                            <label className="text-xs font-bold text-red-900 block mb-1">
                              YouTube Video ID หรือ YouTube URL
                            </label>
                            <input
                              type="text"
                              value={block.youtubeId || ''}
                              onChange={(e) =>
                                handleUpdateBlock(block.id, (b) => ({
                                  ...b,
                                  youtubeId: extractYoutubeId(e.target.value),
                                }))
                              }
                              placeholder="เช่น https://youtu.be/p3E0v7x6E5c หรือ p3E0v7x6E5c"
                              className="w-full text-xs p-2.5 rounded-xl border border-red-300 bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold text-red-900 block mb-1">
                              คำอธิบายวิดีโอ
                            </label>
                            <input
                              type="text"
                              value={block.content || ''}
                              onChange={(e) =>
                                handleUpdateBlock(block.id, (b) => ({ ...b, content: e.target.value }))
                              }
                              className="w-full text-xs p-2 rounded-xl border border-red-300 bg-white"
                            />
                          </div>
                        </div>
                      )}

                      {/* Presentation Slide Deck Editor */}
                      {block.type === 'presentation_slide' && (
                        <div className="space-y-4 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-900">
                              สไลด์ย่อยทั้งหมด ({block.slides?.length || 0} สไลด์)
                            </span>
                            <button
                              onClick={() => {
                                const newSlide: SlideItem = {
                                  id: `s-${Date.now()}`,
                                  title: `สไลด์ใหม่ที่ ${(block.slides?.length || 0) + 1}`,
                                  content: 'พิมพ์เนื้อหาของสไลด์ในส่วนนี้...',
                                  bulletPoints: ['หัวข้อย่อย 1'],
                                };
                                handleUpdateBlock(block.id, (b) => ({
                                  ...b,
                                  slides: [...(b.slides || []), newSlide],
                                }));
                              }}
                              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
                            >
                              + เพิ่มสไลด์ย่อย
                            </button>
                          </div>

                          <div className="space-y-3">
                            {block.slides?.map((slide, sIdx) => (
                              <div
                                key={slide.id}
                                className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-2 text-xs"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-amber-800">สไลด์ที่ {sIdx + 1}</span>
                                  <button
                                    onClick={() => {
                                      handleUpdateBlock(block.id, (b) => ({
                                        ...b,
                                        slides: b.slides?.filter((s) => s.id !== slide.id),
                                      }));
                                    }}
                                    className="text-red-500 hover:underline"
                                  >
                                    ลบสไลด์
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  value={slide.title}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    handleUpdateBlock(block.id, (b) => ({
                                      ...b,
                                      slides: b.slides?.map((s) =>
                                        s.id === slide.id ? { ...s, title: val } : s
                                      ),
                                    }));
                                  }}
                                  placeholder="หัวข้อสไลด์"
                                  className="w-full p-2 border rounded-lg font-bold"
                                />
                                <textarea
                                  rows={2}
                                  value={slide.content}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    handleUpdateBlock(block.id, (b) => ({
                                      ...b,
                                      slides: b.slides?.map((s) =>
                                        s.id === slide.id ? { ...s, content: val } : s
                                      ),
                                    }));
                                  }}
                                  placeholder="เนื้อหาบรรยายของสไลด์"
                                  className="w-full p-2 border rounded-lg"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interactive Quiz Editor */}
                      {block.type === 'interactive_quiz' && (
                        <div className="space-y-4 bg-purple-50/50 p-4 rounded-xl border border-purple-200">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-900">
                              ข้อสอบแบบทดสอบ ({block.quizQuestions?.length || 0} ข้อ)
                            </span>
                            <button
                              onClick={() => {
                                const newQ: QuizQuestion = {
                                  id: `q-${Date.now()}`,
                                  question: `คำถามข้อที่ ${(block.quizQuestions?.length || 0) + 1}...`,
                                  options: ['ตัวเลือก ก', 'ตัวเลือก ข', 'ตัวเลือก ค', 'ตัวเลือก ง'],
                                  correctIndex: 0,
                                  explanation: 'คำอธิบายเฉลย',
                                };
                                handleUpdateBlock(block.id, (b) => ({
                                  ...b,
                                  quizQuestions: [...(b.quizQuestions || []), newQ],
                                }));
                              }}
                              className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs cursor-pointer"
                            >
                              + เพิ่มข้อสอบ
                            </button>
                          </div>

                          <div className="space-y-3">
                            {block.quizQuestions?.map((q, qIdx) => (
                              <div
                                key={q.id}
                                className="bg-white p-3.5 rounded-xl border border-purple-200 space-y-2 text-xs"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-purple-800">ข้อที่ {qIdx + 1}</span>
                                  <button
                                    onClick={() => {
                                      handleUpdateBlock(block.id, (b) => ({
                                        ...b,
                                        quizQuestions: b.quizQuestions?.filter((item) => item.id !== q.id),
                                      }));
                                    }}
                                    className="text-red-500 hover:underline"
                                  >
                                    ลบข้อสอบ
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  value={q.question}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    handleUpdateBlock(block.id, (b) => ({
                                      ...b,
                                      quizQuestions: b.quizQuestions?.map((item) =>
                                        item.id === q.id ? { ...item, question: val } : item
                                      ),
                                    }));
                                  }}
                                  placeholder="โจทย์คำถาม"
                                  className="w-full p-2 border rounded-lg font-semibold"
                                />

                                <div className="grid grid-cols-2 gap-2 pt-1">
                                  {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex items-center gap-1.5">
                                      <input
                                        type="radio"
                                        name={`correct-${q.id}`}
                                        checked={q.correctIndex === oIdx}
                                        onChange={() => {
                                          handleUpdateBlock(block.id, (b) => ({
                                            ...b,
                                            quizQuestions: b.quizQuestions?.map((item) =>
                                              item.id === q.id ? { ...item, correctIndex: oIdx } : item
                                            ),
                                          }));
                                        }}
                                      />
                                      <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          handleUpdateBlock(block.id, (b) => ({
                                            ...b,
                                            quizQuestions: b.quizQuestions?.map((item) =>
                                              item.id === q.id
                                                ? {
                                                    ...item,
                                                    options: item.options.map((o, idx2) =>
                                                      idx2 === oIdx ? val : o
                                                    ),
                                                  }
                                                : item
                                            ),
                                          }));
                                        }}
                                        className="w-full p-1.5 border rounded text-xs"
                                      />
                                    </div>
                                  ))}
                                </div>

                                <input
                                  type="text"
                                  value={q.explanation}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    handleUpdateBlock(block.id, (b) => ({
                                      ...b,
                                      quizQuestions: b.quizQuestions?.map((item) =>
                                        item.id === q.id ? { ...item, explanation: val } : item
                                      ),
                                    }));
                                  }}
                                  placeholder="คำอธิบายเฉลย"
                                  className="w-full p-1.5 border rounded text-xs bg-purple-50/50"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: GOOGLE APPS SCRIPT SYNC ================= */}
          {activeTab === 'gas' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Instructions banner */}
              <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-6 rounded-3xl shadow-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-base sm:text-lg font-bold">
                    การเชื่อมต่อ Google Apps Script (สำเนาไปใช้กับบัญชี Google ของครู)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
                  คุณครูสามารถนำโค้ด Google Apps Script ไปวางในบัญชี Google Workspace หรือ Gmail ส่วนตัวเพื่อใช้ Google Sheets เป็นฐานข้อมูล จัดเก็บและอัปเดตบทเรียนได้ตลอดเวลา
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={handleCopyGasCode}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950" />
                        <span>คัดลอกโค้ด Apps Script แล้ว!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>คัดลอกโค้ด Google Apps Script (1-Click)</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://script.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs border border-white/20 transition-all"
                  >
                    <span>เปิด script.google.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Step-by-Step Tutorial Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  📋 ขั้นตอนการนำไปติดตั้งใช้งาน (ใช้เวลาเพียง 3 นาที):
                </h4>
                <ol className="text-xs text-slate-600 space-y-2 list-decimal pl-5 leading-relaxed">
                  <li>กดปุ่ม <strong>"คัดลอกโค้ด Google Apps Script"</strong> ด้านบน</li>
                  <li>เปิดเว็บไซต์ <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">script.google.com</a> หรือเปิด Google Sheet แล้วไปที่เมนู <strong>ส่วนขยาย (Extensions) &rarr; Apps Script</strong></li>
                  <li>ลบโค้ดเดิมออกทั้งหมด แล้ววางโค้ดที่คัดลอกมาลงไป จากนั้นกดปุ่ม <strong>บันทึก (แผ่นดิสก์)</strong></li>
                  <li>คลิกปุ่มสีน้ำเงิน <strong>"การทำให้ใช้งานได้ (Deploy)"</strong> มุมขวาบน &rarr; เลือก <strong>"การทำให้ใช้งานได้รายการใหม่ (New deployment)"</strong></li>
                  <li>เลือกประเภท: <strong>เว็บแอป (Web App)</strong> &rarr; กำหนดผู้มีสิทธิ์เข้าถึง: <strong>"ทุกคน (Anyone)"</strong> &rarr; คลิก <strong>ทำให้ใช้งานได้ (Deploy)</strong></li>
                  <li>คัดลอก <strong>URL ของเว็บแอป (Web App URL)</strong> มาวางในช่องด้านล่างนี้ แล้วกดปุ่ม <strong>"ทดสอบการเชื่อมต่อ"</strong></li>
                </ol>
              </div>

              {/* Web App URL Form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-900">
                  การตั้งค่า Web App URL
                </h4>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Google Apps Script Web App URL
                  </label>
                  <input
                    type="url"
                    value={formData.gasConfig.webAppUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gasConfig: { ...prev.gasConfig, webAppUrl: e.target.value },
                      }))
                    }
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    disabled={isTesting || !formData.gasConfig.webAppUrl}
                    onClick={handleTestGas}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 text-blue-700 font-bold rounded-xl text-xs border border-blue-200 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'กำลังทดสอบ...' : 'ทดสอบการเชื่อมต่อ'}</span>
                  </button>

                  <button
                    disabled={isSyncing || !formData.gasConfig.webAppUrl}
                    onClick={handlePushGas}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                  >
                    <FolderSync className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'กำลังซิงค์...' : 'ซิงค์ข้อมูลขึ้น Google Cloud'}</span>
                  </button>

                  <button
                    disabled={isSyncing || !formData.gasConfig.webAppUrl}
                    onClick={handlePullGas}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    <span>ดึงข้อมูลล่าสุดจาก Google Sheet</span>
                  </button>
                </div>

                {testResult && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                      testResult.success
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-red-50 text-red-800 border border-red-300'
                    }`}
                  >
                    {testResult.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{testResult.message}</span>
                  </div>
                )}
              </div>

              {/* JSON Backup & Restore */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  การสำรองข้อมูล (JSON Backup & Restore)
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => exportToJson(formData)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ดาวน์โหลดไฟล์สำรอง (Export JSON)</span>
                  </button>

                  <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border border-slate-300">
                    <FileUp className="w-3.5 h-3.5" />
                    <span>นำเข้าไฟล์สำรอง (Import JSON)</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 5: MEDIA PRESETS ================= */}
          {activeTab === 'media' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  คลังรูปภาพสำเร็จรูป (Preset Gallery)
                </h3>
                <p className="text-xs text-slate-500">
                  คลิกที่รูปภาพเพื่อเลือกใช้เป็นรูปโปรไฟล์ หรือภาพหน้าปก
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {PRESET_IMAGES.map((img) => (
                    <div
                      key={img.id}
                      className="group border border-slate-200 rounded-2xl p-2.5 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all flex flex-col justify-between"
                    >
                      <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-200 mb-2">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-xs font-bold text-slate-800 truncate mb-2">
                        {img.name}
                      </p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            handleProfileChange('profileImage', img.url);
                            alert(`เลือกรูป "${img.name}" เป็นรูปโปรไฟล์แล้ว`);
                          }}
                          className="flex-1 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                        >
                          ใช้เป็นโปรไฟล์
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
