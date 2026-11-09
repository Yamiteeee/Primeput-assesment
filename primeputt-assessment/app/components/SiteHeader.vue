<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{
  overlayOpen: boolean;
}>();

const emit = defineEmits<{
  (event: "open-cart"): void;
}>();

const { cartCount } = useCart();

const menuOpen = ref(false);
const isHeaderVisible = ref(true);
const isScrolled = ref(false);

let lastScrollY = 0;
let scrollTicking = false;
let scrollFrame = 0;

function updateHeader() {
  const currentScrollY = Math.max(0, window.scrollY);
  const difference = currentScrollY - lastScrollY;

  isScrolled.value = currentScrollY > 20;

  if (currentScrollY <= 80 || menuOpen.value || props.overlayOpen) {
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

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeMenu();
  }
}

function handleOpenCart() {
  closeMenu();
  emit("open-cart");
}

watch(
  () => props.overlayOpen,
  (isOpen) => {
    if (isOpen) {
      closeMenu();
      isHeaderVisible.value = true;
    }
  },
);

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
});
</script>

<template>
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
          @click="handleOpenCart"
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
      <a href="#product" @click="closeMenu">Blog</a>
      <a href="#recommendations" @click="closeMenu">Contact</a>
    </nav>
  </header>
</template>

<style scoped>
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
}

@media (max-width: 360px) {
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
  .site-header {
    transition: none;
  }
}
</style>
