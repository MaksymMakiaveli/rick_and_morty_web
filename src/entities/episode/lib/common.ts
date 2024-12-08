import { SEASON_EPISODE_PATTERN } from '../constants/patterns';

export const extractSeasonEpisode = (episode: string) => {
  const match = episode.match(SEASON_EPISODE_PATTERN);
  return match ? { season: parseInt(match[1], 10), episode: parseInt(match[2], 10) } : null;
};
