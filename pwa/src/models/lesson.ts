

export interface lessonObject {
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
  token: string;
  links: Array<string>;
  step: number;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
