import { createRef, FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { themeFromSourceColor, argbFromHex, hexFromArgb } from '@material/material-color-utilities';
import { useEventListener } from '../hooks/event';

function setMeta(value: string) {
    // <meta name="theme-color" content="#4285f4">
    const existing = document.querySelector('meta[name="theme-color"]');
    if (existing) {
        existing.setAttribute('content', value);
        return existing;
    }
    else {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'theme-color');
        meta.setAttribute('content', value);
        document.head.appendChild(meta);
        return meta;
    }
}

function getCurrentColor() {
    // Check local storage
    const localStorageColor = localStorage.getItem('theme-color');
    if (localStorageColor) {
        return localStorageColor;
    }
    // Check Meta Tag
    const existing = document.querySelector('meta[name="theme-color"]');
    if (existing) {
        return existing.getAttribute('content');
    }
    // Return baseline
    return '#6750A4';
}

function hexToRgb(value: string): number[] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    const { r, g, b } = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
    return [r, g, b]
}

function updateStyle(id: string, content: string) {
    const styleId = `generated-material-${id}`;
    let style = document.getElementById(styleId) as HTMLStyleElement | null;
    if (style == null) {
        style = document.createElement("style");
        style.id = styleId;
        style.type = 'text/css';
        document.head.appendChild(style);
    }
    // Apply in chunks to avoid memory issues
    const chunks = content.match(/.{1,500}/g) || [];
    style.innerHTML = '';
    for (const chunk of chunks) {
        style.appendChild(document.createTextNode(chunk));
    }
}

export function generateTokens(color: string) {
    const theme = themeFromSourceColor(argbFromHex(color));
    const output: string[] = [];

    output.push(':where(html, .tokens) {');
    output.push(`--md-source: ${color};`);

    function convertColors(key, value) {
        if (typeof value === 'number') {
            return hexFromArgb(value);
        }
        if (key === 'palettes') {
            const defaultTones = [100, 99, 98, 95, 90, 80, 70, 60, 50, 40, 35, 30, 25, 20, 10, 5, 0];
            const output = {};
            for (const [key, palette] of Object.entries(value)) {
                output[key] = {};
                for (const tone of defaultTones) {
                    // @ts-ignore
                    output[key][tone] = hexFromArgb(palette.tone(tone));
                }
            }
            return output;
        }
        return value;
    }

    const convertedTheme = JSON.parse(JSON.stringify(theme, convertColors, 2));

    // // Schemes
    // for (const [section, scheme] of Object.entries(convertedTheme.schemes)) {
    //     output.push(`  /* ${section} */`);
    //     for (const [key, value] of Object.entries(scheme)) {
    //         const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    //         const [r, g, b] = hexToRgb(value);
    //         output.push(`  --md-sys-color-${token}-rgb-${section}: ${r}, ${g}, ${b};`);
    //     }
    // }

    // Palettes
    for (const [section, palette] of Object.entries(convertedTheme.palettes)) {
        output.push(`  /* ${section} */`);
        for (const [tone, value] of Object.entries(palette)) {
            const token = section.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            const [r, g, b] = hexToRgb(value);
            output.push(`  --md-ref-palette-${token}${tone}-rgb: ${r}, ${g}, ${b};`);
        }
    }

    output.push('}');

    const result = output.join('\n');
    return result;
}

export function setThemeColor(value: string) {
    const result = generateTokens(value);
    updateStyle('tokens', result);
    setMeta(value);
    localStorage.setItem('theme-color', value);
    window.dispatchEvent(new CustomEvent('theme-color-changed', { detail: value }));
}

const ColorPicker: FunctionalComponent = () => {
    const [color, setColor] = useState<string>(getCurrentColor());
    const inputRef = createRef<HTMLInputElement>();

    const setColorValue = (value: string) => {
        setColor(value);
        setMeta(value);
        localStorage.setItem('theme-color', value);
    }

    useEffect(() => {
        const result = generateTokens(color);
        updateStyle('tokens', result);
    }, [color]);

    useEventListener('theme-color-changed', (e) => {
        console.log(e);
        const value = e.detail;
        setColor(value);
        setMeta(value);
        inputRef.current!.value = value;
    }, window)

    return (
        <>
            <input
                ref={inputRef}
                type="color"
                value={color}
                onInput={(e) => {
                    const value = e.target.value;
                    setColorValue(value);
                }}
            />
        </>
    );
};

export default ColorPicker;
