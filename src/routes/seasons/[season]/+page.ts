import { isCorrectSeasonValue } from '@entities/episode/lib/guards';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const season = params?.season?.toUpperCase();

  if (!season || !isCorrectSeasonValue(season)) {
    error(400, { message: 'Invalid season' });
  }

  return {
    season,
  };
};
