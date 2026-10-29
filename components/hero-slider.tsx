"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ASSETS } from "@/lib/data";
import { Btn } from "@/components/site-shell";

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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, active]);

  const go = (direction: number) =>
    setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section
      className="hero hero-carousel"
      aria-label="Destaques Acordare"
      aria-roledescription="carrossel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="hero-slides" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide-photo ${index === active ? "is-active" : ""}`}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(12,12,12,.69) 0%, rgba(12,12,12,.17) 64%, rgba(12,12,12,.12)), url('${slide.image}')`,
              backgroundPosition: slide.position,
            }}
          />
        ))}
      </div>

      <div className="container hero-content hero-carousel-content">
        <div className="hero-copy" key={active} aria-live="off">
          <span className="eyebrow eyebrow-light">
            <span className="eyebrow-dot" /> {slides[active].label}
          </span>
          <h1>
            {slides[active].lines[0]}<br />
            <em>{slides[active].lines[1]}</em><br />
            {slides[active].lines[2]}
          </h1>
          <p>{slides[active].description}</p>
        </div>
        <div className="hero-actions hero-fixed-actions">
          <Btn href="/ambientes">Explorar ambientes</Btn>
          <Link className="hero-secondary" href="/#lojas">
            Encontre sua loja <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      <Link className="scroll-hint" href="#essencia">
        <ArrowDown size={18} /> ROLE PARA EXPLORAR
      </Link>
      <div className="hero-navigation" aria-label="Navegação do banner">
        <button type="button" onClick={() => go(-1)} aria-label="Banner anterior">
          <ArrowLeft size={18} />
        </button>
        <div className="hero-dots" role="group" aria-label="Escolher banner">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.label}
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Mostrar banner ${index + 1}: ${slide.label.toLowerCase()}`}
              aria-current={index === active ? "true" : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Próximo banner">
          <ArrowRight size={18} />
        </button>
        <span className="hero-navigation-counter">{String(active + 1).padStart(2, "0")} <span>/</span> 03</span>
      </div>
    </section>
  );
}
