import postcss from "postcss";
import fs from "fs";
import { cssPlugins } from "../../utils/css-plugins.js";

export async function get() {
  const cssFile = "../lib/styles.css";
  const rawStylesCSS = fs.readFileSync(cssFile, "utf8");
  const result = await postcss(cssPlugins())
    .process(rawStylesCSS, {
      from: "../lib/styles.css",
    })
    .then((result) => result.css);
  return {
    body: result,
  };
}
