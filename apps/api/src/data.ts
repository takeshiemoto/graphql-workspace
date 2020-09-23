export enum Category {
  SELFIE,
  PORTRAIT,
  ACTION,
  LANDSCAPE,
  GRAPHIC,
}

export interface User {
  id?: number;
  name?: string;
  description?: string;
  category?: Category;
  githubUser?: string;
  created?: Date;
}
