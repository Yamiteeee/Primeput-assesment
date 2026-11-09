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
        {
          name: "theme-color",
          content: "#080808",
        },
      ],

      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "any",
          href: "/favicon.svg?v=4",
        },
      ],
    },
  },
});
