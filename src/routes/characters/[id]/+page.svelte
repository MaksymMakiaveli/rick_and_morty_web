<script lang="ts">
  import { EpisodeCard } from '@entities/episode/ui/episode-card';
  import { type Character, getQueryStore } from '@shared/api/gql';
  import { Button } from '@shared/ui-kit/button';
  import { Spinner } from '@shared/ui-kit/spinner';
  import { gql } from '@urql/svelte';
  import type { PageData } from './$types';
  import PulseIcon from '@assets/icons/pulse.svg?component';
  import UfoIcon from '@assets/icons/ufo.svg?component';
  import TVIcon from '@assets/icons/tv.svg?component';
  import GenderIcon from '@assets/icons/gender.svg?component';
  import InfoIcon from '@assets/icons/info.svg?component';

  let { data }: { data: PageData } = $props();

  let characterQuery = $derived(
    getQueryStore<{ character: Character }, { id: number }>({
      query: gql(`
      query Character($id: ID!) {
        character(id: $id) {
          id
          name
          status
          species
          type
          gender
          image
          location {
            name
          }
          episode {
            id
            name
            episode
          }
        }
      }
    `),
      variables: {
        id: data.id,
      },
    }),
  );

  const character = $derived($characterQuery.data?.character);
  const episodes = $derived($characterQuery.data?.character?.episode || []);
</script>

<div class="h-full py-6">
  {#if $characterQuery.fetching}
    <div class="flex h-full items-center justify-center">
      <Spinner />
    </div>
  {:else if $characterQuery.error}
    <div>{$characterQuery.error.message}</div>
  {:else}
    <div>
      <div class="container flex flex-col gap-12 pb-16 md:flex-row">
        <div class="aspect-square overflow-hidden rounded-2xl md:aspect-[1/1.3] md:w-[360px]">
          <img src={character?.image} alt={character?.name} class="size-full object-cover" />
        </div>
        <div class="flex flex-col gap-8">
          <h2 class=" text-4xl font-bold">{character?.name}</h2>
          <p class="flex items-center gap-2">
            <TVIcon class="size-8" />
            <span class="text-2xl">Participated in {episodes.length} episode{episodes.length > 1 ? 's' : ''}</span>
          </p>
          <ul class="flex gap-6 pt-4">
            <li class="flex items-center gap-2">
              <PulseIcon class="size-8 text-green-400" />
              <span class="text-2xl">{character?.status}</span>
            </li>
            <li class="flex items-center gap-2">
              <UfoIcon class="size-8" />
              <span class="text-2xl">{character?.species}</span>
            </li>
            <li class="flex items-center gap-2">
              <GenderIcon class="size-8" />
              <span class="text-2xl">{character?.gender}</span>
            </li>
          </ul>
        </div>
      </div>
      <hr class="border-t-2 border-t-ui-primary" />
      <div class="pt-12">
        <div class="container">
          <h3 class="text-3xl font-bold">Episodes</h3>
          <ul class="flex flex-wrap gap-4 pt-4">
            {#each episodes as episode (episode?.id)}
              <li class="items flex">
                <EpisodeCard name={episode?.name || ''} episode={episode?.episode || ''} id={episode?.id || ''}>
                  {#snippet action({ id })}
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
                </EpisodeCard>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>
