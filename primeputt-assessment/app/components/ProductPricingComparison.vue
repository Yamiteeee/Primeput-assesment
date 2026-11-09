<script setup lang="ts">
const comparisons = [
  {
    price: "$499–$599",
    description:
      "PrimePutt: dense course-speed turf, durable outdoors, made to look great inside. Cups that perform like a real hole. Solid walnut backstop.",
    featured: true,
  },
  {
    price: "$500",
    description: "Outdoor turf, built for a backyard, rubber bumpers",
    featured: false,
  },
  {
    price: "$150",
    description: "Velvet surface on a ramp; holes cut smaller than regulation",
    featured: false,
  },
  {
    price: "$40",
    description:
      "Carpet on a foam backing; curls and creases after it’s been rolled",
    featured: false,
  },
];
</script>

<template>
  <section id="pricing-comparison" class="comparison-section">
    <div class="comparison-container">
      <div class="comparison-heading">
        <h2>Why it costs<br />what it costs.</h2>
      </div>

      <div class="comparison-table">
        <div class="table-heading">PUTTING MATS, BY WHAT THEY ARE</div>

        <div
          v-for="(item, index) in comparisons"
          :key="index"
          class="comparison-row"
          :class="{ featured: item.featured }"
        >
          <span class="comparison-price">{{ item.price }}</span>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comparison-section {
  width: 100%;
  padding: 110px 24px 120px;
  background: #050505;
  color: #fff;
}

.comparison-container {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.5fr);
  align-items: start;
  gap: 70px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.comparison-heading h2 {
  margin: 0;
  font-size: clamp(38px, 3.5vw, 56px);
  font-weight: 800;
  letter-spacing: -2.5px;
  line-height: 1.05;
}

/* COMPARISON TABLE */

.comparison-table {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #303030;
  border-radius: 6px;
  background: #171717;
}

.table-heading {
  padding: 22px 20px 15px;
  color: #aaa;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.comparison-row {
  display: grid;
  grid-template-columns: minmax(100px, 140px) minmax(0, 1fr);
  align-items: center;
  gap: 20px;
  margin: 0 20px;
  padding: 20px 0;
  border-bottom: 1px solid #2d2d2d;
}

.comparison-row:last-child {
  border-bottom: none;
}

.comparison-row.featured {
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid #40382b;
  background: #30291f;
}

.comparison-price {
  color: #aaa;
  font-size: clamp(19px, 1.5vw, 23px);
  font-weight: 800;
  letter-spacing: -0.6px;
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.comparison-row.featured .comparison-price {
  color: #ffc568;
}

.comparison-row p {
  min-width: 0;
  margin: 0;
  color: #bbb;
  font-size: 13px;
  line-height: 1.55;
}

.comparison-row.featured p {
  color: #fff;
}

/* TABLET */

@media (max-width: 1000px) {
  .comparison-section {
    padding: 85px 24px 95px;
  }

  .comparison-container {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
    gap: 35px;
  }

  .comparison-row {
    grid-template-columns: minmax(90px, 120px) minmax(0, 1fr);
    gap: 15px;
  }

  .comparison-price {
    font-size: 19px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .comparison-section {
    padding: 75px 15px 85px;
  }

  .comparison-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .comparison-heading h2 {
    font-size: clamp(38px, 9vw, 50px);
    letter-spacing: -2px;
  }

  .table-heading {
    padding: 20px 15px 12px;
    font-size: 10px;
  }

  .comparison-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    margin: 0 15px;
    padding: 17px 0;
  }

  .comparison-row.featured {
    margin: 0;
    padding: 18px 15px;
  }

  .comparison-price {
    font-size: 20px;
  }

  .comparison-row p {
    font-size: 13px;
  }
}
</style>
