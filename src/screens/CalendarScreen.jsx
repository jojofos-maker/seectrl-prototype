import { Calendar as CalendarIcon } from 'lucide-react';
import { COLORS, MONO } from '../styles/tokens';
import { daysUntil } from '../data/helpers';
import { PlatformBadge } from '../components/PlatformBadge';

export const CalendarScreen = ({ library }) => {
  const upcoming = library
    .filter((s) => s.nextRelease)
    .sort((a, b) => new Date(a.nextRelease) - new Date(b.nextRelease));

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
          KALENDER
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 24px',
            color: COLORS.text,
          }}
        >
          Kommende episoder
        </h1>
      </div>

      {upcoming.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: COLORS.textMuted,
          }}
        >
          <CalendarIcon
            size={40}
            style={{ opacity: 0.4, marginBottom: 16 }}
          />
          <h3 style={{ color: COLORS.text, marginBottom: 8 }}>
            Ingen episoder på vei
          </h3>
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>
            Vi melder fra her når neste episode er datert.
            <br />
            Inntil da kan du fortsette med det du allerede følger.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {upcoming.map((show) => {
            const date = new Date(show.nextRelease);
            const days = daysUntil(show.nextRelease);
            const dayLabel =
              days <= 0
                ? 'i dag'
                : days === 1
                ? 'i morgen'
                : `om ${days} dager`;
            return (
              <div
                key={show.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: 14,
                  background: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 60,
                    textAlign: 'center',
                    padding: '8px 0',
                    background: COLORS.bgElevated,
                    borderRadius: 8,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: COLORS.textDim,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {date.toLocaleDateString('nb-NO', { month: 'short' })}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.accent,
                      fontFamily: MONO,
                    }}
                  >
                    {date.getDate()}
                  </div>
                </div>
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
                      {dayLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
