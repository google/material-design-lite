import { createRef, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import 'playground-elements/themes/material.css';

const Playground: FunctionalComponent<{ source: string }> = ({
    source = '',
}) => {
    const ref = createRef<HTMLElement>();

    const loadConfig = () => {
        const editor = ref.current as any;
        const stylesBetweenTags = source.match(/<style>[\s\S]*?<\/style>/g);
        const scriptsBetweenTags = source.match(/<script>[\s\S]*?<\/script>/g);
        const htmlSource = source.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<script>[\s\S]*?<\/script>/g, '');
        const config = { files: {} };
        if (htmlSource) {
            let content = htmlSource;
            content = content.trim();
            content = [
                `<!DOCTYPE html> `,
                `<html lang="en"> `,
                `<head>`,
                `  <meta charset="utf-8"> `,
                `  <link rel="stylesheet" href="https://rodydavis.github.io/material-design-lite/css/mdl.min.css"> `,
                `  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"> `,
                `  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"> `,
                `  <title>Material Design Lite</title> `,
                ...(stylesBetweenTags ? [`  <link rel="stylesheet" href="./style.css"> `] : []),
                `</head> `,
                `<body>`,
                `${content.split('\n').map((line) => `  ${line}`).join('\n')}`,
                ...(stylesBetweenTags ? [`  <script src="./main.js"></script> `] : []),
                `</body> `,
                `</html> `,
            ].join('\n');
            config.files['index.html'] = { content };
        }
        if (stylesBetweenTags) {
            let content = stylesBetweenTags.join('\n');
            content = content.replace(/<style>/g, '');
            content = content.replace(/<\/style>/g, '');
            content = content.split('\n').map((line) => line.replace(/^    /, '')).join('\n');
            content = content.trim();
            config.files['style.css'] = { content };
        }
        if (scriptsBetweenTags) {
            let content = scriptsBetweenTags.join('\n');
            content = content.replace(/<script>/g, '');
            content = content.replace(/<\/script>/g, '');
            content = content.split('\n').map((line) => line.replace(/^    /, '')).join('\n');
            content = content.trim();
            config.files['main.ts'] = { content };
        }
        editor.config = config;
    }

    useEffect(() => loadConfig(), []);

    return (
        <>
            <playground-ide
                id="playground"
                class="playground-theme-material"
                ref={ref}
                editable-file-system
                line-numbers
                resizable
                style={{
                    height: '100%',
                    width: '100%',
                    "--playground-preview-width": "50%",
                }}
            >
            </playground-ide>
        </>
    );
};

export default Playground;
