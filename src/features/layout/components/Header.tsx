import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/store/useUIStore';
import { useTheme } from '@/hooks/useTheme';
import { useSimulationStore } from '@/store/useSimulationStore';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, openTheoryPanel, theoryAlgorithmId } = useUIStore();
  const { theme, toggleTheme } = useTheme();
  const { selectedAlgorithm } = useSimulationStore();
  const location = useLocation();
  const isSimulator = location.pathname === '/simulator';

  const switchLang = () => {
    const next = language === 'es' ? 'en' : 'es';
    setLanguage(next);
    i18n.changeLanguage(next);
  };

  return (
    <header
      style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}
      className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 gap-3"
    >
      <Link to="/" className="flex items-center gap-2 no-underline">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
            <path d="M7 8h2v5H7zM11 6h2v7h-2zM15 10h2v3h-2z" fill="white" stroke="none" />
          </svg>
        </div>
        <span className="font-semibold text-sm hidden sm:block" style={{ color: 'var(--text-primary)' }}>
          {t('app.title')}
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {isSimulator && selectedAlgorithm && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openTheoryPanel(theoryAlgorithmId ?? selectedAlgorithm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ background: 'var(--bg-secondary)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            {t('theory.open')}
          </motion.button>
        )}

        {!isSimulator && (
          <Link to="/simulator">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {t('nav.simulator')}
            </motion.button>
          </Link>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={switchLang}
          className="px-2.5 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          aria-label="Toggle language"
        >
          {language === 'es' ? 'EN' : 'ES'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--text-secondary)' }}>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--text-secondary)' }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </motion.button>
      </div>
    </header>
  );
}
