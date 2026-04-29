import { Sparkles, RotateCcw } from 'lucide-react';
import { COLORS, MONO } from '../styles/tokens';
import { watchedCount } from '../data/helpers';

export const ProfileScreen = ({ library, onReset }) => {
  const totalEps = library.reduce((sum, s) => sum + watchedCount(s), 0);
  // Antagelse: gjennomsnittlig 45 min per episode
  const totalHours = Math.round((totalEps * 45) / 60);

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
          MIN STATISTIKK
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 24px',
            color: COLORS.text,
          }}
        >
          Du har sett
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
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.accent,
            fontFamily: MONO,
            lineHeight: 1,
          }}
        >
          {totalHours} timer
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textMuted,
            marginTop: 8,
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
          marginBottom: 16,
        }}
      >
        <Sparkles
          size={20}
          style={{ marginBottom: 10, color: COLORS.accent }}
        />
        <div
          style={{
            marginBottom: 4,
            color: COLORS.text,
            fontWeight: 600,
          }}
        >
          Premium kommer snart
        </div>
        <div>
          Push-varsler, anbefalinger og synk på tvers av enheter.
        </div>
      </div>

      {/* Tilbakestill-knapp — kun for prototype, fjernes i MVP */}
      <button
        onClick={() => {
          if (
            window.confirm(
              'Tilbakestill prototypen til startposisjon? All progresjon nullstilles.'
            )
          ) {
            onReset();
          }
        }}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'transparent',
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          color: COLORS.textDim,
          fontSize: 12,
          fontFamily: MONO,
          letterSpacing: '0.05em',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <RotateCcw size={14} />
        TILBAKESTILL PROTOTYPE
      </button>
      <div
        style={{
          textAlign: 'center',
          fontSize: 11,
          color: COLORS.textDim,
          marginTop: 8,
          fontFamily: MONO,
        }}
      >
        Kun under brukertesting
      </div>
    </div>
  );
};
