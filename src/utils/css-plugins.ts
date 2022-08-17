import pluginImport from "postcss-import";
import pluginNested from "postcss-nested";
import pluginHct from "postcss-color-hct";
import pluginFormat from "stylefmt";
import pluginMinify from "postcss-minify";
import pluginAutoprefixer from "autoprefixer";


export function cssPlugins(options?: {
  import?: boolean;
  nested?: boolean;
  hct?: boolean;
  autoprefixer?: boolean;
  format?: boolean;
  minify?: boolean;
}) {
  const plugins = [];
  if (options?.import ?? true) {
    plugins.push(pluginImport);
  }
  if (options?.nested ?? true) {
    plugins.push(pluginNested);
  }
  if (options?.hct ?? true) {
    plugins.push(pluginHct);
  }
  if (options?.autoprefixer ?? true) {
    plugins.push(pluginAutoprefixer);
  }
  if (options?.minify ?? false) {
    plugins.push(pluginMinify);
  }
  if (options?.format ?? true) {
    plugins.push(pluginFormat);
  }
  return plugins;
}