import Root from './pagination.svelte';
import Content from './pagination-content.svelte';
import Item from './pagination-item.svelte';
import Link from './pagination-link.svelte';
import PrevButton from './pagination-prev-button.svelte';
import NextButton from './pagination-next-button.svelte';
import Ellipsis from './pagination-ellipsis.svelte';

export const Pagination = Object.assign(Root, {
  Content,
  Item,
  Link,
  PrevButton,
  NextButton,
  Ellipsis,
});
