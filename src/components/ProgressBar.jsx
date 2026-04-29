import { COLORS } from '../styles/tokens';

export const ProgressBar = ({ pct }) => (
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
