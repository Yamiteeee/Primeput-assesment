<script setup lang="ts">
import { ref } from "vue";

const activeQuestion = ref<number | null>(null);

const faqs = [
  {
    question: "Does it work on carpet?",
    answer:
      "Yes. The heavy rubber backing helps the mat lay flat on carpet as well as hard flooring. For the most consistent roll, use a firm, level surface.",
  },
  {
    question: "How fast does it roll?",
    answer:
      "The putting surface is designed to roll at approximately 10 on the Stimpmeter, giving you a realistic course-speed putting experience.",
  },
  {
    question: "Why is it flat? Real greens break.",
    answer:
      "A flat surface helps you develop a consistent putting stroke and practice starting the ball on your intended line. It also allows you to focus on distance control without an artificial ramp.",
  },
  {
    question: "Which size?",
    answer:
      "Standard (3′ × 9′) is ideal for shorter practice putts and smaller spaces. XL (3′ × 12′) gives you more room for distance control and is our most popular size. XXL (3′ × 15′) offers the longest practice area.",
  },
  {
    question: "What’s in the box?",
    answer:
      "Your putting mat, integrated regulation-width cups, and walnut backstop. Check the product package details for the exact included accessories.",
  },
  {
    question: "How do I set it up, and put it away?",
    answer:
      "Unroll the mat onto a clean, level surface and allow it to settle. When you need to store it, roll it up carefully rather than folding it to help protect the putting surface.",
  },
  {
    question: "Can it go outside?",
    answer:
      "The putting surface is designed to be durable and suitable for outdoor use. For long-term care, store it somewhere dry and protected when it is not in use.",
  },
  {
    question: "What’s it made of?",
    answer:
      "PrimePutt uses dense nylon putting turf, a heavy rubber backing, and a solid walnut backstop. The materials are selected to provide a consistent roll and a premium finish.",
  },
  {
    question: "How long does it last?",
    answer:
      "With proper care and regular cleaning, the mat is designed for long-term use. Its lifespan depends on how frequently it is used and the conditions in which it is stored.",
  },
  {
    question: "How does the guarantee work?",
    answer:
      "If you're not satisfied with your putting mat, you can request a return under the applicable satisfaction guarantee. Refer to the official return policy for eligibility, deadlines, and instructions.",
  },
  {
    question: "How fast does it ship?",
    answer:
      "Shipping times depend on your delivery location and product availability. The estimated delivery timeframe should be shown during checkout.",
  },
  {
    question: "Can I pay over time?",
    answer:
      "Installment payment availability depends on the payment options offered at checkout. Check the available payment methods before placing your order.",
  },
  {
    question: "Buying it as a gift?",
    answer:
      "A putting mat makes a thoughtful gift for golfers who want to practice at home or in the office. Choose the size that best fits the recipient's available space.",
  },
];

function toggleQuestion(index: number) {
  activeQuestion.value = activeQuestion.value === index ? null : index;
}
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="faq-container">
      <!-- LEFT HEADING -->
      <div class="faq-heading">
        <h2>FAQ</h2>
      </div>

      <!-- RIGHT ACCORDION -->
      <div class="faq-list">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.question"
          class="faq-item"
          :class="{ 'is-open': activeQuestion === index }"
        >
          <h3 class="faq-question-heading">
            <button
              type="button"
              class="faq-question"
              :aria-expanded="activeQuestion === index"
              :aria-controls="`faq-answer-${index}`"
              @click="toggleQuestion(index)"
            >
              <span>{{ faq.question }}</span>

              <span class="faq-icon" aria-hidden="true">
                {{ activeQuestion === index ? "−" : "+" }}
              </span>
            </button>
          </h3>

          <div
            :id="`faq-answer-${index}`"
            class="faq-answer"
            :class="{ 'answer-open': activeQuestion === index }"
            :hidden="activeQuestion !== index"
          >
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  width: 100%;
  padding: 100px 24px 110px;
  background: #050505;
  color: #fff;
  border-bottom: 1px solid #292929;
}

.faq-container {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.6fr);
  align-items: start;
  gap: clamp(50px, 8vw, 130px);
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

/* LEFT HEADING */

.faq-heading h2 {
  margin: 0;
  font-size: clamp(45px, 4vw, 60px);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
}

/* RIGHT ACCORDION */

.faq-list {
  min-width: 0;
  border-top: 1px solid #292929;
}

.faq-item {
  border-bottom: 1px solid #292929;
}

.faq-question-heading {
  margin: 0;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  min-height: 58px;
  padding: 17px 0;
  border: none;
  background: transparent;
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease;
}

.faq-question:hover {
  color: #ffc568;
}

.faq-question:focus-visible {
  outline: 2px solid #ffc568;
  outline-offset: 4px;
}

.faq-icon {
  flex-shrink: 0;
  color: #ffc568;
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
}

/* ANSWERS */

.faq-answer {
  padding: 0 35px 22px 0;
}

.faq-answer[hidden] {
  display: none;
}

.faq-answer p {
  max-width: 570px;
  margin: 0;
  color: #bcbcbc;
  font-size: 14px;
  line-height: 1.7;
}

/* TABLET */

@media (max-width: 1000px) {
  .faq-section {
    padding: 85px 24px 95px;
  }

  .faq-container {
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.5fr);
    gap: 45px;
  }

  .faq-heading h2 {
    font-size: 50px;
  }

  .faq-question {
    font-size: 14px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .faq-section {
    padding: 70px 20px 85px;
  }

  .faq-container {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .faq-heading h2 {
    font-size: 46px;
    letter-spacing: -2px;
  }

  .faq-question {
    min-height: 60px;
    padding: 18px 0;
    font-size: 14px;
  }

  .faq-icon {
    font-size: 22px;
  }

  .faq-answer {
    padding: 0 25px 22px 0;
  }

  .faq-answer p {
    font-size: 13px;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .faq-section {
    padding: 60px 15px 75px;
  }

  .faq-heading h2 {
    font-size: 42px;
  }

  .faq-question {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-question {
    transition: none;
  }
}
</style>
