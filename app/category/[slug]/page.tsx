import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories,getProducts,formatBDT } from '@/lib/products';
import CategoryProducts from './products';
export const revalidate=300;
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const [products,categories]=await Promise.all([getProducts(),getCategories()]);
 const category=categories.find(c=>c.slug===decodeURIComponent(slug)); if(!category) notFound();
 const filtered=products.filter(p=>p.categorySlug===category.slug);
 return <div className="container page-content"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>{category.name}</span></div><div className="page-title-row"><div><span className="eyebrow">ক্যাটাগরি অনুযায়ী</span><h1>{category.emoji} {category.name}</h1><p>এই ক্যাটাগরির পণ্যের বর্তমান দাম ও পরিবর্তন</p></div><span className="product-count">{formatBDT(filtered.length)}টি পণ্য</span></div><CategoryProducts products={filtered}/></div>
}
