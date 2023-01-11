import { variants } from "@tbh-theme/palette";
import * as fs from "fs";
import { compileTheme, defaultOptions } from "./theme";
import { commands, window, workspace } from "vscode";
import {
    ColorOverrides,
    CustomUIColors,
    TbhThemeAccent,
    TbhThemeBracketMode,
    TbhThemeFlavour,
    TbhThemeWorkbenchMode,
    ThemeOptions,
    ThemePaths,
} from "./types";
import { join } from "path";

// the reason why an update has been triggered, and a reload is needed
export enum UpdateTrigger {
    CONFIG_CHANGE = "Configuration changed",
    FRESH_INSTALL = "Update detected",
}

class Utils {
    isFreshInstall(): boolean {
        console.log("Checking if tbh-theme is installed for the first time.");
        const flagPath = join(__dirname, "..", "themes", ".flag");
        if (fs.existsSync(flagPath)) {
            console.log("tbh-theme is installed for the first time!");
            return false;
        } else {
            console.log("tbh-theme has been installed before.");
            fs.writeFileSync(flagPath, "");
            return true;
        }
    }

    isDefaultConfig(): boolean {
        console.log("Checking if tbh-theme is using default config.");
        const state = this.getConfiguration() === defaultOptions;
        console.log(
            `tbh-theme is using ${state ? "default" : "custom"} config.`
        );
        return state;
    }

    getConfiguration = (): ThemeOptions => {
        const conf = workspace.getConfiguration("tbh-theme");
        return {
            accent: conf.get<TbhThemeAccent>("accentColor"),
            boldKeywords: conf.get<boolean>("boldKeywords"),
            italicKeywords: conf.get<boolean>("italicKeywords"),
            italicComments: conf.get<boolean>("italicComments"),
            colorOverrides: conf.get<ColorOverrides>("colorOverrides"),
            workbenchMode: conf.get<TbhThemeWorkbenchMode>("workbenchMode"),
            bracketMode: conf.get<TbhThemeBracketMode>("bracketMode"),
            customUIColors: conf.get<CustomUIColors>("customUIColors"),
        };
    };

    updateThemes = async (
        options: ThemeOptions,
        paths: ThemePaths,
        trigger: UpdateTrigger
    ) => {
        const flavours = Object.keys(variants) as TbhThemeFlavour[];

        const promises = flavours.map(async (flavour): Promise<void> => {
            const theme = compileTheme(flavour, options);
            return this.writeThemeFile(paths[flavour], theme);
        });

        Promise.all(promises).then(() => {
            this.promptToReload(trigger);
        });
    };

    private promptToReload(trigger: UpdateTrigger) {
        const msg = `TbhTheme: ${trigger} - Reload required.`;
        const action = "Reload window";
        window.showInformationMessage(msg, action).then((selectedAction) => {
            if (selectedAction === action) {
                commands.executeCommand("workbench.action.reloadWindow");
            }
        });
    }

    private writeThemeFile(path: string, data: any) {
        return fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                window.showErrorMessage(err.message);
            }
        });
    }
}

export default new Utils();
