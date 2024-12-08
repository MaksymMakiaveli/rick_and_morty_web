<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  export type Props = HTMLAttributes<HTMLDivElement> & {
    imgSrc: string;
    name: string;
    status: string;
    action?: Snippet;
  };
</script>

<script lang="ts">
  import PulseIcon from '@assets/icons/pulse.svg?component';
  import { cn } from '@shared/utils/common';

  const { imgSrc, name, status, class: className, action, ...restProps }: Props = $props();
</script>

<div class={cn('flex gap-4 p-3', className)} {...restProps}>
  <div class="size-24 shrink-0 overflow-hidden rounded-md">
    <img src={imgSrc} alt={name} class="size-full object-cover" />
  </div>
  <div class="flex flex-col gap-2 truncate">
    <p class="truncate text-xl font-bold">{name}</p>
    <ul class="flex flex-col gap-2">
      <li class="flex items-center gap-2">
        <PulseIcon class="size-7" />
        <span class="text-lg">{status}</span>
      </li>
      {#if action}
        <li>
          {@render action()}
        </li>
      {/if}
    </ul>
  </div>
</div>
