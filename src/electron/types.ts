/**
 * Electron Extension Types
 * Types specific to Electron main process extensions
 */

import { ExtensionMetadata, ExtensionStorage } from '../shared/types';

/**
 * IPC Handler definition
 */
export interface IPCHandler {
  /** Channel name */
  channel: string;

  /** Handler function */
  handler: (...args: any[]) => any | Promise<any>;
}

/**
 * Menu item definition
 */
export interface MenuItemDefinition {
  /** Unique identifier */
  id: string;

  /** Display label */
  label: string;

  /** Accelerator (keyboard shortcut) */
  accelerator?: string;

  /** Click handler */
  click?: () => void;

  /** Submenu items */
  submenu?: MenuItemDefinition[];

  /** Menu type */
  type?: 'normal' | 'separator' | 'checkbox' | 'radio';

  /** Whether item is enabled */
  enabled?: boolean;
}

/**
 * Protocol handler definition
 */
export interface ProtocolHandler {
  /** Protocol scheme (e.g., "myapp") */
  scheme: string;

  /** Handler function */
  handler: (url: string) => any | Promise<any>;
}

/**
 * File system watcher definition
 */
export interface FileSystemWatcher {
  /** Path to watch */
  path: string;

  /** File change handler */
  onChange: (event: 'add' | 'change' | 'unlink', path: string) => void;

  /** Watch options */
  options?: {
    /** Watch for file changes */
    persistent?: boolean;
    /** Follow symbolic links */
    followSymlinks?: boolean;
    /** Ignore patterns */
    ignored?: string | RegExp | ((path: string) => boolean);
  };
}

/**
 * IPC API for registering IPC handlers
 */
export interface IPCAPI {
  /** Register an IPC handler */
  handle(channel: string, handler: (...args: any[]) => any | Promise<any>): void;

  /** Unregister an IPC handler */
  removeHandler(channel: string): void;

  /** Send message to renderer */
  send(channel: string, ...args: any[]): void;
}

/**
 * Menu API for registering menu items
 */
export interface MenuAPI {
  /** Register a menu item */
  registerMenuItem(menu: 'app' | 'context' | 'tray', item: MenuItemDefinition): void;

  /** Update a menu item */
  updateMenuItem(id: string, updates: Partial<MenuItemDefinition>): void;

  /** Remove a menu item */
  removeMenuItem(id: string): void;
}

/**
 * Protocol API for custom protocols
 */
export interface ProtocolAPI {
  /** Register a protocol handler */
  registerProtocol(handler: ProtocolHandler): void;

  /** Unregister a protocol */
  unregisterProtocol(scheme: string): void;
}

/**
 * File System API
 */
export interface FileSystemAPI {
  /** Watch a file or directory */
  watch(watcher: FileSystemWatcher): () => void;

  /** Read a file */
  readFile(path: string): Promise<string>;

  /** Write a file */
  writeFile(path: string, content: string): Promise<void>;

  /** Check if file exists */
  exists(path: string): Promise<boolean>;
}

/**
 * Process API for spawning processes
 */
export interface ProcessAPI {
  /** Spawn a process */
  spawn(command: string, args?: string[], options?: any): Promise<{
    stdout: string;
    stderr: string;
    exitCode: number;
  }>;

  /** Execute a command */
  exec(command: string): Promise<string>;
}

/**
 * Shell API for opening external URLs
 */
export interface ShellAPI {
  /** Open a URL in the user's default browser */
  openExternal(url: string): Promise<void>;
}

/**
 * Environment variable replacement API
 */
export interface EnvAPI {
  /** Resolve {{VARIABLE}} patterns. Pass IPC event to auto-resolve project path. */
  replaceVariables(text: string, eventOrProjectPath: any): Promise<string>;
  /**
   * Resolve `{{namespace.key}}` references at request time, in the main
   * process — e.g. a secrets plugin registering "vault" for `{{vault.api_token}}`.
   * Return undefined (or throw) when a key can't be resolved; the request is
   * then blocked as having an unresolved variable. An environment variable
   * with the same full name always wins. Returns a function that unregisters it.
   * Optional: Voiden versions before this API was added don't define it, so feature-detect it.
   */
  registerVariableProvider?(namespace: string, resolve: VariableResolver): () => void;
}

/** Context passed to a {@link VariableResolver}. */
export interface VariableProviderContext {
  /** Workspace root the request runs in. */
  projectPath: string;
  /** Selected environment path (e.g. "staging.eu"), or null when none is selected. */
  activeEnv: string | null;
  /** The request's resolved environment variables. */
  env: Readonly<Record<string, string>>;
}

/** Resolves one key of a provider namespace — `{{vault.db/password}}` → key "db/password". */
export type VariableResolver = (
  key: string,
  context: VariableProviderContext,
) => string | undefined | Promise<string | undefined>;

/**
 * Project API for accessing project state
 */
export interface ProjectAPI {
  /** Get the active project path */
  getActive(event?: any): Promise<string | undefined>;
}

/**
 * Electron Extension context - provided to Electron extensions at runtime
 */
export interface ElectronExtensionContext {
  /** IPC communication API */
  ipc: IPCAPI;

  /** Menu registration API */
  menu: MenuAPI;

  /** Protocol registration API */
  protocol: ProtocolAPI;

  /** File system API */
  fs: FileSystemAPI;

  /** Process spawning API */
  process: ProcessAPI;

  /** Storage API */
  storage: ExtensionStorage;

  /** Extension metadata */
  metadata: ExtensionMetadata;

  /** Shell API for opening external URLs */
  shell: ShellAPI;

  /** Environment variable replacement API */
  env: EnvAPI;

  /** Project state API */
  project: ProjectAPI;
}

/**
 * Factory function type for creating Electron plugins
 */
export type ElectronPluginFactory = (context: ElectronExtensionContext) => ElectronPlugin;

/**
 * Electron plugin interface (factory pattern)
 */
export interface ElectronPlugin {
  onload(): void | Promise<void>;
  onunload?(): void | Promise<void>;
}
