<script lang="ts" module>
  export type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
  import type { WithElementRef } from 'bits-ui';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '@shared/utils/common.js';

  let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<div bind:this={ref} class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...restProps}>
  {@render children?.()}
</div>
