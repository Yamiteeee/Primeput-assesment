<script setup lang="ts">
const { sizes, selectedSize, selectedProduct, selectSize, formatPrice } =
  useProduct();

const { addToCart } = useCart();

const matDetails = [
  {
    name: "Standard",
    description: "Up to 8-foot putts. Easiest to roll up and move.",
    markers: ["0", "3′", "6′"],
    width: "60%",
  },
  {
    name: "XL",
    description:
      "Up to 11-foot putts. Distance markers at 3, 6 and 9 feet. Most popular.",
    markers: ["0", "3′", "6′", "9′"],
    width: "80%",
  },
  {
    name: "XXL",
    description:
      "Up to 14-foot putts. The full speed ladder, markers at 3, 6, 9 and 12 feet. Our biggest.",
    markers: ["0", "3′", "6′", "9′", "12′"],
    width: "100%",
  },
];

function handleAddToCart() {
  addToCart(selectedProduct.value);
}
</script>

<template>
  <section id="choose-size" class="size-section">
    <div class="size-container">
      <h2>Choose your size.</h2>

      <p class="section-description">
        Allow four feet of width to putt from anywhere along it.
      </p>

      <div class="size-list">
        <button
          v-for="(size, index) in sizes"
          :key="size.name"
          type="button"
          class="size-row"
          :class="{ selected: selectedSize === size.name }"
          :aria-pressed="selectedSize === size.name"
          @click="selectSize(size.name)"
        >
          <!-- SIZE DESCRIPTION -->
          <div class="size-details">
            <div class="size-heading">
              <strong>{{ size.name }}</strong>

              <span>{{ size.dimensions }}</span>

              <span v-if="selectedSize === size.name" class="selected-badge">
                SELECTED
              </span>
            </div>

            <p>{{ matDetails[index]?.description }}</p>
          </div>

          <!-- MAT DIAGRAM -->
          <div class="mat-area">
            <div
              class="mat-wrapper"
              :style="{ width: matDetails[index]?.width }"
            >
              <!-- TOP MEASUREMENTS -->
              <div class="measurement measurement-top">
                <div
                  v-for="(marker, markerIndex) in matDetails[index]?.markers"
                  :key="markerIndex"
                  class="measurement-point"
                >
                  <span>{{ marker }}</span>
                  <i></i>
                </div>
              </div>

              <!-- PUTTING MAT -->
              <div class="putting-mat">
                <div class="walnut-backstop"></div>

                <div class="putting-holes">
                  <span class="putting-hole"></span>
                  <span class="putting-hole"></span>
                  <span class="putting-hole"></span>
                </div>
              </div>

              <!-- BOTTOM MARKERS -->
              <div class="measurement measurement-bottom">
                <div
                  v-for="(marker, markerIndex) in matDetails[index]?.markers"
                  :key="markerIndex"
                  class="measurement-point"
                >
                  <i v-if="markerIndex > 0"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- PRICE -->
          <div class="size-price">
            {{ formatPrice(size.price) }}
          </div>
        </button>
      </div>

      <!-- ADD TO CART -->
      <div class="size-actions">
        <button class="add-button" type="button" @click="handleAddToCart">
          ADD THE {{ selectedSize }} ·
          {{ formatPrice(selectedProduct.price) }}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.size-section {
  width: 100%;
  padding: 100px 24px 110px;
  background: #050505;
  color: #fff;

  /* White divider */
  border-top: 1px solid rgba(255, 255, 255, 0.35);
}

.size-container {
  width: min(100%, 1150px);
  margin: 0 auto;
}

.size-container h2 {
  margin: 0;
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 800;
  letter-spacing: -2.5px;
  line-height: 1.1;
}

.section-description {
  margin: 30px 0 40px;
  color: #929292;
  font-size: 13px;
  text-align: center;
}

/* SIZE ROWS */

.size-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.size-row {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr) 125px;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  text-align: left;
  cursor: pointer;
}

.size-details {
  align-self: start;
  padding-top: 22px;
}

.size-heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
}

.size-heading strong {
  font-size: 15px;
}

.size-heading > span:not(.selected-badge) {
  color: #999;
  font-size: 12px;
}

.size-details p {
  max-width: 180px;
  margin: 7px 0 0;
  color: #999;
  font-size: 12px;
  line-height: 1.35;
}

.selected .size-heading strong {
  color: #ffc568;
}

.selected-badge {
  padding: 4px 6px;
  border-radius: 2px;
  background: #ffc568;
  color: #000;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.4px;
}

/* MAT AREA */

.mat-area {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
}

.mat-wrapper {
  position: relative;
  max-width: 100%;
  padding: 15px 0 8px;
  transition: width 0.25s ease;
}

.putting-mat {
  position: relative;
  width: 100%;
  height: 155px;
  overflow: hidden;
  border: 3px solid transparent;
  border-radius: 9px;
  background:
    radial-gradient(
      ellipse at center,
      rgba(70, 125, 83, 0.45),
      rgba(24, 52, 35, 0.65)
    ),
    #234c33;
}

.selected .putting-mat {
  border-color: #ffc568;
  background:
    radial-gradient(
      ellipse at center,
      rgba(67, 164, 88, 0.7),
      rgba(29, 100, 49, 0.6)
    ),
    #27733e;
}

.walnut-backstop {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: 9px;
  background: #60442d;
}

.putting-holes {
  position: absolute;
  top: 50%;
  left: 12%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  transform: translateY(-50%);
}

.putting-hole {
  display: block;
  width: 19px;
  height: 19px;
  border: 2px solid #aaa;
  border-radius: 50%;
  background: #050505;
}

.putting-hole:nth-child(2) {
  margin-left: -25px;
}

/* MEASUREMENT MARKERS */

.measurement {
  position: absolute;
  right: 0;
  left: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}

.measurement-top {
  top: -2px;
}

.measurement-bottom {
  bottom: 0;
}

.measurement-point {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-width: 0;
  color: #777;
  font-size: 12px;
  font-weight: 700;
}

.measurement-point i {
  width: 8px;
  height: 8px;
  background: #929292;
  transform: rotate(45deg);
}

.measurement-top .measurement-point:first-child i,
.measurement-bottom .measurement-point:first-child i {
  display: none;
}

.selected .measurement-point {
  color: #ffc568;
}

.selected .measurement-point i {
  background: #eee;
}

/* PRICE */

.size-price {
  align-self: start;
  padding-top: 22px;
  font-size: clamp(18px, 1.8vw, 23px);
  font-weight: 800;
  white-space: nowrap;
}

.selected .size-price {
  color: #ffc568;
}

/* ADD BUTTON */

.size-actions {
  margin: 35px 0 0 200px;
}

.add-button {
  min-height: 60px;
  padding: 18px 26px;
  border: 0;
  border-radius: 4px;
  background: #ffc568;
  color: #080808;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.add-button:hover {
  background: #ffd28a;
  transform: translateY(-2px);
}

/* TABLET */

@media (max-width: 1000px) {
  .size-section {
    padding: 75px 20px;
  }

  .size-row {
    grid-template-columns: 150px minmax(0, 1fr) 100px;
    gap: 15px;
  }

  .size-details p {
    font-size: 11px;
  }

  .putting-mat {
    height: 125px;
  }

  .putting-holes {
    height: 75px;
  }

  .size-actions {
    margin-left: 165px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .size-section {
    padding: 65px 15px 75px;
  }

  .size-container h2 {
    font-size: 38px;
    letter-spacing: -1.8px;
  }

  .section-description {
    margin: 20px 0 35px;
    text-align: left;
  }

  .size-list {
    gap: 35px;
  }

  .size-row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
  }

  .size-details {
    grid-column: 1;
    grid-row: 1;
    padding-top: 0;
  }

  .size-details p {
    max-width: 100%;
  }

  .size-price {
    grid-column: 2;
    grid-row: 1;
    padding-top: 0;
    font-size: 18px;
  }

  .mat-area {
    grid-column: 1 / -1;
    grid-row: 2;
    margin-top: 12px;
  }

  .mat-wrapper {
    padding-top: 18px;
  }

  .putting-mat {
    height: clamp(90px, 26vw, 140px);
  }

  .putting-holes {
    height: 65%;
  }

  .putting-hole {
    width: 15px;
    height: 15px;
  }

  .putting-hole:nth-child(2) {
    margin-left: -15px;
  }

  .measurement-point {
    font-size: 10px;
  }

  .measurement-point i {
    width: 6px;
    height: 6px;
  }

  .size-actions {
    margin: 35px 0 0;
  }

  .add-button {
    width: 100%;
    padding: 17px 12px;
    font-size: 12px;
    letter-spacing: 1px;
  }
}

@media (max-width: 360px) {
  .size-container h2 {
    font-size: 33px;
  }

  .size-heading strong {
    font-size: 13px;
  }

  .size-price {
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-wrapper,
  .add-button {
    transition: none;
  }
}
</style>
