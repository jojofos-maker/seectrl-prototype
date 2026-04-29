import { COLORS, MONO } from '../styles/tokens';
import { Check } from 'lucide-react';

export const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(20,20,28,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${COLORS.accent}55`,
        boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 16px ${COLORS.accent}33`,
        padding: '10px 16px',
        borderRadius: 10,
        color: COLORS.text,
        fontSize: 13,
        fontFamily: MONO,
        letterSpacing: '0.02em',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 100,
        animation: 'toast-slide 0.25s ease-out',
        whiteSpace: 'nowrap',
      }}
    >
      <Check size={14} style={{ color: COLORS.accent }} />
      {message}
    </div>
  );
};
