import type { CardSet } from "@/types/CardSet";
import type { CardImage } from "@/types/CardImage";

export type Card = {
  id: string;
  name: string;
  set: CardSet;
  images: CardImage;
  number: string;
  quantity: number;
};