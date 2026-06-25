import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedName, setTypedName] = useState('');
  const fullName = t('hero.name');
  const isRTL = i18n.language === 'ar';

  // Typing effect
  useEffect(() => {
    let index = 0;
    setTypedName('');
    const interval = setInterval(() => {
      if (index <= fullName.length) {
        setTypedName(fullName.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fullName]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center section-padding max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] text-sm font-mono">
            {t('hero.greeting')}
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-4"
        >
          <span className="text-foreground">{typedName}</span>
          <span className="inline-block w-[3px] h-[0.8em] bg-[#1D4ED8] ml-2 animate-pulse align-middle" />
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl md:text-3xl text-gradient font-semibold mb-8"
        >
          {t('hero.title')}
        </p>

        <p
          className={`text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed ${
            isRTL ? 'text-center' : 'text-left sm:text-center'
          }`} 
        >
          {t('hero.description')}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleScrollDown}
            className="group px-8 py-4 bg-[#1D4ED8] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition-all duration-300 hover:shadow-lg hover:shadow-[#1D4ED8]/25 hover:-translate-y-0.5"
          >
            {t('hero.cta')}
          </button>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/SikiMiki"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-[#1D4ED8] hover:bg-secondary transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ali-abboud-228578409/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-[#1D4ED8] hover:bg-secondary transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/alicoo_abboud"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-[#1D4ED8] hover:bg-secondary transition-all"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-[#1D4ED8] transition-colors group"
      >
        <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>

      {/* Decorative corner elements */}
      <div className="absolute top-20 left-8 w-20 h-20 border-l-2 border-t-2 border-[#1D4ED8]/20 z-0 hidden lg:block" />
      <div className="absolute bottom-20 right-8 w-20 h-20 border-r-2 border-b-2 border-[#1D4ED8]/20 z-0 hidden lg:block" />
    </section>
  );
}
