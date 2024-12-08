<script lang="ts">
  import { AllCharactersDocument, getQueryStore, type AllCharactersQuery } from '@shared/api/gql';
  import { Button } from '@shared/ui-kit/button';
  import { Carousel } from '@shared/ui-kit/carousel';
  import { CharacterCard } from '@entities/character/ui/character-card';
  import InfoIcon from '@assets/icons/info.svg?component';

  let charactersPage = $state(1);

  let characters = $derived(
    getQueryStore<AllCharactersQuery>({
      query: AllCharactersDocument,
      variables: {
        page: charactersPage,
        filter: null,
      },
    }),
  );
</script>

{#snippet action(id: string)}
  <Button class="size-6" variant="link" size="icon" href="/characters/{id}" data-sveltekit-preload-data="hover">
    <InfoIcon class="size-6" />
  </Button>
{/snippet}

<section class="h-full">
  <div class="container py-8">
    {#if $characters?.data?.characters?.results && $characters.data.characters.results.length > 0}
      <div class="flex flex-col justify-center gap-4">
        <h6 class="text-4xl font-bold">Characters</h6>
        <Carousel
          opts={{
            align: 'center',
          }}
        >
          <Carousel.Content>
            {#each $characters.data.characters.results as character (character?.id)}
              <Carousel.Item class=" flex basis-full justify-center md:basis-1/4">
                <CharacterCard
                  class="shrink-0"
                  id={character?.id || ''}
                  name={character?.name || ''}
                  imgSrc={character?.image || ''}
                  location={character?.location?.name || ''}
                  species={character?.species || ''}
                  status={character?.status || ''}
                  {action}
                />
              </Carousel.Item>
            {/each}
          </Carousel.Content>
        </Carousel>
      </div>
    {/if}
  </div>
</section>
