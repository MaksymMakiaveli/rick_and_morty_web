<script lang="ts" module>
  import type { WithElementRef } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import TvIcon from '@assets/icons/tv.svg?component';

  export type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    id: string;
    name: string;
    episode: string;
    action?: Snippet<[{ id: string }]>;
  };
</script>

<script lang="ts">
  import { cn } from '@shared/utils/common.js';

  let { ref = $bindable(null), class: className, id, name, episode, action, ...restProps }: Props = $props();
</script>

<div
  bind:this={ref}
  class={cn('flex w-[180px] flex-col items-center justify-between rounded-2xl bg-[#313234] p-4 text-center', className)}
  {...restProps}
>
  <div class="flex-col items-center text-center">
    <TvIcon class="mx-auto size-12" />
    <div class="flex flex-col items-center gap-1 pt-2">
      <p class="inline-flex rounded-md bg-primary p-2 text-center text-primary-foreground">
        {episode}
      </p>
      <p class=" text-lg font-semibold">{name}</p>
    </div>
  </div>
  {#if action}
    <div class="flex items-center pt-4">
      {@render action?.({ id })}
    </div>
  {/if}
</div>
