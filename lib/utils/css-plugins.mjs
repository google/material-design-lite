import pluginImport from "postcss-import";
import pluginNested from "postcss-nested";
import pluginHct from "postcss-color-hct";
import pluginFormat from "stylefmt";
import pluginMinify from "cssnano";
import pluginAutoprefixer from "autoprefixer";
import pluginApply from "postcss-apply";
import { CLASSES } from "./classes.mjs";

export function cssPlugins(options) {
  const plugins = [];
  if (options?.import ?? true) {
    plugins.push(pluginImport());
  }
  if (options?.nested ?? true) {
    plugins.push(pluginNested());
  }
  if (options?.apply ?? true) {
    plugins.push(pluginApply({ sets: CLASSES }));
  }
  if (options?.hct ?? true) {
    plugins.push(pluginHct());
  }
  if (options?.autoprefixer ?? true) {
    plugins.push(pluginAutoprefixer());
  }
  if (options?.minify ?? false) {
    plugins.push(pluginMinify());
  }
  if (options?.format ?? true) {
    plugins.push(pluginFormat());
  }
  return plugins;
}
