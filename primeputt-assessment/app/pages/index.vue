<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

/* OVERLAY STATE */

const cartOpen = ref(false);
const guaranteeOpen = ref(false);
const sizeGuideOpen = ref(false);

const anyOverlayOpen = computed(
  () => cartOpen.value || guaranteeOpen.value || sizeGuideOpen.value,
);

/* OVERLAY ACTIONS */

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

/* SIZE GUIDE DATA */

const { sizes } = useProduct();

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
    <!-- HEADER -->
    <SiteHeader :overlay-open="anyOverlayOpen" @open-cart="openCart" />

    <!-- PRODUCT HERO -->
    <ProductHero
      @open-cart="openCart"
      @open-guarantee="openGuarantee"
      @open-size-guide="openSizeGuide"
    />

    <!-- PRODUCT FEATURES -->
    <ProductFeatures />

    <!-- PRODUCT SIZE COMPARISON -->
    <ProductSizeSection />

    <!-- PRODUCT REVIEWS -->
    <ProductReviews />

    <!-- PRODUCT HELP -->
    <ProductHelp />

    <!-- PRODUCT RECOMMENDATIONS -->
    <ProductPricingComparison />

    <!-- PRODUCT GUARANTEE -->
    <ProductGuarantee @open-guarantee="openGuarantee" />

    <!-- PRODUCT PRESS REVIEWS -->
    <ProductPressReviews />

    <!-- PRODUCT FAQ -->
    <ProductFAQ />

    <!-- PRODUCT CUSTOMER REVIEWS -->
    <ProductCustomerReviews />

    <!-- SITE FOOTER -->
    <SiteFooter />

    <!-- ASSESSMENT DISCLAIMER -->
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

.assessment-note {
  padding: 25px;
  border-top: 1px solid #1d1d1d;
  color: #666;
  font-size: 11px;
  text-align: center;
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

/* MODALS */

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

@media (max-width: 600px) {
  .pp-modal {
    padding: 26px 22px;
  }

  .pp-modal p {
    font-size: 14px;
  }
}
</style>
