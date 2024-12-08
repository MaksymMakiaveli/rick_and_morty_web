<script lang="ts">
  import Logo from '@assets/images/logo.webp';
  import IconSearch from '@assets/icons/search.svg?component';
  import { type Character, type Characters, type Episode, type Episodes, getQueryStore } from '@shared/api/gql';
  import { Input } from '@shared/ui-kit/input';
  import { Popover } from '@shared/ui-kit/popover';
  import { Spinner } from '@shared/ui-kit/spinner';
  import { gql } from '@urql/svelte';
  import { ScrollArea } from '@shared/ui-kit/scroll-area';

  type NormalizedSearchResult = (Character & { type: 'character' }) | (Episode & { type: 'episode' });

  let search = $state('');
  let isDirty = $state(false);
  let searchInput = $state<HTMLInputElement | null>(null);

  const isInvalidSearch = $derived(isDirty && search.length < 3);

  const searchResult = $derived(
    getQueryStore<{ characters: Characters; episodes: Episodes }, { search: string }>({
      query: gql`
        query Search($search: String!) {
          characters(filter: { name: $search }) {
            info {
              count
              next
            }
            results {
              id
              name
              image
            }
          }
          episodes(filter: { name: $search }) {
            info {
              count
            }
            results {
              id
              name
              episode
            }
          }
        }
      `,
      variables: {
        search,
      },
      pause: true,
    }),
  );

  const normalizedSearchResult = $derived.by((): NormalizedSearchResult[] => {
    const { episodes, characters } = $searchResult?.data || {};

    return [
      ...(episodes?.results || []).map((episode) => ({
        ...episode,
        type: 'episode',
      })),
      ...(characters?.results || []).map((character) => ({
        ...character,
        type: 'character',
      })),
    ] as NormalizedSearchResult[];
  });

  let isOpen = $state(false);

  function onInput() {
    isDirty = true;
  }

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (isInvalidSearch) return;

    searchResult.reexecute({});
    isOpen = true;
  }

  $effect(() => {
    console.log($searchResult);
  });
</script>

<header>
  <div class="container flex flex-col items-center justify-between gap-3 px-3 py-7 md:flex-row">
    <a href="/">
      <img src={Logo} alt="logo" />
    </a>
    <Popover.Root open={isOpen} onOpenChange={(open) => (isOpen = open)}>
      <form onsubmit={onSubmit} class="relative w-full max-w-[330px]">
        <Input
          name="search"
          bind:ref={searchInput}
          bind:value={search}
          aria-invalid={isInvalidSearch}
          class="h-12 pr-13"
          oninput={onInput}
          autocomplete="off"
        />
        <Popover.Trigger
          disabled={isInvalidSearch || $searchResult.fetching || !isDirty}
          type="submit"
          class="absolute inset-y-0 right-0 flex h-full w-12 items-center justify-center rounded-l-none border-l border-l-input disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconSearch class="size-6 text-white" />
        </Popover.Trigger>
      </form>
      <Popover.Content
        class="border-grey-200 z-30 h-60 w-[328px] bg-black p-0"
        sideOffset={8}
        trapFocus={false}
        align="end"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          searchInput?.focus();
        }}
      >
        <div class="flex h-full w-full flex-col">
          {#if $searchResult.fetching}
            <div class="flex flex-1 flex-col items-center justify-center">
              <Spinner />
            </div>
          {:else if normalizedSearchResult.length === 0}
            <div class="flex flex-1 flex-col items-center justify-center">No results found</div>
          {:else}
            <ScrollArea>
              <ul>
                {#each normalizedSearchResult as result, idx (idx)}
                  <li class="border-b border-b-gray-600 px-4 py-3 last:border-b-0">
                    {#if result.type === 'character'}
                      <a class="flex items-center gap-2 overflow-hidden rounded-md" href="/characters/{result.id}">
                        <img src={result.image} alt={result.name} class="size-12" />
                        <span>{result.name} </span>
                      </a>
                    {/if}
                    {#if result.type === 'episode'}
                      <a href="/seasons/{result?.episode?.match(/S\d+/)?.[0]}/{result.id}">
                        <span>{result.name} | {result.episode}</span>
                      </a>
                    {/if}
                  </li>
                {/each}
              </ul>
            </ScrollArea>
          {/if}
        </div>
      </Popover.Content>
    </Popover.Root>
  </div>
</header>
