import { PortalData } from '../types/portal';

export const INITIAL_PORTAL_DATA: PortalData = {
  version: '1.0.0',
  profile: {
    teacherName: 'นายสุบิน คำมุลนา',
    position: 'ครู',
    academicStanding: 'วิทยฐานะ ครูชำนาญการพิเศษ',
    schoolName: 'โรงเรียนเทศบาล ๓ บ้านเหล่า',
    department: 'สำนักการศึกษา เทศบาลนครอุดรธานี',
    teachingLevels: 'ปฏิบัติการสอน ระดับชั้นมัธยมศึกษาปีที่ 1 - 3',
    learningArea: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี',
    motto: 'ครูยุคใหม่ หัวใจนวัตกรรม มุ่งมั่นพัฒนาผู้เรียนสู่ศตวรรษที่ 21',
    bio: 'มุ่งเน้นการจัดการเรียนรู้เชิงรุก (Active Learning) ผสานเทคโนโลยีดิจิทัล วิทยาการคำนวณ และสะเต็มศึกษา (STEM) เพื่อบ่มเพาะทักษะการคิดวิเคราะห์ การแก้ปัญหา และความคิดสร้างสรรค์แก่นักเรียนระดับมัธยมศึกษาตอนต้น',
    email: 'thetsabanbanlao@gmail.com',
    phone: '042-221-508',
    facebookUrl: 'https://facebook.com',
    lineId: '@krusubin',
    youtubeChannel: 'https://youtube.com',
    websiteUrl: 'https://banlao3.ac.th',
    address: 'โรงเรียนเทศบาล ๓ บ้านเหล่า สำนักการศึกษา เทศบาลนครอุดรธานี จังหวัดอุดรธานี',
    profileImage: 'Gemini-subinho.jpg',
    fullBodyImage: 'Gemini-subinho.jpg',
    schoolLogo: '2222.png',
    heroBgImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80',
    theme: 'blue-gold',
    stats: {
      coursesCount: 18,
      studentsCount: 450,
      videoCount: 32,
      downloadsCount: 65,
    },
  },
  gasConfig: {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbxvm1xAKU6i7pSr92WPjebM-BDfyY0hjreQT0nQs8Tp_gLbnbCVxX-_6uXbiBbPcAin/exec',
    sheetId: '',
    autoSync: false,
    lastSyncedAt: null,
    syncStatus: 'idle',
  },
  pages: [
    {
      id: 'page-m1-computing',
      slug: 'computing-m1',
      title: 'วิทยาการคำนวณ ม.1: การคิดเชิงคำนวณและการเขียนโปรแกรม',
      icon: 'Binary',
      category: 'บทเรียน ม.1',
      shortDescription: 'เรียนรู้แนวคิดเชิงคำนวณ (Computational Thinking) 4 เสาหลัก และการเริ่มต้นแก้ปัญหาด้วยโปรแกรม Scratch & Python',
      coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80',
      featured: true,
      order: 1,
      published: true,
      targetGrade: 'ม.1',
      views: 1240,
      updatedAt: '2026-09-28',
      blocks: [
        {
          id: 'b1-overview',
          type: 'rich_text',
          title: '🎯 คำอธิบายรายวิชาและจุดประสงค์การเรียนรู้',
          subtitle: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี ระดับชั้น ม.1',
          content: `ยินดีต้อนรับนักเรียนชั้นมัธยมศึกษาปีที่ 1 สู่หน่วยการเรียนรู้ **"การคิดเชิงคำนวณ (Computational Thinking)"** ซึ่งเป็นทักษะพื้นฐานสำคัญในการแก้ปัญหาอย่างเป็นระบบในศตวรรษที่ 21

### สิ่งที่นักเรียนจะได้เรียนรู้:
1. **การแบ่งย่อยปัญหา (Decomposition)** - การแตกปัญหาใหญ่ให้เป็นปัญหาย่อยที่จัดการได้ง่าย
2. **การหารูปแบบ (Pattern Recognition)** - การมองหาความคล้ายคลึงและแบบแผนที่เคยเกิดขึ้น
3. **การคิดเชิงนามธรรม (Abstraction)** - การคัดเลือกเฉพาะสาระสำคัญและตัดรายละเอียดที่ไม่จำเป็นออก
4. **การออกแบบอัลกอริทึม (Algorithm Design)** - การกำหนดลำดับขั้นตอนการทำงานอย่างชัดเจนเป็นขั้นเป็นตอน`,
          badge: 'หน่วยที่ 1',
          accentColor: '#3b82f6',
        },
        {
          id: 'b2-presentation',
          type: 'presentation_slide',
          title: '📊 สไลด์ประกอบการสอน: Computational Thinking in Action',
          subtitle: 'คลิกเพื่อดูสไลด์การสอน หรือเปิดโหมดฉายโปรเจกเตอร์เต็มจอ',
          slides: [
            {
              id: 's1',
              title: '1. Decomposition (การแยกส่วนประกอบ)',
              subtitle: 'แตกเรื่องซับซ้อนให้เล็กลง',
              content: 'เหมือนกับการถอดชิ้นส่วนจักรยาน เพื่อซ่อมแซมเฉพาะส่วนที่มีปัญหาโดยไม่ต้องรื้อทั้งคัน ในการเขียนโปรแกรมเราจะแบ่งงานออกเป็นฟังก์ชันย่อยๆ',
              bulletPoints: [
                'ช่วยให้งานที่ดูยากกลายเป็นงานง่าย',
                'สามารถแบ่งงานให้สมาชิกในทีมทำพร้อมกันได้',
                'ตรวจสอบจุดผิดพลาด (Bug) ได้รวดเร็ว',
              ],
              keyTakeaway: '💡 เคล็ดลับ: มองหาชิ้นส่วนย่อยที่ทำงานอย่างเป็นอิสระต่อกัน',
            },
            {
              id: 's2',
              title: '2. Pattern Recognition (การหารูปแบบ)',
              subtitle: 'สังเกตรูปแบบและแนวโน้มที่ซ้ำกัน',
              content: 'เมื่อเราเจอปัญหาเดิมซ้ำๆ เราสามารถนำวิธีแก้ที่เคยใช้สำเร็จมาประยุกต์ใช้ได้ทันที เช่น การจัดหมวดหมู่ไฟล์ หรือการเขียนลูปคำสั่งซ้ำ',
              bulletPoints: [
                'ลดเวลาในการแก้ปัญหาที่เคยเกิดขึ้นมาแล้ว',
                'ช่วยคาดการณ์แนวโน้มข้อมูลล่วงหน้า',
                'เป็นรากฐานของ Machine Learning ในปัจจุบัน',
              ],
              keyTakeaway: '💡 เคล็ดลับ: เปรียบเทียบความเหมือนและความต่างของข้อมูล',
            },
            {
              id: 's3',
              title: '3. Abstraction (การคิดเชิงนามธรรม)',
              subtitle: 'โฟกัสจุดสำคัญ ละทิ้งสิ่งไม่จำเป็น',
              content: 'เปรียบเสมือนแผนที่รถไฟฟ้าที่ไม่ต้องแสดงต้นไม้ทุกต้นบนถนน แต่แสดงเฉพาะสถานีและเส้นทางเชื่อมต่อ เพื่อให้ผู้โดยสารเข้าใจง่ายที่สุด',
              bulletPoints: [
                'สร้างโมเดลความเข้าใจที่กระชับและชัดเจน',
                'ช่วยไม่ให้สมองรับภาระข้อมูลที่เกินจำเป็น',
                'เป็นหลักการออกแบบ User Interface ที่ดี',
              ],
              keyTakeaway: '💡 เคล็ดลับ: ถามตนเองว่า "ถ้าตัดสิ่งนี้ออก เป้าหมายยังสำเร็จหรือไม่?"',
            },
            {
              id: 's4',
              title: '4. Algorithm Design (การออกแบบอัลกอริทึม)',
              subtitle: 'ลำดับขั้นตอนสู่ความสำเร็จ',
              content: 'การเขียนสูตรทำอาหารหรือคู่มือประกอบของเล่นที่มีลำดับ 1, 2, 3 ชัดเจน ไม่คลุมเครือ จนคอมพิวเตอร์หรือผู้อื่นสามารถปฏิบัติตามได้ถูกต้อง',
              bulletPoints: [
                'มีจุดเริ่มต้นและจุดสิ้นสุดที่ชัดเจน',
                'ผลลัพธ์มีความแม่นยำและทำซ้ำได้',
                'ใช้ได้กับการเขียน Flowchart และโค้ดจริง',
              ],
              keyTakeaway: '💡 เคล็ดลับ: ตรวจสอบว่าขั้นตอนมีความต่อเนื่องและไม่มีเงื่อนไขที่ตกหล่น',
            },
          ],
        },
        {
          id: 'b3-video',
          type: 'youtube_video',
          title: '🎬 วิดีโอสรุปบทเรียน: วิทยาการคำนวณ ม.1',
          subtitle: 'บรรยายและสรุปสาระสำคัญโดย ครูสุบิน คำมุลนา',
          content: 'คลิปนี้จะพานักเรียนทำความเข้าใจทั้ง 4 เสาหลักผ่านสถานการณ์จำลองในชีวิตประจำวัน พร้อมตัวอย่างการเขียนบล็อกคำสั่ง Scratch',
          youtubeId: 'p3E0v7x6E5c',
          youtubeTime: '15:20 นาที',
        },
        {
          id: 'b4-downloads',
          type: 'download_resource',
          title: '📂 คลังเอกสารและใบงานประกอบการเรียน',
          subtitle: 'ดาวน์โหลดใบกิจกรรมเพื่อทำในห้องเรียนหรือทบทวนที่บ้าน',
          downloads: [
            {
              id: 'd1',
              title: 'ใบกิจกรรมที่ 1.1: แยกส่วนประกอบพิชิตปัญหา',
              fileType: 'PDF',
              fileSize: '1.4 MB',
              url: '#download',
              description: 'กิจกรรมกลุ่มฝึกทักษะ Decomposition ผ่านการวิเคราะห์ระบบสมาร์ตฟาร์ม',
            },
            {
              id: 'd2',
              title: 'สไลด์ประกอบการสอน (ฉบับสมบูรณ์) - บทที่ 1',
              fileType: 'PPTX',
              fileSize: '8.7 MB',
              url: '#download',
              description: 'เอกสารสไลด์ภาพความละเอียดสูงสำหรับทบทวนสอบกลางภาค',
            },
            {
              id: 'd3',
              title: 'ใบงานการออกแบบผังงาน Flowchart ม.1',
              fileType: 'DOCX',
              fileSize: '750 KB',
              url: '#download',
              description: 'แบบฝึกหัดเขียนผังงานสัญลักษณ์มาตรฐาน มอก.',
            },
          ],
        },
        {
          id: 'b5-quiz',
          type: 'interactive_quiz',
          title: '📝 แบบทดสอบวัดความรู้ท้ายบท (Interactive Quiz)',
          subtitle: 'ทำแบบทดสอบ 4 ข้อ พร้อมตรวจคำตอบและรับคำอธิบายทันที',
          quizQuestions: [
            {
              id: 'q1',
              question: 'การที่นักเรียนศึกษาแผนที่เส้นทางรถเมล์ที่มีเฉพาะชื่อป้ายและสายรถโดยไม่แสดงตึกข้างทาง จัดเป็นทักษะข้อใด?',
              options: [
                'Decomposition (การแยกส่วนประกอบ)',
                'Pattern Recognition (การหารูปแบบ)',
                'Abstraction (การคิดเชิงนามธรรม)',
                'Algorithm Design (การออกแบบอัลกอริทึม)',
              ],
              correctIndex: 2,
              explanation: 'Abstraction คือการเลือกเฉพาะข้อมูลที่จำเป็นต่อการใช้งาน และตัดรายละเอียดอื่นๆ ที่ไม่เกี่ยวข้องออกไป',
            },
            {
              id: 'q2',
              question: 'การเขียนลำดับขั้นตอนการทอดไข่เจียวตั้งแต่ตอกไข่จนถึงตักใส่จาน ตรงกับหลักการใด?',
              options: [
                'Algorithm Design (การออกแบบขั้นตอน)',
                'Decomposition (การแยกส่วน)',
                'Data Mining (การทำเหมืองข้อมูล)',
                'Virtualization (การจำลองเสมือน)',
              ],
              correctIndex: 0,
              explanation: 'Algorithm Design คือการสร้างชุดคำสั่งที่มีลำดับขั้นตอน 1, 2, 3 ชัดเจน เพื่อให้บรรลุเป้าหมาย',
            },
            {
              id: 'q3',
              question: 'ข้อใดไม่ใช่ประโยชน์ของการแบ่งย่อยปัญหา (Decomposition)?',
              options: [
                'ทำให้งานที่ซับซ้อนเข้าใจง่ายขึ้น',
                'ช่วยให้สามารถแบ่งงานให้คนในกลุ่มทำได้',
                'ช่วยเพิ่มความซับซ้อนให้คู่แข่งลอกเลียนแบบยากขึ้น',
                'ช่วยค้นหาข้อผิดพลาดเฉพาะจุดได้เร็วขึ้น',
              ],
              correctIndex: 2,
              explanation: 'เป้าหมายของ Decomposition คือการลดความซับซ้อน เพื่อให้ทำงานและแก้ไขปัญหาได้ง่ายขึ้น ไม่ใช่การเพิ่มความซับซ้อน',
            },
          ],
        },
      ],
    },
    {
      id: 'page-m2-design-tech',
      slug: 'design-tech-m2',
      title: 'การออกแบบและเทคโนโลยี ม.2: กระบวนการออกแบบเชิงวิศวกรรม',
      icon: 'Cpu',
      category: 'บทเรียน ม.2',
      shortDescription: 'เจาะลึก 6 ขั้นตอนของกระบวนการออกแบบเชิงวิศวกรรม (EDP), กลไก เฟือง คาน รอก และระบบไฟฟ้าอิเล็กทรอนิกส์เบื้องต้น',
      coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      featured: true,
      order: 2,
      published: true,
      targetGrade: 'ม.2',
      views: 980,
      updatedAt: '2026-09-25',
      blocks: [
        {
          id: 'b2-rich',
          type: 'rich_text',
          title: '⚙️ วิศวกรรมสร้างสรรค์เพื่อชุมชนท้องถิ่นอุดรธานี',
          subtitle: 'แก้ปัญหาในชีวิตจริงด้วยกระบวนการทางวิทยาศาสตร์และเทคโนโลยี',
          content: `ในระดับชั้นมัธยมศึกษาปีที่ 2 เราจะเน้นให้นักเรียนได้ลงมือปฏิบัติจริง (Hands-on Learning) โดยนำกระบวนการออกแบบเชิงวิศวกรรม 6 ขั้นตอนมาประยุกต์ใช้ในการสร้างสิ่งประดิษฐ์และนวัตกรรมเพื่อพัฒนาชุมชนเทศบาลนครอุดรธานี

#### 6 ขั้นตอนสำคัญของ Engineering Design Process (EDP):
1. **ระบุปัญหา (Problem Identification)**
2. **รวบรวมข้อมูลและแนวคิดที่เกี่ยวข้อง (Information Search)**
3. **ออกแบบวิธีการแก้ปัญหา (Design Solution)**
4. **วางแผนและดำเนินการแก้ปัญหา (Planning & Development)**
5. **ทดสอบ ประเมินผล และปรับปรุงแก้ไข (Testing & Evaluation)**
6. **นำเสนอวิธีการแก้ปัญหาและผลลัพธ์ (Presentation)**`,
          badge: 'บทเรียน ม.2',
          accentColor: '#10b981',
        },
        {
          id: 'b2-video',
          type: 'youtube_video',
          title: '🎬 วิดีโอสาธิต: กลไกและอุปกรณ์อิเล็กทรอนิกส์ในชีวิตประจำวัน',
          subtitle: 'สาธิตวงจรสวิตช์อัตโนมัติและเซนเซอร์ตรวจจับแสง LDR',
          content: 'ครูสุบิน คำมุลนา บรรยายหลักการทำงานของตัวต้านทานปรับค่าตามแสง (LDR) และการต่อวงจรรีเลย์ควบคุมไฟส่องสว่างพลังงานแสงอาทิตย์',
          youtubeId: '3m2dO3y3p8k',
          youtubeTime: '18:45 นาที',
        },
        {
          id: 'b2-downloads',
          type: 'download_resource',
          title: '📥 ใบงานและแบบฟอร์มรายงานโครงงาน ม.2',
          subtitle: 'เอกสารประกอบการทำโครงงานนวัตกรรมสิ่งประดิษฐ์',
          downloads: [
            {
              id: 'dm2-1',
              title: 'แบบฟอร์มข้อเสนอโครงงานการออกแบบเชิงวิศวกรรม',
              fileType: 'DOCX',
              fileSize: '920 KB',
              url: '#download',
            },
            {
              id: 'dm2-2',
              title: 'คู่มือการใช้งานเซนเซอร์และบอร์ดไมโครคอนโทรลเลอร์ Micro:bit',
              fileType: 'PDF',
              fileSize: '4.3 MB',
              url: '#download',
            },
          ],
        },
      ],
    },
    {
      id: 'page-m3-stem-ai',
      slug: 'stem-ai-m3',
      title: 'วิทยาศาสตร์และเทคโนโลยี ม.3: ปัญญาประดิษฐ์ (AI) & สะเต็มศึกษา (STEM)',
      icon: 'BrainCircuit',
      category: 'บทเรียน ม.3',
      shortDescription: 'ก้าวทันโลกยุค AI และ IoT เรียนรู้การเขียนโค้ดเชื่อมต่อระบบอัตโนมัติ และการสร้างผลงานนวัตกรรมสะเต็มศึกษาเพื่อสิ่งแวดล้อม',
      coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
      featured: true,
      order: 3,
      published: true,
      targetGrade: 'ม.3',
      views: 1540,
      updatedAt: '2026-09-30',
      blocks: [
        {
          id: 'b3-rich',
          type: 'rich_text',
          title: '🤖 เตรียมพร้อมสู่ยุคดิจิทัลและ AI อย่างรู้เท่าทัน',
          subtitle: 'พัฒนาทักษะระดับสูงเพื่อการศึกษาต่อและอาชีพแห่งอนาคต',
          content: `หลักสูตร ม.3 โดย **ครูสุบิน คำมุลนา** ได้นำเครื่องมือ AI สำหรับการศึกษา, Prompt Engineering และการประยุกต์ใช้ IoT (Internet of Things) ในการวัดค่าคุณภาพอากาศ PM2.5 และระบบรดน้ำต้นไม้อัจฉริยะในโรงเรียนเทศบาล ๓ บ้านเหล่า

นักเรียนจะได้ลงมือพัฒนาผลงานตั้งแต่การฝึกโมเดลจำแนกภาพ (Image Classification ด้วย Teachable Machine) จนถึงการส่งข้อมูลขึ้น Dashboard`,
          badge: 'บทเรียน ม.3',
          accentColor: '#8b5cf6',
        },
        {
          id: 'b3-presentation',
          type: 'presentation_slide',
          title: '💡 สไลด์บรรยาย: ปัญญาประดิษฐ์กับการเปลี่ยนแปลงโลก',
          subtitle: 'AI Literacy & Ethics สำหรับเยาวชนยุคใหม่',
          slides: [
            {
              id: 's3-1',
              title: '1. AI คืออะไร?',
              subtitle: 'Artificial Intelligence ความฉลาดที่มนุษย์สร้างขึ้น',
              content: 'ระบบคอมพิวเตอร์ที่สามารถเรียนรู้ วิเคราะห์ และตัดสินใจเลียนแบบกระบวนการคิดของมนุษย์ เช่น การจดจำใบหน้า การแปลภาษา และการขับเคลื่อนรถยนต์อัตโนมัติ',
              bulletPoints: [
                'Narrow AI (เก่งเฉพาะทาง) vs General AI (ความฉลาดรอบด้าน)',
                'Machine Learning: การเรียนรู้จากชุดข้อมูลขนาดใหญ่',
                'Deep Learning: โครงข่ายประสาทเทียมหลายชั้น',
              ],
            },
            {
              id: 's3-2',
              title: '2. จริยธรรมในการใช้ AI (AI Ethics)',
              subtitle: 'ใช้อย่างสร้างสรรค์ รับผิดชอบ และตรวจสอบได้',
              content: 'การใช้งานปัญญาประดิษฐ์ต้องคำนึงถึงลิขสิทธิ์ ความถูกต้องของข้อมูล (Fact-Checking) และไม่ใช้ในการสร้างความเสียหายแก่ผู้อื่น',
              bulletPoints: [
                'ตรวจสอบแหล่งที่มาของข้อมูลเสมอ',
                'ไม่ละเมิดความเป็นส่วนตัว (Privacy)',
                'ใช้เป็นผู้ช่วยเพิ่มประสิทธิภาพ ไม่ใช่การคัดลอกผลงาน',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'page-innovation-portfolio',
      slug: 'teacher-portfolio',
      title: 'ผลงานและนวัตกรรมการสอน: ครูยุคใหม่ หัวใจนวัตกรรม',
      icon: 'Award',
      category: 'ผลงานและรางวัล',
      shortDescription: 'รวบรวมผลงานทางวิชาการ สื่อนวัตกรรมการสอน รางวัลเกียรติยศ และกิจกรรมส่งเสริมความเป็นเลิศของผู้เรียน โรงเรียนเทศบาล ๓ บ้านเหล่า',
      coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
      featured: true,
      order: 4,
      published: true,
      targetGrade: 'ทุกระดับชั้น',
      views: 2100,
      updatedAt: '2026-09-29',
      blocks: [
        {
          id: 'bp-1',
          type: 'rich_text',
          title: '🏆 รางวัลและเกียรติบัตรดีเด่น',
          subtitle: 'นายสุบิน คำมุลนา | ครูชำนาญการพิเศษ โรงเรียนเทศบาล ๓ บ้านเหล่า',
          content: `### ประวัติและผลงานทางวิชาการ:
- **ตำแหน่ง:** ครู วิทยฐานะ ครูชำนาญการพิเศษ
- **สังกัด:** โรงเรียนเทศบาล ๓ บ้านเหล่า สำนักการศึกษา เทศบาลนครอุดรธานี
- **รางวัลครูผู้สอนดีเด่น:** ด้านการส่งเสริมการจัดการเรียนรู้วิทยาศาสตร์และเทคโนโลยี กรมส่งเสริมการปกครองท้องถิ่น
- **ครูผู้ฝึกสอนนักเรียน:** รางวัลชนะเลิศการแข่งขันโครงงานวิทยาการคำนวณและหุ่นยนต์ระดับภาคตะวันออกเฉียงเหนือ
- **นวัตกรรมการสอน:** แพลตฟอร์มการจัดการเรียนรู้ดิจิทัลผสาน Google Workspace & Apps Script เพื่อห้องเรียนไร้กระดาษ`,
          badge: 'เกียรติยศ',
          accentColor: '#f59e0b',
        },
        {
          id: 'bp-gallery',
          type: 'image_gallery',
          title: '📸 ภาพกิจกรรมการเรียนรู้และการฝึกอบรม',
          subtitle: 'บรรยากาศการจัดกิจกรรม Active Learning ของนักเรียน ม.1 - ม.3',
          gallery: [
            {
              id: 'g1',
              title: 'กิจกรรมส่งเสริมสะเต็มศึกษา STEM Workshop',
              url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
              caption: 'นักเรียนร่วมกันสร้างหุ่นยนต์ตรวจจับสิ่งกีดขวาง',
            },
            {
              id: 'g2',
              title: 'การอบรมเชิงปฏิบัติการโค้ดดิ้ง Coding Camp',
              url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
              caption: 'ฝึกทักษะการแก้ปัญหาด้วยโปรแกรม Python',
            },
            {
              id: 'g3',
              title: 'นิทรรศการแสดงผลงานสิ่งประดิษฐ์นักเรียน',
              url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
              caption: 'นำเสนอโครงงานนวัตกรรมเพื่อชุมชนบ้านเหล่า',
            },
          ],
        },
      ],
    },
  ],
};
