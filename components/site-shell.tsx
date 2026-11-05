"use client";

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState, useEffect, useRef} from 'react';
import {ArrowUpRight, Instagram, Facebook, Menu, X, MapPin} from 'lucide-react';
import logo from '@/public/images/acordare-logo.png';

const nav = [['/', 'Início'], ['/ambientes', 'Ambientes'], ['/nossa-historia', 'Nossa história'], ['/#lojas', 'Nossas lojas']];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, {passive: true});
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  return <header className={`header ${scrolled ? 'scrolled' : ''}`} onKeyDown={event => {
    if (open && event.key === 'Escape') {setOpen(false); menuButton.current?.focus();}
  }}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="container nav-row">
      <Link href="/" className="brand" aria-label="Acordare, início"><Image src={logo} alt="Acordare — Móveis e Colchões"
        sizes="(max-width: 760px) 145px, 184px" priority /></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(([url, label]) => <Link key={url} href={url}
        aria-current={pathname === url ? 'page' : undefined} className={pathname === url && url !== '/' ? 'active' : ''}>{label}</Link>)}</nav>
      <Link className="nav-cta" href="/#lojas">Encontre sua loja <ArrowUpRight size={17} /></Link>
      <button type="button" ref={menuButton} className="mobile-menu" onClick={() => setOpen(current => !current)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls={open ? 'menu-movel' : undefined}>
        {open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="menu-movel" className="mobile-panel" aria-label="Menu móvel">{nav.map(([url, label]) => <Link
      onClick={() => setOpen(false)} key={url} href={url} aria-current={pathname === url ? 'page' : undefined}>
      {label}<ArrowUpRight size={18} /></Link>)}</nav>}
  </header>;
}

export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><div>
    <Image className="footer-logo" src={logo} alt="Acordare" sizes="210px" />
    <p>O conforto transforma tudo.<br />Ambientes para viver cada momento.</p></div>
    <div className="footer-links"><div><b>Explore</b><Link href="/ambientes">Ambientes</Link><Link href="/nossa-historia">Nossa história</Link><Link href="/#lojas">Nossas lojas</Link></div>
      <div><b>Conecte-se</b><a href="https://www.instagram.com/acordareoficial" target="_blank" rel="noopener noreferrer"><Instagram size={17} /> Instagram</a>
        <a href="https://www.facebook.com/acordareoficial" target="_blank" rel="noopener noreferrer"><Facebook size={17} /> Facebook</a>
        <a href="https://acordare.com.br/" target="_blank" rel="noopener noreferrer"><MapPin size={17} /> Site institucional</a></div></div>
    </div><div className="footer-bottom"><span>© 2026 Acordare · Conceito de redesign para apresentação.</span><span>Protótipo demonstrativo, não é o site oficial.</span></div></div></footer>;
}

export function Btn({href, children, outline = false}: {href: string; children: React.ReactNode; outline?: boolean}) {
  return <Link className={`btn ${outline ? 'btn-outline' : ''}`} href={href}>{children}<ArrowUpRight size={18} strokeWidth={1.8} /></Link>;
}
