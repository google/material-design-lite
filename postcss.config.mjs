import postcssPresetEnv from "postcss-preset-env";
import pluginImport from "postcss-import";
import pluginNested from "postcss-nested";
import pluginHct from "postcss-color-hct";
import pluginAutoprefixer from "autoprefixer";
import pluginApply from "postcss-apply";
import { CLASSES } from "./lib/classes.mjs";

export default {
  plugins: [
    postcssPresetEnv({
      stage: 0,
      features: {
        "logical-properties-and-values": false,
        "prefers-color-scheme-query": false,
        "gap-properties": false,
        "custom-properties": false,
        "dir-pseudo-class": false,
        "is-pseudo-class": false,
        "focus-within-pseudo-class": false,
        "focus-visible-pseudo-class": false,
        "color-functional-notation": false,
        "cascade-layers": false,
        "double-position-gradients": false,
        "has-pseudo-class": false,
      },
    }),
    pluginImport(),
    pluginNested(),
    pluginApply({ sets: CLASSES }),
    pluginHct(),
    pluginAutoprefixer(),
  ],
};
