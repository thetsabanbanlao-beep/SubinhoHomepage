import { PortalData } from '../types/portal';
import { INITIAL_PORTAL_DATA } from '../data/defaultData';

const LOCAL_STORAGE_KEY = 'kru_subin_portal_data_v1';

export function loadPortalData(): PortalData {
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      const profile = {
        ...INITIAL_PORTAL_DATA.profile,
        ...(parsed.profile || {}),
      };
      
      // Auto upgrade old unsplash images to user uploaded assets
      if (!profile.schoolLogo || profile.schoolLogo.includes('images.unsplash.com')) {
        profile.schoolLogo = '2222.png';
      }
      if (!profile.profileImage || profile.profileImage.includes('images.unsplash.com')) {
        profile.profileImage = 'Gemini-subinho.jpg';
      }
      if (!profile.fullBodyImage || profile.fullBodyImage.includes('images.unsplash.com')) {
        profile.fullBodyImage = 'Gemini-subinho.jpg';
      }

      const gasConfig = {
        ...INITIAL_PORTAL_DATA.gasConfig,
        ...(parsed.gasConfig || {}),
      };
      if (!gasConfig.webAppUrl) {
        gasConfig.webAppUrl = 'https://script.google.com/macros/s/AKfycbxvm1xAKU6i7pSr92WPjebM-BDfyY0hjreQT0nQs8Tp_gLbnbCVxX-_6uXbiBbPcAin/exec';
      }

      return {
        ...INITIAL_PORTAL_DATA,
        ...parsed,
        profile,
        gasConfig,
      };
    }
  } catch (error) {
    console.error('Failed to load portal data from localStorage', error);
  }
  return INITIAL_PORTAL_DATA;
}

export function savePortalData(data: PortalData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save portal data to localStorage', error);
  }
}

export function exportToJson(data: PortalData): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute(
    'download',
    `kru-subin-portal-backup-${new Date().toISOString().slice(0, 10)}.json`
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export async function testGasConnection(url: string): Promise<{ success: boolean; message: string }> {
  if (!url || !url.startsWith('https://script.google.com')) {
    return { success: false, message: 'URL ต้องขึ้นต้นด้วย https://script.google.com/macros/s/...' };
  }

  try {
    const testUrl = url.includes('?') ? `${url}&action=ping` : `${url}?action=ping`;
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Status ${response.status}`);
    }

    const data = await response.json();
    if (data.status === 'success') {
      return { success: true, message: data.message || 'เชื่อมต่อกับ Google Apps Script สำเร็จ!' };
    } else {
      return { success: false, message: data.message || 'Apps Script ส่งการแจ้งเตือนข้อผิดพลาดกลับมา' };
    }
  } catch (err: unknown) {
    // If CORS preflight blocks or returns redirect
    const errorMsg = err instanceof Error ? err.message : 'ไม่สามารถเชื่อมต่อได้';
    return { 
      success: false, 
      message: `เกิดข้อผิดพลาด: ${errorMsg} (กรุณาตรวจสอบว่าตั้งค่าสิทธิ์ Web App เป็น "ทุกคน/Anyone" แล้วหรือยัง)` 
    };
  }
}

export async function pushDataToGas(url: string, data: PortalData): Promise<{ success: boolean; message: string }> {
  if (!url || !url.startsWith('https://script.google.com')) {
    return { success: false, message: 'URL ไม่ถูกต้อง' };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'saveData',
        data: data,
      }),
    });

    const result = await response.json();
    if (result.status === 'success') {
      return { success: true, message: result.message || 'บันทึกข้อมูลขึ้น Google Cloud สำเร็จ' };
    }
    return { success: false, message: result.message || 'ไม่สามารถบันทึกข้อมูลได้' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการส่งข้อมูล';
    return { success: false, message: `เกิดข้อผิดพลาด: ${errorMsg}` };
  }
}

export async function pullDataFromGas(url: string): Promise<{ success: boolean; data?: PortalData; message: string }> {
  if (!url || !url.startsWith('https://script.google.com')) {
    return { success: false, message: 'URL ไม่ถูกต้อง' };
  }

  try {
    const fetchUrl = url.includes('?') ? `${url}&action=getData` : `${url}?action=getData`;
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const result = await response.json();
    if (result.status === 'success' && result.data) {
      return { success: true, data: result.data, message: 'ดึงข้อมูลล่าสุดจาก Google Apps Script สำเร็จ' };
    }
    return { success: false, message: result.message || 'ไม่พบชุดข้อมูลบน Google Apps Script' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'ดึงข้อมูลไม่สำเร็จ';
    return { success: false, message: `เกิดข้อผิดพลาด: ${errorMsg}` };
  }
}

export function extractYoutubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : trimmed;
}
