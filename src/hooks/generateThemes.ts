import { compileTheme, defaultOptions } from "../theme";
import { TbhThemeFlavour } from "../types";
import { getThemePaths } from "../helpers";
import * as fs from "fs";
import path = require("path");

const paths = getThemePaths();

const flavours = ["dark" as TbhThemeFlavour];

flavours.map((flavour) => {
    const theme = compileTheme(flavour, defaultOptions);
    // ignore error if directory exists
    fs.mkdir(path.dirname(paths[flavour]), () => {
        fs.writeFileSync(paths[flavour], JSON.stringify(theme, null, 2));
    });
});
