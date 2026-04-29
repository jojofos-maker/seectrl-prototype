import { COLORS, MONO } from '../styles/tokens';

export const Section = ({ title, children }) => (
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
