'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowRight, Mail, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';
import {authClient} from '@/lib/auth-client';
import ProtectedGate from '@/components/protected-gate';
export default function ProfilePage(){const router=useRouter();const {data:session}=authClient.useSession();const user=session?.user;
 return <ProtectedGate><div className="container page-content profile-page"><span className="eyebrow">অ্যাকাউন্ট</span><h1>আমার প্রোফাইল</h1><p className="page-intro">আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।</p><div className="profile-card"><div className="profile-avatar"><UserRound size={30}/></div><div className="profile-data"><span>নাম</span><strong>{user?.name||'—'}</strong><span>ইমেইল</span><strong>{user?.email||'—'}</strong></div><div className="profile-actions"><Link href="/profile/update" className="btn btn-primary">তথ্য আপডেট করুন <ArrowRight size={17}/></Link><button className="btn btn-outline" onClick={async()=>{await authClient.signOut();toast.success('সাইন আউট হয়েছে');router.push('/');router.refresh()}}>সাইন আউট</button></div></div><div className="profile-tip"><Mail size={18}/><p>ইমেইল ঠিকানা নিরাপত্তার কারণে এই পেজ থেকে পরিবর্তন করা যায় না।</p></div></div></ProtectedGate>
}
