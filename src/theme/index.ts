import { variants } from "@tbh-theme/palette";
import {
    TbhThemeFlavour,
    TbhThemePalette,
    ThemeContext,
    ThemeOptions,
} from "../types";
import { getTokenColors } from "./tokenColors";
import { getUiColors } from "./uiColors";
import { capitalize } from "./utils";

export const defaultOptions: ThemeOptions = {
    accent: "mauve",
    boldKeywords: true,
    italicComments: true,
    italicKeywords: true,
    colorOverrides: {},
    workbenchMode: "default",
    bracketMode: "rainbow",
    customUIColors: {},
};

export const compileTheme = (
    flavour: TbhThemeFlavour = "dark",
    options: ThemeOptions = defaultOptions
) => {
    const ctpPalette = Object.entries(variants[flavour])
        .map(([k, v]) => {
            return {
                [k as unknown as string]: v.hex,
                name: flavour,
            };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const palette: TbhThemePalette = {
        ...(ctpPalette as TbhThemePalette),
        ...options.colorOverrides?.all,
        ...options.colorOverrides?.[flavour],
    };

    const context: ThemeContext = {
        palette,
        options,
        isLight: flavour !== "dark",
    };

    const flavourName = `TbhTheme ${capitalize(flavour)}`;

    return {
        name: flavourName,
        type: context.isLight ? "light" : "dark",
        semanticHighlighting: true,
        semanticTokenColors: {
            enumMember: {
                foreground: palette.sky,
            },
            "variable.constant": {
                foreground: palette.yellow_red,
            },
            "variable.defaultLibrary": {
                foreground: palette.naples_yellow,
            },
        },
        tokenColors: getTokenColors(context),
        colors: getUiColors(context),
    };
};
