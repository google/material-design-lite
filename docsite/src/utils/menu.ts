interface Component {
  text: string;
  link: string;
  id: string;
  draft?: boolean;
}

export const COMPONENTS = [
  {
    text: "Badge",
    link: "components/badge",
  },
  {
    text: "Banner",
    link: "components/banner",
    draft: true,
  },
  {
    text: "Button",
    link: "components/button",
  },
  {
    text: "Bottom app bar",
    link: "components/bottom-app-bar",
  },
  {
    text: "Bottom sheet",
    link: "components/bottom-sheet",
    draft: true,
  },
  {
    text: "Card",
    link: "components/card",
  },
  {
    text: "Checkbox",
    link: "components/checkbox",
  },
  {
    text: "Chip",
    link: "components/chip",
  },
  {
    text: "Dialog",
    link: "components/dialog",
  },
  {
    text: "Divider",
    link: "components/divider",
  },
  {
    text: "Date picker",
    link: "components/date-picker",
    draft: true,
  },
  {
    text: "Expansion Panel",
    link: "components/expansion-panel",
    draft: true,
  },
  {
    text: "Image list",
    link: "components/image-list",
    draft: true,
  },
  {
    text: "Floating action button",
    link: "components/fab",
  },
  {
    text: "Focus Ring",
    link: "components/focus-ring",
  },
  {
    text: "Icon Button",
    link: "components/icon-button",
  },
  {
    text: "List",
    link: "components/list",
  },
  {
    text: "Grid list",
    link: "components/grid-list",
    draft: true,
  },
  {
    text: "Menu",
    link: "components/menu",
    draft: true,
  },
  {
    text: "Progress indicator",
    link: "components/progress-indicator",
  },
  {
    text: "Navigation bar",
    link: "components/navigation-bar",
  },
  {
    text: "Navigation drawer",
    link: "components/navigation-drawer",
  },
  {
    text: "Navigation rail",
    link: "components/navigation-rail",
  },
  {
    text: "Radio button",
    link: "components/radio-button",
  },
  {
    text: "Ripple",
    link: "components/ripple",
  },
  {
    text: "Slider",
    link: "components/slider",
  },
  {
    text: "Select",
    link: "components/select",
    draft: true,
  },
  {
    text: "Segmented Button",
    link: "components/segmented-button",
  },
  {
    text: "Stepper",
    link: "components/stepper",
    draft: true,
  },
  {
    text: "Sort header",
    link: "components/sort-header",
    draft: true,
  },
  {
    text: "Snackbar",
    link: "components/snackbar",
  },
  {
    text: "Switch",
    link: "components/switch",
  },
  {
    text: "Table",
    link: "components/table",
  },
  {
    text: "Text field",
    link: "components/text-field",
  },
  {
    text: "Tree",
    link: "components/tree",
    draft: true,
  },
  {
    text: "Tooltip",
    link: "components/tooltip",
  },
  {
    text: "Tabs",
    link: "components/tabs",
  },
  {
    text: "Top app bar",
    link: "components/top-app-bar",
  },
].map((comp) => {
  const parts = comp.link.split("/");
  Object(comp).id = parts[parts.length - 1];
  return comp;
}) as Component[];

export const OVERVIEW = [
  {
    text: "Typography",
    link: "overview/typography",
  },
  {
    text: "Color",
    link: "overview/color",
  },
  {
    text: "Icons",
    link: "overview/icons",
  },
  {
    text: "Shape",
    link: "overview/shape",
  },
  {
    text: "Elevation",
    link: "overview/elevation",
  },
  {
    text: "Themes",
    link: "overview/themes",
  },
  {
    text: "FAQ",
    link: "faq",
  },
];

export const MENU = [
  {
    text: "Home",
    icon: "home",
    href: "",
    header: true,
    children: [],
  },
  {
    text: "Overview",
    icon: "palette",
    href: "/overview",
    header: true,
    children: OVERVIEW,
  },
  {
    text: "Demos",
    icon: "play_circle_outline",
    href: "/demos",
    header: true,
    children: [
      {
        text: "Scaffold",
        link: "demos/scaffold",
      },
      {
        text: "Sticker sheet",
        link: "demos/sticker-sheet",
        draft: true,
      },
    ],
  },
  {
    text: "Components",
    icon: "widgets",
    href: "/components",
    header: true,
    children: COMPONENTS,
  },
];
