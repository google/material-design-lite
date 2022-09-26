import * as fs from "fs";
import * as path from "path";

import postcss from "postcss";
import { cssPlugins } from "../lib/utils/css-plugins.mjs";

const inputDir = path.join("lib");
const outputDir = path.join("dist");

// Remove the output directory if it exists.
if (fs.existsSync(outputDir)) {
  fs.rmdirSync(outputDir, { recursive: true });
}

// Create the output directory.
fs.mkdirSync(outputDir);

async function processCss(css, from, to, options = {}) {
  return postcss(cssPlugins(options))
    .process(css, { from, to })
    .then((result) => result.css);
}

const defaultOptions = {
  comments: true,
};

function addHeader(raw) {
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
function addHeaderFile(dir) {
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

async function buildFile(inputPath, outputPath, options = defaultOptions) {
  const css = fs.readFileSync(inputPath, "utf8");
  let processed = await processCss(css, inputPath, outputPath, options);
  processed = addHeader(processed);
  if (options.comments === false) {
    // Remove all comments.
    processed = processed.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "");
  }
  // Create parent directory if it doesn't exist.
  const parentDir = path.dirname(outputPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  // Write the file.
  fs.writeFileSync(outputPath, processed);
}

async function buildDir(inDir, outDir, options = defaultOptions) {
  const files = fs.readdirSync(inDir);
  for (const file of files) {
    // Skip .dotfiles
    if (file.startsWith(".")) continue;
    const current = path.join(inDir, file);
    const target = path.join(outDir, file);
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      await buildDir(current, target, options);
    } else {
      const ext = path.extname(file);
      if (ext === ".css") {
        await buildFile(current, target, options);
      }
    }
  }
}

async function build() {
  console.log("Building CSS...");

  const mdl = path.join(inputDir, "styles.css");
  // Create `material-design-lite.css`
  await buildFile(mdl, path.join(outputDir, "material-design-lite.css"), {
    import: true,
  });
  // Create `material-design-lite.min.css`
  await buildFile(mdl, path.join(outputDir, "material-design-lite.min.css"), {
    ...defaultOptions,
    minify: true,
    import: true,
    comments: false,
  });

  // Recursively build all files in the  directory.
  addHeaderFile(inputDir);
  await buildDir(inputDir, outputDir);
  addHeaderFile(outputDir);

  console.log("Complete!");
}

build();
