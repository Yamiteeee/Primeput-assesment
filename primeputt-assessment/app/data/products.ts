import type { ProductSize } from "../types/product";

export const sizes: ProductSize[] = [
  {
    name: "Standard",
    dimensions: "3′ × 9′",
    price: 36700,
  },
  {
    name: "XL",
    dimensions: "3′ × 12′",
    price: 40300,
    popular: true,
  },
  {
    name: "XXL",
    dimensions: "3′ × 15′",
    price: 44000,
  },
];

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(price);
