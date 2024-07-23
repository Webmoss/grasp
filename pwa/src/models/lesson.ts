

export interface lessonObject {
  id: number;
  banner: string;
  image: string;
  title: string | null;
  description: string | null;
  category: string;
  categories: Array<string>;
  price: number;
  isLive: boolean;
  created_date: string;
}
