export const API_BASES = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  unit: string;
  emoji: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  change: number;
  description: string;
  markets: { name: string; price: number; area?: string }[];
};

const emojiByName: [RegExp, string][] = [
  [/চাল|rice/i, '🍚'], [/ডাল|lentil|pulse/i, '🫘'], [/তেল|oil/i, '🫙'],
  [/আলু|potato/i, '🥔'], [/পেঁয়াজ|পেঁয়াজ|onion/i, '🧅'], [/মরিচ|chili|chilli/i, '🌶️'],
  [/মাছ|fish/i, '🐟'], [/মুরগি|মাংস|chicken|meat/i, '🍗'], [/ডিম|egg/i, '🥚'],
  [/আদা|ginger/i, '🫚'], [/রসুন|garlic/i, '🧄'], [/টমেটো|tomato/i, '🍅'],
  [/বেগুন|eggplant/i, '🍆'], [/দুধ|milk/i, '🥛'], [/কলা|banana/i, '🍌'],
  [/লেবু|lemon/i, '🍋'], [/শাক|সবজি|vegetable/i, '🥬'], [/গরু|beef/i, '🥩'],
];
const text = (v: any, fallback = ''): string => typeof v === 'string' ? v : v == null ? fallback : String(v);
const num = (...values: any[]): number => {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
      const parsed = Number(value.replace(/[০-৯]/g, d => String('০১২৩৪৫৬৭৮৯'.indexOf(d))).replace(/[^\d.-]/g, ''));
      if (Number.isFinite(parsed) && value.trim() !== '') return parsed;
    }
  }
  return 0;
};
export function toEnglishDigits(value: string): string {
  return value.replace(/[০-৯]/g, d => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));
}
export function formatBDT(value: number): string {
  return new Intl.NumberFormat('bn-BD', { maximumFractionDigits: 2 }).format(value || 0);
}
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('bn-BD', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(Math.abs(value));
}
export function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
}
function emojiFor(name: string): string { return emojiByName.find(([pattern]) => pattern.test(name))?.[1] || '🛍️'; }
function normalizeProduct(item: any, index: number): Product {
  const name = text(item?.name ?? item?.productName ?? item?.title ?? item?.nameBn ?? item?.product_name, `পণ্য ${index + 1}`);
  const category = text(item?.category?.name ?? item?.categoryName ?? item?.category ?? item?.type, 'অন্যান্য');
  const price = num(item?.price ?? item?.currentPrice ?? item?.todayPrice ?? item?.averagePrice ?? item?.average_price ?? item?.marketPrice);
  const marketsRaw = item?.markets ?? item?.marketPrices ?? item?.pricesByMarket ?? item?.bazars ?? item?.bazaars ?? [];
  const markets = Array.isArray(marketsRaw) ? marketsRaw.map((m: any, i: number) => ({
    name: text(m?.marketName ?? m?.market ?? m?.name ?? m?.bazar ?? m?.bazaar, `বাজার ${i + 1}`),
    area: text(m?.area ?? m?.location ?? m?.district, ''),
    price: num(m?.price ?? m?.currentPrice ?? m?.todayPrice ?? m?.averagePrice, price),
  })) : [];
  const prices = markets.map(m => m.price).filter(p => p > 0);
  const minPrice = num(item?.minPrice ?? item?.minimumPrice ?? item?.min_price, prices.length ? Math.min(...prices) : price);
  const maxPrice = num(item?.maxPrice ?? item?.maximumPrice ?? item?.max_price, prices.length ? Math.max(...prices) : price);
  const averagePrice = num(item?.averagePrice ?? item?.avgPrice ?? item?.average_price, prices.length ? prices.reduce((a,b)=>a+b,0)/prices.length : price);
  const slug = text(item?.slug, slugify(name));
  return {
    id: text(item?.id ?? item?._id ?? item?.productId, String(index + 1)), slug,
    name, category, categorySlug: text(item?.categorySlug ?? item?.category?.slug, slugify(category)),
    unit: text(item?.unit ?? item?.unitName ?? item?.measurement, 'প্রতি কেজি'),
    emoji: text(item?.emoji ?? item?.icon, emojiFor(name)), price: price || averagePrice,
    minPrice, maxPrice, averagePrice, change: num(item?.changePercent ?? item?.change ?? item?.percentageChange ?? item?.priceChange),
    description: text(item?.description ?? item?.summary, `${name} এর আজকের বাজারদর ও বিভিন্ন বাজারের দামের তুলনা দেখুন।`), markets,
  };
}
export async function getProducts(): Promise<Product[]> {
  for (const base of API_BASES) {
    try {
      const response = await fetch(`${base}/products`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(7000) });
      if (!response.ok) continue;
      const json = await response.json();
      const list = Array.isArray(json) ? json : json?.data?.products ?? json?.data?.items ?? json?.data?.data ?? json?.data?.result ?? json?.items ?? json?.products ?? json?.result ?? json?.data ?? [];
      if (Array.isArray(list) && list.length) return list.map(normalizeProduct);
    } catch { /* try the next documented API base */ }
  }
  return [];
}
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => p.slug === slug || p.id === slug || slugify(p.name) === slug);
}
export async function getCategories(): Promise<{name:string;slug:string;emoji:string}[]> {
  const products = await getProducts();
  const map = new Map<string,{name:string;slug:string;emoji:string}>();
  products.forEach(p => { if (!map.has(p.categorySlug)) map.set(p.categorySlug,{name:p.category,slug:p.categorySlug,emoji:emojiFor(p.category)}); });
  return [...map.values()];
}
