export interface Post {
  _id: string;
  author: Author;
  title: string;
  content: string;
  category: string;
  image: Image;
  tags: string[];
  url: string;
  createdAt: Date;
}

export interface Author {
  username: string;
  firstname: string;
  lastname: string;
  avatar: string;
  role: string;
}

export interface Image {
  _id: string;
  url: string;
  expirationDate: string;
}

export interface RegisterValues {
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface LoginValues {
  email: string
  password: string
}

export interface User {
  username: string
  firstname: string
  lastname: string
  email: string
  avatar: string
  contactUrl: string
  role: string
  biography: string
}

export interface Tokens {
  access: string;
  refresh: string;
}