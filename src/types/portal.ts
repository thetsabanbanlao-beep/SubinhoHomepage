export type ThemeColor = 'blue-gold' | 'cyan-tech' | 'emerald' | 'sunset' | 'indigo-violet' | 'dark-cyber';

export interface TeacherProfile {
  teacherName: string;
  position: string;
  academicStanding: string;
  schoolName: string;
  department: string;
  teachingLevels: string;
  learningArea: string;
  motto: string;
  bio: string;
  email: string;
  phone: string;
  facebookUrl: string;
  lineId: string;
  youtubeChannel: string;
  websiteUrl: string;
  address: string;
  profileImage: string;
  fullBodyImage: string;
  schoolLogo: string;
  heroBgImage: string;
  theme: ThemeColor;
  stats: {
    coursesCount: number;
    studentsCount: number;
    videoCount: number;
    downloadsCount: number;
  };
}

export type SlideType = 
  | 'rich_text'
  | 'presentation_slide'
  | 'youtube_video'
  | 'image_gallery'
  | 'download_resource'
  | 'interactive_quiz'
  | 'embed_frame'
  | 'timeline_step'
  | 'key_concept_cards';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  fileType: 'PDF' | 'DOCX' | 'PPTX' | 'ZIP' | 'LINK';
  fileSize?: string;
  url: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
  caption?: string;
}

export interface SlideItem {
  id: string;
  slideNumber?: number;
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  bulletPoints?: string[];
  keyTakeaway?: string;
}

export interface SlideBlock {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string; // Rich text / markdown / description
  youtubeId?: string; // YouTube Video ID or URL
  youtubeTime?: string;
  slides?: SlideItem[];
  quizQuestions?: QuizQuestion[];
  downloads?: DownloadItem[];
  gallery?: GalleryItem[];
  embedUrl?: string;
  embedHeight?: number;
  tags?: string[];
  badge?: string;
  accentColor?: string;
}

export interface WebPage {
  id: string;
  slug: string;
  title: string;
  icon: string;
  category: string;
  shortDescription: string;
  coverImage: string;
  featured: boolean;
  order: number;
  published: boolean;
  targetGrade?: 'ม.1' | 'ม.2' | 'ม.3' | 'ทุกระดับชั้น';
  views?: number;
  updatedAt: string;
  blocks: SlideBlock[];
}

export interface GasConfig {
  webAppUrl: string;
  sheetId: string;
  autoSync: boolean;
  lastSyncedAt: string | null;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  errorMessage?: string;
}

export interface PortalData {
  version: string;
  profile: TeacherProfile;
  pages: WebPage[];
  gasConfig: GasConfig;
}
