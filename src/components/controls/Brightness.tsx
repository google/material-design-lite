import type { FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const BrightnessToggle: FunctionalComponent = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const [dark, setDark] = useState<boolean>(prefersDark.matches);

    useEffect(() => {
        prefersDark.addEventListener('change', (e) => setDark(e.matches));
        updateClass();
    }, [dark]);

    const updateClass = () => {
        if (dark) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    };

    const toggle = () => {
        setDark(!dark);
        updateClass();
    };

    if (dark) {
        return (<>
            <button class="icon button" onClick={toggle}>
                <i class="material-symbols-outlined">light_mode</i>
            </button>
        </>);
    } else {
        return (<>
            <button class="icon button" onClick={toggle}>
                <i class="material-symbols-outlined">dark_mode</i>
            </button>
        </>);
    }
};

export default BrightnessToggle;
