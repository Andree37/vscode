import { ThemeContext } from "../../types";
import { opacity } from "../utils";

export default function colors(context: ThemeContext) {
    const { palette } = context;

    return {
        "errorLens.errorBackground": opacity(palette.red, 0.15),
        "errorLens.errorMessageBackground": opacity(palette.red, 0.15),
        "errorLens.errorBackgroundLight": opacity(palette.red, 0.15),
        "errorLens.errorForeground": palette.red,
        "errorLens.errorForegroundLight": palette.red,
        "errorLens.warningBackground": opacity(palette.naples_yellow, 0.15),
        "errorLens.warningMessageBackground": opacity(
            palette.naples_yellow,
            0.15
        ),
        "errorLens.warningBackgroundLight": opacity(
            palette.naples_yellow,
            0.15
        ),
        "errorLens.warningForeground": palette.naples_yellow,
        "errorLens.warningForegroundLight": palette.naples_yellow,
        "errorLens.infoBackground": opacity(palette.cornflower_blue, 0.15),
        "errorLens.infoMessageBackground": opacity(
            palette.cornflower_blue,
            0.15
        ),
        "errorLens.infoBackgroundLight": opacity(palette.cornflower_blue, 0.15),
        "errorLens.infoForeground": palette.cornflower_blue,
        "errorLens.infoForegroundLight": palette.cornflower_blue,
        "errorLens.hintBackground": opacity(palette.emerald, 0.15),
        "errorLens.hintMessageBackground": opacity(palette.emerald, 0.15),
        "errorLens.hintBackgroundLight": opacity(palette.emerald, 0.15),
        "errorLens.hintForeground": palette.emerald,
        "errorLens.hintForegroundLight": palette.emerald,
        "errorLens.statusBarIconErrorForeground": palette.red,
        "errorLens.statusBarIconWarningForeground": palette.naples_yellow,
        "errorLens.statusBarErrorForeground": palette.red,
        "errorLens.statusBarWarningForeground": palette.naples_yellow,
        "errorLens.statusBarInfoForeground": palette.cornflower_blue,
        "errorLens.statusBarHintForeground": palette.emerald,
    };
}
