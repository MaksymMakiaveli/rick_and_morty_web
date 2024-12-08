<script lang="ts">
  import { SEASON_PATTERN } from '@entities/episode/constants/patterns';
  import { EpisodeCard } from '@entities/episode/ui/episode-card';
  import { type Episodes, getQueryStore } from '@shared/api/gql';
  import { Button } from '@shared/ui-kit/button';
  import { Spinner } from '@shared/ui-kit/spinner';
  import { gql } from '@urql/svelte';
  import type { PageData } from './$types';
  import TVIcon from '@assets/icons/tv.svg?component';
  import CalendarIcon from '@assets/icons/calendar.svg?component';
  import CharacterIcon from '@assets/icons/character.svg?component';
  import InfoIcon from '@assets/icons/info.svg?component';

  const { data }: { data: PageData } = $props();

  const seasonQuery = $derived(
    getQueryStore<{ episodes: Episodes }, { season: string }>({
      query: gql`
        query Season($season: String!) {
          episodes(filter: { episode: $season }) {
            results {
              id
              name
              episode
              air_date
              characters {
                id
              }
            }
          }
        }
      `,
      variables: {
        season: data.season,
      },
    }),
  );

  const firstEpisode = $derived($seasonQuery.data?.episodes?.results?.[0] || null);
  const participatingCharacters = $derived.by(() => {
    const characters = new Set();
    $seasonQuery.data?.episodes?.results?.forEach((episode) => {
      episode?.characters.forEach((character) => {
        characters.add(character?.id);
      });
    });
    return Array.from(characters);
  });
</script>

<div class="h-full py-6">
  {#if $seasonQuery.fetching}
    <div class="flex h-full items-center justify-center">
      <Spinner />
    </div>
  {:else if $seasonQuery.error}
    <div>{$seasonQuery.error.message}</div>
  {:else}
    <div>
      <div class="container flex flex-col gap-6 pb-16">
        <TVIcon class="size-18" />
        <h2 class="text-4xl font-bold">Season {parseInt(data.season.match(SEASON_PATTERN)?.[1] || '', 10)}</h2>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <CalendarIcon class="size-8" />
            <span class="text-2xl">{firstEpisode?.air_date}</span>
          </div>
          <div class="flex items-center gap-2">
            <CharacterIcon class="size-8" />
            <span class="text-2xl">
              {participatingCharacters.length}
              {participatingCharacters.length > 1 ? 'characters' : 'character'}
              took part in this season
            </span>
          </div>
        </div>
      </div>

      <hr class="border-t-2 border-t-ui-primary" />
      <div class="container pt-12">
        <div>
          <h3 class="text-3xl font-bold">Episodes</h3>
          <ul class="flex flex-wrap gap-4 pt-4">
            {#each $seasonQuery.data?.episodes?.results || [] as episode (episode?.id)}
              <li class="items flex">
                {#snippet action({ id }: { id: string })}
                  <Button
                    variant="link"
                    size="sm"
                    href="/seasons/{episode?.episode?.match(/S\d+/)?.[0]}/{id}"
                    data-sveltekit-preload-data="hover"
                  >
                    <InfoIcon class="size-6" />
                    <span>Read more</span>
                  </Button>
                {/snippet}
                <EpisodeCard
                  name={episode?.name || ''}
                  {action}
                  episode={episode?.episode || ''}
                  id={episode?.id || ''}
                />
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>
