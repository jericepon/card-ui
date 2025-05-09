export interface Card {
  id: string;
  title: string;
  description?: string;
}

export interface SwimLane {
  id: string;
  title: string;
  cards: Card[];
}