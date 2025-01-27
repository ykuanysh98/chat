const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/chat/" : "/", // GitHub Pages үшін 'chat' деп сілтеу
  outputDir: "dist", // Жиналған файлдардың қалтасы
  assetsDir: "assets", // Байланысты файлдардың (CSS, JS) қалтасы
  transpileDependencies: true, // Кейбір тәуелділіктерді транспиляциялау үшін
  productionSourceMap: false, // Продакшнда source map өшіру (файлды жеңілдету үшін)
});
