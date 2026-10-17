import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatBDT, formatPercent } from '@/lib/products';
export default function ProductCard({ product }: { product: Product }) {
  const down = product.change < 0;
  return <Link href={`/product/${encodeURIComponent(product.slug)}`} className="product-card group">
    <div className="product-card-top"><span className="product-emoji">{product.emoji}</span><span className="category-pill">{product.category}</span></div>
    <h3>{product.name}</h3><p className="unit-text">{product.unit}</p>
    <div className="price-line"><div><span className="price-label">আজকের দাম</span><strong>{formatBDT(product.price)} <small>টাকা</small></strong></div>
      <span className={`change-pill ${product.change > 0 ? 'change-up' : down ? 'change-down' : 'change-flat'}`}>{product.change > 0 ? <ArrowUpRight size={14}/> : down ? <ArrowDownRight size={14}/> : <Minus size={14}/>} {formatPercent(product.change)}%</span>
    </div><div className="card-footer"><span>বিস্তারিত দেখুন</span><span className="card-arrow">↗</span></div>
  </Link>;
}
