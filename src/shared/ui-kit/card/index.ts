import Root from './card.svelte';
import Content from './card-content.svelte';
import Description from './card-description.svelte';
import Footer from './card-footer.svelte';
import Header from './card-header.svelte';
import Title from './card-title.svelte';

export const Card = Object.assign(Root, {
  Content,
  Description,
  Footer,
  Header,
  Title,
});
export type { Props as CardProps } from './card.svelte';
