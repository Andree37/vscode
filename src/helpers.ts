import { join } from "path";
import { ThemePaths } from "./types";

export const getThemePaths = (): ThemePaths => {
    const themes = ["dark"];
    const paths: ThemePaths = {
        dark: "",
    };
    themes.map(
        (theme) =>
            (paths[theme] = join(__dirname, "..", "themes", `${theme}.json`))
    );
    return paths;
};
