import { attributeObject } from "src/models/attribute";

export interface metadataObject {
  id: string;
  image: string;
  imageOriginal: string;
  type: string;
  name: string;
  title: string;
  description: string;
  mint_date: string;
  updated_date: string;
  file_url: string;
  animation_url: string;
  cached_file_url: string;
  cached_animation_url: string;
  creator_address: string;
  owner: string;
  attributes: Array<attributeObject>;
  price: number;
  discount: number;
  sales: number;
}
