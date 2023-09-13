export interface Post {
  _id:       string;
  author:    Author;
  title:     string;
  content:   string;
  category:  string;
  image:     Image;
  tags:      string[];
  url:       string;
  createdAt: Date;
}

export interface Author {
  username:  string;
  firstname: string;
  lastname:  string;
  avatar:    string;
  role:      string;
}

export interface Image {
  _id:            string;
  url:            string;
  expirationDate: string;
}

export interface RegisterEntry {
  username:  string
  firstname: string
  lastname:  string
  email:     string
  password:  string
}