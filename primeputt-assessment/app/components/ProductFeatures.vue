<script setup lang="ts">
const stats = [
  {
    value: "10",
    unit: "STIMP",
    description: "Rolls like your course.",
  },
  {
    value: "4¼",
    unit: "IN",
    description: "Regulation-width cups.",
  },
  {
    value: "98",
    unit: "IN 100",
    description: "Keep it.",
  },
  {
    value: "16,000+",
    unit: "GOLFERS",
    description: "Own one.",
  },
];
</script>

<template>
  <section id="features" class="features-section">
    <!-- STATISTICS -->
    <div class="stats-bar">
      <div class="stats-container">
        <div v-for="stat in stats" :key="stat.value" class="stat-item">
          <div class="stat-heading">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-unit">{{ stat.unit }}</span>
          </div>

          <p>{{ stat.description }}</p>
        </div>
      </div>
    </div>

    <!-- FEATURE 01: LAYS FLAT -->
    <div class="feature-row">
      <div class="feature-copy">
        <div class="feature-copy-inner">
          <span class="feature-number">01</span>
          <span class="feature-eyebrow">LAYS FLAT</span>

          <h2>Unroll it and putt.</h2>

          <p>
            The heavy rubber backing lays flat under its own weight and rolls up
            in seconds. Works on carpet too.
          </p>
        </div>
      </div>

      <div class="feature-media">
        <video
          src="/videos/ProductF/unroll.mp4"
          aria-label="PrimePutt putting mat being unrolled"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          disablepictureinpicture
          disableremoteplayback
          tabindex="-1"
        />
      </div>
    </div>

    <!-- TESTIMONIAL 01 -->
    <div class="feature-quote">
      <blockquote>“Most realistic, not even close.”</blockquote>

      <p>Breaking Eighty · putting mat review</p>
    </div>

    <!-- FEATURE 02: TRUE ROLL -->
    <div class="feature-row feature-reverse">
      <div class="feature-copy">
        <div class="feature-copy-inner">
          <span class="feature-number">02</span>
          <span class="feature-eyebrow">TRUE ROLL</span>

          <h2>Course speed. No ramp. Cups that behave like the hole.</h2>

          <p>
            <strong>Why the cups behave like the hole.</strong>
            Regulation width, recessed below the turf, with the lip set so a
            putt at pace drops and one hit too hard bounces over. A make here is
            a make on the course.
          </p>

          <p>
            <strong>Why there’s no ramp.</strong>
            A ramp asks for more force than the putt you see. Groove that and
            you groove a stroke you never use on the course.
          </p>
        </div>
      </div>

      <div class="feature-media">
        <video
          src="/videos/ProductF/Course-speed.mp4"
          aria-label="Golf ball rolling across the PrimePutt putting mat"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          disablepictureinpicture
          disableremoteplayback
          tabindex="-1"
        />
      </div>
    </div>

    <!-- TESTIMONIAL 02 -->
    <div class="feature-quote">
      <blockquote>
        “A newfound confidence in those crucial 3–5 foot putts.”
      </blockquote>

      <div class="quote-review">
        <span class="quote-stars" aria-label="Five stars">★★★★★</span>
        <span>D.P. · Verified review</span>
      </div>
    </div>

    <!-- FEATURE 03: CRAFTSMANSHIP -->
    <div class="feature-row">
      <div class="feature-copy">
        <div class="feature-copy-inner">
          <span class="feature-number">03</span>
          <span class="feature-eyebrow">CRAFTSMANSHIP</span>

          <h2>Made well enough to leave out.</h2>

          <p>
            Solid walnut and dense nylon turf. Craftsmanship that earns a spot
            in your room.
          </p>
        </div>
      </div>

      <div class="feature-media">
        <video
          src="/videos/ProductF/unroll.mp4"
          aria-label="PrimePutt putting mat being unrolled"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          disablepictureinpicture
          disableremoteplayback
          tabindex="-1"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  width: 100%;
  background: #050505;
  color: #fff;
  overflow: hidden;
  padding-bottom: 60px;
}

/* STATISTICS */

.stats-bar {
  width: 100%;
  margin-bottom: 70px;
  background: #050505;
  border-top: 1px solid #292929;
  border-bottom: 1px solid #292929;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: min(100% - 48px, 1250px);
  margin: 0 auto;
}

.stat-item {
  min-width: 0;
  padding: 25px 22px;
  border-right: 1px solid #242424;
}

.stat-item:first-child {
  padding-left: 0;
}

.stat-item:last-child {
  border-right: none;
}

.stat-heading {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
}

.stat-value {
  color: #ffc568;
  font-size: clamp(36px, 3.4vw, 52px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1;
}

.stat-unit {
  color: #9b9b9b;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
}

.stat-item p {
  margin: 9px 0 0;
  color: #d5d5d5;
  font-size: 13px;
  line-height: 1.5;
}

/* FEATURE ROWS */

.feature-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  min-height: 630px;
  background: #050505;
  border: none;
}

.feature-copy {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 65px clamp(25px, 5vw, 90px);
  background: #050505;
}

.feature-copy-inner {
  width: 100%;
  max-width: 530px;
}

.feature-number {
  display: block;
  margin-bottom: 3px;
  color: #ffc568;
  font-size: clamp(65px, 6vw, 95px);
  font-weight: 300;
  letter-spacing: -5px;
  line-height: 1;
}

.feature-eyebrow {
  display: block;
  margin-bottom: 16px;
  color: #ffc568;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.7px;
}

.feature-copy h2 {
  margin: 0 0 18px;
  font-size: clamp(30px, 3vw, 49px);
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1.08;
}

.feature-copy p {
  margin: 0 0 15px;
  color: #e0e0e0;
  font-size: clamp(14px, 1.1vw, 17px);
  line-height: 1.6;
}

.feature-copy p:last-child {
  margin-bottom: 0;
}

.feature-copy p strong {
  color: #fff;
  font-weight: 800;
}

/* FEATURE MEDIA */

.feature-media {
  position: relative;
  min-width: 0;
  min-height: 630px;
  overflow: hidden;
  background: #050505;
  border-radius: 18px;
  isolation: isolate;
}

.feature-media video {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;

  /* Non-interactive background video */
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
}

/* HIDE NATIVE VIDEO CONTROLS WHERE SUPPORTED */

.feature-media video::-webkit-media-controls {
  display: none !important;
}

.feature-media video::-webkit-media-controls-enclosure {
  display: none !important;
}

.feature-media video::-webkit-media-controls-panel {
  display: none !important;
}

.feature-media video::-webkit-media-controls-start-playback-button {
  display: none !important;
}

/* ALTERNATING FEATURE LAYOUT */

.feature-reverse .feature-copy {
  grid-column: 2;
  grid-row: 1;
}

.feature-reverse .feature-media {
  grid-column: 1;
  grid-row: 1;
}

/* TESTIMONIAL QUOTES */

.feature-quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  padding: 60px 20px;
  background: #050505;
  text-align: center;
  border: none;
}

.feature-quote blockquote {
  max-width: 950px;
  margin: 0;
  color: #ffe0aa;
  font-size: clamp(26px, 3.2vw, 45px);
  font-style: italic;
  font-weight: 500;
  letter-spacing: -1.4px;
  line-height: 1.2;
}

.feature-quote > p {
  margin: 17px 0 0;
  color: #929292;
  font-size: 12px;
}

.quote-review {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 17px;
  color: #999;
  font-size: 12px;
}

.quote-stars {
  color: #ffc568;
  letter-spacing: 1px;
}

/* TABLETS */

@media (max-width: 1000px) {
  .stats-container {
    width: calc(100% - 32px);
  }

  .stat-item {
    padding: 22px 15px;
  }

  .feature-row {
    min-height: 500px;
  }

  .feature-copy {
    padding: 45px 30px;
  }

  .feature-media {
    min-height: 500px;
  }

  .feature-copy h2 {
    font-size: clamp(28px, 3.5vw, 40px);
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .features-section {
    padding-bottom: 35px;
  }

  .stats-bar {
    margin-bottom: 40px;
  }

  .stats-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }

  .stat-item {
    padding: 20px 15px;
  }

  .stat-item:first-child {
    padding-left: 15px;
  }

  .stat-item:nth-child(2) {
    border-right: none;
  }

  .stat-item:nth-child(-n + 2) {
    border-bottom: 1px solid #242424;
  }

  .stat-value {
    font-size: clamp(32px, 8vw, 44px);
  }

  .stat-unit {
    font-size: 9px;
  }

  .stat-item p {
    font-size: 11px;
  }

  .feature-row {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .feature-copy {
    order: 1;
    padding: 65px 20px 40px;
  }

  .feature-copy-inner {
    max-width: 100%;
  }

  .feature-number {
    font-size: 70px;
  }

  .feature-eyebrow {
    margin-bottom: 12px;
  }

  .feature-copy h2 {
    font-size: clamp(30px, 7vw, 40px);
    letter-spacing: -1.4px;
  }

  .feature-copy p {
    font-size: 14px;
  }

  /* Rounded videos with 15px side spacing */

  .feature-media {
    order: 2;
    width: calc(100% - 30px);
    min-height: 0;
    margin: 0 15px;
    aspect-ratio: 4 / 3;
    border-radius: 14px;
  }

  .feature-reverse .feature-copy,
  .feature-reverse .feature-media {
    grid-column: auto;
    grid-row: auto;
  }

  .feature-quote {
    min-height: 220px;
    padding: 55px 20px;
  }

  .feature-quote blockquote {
    font-size: clamp(25px, 6vw, 36px);
    letter-spacing: -0.7px;
  }

  .quote-review {
    flex-wrap: wrap;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .stat-item {
    padding: 18px 10px;
  }

  .stat-item:first-child {
    padding-left: 10px;
  }

  .stat-value {
    font-size: 30px;
  }

  .feature-copy {
    padding: 50px 15px 30px;
  }

  .feature-copy h2 {
    font-size: 29px;
  }
}
</style>
