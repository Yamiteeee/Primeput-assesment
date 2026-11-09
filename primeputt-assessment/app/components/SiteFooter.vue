<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const subscribed = ref(false);

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Reviews", href: "#customer-reviews" },
  { label: "Scholarship", href: "#footer" },
  { label: "Contact", href: "mailto:hello@primeputt.com" },
  { label: "Blog", href: "#footer" },
  { label: "Affiliates", href: "#footer" },
];

const policyLinks = [
  { label: "Refund Policy", href: "#footer" },
  { label: "Privacy Policy", href: "#footer" },
  { label: "Shipping Policy", href: "#footer" },
  { label: "Terms of Service", href: "#footer" },
];

function subscribe() {
  if (!email.value.trim()) return;

  subscribed.value = true;
  email.value = "";
}
</script>

<template>
  <footer id="footer" class="site-footer">
    <div class="footer-container">
      <!-- LOGO -->
      <div class="footer-brand">
        <a href="#product" class="footer-logo" aria-label="PrimePutt home">
          <img
            src="/images/primeputt-p-logo.svg"
            alt=""
            class="logo-symbol"
            width="36"
            height="41"
          />

          <span class="logo-name">PrimePutt</span>
        </a>
      </div>

      <!-- MAIN FOOTER -->
      <div class="footer-main">
        <!-- NEWSLETTER -->
        <div class="footer-newsletter">
          <h2>
            Sign up for exclusive deals,<br />
            golf tips, more!
          </h2>

          <form class="newsletter-form" @submit.prevent="subscribe">
            <label for="footer-email" class="sr-only"> Email address </label>

            <input
              id="footer-email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              autocomplete="email"
              required
            />

            <button type="submit" aria-label="Subscribe">→</button>
          </form>

          <p v-if="subscribed" class="newsletter-success" role="status">
            Thanks for your interest! This is a demo signup.
          </p>
        </div>

        <!-- LINKS -->
        <nav class="footer-navigation" aria-label="Footer navigation">
          <div class="footer-link-column">
            <a v-for="link in companyLinks" :key="link.label" :href="link.href">
              {{ link.label }}
            </a>
          </div>

          <div class="footer-link-column">
            <a v-for="link in policyLinks" :key="link.label" :href="link.href">
              {{ link.label }}
            </a>
          </div>
        </nav>
      </div>

      <!-- BOTTOM FOOTER -->
      <div class="footer-bottom">
        <p>© 2026, PrimePutt Powered by Shopify</p>

        <div class="footer-socials">
          <!-- FACEBOOK -->
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z"
              />
            </svg>
          </a>

          <!-- INSTAGRAM -->
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />

              <circle cx="12" cy="12" r="4" />

              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>

          <!-- TIKTOK -->
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M16.7 2h-3.1v13.2a3 3 0 1 1-2.6-3V9a6.2 6.2 0 1 0 5.7 6.2V8.5a8 8 0 0 0 4.7 1.5V6.9A5 5 0 0 1 16.7 2Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* FOOTER */

.site-footer {
  width: 100%;
  padding: 26px 24px 28px;
  background: #111;
  color: #fff;
  border-top: 1px solid #292929;
}

.footer-container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

/* LOGO */

.footer-brand {
  padding: 0 0 28px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #eee;
  text-decoration: none;
  white-space: nowrap;
}

.logo-symbol {
  display: block;
  width: 36px;
  height: 41px;
  flex-shrink: 0;
  object-fit: contain;
}

.logo-name {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
}

/* MAIN FOOTER */

.footer-main {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 60px;
  padding: 28px 0 24px;
  border-top: 1px solid #444;
}

/* NEWSLETTER */

.footer-newsletter h2 {
  margin: 0 0 20px;
  font-size: clamp(22px, 2vw, 27px);
  font-weight: 400;
  letter-spacing: -0.8px;
  line-height: 1.25;
}

.newsletter-form {
  display: flex;
  align-items: stretch;
  gap: 8px;
  width: 100%;
  max-width: 345px;
}

.newsletter-form input {
  width: 100%;
  min-width: 0;
  height: 46px;
  padding: 0 15px;
  border: 1px solid #494949;
  border-radius: 3px;
  outline: none;
  background: transparent;
  color: #fff;
  font-family: inherit;
  font-size: 13px;
  transition: border-color 0.2s ease;
}

.newsletter-form input::placeholder {
  color: #777;
}

.newsletter-form input:focus {
  border-color: #ffc568;
}

.newsletter-form button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 48px;
  height: 46px;
  border: none;
  border-radius: 3px;
  background: #ffc568;
  color: #050505;
  font-size: 19px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.newsletter-form button:hover {
  background: #ffd58c;
}

.newsletter-success {
  margin: 12px 0 0;
  color: #ffc568;
  font-size: 12px;
}

/* FOOTER LINKS */

.footer-navigation {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 30px;
}

.footer-link-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.footer-link-column a {
  color: #fff;
  font-size: 12px;
  line-height: 1.3;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link-column a:hover {
  color: #ffc568;
}

/* BOTTOM FOOTER */

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid #444;
}

.footer-bottom p {
  margin: 0;
  color: #777;
  font-size: 10px;
}

/* SOCIAL ICONS */

.footer-socials {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: #42464e;
  color: #111;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.footer-socials a:hover {
  background: #ffc568;
  transform: translateY(-2px);
}

.footer-socials svg {
  width: 15px;
  height: 15px;
}

/* ACCESSIBILITY */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* TABLET */

@media (max-width: 900px) {
  .footer-main {
    gap: 35px;
  }

  .footer-navigation {
    gap: 18px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .site-footer {
    padding: 30px 20px 25px;
  }

  .footer-brand {
    padding-bottom: 25px;
  }

  .logo-symbol {
    width: 30px;
    height: 34px;
  }

  .logo-name {
    font-size: 15px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 45px;
    padding: 30px 0 35px;
  }

  .footer-newsletter h2 {
    font-size: 25px;
  }

  .newsletter-form {
    max-width: 100%;
  }

  .footer-navigation {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 25px;
  }

  .footer-link-column {
    gap: 18px;
  }

  .footer-link-column a {
    font-size: 13px;
  }

  .footer-bottom {
    align-items: flex-start;
    gap: 20px;
    padding-top: 25px;
  }

  .footer-bottom p {
    max-width: 200px;
    line-height: 1.6;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .site-footer {
    padding-left: 15px;
    padding-right: 15px;
  }

  .logo-symbol {
    width: 26px;
    height: 30px;
  }

  .logo-name {
    font-size: 13px;
  }

  .footer-newsletter h2 {
    font-size: 22px;
  }

  .footer-navigation {
    gap: 15px;
  }

  .footer-link-column a {
    font-size: 12px;
  }
}

/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {
  .newsletter-form input,
  .newsletter-form button,
  .footer-link-column a,
  .footer-socials a {
    transition: none;
  }
}
</style>
