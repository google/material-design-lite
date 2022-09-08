import { themeFromSourceColor, argbFromHex, hexFromArgb } from '@material/material-color-utilities';

export function generateTheme(color: string, target: HTMLElement) {
    const content = generateTokens(color);

    // Apply in chunks to avoid memory issues
    const chunks = content.match(/.{1,500}/g) || [];
    target.innerHTML = '';
    for (const chunk of chunks) {
        target.appendChild(document.createTextNode(chunk));
    }
}

export function generateTokens(color: string) {
    const theme = themeFromSourceColor(argbFromHex(color));
    const output: string[] = [];

    output.push(':where(.light-theme, .dark-theme) {');
    output.push(`--md-source: ${color};`);

    function convertColors(key: string, value: any) {
        if (typeof value === 'number') {
            return hexFromArgb(value);
        }
        if (key === 'palettes') {
            const defaultTones = [100, 99, 98, 95, 90, 80, 70, 60, 50, 40, 35, 30, 25, 20, 10, 5, 0];
            const output = {};
            for (const [key, palette] of Object.entries(value)) {
                Object(output)[key] = {};
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

    // Palettes
    for (const [section, palette] of Object.entries(convertedTheme.palettes)) {
        output.push(`  /* ${section} */`);
        for (const [tone, value] of Object.entries(palette!)) {
            const token = section.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            const [r, g, b] = hexToRgb(value);
            output.push(`  --md-ref-palette-${token}${tone}-rgb: ${r}, ${g}, ${b};`);
        }
    }

    output.push('}');

    const result = output.join('\n');
    return result;
}

function hexToRgb(value: string): number[] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value) as RegExpExecArray;
    const { r, g, b } = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
    return [r, g, b]
}

export const COLORS = [
    { name: "Baseline", value: "6750a4" },
    { name: "Black", value: "000000" },
    { name: "Navy", value: "000080" },
    { name: "DarkBlue", value: "00008B" },
    { name: "MediumBlue", value: "0000CD" },
    { name: "Blue", value: "0000FF" },
    { name: "DarkGreen", value: "006400" },
    { name: "Green", value: "008000" },
    { name: "Teal", value: "008080" },
    { name: "DarkCyan", value: "008B8B" },
    { name: "DeepSkyBlue", value: "00BFFF" },
    { name: "DarkTurquoise", value: "00CED1" },
    { name: "MediumSpringGreen", value: "00FA9A" },
    { name: "Lime", value: "00FF00" },
    { name: "SpringGreen", value: "00FF7F" },
    { name: "Aqua", value: "00FFFF" },
    { name: "Cyan", value: "00FFFF" },
    { name: "MidnightBlue", value: "191970" },
    { name: "DodgerBlue", value: "1E90FF" },
    { name: "LightSeaGreen", value: "20B2AA" },
    { name: "ForestGreen", value: "228B22" },
    { name: "SeaGreen", value: "2E8B57" },
    { name: "DarkSlateGray", value: "2F4F4F" },
    { name: "DarkSlateGrey", value: "2F4F4F" },
    { name: "LimeGreen", value: "32CD32" },
    { name: "MediumSeaGreen", value: "3CB371" },
    { name: "Turquoise", value: "40E0D0" },
    { name: "RoyalBlue", value: "4169E1" },
    { name: "SteelBlue", value: "4682B4" },
    { name: "DarkSlateBlue", value: "483D8B" },
    { name: "MediumTurquoise", value: "48D1CC" },
    { name: "Indigo", value: "4B0082" },
    { name: "DarkOliveGreen", value: "556B2F" },
    { name: "CadetBlue", value: "5F9EA0" },
    { name: "CornflowerBlue", value: "6495ED" },
    { name: "RebeccaPurple", value: "663399" },
    { name: "MediumAquaMarine", value: "66CDAA" },
    { name: "DimGray", value: "696969" },
    { name: "DimGrey", value: "696969" },
    { name: "SlateBlue", value: "6A5ACD" },
    { name: "OliveDrab", value: "6B8E23" },
    { name: "SlateGray", value: "708090" },
    { name: "SlateGrey", value: "708090" },
    { name: "LightSlateGray", value: "778899" },
    { name: "LightSlateGrey", value: "778899" },
    { name: "MediumSlateBlue", value: "7B68EE" },
    { name: "LawnGreen", value: "7CFC00" },
    { name: "Chartreuse", value: "7FFF00" },
    { name: "Aquamarine", value: "7FFFD4" },
    { name: "Maroon", value: "800000" },
    { name: "Purple", value: "800080" },
    { name: "Olive", value: "808000" },
    { name: "Gray", value: "808080" },
    { name: "Grey", value: "808080" },
    { name: "SkyBlue", value: "87CEEB" },
    { name: "LightSkyBlue", value: "87CEFA" },
    { name: "BlueViolet", value: "8A2BE2" },
    { name: "DarkRed", value: "8B0000" },
    { name: "DarkMagenta", value: "8B008B" },
    { name: "SaddleBrown", value: "8B4513" },
    { name: "DarkSeaGreen", value: "8FBC8F" },
    { name: "LightGreen", value: "90EE90" },
    { name: "MediumPurple", value: "9370DB" },
    { name: "DarkViolet", value: "9400D3" },
    { name: "PaleGreen", value: "98FB98" },
    { name: "DarkOrchid", value: "9932CC" },
    { name: "YellowGreen", value: "9ACD32" },
    { name: "Sienna", value: "A0522D" },
    { name: "Brown", value: "A52A2A" },
    { name: "DarkGray", value: "A9A9A9" },
    { name: "DarkGrey", value: "A9A9A9" },
    { name: "LightBlue", value: "ADD8E6" },
    { name: "GreenYellow", value: "ADFF2F" },
    { name: "PaleTurquoise", value: "AFEEEE" },
    { name: "LightSteelBlue", value: "B0C4DE" },
    { name: "PowderBlue", value: "B0E0E6" },
    { name: "FireBrick", value: "B22222" },
    { name: "DarkGoldenRod", value: "B8860B" },
    { name: "MediumOrchid", value: "BA55D3" },
    { name: "RosyBrown", value: "BC8F8F" },
    { name: "DarkKhaki", value: "BDB76B" },
    { name: "Silver", value: "C0C0C0" },
    { name: "MediumVioletRed", value: "C71585" },
    { name: "IndianRed", value: "CD5C5C" },
    { name: "Peru", value: "CD853F" },
    { name: "Chocolate", value: "D2691E" },
    { name: "Tan", value: "D2B48C" },
    { name: "LightGray", value: "D3D3D3" },
    { name: "LightGrey", value: "D3D3D3" },
    { name: "Thistle", value: "D8BFD8" },
    { name: "Orchid", value: "DA70D6" },
    { name: "GoldenRod", value: "DAA520" },
    { name: "PaleVioletRed", value: "DB7093" },
    { name: "Crimson", value: "DC143C" },
    { name: "Gainsboro", value: "DCDCDC" },
    { name: "Plum", value: "DDA0DD" },
    { name: "BurlyWood", value: "DEB887" },
    { name: "LightCyan", value: "E0FFFF" },
    { name: "Lavender", value: "E6E6FA" },
    { name: "DarkSalmon", value: "E9967A" },
    { name: "Violet", value: "EE82EE" },
    { name: "PaleGoldenRod", value: "EEE8AA" },
    { name: "LightCoral", value: "F08080" },
    { name: "Khaki", value: "F0E68C" },
    { name: "AliceBlue", value: "F0F8FF" },
    { name: "HoneyDew", value: "F0FFF0" },
    { name: "Azure", value: "F0FFFF" },
    { name: "SandyBrown", value: "F4A460" },
    { name: "Wheat", value: "F5DEB3" },
    { name: "Beige", value: "F5F5DC" },
    { name: "WhiteSmoke", value: "F5F5F5" },
    { name: "MintCream", value: "F5FFFA" },
    { name: "GhostWhite", value: "F8F8FF" },
    { name: "Salmon", value: "FA8072" },
    { name: "AntiqueWhite", value: "FAEBD7" },
    { name: "Linen", value: "FAF0E6" },
    { name: "LightGoldenRodYellow", value: "FAFAD2" },
    { name: "OldLace", value: "FDF5E6" },
    { name: "Red", value: "FF0000" },
    { name: "Fuchsia", value: "FF00FF" },
    { name: "Magenta", value: "FF00FF" },
    { name: "DeepPink", value: "FF1493" },
    { name: "OrangeRed", value: "FF4500" },
    { name: "Tomato", value: "FF6347" },
    { name: "HotPink", value: "FF69B4" },
    { name: "Coral", value: "FF7F50" },
    { name: "DarkOrange", value: "FF8C00" },
    { name: "LightSalmon", value: "FFA07A" },
    { name: "Orange", value: "FFA500" },
    { name: "LightPink", value: "FFB6C1" },
    { name: "Pink", value: "FFC0CB" },
    { name: "Gold", value: "FFD700" },
    { name: "PeachPuff", value: "FFDAB9" },
    { name: "NavajoWhite", value: "FFDEAD" },
    { name: "Moccasin", value: "FFE4B5" },
    { name: "Bisque", value: "FFE4C4" },
    { name: "MistyRose", value: "FFE4E1" },
    { name: "BlanchedAlmond", value: "FFEBCD" },
    { name: "PapayaWhip", value: "FFEFD5" },
    { name: "LavenderBlush", value: "FFF0F5" },
    { name: "SeaShell", value: "FFF5EE" },
    { name: "Cornsilk", value: "FFF8DC" },
    { name: "LemonChiffon", value: "FFFACD" },
    { name: "FloralWhite", value: "FFFAF0" },
    { name: "Snow", value: "FFFAFA" },
    { name: "Yellow", value: "FFFF00" },
    { name: "LightYellow", value: "FFFFE0" },
    { name: "Ivory", value: "FFFFF0" },
    { name: "White", value: "FFFFFF" }
].map(function (color) {
    Object(color).title = color.name;
    color.name = color.name.toLowerCase();
    color.value = "#" + color.value;
    return color;
})