'use client';
import { useMemo,useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/product-card';
import type { Product } from '@/lib/products';
import {formatBDT} from '@/lib/products';
export default function CategoryProducts({products}:{products:Product[]}){
 const [sort,setSort]=useState('default');
 const sorted=useMemo(()=>{const list=[...products];if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);return list},[products,sort]);
 return <><div className="sort-row"><span><SlidersHorizontal size={16}/> মোট {formatBDT(products.length)}টি পণ্য</span><label>সাজান <span className="select-wrap"><select value={sort} onChange={e=>setSort(e.target.value)}><option value="default">ডিফল্ট</option><option value="low">দাম: কম থেকে বেশি</option><option value="high">দাম: বেশি থেকে কম</option></select><ChevronDown size={15}/></span></label></div>{sorted.length?<div className="product-grid">{sorted.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty-state"><div>🔎</div><h3>এই ক্যাটাগরিতে কোনো পণ্য নেই</h3><p>অন্য ক্যাটাগরি দেখুন অথবা সব পণ্যে ফিরে যান।</p><Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link></div>}</>
}
