'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
export default function ProtectedGate({children}:{children:React.ReactNode}) {
  const router=useRouter(); const {data:session,isPending}=authClient.useSession(); const [checked,setChecked]=useState(false);
  useEffect(()=>{if(!isPending){if(!session){toast.error('এই পেজ দেখতে আগে সাইন ইন করুন');router.replace('/signin?callbackURL='+encodeURIComponent(window.location.pathname));}setChecked(true);}},[isPending,session,router]);
  if(isPending || !checked || !session) return <div className="container protected-loading"><div className="spinner"/><p>আপনার অ্যাকাউন্ট যাচাই করা হচ্ছে…</p></div>;
  return <>{children}</>;
}
