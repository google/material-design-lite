import rawStylesCSS from "../../data/baseline.css?raw";
import postcss from "postcss";
import pluginMinify from "postcss-minify";
import { cssPlugins } from "../../utils/css-plugins";

export async function get() {
  let base = postcss();
  for (const plugin of cssPlugins) {
    base = base.use(plugin);
  }
  const result = await base
    .use(pluginMinify())
    .process(rawStylesCSS, {
      from: "src/data/baseline.css",
    })
    .then((result) => result.css);
  return {
    body: result,
  };
}
