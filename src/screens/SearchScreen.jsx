import { useState, useMemo } from 'react';
import { Search as SearchIcon, Check, Plus } from 'lucide-react';
import { COLORS, MONO, SANS } from '../styles/tokens';
import { CATALOG } from '../data/library';
import { Poster } from '../components/Poster';
import { PlatformBadge } from '../components/PlatformBadge';
import { Section } from '../components/Section';

export const SearchScreen = ({ library, onAdd, onSelect }) => {
  const [query, setQuery] = useState('');
  const libraryIds = useMemo(
    () => new Set(library.map((s) => s.id)),
    [library]
  );

  // Bug fra v1 fikset:
  // - Når ingen query: vis kun katalog-serier som IKKE er i biblioteket
  // - Med query: søk i HELE katalogen + biblioteket, men dedupliser
  const filtered = useMemo(() => {
    if (query) {
      const seen = new Set();
      return [...CATALOG, ...library]
        .filter((s) => {
          if (seen.has(s.id)) return false;
          seen.add(s.id);
          return s.title.toLowerCase().includes(query.toLowerCase());
        });
    }
    return CATALOG.filter((s) => !libraryIds.has(s.id));
  }, [query, library, libraryIds]);

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
          <SearchIcon
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
            placeholder="Søk etter en serie"
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

      <Section
        title={
          query
            ? filtered.length === 0
              ? 'INGEN TREFF'
              : `${filtered.length} TREFF`
            : 'POPULÆRE NÅ'
        }
      >
        {query && filtered.length === 0 ? (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: COLORS.textMuted,
              fontSize: 14,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
            }}
          >
            <div style={{ marginBottom: 6, color: COLORS.text }}>
              Ingen treff på «{query}»
            </div>
            <div style={{ fontSize: 13 }}>
              I full versjon søker vi i hele TMDB-databasen.
            </div>
          </div>
        ) : (
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
                    onClick={() =>
                      inLibrary ? onSelect(show.id) : onAdd(show)
                    }
                    style={{
                      background: inLibrary ? 'transparent' : COLORS.accent,
                      color: inLibrary ? COLORS.accent : COLORS.bg,
                      border: inLibrary
                        ? `1px solid ${COLORS.accent}`
                        : 'none',
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.15s',
                    }}
                    onMouseDown={(e) =>
                      (e.currentTarget.style.transform = 'scale(0.92)')
                    }
                    onMouseUp={(e) =>
                      (e.currentTarget.style.transform = 'scale(1)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'scale(1)')
                    }
                    aria-label={inLibrary ? 'Åpne' : 'Legg til'}
                  >
                    {inLibrary ? <Check size={18} /> : <Plus size={18} />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
};
