import type { FunctionalComponent } from 'preact';

const DownloadButton: FunctionalComponent = () => {
    return (<>
        <a
            class="icon surface"
            href="https://github.com/rodydavis/material-design-lite"
            target="_blank"
            rel="noopener noreferrer"
        >
            <i class="material-symbols-outlined">code</i>
        </a>
    </>);
};

export default DownloadButton;
