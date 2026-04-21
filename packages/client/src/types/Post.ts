import type { User } from "./User"

export type Post = {
  id: string;
  content: string;
  images: string[] | null;
  publishDate: Date;
  userId: string;
  user: User;
  createdAt: Date;
}