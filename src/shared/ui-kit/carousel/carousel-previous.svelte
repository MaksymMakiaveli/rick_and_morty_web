<script lang="ts">
  import ArrowLeft from 'lucide-svelte/icons/arrow-left';
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

  const emblaCtx = getEmblaContext('<Carousel.Previous/>');
</script>

<Button
  {variant}
  {size}
  class={cn(
    'absolute size-8 touch-manipulation rounded-full',
    emblaCtx.orientation === 'horizontal'
      ? '-left-12 top-1/2 -translate-y-1/2'
      : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
    className,
  )}
  disabled={!emblaCtx.canScrollPrev}
  onclick={emblaCtx.scrollPrev}
  onkeydown={emblaCtx.handleKeyDown}
  {...restProps}
  bind:ref
>
  <ArrowLeft class="size-4" />
  <span class="sr-only">Previous slide</span>
</Button>
