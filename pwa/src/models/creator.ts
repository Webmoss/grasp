import { categoryObject } from "src/models/category";
import { courseObject } from "src/models/course";
import { lessonObject } from "src/models/lesson";

export interface creatorObject {
  id: string;
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
  website: string | null;
  twitter: string | null | undefined;
  linkedin: string | null | undefined;
  facebook: string | null | undefined;
  instagram: string | null | undefined;
  followers: number | null;
  following: number | null;
  categories: Array<categoryObject>;
  courses: Array<courseObject>;
  lessons: Array<lessonObject>;
  projects: Array<string>;
  isLive: boolean;
  created_date: string;
  updated_date: string;
}
