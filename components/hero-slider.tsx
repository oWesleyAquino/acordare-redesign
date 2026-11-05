"use client";

import {useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play} from 'lucide-react';
import {ASSETS} from '@/lib/data';
import {Btn} from '@/components/site-shell';
import {ResponsivePhoto} from '@/components/responsive-photo';

const slides = [
  {
    image: ASSETS.hero,
    label: "VIVER BEM COMEÇA EM CASA",
    lines: ["O conforto", "transforma", "tudo."],
    description: "Espaços para viver, compartilhar e fazer de cada momento uma boa lembrança.",
    position: "center center",
  },
  {
    image: ASSETS.living,
    label: "AMBIENTES PARA VIVER",
    lines: ["Sua casa,", "seu jeito", "de viver."],
    description: "Cada ambiente pode contar uma nova história de aconchego e bem-estar.",
    position: "center center",
  },
  {
    image: ASSETS.bedroom,
    label: "DESCANSAR TAMBÉM É VIVER",
    lines: ["Seu refúgio,", "seu momento", "de pausa."],
    description: "Texturas, acolhimento e conforto para os momentos que são só seus.",
    position: "center center",
  },
] as const;

export default function HeroSlider() {
  const [{active, shown}, setSlide] = useState({active: 0, shown: [0]});
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const rotationPointerState = useRef<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const navigate = useCallback((value: number, absolute = false) => {
    setSlide(current => {
      const next = absolute ? value : (current.active + value + slides.length) % slides.length;
      return {active: next, shown: current.shown.includes(next) ? current.shown : [...current.shown, next]};
    });
  }, []);

  useEffect(() => {
    if (userPaused || hoverPaused || reducedMotion) return;
    const timer = window.setInterval(() => navigate(1), 7000);
    return () => window.clearInterval(timer);
  }, [userPaused, hoverPaused, reducedMotion, active, navigate]);

  function manualNavigation(value: number, absolute = false) {
    setUserPaused(true);
    navigate(value, absolute);
  }

  return <section className="hero hero-carousel" aria-label="Destaques Acordare"
    aria-roledescription="carrossel" onMouseEnter={() => setHoverPaused(true)}
    onMouseLeave={() => setHoverPaused(false)} onFocusCapture={() => setUserPaused(true)}>
    <div className="hero-slides" aria-hidden="true">
      {slides.map((slide, index) => <div key={slide.image}
        className={`hero-slide-photo ${index === active ? 'is-active' : ''}`}>
        {shown.includes(index) && <ResponsivePhoto src={slide.image} sizes="(max-width: 760px) 180vh, 100vw"
          priority={index === 0} position={slide.position} />}
      </div>)}
    </div>
    <div className="container hero-content hero-carousel-content">
      <div className="hero-copy" key={active} aria-live={userPaused || reducedMotion ? 'polite' : 'off'}>
        <span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> {slides[active].label}</span>
        <h1>{slides[active].lines[0]}<br /><em>{slides[active].lines[1]}</em><br />{slides[active].lines[2]}</h1>
        <p>{slides[active].description}</p>
      </div>
      <div className="hero-actions hero-fixed-actions">
        <Btn href="/ambientes">Explorar ambientes</Btn>
        <Link className="hero-secondary" href="/#lojas">Encontre sua loja <ArrowUpRight size={18} /></Link>
      </div>
    </div>
    <Link className="scroll-hint" href="#essencia"><ArrowDown size={18} /> ROLE PARA EXPLORAR</Link>
    <div className="hero-navigation" aria-label="Navegação do banner">
      <button type="button" className="hero-rotation" disabled={reducedMotion}
        title={reducedMotion ? 'Rotação automática desativada pela preferência de movimento reduzido' : undefined}
        onPointerDown={() => {rotationPointerState.current = userPaused;}}
        onPointerCancel={() => {rotationPointerState.current = null;}}
        onClick={() => {
          const pointerWasPaused = rotationPointerState.current;
          rotationPointerState.current = null;
          setUserPaused(current => !(pointerWasPaused ?? current));
        }}>
        {userPaused || reducedMotion ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        {reducedMotion ? 'Pausado' : userPaused ? 'Retomar' : 'Pausar'}
      </button>
      <button type="button" onClick={() => manualNavigation(-1)} aria-label="Banner anterior"><ArrowLeft size={18} /></button>
      <div className="hero-dots" role="group" aria-label="Escolher banner">
        {slides.map((slide, index) => <button type="button" key={slide.label}
          className={index === active ? 'is-active' : ''} onClick={() => manualNavigation(index, true)}
          aria-label={`Mostrar banner ${index + 1}: ${slide.label.toLowerCase()}`}
          aria-current={index === active ? 'true' : undefined} />)}
      </div>
      <button type="button" onClick={() => manualNavigation(1)} aria-label="Próximo banner"><ArrowRight size={18} /></button>
      <span className="hero-navigation-counter">{String(active + 1).padStart(2, '0')} <span>/</span> 03</span>
    </div>
  </section>;
}
