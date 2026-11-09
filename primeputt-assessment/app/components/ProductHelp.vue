<template>
  <section id="help" class="help-section">
    <div class="help-overlay"></div>

    <div class="help-content">
      <h2>Need help?</h2>

      <p>Have a product expert answer your questions.</p>

      <div class="help-actions">
        <a href="mailto:support@primeputt.com" class="help-button primary">
          TALK TO AN EXPERT <span aria-hidden="true">→</span>
        </a>

        <a href="#faq" class="help-button secondary"> SEE THE FAQ </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.help-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 480px;
  padding: 90px 24px;
  background-color: #1c211b;
  background-image: url("/images/help-bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  text-align: center;
  isolation: isolate;
}

.help-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.58);
}

.help-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 850px;
}

.help-content h2 {
  margin: 0 0 10px;
  font-size: clamp(42px, 5vw, 65px);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1.05;
}

.help-content p {
  margin: 0;
  color: #f0f0f0;
  font-size: clamp(15px, 1.3vw, 19px);
  line-height: 1.5;
}

.help-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.help-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 53px;
  padding: 0 27px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-decoration: none;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.help-button.primary {
  background: #fff;
  color: #050505;
}

.help-button.primary:hover {
  background: #ffc568;
}

.help-button.secondary {
  background: rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.75);
  color: #fff;
}

.help-button.secondary:hover {
  background: #fff;
  color: #050505;
}

/* TABLET */

@media (max-width: 1000px) {
  .help-section {
    min-height: 410px;
    padding: 75px 24px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .help-section {
    min-height: 380px;
    padding: 70px 20px;
  }

  .help-content h2 {
    font-size: clamp(40px, 10vw, 54px);
    letter-spacing: -2px;
  }

  .help-content p {
    font-size: 15px;
  }

  .help-actions {
    gap: 10px;
    margin-top: 25px;
  }

  .help-button {
    min-height: 49px;
    padding: 0 18px;
    font-size: 11px;
  }
}

@media (max-width: 380px) {
  .help-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .help-button {
    width: 100%;
  }
}
</style>
