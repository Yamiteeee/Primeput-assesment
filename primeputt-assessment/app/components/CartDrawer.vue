<script setup lang="ts">
import { watch } from "vue";
import { formatPrice } from "../data/products";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const { cartItems, cartCount, cartSubtotal, changeQuantity } = useCart();

function closeDrawer() {
  emit("close");
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeDrawer();
  }
}

watch(
  () => props.open,
  (isOpen, _wasOpen, onCleanup) => {
    if (!isOpen || !import.meta.client) return;

    window.addEventListener("keydown", handleKeydown);

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeydown);
    });
  },
  { immediate: true },
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="pp-overlay pp-cart-overlay"
      @click.self="closeDrawer"
    >
      <aside
        class="pp-cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div class="pp-cart-header">
          <h2 id="cart-title">MY CART</h2>

          <button
            class="pp-cart-close"
            type="button"
            aria-label="Close cart"
            @click="closeDrawer"
          >
            ×
          </button>
        </div>

        <div class="pp-cart-content">
          <p v-if="cartItems.length === 0" class="pp-cart-empty">
            Your cart is empty.
          </p>

          <div v-for="item in cartItems" :key="item.name" class="pp-cart-item">
            <img
              src="/images/Hero-1.2_walnut-backstop-cups.jpg"
              alt="PrimePutt putting mat"
              class="pp-cart-product-image"
            />

            <div class="pp-cart-item-info">
              <h3>TRUEGREEN™ PUTTING MAT</h3>

              <p>
                Size: {{ item.name }} -
                {{ item.dimensions }}
              </p>

              <strong class="pp-cart-item-price">
                {{ formatPrice(item.price * item.quantity) }}
              </strong>

              <div class="pp-quantity-control">
                <button
                  type="button"
                  :aria-label="`Decrease ${item.name} quantity`"
                  @click="changeQuantity(item.name, -1)"
                >
                  −
                </button>

                <span>{{ item.quantity }}</span>

                <button
                  type="button"
                  :aria-label="`Increase ${item.name} quantity`"
                  @click="changeQuantity(item.name, 1)"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="pp-cart-footer">
          <div class="pp-cart-benefit">
            <span aria-hidden="true">♧</span>
            <p>Stimpmeter Rating: 9′–11′</p>
          </div>

          <div class="pp-cart-benefit">
            <span aria-hidden="true">◇</span>
            <p>Free shipping in Continental US</p>
          </div>

          <div class="pp-cart-subtotal">
            <span>SUBTOTAL</span>
            <strong>{{ formatPrice(cartSubtotal) }} PHP</strong>
          </div>

          <p class="pp-shipping-note">Shipping calculated at checkout.</p>

          <button
            class="pp-checkout-button"
            type="button"
            :disabled="cartCount === 0"
            title="Checkout is not connected in this assessment replica"
          >
            CHECK OUT
          </button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.pp-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  background: rgba(0, 0, 0, 0.76);
  color: #fff;
}

.pp-overlay *,
.pp-overlay *::before,
.pp-overlay *::after {
  box-sizing: border-box;
}

.pp-overlay button {
  cursor: pointer;
}

.pp-cart-overlay {
  justify-content: flex-end;
}

.pp-cart-drawer {
  display: flex;
  flex-direction: column;
  width: min(100%, 400px);
  height: 100dvh;
  padding: 20px 15px 15px;
  background: #000;
  box-shadow: -10px 0 45px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.pp-cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 19px;
  border-bottom: 1px solid #555;
}

.pp-cart-header h2 {
  margin: 0;
  font-size: 23px;
  font-weight: 600;
}

.pp-cart-close {
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 36px;
  font-weight: 200;
  line-height: 1;
}

.pp-cart-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-top: 24px;
}

.pp-cart-empty {
  padding: 40px 0;
  color: #aaa;
  text-align: center;
}

.pp-cart-item {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr);
  gap: 25px;
  margin-bottom: 25px;
}

.pp-cart-product-image {
  width: 100px;
  height: 115px;
  object-fit: cover;
}

.pp-cart-item-info {
  min-width: 0;
}

.pp-cart-item-info h3 {
  margin: 1px 0 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.pp-cart-item-info p {
  margin: 0 0 12px;
  color: #ddd;
  font-size: 13px;
}

.pp-cart-item-price {
  display: block;
  margin-bottom: 15px;
  font-size: 19px;
  font-weight: 400;
}

.pp-quantity-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100%, 240px);
  height: 38px;
  border-top: 1px solid #555;
  border-bottom: 1px solid #555;
  border-radius: 3px;
}

.pp-quantity-control button {
  width: 45px;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 18px;
}

.pp-quantity-control span {
  font-size: 13px;
}

.pp-cart-footer {
  flex-shrink: 0;
  padding-top: 16px;
}

.pp-cart-benefit {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.pp-cart-benefit > span {
  width: 22px;
  font-size: 22px;
  text-align: center;
}

.pp-cart-benefit p {
  margin: 0;
  font-size: 13px;
}

.pp-cart-subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 27px;
  padding-top: 24px;
  border-top: 1px solid #555;
  font-size: 14px;
}

.pp-cart-subtotal strong {
  font-size: 19px;
  font-weight: 400;
  white-space: nowrap;
}

.pp-shipping-note {
  margin: 9px 0 18px;
  color: #888;
  font-size: 13px;
}

.pp-checkout-button {
  width: 100%;
  min-height: 56px;
  border: 0;
  border-radius: 4px;
  background: #ffc568;
  color: #000;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
}

.pp-checkout-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .pp-cart-item {
    gap: 15px;
  }
}

@media (max-width: 360px) {
  .pp-cart-drawer {
    padding: 16px 12px 12px;
  }

  .pp-cart-item {
    grid-template-columns: 85px minmax(0, 1fr);
    gap: 12px;
  }

  .pp-cart-product-image {
    width: 85px;
    height: 100px;
  }

  .pp-cart-subtotal strong {
    font-size: 15px;
  }
}
</style>
