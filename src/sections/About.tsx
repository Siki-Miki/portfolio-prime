import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Terminal, Braces, Hash } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function RollingNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setDisplay(Math.round(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [target]);

  return (
    <div ref={ref} className="font-mono text-4xl sm:text-5xl font-bold text-[#D97706]">
      {display}
      {suffix}
    </div>
  );
}

const timelineData = [
  { icon: Code2, titleKey: 'about.timeline.title1', descKey: 'about.timeline.desc1' },
  { icon: Terminal, titleKey: 'about.timeline.title2', descKey: 'about.timeline.desc2' },
  { icon: Braces, titleKey: 'about.timeline.title3', descKey: 'about.timeline.desc3' },
  { icon: Hash, titleKey: 'about.timeline.title4', descKey: 'about.timeline.desc4' },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        '.about-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-heading', start: 'top 85%' },
        }
      );

      // Animate bio paragraphs
      gsap.fromTo(
        '.about-bio',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-bio', start: 'top 85%' },
        }
      );

      // Animate stats
      gsap.fromTo(
        '.about-stat',
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.about-stat', start: 'top 85%' },
        }
      );

      // Animate timeline items
      gsap.fromTo(
        '.timeline-item',
        { x: isRTL ? 50 : -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 80%' },
        }
      );

      // Draw timeline line
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D97706]/5 to-transparent pointer-events-none" />

      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Content */}
          <div className={`lg:col-span-3 ${isRTL ? 'lg:order-2' : ''}`}>
            <h2 className="about-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
              {t('about.heading')}
            </h2>

            <div className="space-y-6 mb-12">
              <p className="about-bio text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('about.bio1')}
              </p>
              <p className="about-bio text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('about.bio2')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="about-stat p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-[#D97706]/30 transition-colors">
                <RollingNumber target={1} suffix="+" />
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{t('about.stats.years')}</p>
              </div>
              <div className="about-stat p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-[#D97706]/30 transition-colors">
                <RollingNumber target={2} />
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{t('about.stats.projects')}</p>
              </div>
              <div className="about-stat p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-[#D97706]/30 transition-colors">
                <RollingNumber target={1000} suffix="+" />
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{t('about.stats.stars')}</p>
              </div>
            </div>
          </div>

          {/* Right - Timeline */}
          <div className={`lg:col-span-2 timeline-container relative ${isRTL ? 'lg:order-1' : ''}`}>
            {/* Central line */}
            <div
              className={`timeline-line absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#D97706] via-[#D97706]/50 to-transparent origin-top ${
                isRTL ? 'right-4' : 'left-4'
              }`}
            />

            <div className="space-y-10">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item relative flex items-start gap-6 ${isRTL ? 'flex-row-reverse pr-12' : 'pl-12'}`}
                >
                  {/* Node */}
                  <div
                    className={`absolute top-0 w-8 h-8 rounded-full bg-background border-2 border-[#D97706] flex items-center justify-center shadow-lg shadow-[#D97706]/20 ${
                      isRTL ? 'right-0' : 'left-0'
                    }`}
                  >
                    <item.icon className="w-4 h-4 text-[#D97706]" />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pt-1 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
