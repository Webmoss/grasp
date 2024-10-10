import { categoryObject } from "./category";
import { metadataObject } from './metadata';

export interface lessonObject {
  id: string;
  type: string | null;
  category: string;
  categories: Array<categoryObject> | Array<string>;
  banner: string;
  image: string;
  title: string | null;
  excerpt: string | null;
  description: string | null;
  content: any;
  video: any;
  tasks: Array<object>;
  quests: Array<object>;
  price: number;
  sales: number;
  total: number;
  token: string;
  nft: metadataObject;
  links: Array<string>;
  step: number;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
