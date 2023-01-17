export type TbhThemeFlavour = "dark";
export type TbhThemeAccent =
    | "brink_pink"
    | "flamingo"
    | "pink"
    | "mauve"
    | "red"
    | "bittersweet"
    | "naples_yellow"
    | "maximum_yellow_red"
    | "medium_spring_green"
    | "teal"
    | "sky"
    | "sapphire"
    | "hot_pink"
    | "medium_slate_blue";
export type TbhThemeWorkbenchMode = "default" | "flat";
export type TbhThemeBracketMode =
    | "rainbow"
    | "dimmed"
    | "monochromatic"
    | "neovim";

export interface TbhThemePalette {
    hot_pink: string;
    name: TbhThemeFlavour;
    brink_pink: string;
    flamingo: string;
    pink: string;
    mauve: string;
    red: string;
    bittersweet: string;
    naples_yellow: string;
    maximum_yellow_red: string;
    medium_spring_green: string;
    teal: string;
    sky: string;
    sapphire: string;
    medium_slate_blue: string;
    magnolia: string; // text
    subtext1: string;
    subtext0: string;
    overlay2: string;
    overlay1: string;
    thistle: string;
    dim_gray: string; // surface2
    surface1: string;
    surface0: string;
    jet: string;
    mantle: string;
    english_violet: string;
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
