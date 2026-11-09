export default defineNuxtConfig({
  compatibilityDate: "2026-11-09",

  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "PrimePutt | Product Page Replica",
      meta: [
        {
          name: "description",
          content:
            "Unofficial PrimePutt product page design replica for a frontend assessment.",
        },
      ],
    },
  },
});
