<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import { sizes, formatPrice } from "../data/products";
import { gallery } from "../data/gallery";
import type { CartItem } from "../types/product";

/* PRODUCT STATE */

const selectedSize = ref("XL");
const activeImage = ref(0);

const selectedProduct = computed(
  () => sizes.find((size) => size.name === selectedSize.value)!,
);

const currentImage = computed(() => gallery[activeImage.value]!);

/* GALLERY CONTROLS */

function nextImage() {
  activeImage.value = (activeImage.value + 1) % gallery.length;
}

function previousImage() {
  activeImage.value = (activeImage.value - 1 + gallery.length) % gallery.length;
}

/* CART STATE */

const cartItems = ref<CartItem[]>([]);
const cartOpen = ref(false);

const cartCount = computed(() =>
  cartItems.value.reduce((total, item) => total + item.quantity, 0),
);

const cartSubtotal = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  ),
);

/* MODAL STATE */

const guaranteeOpen = ref(false);
const sizeGuideOpen = ref(false);

const anyOverlayOpen = computed(
  () => cartOpen.value || guaranteeOpen.value || sizeGuideOpen.value,
);

/* CART ACTIONS */

function addToCart() {
  const product = selectedProduct.value;

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

  openCart();
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

/* OVERLAY CONTROLS */

function closeOverlays() {
  cartOpen.value = false;
  guaranteeOpen.value = false;
  sizeGuideOpen.value = false;
}

function openCart() {
  closeOverlays();
  menuOpen.value = false;
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

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeOverlays();
    menuOpen.value = false;
  }
}

/* HEADER STATE */

const menuOpen = ref(false);
const isHeaderVisible = ref(true);
const isScrolled = ref(false);

/* HEADER SCROLL BEHAVIOR */

let lastScrollY = 0;
let scrollTicking = false;
let scrollFrame = 0;

function updateHeader() {
  const currentScrollY = Math.max(0, window.scrollY);
  const difference = currentScrollY - lastScrollY;

  isScrolled.value = currentScrollY > 20;

  if (currentScrollY <= 80 || menuOpen.value || anyOverlayOpen.value) {
    isHeaderVisible.value = true;
  } else if (Math.abs(difference) > 4) {
    isHeaderVisible.value = difference < 0;
  }

  lastScrollY = currentScrollY;
  scrollTicking = false;
}

function handleScroll() {
  if (scrollTicking) return;

  scrollTicking = true;
  scrollFrame = window.requestAnimationFrame(updateHeader);
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;

  if (menuOpen.value) {
    isHeaderVisible.value = true;
  }
}

function closeMenu() {
  menuOpen.value = false;
}

/* OVERLAY SCROLL LOCK */

watch(anyOverlayOpen, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
});

/* LIFECYCLE */

onMounted(() => {
  lastScrollY = Math.max(0, window.scrollY);
  isScrolled.value = lastScrollY > 20;

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);

  window.cancelAnimationFrame(scrollFrame);

  document.body.style.overflow = "";
});
</script>

<template>
  <div class="page">
    <!-- HEADER -->
    <header
      class="site-header"
      :class="{
        'header-hidden': !isHeaderVisible,
        'header-scrolled': isScrolled,
      }"
    >
      <div class="header-inner">
        <button
          class="icon-button menu-button"
          type="button"
          :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-navigation"
          @click="toggleMenu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path v-if="menuOpen" d="M5 5l14 14M19 5 5 19" />
            <path v-else d="M3 7h18M3 12h18M3 17h12" />
          </svg>
        </button>

        <a
          href="#product"
          class="logo"
          aria-label="PrimePutt home"
          @click="closeMenu"
        >
          <span class="logo-mark">P</span>
          <span class="logo-name">PrimePutt</span>
        </a>

        <nav class="desktop-nav" aria-label="Main navigation">
          <a href="#product" class="nav-shop">
            Shop
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
          <a href="#product">Blog</a>
          <a href="#recommendations">Contact</a>
        </nav>

        <div class="header-actions">
          <button
            class="icon-button"
            type="button"
            aria-label="Search"
            title="Search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="10.8" cy="10.8" r="7.2" />
              <path d="m16.2 16.2 5 5" />
            </svg>
          </button>

          <button
            class="icon-button cart-trigger"
            type="button"
            aria-label="Open shopping cart"
            @click="openCart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 7h16l-1.2 14H5.2L4 7Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>

            <span v-if="cartCount > 0" class="cart-count">
              {{ cartCount }}
            </span>
          </button>
        </div>
      </div>

      <nav
        v-if="menuOpen"
        id="mobile-navigation"
        class="mobile-nav"
        aria-label="Mobile navigation"
      >
        <a href="#product" @click="closeMenu">Shop</a>
        <a href="#details" @click="closeMenu">Blog</a>
        <a href="#recommendations" @click="closeMenu">Contact</a>
      </nav>
    </header>

    <!-- MAIN PRODUCT -->
    <main id="product" class="product-layout">
      <!-- DESKTOP GALLERY -->
      <section class="product-media" aria-label="Product images">
        <div class="desktop-gallery">
          <figure
            v-for="(item, index) in gallery"
            :key="item.src"
            class="gallery-card"
            :class="{ featured: index === 0 }"
          >
            <video
              v-if="item.type === 'video'"
              :src="item.src"
              :aria-label="item.alt"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            />

            <img
              v-else
              :src="item.src"
              :alt="item.alt"
              :loading="index === 0 ? 'eager' : 'lazy'"
            />

            <figcaption>{{ item.caption }}</figcaption>
          </figure>
        </div>

        <!-- MOBILE GALLERY -->
        <div class="mobile-gallery">
          <div class="mobile-image-wrapper">
            <video
              v-if="currentImage.type === 'video'"
              :key="`video-${currentImage.src}`"
              :src="currentImage.src"
              :aria-label="currentImage.alt"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            />

            <img
              v-else
              :key="`image-${currentImage.src}`"
              :src="currentImage.src"
              :alt="currentImage.alt"
            />

            <div class="gallery-controls">
              <button
                type="button"
                class="gallery-arrow"
                aria-label="Previous image"
                @click="previousImage"
              >
                ‹
              </button>

              <span class="gallery-counter">
                {{ activeImage + 1 }} / {{ gallery.length }}
              </span>

              <button
                type="button"
                class="gallery-arrow"
                aria-label="Next image"
                @click="nextImage"
              >
                ›
              </button>
            </div>
          </div>

          <p class="mobile-caption">{{ currentImage.caption }}</p>
        </div>
      </section>

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
          <span class="stars" aria-label="Five stars">★★★★★</span>
          <span><strong>4.9</strong> · 16,000+ golfers</span>
        </div>

        <div class="size-options">
          <button
            v-for="size in sizes"
            :key="size.name"
            type="button"
            class="size-option"
            :class="{ active: selectedSize === size.name }"
            :aria-pressed="selectedSize === size.name"
            @click="selectedSize = size.name"
          >
            <span v-if="size.popular" class="popular-badge">
              MOST POPULAR
            </span>

            <span class="size-name">{{ size.name }}</span>
            <span class="size-dimensions">{{ size.dimensions }}</span>

            <strong class="size-price">
              {{ formatPrice(size.price) }}
            </strong>
          </button>
        </div>

        <button class="size-guide" type="button" @click="openSizeGuide">
          Which size fits my room? →
        </button>

        <div class="purchase">
          <button class="cart-button" type="button" @click="addToCart">
            <span>ADD TO CART</span>
            <span class="cart-divider">·</span>
            <strong>{{ formatPrice(selectedProduct.price) }}</strong>
          </button>
        </div>

        <div class="guarantee-row">
          <strong>60-DAY MONEY-BACK GUARANTEE</strong>

          <button class="details-trigger" type="button" @click="openGuarantee">
            Details
          </button>
        </div>

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
            <strong>One-year warranty</strong> on materials and workmanship,
            normal indoor and outdoor use.
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

          <span class="pp-modal-eyebrow">FIND YOUR FIT</span>
          <h2 id="size-guide-title">Which size fits my room?</h2>

          <p>
            Choose a putting mat based on the available floor space in your
            practice area.
          </p>

          <div class="pp-size-guide-list">
            <div v-for="size in sizes" :key="size.name">
              <strong>{{ size.name }}</strong>
              <span>{{ size.dimensions }}</span>
            </div>
          </div>

          <p class="pp-size-note">
            Leave extra clearance around the mat for a comfortable putting
            stance.
          </p>
        </section>
      </div>
    </Teleport>

    <!-- CART DRAWER -->
    <Teleport to="body">
      <div
        v-if="cartOpen"
        class="pp-overlay pp-cart-overlay"
        @click.self="closeOverlays"
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
              @click="closeOverlays"
            >
              ×
            </button>
          </div>

          <div class="pp-cart-content">
            <p v-if="cartItems.length === 0" class="pp-cart-empty">
              Your cart is empty.
            </p>

            <div
              v-for="item in cartItems"
              :key="item.name"
              class="pp-cart-item"
            >
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

/* HEADER */

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: #050505;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition:
    transform 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
}

.site-header.header-hidden {
  transform: translateY(-100%);
}

.site-header.header-scrolled {
  background: rgba(5, 5, 5, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.header-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: min(100% - 48px, 1250px);
  height: 76px;
  margin: 0 auto;
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: 7px;
  width: max-content;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
}

.logo-mark {
  font-family: Georgia, serif;
  font-size: 37px;
  font-weight: 700;
  line-height: 1;
}

.logo-name {
  font-family: Georgia, serif;
  font-size: 18px;
  font-weight: 700;
}

.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 38px;
}

.desktop-nav a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #e7e7e7;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.desktop-nav a:hover {
  color: #ffc568;
}

.nav-shop {
  text-decoration: underline !important;
  text-underline-offset: 4px;
}

.nav-shop svg {
  width: 13px;
  height: 13px;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 22px;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.icon-button svg {
  width: 23px;
  height: 23px;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-button:hover {
  color: #ffc568;
}

.cart-trigger {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 17px;
  height: 17px;
  padding: 0 3px;
  border-radius: 50%;
  background: #ffc568;
  color: #000;
  font-size: 10px;
  font-weight: 800;
}

.menu-button,
.mobile-nav {
  display: none;
}

/* MAIN LAYOUT */

.product-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.98fr);
  align-items: start;
  gap: clamp(35px, 4vw, 65px);
  width: min(100% - 48px, 1250px);
  margin: 0 auto;
  padding: 24px 0 100px;
}

.product-media,
.product-info {
  min-width: 0;
}

/* DESKTOP GALLERY */

.desktop-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.gallery-card {
  position: relative;
  overflow: hidden;
  margin: 0;
  aspect-ratio: 1 / 1;
  border-radius: 5px;
  background: #171717;
}

.gallery-card.featured {
  grid-column: 1 / -1;
  aspect-ratio: 1 / 1;
}

.gallery-card img,
.gallery-card video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-card figcaption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 32px 13px 13px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.5;
}

.mobile-gallery {
  display: none;
}

/* PRODUCT INFORMATION */

.product-info {
  position: sticky;
  top: 100px;
  align-self: start;
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

@media (max-width: 900px) {
  .header-inner {
    width: calc(100% - 32px);
    height: 65px;
  }

  .desktop-nav {
    gap: 22px;
  }

  .desktop-nav a {
    font-size: 12px;
  }

  .header-actions {
    gap: 14px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .header-inner {
    grid-template-columns: 1fr auto 1fr;
    width: 100%;
    height: 48px;
    padding: 0 12px;
  }

  .logo {
    grid-column: 2;
    grid-row: 1;
    justify-self: center;
  }

  .logo-mark {
    font-size: 29px;
  }

  .logo-name {
    font-size: 15px;
  }

  .desktop-nav {
    display: none;
  }

  .menu-button {
    display: inline-flex;
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
  }

  .header-actions {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
    gap: 12px;
  }

  .icon-button svg {
    width: 21px;
    height: 21px;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 20px;
    border-top: 1px solid #292929;
    background: #090909;
  }

  .mobile-nav a {
    color: #fff;
    font-size: 14px;
    text-decoration: none;
  }

  .product-layout {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 0 0 60px;
  }

  .product-media,
  .product-info {
    width: 100%;
  }

  .desktop-gallery {
    display: none;
  }

  .mobile-gallery {
    display: block;
  }

  .mobile-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #191919;
  }

  .mobile-image-wrapper img,
  .mobile-image-wrapper video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gallery-controls {
    position: absolute;
    right: 12px;
    bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .gallery-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #fff;
    color: #000;
    font-size: 25px;
    line-height: 1;
    cursor: pointer;
  }

  .gallery-counter {
    padding: 9px 12px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
  }

  .mobile-caption {
    margin: 0;
    padding: 12px 15px 0;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.5;
  }

  .product-info {
    position: static;
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

  .header-actions {
    gap: 7px;
  }

  .logo-mark {
    font-size: 25px;
  }

  .logo-name {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header,
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

/* CART DRAWER */

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

/* CART FOOTER */

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
  .pp-modal {
    padding: 26px 22px;
  }

  .pp-modal p {
    font-size: 14px;
  }

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
