import postcss from "postcss";
import rawStylesCSS from "../../data/styles.css?raw";
import { cssPlugins } from "../../utils/css-plugins";

export async function get() {
  const result = await postcss(cssPlugins({
    minify: true
  }))
    .process(rawStylesCSS, {
      from: "src/data/styles.css",
    })
    .then((result) => result.css);
  return {
    body: result,
  };
}
