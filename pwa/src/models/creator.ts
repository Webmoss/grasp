
export interface creatorObject {
  id: number;
  banner: string;
  image: string;
  username: string | null;
  name: string | null;
  description: string | null;
  email: string | null;
  mobile: string | null;
  title: string | null;
  city: string | null;
  country: string | null;
  twitter: string | null | undefined;
  linkedin: string | null | undefined;
  facebook: string | null | undefined;
  instagram: string | null | undefined;
  website: string | null;
  followers: number | null;
  following: number | null;
  courses: Array<string>;
  lessons: Array<string>;
  projects: Array<string>;
  categories: Array<string>;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
