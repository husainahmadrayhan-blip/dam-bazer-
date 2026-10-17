import Link from 'next/link';
export default function NotFound(){return <div className="not-found container"><div className="not-found-code">404</div><div className="not-found-icon">🧺</div><h1>এই পেজটি খুঁজে পাওয়া যায়নি</h1><p>ঠিকানাটি ভুল হতে পারে, অথবা পেজটি সরিয়ে ফেলা হয়েছে।</p><Link href="/" className="btn btn-primary btn-lg">হোম পেজে ফিরে যান</Link></div>}
