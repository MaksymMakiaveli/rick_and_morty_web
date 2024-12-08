import { SEASON_PATTERN } from '../constants/patterns';

export const isCorrectSeasonValue = (season: string) => SEASON_PATTERN.test(season);
