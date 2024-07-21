

export interface lessonObject {
  id: number;
  banner: string;
  image: string;
  title: string | null;
  description: string | null;
  categories: Array<string>;
  isLive: boolean;
  created_date: string;
}
