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
/* SECTION */

.customer-section {
  width: 100%;
  padding: 80px 24px 110px;
  background: #050505;
  color: #fff;
}

.customer-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

/* PRODUCT CTA */

.product-cta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  padding-bottom: 100px;
}

.product-cta h2 {
  margin: 0;
  font-size: clamp(75px, 8vw, 125px);
  font-weight: 900;
  letter-spacing: -7px;
  line-height: 0.85;
}

.cta-details {
  width: 100%;
  max-width: 450px;
}

.cta-price {
  font-size: clamp(30px, 3vw, 40px);
  font-weight: 800;
  letter-spacing: -1.5px;
}

.cta-product {
  margin: 4px 0 15px;
  color: #aaa;
  font-size: 12px;
}

.cta-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 320px;
  min-height: 52px;
  border: none;
  border-radius: 3px;
  background: #ffc568;
  color: #050505;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cta-button:hover {
  background: #ffd48b;
}

.cta-guarantee {
  max-width: 440px;
  margin-top: 14px;
  color: #aaa;
  font-size: 12px;
  line-height: 1.5;
}

/* RATINGS SUMMARY */

.ratings-summary {
  display: grid;
  grid-template-columns: 190px 235px;
  align-items: start;
  gap: 22px;
  margin-bottom: 18px;
}

.rating-overview,
.rating-bars {
  min-height: 100px;
  border-right: 1px solid #333;
}

.rating-score {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 32px;
}

.stars {
  color: #ffc568;
  letter-spacing: 1px;
  white-space: nowrap;
}

.rating-score .stars {
  font-size: 21px;
}

.rating-overview p {
  margin: 4px 0 0;
  font-size: 12px;
}

.rating-bars {
  padding-right: 15px;
  border-right: none;
}

.rating-bar-row {
  display: grid;
  grid-template-columns: 65px minmax(0, 1fr) 35px;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 2px 0;
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.rating-bar-row.selected {
  outline: 1px solid #ffc568;
  outline-offset: 2px;
}

.rating-stars {
  color: #ffc568;
  font-size: 13px;
  letter-spacing: -1px;
  white-space: nowrap;
}

.empty-stars {
  color: #666;
}

.bar-track {
  height: 11px;
  background: #1c1c1c;
}

.bar-fill {
  display: block;
  height: 100%;
  background: #ffc568;
}

.rating-count {
  color: #aaa;
  font-size: 10px;
}

/* RECOMMENDATION */

.recommendation {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.recommendation strong {
  padding: 5px;
  background: #263b30;
  font-size: 13px;
}

/* REVIEW ACTIONS */

.review-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin: 0 0 30px;
}

.outline-action {
  min-height: 34px;
  padding: 0 16px;
  border: 1px solid #555;
  border-radius: 3px;
  background: transparent;
  color: #fff;
  font-family: inherit;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
}

.outline-action:hover {
  border-color: #ffc568;
  color: #ffc568;
}

/* REVIEW TABS */

.review-tabs {
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #fff;
}

.review-tabs button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px 12px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #ccc;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
}

.review-tabs button.active {
  border-bottom-color: #fff;
  color: #fff;
}

.review-tabs button span {
  padding: 2px 5px;
  border-radius: 3px;
  background: #242424;
  font-size: 12px;
}

/* REVIEW TOOLBAR */

.review-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 80px;
  border-bottom: 1px solid #555;
}

.filter-label {
  font-size: 12px;
  font-weight: 700;
}

.clear-filter {
  margin-left: 10px;
  padding: 5px 9px;
  border: 1px solid #ffc568;
  border-radius: 3px;
  background: transparent;
  color: #ffc568;
  cursor: pointer;
}

.review-toolbar select {
  min-height: 35px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #fff;
  color: #111;
  font-family: inherit;
  font-size: 12px;
}

/* CUSTOMER REVIEWS */

.customer-review {
  padding: 24px 0 30px;
  border-bottom: 1px solid #242424;
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

.review-person {
  gap: 10px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
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
  font-size: 13px;
}

.review-person small,
.review-top time,
.reply-heading time,
.question-heading time {
  color: #777;
  font-size: 11px;
}

.recommended {
  margin-top: 18px;
  font-size: 12px;
}

.recommended span {
  color: #15bd80;
}

.review-title {
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 17px;
  font-size: 13px;
}

.review-title .stars {
  font-size: 17px;
}

.review-body {
  margin: 10px 0 18px;
  font-size: 13px;
  line-height: 1.6;
}

.review-handicap {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 20px 0;
  font-size: 12px;
}

.review-product-name {
  margin: 22px 0;
  font-size: 12px;
}

.review-footer {
  gap: 12px;
  margin-top: 24px;
  color: #aaa;
  font-size: 11px;
}

.helpful {
  gap: 9px;
}

.helpful button {
  border: none;
  background: transparent;
  color: #aaa;
  font-size: 11px;
  cursor: pointer;
}

.helpful button[aria-pressed="true"] {
  color: #ffc568;
}

/* MERCHANT REPLY */

.merchant-reply {
  margin: 20px 0 0 28px;
  padding: 8px 0 8px 16px;
  border-left: 4px solid #fff;
}

.reply-heading strong,
.merchant-reply > strong {
  font-size: 12px;
}

.merchant-reply p {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.6;
}

/* PAGINATION */

.review-pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 35px;
}

.review-pagination button {
  min-width: 34px;
  min-height: 34px;
  padding: 0 8px;
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

/* QUESTIONS */

.question-item {
  padding: 28px 0;
  border-bottom: 1px solid #292929;
}

.question-heading strong {
  font-size: 13px;
}

.question-item h3 {
  margin: 20px 0;
  font-size: 17px;
}

.empty-reviews {
  padding: 35px 0;
  color: #aaa;
}

/* TABLET */

@media (max-width: 1000px) {
  .product-cta {
    gap: 35px;
  }

  .product-cta h2 {
    font-size: clamp(65px, 9vw, 100px);
  }

  .ratings-summary {
    grid-template-columns: 180px 220px;
    gap: 15px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .customer-section {
    padding: 65px 15px 80px;
  }

  .product-cta {
    grid-template-columns: 1fr;
    gap: 35px;
    padding-bottom: 65px;
  }

  .product-cta h2 {
    font-size: clamp(65px, 16vw, 95px);
    letter-spacing: -5px;
  }

  .cta-details {
    max-width: 100%;
  }

  .cta-button {
    max-width: 100%;
  }

  .ratings-summary {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 12px;
  }

  .rating-overview {
    min-width: 0;
    min-height: 100px;
  }

  .rating-bars {
    min-width: 0;
    min-height: 100px;
    padding-right: 0;
    border-right: none;
  }

  .rating-score {
    flex-wrap: wrap;
    font-size: 27px;
  }

  .rating-score .stars {
    font-size: 16px;
  }

  .rating-bar-row {
    grid-template-columns: 52px minmax(0, 1fr) 26px;
    gap: 3px;
  }

  .rating-stars {
    font-size: 11px;
  }

  .recommendation {
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .review-actions {
    justify-content: flex-start;
    margin-top: 30px;
    flex-wrap: wrap;
  }

  .outline-action {
    flex: 1;
    min-width: 130px;
    padding: 0 8px;
  }

  .review-toolbar {
    min-height: 75px;
  }

  .review-footer {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .merchant-reply {
    margin-left: 12px;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .customer-section {
    padding-left: 12px;
    padding-right: 12px;
  }

  .product-cta h2 {
    font-size: 62px;
  }

  .ratings-summary {
    grid-template-columns: 1fr;
  }

  .rating-overview,
  .rating-bars {
    border-right: none;
    min-height: 0;
  }

  .review-toolbar {
    gap: 10px;
  }

  .review-toolbar select {
    max-width: 140px;
  }
}
</style>
