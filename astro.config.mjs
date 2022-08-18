import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import lit from "@astrojs/lit";
import mdx from "@astrojs/mdx";

// Post CSS Plugins
import pluginImport from "postcss-import";
import pluginNested from "postcss-nested";
import pluginHct from "postcss-color-hct";
import pluginAutoprefixer from "autoprefixer";

// https://astro.build/config
export default defineConfig({
  site: "https://rodydavis.github.io/",
  base: "/material-design-lite",
  integrations: [
    // Enable Preact to support Preact JSX components.
    preact(), // Enable React for the Algolia search component.
    react(),
    lit(),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: "prism",
  },
  site: `https://getmdl.io/`,
  legacy: {
    // astroFlavoredMarkdown: true,
  },
  vite: {
    css: {
      postcss: {
        plugins: [pluginImport, pluginNested, pluginHct, pluginAutoprefixer],
      },
    },
  },
});
