'use client';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Chrome, LockKeyhole, Mail, ShoppingBasket } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
function SignInForm(){
 const router=useRouter();const search=useSearchParams();const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);try{const result=await authClient.signIn.email({email,password,callbackURL:search.get('callbackURL')||'/'});if(result.error){toast.error(result.error.message||'লগইন করা যায়নি');return;}toast.success('সফলভাবে সাইন ইন হয়েছে');router.push(search.get('callbackURL')||'/');router.refresh();}catch{toast.error('সার্ভারের সঙ্গে সংযোগ করা যায়নি। সেটিংস যাচাই করুন।')}finally{setBusy(false)}}
 async function social(provider:'google'|'github'){try{await authClient.signIn.social({provider,callbackURL:search.get('callbackURL')||'/'});}catch{toast.error(`${provider==='google'?'Google':'GitHub'} লগইন এখন চালু নেই। OAuth সেটিংস যোগ করুন।`)}}
 return <div className="auth-page container"><div className="auth-card"><Link href="/" className="auth-brand"><span className="brand-icon"><ShoppingBasket size={22}/></span> বাজার দর</Link><div className="auth-heading"><h1>আবার স্বাগতম!</h1><p>আপনার অ্যাকাউন্টে সাইন ইন করুন</p></div><form onSubmit={submit} className="auth-form"><label>ইমেইল ঠিকানা<span className="input-wrap"><Mail size={17}/><input type="email" autoComplete="email" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/></span></label><label>পাসওয়ার্ড<span className="input-wrap"><LockKeyhole size={17}/><input type="password" autoComplete="current-password" placeholder="আপনার পাসওয়ার্ড" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/></span></label><button className="btn btn-primary btn-full btn-lg" disabled={busy}>{busy?'সাইন ইন হচ্ছে…':'সাইন ইন করুন'}</button></form><div className="auth-divider"><span/>অথবা<span/></div><div className="social-buttons"><button onClick={()=>social('google')} className="btn btn-social"><Chrome size={18}/> Google</button><button onClick={()=>social('github')} className="btn btn-social">◉ GitHub</button></div><p className="auth-switch">অ্যাকাউন্ট নেই? <Link href="/signup">নতুন অ্যাকাউন্ট তৈরি করুন</Link></p><p className="auth-footnote">পণ্যের বিস্তারিত দেখতে সাইন ইন প্রয়োজন।</p></div></div>
}

export default function SignInPage(){return <Suspense fallback={<div className="protected-loading"><div className="spinner"/><p>লোড হচ্ছে…</p></div>}><SignInForm/></Suspense>}
