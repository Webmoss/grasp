import { categoryObject } from "./category";
import { linkObject } from "./link";
export interface organisationObject {
  id: string | null | undefined;
  type: string;
  category: string;
  categories: Array<categoryObject>;
  banner: string;
  image: string;
  title: string | null;
  description: string | null;
  contact: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  city: string | null | undefined;
  country: string | null | undefined;
  website: linkObject;
  twitter: linkObject;
  discord: linkObject;
  telegram: linkObject;
  linkedin: linkObject;
  created_date: string | null | undefined;
  updated_date: string | null | undefined;
  enabled: boolean;
  verified: boolean;
  blocked: boolean;
}
