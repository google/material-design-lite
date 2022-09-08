import postcssPresetEnv from "postcss-preset-env";
import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";
import postcssHct from "postcss-color-hct";
import postcssAutoprefixer from "autoprefixer";
import postcssApply from "postcss-apply";
import combineSelectors from "postcss-combine-duplicated-selectors";
import cssnano from "cssnano";

import { CLASSES } from "./lib/classes.mjs";

module.exports = {
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
    postcssImport(),
    postcssNested(),
    postcssApply({ sets: CLASSES }),
    postcssHct(),
    postcssAutoprefixer(),
    combineSelectors(),
    cssnano({
      preset: "default",
    }),
  ],
};
