/**
 * Electron Extension Base Class
 *
 * Base class for Electron main process extensions.
 * Provides access to IPC, menus, protocols, file system, and process APIs.
 */

import {
  ElectronExtensionContext,
  MenuItemDefinition,
  ProtocolHandler,
  FileSystemWatcher,
} from './types';
import { ExtensionMetadata } from '../shared/types';

/**
 * Base Electron Extension class
 *
 * All Voiden Electron extensions must extend this class and implement the required methods.
 *
 * @example
 * ```ts
 * export class MyElectronExtension extends ElectronExtension {
 *   name = 'my-electron-extension';
 *   version = '1.0.0';
 *   description = 'My awesome Electron extension';
 *
 *   async onLoad() {
 *     this.registerIPCHandler('my-channel', async (data) => {
 *       return { success: true };
 *     });
 *   }
 * }
 * ```
 */
export abstract class ElectronExtension {
  // ========================================
  // Extension Metadata (required)
  // ========================================

  /** Extension unique identifier */
  abstract name: string;

  /** Semantic version */
  abstract version: string;

  /** Human-readable description */
  description?: string;

  /** Author name or organization */
  author?: string;

  /** Extension icon (lucide-react name) */
  icon?: string;

  // ========================================
  // Extension Context (injected by host)
  // ========================================

  /** Extension context - provided by the host at runtime */
  protected ctx!: ElectronExtensionContext;

  /**
   * Internal method to inject context
   * @internal
   */
  _setContext(context: ElectronExtensionContext): void {
    this.ctx = context;
  }

  /**
   * Get extension metadata
   * @internal
   */
  _getMetadata(): ExtensionMetadata {
    return {
      name: this.name,
      version: this.version,
      description: this.description,
      author: this.author,
      icon: this.icon,
    };
  }

  // ========================================
  // Lifecycle Hooks
  // ========================================

  /**
   * Called when extension is loaded in Electron main process
   */
  abstract onLoad(): void | Promise<void>;

  /**
   * Called when extension is unloaded
   */
  onUnload?(): void | Promise<void>;

  // ========================================
  // IPC APIs
  // ========================================

  /**
   * Register an IPC handler
   */
  protected registerIPCHandler(
    channel: string,
    handler: (...args: any[]) => any | Promise<any>
  ): void {
    this.ctx.ipc.handle(channel, handler);
  }

  /**
   * Send message to renderer process
   */
  protected sendToRenderer(channel: string, ...args: any[]): void {
    this.ctx.ipc.send(channel, ...args);
  }

  // ========================================
  // Menu APIs
  // ========================================

  /**
   * Register a menu item
   */
  protected registerMenuItem(
    menu: 'app' | 'context' | 'tray',
    item: MenuItemDefinition
  ): void {
    this.ctx.menu.registerMenuItem(menu, item);
  }

  // ========================================
  // Protocol APIs
  // ========================================

  /**
   * Register a custom protocol handler
   */
  protected registerProtocol(handler: ProtocolHandler): void {
    this.ctx.protocol.registerProtocol(handler);
  }

  // ========================================
  // File System APIs
  // ========================================

  /**
   * Watch a file or directory for changes
   */
  protected watchFileSystem(watcher: FileSystemWatcher): () => void {
    return this.ctx.fs.watch(watcher);
  }

  /**
   * Read a file
   */
  protected async readFile(path: string): Promise<string> {
    return this.ctx.fs.readFile(path);
  }

  /**
   * Write a file
   */
  protected async writeFile(path: string, content: string): Promise<void> {
    return this.ctx.fs.writeFile(path, content);
  }

  // ========================================
  // Process APIs
  // ========================================

  /**
   * Spawn a child process
   */
  protected async spawn(
    command: string,
    args?: string[],
    options?: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return this.ctx.process.spawn(command, args, options);
  }

  /**
   * Execute a command
   */
  protected async exec(command: string): Promise<string> {
    return this.ctx.process.exec(command);
  }

  // ========================================
  // Shell APIs
  // ========================================

  /**
   * Open a URL in the user's default browser
   */
  protected async openExternal(url: string): Promise<void> {
    return this.ctx.shell.openExternal(url);
  }

  // ========================================
  // Environment APIs
  // ========================================

  /**
   * Replace {{VARIABLE}} patterns in text
   */
  protected async replaceVariables(text: string, eventOrProjectPath: any): Promise<string> {
    return this.ctx.env.replaceVariables(text, eventOrProjectPath);
  }

  // ========================================
  // Project APIs
  // ========================================

  /**
   * Get the active project path
   */
  protected async getActiveProject(event?: any): Promise<string | undefined> {
    return this.ctx.project.getActive(event);
  }

  // ========================================
  // Storage APIs
  // ========================================

  /**
   * Get extension-specific storage
   */
  protected get storage() {
    return this.ctx.storage;
  }
}
