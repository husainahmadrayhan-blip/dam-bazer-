import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Providers from '@/components/providers';
import { getCategories, getProducts } from '@/lib/products';
export const metadata: Metadata = { title: 'বাজার দর | আজকের বাজারদর এক নজরে', description: 'বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর, দাম বৃদ্ধি-হ্রাস এবং বাজারভিত্তিক দামের তুলনা।', applicationName: 'বাজার দর' };
export default async function RootLayout({children}:{children:React.ReactNode}) {
  const [products,categories] = await Promise.all([getProducts(),getCategories()]);
  return <html lang="bn"><body><Providers/><SiteHeader products={products} categories={categories}/><main>{children}</main><SiteFooter/></body></html>;
}
