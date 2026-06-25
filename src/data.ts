export const CPA_URL =
  'https://www.underlingmistery.wiki/?sl=6003878-5b57b&pub_click_id={External_ID_from_traffic_source}&site={subID}&pub_sub_id={sub_subID}';

export interface Job {
  id: string;
  title: string;
  salary: string;
  nationality: string;
  icon: string;
}

export const jobs: Job[] = [
  { id: 'driver', title: 'سائق', salary: '4,500 - 6,000 ريال', nationality: 'جميع الجنسيات', icon: 'Truck' },
  { id: 'packer', title: 'عامل تغليف وتعبئة', salary: '3,500 - 5,000 ريال', nationality: 'جميع الجنسيات', icon: 'Package' },
  { id: 'cleaner', title: 'عامل نظافة', salary: '3,000 - 4,500 ريال', nationality: 'جميع الجنسيات', icon: 'Sparkles' },
  { id: 'sales', title: 'مندوب مبيعات', salary: '5,000 - 8,000 ريال', nationality: 'جميع الجنسيات', icon: 'TrendingUp' },
  { id: 'warehouse', title: 'عامل مستودع', salary: '3,500 - 5,500 ريال', nationality: 'جميع الجنسيات', icon: 'Warehouse' },
  { id: 'production', title: 'عامل إنتاج', salary: '4,000 - 6,000 ريال', nationality: 'جميع الجنسيات', icon: 'Factory' },
  { id: 'merchandiser', title: 'مشرف مبيعات', salary: '6,000 - 9,000 ريال', nationality: 'جميع الجنسيات', icon: 'ClipboardCheck' },
  { id: 'delivery', title: 'مندوب توصيل', salary: '4,500 - 7,000 ريال', nationality: 'جميع الجنسيات', icon: 'Bike' },
];
