<script lang="ts">
  import { CompactCharacterCard } from '@entities/character/ui/compact-character-card';
  import { EpisodeCard } from '@entities/episode/ui/episode-card';
  import {
    getQueryStore,
    type Episodes,
    type FilterEpisode,
    type Characters,
    type FilterCharacter,
  } from '@shared/api/gql';
  import { Button } from '@shared/ui-kit/button';
  import InfoIcon from '@assets/icons/info.svg?component';
  import ArrowIcon from '@assets/icons/Arrow.svg?component';
  import { Spinner } from '@shared/ui-kit/spinner';
  import { gql } from '@urql/svelte';

  let charactersPage = $state(1);
  let episodesPage = $state(1);

  let episodes = $derived(
    getQueryStore<
      { episodes: Episodes },
      {
        page: number;
        filter: Partial<FilterEpisode> | null;
      }
    >({
      query: gql`
        query AllEpisodes($page: Int!, $filter: FilterEpisode) {
          episodes(page: $page, filter: $filter) {
            info {
              pages
              count
              next
              prev
            }
            results {
              id
              name
              episode
              characters {
                id
                name
              }
            }
          }
        }
      `,
      variables: {
        page: episodesPage,
        filter: null,
      },
    }),
  );
  let characters = $derived(
    getQueryStore<{ characters: Characters }, { page: number; filter: Partial<FilterCharacter> | null }>({
      query: gql`
        query AllCharacters($page: Int, $filter: FilterCharacter) {
          characters(page: $page, filter: $filter) {
            info {
              pages
              count
              next
              prev
            }
            results {
              id
              name
              species
              type
              image
              status
              location {
                id
                name
              }
            }
          }
        }
      `,
      variables: {
        page: charactersPage,
        filter: null,
      },
      context: {
        suspense: true,
      },
    }),
  );

  const charactersQueryOptions = $derived({
    isLoading: $characters?.fetching,
    hasError: Boolean($characters?.error),
    nextPage: $characters?.data?.characters?.info?.next || null,
    prevPage: $characters?.data?.characters?.info?.prev || null,
  });
  const episodesQueryOptions = $derived({
    isLoading: $episodes?.fetching,
    hasError: Boolean($episodes?.error),
    nextPage: $episodes?.data?.episodes?.info?.next || null,
    prevPage: $episodes?.data?.episodes?.info?.prev || null,
  });
</script>

<section class="h-full">
  <div class="container flex flex-col gap-8 py-8">
    <div class="flex flex-col justify-center gap-4">
      <div class="flex items-center gap-4 pl-14">
        <h6 class=" text-4xl font-bold">Characters</h6>
      </div>
      <div class="flex w-full">
        {#if $characters.fetching}
          <div class="flex w-full items-center justify-center py-12">
            <Spinner />
          </div>
        {:else if $characters.error}
          <div>{$characters.error.message}</div>
        {:else}
          <div class="relative flex">
            <div class="flex flex-col justify-center">
              <Button
                disabled={charactersQueryOptions.isLoading || !charactersQueryOptions.prevPage}
                onclick={() => {
                  if (charactersQueryOptions.prevPage) charactersPage = charactersQueryOptions.prevPage;
                }}
                class="h-full px-4"
                variant="ghost"
              >
                <ArrowIcon class="size-6 rotate-180 transform" />
              </Button>
            </div>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {#each $characters?.data?.characters?.results || [] as character (character?.id)}
                <CompactCharacterCard
                  class="rounded-md bg-ui-secondary"
                  name={character?.name || ''}
                  imgSrc={character?.image || ''}
                  status={character?.status || ''}
                >
                  {#snippet action()}
                    <Button
                      variant="link"
                      size="sm"
                      href="/characters/{character?.id}"
                      data-sveltekit-preload-data="hover"
                      class="h-[24px] px-0"
                    >
                      <InfoIcon class="size-6" />
                      <span>Read more</span>
                    </Button>
                  {/snippet}
                </CompactCharacterCard>
              {/each}
            </div>
            <div class="flex flex-col justify-center">
              <Button
                disabled={charactersQueryOptions.isLoading || !charactersQueryOptions.nextPage}
                onclick={() => {
                  if (charactersQueryOptions.nextPage) charactersPage = charactersQueryOptions.nextPage;
                }}
                class="h-full px-4"
                variant="ghost"
              >
                <ArrowIcon class="size-6" />
              </Button>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class="flex flex-col justify-center gap-4">
      <div class="flex items-center gap-4 pl-14">
        <h6 class=" text-4xl font-bold">Episodes</h6>
      </div>
      <div class="flex w-full">
        {#if $episodes.fetching}
          <div class="flex w-full items-center justify-center py-12">
            <Spinner />
          </div>
        {:else if $episodes.error}
          <div>{$episodes.error.message}</div>
        {:else}
          <div class="relative flex">
            <div class="flex flex-col justify-center">
              <Button
                disabled={episodesQueryOptions.isLoading || !episodesQueryOptions.prevPage}
                onclick={() => {
                  if (episodesQueryOptions.prevPage) episodesPage = episodesQueryOptions.prevPage;
                }}
                class="h-full px-4"
                variant="ghost"
              >
                <ArrowIcon class="size-6 rotate-180 transform" />
              </Button>
            </div>
            <div class="flex flex-wrap justify-center gap-4">
              {#each $episodes?.data?.episodes?.results || [] as episode (episode?.id)}
                <EpisodeCard
                  class="rounded-md bg-ui-secondary"
                  name={episode?.name || ''}
                  episode={episode?.episode || ''}
                  id={episode?.id || ''}
                >
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
              {/each}
            </div>
            <div class="flex flex-col justify-center">
              <Button
                disabled={episodesQueryOptions.isLoading || !episodesQueryOptions.nextPage}
                onclick={() => {
                  if (episodesQueryOptions.nextPage) episodesPage = episodesQueryOptions.nextPage;
                }}
                class="h-full px-4"
                variant="ghost"
              >
                <ArrowIcon class="size-6" />
              </Button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
