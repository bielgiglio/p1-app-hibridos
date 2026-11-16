export interface ApiPostRaw {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface ApiUserRaw {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface FeedPost {
  id: number;
  userId: number;
  user: string;
  avatar: string;
  postImage: string;
  caption: string;
  likes: number;
  time: string;
}

export interface NovoPostPayload {
  title: string;
  body: string;
  userId: number;
}
