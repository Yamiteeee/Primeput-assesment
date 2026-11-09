<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const reviews = [
  {
    title: "Yes, it’s more expensive. It’s worth it.",
    description:
      "Did a lot of research before pulling the trigger. The roll is true, it feels like a real green, and I now enjoy the several conference calls I practice, I mean listen to, every week.",
    author: "Dan Nuss · Verified review",
  },
  {
    title: "Great carryover to the course.",
    description:
      "I’ve tried other competitors’ premium mats and none of them come close to the quality of the PrimePutt. I also use it to practice chipping.",
    author: "Preston Casper · Verified review",
  },
  {
    title: "Looks great in his office.",
    description:
      "Bought this for my husband as he did not get many rounds of golf in this summer due to our new baby. He can practice putts while on calls. Matches the decor too.",
    author: "Verified review, bought as a gift",
  },
];

const carouselRef = ref<HTMLElement | null>(null);
const activeSlide = ref(0);
const totalSlides = reviews.length + 1;

let resizeObserver: ResizeObserver | null = null;
let scrollFrame = 0;

function updateActiveSlide() {
  const carousel = carouselRef.value;

  if (!carousel) return;

  const slides = Array.from(carousel.children) as HTMLElement[];

  if (!slides.length) return;

  const carouselLeft = carousel.getBoundingClientRect().left;

  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, index) => {
    const distance = Math.abs(
      slide.getBoundingClientRect().left - carouselLeft,
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  activeSlide.value = closestIndex;
}

function handleScroll() {
  if (scrollFrame) cancelAnimationFrame(scrollFrame);

  scrollFrame = requestAnimationFrame(() => {
    updateActiveSlide();
    scrollFrame = 0;
  });
}

function goToSlide(index: number) {
  const carousel = carouselRef.value;

  if (!carousel) return;

  const slide = carousel.children[index] as HTMLElement | undefined;

  if (!slide) return;

  carousel.scrollTo({
    left: slide.offsetLeft - carousel.offsetLeft,
    behavior: "smooth",
  });

  activeSlide.value = index;
}

onMounted(() => {
  if (!carouselRef.value) return;

  resizeObserver = new ResizeObserver(() => {
    updateActiveSlide();
  });

  resizeObserver.observe(carouselRef.value);
  updateActiveSlide();
});

onUnmounted(() => {
  resizeObserver?.disconnect();

  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame);
  }
});
</script>

<template>
  <section id="reviews" class="reviews-section">
    <div class="reviews-container">
      <!-- FEATURED REVIEW -->
      <div class="featured-review">
        <span class="reviews-eyebrow">WHO HAS ONE</span>

        <h2>
          <span class="quote-mark">“</span>Far and away the best practice mat
          I’ve found, a serious tool in a sea of lame, putt-putt-esque
          novelties. I use it virtually every day.<span class="quote-mark"
            >”</span
          >
        </h2>

        <div class="featured-author">
          <span class="review-stars">★★★★★</span>
          <span>Marty Stutz · Verified review</span>
        </div>
      </div>

      <!-- REVIEW CAROUSEL -->
      <div
        ref="carouselRef"
        class="reviews-grid"
        aria-label="Customer reviews"
        @scroll.passive="handleScroll"
      >
        <!-- VIDEO SLIDE -->
        <div class="review-image">
          <video
            src="/videos/reviewV/review.mp4"
            aria-label="Golf ball rolling on a putting mat"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            disablepictureinpicture
            disableremoteplayback
            tabindex="-1"
          ></video>
        </div>

        <!-- REVIEW SLIDES -->
        <article
          v-for="review in reviews"
          :key="review.title"
          class="review-card"
        >
          <div>
            <span class="review-stars">★★★★★</span>
            <h3>“{{ review.title }}”</h3>
            <p>{{ review.description }}</p>
          </div>

          <span class="review-author">{{ review.author }}</span>
        </article>
      </div>

      <!-- MOBILE PAGINATION -->
      <div class="carousel-pagination" aria-label="Review carousel pagination">
        <button
          v-for="index in totalSlides"
          :key="index"
          type="button"
          class="pagination-dot"
          :class="{ active: activeSlide === index - 1 }"
          :aria-label="`Go to review slide ${index}`"
          :aria-current="activeSlide === index - 1 ? 'true' : undefined"
          @click="goToSlide(index - 1)"
        ></button>
      </div>

      <!-- ALL REVIEWS -->
      <a href="#reviews" class="all-reviews-link">
        Read all the reviews <span aria-hidden="true">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
  width: 100%;
  padding: 100px 24px 110px;
  background: #050505;
  color: #fff;
  border: none;
}

.reviews-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

/* FEATURED REVIEW */

.featured-review {
  margin-bottom: 42px;
}

.reviews-eyebrow {
  display: block;
  margin-bottom: 24px;
  color: #ffc568;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.6px;
}

.featured-review h2 {
  max-width: 850px;
  margin: 0;
  font-size: clamp(34px, 3.3vw, 52px);
  font-weight: 800;
  letter-spacing: -2.5px;
  line-height: 1.03;
}

.quote-mark {
  color: #ffc568;
}

.featured-author {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
  color: #aaa;
  font-size: 12px;
}

.review-stars {
  color: #ffb735;
  font-size: 15px;
  letter-spacing: 1px;
  white-space: nowrap;
}

/* DESKTOP REVIEW GRID */

.reviews-grid {
  display: grid;
  grid-template-columns: 1.2fr repeat(3, minmax(0, 1fr));
  gap: 13px;
  align-items: stretch;
}

.review-image,
.review-card {
  min-width: 0;
  min-height: 305px;
  overflow: hidden;
  border-radius: 6px;
}

/* VIDEO CARD */

.review-image {
  position: relative;
  background: #171717;
  isolation: isolate;
}

.review-image video {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
}

.review-image video::-webkit-media-controls {
  display: none !important;
}

.review-image video::-webkit-media-controls-enclosure {
  display: none !important;
}

.review-image video::-webkit-media-controls-panel {
  display: none !important;
}

.review-image video::-webkit-media-controls-start-playback-button {
  display: none !important;
}

/* REVIEW CARDS */

.review-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 26px 22px 22px;
  background: #171717;
}

.review-card h3 {
  margin: 16px 0 12px;
  font-size: clamp(17px, 1.3vw, 21px);
  font-weight: 800;
  letter-spacing: -0.6px;
  line-height: 1.15;
}

.review-card p {
  margin: 0;
  color: #eee;
  font-size: 14px;
  line-height: 1.55;
}

.review-author {
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
}

/* PAGINATION */

.carousel-pagination {
  display: none;
}

/* BOTTOM LINK */

.all-reviews-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 38px;
  color: #ffc568;
  font-size: 13px;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.all-reviews-link:hover {
  opacity: 0.75;
}

/* TABLET */

@media (max-width: 1000px) {
  .reviews-section {
    padding: 80px 24px 90px;
  }

  .reviews-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .review-image,
  .review-card {
    min-height: 300px;
  }

  .featured-review h2 {
    font-size: clamp(34px, 5vw, 48px);
  }
}

/* MOBILE CAROUSEL */

@media (max-width: 700px) {
  .reviews-section {
    padding: 65px 0 80px;
  }

  .reviews-container {
    max-width: 100%;
  }

  .featured-review {
    margin: 0 15px 32px;
  }

  .reviews-eyebrow {
    margin-bottom: 20px;
    font-size: 11px;
  }

  .featured-review h2 {
    font-size: clamp(30px, 7vw, 40px);
    letter-spacing: -1.4px;
    line-height: 1.1;
  }

  .featured-author {
    gap: 7px;
    font-size: 11px;
  }

  /* HORIZONTAL SWIPE CAROUSEL */

  .reviews-grid {
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 12px;

    width: 100%;
    padding: 0 15px 10px;

    overflow-x: auto;
    overflow-y: hidden;

    scroll-snap-type: x mandatory;
    scroll-padding-inline: 15px;
    scroll-behavior: smooth;
    overscroll-behavior-x: contain;

    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
  }

  .reviews-grid::-webkit-scrollbar {
    display: none;
  }

  .review-image,
  .review-card {
    flex: 0 0 82%;
    width: 82%;
    min-width: 0;
    min-height: 340px;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    border-radius: 6px;
  }

  .review-image {
    height: 340px;
  }

  .review-card {
    padding: 26px 22px;
  }

  .review-card h3 {
    font-size: 21px;
  }

  .review-card p {
    font-size: 14px;
  }

  /* PAGINATION DOTS */

  .carousel-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 9px;
    margin-top: 20px;
  }

  .pagination-dot {
    width: 7px;
    height: 7px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #555;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .pagination-dot.active {
    background: #ffc568;
    transform: scale(1.25);
  }

  .all-reviews-link {
    margin: 30px 15px 0;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .featured-review h2 {
    font-size: 28px;
  }

  .review-image,
  .review-card {
    flex-basis: 86%;
    width: 86%;
  }

  .review-card {
    padding: 22px 18px;
  }

  .review-card h3 {
    font-size: 19px;
  }
}

/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {
  .reviews-grid {
    scroll-behavior: auto;
  }

  .pagination-dot {
    transition: none;
  }
}
</style>
