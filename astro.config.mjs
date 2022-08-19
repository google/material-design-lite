import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import lit from "@astrojs/lit";
import mdx from "@astrojs/mdx";

// Post CSS Plugins
import pluginImport from "postcss-import";
import pluginNested from "postcss-nested";
import pluginHct from "postcss-color-hct";
import pluginAutoprefixer from "autoprefixer";
import pluginApply from "postcss-apply";
import { CLASSES } from "./src/utils/classes.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://rodydavis.github.io/",
  base: "/material-design-lite",
  integrations: [preact(), lit(), mdx()],
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
        plugins: [
          pluginImport,
          pluginNested,
          pluginApply({ sets: CLASSES }),
          pluginHct,
          pluginAutoprefixer,
        ],
      },
    },
  },
});
