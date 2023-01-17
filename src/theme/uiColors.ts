import {
    TbhThemeBracketMode,
    TbhThemeWorkbenchMode,
    ThemeContext,
} from "../types";
import { opacity, shade, transparent } from "./utils";
import extensions from "./extensions";

const getCustomizedColors = (context: ThemeContext) => {
    const { palette, options, isLight } = context;

    // invert the shade if current theme is latte
    const L = isLight ? -1 : 1;
    const bracketsMap: Record<TbhThemeBracketMode, Record<string, string>> = {
        rainbow: {
            "editorBracketHighlight.foreground1": palette.red,
            "editorBracketHighlight.foreground2": palette.naples_yellow,
            "editorBracketHighlight.foreground3": palette.maximum_yellow_red,
            "editorBracketHighlight.foreground4": palette.medium_spring_green,
            "editorBracketHighlight.foreground5": palette.sapphire,
            "editorBracketHighlight.foreground6": palette.mauve,
            "editorBracketHighlight.unexpectedBracket.foreground":
                palette.bittersweet,
        },
        dimmed: {
            "editorBracketHighlight.foreground1": shade(palette.red, -0.6 * L),
            "editorBracketHighlight.foreground2": shade(
                palette.naples_yellow,
                -0.6 * L
            ),
            "editorBracketHighlight.foreground3": shade(
                palette.maximum_yellow_red,
                -0.6 * L
            ),
            "editorBracketHighlight.foreground4": shade(
                palette.medium_spring_green,
                -0.6 * L
            ),
            "editorBracketHighlight.foreground5": shade(
                palette.sapphire,
                -0.6 * L
            ),
            "editorBracketHighlight.foreground6": shade(
                palette.mauve,
                -0.6 * L
            ),
            "editorBracketHighlight.unexpectedBracket.foreground": shade(
                palette.bittersweet,
                -0.6 * L
            ),
        },
        monochromatic: {
            "editorBracketHighlight.foreground1": palette.subtext1,
            "editorBracketHighlight.foreground2": palette.subtext0,
            "editorBracketHighlight.foreground3": palette.overlay2,
            "editorBracketHighlight.foreground4": palette.overlay1,
            "editorBracketHighlight.foreground5": palette.thistle,
            "editorBracketHighlight.foreground6": palette.dim_gray,
            "editorBracketHighlight.unexpectedbracket.foreground":
                palette.bittersweet,
        },
        neovim: {
            "editorBracketHighlight.foreground1": palette.red,
            "editorBracketHighlight.foreground2": palette.teal,
            "editorBracketHighlight.foreground3": palette.maximum_yellow_red,
            "editorBracketHighlight.foreground4": palette.medium_slate_blue,
            "editorBracketHighlight.foreground5": palette.pink,
            "editorBracketHighlight.foreground6": palette.flamingo,
            "editorBracketHighlight.unexpectedBracket.foreground":
                palette.bittersweet,
        },
    };

    const workbenchMap: Record<
        TbhThemeWorkbenchMode,
        Record<string, string>
    > = {
        default: {},
        flat: {
            "activityBar.background": palette.mantle,
            "breadcrumb.background": palette.jet,
            "commandCenter.background": palette.mantle,
            "debugToolBar.background": palette.mantle,
            "editorGroupHeader.tabsBackground": palette.mantle,
            "minimap.background": opacity(palette.jet, 0.5),
            "sideBarTitle.background": palette.mantle,
            "statusBar.background": palette.mantle,
            "statusBar.noFolderBackground": palette.mantle,
            "tab.border": palette.jet,
            "titleBar.activeBackground": palette.mantle,
            "titleBar.inactiveBackground": palette.mantle,
            "scrollbar.shadow": palette.mantle,
        },
    };

    return {
        ...bracketsMap[options.bracketMode],
        ...workbenchMap[options.workbenchMode],
    };
};

export const getUiColors = (context: ThemeContext) => {
    const { palette, options, isLight } = context;

    const accent = palette[options.accent];
    const dropBackground = opacity(palette.dim_gray, 0.6);

    // support for custom named colors
    const customNamedColors = {
        ...Object.entries({
            // collect the options, overwrite the "all" config with the current palette config
            ...options.customUIColors.all,
            ...options.customUIColors[palette.name],
        })
            .map(([k, v]) => {
                // deal with accents
                if (v.startsWith("accent")) {
                    const entry = v.split(" ");
                    if (entry.length !== 1) {
                        return {
                            [k]: opacity(accent, Number(entry[1])),
                        };
                    } else {
                        return {
                            [k]: accent,
                        };
                    }
                }

                //check if the entry is a "color opacity" mapping
                const entry = v.split(" ");
                if (entry.length !== 1) {
                    // call the opacity function
                    v = opacity(palette[entry[0]], Number(entry[1]));
                } else {
                    // resolve to the palette color
                    v = palette[v];
                }

                return {
                    [k]: v,
                };
            })
            .reduce((prev, cur) => ({ ...prev, ...cur }), {}),
    };

    // find the definitions here:
    // https://code.visualstudio.com/api/references/theme-color
    return {
        // jet colors
        focusBorder: transparent,
        foreground: palette.magnolia,
        disabledForeground: palette.subtext0,
        "widget.shadow": opacity(palette.mantle, 0.5),
        "selection.background": palette.dim_gray,
        descriptionForeground: palette.magnolia,
        errorForeground: palette.red,
        "icon.foreground": accent,
        "sash.hoverBorder": accent,

        // Window border
        "window.activeBorder": transparent,
        "window.inactiveBorder": transparent,

        // Text colors
        "textBlockQuote.background": palette.mantle,
        "textBlockQuote.border": palette.english_violet,
        "textCodeBlock.background": palette.jet,
        "textLink.activeForeground": palette.sky,
        "textLink.foreground": palette.medium_slate_blue,
        "textPreformat.foreground": palette.magnolia,
        "textSeparator.foreground": accent,

        // Activity Bar
        "activityBar.background": palette.english_violet,
        "activityBar.foreground": accent,
        "activityBar.dropBar": dropBackground,
        "activityBar.inactiveForeground": palette.thistle,
        "activityBar.border": transparent,
        "activityBarBadge.background": accent,
        "activityBarBadge.foreground": palette.english_violet,
        "activityBar.activeBorder": transparent,
        "activityBar.activeBackground": transparent,
        "activityBar.activeFocusBorder": transparent,

        "badge.background": palette.surface1,
        "badge.foreground": palette.magnolia,

        "breadcrumb.activeSelectionForeground": accent,
        "breadcrumb.background": palette.mantle,
        "breadcrumb.focusForeground": accent,
        "breadcrumb.foreground": opacity(palette.magnolia, 0.8),
        "breadcrumbPicker.background": palette.mantle,

        // buttons & checkboxes
        "button.background": accent,
        "button.foreground": palette.english_violet,
        "button.border": transparent,
        "button.separator": transparent,
        "button.hoverBackground": shade(accent, 0.2),
        "button.secondaryForeground": palette.magnolia,
        "button.secondaryBackground": palette.dim_gray,
        "button.secondaryHoverBackground": shade(palette.dim_gray, 0.2),
        "checkbox.background": palette.surface1,
        "checkbox.border": transparent,
        "checkbox.foreground": accent,

        // dropdown controls
        "dropdown.background": palette.mantle,
        "dropdown.listBackground": palette.dim_gray,
        "dropdown.border": accent,
        "dropdown.foreground": palette.magnolia,

        // debug
        "debugToolBar.background": palette.english_violet,
        "debugToolBar.border": transparent,
        "debugExceptionWidget.background": palette.english_violet,
        "debugExceptionWidget.border": accent,
        "debugTokenExpression.number": palette.naples_yellow,
        "debugTokenExpression.boolean": palette.mauve,
        "debugTokenExpression.string": palette.medium_spring_green,
        "debugTokenExpression.error": palette.red,

        // debug icons
        "debugIcon.breakpointForeground": palette.red,
        "debugIcon.breakpointDisabledForeground": opacity(palette.red, 0.6),
        "debugIcon.breakpointUnverifiedForeground": palette.jet,
        "debugIcon.breakpointCurrentStackframeForeground": palette.dim_gray,
        "debugIcon.breakpointStackframeForeground": palette.dim_gray,
        "debugIcon.startForeground": palette.medium_spring_green,
        "debugIcon.pauseForeground": palette.medium_slate_blue,
        "debugIcon.stopForeground": palette.red,
        "debugIcon.disconnectForeground": palette.dim_gray,
        "debugIcon.restartForeground": palette.teal,
        "debugIcon.stepOverForeground": palette.mauve,
        "debugIcon.stepIntoForeground": palette.magnolia,
        "debugIcon.stepOutForeground": palette.magnolia,
        "debugIcon.continueForeground": palette.medium_spring_green,
        "debugIcon.stepBackForeground": palette.dim_gray,
        "debugConsole.infoForeground": palette.medium_slate_blue,
        "debugConsole.warningForeground": palette.naples_yellow,
        "debugConsole.errorForeground": palette.red,
        "debugConsole.sourceForeground": palette.brink_pink,
        "debugConsoleInputIcon.foreground": palette.magnolia,

        "diffEditor.border": palette.dim_gray,
        "diffEditor.insertedTextBackground": opacity(
            palette.medium_spring_green,
            0.1
        ),
        "diffEditor.removedTextBackground": opacity(palette.red, 0.1),

        "editor.background": palette.jet,
        "editor.findMatchBackground": palette.dim_gray,
        "editor.findMatchBorder": opacity(accent, 0.4),
        "editor.findMatchHighlightBackground": opacity(
            palette.naples_yellow,
            0.35
        ),
        "editor.findMatchHighlightBorder": transparent,
        "editor.findRangeHighlightBackground": opacity(palette.dim_gray, 0.3),
        "editor.findRangeHighlightBorder": transparent,
        "editor.foldBackground": opacity(palette.sky, 0.25),
        "editor.foreground": palette.magnolia,
        "editor.hoverHighlightBackground": opacity(palette.sky, 0.25),
        "editor.inactiveSelectionBackground": transparent,
        "editor.lineHighlightBackground": opacity(palette.magnolia, 0.07),
        "editor.lineHighlightBorder": palette.jet,
        "editor.rangeHighlightBackground": opacity(palette.sky, 0.25),
        "editor.rangeHighlightBorder": transparent,
        "editor.selectionBackground": palette.dim_gray,
        "editor.selectionHighlightBackground": opacity(palette.overlay2, 0.4),
        "editor.selectionHighlightBorder": opacity(palette.sky, 0.2),
        "editor.wordHighlightBackground": opacity(palette.dim_gray, 0.7),
        "editor.wordHighlightStrongBackground": opacity(palette.dim_gray, 0.5),
        "editorBracketMatch.background": opacity(palette.overlay2, 0.1),
        "editorBracketMatch.border": palette.overlay2,
        "editorCodeLens.foreground": palette.overlay1,
        "editorCursor.background": palette.jet,
        "editorCursor.foreground": palette.hot_pink,
        "editorError.background": transparent,
        "editorError.border": transparent,
        "editorError.foreground": palette.red,
        "editorGroup.border": palette.dim_gray,
        "editorGroup.dropBackground": dropBackground,
        "editorGroup.emptyBackground": palette.jet,
        "editorGroupHeader.tabsBackground": palette.english_violet,
        "editorGutter.addedBackground": palette.medium_spring_green,
        "editorGutter.background": palette.jet,
        "editorGutter.commentRangeForeground": palette.overlay2,
        "editorGutter.deletedBackground": palette.red,
        "editorGutter.foldingControlForeground": palette.overlay2,
        "editorGutter.modifiedBackground": palette.sky,
        "editorHoverWidget.background": palette.mantle,
        "editorHoverWidget.border": palette.dim_gray,
        "editorHoverWidget.foreground": palette.magnolia,
        "editorIndentGuide.activeBackground": palette.dim_gray,
        "editorIndentGuide.background": palette.surface1,
        "editorInfo.background": transparent,
        "editorInfo.border": transparent,
        "editorInfo.foreground": palette.medium_slate_blue,
        "editorLineNumber.activeForeground": accent,
        "editorLineNumber.foreground": palette.overlay1,
        "editorLink.activeForeground": accent,
        "editorMarkerNavigation.background": palette.mantle,
        "editorMarkerNavigationError.background": palette.red,
        "editorMarkerNavigationInfo.background": palette.medium_slate_blue,
        "editorMarkerNavigationWarning.background": palette.maximum_yellow_red,
        "editorOverviewRuler.background": palette.mantle,
        "editorOverviewRuler.border": opacity(palette.magnolia, 0.07),
        "editorRuler.foreground": palette.dim_gray,
        "editorStickyScrollHover.background": palette.surface0,
        "editorSuggestWidget.background": palette.mantle,
        "editorSuggestWidget.border": palette.dim_gray,
        "editorSuggestWidget.foreground": palette.magnolia,
        "editorSuggestWidget.highlightForeground": accent,
        "editorSuggestWidget.selectedBackground": palette.surface0,
        "editorWarning.background": transparent,
        "editorWarning.border": transparent,
        "editorWarning.foreground": palette.naples_yellow,
        "editorWhitespace.foreground": opacity(palette.overlay2, 0.4),
        "editorWidget.background": palette.mantle,
        "editorWidget.foreground": palette.magnolia,
        "editorWidget.resizeBorder": palette.dim_gray,
        "editorLightBulb.foreground": palette.maximum_yellow_red,

        // extensions marketplace
        "extensionButton.prominentForeground": palette.english_violet,
        "extensionButton.prominentBackground": accent,
        "extensionButton.prominentHoverBackground": shade(accent, 0.2),
        "extensionBadge.remoteBackground": palette.medium_slate_blue,
        "extensionBadge.remoteForeground": palette.english_violet,
        "extensionIcon.starForeground": palette.maximum_yellow_red,
        "extensionIcon.verifiedForeground": palette.medium_spring_green,
        "extensionIcon.preReleaseForeground": palette.brink_pink,
        "extensionIcon.sponsorForeground": palette.pink,

        // git colors
        "gitDecoration.addedResourceForeground": palette.medium_spring_green,
        "gitDecoration.conflictingResourceForeground": palette.mauve,
        "gitDecoration.deletedResourceForeground": palette.red,
        "gitDecoration.ignoredResourceForeground": palette.thistle,
        "gitDecoration.modifiedResourceForeground": palette.maximum_yellow_red,
        "gitDecoration.stageDeletedResourceForeground": palette.red,
        "gitDecoration.stageModifiedResourceForeground":
            palette.maximum_yellow_red,
        "gitDecoration.submoduleResourceForeground": palette.medium_slate_blue,
        "gitDecoration.untrackedResourceForeground":
            palette.medium_spring_green,

        "input.background": palette.surface0,
        "input.border": transparent,
        "input.foreground": palette.magnolia,
        "input.placeholderForeground": opacity(palette.magnolia, 0.45),
        "inputOption.activeBackground": opacity(
            palette.medium_slate_blue,
            0.15
        ),
        "inputOption.activeBorder": opacity(palette.english_violet, 0.2),
        "inputOption.activeForeground": palette.magnolia,
        "inputValidation.errorBackground": palette.red,
        "inputValidation.errorBorder": opacity(palette.english_violet, 0.2),
        "inputValidation.errorForeground": palette.english_violet,
        "inputValidation.infoBackground": palette.medium_slate_blue,
        "inputValidation.infoBorder": opacity(palette.english_violet, 0.2),
        "inputValidation.infoForeground": palette.english_violet,
        "inputValidation.warningBackground": palette.naples_yellow,
        "inputValidation.warningBorder": opacity(palette.english_violet, 0.2),
        "inputValidation.warningForeground": palette.english_violet,

        // Lists and trees
        "list.activeSelectionBackground": palette.surface1, // currently selected in file tree
        "list.activeSelectionForeground": palette.magnolia,
        "list.dropBackground": dropBackground,
        "list.focusBackground": palette.surface0, // when using keyboard to move around files
        "list.focusForeground": palette.magnolia,
        "list.focusOutline": transparent,
        "list.highlightForeground": accent,
        "list.hoverBackground": isLight ? palette.dim_gray : palette.jet, // when hovering over the file tree
        "list.hoverForeground": palette.magnolia,
        "list.inactiveSelectionBackground": palette.surface1, // currently selected focused in editor
        "list.inactiveSelectionForeground": palette.magnolia,
        "list.warningForeground": palette.maximum_yellow_red,
        "listFilterWidget.background": palette.surface1,
        "listFilterWidget.noMatchesOutline": palette.red,
        "listFilterWidget.outline": transparent,
        "tree.indentGuidesStroke": palette.thistle,

        "menu.background": palette.jet,
        "menu.border": opacity(palette.jet, 0.5),
        "menu.foreground": palette.magnolia,
        "menu.selectionBackground": palette.dim_gray,
        "menu.selectionBorder": transparent,
        "menu.selectionForeground": palette.magnolia,
        "menu.separatorBackground": palette.dim_gray,
        "menubar.selectionBackground": palette.surface1,
        "menubar.selectionForeground": palette.magnolia,

        "merge.commonContentBackground": palette.surface1,
        "merge.commonHeaderBackground": palette.dim_gray,
        "merge.currentContentBackground": opacity(
            palette.medium_spring_green,
            0.2
        ),
        "merge.currentHeaderBackground": opacity(
            palette.medium_spring_green,
            0.4
        ),
        "merge.incomingContentBackground": opacity(
            palette.medium_slate_blue,
            0.2
        ),
        "merge.incomingHeaderBackground": opacity(
            palette.medium_slate_blue,
            0.4
        ),

        "minimap.background": opacity(palette.mantle, 0.5),
        "minimap.errorHighlight": palette.red,
        "minimap.findMatchHighlight": palette.dim_gray,
        "minimap.selectionHighlight": palette.dim_gray,
        "minimap.warningHighlight": palette.maximum_yellow_red,
        "minimapGutter.addedBackground": palette.medium_spring_green,
        "minimapGutter.deletedBackground": palette.red,
        "minimapGutter.modifiedBackground": palette.sky,

        "notificationCenter.border": accent,
        "notificationCenterHeader.foreground": palette.magnolia,
        "notificationCenterHeader.background": palette.mantle,
        "notificationToast.border": accent,
        "notifications.foreground": palette.magnolia,
        "notifications.background": palette.mantle,
        "notifications.border": accent,
        "notificationLink.foreground": palette.medium_slate_blue,
        "notificationsErrorIcon.foreground": palette.red,
        "notificationsWarningIcon.foreground": palette.naples_yellow,
        "notificationsInfoIcon.foreground": palette.medium_slate_blue,

        "panel.background": palette.jet,
        "panel.border": palette.dim_gray,
        "panelSection.border": palette.dim_gray,
        "panelSection.dropBackground": dropBackground,
        "panelTitle.activeBorder": palette.magnolia,
        "panelTitle.activeForeground": palette.magnolia,
        "panelTitle.inactiveForeground": palette.subtext0,

        "peekView.border": accent,
        "peekViewEditor.background": palette.mantle,
        "peekViewEditor.matchHighlightBackground": opacity(
            palette.naples_yellow,
            0.25
        ),
        "peekViewEditor.matchHighlightBorder": palette.naples_yellow,
        "peekViewEditorGutter.background": palette.mantle,
        "peekViewResult.background": palette.mantle,
        "peekViewResult.fileForeground": palette.magnolia,
        "peekViewResult.lineForeground": palette.magnolia,
        "peekViewResult.matchHighlightBackground": opacity(
            palette.naples_yellow,
            0.25
        ),
        "peekViewResult.selectionBackground": palette.surface0,
        "peekViewResult.selectionForeground": palette.magnolia,
        "peekViewTitle.background": palette.jet,
        "peekViewTitleDescription.foreground": opacity(palette.subtext1, 0.7),
        "peekViewTitleLabel.foreground": palette.magnolia,

        "pickerGroup.border": accent,
        "pickerGroup.foreground": accent,

        "progressBar.background": accent,

        "scrollbar.shadow": palette.english_violet,
        "scrollbarSlider.activeBackground": opacity(palette.surface0, 0.4),
        "scrollbarSlider.background": opacity(palette.dim_gray, 0.5),
        "scrollbarSlider.hoverBackground": palette.thistle,

        "settings.focusedRowBackground": opacity(palette.dim_gray, 0.2),
        "settings.headerForeground": palette.magnolia,
        "settings.modifiedItemIndicator": accent,
        "settings.dropdownBackground": palette.surface1,
        "settings.dropdownListBorder": transparent,
        "settings.textInputBackground": palette.surface1,
        "settings.textInputBorder": transparent,
        "settings.numberInputBackground": palette.surface1,
        "settings.numberInputBorder": transparent,

        "sideBar.background": palette.mantle,
        "sideBar.dropBackground": dropBackground,
        "sideBar.foreground": palette.magnolia,
        "sideBarSectionHeader.background": palette.mantle,
        "sideBarSectionHeader.foreground": palette.magnolia,
        "sideBarTitle.foreground": accent,
        "sideBarTitle.background": palette.english_violet,

        // Status Bar
        "statusBar.background": palette.english_violet,
        "statusBar.foreground": palette.magnolia,
        // having no folder open shouldn't change the bar
        "statusBar.noFolderBackground": palette.english_violet,
        "statusBar.noFolderForeground": palette.magnolia,
        // debugging is naples_yellow
        "statusBar.debuggingBackground": palette.naples_yellow,
        "statusBar.debuggingForeground": palette.english_violet,
        // remote is medium_slate_blue
        "statusBarItem.remoteBackground": palette.medium_slate_blue,
        "statusBarItem.remoteForeground": palette.english_violet,
        // different states
        "statusBarItem.activeBackground": opacity(palette.dim_gray, 0.4),
        "statusBarItem.hoverBackground": opacity(palette.dim_gray, 0.2),
        "statusBarItem.prominentForeground": accent,
        "statusBarItem.prominentBackground": transparent,
        "statusBarItem.prominentHoverBackground": opacity(
            palette.dim_gray,
            0.2
        ),
        "statusBarItem.errorForeground": palette.red,
        "statusBarItem.errorBackground": transparent,
        "statusBarItem.warningForeground": palette.naples_yellow,
        "statusBarItem.warningBackground": transparent,

        // command center
        "commandCenter.foreground": palette.subtext1,
        "commandCenter.activeForeground": accent,
        "commandCenter.background": palette.english_violet,
        "commandCenter.activeBackground": opacity(palette.dim_gray, 0.2),
        "commandCenter.border": accent,

        // Tab Bar
        "tab.activeBackground": palette.jet,
        "tab.activeBorder": accent,
        "tab.activeBorderTop": transparent,
        "tab.activeForeground": accent,
        "tab.border": palette.mantle,
        "tab.inactiveBackground": palette.mantle,
        "tab.inactiveForeground": palette.thistle,

        // Terminal
        "terminal.ansiBlack": palette.thistle,
        "terminal.ansiBlue": palette.medium_slate_blue,
        "terminal.ansiBrightBlack": palette.overlay1,
        "terminal.ansiBrightBlue": palette.medium_slate_blue,
        "terminal.ansiBrightCyan": palette.sky,
        "terminal.ansiBrightGreen": palette.medium_spring_green,
        "terminal.ansiBrightMagenta": palette.pink,
        "terminal.ansiBrightRed": palette.red,
        "terminal.ansiBrightWhite": palette.magnolia,
        "terminal.ansiBrightYellow": palette.maximum_yellow_red,
        "terminal.ansiCyan": palette.sky,
        "terminal.ansiGreen": palette.medium_spring_green,
        "terminal.ansiMagenta": palette.pink,
        "terminal.ansiRed": palette.red,
        "terminal.ansiWhite": palette.overlay2,
        "terminal.ansiYellow": palette.maximum_yellow_red,
        "terminal.border": palette.dim_gray,
        "terminal.foreground": palette.magnolia,
        "terminal.dropBackground": dropBackground,
        "terminal.selectionBackground": palette.dim_gray,
        "terminalCursor.background": palette.jet,
        "terminalCursor.foreground": palette.hot_pink,

        // title bar
        "titleBar.activeBackground": palette.english_violet,
        "titleBar.activeForeground": palette.magnolia,
        "titleBar.inactiveBackground": palette.english_violet,
        "titleBar.inactiveForeground": opacity(palette.magnolia, 0.5),
        "titleBar.border": transparent,

        // welcome page
        "welcomePage.tileBackground": palette.mantle,
        "welcomePage.progress.background": palette.english_violet,
        "welcomePage.progress.foreground": accent,
        "walkThrough.embeddedEditorBackground": opacity(palette.jet, 0.3),

        // symbols in outline, autocomplete, etc.
        "symbolIcon.textForeground": palette.magnolia,
        "symbolIcon.arrayForeground": palette.naples_yellow,
        "symbolIcon.booleanForeground": palette.mauve,
        "symbolIcon.classForeground": palette.maximum_yellow_red,
        "symbolIcon.colorForeground": palette.pink,
        "symbolIcon.constantForeground": palette.naples_yellow,
        "symbolIcon.constructorForeground": palette.pink,
        "symbolIcon.enumeratorForeground": palette.maximum_yellow_red,
        "symbolIcon.enumeratorMemberForeground": palette.maximum_yellow_red,
        "symbolIcon.eventForeground": palette.pink,
        "symbolIcon.fieldForeground": palette.magnolia,
        "symbolIcon.fileForeground": accent,
        "symbolIcon.folderForeground": accent,
        "symbolIcon.functionForeground": palette.medium_slate_blue,
        "symbolIcon.interfaceForeground": palette.maximum_yellow_red,
        "symbolIcon.keyForeground": palette.teal,
        "symbolIcon.keywordForeground": palette.mauve,
        "symbolIcon.methodForeground": palette.medium_slate_blue,
        "symbolIcon.moduleForeground": palette.magnolia,
        "symbolIcon.namespaceForeground": palette.maximum_yellow_red,
        "symbolIcon.nullForeground": palette.bittersweet,
        "symbolIcon.numberForeground": palette.naples_yellow,
        "symbolIcon.objectForeground": palette.maximum_yellow_red,
        "symbolIcon.operatorForeground": palette.teal,
        "symbolIcon.packageForeground": palette.flamingo,
        "symbolIcon.propertyForeground": palette.bittersweet,
        "symbolIcon.referenceForeground": palette.maximum_yellow_red,
        "symbolIcon.snippetForeground": palette.flamingo,
        "symbolIcon.stringForeground": palette.medium_spring_green,
        "symbolIcon.structForeground": palette.teal,
        "symbolIcon.typeParameterForeground": palette.bittersweet,
        "symbolIcon.unitForeground": palette.magnolia,
        "symbolIcon.variableForeground": palette.magnolia,

        // chart colors
        "charts.foreground": palette.magnolia,
        "charts.lines": palette.subtext1,
        "charts.red": palette.red,
        "charts.medium_slate_blue": palette.medium_slate_blue,
        "charts.maximum_yellow_red": palette.maximum_yellow_red,
        "charts.orange": palette.naples_yellow,
        "charts.medium_spring_green": palette.medium_spring_green,
        "charts.purple": palette.mauve,

        ...extensions(context),

        // workbench overrides
        ...getCustomizedColors(context),
        // custom named overrides
        ...customNamedColors,
    };
};
