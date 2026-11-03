export interface PresetImage {
  id: string;
  name: string;
  category: 'portrait' | 'school' | 'banner' | 'classroom';
  url: string;
}

export const PRESET_IMAGES: PresetImage[] = [
  {
    id: 'preset-uniform-1',
    name: 'รูปครูสุบิน (ชุดกากีทางการ)',
    category: 'portrait',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preset-suit-1',
    name: 'รูปครูสุบิน (ชุดสูทสากล/พิธีการ)',
    category: 'portrait',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preset-school-seal',
    name: 'ตราสัญลักษณ์ โรงเรียนเทศบาล ๓ บ้านเหล่า',
    category: 'school',
    url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'preset-banner-tech',
    name: 'แบนเนอร์ห้องเรียนเทคโนโลยีและนวัตกรรม',
    category: 'banner',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'preset-banner-science',
    name: 'แบนเนอร์ห้องปฏิบัติการวิทยาศาสตร์',
    category: 'banner',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'preset-coding-room',
    name: 'บรรยากาศห้องเรียนคอมพิวเตอร์และการเขียนโปรแกรม',
    category: 'classroom',
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80',
  },
];
