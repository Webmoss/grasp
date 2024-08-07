import { categoryObject } from "./category";
import { lessonObject } from './lesson';
import { metadataObject } from './metadata';

export interface courseObject {
  id: string;
  type: string | null;
  category: string;
  categories: Array<categoryObject>;
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
  nft: metadataObject;
  links: Array<string>;
  lessons: Array<lessonObject>;
  step: number;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
