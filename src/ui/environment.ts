/**
 * Secure Environment API for SDK
 *
 * Provides access to environment variable names only (not values) for security.
 * Extensions can use this for autocomplete, validation, but never see actual secrets.
 */

// ============================================================================
// Environment API
// ============================================================================

/**
 * Secure Environment API
 *
 * Extensions can access variable names for autocomplete/validation,
 * but never see actual values (for security).
 */
export interface EnvironmentAPI {
  /**
   * Get list of environment variable names (keys only)
   *
   * Returns only the variable names, NOT their values.
   * Use this for:
   * - Autocomplete suggestions
   * - Validation (check if variable exists)
   * - Showing available variables to user
   *
   * @returns Array of variable names
   *
   * @security Values are NEVER exposed to extensions
   *
   * @example
   * ```ts
   * const keys = await this.environment.getKeys();
   * // Returns: ['API_KEY', 'BASE_URL', 'AUTH_TOKEN']
   *
   * // Use for autocomplete
   * const suggestions = keys.map(key => `{{${key}}}`);
   * ```
   */
  getKeys(): Promise<string[]>;

  /**
   * Watch for environment changes (keys only)
   *
   * Called when environment variables are added/removed
   * or when active environment changes.
   *
   * @param callback - Called with updated list of variable names
   * @returns Cleanup function
   *
   */
  onChange(callback: (keys: string[]) => void): () => void;

  /**
   * Check if a variable exists
   *
   * @param key - Variable name to check
   * @returns Whether the variable exists in active environment
   *
   * @example
   * ```ts
   * if (await this.environment.has('API_KEY')) {
   *   // Variable exists, safe to use {{API_KEY}}
   * }
   * ```
   */
  has(key: string): Promise<boolean>;
}

// ============================================================================
// Usage Guide
// ============================================================================

/**
 * HOW TO USE ENVIRONMENT VARIABLES IN EXTENSIONS
 *
 * ✅ CORRECT Usage:
 *
 * ```ts
 * // 1. Add {{variables}} to request state
 * this.pipeline.registerHook(
 *   PipelineStage.RequestCompilation,
 *   async (context) => {
 *     context.addHeader('Authorization', 'Bearer {{API_TOKEN}}');
 *     context.requestState.url = '{{BASE_URL}}/api/users';
 *   }
 * );
 *
 * // 2. Get variable names for autocomplete
 * const keys = await this.environment.getKeys();
 * const suggestions = keys.map(key => ({
 *   label: key,
 *   insertText: `{{${key}}}`
 * }));
 *
 * // 3. Validate variables exist
 * if (await this.environment.has('API_KEY')) {
 *   // Safe to use
 * }
 * ```
 *
 * ❌ INCORRECT Usage (these DON'T work and are blocked for security):
 *
 * ```ts
 * // This doesn't exist - you can't get values!
 * const value = await this.environment.getValue('API_KEY'); // ❌
 *
 * // This doesn't exist - you can't get key-value pairs!
 * const env = await this.environment.getAll(); // ❌
 *
 * // This doesn't work - you can't do replacement yourself!
 * const replaced = text.replace(/\{\{(\w+)\}\}/g, (_, key) => env[key]); // ❌
 * ```
 *
 * WHY THIS DESIGN?
 *
 * Security: If extensions could access environment values, malicious extensions
 * could steal API keys, tokens, and other secrets. By only exposing variable
 * names, extensions can:
 * - Provide autocomplete for {{variables}}
 * - Validate that variables exist
 * - Add {{variables}} to requests
 *
 * But they can NEVER:
 * - See actual API keys
 * - Exfiltrate secrets
 * - Access sensitive data
 *
 * The platform handles variable replacement securely in Electron main process
 * where extensions cannot access it.
 */
