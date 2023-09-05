export interface IPostCreate {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface IPostedBy {
  _id: string;
  username: string;
  image: string;
}

export interface IComments {
  comment: string;
  postedBy?: IPostedBy;
  _id?: string;
}

export interface IPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  likes: string[];
  tags: string[];
  comments: IComments[];
  postedBy?: IPostedBy;
  createdAt: number;
}
