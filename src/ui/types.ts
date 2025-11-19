/**
 * UI Extension Types
 * Types specific to UI/Renderer process extensions
 */

import { Node as TiptapNode } from '@tiptap/core';
import { NodeViewRenderer } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { ExtensionMetadata, ExtensionStorage, Request } from '../shared/types';

/**
 * Block definition - maps to Tiptap Node
 */
export interface BlockDefinition {
  /** Unique identifier for the block (e.g., "headers-table") */
  name: string;

  /** Display name */
  label: string;

  /** Icon name from lucide-react */
  icon?: string;

  /** Tiptap node configuration */
  node: TiptapNode;

  /** Optional React component for rendering (NodeView) */
  component?: NodeViewRenderer;

  /** Whether block can appear multiple times in a document */
  singleton?: boolean;

  /** Group this block belongs to (for organization) */
  group?: string;
}

/**
 * Slash command definition
 */
export interface SlashCommandDefinition {
  /** Unique identifier */
  name: string;

  /* Allow only one instance */
  singleton?: boolean;

  /* Keys to compare to for singleton*/
  compareKeys?: string[];

  /** Display label in menu */
  label: string;

  /** Description shown in menu */
  description: string;

  /** The slash trigger (e.g., "/headers") */
  slash: string;

  /** Alternative triggers */
  aliases?: string[];

  /** Icon name from lucide-react */
  icon?: string;

  /** Action to execute when command is selected */
  action: (editor: Editor) => void;

  /** Whether command should be enabled (dynamic) */
  isEnabled?: (editor: Editor) => boolean;

  /** Whether command should be hidden */
  shouldBeHidden?: (editor: Editor) => boolean;
}

/**
 * Slash command group
 */
export interface SlashCommandGroup {
  /** Group identifier */
  name: string;

  /** Display title */
  title: string;

  /** Commands in this group */
  commands: SlashCommandDefinition[];
}

/**
 * Tab definition for sidebar
 */
export interface TabDefinition {
  /** Unique tab identifier */
  id: string;

  /** Display title */
  title: string;

  /** Icon name from lucide-react */
  icon?: string;

  /** React component to render */
  component: React.ComponentType<any>;

  /** Optional badge content */
  badge?: string | number;
}

/**
 * Panel definition for UI
 */
export interface PanelDefinition {
  /** Unique panel identifier */
  id: string;

  /** Display title */
  title: string;

  /** Panel position */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';

  /** React component to render */
  component: React.ComponentType<any>;

  /** Default width (for side panels) */
  width?: number;

  /** Default height (for top/bottom panels) */
  height?: number;
}

/**
 * Modal definition
 */
export interface ModalDefinition {
  /** Unique modal identifier */
  id: string;

  /** Display title */
  title: string;

  /** React component to render */
  component: React.ComponentType<any>;

  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Whether modal can be closed */
  closable?: boolean;

  /** Callback when modal is closed */
  onClose?: () => void;
}

/**
 * Editor action definition (for toolbar/editor actions)
 */
export interface EditorAction {
  /** Unique action identifier */
  id: string;

  /** React component to render */
  component: React.ComponentType<any>;

  /** Optional predicate to check if the action should show */
  predicate?: (doc: any) => boolean;
}

/**
 * Document tab definition
 */
export interface DocumentTab {
  id: string;
  title: string;
  source: string;
  content: string;
}

/**
 * Panel definition (legacy support)
 */
export interface Panel {
  id: string;
  icon: string | null;
  title: string;
  props: Record<string, any>;
}

/**
 * Block registration API
 */
export interface BlockAPI {
  /** Register a block */
  register(block: BlockDefinition): void;

  /** Unregister a block */
  unregister(name: string): void;

  /** Get a registered block */
  get(name: string): BlockDefinition | undefined;

  /** Get all registered blocks */
  getAll(): BlockDefinition[];
}

/**
 * Slash command registration API
 */
export interface SlashCommandAPI {
  /** Register a slash command */
  register(command: SlashCommandDefinition): void;

  /** Register a group of slash commands */
  registerGroup(group: SlashCommandGroup): void;

  /** Unregister a slash command */
  unregister(name: string): void;

  /** Get a registered command */
  get(name: string): SlashCommandDefinition | undefined;

  /** Get all registered commands */
  getAll(): SlashCommandDefinition[];

  /** Get all command groups */
  getGroups(): SlashCommandGroup[];
}

/**
 * Editor API
 */
export interface EditorAPI {
  /** Get the active editor instance */
  getActive(type: 'voiden' | 'code'): Editor | null;

  /** Get all editor instances */
  getAll(): { voiden?: Editor; code?: Editor };

  /** Focus an editor */
  focus(type: 'voiden' | 'code'): void;
}

/**
 * Generic UI components exposed to plugins
 */
export interface UIComponents {
  /** Generic code editor component */
  CodeEditor: React.ComponentType<{
    readOnly?: boolean;
    lang?: string;
    value?: string;
    onChange?: (value: string) => void;
    showReplace?: boolean;
  }>;

  /** Table components */
  Table: React.ComponentType<{ className?: string; children?: React.ReactNode }>;
  TableBody: React.ComponentType<{ children?: React.ReactNode }>;
  TableRow: React.ComponentType<{ className?: string; children?: React.ReactNode }>;
  TableCell: React.ComponentType<{ className?: string; style?: any; children?: React.ReactNode }>;

  /** Node view wrapper for TipTap nodes */
  NodeViewWrapper: React.ComponentType<{ className?: string; style?: any; children?: React.ReactNode }>;

  /** Request block header component with link/unlink functionality */
  RequestBlockHeader: React.ComponentType<{
    title: string;
    withBorder?: boolean;
    editor: any; // TipTap Editor
    importedDocumentId?: string;
    actions?: React.ReactNode;
    openFile?: (relativePath: string) => Promise<void>;
  }>;
}

/**
 * Request-related hooks
 */
export interface RequestHooks {
  /** Hook for sending REST/HTTP requests */
  useSendRestRequest: (editor: any) => {
    refetch: () => void;
    isLoading: boolean;
    error: any;
    data: any;
    cancelRequest: () => void;
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PASTE HANDLING TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Voiden block structure (matches TipTap JSON)
 */
export interface VoidenBlock {
  type: string;
  attrs?: Record<string, any>;
  content?: VoidenBlock[];
  text?: string;
  marks?: Array<{ type: string; attrs?: Record<string, any> }>;
}

/**
 * Extension context (for block extensions)
 */
export interface ExtensionContext {
  /** Whether this is a transient (view-only) extension */
  isTransient: boolean;
}

/**
 * Block paste handler - for plugins that own block types
 */
export interface BlockPasteHandler {
  /** Block type this handler owns (e.g., "request", "method") */
  blockType: string;

  /** Whether to allow other plugins to extend this block */
  allowExtensions?: boolean;

  /**
   * Handle paste when user pastes inside this block type
   * @param text - Plain text from clipboard
   * @param html - HTML from clipboard (optional)
   * @param node - Current ProseMirror node
   * @param view - EditorView instance
   * @returns true if handled, false to continue default paste
   */
  handlePasteInside?: (
    text: string,
    html: string | undefined,
    node: any, // ProseMirror Node
    view: any  // EditorView
  ) => boolean;

  /**
   * Process block when it's being inserted from clipboard
   * @param block - The Voiden block being inserted
   * @returns Processed block (can modify/validate)
   */
  processBlock?: (block: VoidenBlock) => VoidenBlock;
}

/**
 * Block extension - for plugins that extend block types owned by others
 */
export interface BlockExtension {
  /** Block type to extend (must be owned by another plugin) */
  blockType: string;

  /**
   * Extend block rendering (view-only, transient)
   * @param block - The original block
   * @param context - Extension context (isTransient will always be true)
   * @returns Extended block (can add transient properties)
   */
  extendBlock: (block: VoidenBlock, context: ExtensionContext) => VoidenBlock;
}

/**
 * Pattern handler - for plugins that handle specific paste patterns (cURL, GraphQL, etc.)
 */
export interface PatternHandler {
  /**
   * Check if this handler can process the pasted content
   * @param text - Plain text from clipboard
   * @param html - HTML from clipboard (optional)
   * @returns true if this handler should process
   */
  canHandle: (text: string, html?: string) => boolean;

  /**
   * Handle the paste event
   * @param text - Plain text from clipboard
   * @param html - HTML from clipboard (optional)
   * @param view - EditorView instance
   * @returns true if handled, false to continue chain
   */
  handle: (text: string, html: string | undefined, view: any) => boolean;
}

/**
 * Paste API for plugins
 */
export interface PasteAPI {
  /**
   * Register a block owner (plugin that owns a block type)
   * Only one owner per block type is allowed
   */
  registerBlockOwner: (handler: BlockPasteHandler) => void;

  /**
   * Register a block extension (plugin that extends a block type)
   * Multiple extensions per block type are allowed
   */
  registerBlockExtension: (extension: BlockExtension) => void;

  /**
   * Register a pattern handler (e.g., cURL, GraphQL)
   * Multiple pattern handlers are allowed
   */
  registerPatternHandler: (handler: PatternHandler) => void;
}

/**
 * UI API for registering UI components
 */
export interface UIAPI {
  /** Register a sidebar tab */
  registerSidebar(side: 'left' | 'right', tab: TabDefinition): void;

  /** Register a panel */
  registerPanel(panel: PanelDefinition): void;

  /** Show a modal */
  showModal(modal: ModalDefinition): void;

  /** Close a modal */
  closeModal(id: string): void;

  /** Show a toast notification */
  showToast(message: string, type?: 'info' | 'success' | 'warning' | 'error'): void;

  /** Generic UI components for plugins to use */
  components: UIComponents;

  /** Legacy support for Voiden extensions */
  registerVoidenExtension?(extension: any): void;
}

/**
 * HTTP Request API
 */
export interface RequestAPI {
  /**
   * Send an HTTP request through the application
   * @param request Request object with method, url, headers, body, etc.
   * @param options Optional configuration
   * @returns Promise with response data
   */
  send(request: Request, options?: SendRequestOptions): Promise<RequestResponse>;
}

/**
 * Options for sending HTTP requests
 */
export interface SendRequestOptions {
  /** Abort signal for cancellation */
  signal?: AbortSignal;
  /** Environment variables to use for substitution */
  environment?: Record<string, string>;
  /** Proxy configuration */
  proxy?: ProxyConfig;
}

/**
 * Proxy configuration
 */
export interface ProxyConfig {
  host: string;
  port: number;
  protocol?: 'http' | 'https';
  auth?: {
    username: string;
    password: string;
  };
}

/**
 * HTTP Response from sendRequest
 */
export interface RequestResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number; // milliseconds
  size: number; // bytes
}

/**
 * Environment Variable API (DEPRECATED - use secure EnvironmentAPI from './environment')
 * @deprecated This API exposes environment values which is insecure
 */
export interface LegacyEnvironmentAPI {
  get(scope?: string): Promise<Record<string, string>>;
  set(key: string, value: string, scope?: string): Promise<void>;
  onChange(callback: (env: Record<string, string>) => void): () => void;
}

/**
 * UI Extension context - provided to UI extensions at runtime
 */
export interface UIExtensionContext {
  /** Block registration API */
  blocks: BlockAPI;

  /** Slash command registration API */
  slashCommands: SlashCommandAPI;

  /** UI registration API */
  ui: UIAPI;

  /** Editor API */
  editor: EditorAPI;

  /** Storage API */
  storage: ExtensionStorage;

  /** Extension metadata */
  metadata: ExtensionMetadata;

  /** HTTP Request API */
  request: RequestAPI;

  /** Environment Variable API (DEPRECATED - use environment from './environment') */
  environment?: LegacyEnvironmentAPI;
}

/**
 * Helpers exposed by a plugin for other plugins to use
 */
export type PluginHelpers = Record<string, (...args: any[]) => any>;

/**
 * Response section definition for plugins to register UI in response panel
 */
export interface ResponseSection {
  /** Unique section identifier */
  id: string;

  /** Display name */
  name: string;

  /** React component to render this section */
  component: React.ComponentType<{ response: any }>;

  /** Order for rendering (lower numbers render first) */
  order?: number;

  /** Whether section should be visible */
  visible?: boolean;
}

/**
 * Request building handler
 */
export type RequestBuildHandler = (request: any, editor: Editor) => any | Promise<any>;

/**
 * Response processing handler
 */
export type ResponseProcessHandler = (response: any) => void | Promise<void>;

/**
 * Plugin context (legacy support - for gradual migration)
 */
export interface PluginContext {
  registerSidebarTab: (sidebarId: "left" | "right", tab: TabDefinition) => void;
  registerPanel: (panelId: string, panel: TabDefinition) => void;
  registerVoidenExtension: (extension: any) => void;
  unregisterVoidenExtension: (extensionName: string) => void;
  registerCodemirrorExtension: (extension: any) => void;
  unregisterCodemirrorExtension: (extension: any) => void;
  addTab: (tabId: string, tab: Panel) => void;
  addVoidenSlashCommand: (command: SlashCommandDefinition) => void;
  addVoidenSlashGroup: (group: SlashCommandGroup) => void;
  registerEditorAction: (action: EditorAction) => void;

  /**
   * Expose helpers from this plugin for other plugins to use
   * @param helpers Object containing helper functions
   */
  exposeHelpers: (helpers: PluginHelpers) => void;

  project: {
    getActiveEditor: (type: "code" | "voiden") => any;
    getActiveProject: () => Promise<string>;
    getVoidFiles: () => Promise<DocumentTab[]>;
    createFile: (filePath: string, content: string) => Promise<void>;
    createFolder: (folderPath: string) => Promise<void>;
    /**
     * Open a file in the editor
     * @param relativePath - Path relative to the active project
     * @returns Promise that resolves when the file is opened
     */
    openFile: (relativePath: string) => Promise<void>;
  };
  helpers: {
    parseVoid: (markdown?: string) => any;
    /**
     * Get helpers exposed by another plugin
     * @param pluginId The ID of the plugin to get helpers from
     * @returns The helpers object exposed by that plugin, or undefined if not found
     */
    from: <T extends PluginHelpers = PluginHelpers>(pluginId: string) => T | undefined;
  };
  ui: {
    /** Get prose/markdown styling classes that respect the app's theme */
    getProseClasses: () => string;
    /** Open the right sidebar panel */
    openRightPanel: () => void;
    /** Close the right sidebar panel */
    closeRightPanel: () => void;
    /** Toggle the right sidebar panel (open if closed, close if open) */
    toggleRightPanel: () => void;
    /** Open the bottom panel */
    openBottomPanel: () => void;
    /** Close the bottom panel */
    closeBottomPanel: () => void;
    /** Open custom tab */
    openRightSidebarTab: (tabId: string) => void;
    /** Generic UI components for plugins to use */
    components: UIComponents;
    /** Request-related hooks */
    hooks: RequestHooks;
  };

  /**
   * Paste handling API
   * Allows plugins to handle clipboard paste events
   */
  paste: PasteAPI;

  /**
   * Register a handler to build/modify the request object
   * Multiple plugins can register handlers - they will be executed in sequence
   */
  onBuildRequest: (handler: RequestBuildHandler) => void;

  /**
   * Register a handler to process the response
   * Handler can register response sections to display in the response panel
   */
  onProcessResponse: (handler: ResponseProcessHandler) => void;

  /**
   * Register a section to display in the response panel
   * @deprecated Use openVoidenTab for response display instead
   */
  registerResponseSection: (section: ResponseSection) => void;

  /**
   * Open a new Voiden editor tab with the provided content
   * @param title - Tab title
   * @param content - Voiden document JSON content
   * @param options - Optional configuration (readOnly, etc.)
   */
  openVoidenTab: (title: string, content: any, options?: { readOnly?: boolean }) => Promise<void>;

  /**
   * Register node types that are linkable/referenceable across files
   * This allows external file links to show these blocks for linking
   * @param nodeTypes - Array of node type names (e.g., ['request', 'response-body'])
   */
  registerLinkableNodeTypes: (nodeTypes: string[]) => void;

  /**
   * Register display names for node types to show human-readable names in the UI
   * This allows the block picker to show friendly names instead of internal node type names
   * @param displayNames - Object mapping node type names to display names (e.g., { 'rest-request': 'Request', 'rest-body': 'Body' })
   */
  registerNodeDisplayNames: (displayNames: Record<string, string>) => void;
}

/**
 * Plugin interface (legacy support - for gradual migration)
 */
export interface Plugin {
  onload: (context: PluginContext) => void;
  onunload: () => void;
}
