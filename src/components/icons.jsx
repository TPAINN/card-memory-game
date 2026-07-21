// Clean monochrome glyph set for the card faces — replaces the old emoji.
// Simple, distinct geometric + a few organic shapes, drawn in currentColor so
// they inherit ink (hidden/known) or accent (matched) from the card styles.
const SHAPES = {
  circle:   <circle cx="12" cy="12" r="8" />,
  square:   <rect x="4.5" y="4.5" width="15" height="15" rx="3.6" />,
  triangle: <polygon points="12,3.6 20,17.8 4,17.8" />,
  diamond:  <polygon points="12,3 21,12 12,21 3,12" />,
  star:     <polygon points="12,3 14.12,9.09 20.56,9.22 15.42,13.11 17.29,19.28 12,15.6 6.71,19.28 8.58,13.11 3.44,9.22 9.88,9.09" />,
  heart:    <path d="M12 21.1l-1.35-1.23C5.6 15.5 2.4 12.6 2.4 9.06 2.4 6.2 4.66 3.95 7.5 3.95c1.6 0 3.14.75 4.15 1.93 1.01-1.18 2.55-1.93 4.15-1.93 2.84 0 5.1 2.25 5.1 5.11 0 3.54-3.2 6.44-8.25 10.83L12 21.1z" />,
  hexagon:  <polygon points="12,3 19.79,7.5 19.79,16.5 12,21 4.21,16.5 4.21,7.5" />,
  bolt:     <polygon points="13.5,2.5 4,13.8 10.2,13.8 9,21.5 19,9.6 12.4,9.6" />,
  moon:     <path d="M15.6 3.2a9 9 0 1 0 5.3 8.1A7 7 0 0 1 15.6 3.2z" />,
  plus:     <path d="M10 3.5h4v6.5h6.5v4H14v6.5h-4V14H3.5v-4H10z" />,
  pentagon: <polygon points="12,3 20.56,9.22 17.29,19.28 6.71,19.28 3.44,9.22" />,
  octagon:  <polygon points="12,3 18.36,5.64 21,12 18.36,18.36 12,21 5.64,18.36 3,12 5.64,5.64" />,
};

// Ordered so the first 4 (easy) and first 8 (medium) stay maximally distinct.
export const ICON_IDS = [
  'circle', 'square', 'triangle', 'diamond',
  'star', 'heart', 'hexagon', 'bolt',
  'moon', 'plus', 'pentagon', 'octagon',
];

export function Glyph({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {SHAPES[name]}
    </svg>
  );
}

// Result-screen marks (win / lose) — clean line icons, no emoji.
export function ResultIcon({ win }) {
  return win ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19.5 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 7.5V12.5L15 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
