/**
 * Helper System for SDK
 *
 * Allows extensions to expose pure utility functions for other extensions to use.
 * Helpers must be pure functions (no side effects, network, file system, etc.)
 */

// ============================================================================
// Helper Types
// ============================================================================

/**
 * A helper function exposed by an extension
 *
 * RULES:
 * - Must be a pure function (deterministic, no side effects)
 * - Cannot access network, file system, or other privileged resources
 * - Cannot call other SDK methods
 * - Should only do data transformation/parsing
 *
 * @example Pure functions (✅ ALLOWED):
 * - parseJSON(text: string) => object
 * - formatDate(date: Date) => string
 * - validateEmail(email: string) => boolean
 * - calculateChecksum(data: string) => string
 *
 * @example Impure functions (❌ NOT ALLOWED):
 * - fetchData(url: string) - network access
 * - saveToFile(path: string, data: string) - file system
 * - showToast(message: string) - side effects
 * - getEnvironmentVar(key: string) - privileged access
 */
export type HelperFunction = (...args: any[]) => any;

/**
 * Collection of helper functions from an extension
 */
export interface HelperCollection {
  [helperName: string]: HelperFunction;
}

/**
 * Helper capability configuration
 *
 * Declares what capabilities a helper needs.
 * Platform enforces these constraints.
 */
export interface HelperCapability {
  /** Helper is a pure function (no side effects) */
  pure: true;

  /** Helper does not access network */
  noNetwork: true;

  /** Helper does not access file system */
  noFileSystem: true;

  /** Helper does not access environment variables */
  noEnvironment: true;
}

/**
 * Helper registration metadata
 */
export interface HelperMetadata {
  /** Helper function name */
  name: string;

  /** Human-readable description */
  description: string;

  /** Extension that provides this helper */
  extensionId: string;

  /** Version of the helper */
  version: string;

  /** Capabilities (enforced by platform) */
  capabilities: HelperCapability;
}

// ============================================================================
// Helper API
// ============================================================================

/**
 * Helper registration and usage API
 */
export interface HelperAPI {
  /**
   * Register helpers from your extension
   *
   * Helpers must be pure functions (data transformation only).
   * The platform validates and enforces this constraint.
   *
   * @param helpers - Object containing helper functions
   *
   * @example
   * ```ts
   * // In your extension
   * this.helpers.register({
   *   parseJSONC: (text: string) => {
   *     // Pure function: parses JSONC to JSON
   *     return text.replace(/\/\/.+$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
   *   },
   *
   *   validateURL: (url: string) => {
   *     // Pure function: validates URL format
   *     try {
   *       new URL(url);
   *       return true;
   *     } catch {
   *       return false;
   *     }
   *   }
   * });
   * ```
   */
  register(helpers: HelperCollection): void;

  /**
   * Get a helper from another extension
   *
   * @param extensionId - ID of the extension providing the helper
   * @param helperName - Name of the helper function
   * @returns Helper function or undefined if not found
   *
   * @example
   * ```ts
   * // In another extension
   * const parseJSONC = this.helpers.get('jsonc-parser', 'parseJSONC');
   * if (parseJSONC) {
   *   const result = parseJSONC(text);
   * }
   * ```
   */
  get<T extends HelperFunction>(extensionId: string, helperName: string): T | undefined;

  /**
   * Get all helpers from an extension
   *
   * @param extensionId - ID of the extension
   * @returns All helpers from that extension
   *
   * @example
   * ```ts
   * const helpers = this.helpers.getAll('jsonc-parser');
   * // Returns: { parseJSONC: Function, validateURL: Function }
   * ```
   */
  getAll(extensionId: string): HelperCollection | undefined;

  /**
   * List all available helpers
   *
   * @returns Metadata for all registered helpers
   *
   * @example
   * ```ts
   * const available = this.helpers.list();
   * // Returns: [{ name: 'parseJSONC', extensionId: 'jsonc-parser', ... }]
   * ```
   */
  list(): HelperMetadata[];

  /**
   * Check if a helper exists
   *
   * @param extensionId - Extension ID
   * @param helperName - Helper name
   * @returns Whether the helper exists
   */
  has(extensionId: string, helperName: string): boolean;
}

// ============================================================================
// Dependency Declaration
// ============================================================================

/**
 * Extension dependency on other extensions' helpers
 *
 * Declare in extension manifest
 */
export interface ExtensionDependency {
  /** Extension ID */
  extensionId: string;

  /** Required version (semver) */
  version: string;

  /** Optional: specific helpers needed */
  helpers?: string[];
}

// ============================================================================
// Usage Examples
// ============================================================================

/**
 * EXAMPLE 1: Parser Extension
 *
 * ```ts
 * export class JSONCParserExtension extends UIExtension {
 *   name = 'jsonc-parser';
 *   version = '1.0.0';
 *
 *   async onLoad() {
 *     // Register pure helper functions
 *     this.helpers.register({
 *       parseJSONC: (text: string) => {
 *         // Remove comments
 *         return text.replace(/\/\/.+$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
 *       },
 *
 *       stringifyJSONC: (obj: any, indent = 2) => {
 *         return JSON.stringify(obj, null, indent);
 *       }
 *     });
 *   }
 * }
 * ```
 *
 * EXAMPLE 2: Consumer Extension
 *
 * ```ts
 * export class MyExtension extends UIExtension {
 *   name = 'my-extension';
 *   version = '1.0.0';
 *   dependencies = [
 *     { extensionId: 'jsonc-parser', version: '^1.0.0', helpers: ['parseJSONC'] }
 *   ];
 *
 *   async onLoad() {
 *     // Use helper from another extension
 *     const parseJSONC = this.helpers.get('jsonc-parser', 'parseJSONC');
 *
 *     if (parseJSONC) {
 *       const result = parseJSONC(text);
 *     }
 *   }
 * }
 * ```
 *
 * EXAMPLE 3: Platform Validation
 *
 * The platform validates helpers at registration:
 *
 * ✅ ALLOWED:
 * ```ts
 * // Pure function - data transformation only
 * parseJSON: (text: string) => JSON.parse(text)
 * ```
 *
 * ❌ REJECTED:
 * ```ts
 * // Impure - network access
 * fetchData: (url: string) => fetch(url)
 *
 * // Impure - file system access
 * saveFile: (path: string, data: string) => fs.writeFile(path, data)
 *
 * // Impure - SDK method calls
 * showMessage: (msg: string) => this.showToast(msg)
 * ```
 */
