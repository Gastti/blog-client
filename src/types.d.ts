export interface Posts {
  _id:       string;
  author:    Author;
  title:     string;
  content:   string;
  category:  string;
  image:     string;
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
