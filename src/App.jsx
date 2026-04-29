import React, { useState, useMemo } from 'react';
import {
  Home,
  Search,
  Calendar,
  User,
  Check,
  Plus,
  ChevronLeft,
  Tv,
  Bell,
  Sparkles,
} from 'lucide-react';

/* ========================================================================
   seectrl – klikkbar prototype
   --------------------------------------------------------------------
   Demonstrasjonsformål. Ingen ekte API-kall, ingen backend.
   Alt tilstandsstyres lokalt – data nullstilles ved refresh.
   ======================================================================== */

// ----------------------- DESIGN TOKENS -----------------------
const COLORS = {
  bg: '#0A0A0F',
  bgCard: '#11111a',
  bgElevated: '#15151f',
  border: '#1f1f25',
  borderStrong: '#2a2a35',
  text: '#ffffff',
  textMuted: '#aaaaaa',
  textDim: '#666666',
  accent: '#00E5FF', // seectrl cyan
};

const MONO = "'JetBrains Mono', 'DM Mono', 'SF Mono', Menlo, monospace";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif";

// ----------------------- MOCK DATA -----------------------
// Inspirert av TMDB-strukturen, men lokalt.
const STREAMING_PLATFORMS = {
  netflix: { name: 'Netflix', color: '#E50914' },
  hbo: { name: 'HBO Max', color: '#9B4DCA' },
  viaplay: { name: 'Viaplay', color: '#FF6E00' },
  disney: { name: 'Disney+', color: '#0063E5' },
  appletv: { name: 'Apple TV+', color: '#A1A1A1' },
  prime: { name: 'Prime Video', color: '#00A8E1' },
};

// Posterfargene er bevisst stiliserte – ekte versjon henter fra TMDB.
const INITIAL_LIBRARY = [
  {
    id: 'severance',
    title: 'Severance',
    year: 2022,
    platform: 'appletv',
    posterColor: '#0F4C5C',
    accent: '#5BC0BE',
    seasons: [
      { number: 1, episodes: 9 },
      { number: 2, episodes: 10 },
    ],
    watched: { 1: 9, 2: 4 }, // sesong : antall sett
    nextRelease: '2026-05-12',
    overview:
      'En thriller om bevissthetsadskillelse på arbeidsplassen. Innovativ og uhyggelig.',
  },
  {
    id: 'succession',
    title: 'Succession',
    year: 2018,
    platform: 'hbo',
    posterColor: '#1A1A2E',
    accent: '#C9A227',
    seasons: [
      { number: 1, episodes: 10 },
      { number: 2, episodes: 10 },
      { number: 3, episodes: 9 },
      { number: 4, episodes: 10 },
    ],
    watched: { 1: 10, 2: 10, 3: 9, 4: 10 },
    nextRelease: null,
    overview:
      'Familiedrama om en eldre mediemogul og hans fire barn som kjemper om kontroll.',
  },
  {
    id: 'the-bear',
    title: 'The Bear',
    year: 2022,
    platform: 'disney',
    posterColor: '#2D1B0E',
    accent: '#E63946',
    seasons: [
      { number: 1, episodes: 8 },
      { number: 2, episodes: 10 },
      { number: 3, episodes: 10 },
    ],
    watched: { 1: 8, 2: 10, 3: 3 },
    nextRelease: '2026-06-15',
    overview:
      'En prisvinnende kokk arver en sliten sandwichsjappe i Chicago. Intenst og menneskelig.',
  },
  {
    id: 'the-last-of-us',
    title: 'The Last of Us',
    year: 2023,
    platform: 'hbo',
    posterColor: '#1B2D1B',
    accent: '#7FB069',
    seasons: [
      { number: 1, episodes: 9 },
      { number: 2, episodes: 7 },
    ],
    watched: { 1: 9, 2: 0 },
    nextRelease: '2026-04-30',
    overview: 'Postapokalyptisk drama basert på det kritikerroste spillet.',
  },
  {
    id: 'fallout',
    title: 'Fallout',
    year: 2024,
    platform: 'prime',
    posterColor: '#3D2817',
    accent: '#F4A261',
    seasons: [{ number: 1, episodes: 8 }],
    watched: { 1: 5 },
    nextRelease: null,
    overview:
      'Tilbake til retrofuturismen i ødemarkene – basert på spillserien.',
  },
];

// Katalog for søk – serier som ikke er i biblioteket ditt ennå.
const CATALOG = [
  {
    id: 'shogun',
    title: 'Shōgun',
    year: 2024,
    platform: 'disney',
    posterColor: '#3D1F1F',
    accent: '#E76F51',
    seasons: [{ number: 1, episodes: 10 }],
    watched: {},
    nextRelease: '2026-09-01',
    overview:
      'Episk historisk drama om makt og lojalitet i Japan på 1600-tallet.',
  },
  {
    id: 'house-of-the-dragon',
    title: 'House of the Dragon',
    year: 2022,
    platform: 'hbo',
    posterColor: '#1A0F0F',
    accent: '#9D0208',
    seasons: [
      { number: 1, episodes: 10 },
      { number: 2, episodes: 8 },
    ],
    watched: {},
    nextRelease: '2026-07-20',
    overview: 'Targaryen-familiens borgerkrig, 200 år før Game of Thrones.',
  },
  {
    id: 'ted-lasso',
    title: 'Ted Lasso',
    year: 2020,
    platform: 'appletv',
    posterColor: '#1A3A2E',
    accent: '#A8DADC',
    seasons: [
      { number: 1, episodes: 10 },
      { number: 2, episodes: 12 },
      { number: 3, episodes: 12 },
    ],
    watched: {},
    nextRelease: null,
    overview: 'En amerikansk fotballtrener får jobb i engelsk Premier League.',
  },
  {
    id: 'andor',
    title: 'Andor',
    year: 2022,
    platform: 'disney',
    posterColor: '#0F1419',
    accent: '#577590',
    seasons: [
      { number: 1, episodes: 12 },
      { number: 2, episodes: 12 },
    ],
    watched: {},
    nextRelease: null,
    overview: 'Star Wars-spinoff. Mørkere, mer politisk og kritikerrost.',
  },
  {
    id: 'young-royals',
    title: 'Young Royals',
    year: 2021,
    platform: 'netflix',
    posterColor: '#2D2D5C',
    accent: '#B8B8FF',
    seasons: [
      { number: 1, episodes: 6 },
      { number: 2, episodes: 6 },
      { number: 3, episodes: 6 },
    ],
    watched: {},
    nextRelease: null,
    overview: 'Svensk drama om en prins og hans liv på en eliteskole.',
  },
];

// ----------------------- HJELPERE -----------------------
const totalEpisodes = (show) =>
  show.seasons.reduce((sum, s) => sum + s.episodes, 0);

const watchedCount = (show) =>
  Object.values(show.watched).reduce((sum, n) => sum + n, 0);

const progressPct = (show) => {
  const total = totalEpisodes(show);
  return total === 0 ? 0 : Math.round((watchedCount(show) / total) * 100);
};

const nextEpisodeLabel = (show) => {
  for (const season of show.seasons) {
    const seen = show.watched[season.number] || 0;
    if (seen < season.episodes) {
      return `S${season.number}E${seen + 1}`;
    }
  }
  return 'Fullført';
};

// ----------------------- KOMPONENTER -----------------------

const PlatformBadge = ({ platform }) => {
  const p = STREAMING_PLATFORMS[platform];
  if (!p) return null;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        borderRadius: 4,
        background: `${p.color}22`,
        color: p.color,
        fontSize: 10,
        fontFamily: MONO,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontWeight: 600,
      }}
    >
      {p.name}
    </span>
  );
};

const Poster = ({ show, size = 64 }) => (
  <div
    style={{
      width: size,
      height: size * 1.5,
      borderRadius: 8,
      background: `linear-gradient(135deg, ${show.posterColor} 0%, ${show.accent}33 100%)`,
      display: 'flex',
      alignItems: 'flex-end',
      padding: 8,
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
      }}
    />
    <span
      style={{
        position: 'relative',
        fontFamily: MONO,
        fontSize: size > 100 ? 11 : 9,
        color: show.accent,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 700,
        lineHeight: 1.1,
      }}
    >
      {show.title.split(' ').slice(0, 2).join(' ')}
    </span>
  </div>
);

const ProgressBar = ({ pct }) => (
  <div
    style={{
      height: 3,
      width: '100%',
      background: COLORS.border,
      borderRadius: 2,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        height: '100%',
        width: `${pct}%`,
        background: COLORS.accent,
        boxShadow: pct > 0 ? `0 0 8px ${COLORS.accent}` : 'none',
        transition: 'width 0.3s ease',
      }}
    />
  </div>
);

const ShowRow = ({ show, onClick }) => {
  const pct = progressPct(show);
  const next = nextEpisodeLabel(show);
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        gap: 14,
        padding: 12,
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        color: COLORS.text,
        fontFamily: SANS,
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = COLORS.borderStrong)
      }
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
    >
      <Poster show={show} size={56} />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 15,
              marginBottom: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {show.title}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <PlatformBadge platform={show.platform} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: COLORS.textDim,
              }}
            >
              {next}
            </span>
          </div>
        </div>
        <div>
          <ProgressBar pct={pct} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 6,
              fontSize: 11,
              fontFamily: MONO,
              color: COLORS.textDim,
            }}
          >
            <span>
              {watchedCount(show)} / {totalEpisodes(show)} ep
            </span>
            <span
              style={{ color: pct === 100 ? COLORS.accent : COLORS.textDim }}
            >
              {pct}%
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

// ----------------------- SKJERMER -----------------------

const HomeScreen = ({ library, onSelect, onGoToSearch }) => {
  const continueWatching = library.filter(
    (s) => watchedCount(s) > 0 && progressPct(s) < 100
  );
  const upNext = library.filter((s) => watchedCount(s) === 0);
  const completed = library.filter((s) => progressPct(s) === 100);

  return (
    <div style={{ padding: '0 16px 100px' }}>
      {/* Header */}
      <div
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.2em',
              color: COLORS.textDim,
              marginBottom: 4,
            }}
          >
            BIBLIOTEK
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
              color: COLORS.text,
            }}
          >
            Hva er nå?
          </h1>
        </div>
        <button
          style={{
            background: 'transparent',
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: 10,
            color: COLORS.textMuted,
            cursor: 'pointer',
          }}
        >
          <Bell size={18} />
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
          marginBottom: 24,
        }}
      >
        {[
          { label: 'Aktive', value: continueWatching.length, accent: true },
          { label: 'Ukekt', value: upNext.length },
          { label: 'Fullført', value: completed.length },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: 12,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: stat.accent ? COLORS.accent : COLORS.text,
                fontFamily: MONO,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 10,
                fontFamily: MONO,
                color: COLORS.textDim,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: 2,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Fortsett å se */}
      {continueWatching.length > 0 && (
        <Section title="FORTSETT Å SE">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {continueWatching.map((show) => (
              <ShowRow
                key={show.id}
                show={show}
                onClick={() => onSelect(show.id)}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Nye i lista */}
      {upNext.length > 0 && (
        <Section title="IKKE STARTET">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upNext.map((show) => (
              <ShowRow
                key={show.id}
                show={show}
                onClick={() => onSelect(show.id)}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Fullført */}
      {completed.length > 0 && (
        <Section title="FULLFØRT">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {completed.map((show) => (
              <ShowRow
                key={show.id}
                show={show}
                onClick={() => onSelect(show.id)}
              />
            ))}
          </div>
        </Section>
      )}

      {library.length === 0 && <EmptyState onAction={onGoToSearch} />}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    <div
      style={{
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: '0.2em',
        color: COLORS.textDim,
        marginBottom: 12,
        fontWeight: 600,
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

const EmptyState = ({ onAction }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '60px 20px',
      color: COLORS.textMuted,
    }}
  >
    <Tv size={40} style={{ opacity: 0.4, marginBottom: 16 }} />
    <h3 style={{ color: COLORS.text, marginBottom: 8 }}>Tomt bibliotek</h3>
    <p style={{ fontSize: 14, marginBottom: 20 }}>
      Søk og legg til seriene du følger.
    </p>
    <button
      onClick={onAction}
      style={{
        background: COLORS.accent,
        color: COLORS.bg,
        border: 'none',
        padding: '12px 24px',
        borderRadius: 8,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: SANS,
      }}
    >
      Søk etter serier
    </button>
  </div>
);

const SearchScreen = ({ library, onAdd, onSelect }) => {
  const [query, setQuery] = useState('');
  const libraryIds = useMemo(
    () => new Set(library.map((s) => s.id)),
    [library]
  );
  const all = [...CATALOG, ...library];
  const filtered = query
    ? all.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
    : CATALOG;

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div style={{ paddingTop: 24, paddingBottom: 16 }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.2em',
            color: COLORS.textDim,
            marginBottom: 4,
          }}
        >
          OPPDAG
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 20px',
            color: COLORS.text,
          }}
        >
          Finn neste serie
        </h1>

        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: COLORS.textDim,
            }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk etter tittel..."
            style={{
              width: '100%',
              padding: '12px 14px 12px 42px',
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              color: COLORS.text,
              fontSize: 15,
              fontFamily: SANS,
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
            onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
          />
        </div>
      </div>

      <Section title={query ? `${filtered.length} TREFF` : 'ANBEFALT'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((show) => {
            const inLibrary = libraryIds.has(show.id);
            return (
              <div
                key={show.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: 12,
                  background: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  alignItems: 'center',
                }}
              >
                <Poster show={show} size={56} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: COLORS.text,
                      marginBottom: 4,
                    }}
                  >
                    {show.title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      marginBottom: 6,
                    }}
                  >
                    <PlatformBadge platform={show.platform} />
                    <span
                      style={{
                        fontSize: 11,
                        color: COLORS.textDim,
                        fontFamily: MONO,
                      }}
                    >
                      {show.year}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.textMuted,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {show.overview}
                  </div>
                </div>
                <button
                  onClick={() => (inLibrary ? onSelect(show.id) : onAdd(show))}
                  style={{
                    background: inLibrary ? 'transparent' : COLORS.accent,
                    color: inLibrary ? COLORS.accent : COLORS.bg,
                    border: inLibrary ? `1px solid ${COLORS.accent}` : 'none',
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  title={inLibrary ? 'Åpne' : 'Legg til'}
                >
                  {inLibrary ? <Check size={18} /> : <Plus size={18} />}
                </button>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

const DetailScreen = ({ show, onBack, onToggleEpisode, onMarkSeason }) => {
  const pct = progressPct(show);
  const next = nextEpisodeLabel(show);

  return (
    <div style={{ padding: '0 0 100px' }}>
      {/* Hero */}
      <div
        style={{
          padding: '16px 16px 24px',
          background: `linear-gradient(180deg, ${show.posterColor}88 0%, ${COLORS.bg} 100%)`,
          position: 'relative',
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: 8,
            color: COLORS.text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <Poster show={show} size={100} />
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <h1
              style={{
                fontSize: 24,
                fontWeight: 700,
                margin: '0 0 8px',
                color: COLORS.text,
                lineHeight: 1.1,
              }}
            >
              {show.title}
            </h1>
            <div
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <PlatformBadge platform={show.platform} />
              <span
                style={{
                  fontSize: 12,
                  color: COLORS.textDim,
                  fontFamily: MONO,
                }}
              >
                {show.year}
              </span>
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: COLORS.textMuted,
            margin: '0 0 20px',
          }}
        >
          {show.overview}
        </p>

        {/* Progress card */}
        <div
          style={{
            padding: 16,
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  color: COLORS.textDim,
                  letterSpacing: '0.15em',
                  marginBottom: 4,
                }}
              >
                NESTE
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: MONO,
                  color: COLORS.accent,
                }}
              >
                {next}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: MONO,
                  color: COLORS.text,
                }}
              >
                {pct}%
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.textDim,
                  fontFamily: MONO,
                }}
              >
                {watchedCount(show)} / {totalEpisodes(show)}
              </div>
            </div>
          </div>
          <ProgressBar pct={pct} />
        </div>

        {show.nextRelease && (
          <div
            style={{
              marginTop: 12,
              padding: '10px 14px',
              background: `${COLORS.accent}15`,
              border: `1px solid ${COLORS.accent}33`,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              color: COLORS.accent,
              fontFamily: MONO,
            }}
          >
            <Sparkles size={14} />
            Ny episode{' '}
            {new Date(show.nextRelease).toLocaleDateString('nb-NO', {
              day: 'numeric',
              month: 'long',
            })}
          </div>
        )}
      </div>

      {/* Sesonger */}
      <div style={{ padding: '0 16px' }}>
        {show.seasons.map((season) => {
          const seen = show.watched[season.number] || 0;
          return (
            <div key={season.number} style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: COLORS.text,
                    }}
                  >
                    Sesong {season.number}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: MONO,
                      color: COLORS.textDim,
                      marginTop: 2,
                    }}
                  >
                    {seen} av {season.episodes} sett
                  </div>
                </div>
                <button
                  onClick={() => onMarkSeason(show.id, season.number)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.textMuted,
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontFamily: MONO,
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}
                >
                  {seen === season.episodes ? 'FJERN ALLE' : 'MARKER ALLE'}
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 6,
                }}
              >
                {Array.from({ length: season.episodes }, (_, i) => {
                  const epNum = i + 1;
                  const isWatched = epNum <= seen;
                  return (
                    <button
                      key={epNum}
                      onClick={() =>
                        onToggleEpisode(show.id, season.number, epNum)
                      }
                      style={{
                        aspectRatio: '1',
                        background: isWatched ? COLORS.accent : COLORS.bgCard,
                        border: `1px solid ${
                          isWatched ? COLORS.accent : COLORS.border
                        }`,
                        borderRadius: 8,
                        color: isWatched ? COLORS.bg : COLORS.textMuted,
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: MONO,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}
                    >
                      {epNum}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CalendarScreen = ({ library }) => {
  const upcoming = library
    .filter((s) => s.nextRelease)
    .sort((a, b) => new Date(a.nextRelease) - new Date(b.nextRelease));

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div style={{ paddingTop: 24, paddingBottom: 16 }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.2em',
            color: COLORS.textDim,
            marginBottom: 4,
          }}
        >
          KALENDER
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 24px',
            color: COLORS.text,
          }}
        >
          Kommende episoder
        </h1>
      </div>

      {upcoming.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 60,
            color: COLORS.textMuted,
          }}
        >
          <Calendar size={40} style={{ opacity: 0.4, marginBottom: 16 }} />
          <p>Ingen kjente premieredatoer ennå.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {upcoming.map((show) => {
            const date = new Date(show.nextRelease);
            const days = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));
            return (
              <div
                key={show.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: 14,
                  background: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 60,
                    textAlign: 'center',
                    padding: '8px 0',
                    background: COLORS.bgElevated,
                    borderRadius: 8,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: COLORS.textDim,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {date.toLocaleDateString('nb-NO', { month: 'short' })}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.accent,
                      fontFamily: MONO,
                    }}
                  >
                    {date.getDate()}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: COLORS.text,
                      marginBottom: 4,
                    }}
                  >
                    {show.title}
                  </div>
                  <div
                    style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                  >
                    <PlatformBadge platform={show.platform} />
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        color: COLORS.textDim,
                      }}
                    >
                      om {days} dager
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ----------------------- BUNNNAVIGASJON -----------------------

const BottomNav = ({ active, onChange }) => {
  const tabs = [
    { id: 'home', label: 'Hjem', icon: Home },
    { id: 'search', label: 'Søk', icon: Search },
    { id: 'calendar', label: 'Kalender', icon: Calendar },
    { id: 'profile', label: 'Meg', icon: User },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(10,10,15,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${COLORS.border}`,
        display: 'flex',
        padding: '10px 0 24px',
        zIndex: 50,
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              padding: '8px 0',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              color: isActive ? COLORS.accent : COLORS.textDim,
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ----------------------- PROFIL (placeholder) -----------------------

const ProfileScreen = ({ library }) => {
  const totalEps = library.reduce((sum, s) => sum + watchedCount(s), 0);
  const totalHours = Math.round(totalEps * 0.75);

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div style={{ paddingTop: 24, paddingBottom: 16 }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.2em',
            color: COLORS.textDim,
            marginBottom: 4,
          }}
        >
          PROFIL
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 24px',
            color: COLORS.text,
          }}
        >
          Statistikken din
        </h1>
      </div>

      <div
        style={{
          padding: 24,
          background: `linear-gradient(135deg, ${COLORS.bgCard} 0%, ${COLORS.accent}11 100%)`,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: '0.2em',
            color: COLORS.textDim,
            marginBottom: 8,
          }}
        >
          DENNE MÅNEDEN
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.accent,
            fontFamily: MONO,
            lineHeight: 1,
          }}
        >
          {totalHours}t
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textMuted,
            marginTop: 6,
          }}
        >
          {totalEps} episoder · {library.length} serier
        </div>
      </div>

      <div
        style={{
          padding: 20,
          background: COLORS.bgCard,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          textAlign: 'center',
          color: COLORS.textMuted,
          fontSize: 13,
        }}
      >
        <Sparkles
          size={20}
          style={{ marginBottom: 10, color: COLORS.accent }}
        />
        <div style={{ marginBottom: 4, color: COLORS.text, fontWeight: 600 }}>
          Premium kommer snart
        </div>
        <div>Push-varsler, anbefalinger og synk på tvers av enheter.</div>
      </div>
    </div>
  );
};

// ----------------------- APP -----------------------

export default function App() {
  const [library, setLibrary] = useState(INITIAL_LIBRARY);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedShow, setSelectedShow] = useState(null);

  const addShow = (show) => {
    if (library.some((s) => s.id === show.id)) return;
    setLibrary([...library, { ...show, watched: {} }]);
    setSelectedShow(show.id);
  };

  const toggleEpisode = (showId, season, ep) => {
    setLibrary((prev) =>
      prev.map((show) => {
        if (show.id !== showId) return show;
        const seen = show.watched[season] || 0;
        // Simpel logikk: klikk på en episode setter "sett til og med ep".
        // Klikk på sist sette episode angrer den.
        const newSeen = ep === seen ? ep - 1 : ep;
        return {
          ...show,
          watched: { ...show.watched, [season]: Math.max(0, newSeen) },
        };
      })
    );
  };

  const markSeason = (showId, season) => {
    setLibrary((prev) =>
      prev.map((show) => {
        if (show.id !== showId) return show;
        const total = show.seasons.find((s) => s.number === season).episodes;
        const seen = show.watched[season] || 0;
        return {
          ...show,
          watched: { ...show.watched, [season]: seen === total ? 0 : total },
        };
      })
    );
  };

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
        return <ProfileScreen library={library} />;
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

        {/* Bunnnavigasjon (skjul i detaljvisning er valgfritt – vi viser den alltid) */}
        <BottomNav
          active={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setSelectedShow(null);
          }}
        />
      </div>
    </div>
  );
}
