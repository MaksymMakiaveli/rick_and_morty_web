<script lang="ts">
  import { CharacterCard } from '@entities/character/ui/character-card';
  import { Button } from '@shared/ui-kit/button';
  import TVIcon from '@assets/icons/tv.svg?component';
  import CalendarIcon from '@assets/icons/calendar.svg?component';
  import InfoIcon from '@assets/icons/info.svg?component';
  import QueueIcon from '@assets/icons/queue.svg?component';
  import { Spinner } from '@shared/ui-kit/spinner';
  import { gql } from '@urql/svelte';
  import type { PageData } from './$types';
  import { getQueryStore } from '@shared/api/gql';

  const { data }: { data: PageData } = $props();

  const episodeQuery = $derived(
    getQueryStore({
      query: gql`
        query Episode($id: ID!) {
          episode(id: $id) {
            id
            name
            episode
            air_date
            characters {
              id
              name
              species
              type
              status
              image
              gender
              location {
                name
              }
            }
          }
        }
      `,
      variables: {
        id: data.episode,
      },
    }),
  );

  const episode = $derived($episodeQuery.data?.episode);
</script>

<div class="h-full py-6">
  {#if $episodeQuery.fetching}
    <div class="flex h-full items-center justify-center">
      <Spinner />
    </div>
  {:else if $episodeQuery.error}
    <div>{$episodeQuery.error.message}</div>
  {:else}
    <div>
      <div class="container flex flex-col gap-6 pb-16">
        <TVIcon class="size-18" />
        <h2 class="text-4xl font-bold">{episode.name}</h2>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <CalendarIcon class="size-8" />
            <span class="text-2xl">{episode?.air_date}</span>
          </div>
          <div class="flex items-center gap-2">
            <QueueIcon class="size-8" />
            <span class="text-2xl">{episode?.episode}</span>
          </div>
        </div>
      </div>

      <hr class="border-t-2 border-t-ui-primary" />
      <div class="container pt-12">
        <div>
          <h3 class="text-3xl font-bold">Characters</h3>
          <ul class="flex flex-wrap gap-4 pt-4">
            {#each episode?.characters || [] as character (character?.id)}
              <li class="items flex">
                {#snippet action(id: string)}
                  <Button variant="link" size="sm" href="/characters/{id}" data-sveltekit-preload-data="hover">
                    <InfoIcon class="size-6" />
                    <span>Read more</span>
                  </Button>
                {/snippet}
                <CharacterCard
                  id={character?.id || ''}
                  name={character?.name || ''}
                  imgSrc={character?.image || ''}
                  location={character?.location?.name || ''}
                  species={character?.species || ''}
                  status={character?.status || ''}
                  {action}
                />
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>
