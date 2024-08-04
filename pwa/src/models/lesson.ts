import { categoryObject } from "./category";

export interface lessonObject {
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
  sales: number;
  total: number;
  token: string;
  links: Array<string>;
  step: number;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
