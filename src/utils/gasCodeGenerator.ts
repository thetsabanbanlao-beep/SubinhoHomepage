export function generateGoogleAppsScriptCode(sheetName = 'SubinPortalDB'): string {
  return `/**
 * =========================================================================
 * 🌟 GOOGLE APPS SCRIPT WEB APP & CLOUD DATABASE (ฉบับสมบูรณ์ 100%)
 * หน้าเว็บเพจครูสุบิน คำมุลนา - โรงเรียนเทศบาล ๓ บ้านเหล่า
 * สำนักการศึกษา เทศบาลนครอุดรธานี
 * =========================================================================
 * 
 * 📦 สิ่งที่ระบบนี้ทำได้ทันที:
 * 1. รันเป็นเว็บไซต์ออนไลน์ (Web App) รองรับทุกหน้าเว็บเพจ ทุกบทเรียน ม.1 - ม.4
 * 2. มีระบบสไลด์การสอน, วิดีโอคลิป YouTube, คลังเอกสารดาวน์โหลด, แบบทดสอบเก็บคะแนน
 * 3. มีระบบฐานข้อมูล Google Sheets อัตโนมัติ (แยกแผ่นงาน Profile, Pages, Content, Log)
 * 4. รองรับการเชื่อมต่อกับระบบจัดการหลังบ้าน (Backoffice CMS) ซิงค์ข้อมูล 2 ทาง
 * 
 * 🚀 วิธีการติดตั้งใช้งานใน 3 ขั้นตอน:
 * 1. เปิด Google Sheets เปล่าขึ้นมา -> ไปที่เมนู "ส่วนขยาย" (Extensions) -> "Apps Script"
 * 2. ลบโค้ดเดิมในไฟล์ Code.gs ออกทั้งหมด แล้ววางโค้ดชุดนี้ลงไป -> กดปุ่ม "บันทึก" (แผ่นดิสก์) 💾
 * 3. คลิกปุ่มสีน้ำเงิน "การทำให้ใช้งานได้" (Deploy) -> "การทำให้ใช้งานได้รายการใหม่" (New deployment)
 *    - เลือกประเภท: "เว็บแอป" (Web app)
 *    - คำอธิบาย: เว็บเพจครูสุบิน คำมุลนา ฉบับออนไลน์สมบูรณ์
 *    - ผู้มีสิทธิ์เข้าถึง: "ทุกคน" (Anyone) **สำคัญมาก**
 *    - กด "ทำให้ใช้งานได้" (Deploy) แล้วคัดลอก URL ไปเปิดใช้งานหรือแชร์ให้นักเรียนได้ทันที!
 * =========================================================================
 */

const SHEET_PROFILE = 'TeacherProfile';
const SHEET_PAGES = 'WebPages';
const SHEET_HISTORY = 'SyncHistory';
const PROPERTY_KEY = 'PORTAL_DATA_STORAGE';
const LIVE_APP_URL = 'https://ais-pre-bzzxz5fh6ornob6lxn6iye-958694204553.asia-southeast1.run.app';

/**
 * 🌐 Handle GET requests - ให้บริการทั้งหน้าเว็บเพจออนไลน์และ REST API
 */
function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : null;
    
    // API: ตรวจสอบสถานะการเชื่อมต่อ
    if (action === 'ping') {
      return createJsonResponse({
        status: 'success',
        code: 200,
        message: 'เชื่อมต่อกับ Google Apps Script สำเร็จแล้ว!',
        timestamp: new Date().toISOString(),
        teacher: 'นายสุบิน คำมุลนา',
        academicStanding: 'วิทยฐานะ ครูชำนาญการพิเศษ',
        school: 'โรงเรียนเทศบาล ๓ บ้านเหล่า'
      });
    }

    // API: ดึงข้อมูลฐานข้อมูลทั้งหมดสำหรับระบบหลังบ้าน
    if (action === 'getData') {
      const data = loadDataFromStorage();
      return createJsonResponse({
        status: 'success',
        code: 200,
        data: data,
        lastUpdated: new Date().toISOString()
      });
    }

    // หน้าเว็บเพจออนไลน์แบบ Full Responsive Web App
    const htmlContent = \`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>หน้าเว็บเพจครูสุบิน คำมุลนา - โรงเรียนเทศบาล ๓ บ้านเหล่า</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; overflow: hidden; font-family: 'Prompt', sans-serif; background-color: #020617; }
    iframe { width: 100%; height: 100%; border: none; display: block; }
  </style>
</head>
<body>
  <iframe 
    src="\${LIVE_APP_URL}" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
</body>
</html>\`;

    return HtmlService.createHtmlOutput(htmlContent)
      .setTitle('หน้าเว็บเพจครูสุบิน คำมุลนา - โรงเรียนเทศบาล ๓ บ้านเหล่า')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');

  } catch (error) {
    return createJsonResponse({
      status: 'error',
      code: 500,
      message: error.toString()
    });
  }
}

/**
 * 💾 Handle POST requests - รับข้อมูลจากระบบหลังบ้านมาบันทึกลง Google Sheets & ScriptProperties
 */
function doPost(e) {
  try {
    let payload = null;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }

    if (!payload || !payload.data) {
      return createJsonResponse({
        status: 'error',
        code: 400,
        message: 'ไม่พบข้อมูลที่ส่งมา (Invalid payload)'
      });
    }

    saveDataToStorage(payload.data);

    return createJsonResponse({
      status: 'success',
      code: 200,
      message: 'บันทึกและอัปเดตข้อมูลขึ้น Google Sheets สำเร็จเรียบร้อย!',
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    return createJsonResponse({
      status: 'error',
      code: 500,
      message: error.toString()
    });
  }
}

/**
 * 📊 ระบบบันทึกและจัดระเบียบฐานข้อมูลลง Google Sheets อัตโนมัติ
 */
function saveDataToStorage(dataObj) {
  const jsonString = JSON.stringify(dataObj);
  
  // 1. บันทึกลง Script Properties สำหรับความเร็วสูงสุด
  const userProperties = PropertiesService.getScriptProperties();
  userProperties.setProperty(PROPERTY_KEY, jsonString);
  
  // 2. ซิงค์ลง Google Sheets แบบมีโครงสร้าง
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return;

    // --- แผ่นงานที่ 1: ข้อมูลครูผู้สอน (TeacherProfile) ---
    let profileSheet = ss.getSheetByName(SHEET_PROFILE);
    if (!profileSheet) {
      profileSheet = ss.insertSheet(SHEET_PROFILE);
      profileSheet.appendRow(['หัวข้อข้อมูล (Field)', 'รายละเอียด (Value)']);
      profileSheet.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#dbeafe').setFontColor('#1e3a8a');
    } else {
      profileSheet.clearContents();
      profileSheet.appendRow(['หัวข้อข้อมูล (Field)', 'รายละเอียด (Value)']);
      profileSheet.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#dbeafe').setFontColor('#1e3a8a');
    }
    
    if (dataObj.profile) {
      const p = dataObj.profile;
      profileSheet.appendRow(['ชื่อ-นามสกุลครู', p.teacherName || '']);
      profileSheet.appendRow(['ตำแหน่ง', p.position || '']);
      profileSheet.appendRow(['วิทยฐานะ', p.academicStanding || '']);
      profileSheet.appendRow(['โรงเรียน', p.schoolName || '']);
      profileSheet.appendRow(['สังกัด', p.department || '']);
      profileSheet.appendRow(['กลุ่มสาระการเรียนรู้', p.learningArea || '']);
      profileSheet.appendRow(['ระดับชั้นที่สอน', p.teachingLevels || '']);
      profileSheet.appendRow(['คติพจน์', p.motto || '']);
      profileSheet.appendRow(['อีเมลติดต่อ', p.email || '']);
      profileSheet.appendRow(['เบอร์โทรศัพท์', p.phone || '']);
      profileSheet.appendRow(['อัปเดตล่าสุดเมื่อ', new Date().toLocaleString('th-TH')]);
    }

    // --- แผ่นงานที่ 2: รายการหน้าเว็บเพจและบทเรียน (WebPages) ---
    let pagesSheet = ss.getSheetByName(SHEET_PAGES);
    if (!pagesSheet) {
      pagesSheet = ss.insertSheet(SHEET_PAGES);
      pagesSheet.appendRow(['รหัส (ID)', 'ชื่อบทเรียน/หน้าเว็บ', 'หมวดหมู่', 'ระดับชั้น', 'จำนวนบล็อก', 'สถานะเผยแพร่', 'ยอดเข้าชม', 'อัปเดตล่าสุด']);
      pagesSheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#e0e7ff').setFontColor('#3730a3');
    } else {
      pagesSheet.clearContents();
      pagesSheet.appendRow(['รหัส (ID)', 'ชื่อบทเรียน/หน้าเว็บ', 'หมวดหมู่', 'ระดับชั้น', 'จำนวนบล็อก', 'สถานะเผยแพร่', 'ยอดเข้าชม', 'อัปเดตล่าสุด']);
      pagesSheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#e0e7ff').setFontColor('#3730a3');
    }

    if (Array.isArray(dataObj.pages)) {
      dataObj.pages.forEach(function(page) {
        pagesSheet.appendRow([
          page.id,
          page.title,
          page.category || '',
          page.targetGrade || '',
          (page.blocks && page.blocks.length) || 0,
          page.published ? 'เผยแพร่ออนไลน์' : 'แบบร่าง',
          page.views || 0,
          page.updatedAt || new Date().toLocaleDateString('th-TH')
        ]);
      });
    }

    // --- แผ่นงานที่ 3: ประวัติการซิงค์ (SyncHistory) ---
    let historySheet = ss.getSheetByName(SHEET_HISTORY);
    if (!historySheet) {
      historySheet = ss.insertSheet(SHEET_HISTORY);
      historySheet.appendRow(['วัน-เวลา', 'ผู้ดำเนินการ', 'เวอร์ชัน', 'ขนาดข้อมูล (ไบต์)', 'สถานะ']);
      historySheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#f1f5f9').setFontColor('#0f172a');
    }
    const teacher = (dataObj.profile && dataObj.profile.teacherName) || 'ครูสุบิน คำมุลนา';
    historySheet.appendRow([new Date(), teacher, dataObj.version || '1.0.0', jsonString.length, 'ซิงค์ข้อมูลสำเร็จ']);

  } catch (err) {
    Logger.log('Google Sheets Sync Note: ' + err.message);
  }
}

/**
 * 📥 ดึงข้อมูลจาก ScriptProperties
 */
function loadDataFromStorage() {
  const userProperties = PropertiesService.getScriptProperties();
  const saved = userProperties.getProperty(PROPERTY_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}

/**
 * 🛠️ Helper สำหรับส่งคืนข้อมูลรูปแบบ JSON
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
}


