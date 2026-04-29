import { useMemo } from 'react';
import { Bell } from 'lucide-react';
import { COLORS, MONO } from '../styles/tokens';
import { watchedCount, progressPct } from '../data/helpers';
import { ShowRow } from '../components/ShowRow';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';

export const HomeScreen = ({ library, onSelect, onGoToSearch }) => {
  const { continueWatching, upNext, completed } = useMemo(() => {
    const cw = library.filter(
      (s) => watchedCount(s) > 0 && progressPct(s) < 100
    );
    const un = library.filter((s) => watchedCount(s) === 0);
    const co = library.filter((s) => progressPct(s) === 100);
    return { continueWatching: cw, upNext: un, completed: co };
  }, [library]);

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
            MITT BIBLIOTEK
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
          aria-label="Varsler"
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
          { label: 'Følger', value: continueWatching.length, accent: true },
          { label: 'Ikke startet', value: upNext.length },
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

      {/* Ikke startet */}
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
