import Link from 'next/link';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, ShieldCheck, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { getProducts, formatBDT, formatPercent } from '@/lib/products';
export const revalidate = 300;
function PriceSection({title,subtitle,products,down=false}:{title:string;subtitle:string;products:Awaited<ReturnType<typeof getProducts>>;down?:boolean}) {
  return <section className="section-block"><div className="section-heading"><div><span className={`section-symbol ${down?'symbol-down':'symbol-up'}`}>{down?<ArrowDownRight size={20}/>:<ArrowUpRight size={20}/>}</span><div><h2>{title}</h2><p>{subtitle}</p></div></div><Link href="#সব-পণ্য" className="text-link">সব পণ্য দেখুন <ArrowRight size={16}/></Link></div>
    {products.length ? <div className="product-grid">{products.slice(0,6).map(p=><ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-inline">এ মুহূর্তে পণ্যের তথ্য পাওয়া যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।</div>}
  </section>
}
export default async function HomePage(){
  const products=await getProducts();
  const risers=[...products].filter(p=>p.change>0).sort((a,b)=>b.change-a.change).slice(0,6);
  const fallers=[...products].filter(p=>p.change<0).sort((a,b)=>a.change-b.change).slice(0,6);
  const rising=risers;
  const falling=fallers;
  return <>
    <section className="hero-wrap"><div className="container hero"><div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> প্রতিদিনের বাজার, আপনার হাতেই</div><h1>বাজারের সঠিক দাম,<br/><span>সিদ্ধান্ত হোক সহজ।</span></h1><p className="hero-description">চাল, ডাল, সবজি থেকে মাছ-মাংস। নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন এক জায়গায়, তুলনা করুন বিভিন্ন বাজারের সঙ্গে।</p><div className="hero-actions"><Link href="#সব-পণ্য" className="btn btn-primary btn-lg">আজকের দাম দেখুন <ArrowRight size={18}/></Link><span className="hero-trust"><ShieldCheck size={17}/> সহজ, স্বচ্ছ, সবার জন্য</span></div><div className="hero-stats"><div><strong>{formatBDT(products.length)}</strong><span>পণ্য তালিকায়</span></div><div><strong>২৪/৭</strong><span>দাম দেখার সুবিধা</span></div><div><strong>বাংলা</strong><span>সহজ তথ্য</span></div></div></div>
      <div className="hero-art"><div className="hero-art-orb orb-one"/><div className="hero-art-orb orb-two"/><div className="market-illustration"><div className="market-sun">☀️</div><div className="basket">🧺</div><div className="produce produce-one">🥬</div><div className="produce produce-two">🍅</div><div className="produce produce-three">🥕</div><div className="produce produce-four">🍆</div><div className="produce produce-five">🌶️</div><div className="produce produce-six">🥔</div><div className="market-tag"><span className="tag-dot"/> আজকের বাজার</div></div><div className="floating-price"><span>🥔 আলু</span><b>{products.find(p=>/আলু/.test(p.name))?formatBDT(products.find(p=>/আলু/.test(p.name))!.price):'—'} ৳</b><small><TrendingUp size={13}/> দৈনিক আপডেট</small></div><div className="floating-note"><span>📊</span><div><b>দাম তুলনা করুন</b><small>কেনার আগে জেনে নিন</small></div></div></div>
    </div></section>
    <div className="container"><div className="benefit-strip"><div><span className="benefit-icon">📍</span><div><b>বাজারভিত্তিক তথ্য</b><small>একাধিক বাজারের দামের তুলনা</small></div></div><div><span className="benefit-icon">📈</span><div><b>দামের পরিবর্তন</b><small>বৃদ্ধি ও হ্রাস সহজে বুঝুন</small></div></div><div><span className="benefit-icon">🛒</span><div><b>সচেতন কেনাকাটা</b><small>পরিকল্পনা করুন আত্মবিশ্বাসে</small></div></div></div>
      <PriceSection title="আজ দাম বেড়েছে" subtitle="যেসব পণ্যের দামে ঊর্ধ্বগতি দেখা যাচ্ছে" products={rising}/>
      <PriceSection title="আজ দাম কমেছে" subtitle="দাম কমেছে এমন পণ্যগুলো এক নজরে" products={falling} down/>
      <section className="section-block all-products" id="সব-পণ্য"><div className="section-heading"><div><span className="section-symbol symbol-neutral"><BarChart3 size={20}/></span><div><h2>সব পণ্য</h2><p>প্রয়োজনীয় পণ্যের আজকের দাম ও পরিবর্তন দেখুন</p></div></div><span className="product-count">{formatBDT(products.length)}টি পণ্য</span></div>
        {products.length ? <div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-state"><div>🧺</div><h3>পণ্যের তথ্য লোড করা যায়নি</h3><p>API সাময়িকভাবে অনুপলব্ধ। ইন্টারনেট সংযোগ যাচাই করে পেজটি রিফ্রেশ করুন।</p><Link href="/" className="btn btn-primary">আবার চেষ্টা করুন</Link></div>}
      </section>
    </div>
  </>
}
