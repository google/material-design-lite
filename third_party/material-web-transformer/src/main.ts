import postcss from "postcss";
import prettier from "prettier";
import { CSSResult } from "lit";
import * as fs from "fs";

// Material Web Styles

// Autocomplete
import { styles as autocompleteFilled } from "../../material-web/autocomplete/lib/filled-styles.css.js";
import { styles as autocompleteList } from "../../material-web/autocomplete/lib/autocompletelist/autocomplete-list-styles.css.js";

// Badge
import { styles as badge } from "../../material-web/badge/lib/badge-styles.css.js";

// Button
import { styles as button } from "../../material-web/button/lib/shared-styles.css.js";
import { styles as elevatedButton } from "../../material-web/button/lib/elevated-styles.css.js";
import { styles as outlinedButton } from "../../material-web/button/lib/outlined-styles.css.js";
import { styles as filledButton } from "../../material-web/button/lib/filled-styles.css.js";
import { styles as tonalButton } from "../../material-web/button/lib/tonal-styles.css.js";
import { styles as textButton } from "../../material-web/button/lib/text-styles.css.js";

// Checkbox
import { styles as checkbox } from "../../material-web/checkbox/lib/checkbox-styles.css.js";

// Elevation
import { styles as elevation } from "../../material-web/elevation/lib/elevation-overlay-styles.css.js";

// Fab
import { styles as fab } from "../../material-web/fab/lib/fab-styles.css.js";
import { styles as fabShared } from "../../material-web/fab/lib/fab-shared-styles.css.js";
import { styles as fabExtended } from "../../material-web/fab/lib/fab-extended-styles.css.js";

// Field
import { styles as field } from "../../material-web/field/lib/shared-styles.css.js";
import { styles as filledField } from "../../material-web/field/lib/filled-styles.css.js";
import { styles as outlinedField } from "../../material-web/field/lib/outlined-styles.css.js";

// Focus
import { styles as focus } from "../../material-web/focus/lib/focus-ring-styles.css.js";

// Form Field
import { styles as formField } from "../../material-web/formfield/lib/formfield-styles.css.js";

// Icon
import { styles as icon } from "../../material-web/icon/lib/icon-styles.css.js";

// Icon Button
import { styles as iconButton } from "../../material-web/iconbutton/lib/icon-button-styles.css.js";
import { styles as iconButtonFilled } from "../../material-web/iconbutton/lib/filled-styles.css.js";
import { styles as iconButtonFilledTonal } from "../../material-web/iconbutton/lib/filled-tonal-styles.css.js";
import { styles as iconButtonOutlined } from "../../material-web/iconbutton/lib/outlined-styles.css.js";
import { styles as iconButtonStandard } from "../../material-web/iconbutton/lib/standard-styles.css.js";

// List
import { styles as list } from "../../material-web/list/lib/list-styles.css.js";
import { styles as listItem } from "../../material-web/list/lib/listitem/list-item-styles.css.js";
import { styles as listVideo } from "../../material-web/list/lib/video/list-item-video-styles.css.js";
import { styles as listImage } from "../../material-web/list/lib/image/list-item-image-styles.css.js";
import { styles as listIcon } from "../../material-web/list/lib/icon/list-item-icon-styles.css.js";
import { styles as listDivider } from "../../material-web/list/lib/divider/list-divider-styles.css.js";
import { styles as listAvatar } from "../../material-web/list/lib/avatar/list-item-avatar-styles.css.js";

// Menu
import { styles as menu } from "../../material-web/menu/lib/menu-styles.css.js";
import { styles as menuButton } from "../../material-web/menu/lib/menu-button-styles.css.js";

// Menu Surface
import { styles as menuSurface } from "../../material-web/menusurface/lib/menu-surface-styles.css.js";

// Navigation Bar
import { styles as navigationBar } from "../../material-web/navigationbar/lib/navigation-bar-styles.css.js";

// Navigation Drawer
import { styles as navigationDrawer } from "../../material-web/navigationdrawer/lib/navigation-drawer-styles.css.js";
import { styles as navigationDrawerModal } from "../../material-web/navigationdrawer/lib/navigation-drawer-modal-styles.css.js";

// Navigation Tab
import { styles as navigationTab } from "../../material-web/navigationtab/lib/navigation-tab-styles.css.js";

// Radio
import { styles as radio } from "../../material-web/radio/lib/radio-styles.css.js";

// Ripple
import { styles as ripple } from "../../material-web/ripple/lib/ripple-styles.css.js";

// Segmented Button
import { styles as segmentedButton } from "../../material-web/segmentedbutton/lib/segmented-button-styles.css.js";
import { styles as segmentedButtonOutlined } from "../../material-web/segmentedbutton/lib/outlined-styles.css.js";

// Segmented Button Set
import { styles as segmentedButtonSet } from "../../material-web/segmentedbuttonset/lib/shared-styles.css.js";
import { styles as segmentedButtonSetOutlined } from "../../material-web/segmentedbuttonset/lib/outlined-styles.css.js";

// Switch
import { styles as switchStyles } from "../../material-web/switch/lib/switch-styles.css.js";

// Text Field
import { styles as textField } from "../../material-web/textfield/lib/shared-styles.css.js";
import { styles as filledTextField } from "../../material-web/textfield/lib/filled-styles.css.js";
import { styles as filledForceStylesTextField } from "../../material-web/textfield/lib/filled-forced-colors-styles.css.js";
import { styles as outlinedTextField } from "../../material-web/textfield/lib/outlined-styles.css.js";
import { styles as outlinedForcedColorsTextField } from "../../material-web/textfield/lib/outlined-forced-colors-styles.css.js";

const material = [
    {
        name: 'autocomplete',
        children: [
            {
                name: 'filled',
                styles: autocompleteFilled
            },
            {
                name: 'list',
                styles: autocompleteList
            },
        ],
    },
    {
        name: "badge",
        children: [{ name: "base", styles: badge }],
    },
    {
        name: "button",
        children: [
            { name: "base", styles: button },
            { name: "elevated-button", styles: elevatedButton },
            { name: "outlined-button", styles: outlinedButton },
            { name: "filled-button", styles: filledButton },
            { name: "tonal-button", styles: tonalButton },
            { name: "text-button", styles: textButton },
        ],
    },
    {
        name: "checkbox",
        children: [{ name: "base", styles: checkbox }],
    },
    {
        name: "elevation",
        children: [{ name: "base", styles: elevation }],
    },
    {
        name: "fab",
        children: [
            { name: "base", styles: fab },
            { name: "shared", styles: fabShared },
            { name: "extended", styles: fabExtended },
        ],
    },
    {
        name: "field",
        children: [
            { name: "base", styles: field },
            { name: "filled", styles: filledField },
            { name: "outlined", styles: outlinedField },
        ],
    },
    {
        name: "focus",
        children: [{ name: "base", styles: focus }],

    },
    {
        name: "form-field",
        children: [{ name: "base", styles: formField }],
    },
    {
        name: "icon",
        children: [{ name: "base", styles: icon }],
    },
    {
        name: "icon-button",
        children: [
            { name: "base", styles: iconButton },
            { name: "filled", styles: iconButtonFilled },
            { name: "filled-tonal", styles: iconButtonFilledTonal },
            { name: "outlined", styles: iconButtonOutlined },
            { name: "standard", styles: iconButtonStandard },
        ],
    },
    {
        name: "list",
        children: [
            { name: "base", styles: list },
            { name: "list-item", styles: listItem },
            { name: "list-item-video", styles: listVideo },
            { name: "list-item-image", styles: listImage },
            { name: "list-item-icon", styles: listIcon },
            { name: "list-divider", styles: listDivider },
            { name: "list-item-avatar", styles: listAvatar },
        ],
    },
    {
        name: "menu",
        children: [
            { name: "base", styles: menu },
            { name: "menu-button", styles: menuButton },
        ],
    },
    {
        name: "menu-surface",
        children: [{ name: "base", styles: menuSurface }],
    },
    {
        name: "navigation-bar",
        children: [{ name: "base", styles: navigationBar }],
    },
    {
        name: "navigation-drawer",
        children: [
            { name: "base", styles: navigationDrawer },
            { name: "navigation-drawer-modal", styles: navigationDrawerModal },
        ],
    },
    {
        name: "navigation-tab",
        children: [{ name: "base", styles: navigationTab }],
    },
    {
        name: "radio",
        children: [{ name: "base", styles: radio }],
    },
    {
        name: "ripple",
        children: [{ name: "base", styles: ripple }],
    },
    {
        name: "segmented-button",
        children: [
            { name: "base", styles: segmentedButton },
            { name: "outlined", styles: segmentedButtonOutlined },
        ],
    },
    {
        name: "segmented-button-set",
        children: [
            { name: "base", styles: segmentedButtonSet },
            { name: "outlined", styles: segmentedButtonSetOutlined },
        ],
    },
    {
        name: "switch",
        children: [{ name: "base", styles: switchStyles }],
    },
    {
        name: "text-field",
        children: [
            { name: "base", styles: textField },
            { name: "filled", styles: filledTextField },
            { name: "filled-forced-colors", styles: filledForceStylesTextField },
            { name: "outlined", styles: outlinedTextField },
            { name: "outlined-forced-colors", styles: outlinedForcedColorsTextField },
        ],
    },
];

const outDir = "build";

async function transformCss(css: CSSResult, parent: string, target: string) {
    const rawCss = css.cssText;
    const config = postcss();
    const postCssResult = await config.process(rawCss);
    let cssResult = postCssResult.css;
    // Rename md3 to mdl
    cssResult = cssResult.replace(/md3/g, "mdl");
    // Replace parent selector for variant "button--raised" -> "button.raised"
    cssResult = cssResult.split(`${parent}--`).join(`${parent}.`);
    // Remove mdl- prefix from selectors
    cssResult = cssResult.replace(/\.mdl-/g, ".");
    // Replace double parent selector
    cssResult = cssResult.split(`.${parent}.${parent}.`).join(`.${parent}.`);
    // Replace double child selector .fab.extended.fab.
    cssResult = cssResult.split(`.${parent}.${target}.${parent}.`).join(`.${parent}.${target}.`);
    // Replace host disabled ([disabled]) with parent disabled
    cssResult = cssResult.split(":host([disabled])").join(`.${parent}[disabled]`);
    // Replace host with parent
    cssResult = cssResult.split(":host").join(`.${parent}`);
    return prettier.format(cssResult, { parser: "css" });
}

(async () => {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
    for (const file of material) {
        const groupDir = `${outDir}/${file.name}`;
        if (!fs.existsSync(groupDir)) {
            fs.mkdirSync(groupDir);
        }
        for (const child of file.children) {
            const cssResult = await transformCss(child.styles, file.name, child.name);
            const cssPath = `${groupDir}/${child.name}.css`;
            fs.writeFileSync(cssPath, cssResult);
            console.log(`Wrote ${cssPath}`);
        }

        // Generate index
        const output = file.children.map((child) => `@import url(${child.name}.css);`).join("\n");
        const indexPath = `${groupDir}/index.css`;
        fs.writeFileSync(indexPath, output);
    }
    // Generate index
    const output = material.map((file) => `@import url(${file.name}/index.css);`).join("\n");
    const indexPath = `${outDir}/index.css`;
    fs.writeFileSync(indexPath, output);
})();
