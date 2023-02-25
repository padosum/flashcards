import type Token from 'markdown-it/lib/token';

interface File {
  name: string;
  contents?: string;
}

interface Learnset {
  id: string;
  name: string;
  created: string;
  cards: Card[];
}

interface Card {
  id: string;
  front: Token[];
  back: Token[];
  title: string;
  efactor: number;
  dueDate: string;
  repetition: number;
  interval: number;
  reviewDate: string;
}

export type { File, Card, Learnset };
