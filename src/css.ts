import * as fs from "fs";
import * as path from "path";

import postcss from "postcss";
// @ts-ignore
import { cssPlugins } from "../lib/utils/css-plugins.mjs";

const inputDir = "lib";
const modules = true;
let outputDir = "dist";

// Check arguments for output directory.
if (process.argv.length > 2) {
    outputDir = process.argv[2];
}

// Remove the output directory if it exists.
if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
}

// Create the output directory.
fs.mkdirSync(outputDir);

async function processCss(css: string, from: string, to: string, options = {}) {
    return postcss(cssPlugins(options))
        .process(css, { from, to })
        .then((result) => result.css);
}

const defaultOptions = {
    comments: true,
};

function addHeader(raw: string) {
    let content = raw;
    // Remove all duplicated license header.
    const header = [
        "/*",
        " Copyright 2016 Google Inc. All rights reserved.",
        "",
        ' Licensed under the Apache License, Version 2.0 (the "License");',
        " you may not use this file except in compliance with the License.",
        " You may obtain a copy of the License at",
        "",
        "     http://www.apache.org/licenses/LICENSE-2.0",
        "",
        " Unless required by applicable law or agreed to in writing, software",
        ' distributed under the License is distributed on an "AS IS" BASIS,',
        " WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.",
        " See the License for the specific language governing permissions and",
        " limitations under the License.",
        "*/",
    ].join("\n");
    content = content.split(header).join("");
    // Add license header to top
    content = `${header}\n${content}`;
    content = content.replace(/([\r\n]){2,}/g, "\n\n");
    return `${content}`;
}

// Add header file to all files in directory
function addHeaderFile(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        // Skip .dotfiles
        if (file.startsWith(".")) continue;
        const current = path.join(dir, file);
        const stat = fs.statSync(current);
        if (stat.isDirectory()) {
            addHeaderFile(current);
        } else {
            const ext = path.extname(file);
            if (ext === ".css") {
                const css = fs.readFileSync(current, "utf8");
                const processed = addHeader(css);
                fs.writeFileSync(current, processed);
            }
        }
    }
}

async function buildFile(inputPath: string, outputPath: string, options: {
    minify?: boolean,
    import?: boolean,
    comments?: boolean,
} = defaultOptions) {
    const now = performance.now();
    const css = fs.readFileSync(inputPath, "utf8");
    let processed = await processCss(css, inputPath, outputPath, options);
    processed = addHeader(processed);
    if (options.comments === false) {
        // Remove all multi line comments.
        processed = processed.replace(/\/\*[\s\S]*?\*\//gm, "");
    }
    // Create parent directory if it doesn't exist.
    const parentDir = path.dirname(outputPath);
    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
    }
    // Write the file.
    fs.writeFileSync(outputPath, processed);
    if (modules) {
        // Write Css .module.css
        const modulePath = outputPath.replace(/\.css$/, ".module.css");
        fs.writeFileSync(modulePath, processed);
    }
    // TODO: Create export in package.json
    console.log(`Built ${outputPath} in ${(performance.now() - now).toFixed(2)} ms`);
}

async function buildDir(inDir: string, outDir: string, options = defaultOptions) {
    const files = fs.readdirSync(inDir);
    const promises = [];
    for (const file of files) {
        // Skip .dotfiles
        if (file.startsWith(".")) continue;
        if (file.endsWith("test.css")) continue;
        const current = path.join(inDir, file);
        const target = path.join(outDir, file);
        const stat = fs.statSync(current);
        if (stat.isDirectory()) {
            promises.push(buildDir(current, target, options));
        } else {
            const ext = path.extname(file);
            if (ext === ".css") {
                promises.push(buildFile(current, target, options));
            }
        }
    }
    await Promise.all(promises);
}

async function build() {
    console.log("Building CSS...");
    const now = performance.now();

    const mdl = path.join(inputDir, "styles.css");
    const promises = [];
    // Create `mdl.css`
    promises.push(buildFile(mdl, path.join(outputDir, "mdl.css"), {
        import: true,
    }));
    // Create `mdl.min.css`
    promises.push(buildFile(mdl, path.join(outputDir, "mdl.min.css"), {
        ...defaultOptions,
        minify: true,
        import: true,
        comments: false,
    }));

    promises.push(buildDir(inputDir, outputDir));

    await Promise.all(promises);

    addHeaderFile(outputDir);

    console.log(`Built CSS in ${(performance.now() - now).toFixed(2)} ms`);

}

build();
