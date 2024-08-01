import { lessonObject } from './lesson'

export interface courseObject {
  id: number;
  type: string | null;
  category: string;
  categories: Array<string>;
  banner: string;
  image: string;
  title: string | null;
  excerpt: string | null;
  description: string | null;
  price: number;
  discount: number;
  from_date: string;
  to_date: string;
  sales: number;
  total: number;
  token: string;
  nft: object;
  links: Array<string>;
  lessons: Array<lessonObject>;
  step: number;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
