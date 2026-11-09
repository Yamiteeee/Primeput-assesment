<script setup lang="ts">
const emit = defineEmits<{
  (e: "open-guarantee"): void;
}>();

const dots = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  outlined: index === 37 || index === 81,
}));
</script>

<template>
  <section id="guarantee" class="guarantee-section">
    <div class="guarantee-container">
      <!-- LEFT: 98 IN 100 -->
      <div class="guarantee-visual">
        <div class="guarantee-stat">
          <span class="guarantee-number">98</span>
          <span class="guarantee-label">IN 100 KEEP IT</span>
        </div>

        <div
          class="dots-grid"
          role="img"
          aria-label="98 out of 100 customers keep their putting mat"
        >
          <span
            v-for="dot in dots"
            :key="dot.id"
            class="dot"
            :class="{ 'dot-outline': dot.outlined }"
            aria-hidden="true"
          ></span>
        </div>
      </div>

      <!-- RIGHT: REFUND MESSAGE -->
      <div class="guarantee-content">
        <h2>
          The worst case<br />
          is a full refund.
        </h2>

        <p>Love it or send it back.</p>

        <button
          type="button"
          class="guarantee-button"
          @click="emit('open-guarantee')"
        >
          DETAILS <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.guarantee-section {
  width: 100%;
  padding: 115px 24px;
  background: #050505;
  color: #fff;
  border-top: 1px solid #242424;
  border-bottom: 1px solid #242424;
}

.guarantee-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: clamp(70px, 9vw, 160px);
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
}

/* LEFT SIDE */

.guarantee-visual {
  width: 100%;
  max-width: 390px;
}

.guarantee-stat {
  display: flex;
  align-items: baseline;
  gap: 9px;
  margin-bottom: 15px;
}

.guarantee-number {
  color: #ffc568;
  font-size: clamp(55px, 5vw, 72px);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
}

.guarantee-label {
  color: #aaa;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.8px;
}

/* 100 DOTS */

.dots-grid {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 11px;
  width: 100%;
}

.dot {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffc568;
}

.dot-outline {
  background: transparent;
  border: 2px solid #fff;
}

/* RIGHT SIDE */

.guarantee-content {
  min-width: 0;
}

.guarantee-content h2 {
  margin: 0 0 14px;
  font-size: clamp(36px, 3.5vw, 55px);
  font-weight: 800;
  letter-spacing: -2.5px;
  line-height: 1.04;
}

.guarantee-content p {
  margin: 0 0 24px;
  color: #e5e5e5;
  font-size: clamp(15px, 1.3vw, 18px);
  line-height: 1.5;
}

.guarantee-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 47px;
  padding: 0 20px;
  background: transparent;
  border: 1px solid #ffc568;
  border-radius: 4px;
  color: #ffc568;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.guarantee-button:hover {
  background: #ffc568;
  color: #050505;
}

/* TABLET */

@media (max-width: 1000px) {
  .guarantee-section {
    padding: 95px 24px;
  }

  .guarantee-container {
    gap: 50px;
  }

  .guarantee-visual {
    max-width: 340px;
  }

  .dots-grid {
    gap: 9px;
  }

  .guarantee-content h2 {
    font-size: clamp(34px, 4vw, 48px);
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .guarantee-section {
    padding: 75px 20px 85px;
  }

  .guarantee-container {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .guarantee-visual {
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
  }

  .guarantee-stat {
    margin-bottom: 16px;
  }

  .guarantee-number {
    font-size: 60px;
  }

  .guarantee-label {
    font-size: 11px;
  }

  .dots-grid {
    gap: 9px;
  }

  .guarantee-content {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
  }

  .guarantee-content h2 {
    font-size: clamp(36px, 9vw, 48px);
    letter-spacing: -2px;
  }

  .guarantee-content p {
    font-size: 16px;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .guarantee-section {
    padding: 65px 15px 75px;
  }

  .dots-grid {
    gap: 7px;
  }

  .guarantee-number {
    font-size: 54px;
  }

  .guarantee-content h2 {
    font-size: 34px;
  }
}
</style>
