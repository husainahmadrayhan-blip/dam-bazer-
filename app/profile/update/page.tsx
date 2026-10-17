'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';
import {authClient} from '@/lib/auth-client';
import ProtectedGate from '@/components/protected-gate';
export default function UpdateProfilePage(){const router=useRouter();const {data:session}=authClient.useSession();const [name,setName]=useState('');const [busy,setBusy]=useState(false);useEffect(()=>{if(session?.user?.name)setName(session.user.name)},[session?.user?.name]);
 async function submit(e:React.FormEvent){e.preventDefault();if(name.trim().length<2){toast.error('নাম কমপক্ষে ২ অক্ষরের হতে হবে');return;}setBusy(true);try{const result=await authClient.updateUser({name:name.trim()});if(result.error){toast.error(result.error.message||'তথ্য আপডেট হয়নি');return;}toast.success('প্রোফাইল আপডেট হয়েছে');router.push('/profile');router.refresh()}catch{toast.error('তথ্য আপডেট করা যায়নি')}finally{setBusy(false)}}
 return <ProtectedGate><div className="container page-content profile-page"><Link href="/profile" className="back-link"><ArrowLeft size={16}/> প্রোফাইলে ফিরে যান</Link><span className="eyebrow">প্রোফাইল সেটিংস</span><h1>ব্যক্তিগত তথ্য আপডেট</h1><p className="page-intro">আপনার প্রোফাইলে দেখানো নাম পরিবর্তন করুন।</p><form className="profile-update-card" onSubmit={submit}><label>নাম<span className="input-wrap"><UserRound size={17}/><input value={name} onChange={e=>setName(e.target.value)} required minLength={2} maxLength={80} placeholder="আপনার নাম"/></span></label><button className="btn btn-primary btn-lg" disabled={busy}>{busy?'আপডেট হচ্ছে…':'তথ্য আপডেট করুন'}</button></form></div></ProtectedGate>
}
