import "https://unpkg.com/playground-elements@0.16.3/playground-ide.js?module";

// Hydrate all demos
const demos = document.querySelectorAll("pre.language-demo");
demos.forEach((demo) => {
  // Replace node with a new one
  const source = demo.children[0].innerHTML;
  const playground = document.createElement("playground-ide");
  playground.setAttribute("editable-file-system", "");
  playground.setAttribute("line-numbers", "");
  playground.setAttribute("resizeable", "");

  const stylesBetweenTags = source.match(/<style>[\s\S]*?<\/style>/g);
  const scriptsBetweenTags = source.match(/<script>[\s\S]*?<\/script>/g);
  const htmlSource = source
    .replace(/<style>[\s\S]*?<\/style>/g, "")
    .replace(/<script>[\s\S]*?<\/script>/g, "");
  const config = { files: {} };
  if (htmlSource) {
    let content = htmlSource;
    content = content.trim();
    content = [
      `<!DOCTYPE html> `,
      `<html lang="en"> `,
      `<head>`,
      `  <meta charset="utf-8"> `,
      `  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"> `,
      // `  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"> `,
      `  <link rel="stylesheet" href="https://rodydavis.github.io/material-design-lite/css/mdl.min.css"> `,
      `  <link rel="stylesheet" href="https://rodydavis.github.io/material-design-lite/css/icons.module.css"> `,
      `  <title>Material Design Lite</title> `,
      ...(stylesBetweenTags
        ? [`  <link rel="stylesheet" href="./style.css"> `]
        : []),
      `</head> `,
      `<body class="light-theme">`,
      `${content
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n")}`,
      ...(stylesBetweenTags ? [`  <script src="./main.js"><\/script> `] : []),
      `</body> `,
      `</html> `,
    ].join("\n");
    config.files["index.html"] = { content };
  }
  if (stylesBetweenTags) {
    let content = stylesBetweenTags.join("\n");
    content = content.replace(/<style>/g, "");
    content = content.replace(/<\/style>/g, "");
    content = content
      .split("\n")
      .map((line) => line.replace(/^    /, ""))
      .join("\n");
    content = content.trim();
    config.files["style.css"] = { content };
  }
  if (scriptsBetweenTags) {
    let content = scriptsBetweenTags.join("\n");
    content = content.replace(/<script>/g, "");
    content = content.replace(/<\/script>/g, "");
    content = content
      .split("\n")
      .map((line) => line.replace(/^    /, ""))
      .join("\n");
    content = content.trim();
    config.files["main.ts"] = { content };
  }

  playground.config = config;
  demo.parentNode.replaceChild(playground, demo);
});
