import { defineConfig } from "astro/config";

import pluginImport from "postcss-import";
import pluginNested from "postcss-nested";
import pluginHct from "postcss-color-hct";
import pluginAutoprefixer from "autoprefixer";
import pluginApply from "postcss-apply";

import { CLASSES } from "../lib/utils/classes.mjs";

// https://astro.build/config
export default defineConfig({
  base: "/material-design-lite/",
  site: "https://rodydavis.github.io",
  markdown: {
    syntaxHighlight: "prism",
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          pluginImport(),
          pluginNested(),
          pluginApply({ sets: CLASSES }),
          pluginHct(),
          pluginAutoprefixer(),
        ],
      },
    },
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: [".."],
      },
    },
  },
});
