import { createRef, FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { themeFromSourceColor, argbFromHex, hexFromArgb } from '@material/material-color-utilities';
import { useEventListener } from '../hooks/event';

const adapterSrc = `
:where(html, .light-theme) {
  color-scheme: light;
  --md-sys-color-primary-rgb: var(--md-ref-palette-primary40-rgb);
  --md-sys-color-on-primary-rgb: var(--md-ref-palette-primary100-rgb);
  --md-sys-color-primary-container-rgb: var(--md-ref-palette-primary90-rgb);
  --md-sys-color-on-primary-container-rgb: var(--md-ref-palette-primary10-rgb);
  --md-sys-color-inverse-primary-rgb: var(--md-ref-palette-primary80-rgb);
  --md-sys-color-secondary-rgb: var(--md-ref-palette-secondary40-rgb);
  --md-sys-color-on-secondary-rgb: var(--md-ref-palette-secondary100-rgb);
  --md-sys-color-secondary-container-rgb: var(--md-ref-palette-secondary90-rgb);
  --md-sys-color-on-secondary-container-rgb: var(
    --md-ref-palette-secondary10-rgb
  );
  --md-sys-color-tertiary-rgb: var(--md-ref-palette-tertiary40-rgb);
  --md-sys-color-on-tertiary-rgb: var(--md-ref-palette-tertiary100-rgb);
  --md-sys-color-tertiary-container-rgb: var(--md-ref-palette-tertiary90-rgb);
  --md-sys-color-on-tertiary-container-rgb: var(
    --md-ref-palette-tertiary10-rgb
  );
  --md-sys-color-error-rgb: var(--md-ref-palette-error40-rgb);
  --md-sys-color-error-container-rgb: var(--md-ref-palette-error90-rgb);
  --md-sys-color-on-error-rgb: var(--md-ref-palette-error100-rgb);
  --md-sys-color-on-error-container-rgb: var(--md-ref-palette-error10-rgb);
  --md-sys-color-surface-rgb: var(--md-ref-palette-neutral99-rgb);
  --md-sys-color-on-surface-rgb: var(--md-ref-palette-neutral10-rgb);
  --md-sys-color-surface-variant-rgb: var(
    --md-ref-palette-neutral-variant90-rgb
  );
  --md-sys-color-on-surface-variant-rgb: var(
    --md-ref-palette-neutral-variant30-rgb
  );
  --md-sys-color-inverse-surface-rgb: var(--md-ref-palette-neutral20-rgb);
  --md-sys-color-inverse-on-surface-rgb: var(--md-ref-palette-neutral95-rgb);
  --md-sys-color-surface-tint-rgb: var(--md-sys-color-primary-rgb);
  --md-sys-color-background-rgb: var(--md-ref-palette-neutral99-rgb);
  --md-sys-color-on-background-rgb: var(--md-ref-palette-neutral10-rgb);
  --md-sys-color-outline-rgb: var(--md-ref-palette-neutral-variant50-rgb);
  --md-sys-color-outline-variant-rgb: var(
    --md-ref-palette-neutral-variant80-rgb
  );
  --md-sys-color-shadow-rgb: var(--md-ref-palette-neutral0-rgb);
  --md-sys-color-scrim-rgb: var(--md-ref-palette-neutral0-rgb);
}

:where(.dark-theme) {
  color-scheme: dark;
  --md-sys-color-primary-rgb: var(--md-ref-palette-primary80-rgb);
  --md-sys-color-on-primary-rgb: var(--md-ref-palette-primary20-rgb);
  --md-sys-color-primary-container-rgb: var(--md-ref-palette-primary30-rgb);
  --md-sys-color-on-primary-container-rgb: var(--md-ref-palette-primary90-rgb);
  --md-sys-color-inverse-primary-rgb: var(--md-ref-palette-primary40-rgb);
  --md-sys-color-secondary-rgb: var(--md-ref-palette-secondary80-rgb);
  --md-sys-color-on-secondary-rgb: var(--md-ref-palette-secondary20-rgb);
  --md-sys-color-secondary-container-rgb: var(--md-ref-palette-secondary30-rgb);
  --md-sys-color-on-secondary-container-rgb: var(
    --md-ref-palette-secondary90-rgb
  );
  --md-sys-color-tertiary-rgb: var(--md-ref-palette-tertiary80-rgb);
  --md-sys-color-on-tertiary-rgb: var(--md-ref-palette-tertiary20-rgb);
  --md-sys-color-tertiary-container-rgb: var(--md-ref-palette-tertiary30-rgb);
  --md-sys-color-on-tertiary-container-rgb: var(
    --md-ref-palette-tertiary90-rgb
  );
  --md-sys-color-error-rgb: var(--md-ref-palette-error80-rgb);
  --md-sys-color-on-error-rgb: var(--md-ref-palette-error20-rgb);
  --md-sys-color-error-container-rgb: var(--md-ref-palette-error30-rgb);
  --md-sys-color-on-error-container-rgb: var(--md-ref-palette-error80-rgb);
  --md-sys-color-surface-rgb: var(--md-ref-palette-neutral10-rgb);
  --md-sys-color-on-surface-rgb: var(--md-ref-palette-neutral90-rgb);
  --md-sys-color-surface-variant-rgb: var(
    --md-ref-palette-neutral-variant30-rgb
  );
  --md-sys-color-on-surface-variant-rgb: var(
    --md-ref-palette-neutral-variant80-rgb
  );
  --md-sys-color-inverse-surface-rgb: var(--md-ref-palette-neutral90-rgb);
  --md-sys-color-inverse-on-surface-rgb: var(--md-ref-palette-neutral20-rgb);
  --md-sys-color-surface-tint-rgb: var(--md-sys-color-primary-rgb);
  --md-sys-color-background-rgb: var(--md-ref-palette-neutral10-rgb);
  --md-sys-color-on-background-rgb: var(--md-ref-palette-neutral90-rgb);
  --md-sys-color-outline-rgb: var(--md-ref-palette-neutral-variant60-rgb);
  --md-sys-color-outline-variant-rgb: var(
    --md-ref-palette-neutral-variant30-rgb
  );
  --md-sys-color-shadow-rgb: var(--md-ref-palette-neutral0-rgb);
  --md-sys-color-scrim-rgb: var(--md-ref-palette-neutral0-rgb);
}

:where(.light-theme, .dark-theme) {
  --md-sys-color-primary: rgba(var(--md-sys-color-primary-rgb), 1);
  --md-sys-color-primary-container: rgba(
    var(--md-sys-color-primary-container-rgb),
    1
  );
  --md-sys-color-secondary: rgba(var(--md-sys-color-secondary-rgb), 1);
  --md-sys-color-secondary-container: rgba(
    var(--md-sys-color-secondary-container-rgb),
    1
  );
  --md-sys-color-tertiary: rgba(var(--md-sys-color-tertiary-rgb), 1);
  --md-sys-color-tertiary-container: rgba(
    var(--md-sys-color-tertiary-container-rgb),
    1
  );
  --md-sys-color-surface: rgba(var(--md-sys-color-surface-rgb), 1);
  --md-sys-color-surface-variant: rgba(
    var(--md-sys-color-surface-variant-rgb),
    1
  );
  --md-sys-color-background: rgba(var(--md-sys-color-background-rgb), 1);
  --md-sys-color-error: rgba(var(--md-sys-color-error-rgb), 1);
  --md-sys-color-error-container: rgba(
    var(--md-sys-color-error-container-rgb),
    1
  );
  --md-sys-color-on-primary: rgba(var(--md-sys-color-on-primary-rgb), 1);
  --md-sys-color-on-primary-container: rgba(
    var(--md-sys-color-on-primary-container-rgb),
    1
  );
  --md-sys-color-on-secondary: rgba(var(--md-sys-color-on-secondary-rgb), 1);
  --md-sys-color-on-secondary-container: rgba(
    var(--md-sys-color-on-secondary-container-rgb),
    1
  );
  --md-sys-color-on-tertiary: rgba(var(--md-sys-color-on-tertiary-rgb), 1);
  --md-sys-color-on-tertiary-container: rgba(
    var(--md-sys-color-on-tertiary-container-rgb),
    1
  );
  --md-sys-color-on-surface: rgba(var(--md-sys-color-on-surface-rgb), 1);
  --md-sys-color-on-surface-variant: rgba(
    var(--md-sys-color-on-surface-variant-rgb),
    1
  );
  --md-sys-color-on-error: rgba(var(--md-sys-color-on-error-rgb), 1);
  --md-sys-color-on-error-container: rgba(
    var(--md-sys-color-on-error-container-rgb),
    1
  );
  --md-sys-color-on-background: rgba(var(--md-sys-color-on-background-rgb), 1);
  --md-sys-color-outline: rgba(var(--md-sys-color-outline-rgb), 1);
  --md-sys-color-outline-variant: rgba(
    var(--md-sys-color-outline-variant-rgb),
    1
  );
  --md-sys-color-shadow: rgba(var(--md-sys-color-shadow-rgb), 1);
  --md-sys-color-surface-tint: rgba(var(--md-sys-color-surface-tint-rgb), 1);
  --md-sys-color-inverse-surface: rgba(
    var(--md-sys-color-inverse-surface-rgb),
    1
  );
  --md-sys-color-inverse-on-surface: rgba(
    var(--md-sys-color-inverse-on-surface-rgb),
    1
  );
  --md-sys-color-inverse-primary: rgba(
    var(--md-sys-color-inverse-primary-rgb),
    1
  );
  --md-sys-color-scrim: rgba(var(--md-sys-color-scrim-rgb), 1);

  /* primary */
  --md-ref-palette-primary0: rgba(var(--md-ref-palette-primary0-rgb), 1);
  --md-ref-palette-primary5: rgba(var(--md-ref-palette-primary5-rgb), 1);
  --md-ref-palette-primary10: rgba(var(--md-ref-palette-primary10-rgb), 1);
  --md-ref-palette-primary20: rgba(var(--md-ref-palette-primary20-rgb), 1);
  --md-ref-palette-primary25: rgba(var(--md-ref-palette-primary25-rgb), 1);
  --md-ref-palette-primary30: rgba(var(--md-ref-palette-primary30-rgb), 1);
  --md-ref-palette-primary35: rgba(var(--md-ref-palette-primary35-rgb), 1);
  --md-ref-palette-primary40: rgba(var(--md-ref-palette-primary40-rgb), 1);
  --md-ref-palette-primary50: rgba(var(--md-ref-palette-primary50-rgb), 1);
  --md-ref-palette-primary60: rgba(var(--md-ref-palette-primary60-rgb), 1);
  --md-ref-palette-primary70: rgba(var(--md-ref-palette-primary70-rgb), 1);
  --md-ref-palette-primary80: rgba(var(--md-ref-palette-primary80-rgb), 1);
  --md-ref-palette-primary90: rgba(var(--md-ref-palette-primary90-rgb), 1);
  --md-ref-palette-primary95: rgba(var(--md-ref-palette-primary95-rgb), 1);
  --md-ref-palette-primary98: rgba(var(--md-ref-palette-primary98-rgb), 1);
  --md-ref-palette-primary99: rgba(var(--md-ref-palette-primary99-rgb), 1);
  --md-ref-palette-primary100: rgba(var(--md-ref-palette-primary100-rgb), 1);

  /* secondary */
  --md-ref-palette-secondary0: rgba(var(--md-ref-palette-secondary0-rgb), 1);
  --md-ref-palette-secondary5: rgba(var(--md-ref-palette-secondary5-rgb), 1);
  --md-ref-palette-secondary10: rgba(var(--md-ref-palette-secondary10-rgb), 1);
  --md-ref-palette-secondary20: rgba(var(--md-ref-palette-secondary20-rgb), 1);
  --md-ref-palette-secondary25: rgba(var(--md-ref-palette-secondary25-rgb), 1);
  --md-ref-palette-secondary30: rgba(var(--md-ref-palette-secondary30-rgb), 1);
  --md-ref-palette-secondary35: rgba(var(--md-ref-palette-secondary35-rgb), 1);
  --md-ref-palette-secondary40: rgba(var(--md-ref-palette-secondary40-rgb), 1);
  --md-ref-palette-secondary50: rgba(var(--md-ref-palette-secondary50-rgb), 1);
  --md-ref-palette-secondary60: rgba(var(--md-ref-palette-secondary60-rgb), 1);
  --md-ref-palette-secondary70: rgba(var(--md-ref-palette-secondary70-rgb), 1);
  --md-ref-palette-secondary80: rgba(var(--md-ref-palette-secondary80-rgb), 1);
  --md-ref-palette-secondary90: rgba(var(--md-ref-palette-secondary90-rgb), 1);
  --md-ref-palette-secondary95: rgba(var(--md-ref-palette-secondary95-rgb), 1);
  --md-ref-palette-secondary98: rgba(var(--md-ref-palette-secondary98-rgb), 1);
  --md-ref-palette-secondary99: rgba(var(--md-ref-palette-secondary99-rgb), 1);
  --md-ref-palette-secondary100: rgba(
    var(--md-ref-palette-secondary100-rgb),
    1
  );

  /* tertiary */
  --md-ref-palette-tertiary0: rgba(var(--md-ref-palette-tertiary0-rgb), 1);
  --md-ref-palette-tertiary5: rgba(var(--md-ref-palette-tertiary5-rgb), 1);
  --md-ref-palette-tertiary10: rgba(var(--md-ref-palette-tertiary10-rgb), 1);
  --md-ref-palette-tertiary20: rgba(var(--md-ref-palette-tertiary20-rgb), 1);
  --md-ref-palette-tertiary25: rgba(var(--md-ref-palette-tertiary25-rgb), 1);
  --md-ref-palette-tertiary30: rgba(var(--md-ref-palette-tertiary30-rgb), 1);
  --md-ref-palette-tertiary35: rgba(var(--md-ref-palette-tertiary35-rgb), 1);
  --md-ref-palette-tertiary40: rgba(var(--md-ref-palette-tertiary40-rgb), 1);
  --md-ref-palette-tertiary50: rgba(var(--md-ref-palette-tertiary50-rgb), 1);
  --md-ref-palette-tertiary60: rgba(var(--md-ref-palette-tertiary60-rgb), 1);
  --md-ref-palette-tertiary70: rgba(var(--md-ref-palette-tertiary70-rgb), 1);
  --md-ref-palette-tertiary80: rgba(var(--md-ref-palette-tertiary80-rgb), 1);
  --md-ref-palette-tertiary90: rgba(var(--md-ref-palette-tertiary90-rgb), 1);
  --md-ref-palette-tertiary95: rgba(var(--md-ref-palette-tertiary95-rgb), 1);
  --md-ref-palette-tertiary98: rgba(var(--md-ref-palette-tertiary98-rgb), 1);
  --md-ref-palette-tertiary99: rgba(var(--md-ref-palette-tertiary99-rgb), 1);
  --md-ref-palette-tertiary100: rgba(var(--md-ref-palette-tertiary100-rgb), 1);

  /* error */
  --md-ref-palette-error0: rgba(var(--md-ref-palette-error0-rgb), 1);
  --md-ref-palette-error5: rgba(var(--md-ref-palette-error5-rgb), 1);
  --md-ref-palette-error10: rgba(var(--md-ref-palette-error10-rgb), 1);
  --md-ref-palette-error20: rgba(var(--md-ref-palette-error20-rgb), 1);
  --md-ref-palette-error25: rgba(var(--md-ref-palette-error25-rgb), 1);
  --md-ref-palette-error30: rgba(var(--md-ref-palette-error30-rgb), 1);
  --md-ref-palette-error35: rgba(var(--md-ref-palette-error35-rgb), 1);
  --md-ref-palette-error40: rgba(var(--md-ref-palette-error40-rgb), 1);
  --md-ref-palette-error50: rgba(var(--md-ref-palette-error50-rgb), 1);
  --md-ref-palette-error60: rgba(var(--md-ref-palette-error60-rgb), 1);
  --md-ref-palette-error70: rgba(var(--md-ref-palette-error70-rgb), 1);
  --md-ref-palette-error80: rgba(var(--md-ref-palette-error80-rgb), 1);
  --md-ref-palette-error90: rgba(var(--md-ref-palette-error90-rgb), 1);
  --md-ref-palette-error95: rgba(var(--md-ref-palette-error95-rgb), 1);
  --md-ref-palette-error98: rgba(var(--md-ref-palette-error98-rgb), 1);
  --md-ref-palette-error99: rgba(var(--md-ref-palette-error99-rgb), 1);
  --md-ref-palette-error100: rgba(var(--md-ref-palette-error100-rgb), 1);

  /* neutral */
  --md-ref-palette-neutral0: rgba(var(--md-ref-palette-neutral0-rgb), 1);
  --md-ref-palette-neutral5: rgba(var(--md-ref-palette-neutral5-rgb), 1);
  --md-ref-palette-neutral10: rgba(var(--md-ref-palette-neutral10-rgb), 1);
  --md-ref-palette-neutral20: rgba(var(--md-ref-palette-neutral20-rgb), 1);
  --md-ref-palette-neutral25: rgba(var(--md-ref-palette-neutral25-rgb), 1);
  --md-ref-palette-neutral30: rgba(var(--md-ref-palette-neutral30-rgb), 1);
  --md-ref-palette-neutral35: rgba(var(--md-ref-palette-neutral35-rgb), 1);
  --md-ref-palette-neutral40: rgba(var(--md-ref-palette-neutral40-rgb), 1);
  --md-ref-palette-neutral50: rgba(var(--md-ref-palette-neutral50-rgb), 1);
  --md-ref-palette-neutral60: rgba(var(--md-ref-palette-neutral60-rgb), 1);
  --md-ref-palette-neutral70: rgba(var(--md-ref-palette-neutral70-rgb), 1);
  --md-ref-palette-neutral80: rgba(var(--md-ref-palette-neutral80-rgb), 1);
  --md-ref-palette-neutral90: rgba(var(--md-ref-palette-neutral90-rgb), 1);
  --md-ref-palette-neutral95: rgba(var(--md-ref-palette-neutral95-rgb), 1);
  --md-ref-palette-neutral98: rgba(var(--md-ref-palette-neutral98-rgb), 1);
  --md-ref-palette-neutral99: rgba(var(--md-ref-palette-neutral99-rgb), 1);
  --md-ref-palette-neutral100: rgba(var(--md-ref-palette-neutral100-rgb), 1);

  /* neutral-variant */
  --md-ref-palette-neutral-variant0: rgba(
    var(--md-ref-palette-neutral-variant0-rgb),
    1
  );
  --md-ref-palette-neutral-variant5: rgba(
    var(--md-ref-palette-neutral-variant5-rgb),
    1
  );
  --md-ref-palette-neutral-variant10: rgba(
    var(--md-ref-palette-neutral-variant10-rgb),
    1
  );
  --md-ref-palette-neutral-variant20: rgba(
    var(--md-ref-palette-neutral-variant20-rgb),
    1
  );
  --md-ref-palette-neutral-variant25: rgba(
    var(--md-ref-palette-neutral-variant25-rgb),
    1
  );
  --md-ref-palette-neutral-variant30: rgba(
    var(--md-ref-palette-neutral-variant30-rgb),
    1
  );
  --md-ref-palette-neutral-variant35: rgba(
    var(--md-ref-palette-neutral-variant35-rgb),
    1
  );
  --md-ref-palette-neutral-variant40: rgba(
    var(--md-ref-palette-neutral-variant40-rgb),
    1
  );
  --md-ref-palette-neutral-variant50: rgba(
    var(--md-ref-palette-neutral-variant50-rgb),
    1
  );
  --md-ref-palette-neutral-variant60: rgba(
    var(--md-ref-palette-neutral-variant60-rgb),
    1
  );
  --md-ref-palette-neutral-variant70: rgba(
    var(--md-ref-palette-neutral-variant70-rgb),
    1
  );
  --md-ref-palette-neutral-variant80: rgba(
    var(--md-ref-palette-neutral-variant80-rgb),
    1
  );
  --md-ref-palette-neutral-variant90: rgba(
    var(--md-ref-palette-neutral-variant90-rgb),
    1
  );
  --md-ref-palette-neutral-variant95: rgba(
    var(--md-ref-palette-neutral-variant95-rgb),
    1
  );
  --md-ref-palette-neutral-variant98: rgba(
    var(--md-ref-palette-neutral-variant98-rgb),
    1
  );
  --md-ref-palette-neutral-variant99: rgba(
    var(--md-ref-palette-neutral-variant99-rgb),
    1
  );
  --md-ref-palette-neutral-variant100: rgba(
    var(--md-ref-palette-neutral-variant100-rgb),
    1
  );
}
`;

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

    output.push(':where(.light-theme, .dark-theme) {');
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

    output.push(adapterSrc);

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
