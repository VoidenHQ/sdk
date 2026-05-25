/**
 * CorePluginContext
 *
 * Extended PluginContext type for Voiden core plugins. Adds the additional APIs
 * that the host app injects at runtime (pipeline hooks, response store access,
 * extended helpers, UI utilities, etc.).
 *
 * All core plugin.ts files should import this type from @voiden/sdk/ui instead
 * of using a local relative import.
 */

import type { PluginContext } from './types';

export type CorePluginContext = Omit<PluginContext, 'helpers' | 'ui'> & {
  // ── Pipeline ───────────────────────────────────────────────────────────────
  pipeline: {
    /** Register a hook at the given pipeline stage. The extension ID is added automatically. */
    registerHook: (stage: string, handler: any, priority?: number) => Promise<void>;
    /** Unregister all hooks registered by this extension. Call in onunload. */
    unregister: () => Promise<void>;
  };

  // ── Response store ─────────────────────────────────────────────────────────
  response: {
    /** Returns the tab ID of the request that is currently in-flight. */
    getCurrentTabId: () => Promise<string | null>;
    /** Surface an error message in the response panel for the given tab. */
    setError: (tabId: string | null, error: string) => Promise<void>;
  };

  // ── History adapter ────────────────────────────────────────────────────────
  registerHistoryAdapter: (adapter: any) => void;

  // ── Extended helpers ───────────────────────────────────────────────────────
  helpers: PluginContext['helpers'] & {
    /** Request-parsing utilities from the host app (protocol-agnostic). */
    requestUtils: {
      getTable: (type: string, doc: any, env?: Record<string, string>) => any[];
      parseAuthNode: (doc: any) => any;
      buildHeadersWithCookies: (doc: any, env?: Record<string, string>) => any[];
      findNode: (doc: any, type: string) => any;
      findNodes: (doc: any, type: string) => any[];
      createNewRequestObject: () => any;
      getRequest: (doc: any, env?: Record<string, string>) => any;
    };
    /** Expand linked blocks in a ProseMirror doc JSON (resolves external file refs). */
    expandLinkedBlocksInDoc: (doc: any, options?: { forceRefresh?: boolean }) => Promise<any>;
    /** Convert a ProseMirror doc JSON string to Voiden markdown. */
    prosemirrorToMarkdown: (docJson: string, schema: any) => string;
    /** Returns the host's full set of Voiden TipTap extensions (for schema building). */
    getVoidenExtensions: () => any[];
    /** The host's Voiden editor Zustand store (use only outside React components). */
    useEditorStore: any;
    /** React hook — active environment. Must only be called inside React components / node views. */
    useActiveEnvironment: () => any;
    /** React hook — all environments. Must only be called inside React components / node views. */
    useEnvironments: () => any;
  };

  // ── Extended UI ────────────────────────────────────────────────────────────
  ui: PluginContext['ui'] & {
    /** Returns the current response panel position ('right' | 'bottom'). */
    getResponsePanelPosition: () => 'right' | 'bottom';
    /** Set the active view inside the bottom panel (e.g. 'sidebar'). */
    setBottomActiveView: (view: string) => void;
    /** Expand the bottom panel if it is collapsed. */
    expandBottomPanel: () => void;
  };
};
