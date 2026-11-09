<script setup lang="ts">
import { computed, ref } from "vue";

const { selectedProduct, formatPrice } = useProduct();
const { addToCart } = useCart();

type Review = {
  id: number;
  name: string;
  initials: string;
  date: string;
  title: string;
  body: string;
  rating: number;
  recommended: boolean;
  handicap?: string;
  reply?: string;
  replyDate?: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Jamie B.",
    initials: "JB",
    date: "2026-11-03",
    title: "Satisfied Buyer",
    body: "Ready to go straight out of the box...putts true to a 10 speed. Long enough to chip onto from a separate mat which adds to drill options. It's a 10/10 for me.",
    rating: 5,
    recommended: true,
    handicap: "12",
    reply:
      "Thank you for the wonderful feedback! We're thrilled you're enjoying the mat and appreciate your 10/10 rating!",
    replyDate: "2026-11-04",
  },
  {
    id: 2,
    name: "Jamie",
    initials: "J",
    date: "2026-10-31",
    title: "",
    body: "Putts true to quality public/private club green speeds around 10. Exactly what I wanted for at home drills and the ability to bump and run onto it is better than I expected. Worth every penny.",
    rating: 5,
    recommended: false,
    reply:
      "Thank you so much for the wonderful feedback! We're thrilled to hear the mat is delivering the putting experience you were looking for. We truly appreciate your support!",
    replyDate: "2026-11-02",
  },
  {
    id: 3,
    name: "Bruce M.",
    initials: "BM",
    date: "2026-10-27",
    title: "PrimePutt",
    body: "I've been hearing this! We're glad you appreciate the realistic putting surface and feel it's worth the investment. We hope it helps you keep building confidence in your game!",
    rating: 5,
    recommended: true,
  },
  {
    id: 4,
    name: "Nacho",
    initials: "N",
    date: "2026-10-26",
    title: "Game changer",
    body: "Really helps address aim and pace. Would benefit from some shims/pads to create breaks.",
    rating: 5,
    recommended: true,
    handicap: "20+",
    reply:
      "Thank you for sharing this! We're glad the mat is helping with your aim and pace. We've also emailed you more information on creating shims to add breaks to your putting surface!",
    replyDate: "2026-10-28",
  },
  {
    id: 5,
    name: "Phil",
    initials: "P",
    date: "2026-10-20",
    title: "Perfect",
    body: "11 on the stimp and just like having a real green in your house.",
    rating: 5,
    recommended: true,
    handicap: "14",
    reply:
      "Thank you for the great feedback! We're thrilled you're enjoying the realistic putting experience!",
    replyDate: "2026-10-21",
  },
];

const questions = [
  {
    id: 1,
    name: "Customer question",
    date: "2026-10-20",
    question: "Does the mat work on carpet?",
    answer:
      "The heavy rubber backing helps the mat lie flat. A firm, level surface provides the most consistent roll.",
  },
  {
    id: 2,
    name: "Customer question",
    date: "2026-10-18",
    question: "Which size should I choose?",
    answer:
      "Standard is 3′ × 9′, XL is 3′ × 12′, and XXL is 3′ × 15′. Choose based on your available space and preferred putting distance.",
  },
];

const activeTab = ref<"reviews" | "questions">("reviews");
const sortOrder = ref("recent");
const selectedRating = ref<number | null>(null);
const currentPage = ref(1);
const perPage = 3;

const ratingBreakdown = [
  { stars: 5, count: 271 },
  { stars: 4, count: 22 },
  { stars: 3, count: 5 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

const sortedReviews = computed(() => {
  let result = [...reviews];

  if (selectedRating.value !== null) {
    result = result.filter((review) => review.rating === selectedRating.value);
  }

  if (sortOrder.value === "oldest") {
    result.sort((a, b) => a.date.localeCompare(b.date));
  } else if (sortOrder.value === "highest") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortOrder.value === "lowest") {
    result.sort((a, b) => a.rating - b.rating);
  } else {
    result.sort((a, b) => b.date.localeCompare(a.date));
  }

  return result;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedReviews.value.length / perPage)),
);

const visibleReviews = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return sortedReviews.value.slice(start, start + perPage);
});

const helpfulVotes = ref<Record<number, "up" | "down" | null>>({});

function vote(reviewId: number, direction: "up" | "down") {
  helpfulVotes.value[reviewId] =
    helpfulVotes.value[reviewId] === direction ? null : direction;
}

function changeTab(tab: "reviews" | "questions") {
  activeTab.value = tab;
  currentPage.value = 1;
}

function filterRating(stars: number) {
  selectedRating.value = selectedRating.value === stars ? null : stars;

  currentPage.value = 1;
}

function clearRatingFilter() {
  selectedRating.value = null;
  currentPage.value = 1;
}

function changePage(page: number) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value);
}

function addSelectedProduct() {
  addToCart(selectedProduct.value);
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}
</script>

<template>
  <section id="customer-reviews" class="customer-section">
    <div class="customer-container">
      <!-- PRODUCT CTA -->
      <div class="product-cta">
        <h2>
          Bring<br />
          the<br />
          green<br />
          home.
        </h2>

        <div class="cta-details">
          <div class="cta-price">
            {{ formatPrice(selectedProduct.price) }}
          </div>

          <p class="cta-product">
            PrimePutt {{ selectedProduct.name }} ·
            {{ selectedProduct.dimensions }}
          </p>

          <button type="button" class="cta-button" @click="addSelectedProduct">
            ADD TO CART
            <span aria-hidden="true">→</span>
          </button>

          <p class="cta-guarantee">
            60-day money-back guarantee · One-year warranty · Free shipping and
            returns in the continental U.S.
          </p>
        </div>
      </div>

      <!-- RATINGS SUMMARY -->
      <div class="ratings-summary">
        <!-- OVERALL RATING -->
        <div class="rating-overview">
          <div class="rating-score">
            <span>4.9</span>
            <span class="stars">★★★★★</span>
          </div>

          <p>Based on 300 Reviews</p>
        </div>

        <!-- RATING BREAKDOWN -->
        <div class="rating-bars">
          <button
            v-for="rating in ratingBreakdown"
            :key="rating.stars"
            type="button"
            class="rating-bar-row"
            :class="{
              selected: selectedRating === rating.stars,
            }"
            :aria-label="`Filter ${rating.stars}-star reviews`"
            :aria-pressed="selectedRating === rating.stars"
            @click="filterRating(rating.stars)"
          >
            <span class="rating-stars">
              <span>
                {{ "★".repeat(rating.stars) }}
              </span>
              <span class="empty-stars">
                {{ "☆".repeat(5 - rating.stars) }}
              </span>
            </span>

            <span class="bar-track">
              <span
                class="bar-fill"
                :style="{
                  width: `${(rating.count / 300) * 100}%`,
                }"
              ></span>
            </span>

            <span class="rating-count"> ({{ rating.count }}) </span>
          </button>
        </div>
      </div>

      <!-- RECOMMENDATION -->
      <div class="recommendation">
        <strong>100%</strong>
        <span> reviewers would recommend this product </span>
      </div>

      <!-- REVIEW ACTIONS -->
      <div class="review-actions">
        <button
          type="button"
          class="outline-action"
          @click="changeTab('questions')"
        >
          ASK A QUESTION
        </button>

        <button
          type="button"
          class="outline-action"
          @click="changeTab('reviews')"
        >
          WRITE A REVIEW
        </button>
      </div>

      <!-- TABS -->
      <div class="review-tabs">
        <button
          type="button"
          :class="{ active: activeTab === 'reviews' }"
          @click="changeTab('reviews')"
        >
          Reviews
          <span>300</span>
        </button>

        <button
          type="button"
          :class="{ active: activeTab === 'questions' }"
          @click="changeTab('questions')"
        >
          Questions
          <span>87</span>
        </button>
      </div>

      <!-- REVIEWS -->
      <template v-if="activeTab === 'reviews'">
        <!-- FILTER TOOLBAR -->
        <div class="review-toolbar">
          <div class="filter-label">
            Filter Reviews:

            <button
              v-if="selectedRating !== null"
              type="button"
              class="clear-filter"
              @click="clearRatingFilter"
            >
              {{ selectedRating }} stars ×
            </button>
          </div>

          <select
            v-model="sortOrder"
            aria-label="Sort reviews"
            @change="currentPage = 1"
          >
            <option value="recent">Most Recent</option>

            <option value="oldest">Oldest</option>

            <option value="highest">Highest Rating</option>

            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        <!-- REVIEW LIST -->
        <div v-if="visibleReviews.length" class="review-list">
          <article
            v-for="review in visibleReviews"
            :key="review.id"
            class="customer-review"
          >
            <!-- REVIEWER -->
            <div class="review-top">
              <div class="review-person">
                <span class="avatar">
                  {{ review.initials }}
                </span>

                <div>
                  <strong>
                    {{ review.name }}
                  </strong>

                  <small> United States </small>
                </div>
              </div>

              <time :datetime="review.date">
                {{ formatDate(review.date) }}
              </time>
            </div>

            <!-- RECOMMENDED -->
            <div v-if="review.recommended" class="recommended">
              <span>👍</span>
              I recommend this product
            </div>

            <!-- REVIEW TITLE -->
            <div class="review-title">
              <span class="stars">
                {{ "★".repeat(review.rating) }}
              </span>

              <strong v-if="review.title">
                {{ review.title }}
              </strong>
            </div>

            <!-- REVIEW CONTENT -->
            <p class="review-body">
              {{ review.body }}
            </p>

            <!-- HANDICAP -->
            <div v-if="review.handicap" class="review-handicap">
              <strong> What is your golf handicap? </strong>

              <span>
                {{ review.handicap }}
              </span>
            </div>

            <!-- PRODUCT NAME -->
            <p class="review-product-name">TrueGreen™ Putting Mat</p>

            <!-- REVIEW FOOTER -->
            <div class="review-footer">
              <span>Share</span>

              <div class="helpful">
                <span> Was this helpful? </span>

                <button
                  type="button"
                  :aria-pressed="helpfulVotes[review.id] === 'up'"
                  @click="vote(review.id, 'up')"
                >
                  👍
                  {{ helpfulVotes[review.id] === "up" ? 1 : 0 }}
                </button>

                <button
                  type="button"
                  :aria-pressed="helpfulVotes[review.id] === 'down'"
                  @click="vote(review.id, 'down')"
                >
                  👎
                  {{ helpfulVotes[review.id] === "down" ? 1 : 0 }}
                </button>
              </div>
            </div>

            <!-- MERCHANT REPLY -->
            <div v-if="review.reply" class="merchant-reply">
              <div class="reply-heading">
                <strong>PrimePutt</strong>

                <time v-if="review.replyDate" :datetime="review.replyDate">
                  {{ formatDate(review.replyDate) }}
                </time>
              </div>

              <p>
                {{ review.reply }}
              </p>
            </div>
          </article>
        </div>

        <!-- EMPTY REVIEWS -->
        <p v-else class="empty-reviews">No sample reviews match this rating.</p>

        <!-- PAGINATION -->
        <div v-if="totalPages > 1" class="review-pagination">
          <button
            type="button"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            &lt;
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            :class="{ active: currentPage === page }"
            :aria-current="currentPage === page ? 'page' : undefined"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button
            type="button"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            &gt;
          </button>
        </div>
      </template>

      <!-- QUESTIONS -->
      <div v-else class="questions-list">
        <article
          v-for="question in questions"
          :key="question.id"
          class="question-item"
        >
          <div class="question-heading">
            <strong>
              {{ question.name }}
            </strong>

            <time :datetime="question.date">
              {{ formatDate(question.date) }}
            </time>
          </div>

          <h3>
            {{ question.question }}
          </h3>

          <div class="merchant-reply">
            <strong>PrimePutt</strong>

            <p>
              {{ question.answer }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* =========================================
   CUSTOMER REVIEWS SECTION
========================================= */

.customer-section {
  width: 100%;
  padding: 0 24px 110px;
  background: #050505;
  color: #fff;
  border-top: 1px solid #242424;
}

.customer-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

/* =========================================
   PRODUCT CTA
========================================= */

.product-cta {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: center;
  column-gap: 65px;
  min-height: 570px;
  padding: 0 0 75px;
}

.product-cta h2 {
  margin: 0;
  font-size: clamp(75px, 7.8vw, 125px);
  font-weight: 900;
  letter-spacing: -6px;
  line-height: 1;
}

.cta-details {
  width: 100%;
  max-width: 490px;
  margin-top: 15px;
}

.cta-price {
  font-size: clamp(35px, 3.3vw, 44px);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;
}

.cta-product {
  margin: 6px 0 18px;
  color: #aaa;
  font-size: 13px;
  line-height: 1.4;
}

.cta-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 300px;
  min-height: 61px;
  padding: 12px 20px;
  border: none;
  border-radius: 3px;
  background: #ffc568;
  color: #050505;
  font-family: inherit;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cta-button:hover {
  background: #ffd48b;
}

.cta-button:focus-visible,
.outline-action:focus-visible,
.rating-bar-row:focus-visible {
  outline: 2px solid #ffc568;
  outline-offset: 4px;
}

.cta-guarantee {
  max-width: 490px;
  margin: 15px 0 0;
  color: #aaa;
  font-size: 13px;
  line-height: 1.5;
}

/* =========================================
   RATINGS SUMMARY
========================================= */

.ratings-summary {
  display: grid;
  grid-template-columns: 205px 280px minmax(0, 280px);
  align-items: start;
  column-gap: 22px;
  width: 100%;
  min-height: 125px;
  margin: 0 0 15px;
}

/* Placeholder for unavailable review gallery */

.ratings-summary::after {
  content: "";
  display: block;
  min-height: 115px;
  border-left: 1px solid #333;
}

.rating-overview {
  min-width: 0;
  min-height: 115px;
  padding-right: 20px;
  border-right: 1px solid #333;
}

.rating-score {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-size: 37px;
  font-weight: 400;
  line-height: 1.1;
}

.stars {
  color: #ffc568;
  letter-spacing: 0;
  white-space: nowrap;
}

.rating-score .stars {
  font-size: 23px;
  letter-spacing: -1px;
}

.rating-overview p {
  margin: 9px 0 0;
  font-size: 14px;
  line-height: 1.4;
}

.rating-bars {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 3px;
  min-width: 0;
  min-height: 115px;
  padding-right: 0;
}

.rating-bar-row {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr) 32px;
  align-items: center;
  gap: 7px;
  width: 100%;
  min-height: 19px;
  padding: 0;
  border: none;
  background: transparent;
  color: #fff;
  text-align: left;
  cursor: pointer;
}

.rating-bar-row.selected {
  outline: 1px solid #ffc568;
  outline-offset: 3px;
}

.rating-stars {
  color: #ffc568;
  font-size: 15px;
  letter-spacing: -1px;
  line-height: 1;
  white-space: nowrap;
}

.empty-stars {
  color: #777;
}

.bar-track {
  display: block;
  width: 100%;
  height: 13px;
  overflow: hidden;
  background: #202020;
}

.bar-fill {
  display: block;
  height: 100%;
  background: #ffc568;
}

.rating-count {
  color: #aaa;
  font-size: 11px;
  text-align: right;
  white-space: nowrap;
}

/* =========================================
   RECOMMENDATION
========================================= */

.recommendation {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.5;
}

.recommendation strong {
  display: inline-flex;
  align-items: center;
  min-height: 27px;
  padding: 3px 6px;
  background: #263b30;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}

/* =========================================
   REVIEW ACTION BUTTONS
========================================= */

.review-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;
  margin: -4px 0 22px;
}

.outline-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 37px;
  padding: 0 18px;
  border: 1px solid #666;
  border-radius: 2px;
  background: transparent;
  color: #fff;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
}

.outline-action:hover {
  border-color: #ffc568;
  color: #ffc568;
}

/* =========================================
   REVIEW TABS
========================================= */

.review-tabs {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  border-bottom: 1px solid #383838;
}

.review-tabs button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 43px;
  padding: 0 8px 10px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #ccc;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
}

.review-tabs button.active {
  border-bottom-color: #fff;
  color: #fff;
}

.review-tabs button span {
  padding: 3px 6px;
  border-radius: 2px;
  background: #242424;
  color: #fff;
  font-size: 12px;
}

/* =========================================
   FILTER TOOLBAR
========================================= */

.review-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 85px;
  border-bottom: 1px solid #444;
}

.filter-label {
  font-size: 13px;
  font-weight: 700;
}

.clear-filter {
  margin-left: 10px;
  padding: 5px 9px;
  border: 1px solid #ffc568;
  border-radius: 3px;
  background: transparent;
  color: #ffc568;
  font-family: inherit;
  cursor: pointer;
}

.review-toolbar select {
  min-height: 37px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #fff;
  color: #111;
  font-family: inherit;
  font-size: 13px;
}

/* =========================================
   CUSTOMER REVIEW LIST
========================================= */

.customer-review {
  padding: 30px 0 35px;
  border-bottom: 1px solid #292929;
}

.review-top,
.review-person,
.review-title,
.review-footer,
.helpful,
.reply-heading,
.question-heading {
  display: flex;
  align-items: center;
}

.review-top,
.review-footer,
.reply-heading,
.question-heading {
  justify-content: space-between;
}

.review-top {
  gap: 16px;
}

.review-person {
  gap: 12px;
  min-width: 0;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: #20392f;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}

.review-person strong,
.review-person small {
  display: block;
}

.review-person strong {
  font-size: 14px;
}

.review-person small,
.review-top time,
.reply-heading time,
.question-heading time {
  color: #999;
  font-size: 12px;
}

.recommended {
  margin-top: 20px;
  font-size: 13px;
}

.recommended span {
  color: #15bd80;
}

.review-title {
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 19px;
  font-size: 15px;
}

.review-title .stars {
  font-size: 18px;
}

.review-body {
  max-width: 900px;
  margin: 12px 0 20px;
  font-size: 15px;
  line-height: 1.7;
}

.review-handicap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 22px 0;
  font-size: 13px;
}

.review-product-name {
  margin: 24px 0;
  color: #ccc;
  font-size: 13px;
}

.review-footer {
  gap: 15px;
  margin-top: 25px;
  color: #aaa;
  font-size: 12px;
}

.helpful {
  gap: 10px;
}

.helpful button {
  border: none;
  background: transparent;
  color: #aaa;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.helpful button[aria-pressed="true"] {
  color: #ffc568;
}

/* =========================================
   MERCHANT REPLY
========================================= */

.merchant-reply {
  margin: 22px 0 0 28px;
  padding: 10px 0 10px 18px;
  border-left: 4px solid #fff;
}

.reply-heading {
  gap: 15px;
}

.reply-heading strong,
.merchant-reply > strong {
  font-size: 13px;
}

.merchant-reply p {
  margin: 10px 0 0;
  color: #ddd;
  font-size: 14px;
  line-height: 1.7;
}

/* =========================================
   PAGINATION
========================================= */

.review-pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 40px;
}

.review-pagination button {
  min-width: 36px;
  min-height: 36px;
  padding: 0 9px;
  border: 1px solid #ffc568;
  background: transparent;
  color: #ffc568;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
}

.review-pagination button.active,
.review-pagination button:hover:not(:disabled) {
  background: #ffc568;
  color: #050505;
}

.review-pagination button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* =========================================
   QUESTIONS
========================================= */

.question-item {
  padding: 30px 0;
  border-bottom: 1px solid #292929;
}

.question-heading {
  gap: 15px;
}

.question-heading strong {
  font-size: 14px;
}

.question-item h3 {
  margin: 22px 0;
  font-size: 19px;
}

.empty-reviews {
  padding: 40px 0;
  color: #aaa;
  font-size: 14px;
}

/* =========================================
   DESKTOP — MATCH ORIGINAL PRIMEPUTT
========================================= */

@media (min-width: 1001px) {
  .customer-section {
    padding: 35px 24px 110px;
  }

  .customer-container {
    max-width: 1100px;
  }

  .product-cta {
    grid-template-columns: 440px minmax(0, 1fr);
    align-items: start;
    column-gap: 55px;
    min-height: 0;
    padding-bottom: 95px;
  }

  /* Prevent text overlap */

  .product-cta h2 {
    font-size: clamp(100px, 7.8vw, 132px);
    font-weight: 900;
    letter-spacing: -7px;
    line-height: 1;
  }

  /* Position price/cart alongside heading */

  .cta-details {
    width: 100%;
    max-width: 520px;
    margin-top: 0;
    padding-top: 225px;
  }

  .cta-price {
    font-size: 44px;
    font-weight: 800;
    letter-spacing: -1.8px;
    line-height: 1.1;
  }

  .cta-product {
    margin: 5px 0 18px;
    font-size: 13px;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
    min-height: 60px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 1.5px;
  }

  .cta-guarantee {
    max-width: 520px;
    margin-top: 15px;
    font-size: 13px;
    line-height: 1.55;
  }

  /* RATINGS */

  .ratings-summary {
    grid-template-columns: 200px 255px minmax(0, 280px);
    gap: 20px;
    margin-bottom: 18px;
  }

  .rating-overview,
  .rating-bars {
    min-height: 114px;
  }

  .rating-overview {
    border-right: 1px solid #333;
  }

  .rating-score {
    gap: 10px;
    font-size: 36px;
  }

  .rating-score .stars {
    font-size: 23px;
  }

  .rating-overview p {
    margin-top: 8px;
    font-size: 14px;
  }

  .rating-bars {
    padding-right: 18px;
  }

  .rating-bar-row {
    grid-template-columns: 70px minmax(0, 1fr) 35px;
    gap: 7px;
    padding: 3px 0;
  }

  .rating-stars {
    font-size: 14px;
  }

  .bar-track {
    height: 13px;
  }

  .rating-count {
    font-size: 11px;
  }

  /* RECOMMENDATION */

  .recommendation {
    gap: 8px;
    font-size: 14px;
  }

  .recommendation strong {
    padding: 5px 6px;
    font-size: 14px;
  }

  /* ACTION BUTTONS */

  .review-actions {
    gap: 14px;
    margin-top: -5px;
    margin-bottom: 30px;
  }

  .outline-action {
    min-height: 38px;
    padding: 0 18px;
    font-size: 12px;
  }

  .review-tabs button {
    font-size: 14px;
  }
}

/* =========================================
   TABLET
========================================= */

@media (min-width: 701px) and (max-width: 1000px) {
  .customer-section {
    padding: 0 24px 95px;
  }

  .product-cta {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 40px;
    min-height: 510px;
    padding-bottom: 65px;
  }

  .product-cta h2 {
    font-size: clamp(65px, 9vw, 105px);
    letter-spacing: -5px;
    line-height: 1;
  }

  .cta-details {
    margin-top: 0;
  }

  .ratings-summary {
    grid-template-columns: 190px minmax(0, 260px) minmax(0, 1fr);
    gap: 18px;
  }

  .rating-score {
    font-size: 33px;
  }

  .rating-score .stars {
    font-size: 20px;
  }

  .rating-bar-row {
    grid-template-columns: 72px minmax(0, 1fr) 30px;
    gap: 5px;
  }

  .rating-stars {
    font-size: 13px;
  }
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 700px) {
  .customer-section {
    padding: 0 18px 80px;
  }

  .product-cta {
    grid-template-columns: 1fr;
    gap: 35px;
    min-height: 0;
    padding: 65px 0 75px;
  }

  .product-cta h2 {
    font-size: clamp(70px, 16vw, 105px);
    letter-spacing: -5px;
    line-height: 1;
  }

  .cta-details {
    max-width: 100%;
    margin-top: 0;
  }

  .cta-price {
    font-size: 37px;
  }

  .cta-product {
    font-size: 13px;
  }

  .cta-button {
    max-width: 100%;
    min-height: 55px;
    font-size: 13px;
  }

  .cta-guarantee {
    max-width: 100%;
    font-size: 12px;
  }

  .ratings-summary {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
    gap: 15px;
    min-height: 0;
    margin-bottom: 20px;
  }

  .ratings-summary::after {
    display: none;
  }

  .rating-overview {
    min-height: 110px;
    padding-right: 12px;
  }

  .rating-score {
    flex-wrap: wrap;
    gap: 5px;
    font-size: 30px;
  }

  .rating-score .stars {
    font-size: 18px;
  }

  .rating-overview p {
    font-size: 12px;
  }

  .rating-bars {
    min-height: 110px;
  }

  .rating-bar-row {
    grid-template-columns: 58px minmax(0, 1fr) 27px;
    gap: 4px;
    min-height: 19px;
  }

  .rating-stars {
    font-size: 11px;
  }

  .bar-track {
    height: 11px;
  }

  .rating-count {
    font-size: 10px;
  }

  .recommendation {
    margin-top: 10px;
    font-size: 12px;
  }

  .review-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    margin: 30px 0 25px;
  }

  .outline-action {
    flex: 1 1 140px;
    min-height: 40px;
    padding: 0 10px;
    font-size: 11px;
  }

  .review-tabs {
    gap: 15px;
  }

  .review-tabs button {
    font-size: 13px;
  }

  .review-toolbar {
    gap: 12px;
    min-height: 75px;
  }

  .filter-label {
    font-size: 12px;
  }

  .review-toolbar select {
    max-width: 155px;
    font-size: 12px;
  }

  .customer-review {
    padding: 25px 0 30px;
  }

  .review-body {
    font-size: 14px;
  }

  .review-footer {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .merchant-reply {
    margin-left: 12px;
    padding-left: 14px;
  }

  .merchant-reply p {
    font-size: 13px;
  }
}

/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 380px) {
  .customer-section {
    padding-left: 14px;
    padding-right: 14px;
  }

  .product-cta h2 {
    font-size: clamp(58px, 16vw, 70px);
    letter-spacing: -4px;
    line-height: 1;
  }

  .ratings-summary {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .rating-overview {
    min-height: 0;
    padding-right: 0;
    padding-bottom: 15px;
    border-right: none;
    border-bottom: 1px solid #333;
  }

  .rating-score {
    flex-wrap: nowrap;
  }

  .rating-bars {
    max-width: 300px;
    min-height: 0;
  }

  .rating-bar-row {
    grid-template-columns: 70px minmax(0, 1fr) 30px;
  }

  .rating-stars {
    font-size: 13px;
  }

  .review-toolbar {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 15px 0;
  }

  .review-toolbar select {
    max-width: 100%;
  }
}

/* =========================================
   REDUCED MOTION
========================================= */

@media (prefers-reduced-motion: reduce) {
  .cta-button,
  .outline-action {
    transition: none;
  }
}
</style>
