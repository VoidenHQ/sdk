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
}
