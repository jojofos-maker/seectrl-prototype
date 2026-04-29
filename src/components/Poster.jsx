import { MONO } from '../styles/tokens';

export const Poster = ({ show, size = 64 }) => (
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
