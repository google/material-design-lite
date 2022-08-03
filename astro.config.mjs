import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import lit from "@astrojs/lit";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    // Enable Preact to support Preact JSX components.
    preact(), // Enable React for the Algolia search component.
    react(),
    lit(),
    mdx(),
  ],
  site: `https://getmdl.io/`,
  legacy: {
    astroFlavoredMarkdown: true,
  },
});
