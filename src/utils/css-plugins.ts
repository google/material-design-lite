import pluginImport from "postcss-import";
import pluginNested from "postcss-nested";
import pluginHct from "postcss-color-hct";
import pluginAutoprefixer from "autoprefixer";

export const cssPlugins = [
  pluginImport(),
  pluginNested(),
  pluginHct(),
  pluginAutoprefixer(),
];
