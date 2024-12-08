<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { WithElementRef } from 'bits-ui';

  export type SpinnerProps = WithElementRef<HTMLAttributes<HTMLSpanElement>> & {
    size?: number;
  };
</script>

<script lang="ts">
  import { cn } from '@shared/utils/common';

  let { ref = $bindable(null), class: className, size = 48, style, ...restProps }: SpinnerProps = $props();
</script>

<span
  bind:this={ref}
  style="--size: {size}px; {style}"
  class={cn('inline-block size-[--size] animate-rotate rounded-full border-4 border-white border-b-primary', className)}
  {...restProps}
></span>
