import type { Post } from "./Post"

export type User = {
  id: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  about: string | null;
  email: string;
  phone: string | null;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}