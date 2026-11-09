export type ProductSize = {
  name: string;
  dimensions: string;
  price: number;
  popular?: boolean;
};

export type GalleryItem = {
  src: string;
  type: "image" | "video";
  alt: string;
  caption: string;
};

export type CartItem = {
  name: string;
  dimensions: string;
  price: number;
  quantity: number;
};
