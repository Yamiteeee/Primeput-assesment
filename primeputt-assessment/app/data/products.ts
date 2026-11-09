import type { ProductSize } from "../types/product";

export const sizes: ProductSize[] = [
  {
    name: "Standard",
    dimensions: "3′ × 9′",
    price: 499,
  },
  {
    name: "XL",
    dimensions: "3′ × 12′",
    price: 549,
    popular: true,
  },
  {
    name: "XXL",
    dimensions: "3′ × 15′",
    price: 599,
  },
];

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
