import { COLORS, SANS } from '../styles/tokens';
import { Tv } from 'lucide-react';

export const EmptyState = ({ onAction }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '60px 20px',
      color: COLORS.textMuted,
    }}
  >
    <Tv size={40} style={{ opacity: 0.4, marginBottom: 16 }} />
    <h3 style={{ color: COLORS.text, marginBottom: 8 }}>
      Bibliotekets ditt er tomt
    </h3>
    <p style={{ fontSize: 14, marginBottom: 20 }}>
      Søk opp seriene du følger, så ordner vi resten.
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
      Legg til første serie
    </button>
  </div>
);
