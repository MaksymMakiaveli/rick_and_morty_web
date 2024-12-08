<script lang="ts">
  import { createContextGqlClient } from '@shared/api/gql';
  import { RootHeader } from '@widgets/root-header';
  import '@assets/styles/root.css';
  import { ScrollArea } from '@shared/ui-kit/scroll-area';

  let { children } = $props();

  createContextGqlClient();
</script>

<main class="flex flex-1 flex-col overflow-hidden bg-ui-black">
  <div class="flex grow flex-col overflow-hidden">
    <RootHeader />
    <ScrollArea class="flex-1">
      {@render children()}
    </ScrollArea>
  </div>
</main>
