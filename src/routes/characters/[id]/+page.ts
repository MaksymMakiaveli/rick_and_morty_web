import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const id = params.id;

  if (!id || isNaN(Number(id))) {
    error(400, { message: 'Invalid id' });
  }

  return {
    id: Number(id),
  };
};
