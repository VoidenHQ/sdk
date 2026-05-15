/**
 * @module theme
 *
 * Voiden theme class tokens.
 *
 * Every token is a Tailwind utility class that resolves to a CSS custom
 * property defined by the active Voiden theme.  Plugin authors use these
 * instead of hard-coding colour values or class names so their UI
 * automatically follows light/dark mode and user-installed themes.
 *
 * Tokens are available at runtime via `context.theme` inside `PluginContext`.
 * They can also be imported directly for use outside a plugin context:
 *
 * ```tsx
 * import { THEME_CLASSES } from '@voiden/sdk'
 * // or
 * import { THEME_CLASSES } from '@voiden/sdk/ui'
 * ```
 *
 * ## Quick-start example
 *
 * ```tsx
 * // Inside a React component registered with context.addTab / context.registerPanel
 * export function MyPanel({ theme }: { theme: ThemeClasses }) {
 *   return (
 *     <div className={`${theme.bg.surface} ${theme.text.primary} p-4`}>
 *       <h2 className={`${theme.text.ui} font-medium mb-2`}>My Plugin</h2>
 *
 *       <button className={`${theme.button.primary} px-3 py-1 rounded`}>
 *         Send request
 *       </button>
 *
 *       <span className={`${theme.http.get} ${theme.http.getBg} px-2 py-0.5 rounded text-xs`}>
 *         GET
 *       </span>
 *
 *       <p className={theme.status.successText}>200 OK</p>
 *     </div>
 *   )
 * }
 * ```
 *
 * ## How the token system works
 *
 * Each token is a Tailwind class (e.g. `bg-panel`) that the Tailwind config
 * maps to a CSS custom property (e.g. `var(--ui-panel-bg)`).  The CSS custom
 * property is in turn aliased to one of the ~15 root theme primitives
 * (`--bg-primary`, `--fg-primary`, `--accent`, `--success`, …) that theme
 * authors override.  This three-layer design means:
 *
 *   Tailwind class → CSS alias variable → Theme primitive
 *
 * You never need to touch the lower layers — just use the tokens here and
 * your plugin will look correct in every theme.
 */

// ─── Interface ────────────────────────────────────────────────────────────────

/**
 * Structured map of Tailwind class-name tokens for the Voiden theme system.
 *
 * Every property holds a ready-to-use `className` string.  Add it directly
 * to JSX `className` props — optionally combined with spacing/layout utilities:
 *
 * ```tsx
 * <div className={`${theme.bg.panel} ${theme.border.DEFAULT} border rounded-lg p-3`}>
 * ```
 */
export interface ThemeClasses {
  // ─── Backgrounds ────────────────────────────────────────────────────────────

  /**
   * Background colour classes.
   *
   * Layer hierarchy (darkest → lightest in dark themes):
   * `panel` < `primary` < `surface` < `overlay`
   */
  bg: {
    /**
     * Root application background.
     *
     * CSS variable : `--ui-bg`  (alias of `--bg-primary`)
     * Default      : `#1f2430`
     *
     * Use for the outermost background of full-page plugin views, modals that
     * fill the viewport, or any container that should match the editor window
     * background.  Avoid for nested panels — prefer `surface` or `panel`.
     */
    primary: string

    /**
     * Editor / document canvas background.
     *
     * CSS variable : `--editor-bg`  (alias of `--bg-primary`)
     * Default      : `#1f2430`
     *
     * Use when rendering content that should feel like it lives inside the
     * `.void` editor area rather than the app chrome.
     */
    editor: string

    /**
     * Elevated card or element surface.
     *
     * CSS variable : `--ui-surface`  (alias of `--bg-surface`, computed mix
     *                of `--bg-primary` 60% and `--bg-secondary`)
     * Default      : colour-mix between primary and secondary backgrounds
     *
     * Use for cards, list items, table rows, and any container that should
     * visually "float" above the primary background.
     */
    surface: string

    /**
     * Panel / sidebar background.
     *
     * CSS variable : `--ui-panel-bg`  (alias of `--bg-secondary`)
     * Default      : `#1c212b`
     *
     * Use for sidebar panels, bottom drawers, and header bars — anything that
     * forms the structural chrome of the app.
     */
    panel: string

    /**
     * Overlay / floating element background.
     *
     * CSS variable : `--ui-overlay-bg`
     * Default      : `rgba(0, 0, 0, 0.4)`
     *
     * Use for modal backdrops, scrim layers, and semi-transparent overlays
     * that sit above the main content.
     */
    overlay: string

    /**
     * Active / selected item highlight.
     *
     * CSS variable : `--ui-selection-normal`  (alias of `--selection`)
     * Default      : `#409fff40`  (blue at ~25% opacity)
     *
     * Use for the currently selected row, focused tab, or any element in an
     * "active" state.  Also used for text selection in the editor.
     */
    active: string

    /**
     * Hover state tint.
     *
     * CSS variable : `--ui-hover`  (alias of `--hover`)
     * Default      : `#ffffff14`  (white at ~8% opacity)
     *
     * Use as a hover background on interactive elements like list rows,
     * buttons, and menu items.  Layer it on top of the element's base
     * background rather than replacing it.
     */
    hover: string

    /**
     * Primary accent background (golden / yellow family in the default theme).
     *
     * CSS variable : `--accent`  (via Tailwind `rgb(var(--common-accent))`)
     * Default      : `#ffcc66`
     *
     * Use sparingly for call-to-action highlights, active indicator dots, or
     * brand-coloured decorative elements.
     */
    accent: string

    /**
     * Alternate accent background (blue family in the default theme).
     *
     * CSS variable : `--accent-alt`  (via Tailwind `rgb(var(--common-alt))`)
     * Default      : `#3fa3d9`
     *
     * Use for secondary accent elements when the primary accent is already in
     * use — e.g. a secondary badge colour or a "info" action button.
     */
    alt: string
  }

  // ─── Text ───────────────────────────────────────────────────────────────────

  /**
   * Text / foreground colour classes.
   */
  text: {
    /**
     * Primary readable text.
     *
     * CSS variable : `--editor-fg`  (alias of `--fg-primary`)
     * Default      : `#a9b7c6`
     *
     * Use for body copy, input values, code, and any text that should be
     * fully legible at all times.
     */
    primary: string

    /**
     * Muted / secondary text.
     *
     * CSS variable : `--syntax-comment`
     * Default      : `#8a9199`
     *
     * Use for descriptions, timestamps, placeholder labels, and any text that
     * should recede visually behind primary content.
     */
    muted: string

    /**
     * Editor canvas foreground — same as `primary` but semantically scoped
     * to content rendered inside the document editor area.
     *
     * CSS variable : `--editor-fg`  (alias of `--fg-primary`)
     * Default      : `#a9b7c6`
     */
    editor: string

    /**
     * UI chrome foreground — labels, tab titles, sidebar item text.
     *
     * CSS variable : `--ui-fg`  (alias of `--fg-primary`)
     * Default      : `#a9b7c6`
     *
     * Semantically identical to `primary` but signals that the text belongs
     * to the structural UI rather than document content.
     */
    ui: string

    /**
     * De-emphasised gutter / line-number text.
     *
     * CSS variable : `--editor-gutter-normal`  (alias of `--fg-secondary`)
     * Default      : `#707a8c`
     *
     * Use for line numbers, secondary counts, and any text that should be
     * quieter than `muted`.
     */
    light: string

    /**
     * Accent-coloured text (golden family).
     *
     * CSS variable : `--accent`  (via Tailwind `rgb(var(--common-accent))`)
     * Default      : `#ffcc66`
     *
     * Use for highlighted labels, active indicators in text form, or any
     * text that should carry the primary accent colour.
     */
    accent: string

    /**
     * Alternate accent-coloured text (blue family).
     *
     * CSS variable : `--accent-alt`  (via Tailwind `rgb(var(--common-alt))`)
     * Default      : `#3fa3d9`
     *
     * Use as a secondary accent on text when `accent` is already in use.
     */
    alt: string
  }

  // ─── Borders ────────────────────────────────────────────────────────────────

  /**
   * Border colour classes.
   *
   * All four tokens resolve to variants of the same base border colour;
   * pick based on how prominent the border should be.
   */
  border: {
    /**
     * Standard divider / container border.
     *
     * CSS variable : `--ui-line`  (alias of `--border`)
     * Default      : `#171b24`
     *
     * Use for panel borders, card outlines, table edges, and any border that
     * defines a structural boundary.
     */
    DEFAULT: string

    /**
     * Light variant — slightly less prominent than the default border.
     *
     * CSS variable : `--editor-gutter-normal`  (alias of `--fg-secondary`)
     * Default      : `#707a8c`
     *
     * Use for inner dividers within a container where the outer border is
     * already `DEFAULT`.
     */
    light: string

    /**
     * Subtle variant — very faint, almost invisible border.
     *
     * CSS variable : `--ui-border-subtle`  (alias of `--border`)
     * Default      : `#171b24`
     *
     * Use for zebra-striping, hover-state outlines, and other borders that
     * should barely register unless the user looks for them.
     */
    subtle: string

    /**
     * Subtle-light variant — the faintest available border.
     *
     * CSS variable : `--ui-border-subtle-light`  (alias of `--border`)
     * Default      : `#171b24`
     *
     * Use for the innermost nested dividers or decorative separators.
     */
    subtleLight: string

    /**
     * Semantic alias for `DEFAULT` — communicates intent as a horizontal rule
     * or section divider rather than a container edge.
     *
     * CSS variable : `--ui-line`  (alias of `--border`)
     * Default      : `#171b24`
     */
    line: string
  }

  // ─── Interactive ────────────────────────────────────────────────────────────

  /**
   * Convenience aliases for the two most common interactive state backgrounds.
   * These mirror `bg.active` and `bg.hover` exactly — choose whichever reads
   * more clearly at the call site.
   */
  interactive: {
    /**
     * Active / selected element background.
     * Alias of `bg.active`.
     *
     * CSS variable : `--ui-selection-normal`
     * Default      : `#409fff40`
     */
    active: string

    /**
     * Hover-state background.
     * Alias of `bg.hover`.
     *
     * CSS variable : `--ui-hover`
     * Default      : `#ffffff14`
     */
    hover: string
  }

  // ─── Buttons ────────────────────────────────────────────────────────────────

  /**
   * Button colour classes.
   *
   * Apply the background class to the button element and pair with an
   * appropriate `text.*` token for the label.
   */
  button: {
    /**
     * Primary CTA button background.
     *
     * CSS variable : `--button-primary-bg`  (alias of `--accent-alt`)
     * Default      : `#3fa3d9`
     *
     * Use for the single most important action on a surface — "Send", "Save",
     * "Run".  Use sparingly; only one primary button per view.
     */
    primary: string

    /**
     * Primary button hover / focus background.
     *
     * CSS variable : `--button-primary-hover`  (alias of `--accent-alt`, slightly darker)
     * Default      : `#2e8fcc`
     *
     * Apply via CSS `:hover` or a Tailwind `hover:` prefix alongside `primary`.
     */
    primaryHover: string

    /**
     * Secondary / ghost button background.
     *
     * CSS variable : `--button-secondary-bg`  (alias of `--bg-secondary`)
     * Default      : `#1c212b`
     *
     * Use for supporting actions — "Cancel", "Copy", "Reset".  Lower visual
     * weight than the primary button.
     */
    secondary: string

    /**
     * Secondary button foreground text colour.
     *
     * CSS variable : `--button-secondary-fg`  (alias of `--fg-primary`)
     * Default      : `#a9b7c6`
     *
     * Pair with `secondary` as the text colour inside a secondary button.
     */
    secondaryFg: string

    /**
     * Destructive / danger action button background.
     *
     * CSS variable : `--button-danger-bg`  (alias of `--error`)
     * Default      : `#f27983`
     *
     * Use for irreversible destructive actions — "Delete", "Remove", "Clear
     * all".  Always prefer a confirmation step before firing the action.
     */
    danger: string

    /**
     * Danger button hover background.
     *
     * CSS variable : `--button-danger-hover`  (alias of `--error`, slightly darker)
     * Default      : `#d95965`
     */
    dangerHover: string
  }

  // ─── Status ─────────────────────────────────────────────────────────────────

  /**
   * Semantic status colour classes for feedback states.
   *
   * Each status has a `*Bg` variant (subtle tinted background) and a
   * `*Text` variant (saturated foreground).  Typically combine both:
   *
   * ```tsx
   * <span className={`${theme.status.successBg} ${theme.status.successText} px-2 py-0.5 rounded`}>
   *   Passed
   * </span>
   * ```
   */
  status: {
    /**
     * Success tinted background.
     *
     * CSS variable : `--status-success`  (alias of `--success`)
     * Default      : `#87d96c`
     *
     * Pair with `successText`.  Use for test-pass chips, 2xx status badges,
     * and "connected" indicators.
     */
    successBg: string

    /**
     * Success foreground text.
     *
     * CSS variable : `--status-success`  (alias of `--success`)
     * Default      : `#87d96c`
     */
    successText: string

    /**
     * Error tinted background.
     *
     * CSS variable : `--status-error`  (alias of `--error`)
     * Default      : `#f27983`
     *
     * Pair with `errorText`.  Use for test-fail chips, 4xx/5xx badges, and
     * error messages.
     */
    errorBg: string

    /**
     * Error foreground text.
     *
     * CSS variable : `--status-error`  (alias of `--error`)
     * Default      : `#f27983`
     */
    errorText: string

    /**
     * Warning tinted background.
     *
     * CSS variable : `--status-warning`  (alias of `--warning`)
     * Default      : `#ffd173`
     *
     * Pair with `warningText`.  Use for deprecation notices, slow-response
     * indicators, and non-critical alerts.
     */
    warningBg: string

    /**
     * Warning foreground text.
     *
     * CSS variable : `--status-warning`  (alias of `--warning`)
     * Default      : `#ffd173`
     */
    warningText: string

    /**
     * Info tinted background.
     *
     * CSS variable : `--status-info`  (alias of `--info`)
     * Default      : `#73d0ff`
     *
     * Pair with `infoText`.  Use for neutral informational callouts and
     * status messages that are neither success nor warning.
     */
    infoBg: string

    /**
     * Info foreground text.
     *
     * CSS variable : `--status-info`  (alias of `--info`)
     * Default      : `#73d0ff`
     */
    infoText: string
  }

  // ─── HTTP methods ────────────────────────────────────────────────────────────

  /**
   * HTTP method colour classes.
   *
   * The default theme uses semantic colours that mirror common REST client
   * conventions: GET=green, POST=blue, PUT/PATCH=amber, DELETE=red.
   *
   * Each method has a saturated text (`get`, `post`, …) and a tinted
   * badge-background variant (`getBg`, `postBg`, …) at ~15% opacity.
   * Pair them for method pills:
   *
   * ```tsx
   * <span className={`${theme.http.get} ${theme.http.getBg} px-2 py-0.5 rounded text-xs font-mono`}>
   *   GET
   * </span>
   * ```
   */
  http: {
    /**
     * GET method text colour.
     *
     * CSS variable : `--http-get`  (alias of `--success`)
     * Default      : `#87d96c`  (green)
     */
    get: string

    /**
     * POST method text colour.
     *
     * CSS variable : `--http-post`  (alias of `--info`)
     * Default      : `#73d0ff`  (blue)
     */
    post: string

    /**
     * PUT method text colour.
     *
     * CSS variable : `--http-put`  (alias of `--warning`)
     * Default      : `#ffd173`  (amber)
     */
    put: string

    /**
     * PATCH method text colour.
     *
     * CSS variable : `--http-patch`  (alias of `--warning`)
     * Default      : `#ffd173`  (amber)
     */
    patch: string

    /**
     * DELETE method text colour.
     *
     * CSS variable : `--http-delete`  (alias of `--error`)
     * Default      : `#f27983`  (red)
     */
    delete: string

    /**
     * HEAD method text colour.
     *
     * CSS variable : `--http-head`  (alias of `--status-info`)
     * Default      : `#73d0ff`  (blue)
     */
    head: string

    /**
     * OPTIONS method text colour.
     *
     * CSS variable : `--http-options`  (alias of `--syntax-comment`)
     * Default      : `#8a9199`  (grey)
     */
    options: string

    /**
     * GET badge background  — `--http-get` at 15% opacity.
     *
     * CSS variable : `--http-get-bg`
     * Default      : `color-mix(in srgb, #87d96c 15%, transparent)`
     */
    getBg: string

    /**
     * POST badge background — `--http-post` at 15% opacity.
     *
     * CSS variable : `--http-post-bg`
     * Default      : `color-mix(in srgb, #73d0ff 15%, transparent)`
     */
    postBg: string

    /**
     * PUT badge background — `--http-put` at 15% opacity.
     *
     * CSS variable : `--http-put-bg`
     * Default      : `color-mix(in srgb, #ffd173 15%, transparent)`
     */
    putBg: string

    /**
     * PATCH badge background — `--http-patch` at 15% opacity.
     *
     * CSS variable : `--http-patch-bg`
     * Default      : `color-mix(in srgb, #ffd173 15%, transparent)`
     */
    patchBg: string

    /**
     * DELETE badge background — `--http-delete` at 15% opacity.
     *
     * CSS variable : `--http-delete-bg`
     * Default      : `color-mix(in srgb, #f27983 15%, transparent)`
     */
    deleteBg: string

    /**
     * HEAD badge background — `--http-head` at 15% opacity.
     *
     * CSS variable : `--http-head-bg`
     * Default      : `color-mix(in srgb, #73d0ff 15%, transparent)`
     */
    headBg: string

    /**
     * OPTIONS badge background — `--http-options` at 15% opacity.
     *
     * CSS variable : `--http-options-bg`
     * Default      : `color-mix(in srgb, #8a9199 15%, transparent)`
     */
    optionsBg: string
  }

  // ─── Icons ──────────────────────────────────────────────────────────────────

  /**
   * Icon fill / stroke colour classes.
   *
   * Apply to a wrapper `<span>` or directly to an SVG icon component:
   *
   * ```tsx
   * <CheckCircle className={theme.icon.success} size={16} />
   * ```
   */
  icon: {
    /**
     * Primary icon colour — used for interactive and highlighted icons.
     *
     * CSS variable : `--icon-primary`  (alias of `--accent`)
     * Default      : `#ffcc66`  (golden)
     *
     * Use for icons that draw attention — active tab indicators, CTA button
     * icons, and featured feature icons.
     */
    primary: string

    /**
     * Secondary / muted icon colour — used for supporting UI icons.
     *
     * CSS variable : `--icon-secondary`  (alias of `--fg-secondary`)
     * Default      : `#707a8c`
     *
     * Use for toolbar icons, collapse chevrons, and other structural icons
     * that should not compete with content.
     */
    secondary: string

    /**
     * Success-state icon colour.
     *
     * CSS variable : `--icon-success`  (alias of `--success`)
     * Default      : `#87d96c`
     *
     * Use on checkmarks, pass indicators, and "connected" state icons.
     */
    success: string

    /**
     * Error-state icon colour.
     *
     * CSS variable : `--icon-error`  (alias of `--error`)
     * Default      : `#f27983`
     *
     * Use on error alerts, fail indicators, and "disconnected" state icons.
     */
    error: string

    /**
     * Warning-state icon colour.
     *
     * CSS variable : `--icon-warning`  (alias of `--warning`)
     * Default      : `#ffd173`
     *
     * Use on advisory icons, deprecation markers, and slow-response warnings.
     */
    warning: string

    /**
     * Info-state icon colour.
     *
     * CSS variable : `--icon-info`  (alias of `--info`)
     * Default      : `#73d0ff`
     *
     * Use on informational tooltips and neutral status icons.
     */
    info: string
  }

  // ─── Code ───────────────────────────────────────────────────────────────────

  /**
   * Code editor colour classes — for custom code display components.
   *
   * Use these when rendering syntax-highlighted content outside of the
   * built-in CodeMirror editor so colours remain consistent.
   */
  code: {
    /**
     * Code block / pre background.
     *
     * CSS variable : `--code-bg`  (alias of `--bg-primary`)
     * Default      : `#1f2430`
     */
    bg: string

    /**
     * Code foreground / default token colour.
     *
     * CSS variable : `--code-fg`  (alias of `--fg-primary`)
     * Default      : `#a9b7c6`
     */
    fg: string

    /**
     * Text selection highlight inside code blocks.
     *
     * CSS variable : `--code-selection`  (alias of `--selection`)
     * Default      : `#409fff40`
     */
    selection: string

    /**
     * Active / focused line highlight.
     *
     * CSS variable : `--code-line-highlight`  (alias of `--bg-secondary`)
     * Default      : `#1c212b`
     */
    line: string

    /**
     * Line-number gutter foreground.
     *
     * CSS variable : `--code-gutter`  (alias of `--fg-secondary`)
     * Default      : `#707a8c`
     */
    gutter: string
  }

  // ─── Menus ──────────────────────────────────────────────────────────────────

  /**
   * Dropdown / context menu colour classes.
   */
  menu: {
    /**
     * Menu container background.
     *
     * CSS variable : `--menu-bg`  (alias of `--bg-secondary`)
     * Default      : `#1c212b`
     *
     * Use as the background for dropdown menus, right-click context menus,
     * and command palettes.
     */
    bg: string

    /**
     * Menu item hover background.
     *
     * CSS variable : `--menu-hover-bg`  (alias of `--accent`)
     * Default      : `#ffcc66`  (golden, rendered at low opacity in practice)
     *
     * Apply on `:hover` of individual menu items.
     */
    hover: string

    /**
     * Menu separator line colour.
     *
     * CSS variable : `--menu-separator`  (alias of `--border`)
     * Default      : `#171b24`
     *
     * Use for `<hr>` dividers between groups of menu items.
     */
    separator: string
  }

  // ─── Tests ──────────────────────────────────────────────────────────────────

  /**
   * Assertion / test result colour classes — mirrors the app's test results tab.
   */
  test: {
    /**
     * Passing assertion badge background.
     *
     * CSS variable : `--test-passed-bg`  (alias of `--success-bg`)
     * Default      : `rgba(135, 217, 108, 0.2)`  (green at 20% opacity)
     */
    passedBg: string

    /**
     * Passing assertion foreground text / icon.
     *
     * CSS variable : `--test-passed-fg`  (alias of `--success`)
     * Default      : `#87d96c`
     */
    passedText: string

    /**
     * Failing assertion badge background.
     *
     * CSS variable : `--test-failed-bg`  (alias of `--error-bg`)
     * Default      : `rgba(242, 121, 131, 0.2)`  (red at 20% opacity)
     */
    failedBg: string

    /**
     * Failing assertion foreground text / icon.
     *
     * CSS variable : `--test-failed-fg`  (alias of `--error`)
     * Default      : `#f27983`
     */
    failedText: string
  }

  // ─── Badges ─────────────────────────────────────────────────────────────────

  /**
   * Extension-type badge colour classes.
   *
   * Used on plugin / extension cards to communicate provenance:
   * - **core** — bundled with Voiden (accent / golden)
   * - **official** — published by Voiden HQ (info / blue)
   * - **community** — third-party author (warning / amber)
   *
   * Typical usage:
   * ```tsx
   * <span className={`${theme.badge.coreBg} ${theme.badge.coreFg} ${theme.badge.coreBorder} border rounded px-1.5 py-0.5 text-xs`}>
   *   Core
   * </span>
   * ```
   */
  badge: {
    /**
     * Core badge background.
     *
     * CSS variable : `--badge-core-bg`
     * Default      : `rgba(255, 204, 102, 0.10)`  (accent at 10%)
     */
    coreBg: string

    /**
     * Core badge border.
     *
     * CSS variable : `--badge-core-border`
     * Default      : `rgba(255, 204, 102, 0.30)`  (accent at 30%)
     */
    coreBorder: string

    /**
     * Core badge foreground text.
     *
     * CSS variable : `--badge-core-fg`  (alias of `--accent`)
     * Default      : `#ffcc66`
     */
    coreFg: string

    /**
     * Official badge background.
     *
     * CSS variable : `--badge-official-bg`
     * Default      : `rgba(115, 208, 255, 0.10)`  (info at 10%)
     */
    officialBg: string

    /**
     * Official badge border.
     *
     * CSS variable : `--badge-official-border`
     * Default      : `rgba(115, 208, 255, 0.30)`  (info at 30%)
     */
    officialBorder: string

    /**
     * Official badge foreground text.
     *
     * CSS variable : `--badge-official-fg`  (alias of `--info`)
     * Default      : `#73d0ff`
     */
    officialFg: string

    /**
     * Community badge background.
     *
     * CSS variable : `--badge-community-bg`
     * Default      : `rgba(255, 209, 115, 0.10)`  (warning at 10%)
     */
    communityBg: string

    /**
     * Community badge border.
     *
     * CSS variable : `--badge-community-border`
     * Default      : `rgba(255, 209, 115, 0.30)`  (warning at 30%)
     */
    communityBorder: string

    /**
     * Community badge foreground text.
     *
     * CSS variable : `--badge-community-fg`  (alias of `--warning`)
     * Default      : `#ffd173`
     */
    communityFg: string
  }
}

// ─── Constant ─────────────────────────────────────────────────────────────────

/**
 * Concrete token map — every value is a literal Tailwind class string.
 *
 * `as const satisfies ThemeClasses` means:
 *  - TypeScript narrows each value to its exact string literal type, giving
 *    full autocomplete when destructuring or indexing.
 *  - The shape is still validated against `ThemeClasses` so structural changes
 *    produce a compile error here rather than at the call site.
 *
 * Provided on `context.theme` in `PluginContext` at runtime.
 * Can also be imported directly: `import { THEME_CLASSES } from '@voiden/sdk'`
 */
export const THEME_CLASSES = {
  // ─── Backgrounds ────────────────────────────────────────────────────────────
  bg: {
    primary:  'bg-bg',       // --ui-bg       → --bg-primary   (#1f2430)
    editor:   'bg-editor',   // --editor-bg   → --bg-primary   (#1f2430)
    surface:  'bg-surface',  // --ui-surface  → mix(primary+secondary)
    panel:    'bg-panel',    // --ui-panel-bg → --bg-secondary (#1c212b)
    overlay:  'bg-overlay',  // --ui-overlay-bg                (rgba 0,0,0 0.4)
    active:   'bg-active',   // --ui-selection-normal → --selection (#409fff40)
    hover:    'bg-hover',    // --ui-hover    → --hover        (#ffffff14)
    accent:   'bg-accent',   // rgb(--common-accent)           (#ffcc66)
    alt:      'bg-alt',      // rgb(--common-alt)              (#3fa3d9)
  },

  // ─── Text ───────────────────────────────────────────────────────────────────
  text: {
    primary: 'text-text',       // --editor-fg  → --fg-primary  (#a9b7c6)
    muted:   'text-text-muted', // --syntax-comment             (#8a9199)
    editor:  'text-editor-fg',  // --editor-fg  → --fg-primary  (#a9b7c6)
    ui:      'text-ui-fg',      // --ui-fg      → --fg-primary  (#a9b7c6)
    light:   'text-light',      // --editor-gutter-normal       (#707a8c)
    accent:  'text-accent',     // rgb(--common-accent)         (#ffcc66)
    alt:     'text-alt',        // rgb(--common-alt)            (#3fa3d9)
  },

  // ─── Borders ────────────────────────────────────────────────────────────────
  border: {
    DEFAULT:     'border-border',            // --ui-line     → --border (#171b24)
    light:       'border-border-light',      // --editor-gutter-normal   (#707a8c)
    subtle:      'border-border-subtle',     // --ui-border-subtle       (#171b24)
    subtleLight: 'border-border-subtleLight',// --ui-border-subtle-light (#171b24)
    line:        'border-line',              // --ui-line     → --border (#171b24)
  },

  // ─── Interactive ────────────────────────────────────────────────────────────
  interactive: {
    active: 'bg-active', // alias of bg.active
    hover:  'bg-hover',  // alias of bg.hover
  },

  // ─── Buttons ────────────────────────────────────────────────────────────────
  button: {
    primary:      'bg-button-primary',        // --button-primary-bg   → --accent-alt (#3fa3d9)
    primaryHover: 'bg-button-primary-hover',  // --button-primary-hover               (#2e8fcc)
    secondary:    'bg-button-secondary',      // --button-secondary-bg → --bg-secondary
    secondaryFg:  'text-button-secondary-fg', // --button-secondary-fg → --fg-primary
    danger:       'bg-button-danger',         // --button-danger-bg    → --error      (#f27983)
    dangerHover:  'bg-button-danger-hover',   // --button-danger-hover                (#d95965)
  },

  // ─── Status ─────────────────────────────────────────────────────────────────
  status: {
    successBg:   'bg-status-success',   // --status-success  → --success (#87d96c)
    successText: 'text-status-success', // --status-success  → --success (#87d96c)
    errorBg:     'bg-status-error',     // --status-error    → --error   (#f27983)
    errorText:   'text-status-error',   // --status-error    → --error   (#f27983)
    warningBg:   'bg-status-warning',   // --status-warning  → --warning (#ffd173)
    warningText: 'text-status-warning', // --status-warning  → --warning (#ffd173)
    infoBg:      'bg-status-info',      // --status-info     → --info    (#73d0ff)
    infoText:    'text-status-info',    // --status-info     → --info    (#73d0ff)
  },

  // ─── HTTP methods ────────────────────────────────────────────────────────────
  http: {
    get:       'text-http-get',     // --http-get     → --success  (#87d96c green)
    post:      'text-http-post',    // --http-post    → --info     (#73d0ff blue)
    put:       'text-http-put',     // --http-put     → --warning  (#ffd173 amber)
    patch:     'text-http-patch',   // --http-patch   → --warning  (#ffd173 amber)
    delete:    'text-http-delete',  // --http-delete  → --error    (#f27983 red)
    head:      'text-http-head',    // --http-head    → --info     (#73d0ff blue)
    options:   'text-http-options', // --http-options → --syntax-comment (#8a9199 grey)
    getBg:     'bg-httpbg-get',     // color-mix(--http-get 15%, transparent)
    postBg:    'bg-httpbg-post',    // color-mix(--http-post 15%, transparent)
    putBg:     'bg-httpbg-put',     // color-mix(--http-put 15%, transparent)
    patchBg:   'bg-httpbg-patch',   // color-mix(--http-patch 15%, transparent)
    deleteBg:  'bg-httpbg-delete',  // color-mix(--http-delete 15%, transparent)
    headBg:    'bg-httpbg-head',    // color-mix(--http-head 15%, transparent)
    optionsBg: 'bg-httpbg-options', // color-mix(--http-options 15%, transparent)
  },

  // ─── Icons ──────────────────────────────────────────────────────────────────
  icon: {
    primary:   'text-icon-primary',   // --icon-primary   → --accent     (#ffcc66)
    secondary: 'text-icon-secondary', // --icon-secondary → --fg-secondary(#707a8c)
    success:   'text-icon-success',   // --icon-success   → --success    (#87d96c)
    error:     'text-icon-error',     // --icon-error     → --error      (#f27983)
    warning:   'text-icon-warning',   // --icon-warning   → --warning    (#ffd173)
    info:      'text-icon-info',      // --icon-info      → --info       (#73d0ff)
  },

  // ─── Code editor ────────────────────────────────────────────────────────────
  code: {
    bg:        'bg-code-bg',        // --code-bg         → --bg-primary  (#1f2430)
    fg:        'text-code-fg',      // --code-fg         → --fg-primary  (#a9b7c6)
    selection: 'bg-code-selection', // --code-selection  → --selection   (#409fff40)
    line:      'bg-code-line',      // --code-line-highlight → --bg-secondary
    gutter:    'bg-code-gutter',    // --code-gutter     → --fg-secondary (#707a8c)
  },

  // ─── Menus ──────────────────────────────────────────────────────────────────
  menu: {
    bg:        'bg-menu-bg',         // --menu-bg         → --bg-secondary (#1c212b)
    hover:     'bg-menu-hover',      // --menu-hover-bg   → --accent       (#ffcc66)
    separator: 'border-menu-separator', // --menu-separator → --border      (#171b24)
  },

  // ─── Tests ──────────────────────────────────────────────────────────────────
  test: {
    passedBg:   'bg-test-passed-bg',   // --test-passed-bg  → rgba(135,217,108, 0.2)
    passedText: 'text-test-passed-fg', // --test-passed-fg  → --success (#87d96c)
    failedBg:   'bg-test-failed-bg',   // --test-failed-bg  → rgba(242,121,131, 0.2)
    failedText: 'text-test-failed-fg', // --test-failed-fg  → --error   (#f27983)
  },

  // ─── Badges ─────────────────────────────────────────────────────────────────
  badge: {
    coreBg:         'bg-badge-core-bg',           // rgba(accent 10%)
    coreBorder:     'border-badge-core-border',   // rgba(accent 30%)
    coreFg:         'text-badge-core-fg',         // --accent    (#ffcc66)
    officialBg:     'bg-badge-official-bg',       // rgba(info 10%)
    officialBorder: 'border-badge-official-border',// rgba(info 30%)
    officialFg:     'text-badge-official-fg',     // --info      (#73d0ff)
    communityBg:    'bg-badge-community-bg',      // rgba(warning 10%)
    communityBorder:'border-badge-community-border',// rgba(warning 30%)
    communityFg:    'text-badge-community-fg',    // --warning   (#ffd173)
  },
} as const satisfies ThemeClasses
