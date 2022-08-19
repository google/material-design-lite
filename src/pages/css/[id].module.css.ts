import postcss from "postcss";
import fs from "fs";
import { cssPlugins } from "../../utils/css-plugins";
import type { APIContext } from 'astro';

export function getStaticPaths() {
    const components = fs.readdirSync(`./lib`).filter((file) => file.endsWith(".css") && ![
        'adapter.css',
        'styles.css'
    ].includes(file));
    return components.map((component) => {
        return { params: { id: component.split('.')[0] } };
    });
}

export async function get({ params, request }: APIContext) {
    const id = params.id;
    const cssFile = `lib/${id}.css`;
    const cssContent = fs.readFileSync(cssFile, "utf8");
    const result = await postcss(cssPlugins())
        .process(cssContent, { from: cssFile })
        .then((result) => result.css);
    return { body: result };
}
