import { COLORS, MONO, SANS } from '../styles/tokens';
import {
  totalEpisodes,
  watchedCount,
  progressPct,
  nextEpisodeLabel,
} from '../data/helpers';
import { Poster } from './Poster';
import { PlatformBadge } from './PlatformBadge';
import { ProgressBar } from './ProgressBar';

export const ShowRow = ({ show, onClick }) => {
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
