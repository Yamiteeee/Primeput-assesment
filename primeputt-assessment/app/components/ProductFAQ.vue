<script setup lang="ts">
import { ref } from "vue";

interface FAQSpecification {
  label: string;
  value: string;
}

interface FAQItem {
  question: string;
  paragraphs?: string[];
  specifications?: FAQSpecification[];
  share?: boolean;
}

/* Multiple questions can stay open */
const openQuestions = ref<number[]>([]);

const faqs: FAQItem[] = [
  {
    question: "Does it work on carpet?",
    paragraphs: [
      "Works on carpet: the heavy rubber backing keeps it flat and the ball rolls true. On low-pile carpet or a hard floor it’s a non-issue.",
      "On really plush carpet, standing on the mat can press a slight dip around your feet and pull your start line off; stand just beside the mat and it’s gone.",
    ],
  },
  {
    question: "How fast does it roll?",
    paragraphs: [
      "We measure 9 to 11 on the stimp meter depending on the floor under it; on a hard floor or low-pile carpet it reads a 10, the pace of a well-kept course green. Deep, padded carpet can take a little speed off.",
    ],
  },
  {
    question: "Why is it flat? Real greens break.",
    paragraphs: [
      "On purpose. Reading break is a skill you learn on the course, where every green is different. The stroke that starts the ball on your line at the right speed is the same on every green, and a flat surface is the one place you can groove it with no slope to hide the miss.",
    ],
  },
  {
    question: "Which size?",
    paragraphs: [
      "All three are three feet wide with the same turf, the same walnut backstop and three cups. The Standard is 9 feet long (putts up to 8 feet), the XL 12 (up to 11), the XXL 15 (up to 14), with distance markers every three feet from the center cup. A spot at least four feet wide lets you putt from anywhere along it; just over three feet works for many rooms.",
    ],
  },
  {
    question: "What’s in the box?",
    paragraphs: [
      "The green, with distance markers built in every three feet. Three cups. The solid walnut backstop. Bring your putter and a few balls.",
    ],
  },
  {
    question: "How do I set it up, and put it away?",
    paragraphs: [
      "Roll it out, set the three cups in their holes, set the walnut backstop in place. To put it away, lift them out and roll it up. It lays flat again when you unroll it.",
    ],
  },
  {
    question: "Can it go outside?",
    paragraphs: [
      "Indoor and outdoor. The turf is built for it. The solid walnut backstop isn’t built to live in the weather; bring it in.",
    ],
  },
  {
    question: "What’s it made of?",
    specifications: [
      {
        label: "Turf",
        value: "USA-made TrueGreen™ nylon, about half an inch of dense pile",
      },
      {
        label: "Backing",
        value:
          "Heavy rubber; lays flat under its own weight, rolls up in seconds",
      },
      {
        label: "Backstop",
        value: "Solid walnut",
      },
      {
        label: "Cups",
        value:
          "Three, regulation width (4¼ inches), each set in a hole cut through the turf",
      },
      {
        label: "Speed",
        value:
          "A 10 on the stimp meter on a hard floor or low-pile carpet; 9 to 11 by floor",
      },
      {
        label: "Use",
        value: "Indoor and outdoor",
      },
      {
        label: "Weight",
        value: "Standard 19 lb · XL 24 lb · XXL 28 lb",
      },
      {
        label: "Ships in",
        value: "A 12 × 12 × 38 inch box, rolled",
      },
    ],
  },
  {
    question: "How long does it last?",
    paragraphs: [
      "Longer than we’ve been able to measure. The first ones we sold are still in use. And it’s covered by a one-year warranty against defects in materials and workmanship, under normal indoor and outdoor use. If it fails, we repair or replace it. Normal wear, misuse, and leaving the walnut backstop out in the weather aren’t covered.",
    ],
  },
  {
    question: "How does the guarantee work?",
    paragraphs: [
      "Live with it for 60 days. If it isn’t the green you pictured in your house, email us, we send the label, we pay the return shipping in the U.S., and you get a full refund. Outside the U.S. a return fee may apply. If it arrives with a crease, we replace it.",
    ],
  },
  {
    question: "How fast does it ship?",
    paragraphs: [
      "Free shipping in the continental U.S., and it ships the next business day. Outside the continental U.S., the shipping rate calculates at checkout.",
    ],
  },
  {
    question: "Can I pay over time?",
    paragraphs: [
      "Yes. Choose Shop Pay at checkout, then pick installments. Every size comes in under $50 a month.",
    ],
  },
  {
    question: "Buying it as a gift?",
    paragraphs: [
      "Send them this page, or ask for it by name. The XL is the one golfers pick most.",
    ],
    share: true,
  },
];

function isQuestionOpen(index: number): boolean {
  return openQuestions.value.includes(index);
}

function toggleQuestion(index: number): void {
  if (isQuestionOpen(index)) {
    openQuestions.value = openQuestions.value.filter(
      (openIndex) => openIndex !== index,
    );
  } else {
    openQuestions.value = [...openQuestions.value, index];
  }
}

const shareMessage = ref("");

async function sharePage(): Promise<void> {
  if (!import.meta.client) return;

  const url = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "PrimePutt",
        url,
      });
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      shareMessage.value = "Link copied!";
      return;
    }

    shareMessage.value = "Sharing is unavailable.";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return;
    shareMessage.value = "Unable to share this page.";
  }
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
          :class="{ 'is-open': isQuestionOpen(index) }"
        >
          <h3 class="faq-question-heading">
            <button
              type="button"
              class="faq-question"
              :aria-expanded="isQuestionOpen(index)"
              :aria-controls="`faq-answer-${index}`"
              @click="toggleQuestion(index)"
            >
              <span>{{ faq.question }}</span>

              <span
                class="faq-icon"
                :class="{ 'icon-open': isQuestionOpen(index) }"
                aria-hidden="true"
              >
                {{ isQuestionOpen(index) ? "×" : "+" }}
              </span>
            </button>
          </h3>

          <div
            :id="`faq-answer-${index}`"
            class="faq-answer"
            :hidden="!isQuestionOpen(index)"
          >
            <!-- NORMAL ANSWERS -->
            <template v-if="faq.paragraphs">
              <p
                v-for="(paragraph, paragraphIndex) in faq.paragraphs"
                :key="paragraphIndex"
              >
                {{ paragraph }}
              </p>
            </template>

            <!-- SPECIFICATIONS -->
            <dl v-if="faq.specifications" class="faq-specifications">
              <div
                v-for="spec in faq.specifications"
                :key="spec.label"
                class="faq-specification"
              >
                <dt>{{ spec.label }}</dt>
                <dd>{{ spec.value }}</dd>
              </div>
            </dl>

            <!-- SHARE -->
            <div v-if="faq.share" class="faq-share-container">
              <button type="button" class="faq-share" @click="sharePage">
                Share this page →
              </button>

              <span v-if="shareMessage" class="faq-share-message" role="status">
                {{ shareMessage }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* SECTION */

.faq-section {
  width: 100%;
  padding: 115px 24px 125px;
  background: #050505;
  color: #fff;

  /* Full-width divider above and below the FAQ section */
  border-top: 1px solid #292929;
  border-bottom: 1px solid #292929;
}

/* MAIN GRID */

.faq-container {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.65fr);
  align-items: start;
  gap: clamp(60px, 7vw, 125px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* LEFT TITLE */

.faq-heading h2 {
  margin: 0;
  font-size: clamp(64px, 5.5vw, 82px);
  font-weight: 800;
  letter-spacing: -4px;
  line-height: 1;
}

/* RIGHT ACCORDION */

.faq-list {
  min-width: 0;
  border-top: 1px solid #333;
}

.faq-item {
  border-bottom: 1px solid #333;
}

.faq-question-heading {
  margin: 0;
}

/* QUESTIONS */

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  min-height: 68px;
  padding: 20px 0;
  border: 0;
  background: transparent;
  color: #fff;
  font-family: inherit;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.45;
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

/* GOLD PLUS / X */

.faq-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  color: #ffc568;
  font-family: Arial, sans-serif;
  font-size: 25px;
  font-weight: 400;
  line-height: 1;
}

.faq-icon.icon-open {
  font-size: 23px;
}

/* ANSWERS */

.faq-answer {
  padding: 0 28px 25px 0;
}

.faq-answer[hidden] {
  display: none;
}

.faq-answer p {
  max-width: none;
  margin: 0 0 14px;
  color: #d0d0d0;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.65;
}

.faq-answer p:last-child {
  margin-bottom: 0;
}

/* SPECIFICATIONS */

.faq-specifications {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
}

.faq-specification {
  display: grid;
  grid-template-columns: 115px minmax(0, 1fr);
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid #292929;
}

.faq-specification:last-child {
  border-bottom: none;
}

.faq-specification dt {
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.6;
}

.faq-specification dd {
  min-width: 0;
  margin: 0;
  color: #d0d0d0;
  font-size: 15px;
  line-height: 1.65;
}

/* SHARE */

.faq-share-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.faq-share {
  padding: 0;
  border: none;
  background: transparent;
  color: #ffc568;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.faq-share:hover {
  color: #fff;
}

.faq-share:focus-visible {
  outline: 2px solid #ffc568;
  outline-offset: 4px;
}

.faq-share-message {
  color: #d0d0d0;
  font-size: 13px;
}

/* TABLET */

@media (max-width: 1000px) {
  .faq-section {
    padding: 90px 24px 100px;
  }

  .faq-container {
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.5fr);
    gap: 45px;
  }

  .faq-heading h2 {
    font-size: 65px;
  }

  .faq-question {
    font-size: 17px;
  }

  .faq-answer p {
    font-size: 16px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .faq-section {
    padding: 75px 20px 90px;
  }

  .faq-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .faq-heading h2 {
    font-size: 60px;
    letter-spacing: -3px;
  }

  .faq-question {
    min-height: 64px;
    padding: 19px 0;
    font-size: 16px;
  }

  .faq-icon {
    flex-basis: 20px;
    width: 20px;
    height: 20px;
    font-size: 24px;
  }

  .faq-icon.icon-open {
    font-size: 22px;
  }

  .faq-answer {
    padding: 0 15px 25px 0;
  }

  .faq-answer p {
    font-size: 15px;
    line-height: 1.7;
  }

  .faq-specification {
    grid-template-columns: 95px minmax(0, 1fr);
    gap: 12px;
    padding: 12px 0;
  }

  .faq-specification dt,
  .faq-specification dd {
    font-size: 14px;
  }

  .faq-share {
    font-size: 14px;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .faq-section {
    padding: 65px 15px 80px;
  }

  .faq-heading h2 {
    font-size: 54px;
  }

  .faq-question {
    font-size: 15px;
  }

  .faq-answer p {
    font-size: 14px;
  }

  .faq-specification {
    grid-template-columns: 80px minmax(0, 1fr);
    gap: 10px;
  }

  .faq-specification dt,
  .faq-specification dd {
    font-size: 13px;
  }
}

/* ACCESSIBILITY */

@media (prefers-reduced-motion: reduce) {
  .faq-question {
    transition: none;
  }
}
</style>
