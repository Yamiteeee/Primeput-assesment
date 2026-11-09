export default defineNuxtConfig({
  compatibilityDate: "2026-11-09",

  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "PrimePutt | Rated Best Indoor/Outdoor Putting Mat",

      meta: [
        {
          name: "description",
          content:
            "PrimePutt premium putting mats. Bring the green home with realistic putting surfaces designed for true roll and everyday practice.",
        },
      ],

      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.svg",
        },
      ],
    },
  },
});
