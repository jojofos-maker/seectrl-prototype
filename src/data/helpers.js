// ============================================================================
// Hjelpefunksjoner for serier
// Holdes rent funksjonelle for enkel testing
// ============================================================================

export const totalEpisodes = (show) =>
  show.seasons.reduce((sum, s) => sum + s.episodes, 0);

export const watchedCount = (show) =>
  Object.values(show.watched).reduce((sum, n) => sum + n, 0);

export const progressPct = (show) => {
  const total = totalEpisodes(show);
  return total === 0 ? 0 : Math.round((watchedCount(show) / total) * 100);
};

export const nextEpisodeLabel = (show) => {
  for (const season of show.seasons) {
    const seen = show.watched[season.number] || 0;
    if (seen < season.episodes) {
      return `S${season.number}E${seen + 1}`;
    }
  }
  return 'Fullført';
};

export const formatNorwegianDate = (dateString) =>
  new Date(dateString).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
  });

export const daysUntil = (dateString) =>
  Math.ceil((new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24));
