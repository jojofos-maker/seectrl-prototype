import { COLORS, MONO } from '../styles/tokens';
import { Home, Search, Calendar, User } from 'lucide-react';

const TABS = [
  { id: 'home', label: 'Hjem', icon: Home },
  { id: 'search', label: 'Søk', icon: Search },
  { id: 'calendar', label: 'Kalender', icon: Calendar },
  { id: 'profile', label: 'Meg', icon: User },
];

export const BottomNav = ({ active, onChange }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(10,10,15,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${COLORS.border}`,
      display: 'flex',
      padding: '10px 0 24px',
      zIndex: 50,
    }}
  >
    {TABS.map((tab) => {
      const Icon = tab.icon;
      const isActive = active === tab.id;
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            padding: '8px 0',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: isActive ? COLORS.accent : COLORS.textDim,
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
        >
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
          <span>{tab.label}</span>
        </button>
      );
    })}
  </div>
);
