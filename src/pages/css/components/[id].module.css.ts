import postcss from "postcss";
import fs from "fs";
import { cssPlugins } from "../../../utils/css-plugins";
import type { APIContext } from 'astro';

export function getStaticPaths() {
    const components = fs.readdirSync(`./lib/components`);
    return components
        .map((c) => ({ params: { id: c } }))
        .filter((c) => c.params.id !== ".template");
}

export async function get({ params, request }: APIContext) {
    const id = params.id;
    const cssFile = `lib/components/${id}/style.css`;
    const cssContent = fs.readFileSync(cssFile, "utf8");
    const result = await postcss(cssPlugins())
        .process(cssContent, { from: cssFile })
        .then((result) => result.css);
    return { body: result };
}
