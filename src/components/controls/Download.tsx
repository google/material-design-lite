import type { FunctionalComponent } from 'preact';

const DownloadButton: FunctionalComponent = () => {
    return (<>
        <a
            class="icon surface"
            href="/material-design-lite/css/mdl.css"
            download
        >
            <i class="material-symbols-outlined">file_download</i>
        </a>
    </>);
};

export default DownloadButton;
