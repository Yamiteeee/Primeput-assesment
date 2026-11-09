<script setup lang="ts">
import { computed, ref } from "vue";
import { gallery } from "../data/gallery";

const activeImage = ref(0);

const currentImage = computed(() => gallery[activeImage.value]!);

function nextImage() {
  activeImage.value = (activeImage.value + 1) % gallery.length;
}

function previousImage() {
  activeImage.value = (activeImage.value - 1 + gallery.length) % gallery.length;
}
</script>

<template>
  <section class="product-media" aria-label="Product images">
    <!-- DESKTOP GALLERY -->
    <div class="desktop-gallery">
      <figure
        v-for="(item, index) in gallery"
        :key="item.src"
        class="gallery-card"
        :class="{ featured: index === 0 }"
      >
        <video
          v-if="item.type === 'video'"
          :src="item.src"
          :aria-label="item.alt"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        />

        <img
          v-else
          :src="item.src"
          :alt="item.alt"
          :loading="index === 0 ? 'eager' : 'lazy'"
        />

        <figcaption>{{ item.caption }}</figcaption>
      </figure>
    </div>

    <!-- MOBILE GALLERY -->
    <div class="mobile-gallery">
      <div class="mobile-image-wrapper">
        <video
          v-if="currentImage.type === 'video'"
          :key="`video-${currentImage.src}`"
          :src="currentImage.src"
          :aria-label="currentImage.alt"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        />

        <img
          v-else
          :key="`image-${currentImage.src}`"
          :src="currentImage.src"
          :alt="currentImage.alt"
        />

        <div class="gallery-controls">
          <button
            type="button"
            class="gallery-arrow"
            aria-label="Previous image"
            @click="previousImage"
          >
            ‹
          </button>

          <span class="gallery-counter">
            {{ activeImage + 1 }} / {{ gallery.length }}
          </span>

          <button
            type="button"
            class="gallery-arrow"
            aria-label="Next image"
            @click="nextImage"
          >
            ›
          </button>
        </div>
      </div>

      <p class="mobile-caption">{{ currentImage.caption }}</p>
    </div>
  </section>
</template>

<style scoped>
.product-media {
  min-width: 0;
}

.desktop-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.gallery-card {
  position: relative;
  overflow: hidden;
  margin: 0;
  aspect-ratio: 1 / 1;
  border-radius: 5px;
  background: #171717;
}

.gallery-card.featured {
  grid-column: 1 / -1;
  aspect-ratio: 1 / 1;
}

.gallery-card img,
.gallery-card video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-card figcaption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 32px 13px 13px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.5;
}

.mobile-gallery {
  display: none;
}

@media (max-width: 700px) {
  .product-media {
    width: 100%;
  }

  .desktop-gallery {
    display: none;
  }

  .mobile-gallery {
    display: block;
  }

  .mobile-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #191919;
  }

  .mobile-image-wrapper img,
  .mobile-image-wrapper video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gallery-controls {
    position: absolute;
    right: 12px;
    bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .gallery-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #fff;
    color: #000;
    font-size: 25px;
    line-height: 1;
    cursor: pointer;
  }

  .gallery-counter {
    padding: 9px 12px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
  }

  .mobile-caption {
    margin: 0;
    padding: 12px 15px 0;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.5;
  }
}
</style>
