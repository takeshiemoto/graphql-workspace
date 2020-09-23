enum PhotoCategory {
  SELFIE,
  PORTRAIT,
  ACTION,
  LANDSCAPE,
  GRAPHIC,
}

export interface User {
  githubLogin: number;
  name: string;
  avatar: string;
  postedPhotos: Photo[];
  inPhotos: Photo[];
}

export interface Photo {
  id: number;
  url: string;
  name: string;
  description: string;
  category: PhotoCategory;
  postedBy: User;
  taggedUsers: User[];
  created: Date;
}
