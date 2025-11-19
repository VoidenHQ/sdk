/**
 * JSONC (JSON with Comments) utilities
 */

import { applyEdits, format, stripComments as stripCommentsInternal } from "jsonc-parser";

/**
 * Prettify JSONC string with proper formatting
 * @param str JSONC string to format
 * @returns Formatted JSONC string
 */
export function prettifyJSONC(str: string): string {
  const editResult = format(str, undefined, {
    insertSpaces: true,
    tabSize: 2,
  });
  return applyEdits(str, editResult);
}

/**
 * Strip comments from JSONC string
 * @param str JSONC string with comments
 * @returns JSON string without comments
 */
export function stripComments(str: string): string {
  return stripCommentsInternal(str);
}
