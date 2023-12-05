export type User = {
  name: string;
  picture: string;
  sub: string;
  email?: string;
};

export type Comment = {
  id: string;
  created_at: number;
  url: string;
  text: string;
  user: User;
};

export type Foundation = {
  slug?: string;
  title?: string;
  content?: string;
  image?: string;
  excerpt?: string;
  [key: string]: any;
};
