'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, ShoppingBasket, UserRound, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import type { Product } from '@/lib/products';
import { formatBDT, formatPercent } from '@/lib/products';
export default function SiteHeader({ categories, products }: { categories: {name:string;slug:string;emoji:string}[]; products: Product[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [date, setDate] = useState('');
  const { data: session } = authClient.useSession();
  useEffect(() => { setDate(new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric',weekday:'long'}).format(new Date())); }, []);
  const signOut = async () => { await authClient.signOut(); window.location.href = '/'; };
  return <>
    <header className="site-header"><div className="header-main container">
      <Link href="/" className="brand"><span className="brand-icon"><ShoppingBasket size={24}/></span><span><b>বাজার দর</b><small>{date || 'আজকের বাজারদর'}</small></span></Link>
      <nav className="header-actions"><Link href="/profile" className="profile-link"><UserRound size={17}/>{session?.user?.name || 'আমার প্রোফাইল'}</Link>{session ? <button className="btn btn-outline btn-sm" onClick={signOut}>সাইন আউট</button> : <><Link className="btn btn-outline btn-sm" href="/signin">সাইন ইন</Link><Link className="btn btn-primary btn-sm" href="/signup">সাইন আপ</Link></>}</nav>
      <button className="mobile-menu" aria-label="মেনু" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button>
    </div>
    <div className={`category-bar ${mobileOpen ? 'category-bar-open' : ''}`}><nav className="container category-nav"><Link href="/" className="category-link active">সব পণ্য</Link>{categories.map(c => <Link key={c.slug} href={`/category/${encodeURIComponent(c.slug)}`} className="category-link">{c.emoji} {c.name}</Link>)}{mobileOpen && <Link href="/profile" className="category-link">আমার প্রোফাইল</Link>}</nav></div></header>
    <div className="ticker"><div className="ticker-label"><span className="live-dot"/> লাইভ বাজারদর</div><div className="ticker-window"><div className="ticker-track">{[...products.slice(0,18), ...products.slice(0,18)].map((p,i)=><span className="ticker-item" key={`${p.id}-${i}`}>{p.emoji} {p.name} <b>{formatBDT(p.price)} ৳/{p.unit.replace('প্রতি ','')}</b><i className={p.change < 0 ? 'ticker-down' : p.change > 0 ? 'ticker-up' : ''}>{p.change > 0 ? '▲' : p.change < 0 ? '▼' : '•'} {formatPercent(p.change)}%</i></span>)}{products.length===0 && <span className="ticker-item">আজকের বাজারদর জানতে পণ্য তালিকা লোড হচ্ছে…</span>}</div></div></div>
  </>;
}
