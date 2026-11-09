<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const pressQuotes = [
  {
    quote:
      "Feels as close to real grass as any artificial putting turf I’ve encountered, and the ball rolls true across it.",
    source: "NBC GOLFPASS",
  },
  {
    quote:
      "I bring my PrimePutt mat everywhere because you can unroll it and be ready to putt immediately.",
    source: "MATT, GOLF SIDEKICK",
  },
  {
    quote: "Best premium materials.",
    source: "GOLF MONTHLY",
  },
];

const videos = [
  {
    src: "/videos/press/press-1.mp4",
    label: "PrimePutt putting mat demonstration",
  },
  {
    src: "/videos/press/press-2.mp4",
    label: "PrimePutt putting surface close-up",
  },
  {
    src: "/videos/press/press-3.mp4",
    label: "Golfer reviewing the PrimePutt putting mat",
  },
];

const videoRefs = ref<HTMLVideoElement[]>([]);
const unmutedIndex = ref<number | null>(null);

function setVideoRef(element: Element | null, index: number) {
  if (element instanceof HTMLVideoElement) {
    videoRefs.value[index] = element;
  }
}

function toggleSound(index: number) {
  const video = videoRefs.value[index];

  if (!video) return;

  const shouldUnmute = video.muted;

  videoRefs.value.forEach((item, itemIndex) => {
    if (item) {
      item.muted = itemIndex !== index || !shouldUnmute;
    }
  });

  unmutedIndex.value = shouldUnmute ? index : null;

  if (video.paused) {
    void video.play().catch(() => {});
  }
}

onBeforeUnmount(() => {
  videoRefs.value.forEach((video) => {
    if (video) {
      video.muted = true;
      video.pause();
    }
  });
});
</script>

<template>
  <section id="press-reviews" class="press-section">
    <div class="press-container">
      <span class="press-eyebrow">WHAT THE REVIEWERS SAID</span>

      <!-- PRESS QUOTES -->
      <div class="press-quotes">
        <blockquote
          v-for="quote in pressQuotes"
          :key="quote.source"
          class="press-quote"
        >
          <p>“{{ quote.quote }}”</p>
          <cite>{{ quote.source }}</cite>
        </blockquote>
      </div>

      <!-- VIDEO HEADING -->
      <h2 class="video-heading">
        Andy Sullivan and Zac Radford put it on camera.
      </h2>

      <!-- VIDEO GALLERY -->
      <div class="press-videos">
        <div
          v-for="(video, index) in videos"
          :key="video.src"
          class="press-video-card"
        >
          <video
            :ref="(element) => setVideoRef(element as Element | null, index)"
            :src="video.src"
            :aria-label="video.label"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            disablepictureinpicture
            disableremoteplayback
          ></video>

          <button
            type="button"
            class="sound-button"
            :aria-label="unmutedIndex === index ? 'Mute video' : 'Unmute video'"
            :aria-pressed="unmutedIndex === index"
            @click="toggleSound(index)"
          >
            {{ unmutedIndex === index ? "MUTE" : "SOUND" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.press-section {
  width: 100%;
  padding: 90px 24px 110px;
  background: #050505;
  color: #fff;
}

.press-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.press-eyebrow {
  display: block;
  margin-bottom: 17px;
  color: #ffc568;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

/* PRESS QUOTES */

.press-quotes {
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.7fr;
  border-top: 1px solid #292929;
  border-bottom: 1px solid #292929;
}

.press-quote {
  min-width: 0;
  min-height: 170px;
  margin: 0;
  padding: 23px 22px 30px;
  border-right: 1px solid #292929;
}

.press-quote:first-child {
  padding-left: 0;
}

.press-quote:last-child {
  border-right: none;
}

.press-quote p {
  margin: 0 0 12px;
  font-size: clamp(17px, 1.5vw, 21px);
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 1.25;
}

.press-quote cite {
  display: block;
  color: #ffc568;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  letter-spacing: 1.2px;
}

/* VIDEO HEADING */

.video-heading {
  margin: 36px 0 14px;
  font-size: clamp(21px, 2vw, 27px);
  font-weight: 800;
  letter-spacing: -0.9px;
  line-height: 1.2;
}

/* VIDEO GALLERY */

.press-videos {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.press-video-card {
  position: relative;
  min-width: 0;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  border-radius: 5px;
  background: #171717;
  isolation: isolate;
}

.press-video-card video {
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

.press-video-card video::-webkit-media-controls {
  display: none !important;
}

.press-video-card video::-webkit-media-controls-enclosure {
  display: none !important;
}

/* SOUND BUTTON */

.sound-button {
  position: absolute;
  right: 9px;
  bottom: 10px;
  z-index: 2;
  min-height: 28px;
  padding: 5px 9px;
  border: none;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.78);
  color: #fff;
  font-family: inherit;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease;
}

.sound-button:hover {
  background: #ffc568;
  color: #050505;
}

.sound-button:focus-visible {
  outline: 2px solid #ffc568;
  outline-offset: 3px;
}

/* TABLET */

@media (max-width: 1000px) {
  .press-section {
    padding: 75px 24px 90px;
  }

  .press-quote {
    padding: 22px 16px;
  }

  .press-quote p {
    font-size: 17px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  .press-section {
    padding: 65px 0 80px;
  }

  .press-eyebrow,
  .video-heading {
    margin-left: 15px;
    margin-right: 15px;
  }

  .press-quotes {
    grid-template-columns: 1fr;
    margin: 0 15px;
  }

  .press-quote,
  .press-quote:first-child {
    min-height: 0;
    padding: 22px 0;
    border-right: none;
    border-bottom: 1px solid #292929;
  }

  .press-quote:last-child {
    border-bottom: none;
  }

  .press-quote p {
    font-size: 19px;
  }

  .video-heading {
    margin-top: 34px;
    margin-bottom: 18px;
    font-size: 23px;
  }

  /* SWIPEABLE VIDEOS */

  .press-videos {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 15px 12px;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 15px;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .press-videos::-webkit-scrollbar {
    display: none;
  }

  .press-video-card {
    flex: 0 0 78%;
    width: 78%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
}

/* SMALL MOBILE */

@media (max-width: 360px) {
  .press-video-card {
    flex-basis: 84%;
    width: 84%;
  }

  .press-quote p {
    font-size: 18px;
  }

  .video-heading {
    font-size: 21px;
  }
}
</style>
