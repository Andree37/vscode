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
    flavour: TbhThemeFlavour = "mocha",
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
        isLatte: flavour === "latte",
    };

    const flavourName = `TbhTheme ${capitalize(flavour)}`;

    return {
        name: flavourName,
        type: context.isLatte ? "light" : "dark",
        semanticHighlighting: true,
        semanticTokenColors: {
            enumMember: {
                foreground: palette.sky,
            },
            "variable.constant": {
                foreground: palette.yellow,
            },
            "variable.defaultLibrary": {
                foreground: palette.peach,
            },
        },
        tokenColors: getTokenColors(context),
        colors: getUiColors(context),
    };
};
