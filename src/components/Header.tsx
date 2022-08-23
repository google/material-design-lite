import { createRef, FunctionalComponent } from 'preact';

import MaterialLogo from './Logo'
import ColorPicker from './controls/Color';
import BrightnessToggle from './controls/Brightness';
import DownloadButton from './controls/Download';
import CodeButton from './controls/Code';
import { useEffect, useState } from 'preact/hooks';

const Header: FunctionalComponent = () => {
    const ref = createRef<HTMLElement>();
    const [open, setOpen] = useState<boolean>(document.body.classList.contains('menu-open'));
    const [scrolled, setScrolled] = useState<boolean>(false);
    const goHome = () => {
        window.location.href = '/material-design-lite/';
    };
    const toggleMenu = () => {
        document.body.classList.toggle('menu-open');
        setOpen(!open);
    };

    useEffect(() => {
        const header = ref.current;
        window.addEventListener("scroll", (e) => {
            if (window.scrollY > 0) {
                header.classList.add("scrolled");
                setScrolled(true);
            } else {
                header.classList.remove("scrolled");
                setScrolled(false);
            }
        });
    }, [scrolled]);
    return (
        <>
            <header ref={ref} id="app-header" class="top-app-bar small" style={{
                minWidth: '400px',
            }}>
                <button id="menu-toggle" class="icon leading" onClick={toggleMenu} >
                    <i class="material-symbols-outlined">{open ? 'close' : 'menu_open'}</i>
                </button>
                <div id="app-title" class="title" onClick={goHome} style={{
                    userSelect: 'none',
                }}>
                    <MaterialLogo size={40} />
                    <span id="title-text">Material Design Lite</span>
                </div>
                <div class="spacer" style={{ flex: 1 }}></div>
                <div class="actions">
                    <ColorPicker />
                    <BrightnessToggle />
                    <CodeButton />
                    <DownloadButton />
                </div>
            </header>
        </>
    );
};

export default Header;
