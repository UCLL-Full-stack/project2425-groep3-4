module.exports = {
    debug: process.env.NODE_ENV === "development",
    i18n: {
      defaultLocale: "en",
      locales: ["en", "es", "nl"],
      localeDetection: false, 
    },
    defaultNS: "common",
    react: {
      useSuspense: true,
    },
};