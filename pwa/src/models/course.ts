
export interface courseObject {
  id: number;
  name: string | null;
  type: string | null;
  category: string;
  title: string | null;
  excerpt: string | null;
  description: string | null;
  links: Array<string>;
  banner: string;
  image: string;
  price: number;
  step: number;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
