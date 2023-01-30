export type TbhThemeFlavour = "dark";
export type TbhThemeAccent =
    | "brink_pink"
    | "flamingo"
    | "mauve"
    | "red"
    | "bittersweet"
    | "naples_yellow"
    | "yellow_red"
    | "emerald"
    | "teal"
    | "sky"
    | "sapphire"
    | "cornflower_blue"
    | "pink";
export type TbhThemeWorkbenchMode = "default" | "flat";
export type TbhThemeBracketMode =
    | "rainbow"
    | "dimmed"
    | "monochromatic"
    | "neovim";

export interface TbhThemePalette {
    name: TbhThemeFlavour;
    brink_pink: string;
    flamingo: string;
    mauve: string;
    red: string;
    bittersweet: string;
    naples_yellow: string;
    yellow_red: string;
    emerald: string;
    teal: string;
    sky: string;
    sapphire: string;
    cornflower_blue: string;
    pink: string;
    text: string; // text
    subtext1: string;
    subtext0: string;
    overlay2: string;
    overlay1: string;
    overlay0: string;
    surface2: string; // surface2
    surface1: string;
    surface0: string;
    base: string;
    mantle: string;
    crust: string;
}

export type ColorOverrides = {
    all?: Partial<TbhThemePalette>;
    dark?: Partial<TbhThemePalette>;
};

export type CustomUIColors = {
    all?: Record<"all", string>;
    dark?: Record<"dark", string>;
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
    dark: string;
};

export type ThemeContext = {
    palette: TbhThemePalette;
    options: ThemeOptions;
    isLight: boolean;
};
