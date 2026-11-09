<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

/* PRODUCT COMPOSABLE */

const { sizes, selectedSize, selectedProduct, selectSize, formatPrice } =
  useProduct();

/* CART COMPOSABLE */

const { addToCart: addProductToCart } = useCart();

/* OVERLAY STATE */

const cartOpen = ref(false);
const guaranteeOpen = ref(false);
const sizeGuideOpen = ref(false);

const anyOverlayOpen = computed(
  () => cartOpen.value || guaranteeOpen.value || sizeGuideOpen.value,
);

/* CART ACTIONS */

function addToCart() {
  addProductToCart(selectedProduct.value);
  openCart();
}

function closeOverlays() {
  cartOpen.value = false;
  guaranteeOpen.value = false;
  sizeGuideOpen.value = false;
}

function openCart() {
  closeOverlays();
  cartOpen.value = true;
}

function openGuarantee() {
  closeOverlays();
  guaranteeOpen.value = true;
}

function openSizeGuide() {
  closeOverlays();
  sizeGuideOpen.value = true;
}

/* KEYBOARD CONTROLS */

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeOverlays();
  }
}

/* OVERLAY SCROLL LOCK */

watch(anyOverlayOpen, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
});

/* LIFECYCLE */

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="page">
    <!-- HEADER COMPONENT -->
    <SiteHeader :overlay-open="anyOverlayOpen" @open-cart="openCart" />

    <!-- MAIN PRODUCT -->
    <main id="product" class="product-layout">
      <!-- GALLERY COMPONENT -->
      <ProductGallery />

      <!-- PRODUCT INFORMATION -->
      <section class="product-info">
        <h1>
          Bring the<br class="desktop-break" />
          green home.
        </h1>

        <p class="description">
          USA-made TrueGreen™ nylon turf rolls like your course. Three
          regulation-width cups perform like a full-depth hole. A solid walnut
          backstop.
        </p>

        <div class="rating">
          <span class="stars" aria-label="Five stars"> ★★★★★ </span>

          <span> <strong>4.9</strong> · 16,000+ golfers </span>
        </div>

        <!-- SIZE SELECTION -->
        <div class="size-options">
          <button
            v-for="size in sizes"
            :key="size.name"
            type="button"
            class="size-option"
            :class="{ active: selectedSize === size.name }"
            :aria-pressed="selectedSize === size.name"
            @click="selectSize(size.name)"
          >
            <span v-if="size.popular" class="popular-badge">
              MOST POPULAR
            </span>

            <span class="size-name">
              {{ size.name }}
            </span>

            <span class="size-dimensions">
              {{ size.dimensions }}
            </span>

            <strong class="size-price">
              {{ formatPrice(size.price) }}
            </strong>
          </button>
        </div>

        <button class="size-guide" type="button" @click="openSizeGuide">
          Which size fits my room? →
        </button>

        <!-- PURCHASE -->
        <div class="purchase">
          <button class="cart-button" type="button" @click="addToCart">
            <span>ADD TO CART</span>

            <span class="cart-divider">·</span>

            <strong>
              {{ formatPrice(selectedProduct.price) }}
            </strong>
          </button>
        </div>

        <!-- GUARANTEE -->
        <div class="guarantee-row">
          <strong> 60-DAY MONEY-BACK GUARANTEE </strong>

          <button class="details-trigger" type="button" @click="openGuarantee">
            Details
          </button>
        </div>

        <!-- TESTIMONIAL -->
        <div id="recommendations" class="testimonial">
          <div class="testimonial-avatar">
            <span>TM</span>
          </div>

          <div class="testimonial-content">
            <p>
              “PrimePutt is the perfect putting mat to help you dial in your
              putting at home and helps prepare me for the greens I see weekly
              on the PGA Tour.”
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

    <!-- FOOTER -->
    <footer class="assessment-note">
      Unofficial frontend assessment replica. Not affiliated with PrimePutt.
    </footer>

    <!-- GUARANTEE MODAL -->
    <Teleport to="body">
      <div
        v-if="guaranteeOpen"
        class="pp-overlay pp-modal-overlay"
        @click.self="closeOverlays"
      >
        <section
          class="pp-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="guarantee-title"
        >
          <button
            class="pp-modal-close"
            type="button"
            aria-label="Close guarantee details"
            @click="closeOverlays"
          >
            ×
          </button>

          <span class="pp-modal-eyebrow"> 60-DAY MONEY-BACK GUARANTEE </span>

          <h2 id="guarantee-title">Love it or send it back.</h2>

          <p>
            Live with it for 60 days. If it isn’t the green you pictured in your
            house, send it back for a full refund. We pay the return shipping in
            the U.S.
          </p>

          <p>
            Until you’ve putted on it, you’re taking our word for it, so we
            carry the risk. Online retail runs about 20 returns in 100. We run
            2.
          </p>

          <div class="pp-modal-divider"></div>

          <p class="pp-warranty">
            <strong>One-year warranty</strong>
            on materials and workmanship, normal indoor and outdoor use.
          </p>
        </section>
      </div>
    </Teleport>

    <!-- SIZE GUIDE MODAL -->
    <Teleport to="body">
      <div
        v-if="sizeGuideOpen"
        class="pp-overlay pp-modal-overlay"
        @click.self="closeOverlays"
      >
        <section
          class="pp-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
        >
          <button
            class="pp-modal-close"
            type="button"
            aria-label="Close size guide"
            @click="closeOverlays"
          >
            ×
          </button>

          <span class="pp-modal-eyebrow"> FIND YOUR FIT </span>

          <h2 id="size-guide-title">Which size fits my room?</h2>

          <p>
            Choose a putting mat based on the available floor space in your
            practice area.
          </p>

          <div class="pp-size-guide-list">
            <div v-for="size in sizes" :key="size.name">
              <strong>
                {{ size.name }}
              </strong>

              <span>
                {{ size.dimensions }}
              </span>
            </div>
          </div>

          <p class="pp-size-note">
            Leave extra clearance around the mat for a comfortable putting
            stance.
          </p>
        </section>
      </div>
    </Teleport>

    <!-- CART DRAWER COMPONENT -->
    <CartDrawer :open="cartOpen" @close="closeOverlays" />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #080808;
  color: #fff;
  overflow-x: clip;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

/* MAIN LAYOUT */

.product-layout {
  display: grid;
  grid-template-columns:
    minmax(0, 1.08fr)
    minmax(0, 0.98fr);
  align-items: start;
  gap: clamp(35px, 4vw, 65px);
  width: min(100% - 48px, 1250px);
  margin: 0 auto;
  padding: 24px 0 100px;
}

/* PRODUCT INFORMATION */

.product-info {
  position: sticky;
  top: 100px;
  align-self: start;
  min-width: 0;
}

.product-info h1 {
  max-width: 560px;
  margin: 0 0 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: clamp(43px, 4vw, 61px);
  font-weight: 800;
  letter-spacing: -2.8px;
  line-height: 0.98;
}

.description {
  max-width: 540px;
  margin: 0 0 15px;
  color: #c8c8c8;
  font-size: 16px;
  line-height: 1.52;
}

.rating {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 11px;
  margin-bottom: 26px;
  color: #d0d0d0;
  font-size: 13px;
}

.stars {
  color: #ffc568;
  font-size: 15px;
  letter-spacing: 1px;
}

.rating strong {
  color: #fff;
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
  gap: 8px;
  min-width: 0;
  min-height: 112px;
  padding: 14px 8px;
  border: 1px solid #292929;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  text-align: center;
  transition:
    border-color 0.2s,
    background 0.2s;
  cursor: pointer;
}

.size-option:hover {
  border-color: #ffc568;
}

.size-option.active {
  border-color: #ffc568;
  background: rgba(255, 197, 104, 0.1);
}

.popular-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  padding: 4px 8px;
  border-radius: 2px;
  background: #ffc568;
  color: #000;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.4px;
  white-space: nowrap;
  transform: translateX(-50%);
}

.size-name {
  font-size: 14px;
  font-weight: 700;
}

.size-dimensions {
  color: #929292;
  font-size: 12px;
}

.size-price {
  margin-top: 5px;
  font-size: clamp(16px, 1.6vw, 21px);
  font-weight: 800;
  white-space: nowrap;
}

.size-option.active .size-price {
  color: #ffc568;
}

.size-guide {
  display: inline-block;
  margin-top: 13px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #aaa;
  font-size: 12px;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

/* PURCHASE */

.purchase {
  margin-top: 18px;
}

.cart-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  min-height: 65px;
  padding: 16px;
  border: 0;
  border-radius: 4px;
  background: #ffc568;
  color: #080808;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 2px;
  cursor: pointer;
}

.cart-button strong {
  font-size: 16px;
  letter-spacing: 0;
}

.cart-divider {
  font-size: 19px;
}

/* GUARANTEE */

.guarantee-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin: 27px 0 38px;
  padding: 0 18px;
}

.guarantee-row strong {
  color: #ffc568;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.7px;
}

.details-trigger {
  padding: 0;
  border: 0;
  background: transparent;
  color: #aaa;
  font-size: 12px;
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
  border-top: 1px solid #292929;
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
  margin: 0 0 8px;
  color: #eee;
  font-size: 13px;
  line-height: 1.55;
}

.testimonial-author {
  color: #858585;
  font-size: 11px;
  line-height: 1.6;
}

.testimonial-author strong {
  color: #fff;
}

/* FOOTER */

.assessment-note {
  padding: 25px;
  border-top: 1px solid #1d1d1d;
  color: #666;
  font-size: 11px;
  text-align: center;
}

/* TABLETS */

@media (max-width: 1000px) {
  .product-layout {
    gap: 25px;
    width: min(100% - 32px, 1250px);
  }

  .product-info h1 {
    font-size: clamp(35px, 4.7vw, 49px);
  }

  .description {
    font-size: 14px;
  }

  .size-options {
    gap: 7px;
  }

  .size-option {
    padding: 12px 5px;
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
    padding: 13px 15px 0;
  }

  .product-info h1 {
    margin-bottom: 12px;
    font-size: clamp(30px, 7.6vw, 42px);
    letter-spacing: -1.4px;
    line-height: 1.05;
  }

  .desktop-break {
    display: none;
  }

  .description {
    margin-bottom: 13px;
    font-size: 14px;
    line-height: 1.5;
  }

  .rating {
    gap: 9px;
    margin-bottom: 21px;
    font-size: 12px;
  }

  .stars {
    font-size: 13px;
  }

  .size-options {
    gap: 7px;
  }

  .size-option {
    min-height: 91px;
    padding: 12px 4px 9px;
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
    margin-top: 11px;
    font-size: 11px;
  }

  .purchase {
    margin-top: 15px;
  }

  .cart-button {
    min-height: 54px;
    gap: 10px;
    font-size: 12px;
    letter-spacing: 1.5px;
  }

  .cart-button strong {
    font-size: 13px;
  }

  .guarantee-row {
    margin: 25px 0 30px;
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
  .size-option {
    transition: none;
  }
}
</style>

<!-- GLOBAL STYLES FOR TELEPORTED MODALS -->
<style>
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

/* GUARANTEE AND SIZE GUIDE MODALS */

.pp-modal-overlay {
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.pp-modal {
  position: relative;
  width: min(100%, 560px);
  max-height: calc(100dvh - 40px);
  overflow-y: auto;
  padding: 32px;
  border: 1px solid #333;
  border-radius: 8px;
  background: #111;
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.4);
}

.pp-modal-close {
  position: absolute;
  top: 20px;
  right: 25px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #bbb;
  font-size: 28px;
  line-height: 1;
}

.pp-modal-eyebrow {
  display: block;
  margin: 2px 40px 14px 0;
  color: #ffc568;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.6px;
}

.pp-modal h2 {
  margin: 0 0 15px;
  font-family: Arial, sans-serif;
  font-size: clamp(26px, 4vw, 34px);
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1.15;
}

.pp-modal p {
  margin: 0 0 15px;
  color: #c9c9c9;
  font-size: 16px;
  line-height: 1.7;
}

.pp-modal-divider {
  height: 1px;
  margin: 19px 0;
  background: #333;
}

.pp-modal .pp-warranty {
  margin-bottom: 0;
  font-size: 14px;
}

.pp-warranty strong {
  color: #fff;
}

.pp-size-guide-list {
  margin: 22px 0;
  border-top: 1px solid #333;
}

.pp-size-guide-list > div {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #333;
}

.pp-size-guide-list strong {
  color: #fff;
}

.pp-size-guide-list span {
  color: #ffc568;
}

.pp-modal .pp-size-note {
  margin-bottom: 0;
  font-size: 13px;
}

/* MOBILE MODALS */

@media (max-width: 600px) {
  .pp-modal {
    padding: 26px 22px;
  }

  .pp-modal p {
    font-size: 14px;
  }
}
</style>
