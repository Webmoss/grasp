import { categoryObject } from "./category";
import { linkObject } from './link';
import { metadataObject } from './metadata';
import { attributeObject } from "src/models/attribute";
import { lastSaleObject } from "src/models/lastSale";

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
  lastSale: lastSaleObject | null;
  price: number;
  discount: number;
  from_date: string;
  to_date: string;
  sales: number;
  total: number;
  token: string;
  nft: metadataObject;
  attributes: Array<attributeObject>;
  links: Array<linkObject>;
  step: number;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
