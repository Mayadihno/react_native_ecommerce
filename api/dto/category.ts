export interface ICategoryObj {
  name: string;
  images: [string];
}

export interface IUpdateCategory {
  name?: string;
  id: string;
  image?: [string];
}
