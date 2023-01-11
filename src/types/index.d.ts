export type TbhThemeFlavour = "latte" | "frappe" | "macchiato" | "mocha";
export type TbhThemeAccent =
    | "rosewater"
    | "flamingo"
    | "pink"
    | "mauve"
    | "red"
    | "maroon"
    | "peach"
    | "yellow"
    | "green"
    | "teal"
    | "sky"
    | "sapphire"
    | "blue"
    | "lavender";
export type TbhThemeWorkbenchMode = "default" | "flat";
export type TbhThemeBracketMode =
    | "rainbow"
    | "dimmed"
    | "monochromatic"
    | "neovim";

export interface TbhThemePalette {
    name: TbhThemeFlavour;
    rosewater: string;
    flamingo: string;
    pink: string;
    mauve: string;
    red: string;
    maroon: string;
    peach: string;
    yellow: string;
    green: string;
    teal: string;
    sky: string;
    sapphire: string;
    blue: string;
    lavender: string;
    text: string;
    subtext1: string;
    subtext0: string;
    overlay2: string;
    overlay1: string;
    overlay0: string;
    surface2: string;
    surface1: string;
    surface0: string;
    base: string;
    mantle: string;
    crust: string;
}

export type ColorOverrides = {
    all?: Partial<TbhThemePalette>;
    latte?: Partial<TbhThemePalette>;
    frappe?: Partial<TbhThemePalette>;
    macchiato?: Partial<TbhThemePalette>;
    mocha?: Partial<TbhThemePalette>;
};

export type CustomUIColors = {
    all?: Record<"all", string>;
    latte?: Record<"latte", string>;
    frappe?: Record<"frappe", string>;
    macchiato?: Record<"macchiato", string>;
    mocha?: Record<"mocha", string>;
};

export type ThemeOptions = {
    accent: TbhThemeAccent;
    italicComments: boolean;
    italicKeywords: boolean;
    boldKeywords: boolean;
    colorOverrides: ColorOverrides;
    workbenchMode: TbhThemeWorkbenchMode;
    bracketMode: TbhThemeBracketMode;
    customUIColors: CustomUIColors;
};

export type ThemePaths = {
    latte: string;
    frappe: string;
    macchiato: string;
    mocha: string;
};

export type ThemeContext = {
    palette: TbhThemePalette;
    options: ThemeOptions;
    isLatte: boolean;
};
