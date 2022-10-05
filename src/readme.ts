#!/usr/bin/env node

import chokidar from "chokidar";
import * as fs from "fs";
import * as path from "path";
// @ts-ignore
import { parseArgs } from "@pkgjs/parseargs";

function build() {
    const {
        values: { inputDir: inDir, outputDir: outDir, watch },
    } = parseArgs({
        options: {
            inputDir: {
                type: "string",
                short: "i",
            },
            outputDir: {
                type: "string",
                short: "o",
            },
            watch: {
                type: "boolean",
                short: "w",
            },
        },
        allowPositional: true,
    });

    const inputDir = inDir ?? "lib/components";
    const outputDir = outDir ?? "docsite/src/data/components";

    // Ignore .html and .css files regex
    const ignored = /(\.html|\.css)$/;

    if (watch) {
        chokidar.watch(inputDir, {
            ignored,
        }).on("all", async (event, inputFile) => {
            console.log(event, inputFile);
            if (fs.existsSync(inputFile)) {
                const outputFile = path.join(outputDir, path.relative(inputDir, inputFile));
                const ext = path.extname(inputFile);
                if (ext === ".md") {
                    // Copy the file.
                    const file = outputFile.split('/readme.md').join('.md');
                    const parentDir = path.dirname(file);
                    if (!fs.existsSync(parentDir)) {
                        fs.mkdirSync(parentDir, { recursive: true });
                    }
                    fs.copyFileSync(inputFile, file);
                }
            }
        });
    } else {
        // Copy all files.
        const files = fs.readdirSync(inputDir);
        for (const file of files) {
            if (file.startsWith(".")) continue;
            const inputFile = path.join(inputDir, file, "readme.md");
            const outputFile = path.join(outputDir, `${file.split('.')[0]}.md`);
            if (!fs.existsSync(inputFile)) {
                continue;
            }
            const parentDir = path.dirname(outputFile);
            if (!fs.existsSync(parentDir)) {
                fs.mkdirSync(parentDir, { recursive: true });
            }
            fs.copyFileSync(inputFile, outputFile);
        }
    }
}

build();