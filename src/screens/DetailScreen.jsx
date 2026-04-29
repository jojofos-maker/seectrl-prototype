import { ChevronLeft, Sparkles, Info } from 'lucide-react';
import { COLORS, MONO } from '../styles/tokens';
import {
  totalEpisodes,
  watchedCount,
  progressPct,
  nextEpisodeLabel,
  formatNorwegianDate,
} from '../data/helpers';
import { Poster } from '../components/Poster';
import { PlatformBadge } from '../components/PlatformBadge';
import { ProgressBar } from '../components/ProgressBar';

export const DetailScreen = ({
  show,
  onBack,
  onToggleEpisode,
  onMarkSeason,
}) => {
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
        {/* Tydeligere tilbakeknapp */}
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid rgba(255,255,255,0.15)`,
            borderRadius: 10,
            padding: '8px 12px 8px 8px',
            color: COLORS.text,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginBottom: 24,
            fontSize: 13,
            fontFamily: MONO,
            letterSpacing: '0.05em',
          }}
          aria-label="Tilbake"
        >
          <ChevronLeft size={18} />
          TILBAKE
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
                NESTE OPP
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
            Neste episode kommer {formatNorwegianDate(show.nextRelease)}
          </div>
        )}
      </div>

      {/* Sesonger */}
      <div style={{ padding: '0 16px' }}>
        {/* Hjelpetekst — vises bare hvis serien er fersk og ingen episoder er sett */}
        {watchedCount(show) === 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              padding: '10px 12px',
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              marginBottom: 16,
              fontSize: 12,
              color: COLORS.textMuted,
              lineHeight: 1.45,
            }}
          >
            <Info
              size={14}
              style={{
                color: COLORS.accent,
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            <div>
              Trykk på en episode for å markere alle frem til den som sett.
              Trykk igjen for å angre.
            </div>
          </div>
        )}

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
                  {seen === season.episodes ? 'ANGRE SESONG' : 'MARKER SESONG'}
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
                      aria-label={`Sesong ${season.number} episode ${epNum}${
                        isWatched ? ' (sett)' : ''
                      }`}
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
