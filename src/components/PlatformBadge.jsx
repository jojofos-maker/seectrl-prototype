import { STREAMING_PLATFORMS } from '../data/platforms';
import { MONO } from '../styles/tokens';

export const PlatformBadge = ({ platform }) => {
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
