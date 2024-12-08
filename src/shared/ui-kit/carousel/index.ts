import Root from './carousel.svelte';
import Content from './carousel-content.svelte';
import Item from './carousel-item.svelte';
import Previous from './carousel-previous.svelte';
import Next from './carousel-next.svelte';

export const Carousel = Object.assign(Root, {
  Content,
  Item,
  Previous,
  Next,
});
