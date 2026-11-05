"use client";

import {useState} from 'react';
import {ArrowLeft, ArrowRight, ArrowUpRight} from 'lucide-react';
import Link from 'next/link';
import {categories} from '@/lib/data';
import {ResponsivePhoto} from '@/components/responsive-photo';

export function EditorialSlider() {
  const [idx, setIdx] = useState(0);
  const items = [categories[0], categories[1], categories[2]];
  const item = items[idx];
  return <div className="editorial-slider">
    <div className="slider-image"><ResponsivePhoto src={item.image} sizes="(max-width: 760px) 100vw, 60vw" />
      <span className="photo-tag">INSPIRAÇÃO 0{idx + 1}</span></div>
    <div className="slider-meta"><div><span className="eyebrow">DETALHES QUE ACOLHEM</span>
      <h3 aria-live="polite">{item.name}</h3><p>{item.desc}</p>
      <Link href={`/ambientes#${item.slug}`} className="text-link">Explorar ambientes <ArrowUpRight size={18} /></Link>
    </div><div className="slider-controls"><span>0{idx + 1} / 0{items.length}</span>
      <button type="button" aria-label="Imagem anterior" onClick={() => setIdx(current => (current + items.length - 1) % items.length)}><ArrowLeft size={19} /></button>
      <button type="button" aria-label="Próxima imagem" onClick={() => setIdx(current => (current + 1) % items.length)}><ArrowRight size={19} /></button>
    </div></div>
  </div>;
}

export function Gallery() {
  const [filter, setFilter] = useState('Todos');
  const labels = ['Todos', ...categories.map(category => category.name)];
  const filtered = categories.filter(category => filter === 'Todos' || filter === category.name);
  return <><div className="filters" role="group" aria-label="Filtrar ambientes">
    {labels.map(label => <button type="button" key={label} onClick={() => setFilter(label)} aria-pressed={filter === label}
      className={filter === label ? 'chosen' : ''}>{label}</button>)}
  </div><p className="sr-only" role="status">{filtered.length} {filtered.length === 1 ? 'ambiente encontrado' : 'ambientes encontrados'}</p>
    <div className="gallery-grid">{filtered.map((category, index) => <Link href="/#lojas"
      className={`gallery-card gallery-${index}`} id={category.slug} key={category.slug}>
      <div className="gallery-img"><ResponsivePhoto src={category.image} sizes="(max-width: 760px) 100vw, 50vw" /></div>
      <div className="gallery-bottom"><span><b>{category.name}</b><small>{category.desc}</small></span>
        <span className="round-arrow"><ArrowUpRight size={20} /></span></div>
    </Link>)}</div>
  </>;
}
