import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.contact-form',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706] transition-all';

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 sm:py-32 lg:py-40">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D97706]/5 rounded-full blur-3xl" />
      </div>

      <div className="section-padding max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="contact-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('contact.heading')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="contact-form glass rounded-3xl p-6 sm:p-8 lg:p-10">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t('contact.success')}
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 bg-[#D97706] text-white font-semibold rounded-xl hover:bg-[#B45309] transition-all duration-300 hover:shadow-lg hover:shadow-[#D97706]/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('contact.send')}
                  </>
                )}
              </button>
            </form>
          )}

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center mb-4">
              {t('contact.social')}
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-[#D97706] hover:bg-secondary transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-[#D97706] hover:bg-secondary transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-[#D97706] hover:bg-secondary transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
