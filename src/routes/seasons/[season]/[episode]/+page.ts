import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const episode = params?.episode;

  if (!episode || isNaN(Number(episode))) {
    error(400, { message: 'Invalid episode' });
  }

  return {
    episode: episode,
  };
};
