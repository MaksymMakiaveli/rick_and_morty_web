<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex h-full flex-col items-center justify-center">
  <div class="text-center">
    <h2 class="text-4xl font-bold">
      {$page?.status ?? 500}
    </h2>
    <p class="mt-2 text-lg">{$page?.error?.message}</p>
  </div>
</div>
