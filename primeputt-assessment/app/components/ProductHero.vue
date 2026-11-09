<script setup lang="ts">
const emit = defineEmits<{
  "open-cart": [];
  "open-guarantee": [];
  "open-size-guide": [];
}>();

const { sizes, selectedSize, selectedProduct, selectSize, formatPrice } =
  useProduct();

const { addToCart: addProductToCart } = useCart();

function addToCart() {
  addProductToCart(selectedProduct.value);
  emit("open-cart");
}
</script>

<template>
  <main id="product" class="product-layout">
    <ProductGallery />

    <section class="product-info" aria-labelledby="product-title">
      <h1 id="product-title">
        Bring the<br class="desktop-break" />
        green home.
      </h1>

      <p class="description">
        USA-made TrueGreen™ nylon turf rolls like your course. Three
        regulation-width cups perform like a full-depth hole. A solid walnut
        backstop.
      </p>

      <div class="rating">
        <span class="stars" aria-label="5 out of 5 stars">★★★★★</span>
        <span><strong>4.9</strong> · 16,000+ golfers</span>
      </div>

      <div
        class="size-options"
        role="group"
        aria-label="Choose putting mat size"
      >
        <button
          v-for="size in sizes"
          :key="size.name"
          type="button"
          class="size-option"
          :class="{ active: selectedSize === size.name }"
          :aria-pressed="selectedSize === size.name"
          @click="selectSize(size.name)"
        >
          <span v-if="size.popular" class="popular-badge"> MOST POPULAR </span>

          <span class="size-name">{{ size.name }}</span>

          <span class="size-dimensions">{{ size.dimensions }}</span>

          <strong class="size-price">
            {{ formatPrice(size.price) }}
          </strong>
        </button>
      </div>

      <button class="size-guide" type="button" @click="emit('open-size-guide')">
        Which size fits my room? →
      </button>

      <div class="purchase">
        <button class="cart-button" type="button" @click="addToCart">
          <span>ADD TO CART</span>
          <span class="cart-divider" aria-hidden="true">·</span>
          <strong>{{ formatPrice(selectedProduct.price) }}</strong>
        </button>
      </div>

      <div class="guarantee-row">
        <strong>60-DAY MONEY-BACK GUARANTEE</strong>

        <button
          class="details-trigger"
          type="button"
          @click="emit('open-guarantee')"
        >
          Details
        </button>
      </div>

      <div id="recommendations" class="testimonial">
        <div class="testimonial-avatar" aria-hidden="true">
          <span>TM</span>
        </div>

        <div class="testimonial-content">
          <p>
            “PrimePutt is the perfect putting mat to help you dial in your
            putting at home and helps prepare me for the greens I see weekly on
            the PGA Tour.”
          </p>

          <div class="testimonial-author">
            <strong>Taylor Montgomery</strong>
            <span>
              · The PGA Tour's #1 putter in 2024 · Verified customer
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/*
  PRODUCT HERO DESIGN TOKENS

  Centralizing the typography and spacing makes
  future pixel-level adjustments much easier.
*/

.product-layout {
  --hero-accent: #ffc568;
  --hero-text: #ffffff;
  --hero-muted: #c8c8c8;
  --hero-subtle: #929292;
  --hero-border: #292929;

  display: grid;
  grid-template-columns:
    minmax(0, 1.08fr)
    minmax(0, 0.98fr);
  align-items: start;
  gap: clamp(32px, 3.6vw, 56px);
  width: min(calc(100% - 48px), 1250px);
  margin: 0 auto;
  padding: 24px 0 100px;
}

.product-layout *,
.product-layout *::before,
.product-layout *::after {
  box-sizing: border-box;
}

.product-layout button {
  -webkit-tap-highlight-color: transparent;
}

/* PRODUCT INFORMATION */

.product-info {
  position: sticky;
  top: 100px;
  align-self: start;
  min-width: 0;
}

/* HEADING */

.product-info h1 {
  max-width: 560px;
  margin: 0 0 18px;
  color: var(--hero-text);
  font-family: Arial, Helvetica, sans-serif;
  font-size: clamp(43px, 4vw, 61px);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.02;
}

/* DESCRIPTION */

.description {
  max-width: 540px;
  margin: 0 0 18px;
  color: var(--hero-muted);
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.6;
}

/* RATING */

.rating {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  color: #d0d0d0;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
}

.stars {
  color: var(--hero-accent);
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 1;
  white-space: nowrap;
}

.rating strong {
  color: var(--hero-text);
  font-weight: 700;
}

/* SIZE OPTIONS */

.size-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.size-option {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 0;
  min-height: 116px;
  padding: 17px 8px 13px;
  border: 1px solid var(--hero-border);
  border-radius: 5px;
  background: transparent;
  color: var(--hero-text);
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.size-option:hover {
  border-color: var(--hero-accent);
}

.size-option.active {
  border-color: var(--hero-accent);
  background: rgba(255, 197, 104, 0.1);
}

.size-option:focus-visible,
.size-guide:focus-visible,
.cart-button:focus-visible,
.details-trigger:focus-visible {
  outline: 2px solid var(--hero-accent);
  outline-offset: 3px;
}

.popular-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  padding: 4px 8px;
  border-radius: 2px;
  background: var(--hero-accent);
  color: #000;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.4px;
  line-height: 1.2;
  white-space: nowrap;
  transform: translateX(-50%);
}

.size-name {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
}

.size-dimensions {
  color: var(--hero-subtle);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.3;
}

.size-price {
  margin-top: 4px;
  font-size: clamp(16px, 1.6vw, 21px);
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
}

.size-option.active .size-price {
  color: var(--hero-accent);
}

/* SIZE GUIDE */

.size-guide {
  display: inline-block;
  margin-top: 15px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #aaa;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.5;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.size-guide:hover {
  color: #fff;
}

/* PURCHASE */

.purchase {
  margin-top: 20px;
}

.cart-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  min-height: 64px;
  padding: 16px;
  border: 0;
  border-radius: 4px;
  background: var(--hero-accent);
  color: #080808;
  font-family: inherit;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1.8px;
  line-height: 1.3;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.cart-button:hover {
  background: #ffd18a;
}

.cart-button:active {
  transform: scale(0.995);
}

.cart-button strong {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0;
}

.cart-divider {
  font-size: 19px;
  font-weight: 400;
  line-height: 1;
}

/* GUARANTEE */

.guarantee-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin: 25px 0 34px;
  padding: 0 18px;
}

.guarantee-row strong {
  color: var(--hero-accent);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.65px;
  line-height: 1.5;
}

.details-trigger {
  flex-shrink: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #aaa;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.5;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.details-trigger:hover {
  color: #fff;
}

/* TESTIMONIAL */

.testimonial {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 22px 0;
  border-top: 1px solid var(--hero-border);
}

.testimonial-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #303c32;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.testimonial-content {
  min-width: 0;
}

.testimonial-content p {
  margin: 0 0 10px;
  color: #eee;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
}

.testimonial-author {
  color: #858585;
  font-size: 11px;
  line-height: 1.6;
}

.testimonial-author strong {
  color: #fff;
  font-weight: 700;
}

/* TABLET */

@media (max-width: 1000px) {
  .product-layout {
    gap: 25px;
    width: min(calc(100% - 32px), 1250px);
  }

  .product-info h1 {
    font-size: clamp(35px, 4.7vw, 49px);
    letter-spacing: -0.045em;
  }

  .description {
    font-size: 14px;
  }

  .size-options {
    gap: 7px;
  }

  .size-option {
    padding: 15px 5px 12px;
  }

  .size-price {
    font-size: 15px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .product-layout {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 0 0 60px;
  }

  .product-info {
    position: static;
    width: 100%;
    padding: 15px 15px 0;
  }

  .product-info h1 {
    margin-bottom: 14px;
    font-size: clamp(30px, 7.6vw, 42px);
    letter-spacing: -0.04em;
    line-height: 1.07;
  }

  .desktop-break {
    display: none;
  }

  .description {
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.55;
  }

  .rating {
    gap: 9px;
    margin-bottom: 25px;
    font-size: 12px;
  }

  .stars {
    font-size: 13px;
  }

  .size-options {
    gap: 7px;
  }

  .size-option {
    min-height: 94px;
    gap: 6px;
    padding: 13px 4px 10px;
  }

  .size-name {
    font-size: 12px;
  }

  .size-dimensions {
    font-size: 10px;
  }

  .size-price {
    margin-top: 3px;
    font-size: clamp(13px, 3.6vw, 17px);
  }

  .popular-badge {
    top: -9px;
    padding: 4px 6px;
    font-size: 8px;
  }

  .size-guide {
    margin-top: 12px;
    font-size: 11px;
  }

  .purchase {
    margin-top: 17px;
  }

  .cart-button {
    min-height: 56px;
    gap: 10px;
    font-size: 12px;
    letter-spacing: 1.5px;
  }

  .cart-button strong {
    font-size: 13px;
  }

  .guarantee-row {
    margin: 24px 0 30px;
    padding: 0 5px;
  }

  .guarantee-row strong {
    font-size: 10px;
  }

  .testimonial {
    padding-top: 22px;
  }

  .testimonial-content p {
    font-size: 12px;
  }
}

/* SMALL PHONES */

@media (max-width: 360px) {
  .product-info {
    padding-right: 12px;
    padding-left: 12px;
  }

  .size-options {
    gap: 5px;
  }

  .size-price {
    font-size: 12px;
  }

  .popular-badge {
    font-size: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .size-option,
  .cart-button {
    transition: none;
  }
}
</style>
