import { defineConfig } from "astro/config";

import postcssPresetEnv from "postcss-preset-env";
import pluginImport from "postcss-import";
import pluginNested from "postcss-nested";
import pluginHct from "postcss-color-hct";
import pluginAutoprefixer from "autoprefixer";
import pluginApply from "postcss-apply";

import { CLASSES } from "../lib/classes.mjs";

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            stage: 0,
            autoprefixer: false,
            features: {
              "logical-properties-and-values": false,
              "prefers-color-scheme-query": false,
              "gap-properties": false,
              "custom-properties": false,
              "place-properties": false,
              "not-pseudo-class": false,
              "focus-visible-pseudo-class": false,
              "focus-within-pseudo-class": false,
              "color-functional-notation": false,
            },
          }),
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
