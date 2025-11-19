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
    getAll(): {
        voiden?: Editor;
        code?: Editor;
    };
    /** Focus an editor */
    focus(type: 'voiden' | 'code'): void;
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
    time: number;
    size: number;
}
/**
 * Environment Variable API
 */
export interface EnvironmentAPI {
    /**
     * Get environment variables
     * @param scope 'global' | 'active' | specific environment ID
     * @returns Record of key-value pairs
     */
    get(scope?: string): Promise<Record<string, string>>;
    /**
     * Set environment variable
     * @param key Variable name
     * @param value Variable value
     * @param scope Where to set it
     */
    set(key: string, value: string, scope?: string): Promise<void>;
    /**
     * Watch for environment changes
     * @param callback Called when environment changes
     * @returns Cleanup function
     */
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
    /** Environment Variable API */
    environment: EnvironmentAPI;
}
/**
 * Plugin context (legacy support - for gradual migration)
 */
export interface PluginContext {
    registerSidebarTab: (sidebarId: "left" | "right", tab: TabDefinition) => void;
    registerPanel: (panelId: string, panel: TabDefinition) => void;
    registerVoidenExtension: (extension: any) => void;
    addTab: (tabId: string, tab: Panel) => void;
    addVoidenSlashCommand: (command: SlashCommandDefinition) => void;
    addVoidenSlashGroup: (group: SlashCommandGroup) => void;
    registerEditorAction: (action: EditorAction) => void;
    project: {
        getActiveEditor: (type: "code" | "voiden") => any;
        getActiveProject: () => Promise<string>;
        getVoidFiles: () => Promise<DocumentTab[]>;
        createFile: (filePath: string, content: string) => Promise<void>;
        createFolder: (folderPath: string) => Promise<void>;
    };
    helpers: {
        parseVoid: (markdown?: string) => any;
    };
    ui: {
        /** Get prose/markdown styling classes that respect the app's theme */
        getProseClasses: () => string;
    };
}
/**
 * Plugin interface (legacy support - for gradual migration)
 */
export interface Plugin {
    onload: (context: PluginContext) => void;
    onunload: () => void;
}
//# sourceMappingURL=types.d.ts.map