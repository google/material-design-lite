import * as fs from "fs";

export function getSnippets(filePath: string) {
    const snippets = fs.readdirSync(filePath, "utf8");
    const results = [];
    for (const snippet of snippets) {
        const content = fs.readFileSync(filePath + "/" + snippet, "utf8");
        results.push({ snippet, content });
    }
    return results;
}