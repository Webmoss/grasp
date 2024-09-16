import { categoryObject } from "./category";
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
  website: string | null | undefined;
  twitter: string | null | undefined;
  discord: string | null | undefined;
  telegram: string | null | undefined;
  linkedin: string | null | undefined;
  city: string | null | undefined;
  country: string | null | undefined;
  created_date: string | null | undefined;
  updated_date: string | null | undefined;
  enabled: boolean;
  verified: boolean;
  blocked: boolean;
}
