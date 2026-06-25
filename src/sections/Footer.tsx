import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-border/30">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {t('footer.copyright')}
          </p>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t('footer.built')} <Heart className="w-3 h-3 text-[#D97706] fill-[#D97706]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
