<script lang="ts" module>
  import type { CardProps } from '@shared/ui-kit/card';

  export type Props = CardProps & {
    id: string;
    imgSrc: string;
    name: string;
    species: string;
    location: string;
    status: string;
    action?: Snippet<[string]>;
  };
</script>

<script lang="ts">
  import { cn } from '@shared/utils/common';
  import { Card } from '@shared/ui-kit/card';
  import PulseIcon from '@assets/icons/pulse.svg?component';
  import UfoIcon from '@assets/icons/ufo.svg?component';
  import PlanetIcon from '@assets/icons/planet.svg?component';
  import type { Snippet } from 'svelte';

  const {
    id,
    imgSrc,
    name,
    species,
    location,
    status,
    class: className,
    action,
    ...restProps
  }: {
    id: string;
    imgSrc: string;
    name: string;
    species: string;
    location: string;
    status: string;
    class?: string;
    action?: Snippet<[string]>;
  } = $props();
</script>

<Card
  class={cn('flex min-h-[400px] w-full max-w-[294px] flex-col border-0 bg-[#313234] p-4', className)}
  {...restProps}
>
  <Card.Header class="h-1/2 basis-1/2 p-0">
    <div class="overflow-hidden rounded-lg">
      <img src={imgSrc} alt={name} class="size-full object-cover" />
    </div>
  </Card.Header>
  <Card.Content class="flex h-1/2 basis-1/2 flex-col justify-between p-0 pt-4">
    <div>
      <h6 class="text-xl font-bold">{name}</h6>
      <ul class="flex flex-col gap-2 pt-4">
        <li class="flex items-center gap-2">
          <PulseIcon class="size-4 text-green-400" />
          <span>{status}</span>
        </li>
        <li class="flex items-center gap-2">
          <UfoIcon class="size-4" />
          <span>{species}</span>
        </li>
        <li class="flex items-center gap-2">
          <PlanetIcon class="size-4" />
          <span>{location}</span>
        </li>
      </ul>
    </div>
    {#if action}
      <div class="flex justify-end p-0 pt-4">
        {@render action?.(id)}
      </div>
    {/if}
  </Card.Content>
</Card>
