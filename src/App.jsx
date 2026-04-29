import { useState, useCallback } from 'react';
import { COLORS, MONO, SANS } from './styles/tokens';
import { INITIAL_LIBRARY } from './data/library';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToast } from './hooks/useToast';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { DetailScreen } from './screens/DetailScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const STORAGE_KEY = 'seectrl-library-v1';

export default function App() {
  const [library, setLibrary] = useLocalStorage(STORAGE_KEY, INITIAL_LIBRARY);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedShow, setSelectedShow] = useState(null);
  const { toast, showToast } = useToast();

  // ---- Handlinger ----
  const addShow = useCallback(
    (show) => {
      setLibrary((prev) => {
        if (prev.some((s) => s.id === show.id)) return prev;
        return [...prev, { ...show, watched: {} }];
      });
      showToast(`«${show.title}» lagt til`);
      setSelectedShow(show.id);
    },
    [setLibrary, showToast]
  );

  const toggleEpisode = useCallback(
    (showId, season, ep) => {
      setLibrary((prev) =>
        prev.map((show) => {
          if (show.id !== showId) return show;
          const seen = show.watched[season] || 0;
          // Klikk på siste sette episode = angre én. Ellers sett til og med ep.
          const newSeen = ep === seen ? ep - 1 : ep;
          return {
            ...show,
            watched: { ...show.watched, [season]: Math.max(0, newSeen) },
          };
        })
      );
    },
    [setLibrary]
  );

  const markSeason = useCallback(
    (showId, season) => {
      setLibrary((prev) =>
        prev.map((show) => {
          if (show.id !== showId) return show;
          const total = show.seasons.find((s) => s.number === season).episodes;
          const seen = show.watched[season] || 0;
          const allSeen = seen === total;
          return {
            ...show,
            watched: {
              ...show.watched,
              [season]: allSeen ? 0 : total,
            },
          };
        })
      );
    },
    [setLibrary]
  );

  const handleReset = useCallback(() => {
    setLibrary(INITIAL_LIBRARY);
    setActiveTab('home');
    setSelectedShow(null);
    showToast('Prototypen tilbakestilt');
  }, [setLibrary, showToast]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSelectedShow(null);
  }, []);

  // ---- Render ----
  const currentShow = selectedShow
    ? library.find((s) => s.id === selectedShow)
    : null;

  const renderScreen = () => {
    if (currentShow) {
      return (
        <DetailScreen
          show={currentShow}
          onBack={() => setSelectedShow(null)}
          onToggleEpisode={toggleEpisode}
          onMarkSeason={markSeason}
        />
      );
    }
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            library={library}
            onSelect={setSelectedShow}
            onGoToSearch={() => setActiveTab('search')}
          />
        );
      case 'search':
        return (
          <SearchScreen
            library={library}
            onAdd={addShow}
            onSelect={setSelectedShow}
          />
        );
      case 'calendar':
        return <CalendarScreen library={library} />;
      case 'profile':
        return <ProfileScreen library={library} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: SANS,
      }}
    >
      {/* Telefon-ramme */}
      <div
        style={{
          width: '100%',
          maxWidth: 390,
          height: 800,
          background: COLORS.bg,
          borderRadius: 40,
          border: `8px solid #1a1a1f`,
          boxShadow:
            '0 30px 80px rgba(0,229,255,0.15), 0 10px 40px rgba(0,0,0,0.6)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Statuslinje */}
        <div
          style={{
            padding: '12px 24px 6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12,
            fontFamily: MONO,
            color: COLORS.text,
            fontWeight: 600,
          }}
        >
          <span>9:41</span>
          <span
            style={{
              color: COLORS.accent,
              fontSize: 10,
              letterSpacing: '0.15em',
            }}
          >
            seectrl
          </span>
          <span style={{ fontSize: 11 }}>●●●●</span>
        </div>

        {/* Innhold (scrollbart) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            color: COLORS.text,
          }}
        >
          {renderScreen()}
        </div>

        {/* Bunnnavigasjon */}
        <BottomNav active={activeTab} onChange={handleTabChange} />

        {/* Toast (over alt annet) */}
        {toast && <Toast message={toast.message} />}
      </div>
    </div>
  );
}
