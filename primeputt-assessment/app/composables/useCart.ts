import { computed } from "vue";
import type { CartItem, ProductSize } from "../types/product";

export function useCart() {
  const cartItems = useState<CartItem[]>("primeputt-cart-items", () => []);

  const cartCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0),
  );

  const cartSubtotal = computed(() =>
    cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
  );

  function addToCart(product: ProductSize) {
    const existing = cartItems.value.find((item) => item.name === product.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.value.push({
        name: product.name,
        dimensions: product.dimensions,
        price: product.price,
        quantity: 1,
      });
    }
  }

  function changeQuantity(name: string, change: number) {
    const item = cartItems.value.find((entry) => entry.name === name);

    if (!item) return;

    const nextQuantity = item.quantity + change;

    if (nextQuantity <= 0) {
      cartItems.value = cartItems.value.filter((entry) => entry.name !== name);
    } else {
      item.quantity = nextQuantity;
    }
  }

  function clearCart() {
    cartItems.value = [];
  }

  return {
    cartItems,
    cartCount,
    cartSubtotal,
    addToCart,
    changeQuantity,
    clearCart,
  };
}
