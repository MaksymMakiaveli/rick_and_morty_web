<script lang="ts">
  import ArrowRight from 'lucide-svelte/icons/arrow-right';
  import type { WithoutChildren } from 'bits-ui';
  import { getEmblaContext } from './context.js';
  import { cn } from '@shared/utils/common.js';
  import { Button, type ButtonProps } from '@shared/ui-kit/button';

  let {
    ref = $bindable(null),
    class: className,
    variant = 'outline',
    size = 'icon',
    ...restProps
  }: WithoutChildren<ButtonProps> = $props();

  const emblaCtx = getEmblaContext('<Carousel.Next/>');
</script>

<Button
  {variant}
  {size}
  class={cn(
    'absolute size-8 touch-manipulation rounded-full',
    emblaCtx.orientation === 'horizontal'
      ? '-right-12 top-1/2 -translate-y-1/2'
      : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
    className,
  )}
  disabled={!emblaCtx.canScrollNext}
  onclick={emblaCtx.scrollNext}
  onkeydown={emblaCtx.handleKeyDown}
  bind:ref
  {...restProps}
>
  <ArrowRight class="size-4" />
  <span class="sr-only">Next slide</span>
</Button>
