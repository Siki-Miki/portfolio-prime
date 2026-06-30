import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
  '/project-1.png',
  '/project-2.png',
  '/project-3.png',
  '/project-3.png',
];

export default function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const projects = t('projects.projects', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    tags: string[];
    live: string;
  }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-heading', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32 lg:py-40">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#1D4ED8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#1D4ED8]/3 rounded-full blur-3xl" />
      </div>

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        <h2 className="projects-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4">
          {t('projects.heading')}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#1D4ED8] to-transparent mx-auto mb-16" />

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-[#1D4ED8]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#1D4ED8]/10 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                 src={`${import.meta.env.BASE_URL}${projectImages[index].replace(/^\//, '')}`}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                {/* Link icon */}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm"
                  aria-label={t('projects.viewProject')}>
                  <ExternalLink className="w-4 h-4 text-[#104ED8]" />
                </a>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-[#1D4ED8] transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8] border border-[#1D4ED8]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
