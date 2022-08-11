import postcss from "postcss";
import rawStylesCSS from "../../data/baseline.css?raw";
import { cssPlugins } from "../../utils/css-plugins";

export async function get() {
  const result = await postcss(cssPlugins())
    .process(rawStylesCSS, {
      from: "src/data/baseline.css",
    })
    .then((result) => result.css);
  return {
    body: result,
  };
}
