/**
 * UI Extension Base Class
 *
 * Base class for UI/Renderer process extensions.
 * Provides access to editor, blocks, slash commands, and UI components.
 */

import {
  UIExtensionContext,
  BlockDefinition,
  SlashCommandDefinition,
  SlashCommandGroup,
  TabDefinition,
  PanelDefinition,
  ModalDefinition,
} from './types';
import { ExtensionMetadata } from '../shared/types';
import { PipelineAPI, PipelineStage, HookHandler, HookContext } from './pipeline';
import { EnvironmentAPI } from './environment';
import { HelperAPI, HelperCollection } from './helpers';

/**
 * Base UI Extension class
 *
 * All Voiden UI extensions must extend this class and implement the required methods.
 *
 * @example
 * ```ts
 * export class MyUIExtension extends UIExtension {
 *   name = 'my-ui-extension';
 *   version = '1.0.0';
 *   description = 'My awesome UI extension';
 *
 *   async onLoad() {
 *     this.registerBlock({
 *       name: 'my-block',
 *       label: 'My Block',
 *       node: MyBlockNode,
 *     });
 *   }
 * }
 * ```
 */
export abstract class UIExtension {
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
  protected ctx!: UIExtensionContext;

  /**
   * Internal method to inject context
   * @internal
   */
  _setContext(context: UIExtensionContext): void {
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
   * Called when extension is loaded in the UI
   */
  abstract onLoad(): void | Promise<void>;

  /**
   * Called when extension is unloaded
   */
  onUnload?(): void | Promise<void>;

  // ========================================
  // Block & Slash Command APIs
  // ========================================

  /**
   * Register a custom block (Tiptap node)
   */
  protected registerBlock(block: BlockDefinition): void {
    this.ctx.blocks.register(block);
  }

  /**
   * Register multiple blocks at once
   */
  protected registerBlocks(blocks: BlockDefinition[]): void {
    blocks.forEach((block) => this.registerBlock(block));
  }

  /**
   * Register a slash command
   */
  protected registerSlashCommand(command: SlashCommandDefinition): void {
    this.ctx.slashCommands.register(command);
  }

  /**
   * Register a group of slash commands
   */
  protected registerSlashGroup(group: SlashCommandGroup): void {
    this.ctx.slashCommands.registerGroup(group);
  }

  // ========================================
  // UI APIs
  // ========================================

  /**
   * Register a sidebar tab
   */
  protected registerSidebar(side: 'left' | 'right', tab: TabDefinition): void {
    this.ctx.ui.registerSidebar(side, tab);
  }

  /**
   * Register a panel
   */
  protected registerPanel(panel: PanelDefinition): void {
    this.ctx.ui.registerPanel(panel);
  }

  /**
   * Show a modal
   */
  protected showModal(modal: ModalDefinition): void {
    this.ctx.ui.showModal(modal);
  }

  /**
   * Close a modal by ID
   */
  protected closeModal(id: string): void {
    this.ctx.ui.closeModal(id);
  }

  /**
   * Show a toast notification
   */
  protected showToast(
    message: string,
    type?: 'info' | 'success' | 'warning' | 'error'
  ): void {
    this.ctx.ui.showToast(message, type);
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

  // ========================================
  // Editor APIs
  // ========================================

  /**
   * Get the active editor instance
   */
  protected getEditor(type: 'voiden' | 'code') {
    return this.ctx.editor.getActive(type);
  }

  /**
   * Get all editor instances
   */
  protected getAllEditors() {
    return this.ctx.editor.getAll();
  }

  /**
   * Focus an editor
   */
  protected focusEditor(type: 'voiden' | 'code'): void {
    this.ctx.editor.focus(type);
  }

  // ========================================
  // Pipeline APIs (Phase 3)
  // ========================================

  /**
   * Get the request pipeline API
   *
   * Use this to register hooks at different pipeline stages.
   *
   */
  protected get pipeline(): PipelineAPI {
    return (this.ctx as any).pipeline;
  }

  /**
   * Register a pipeline hook (convenience method)
   *
   * @param stage - Pipeline stage to hook into
   * @param handler - Hook function
   * @param priority - Execution priority (lower = earlier)
   *
   */
  protected registerPipelineHook<T extends HookContext>(
    stage: PipelineStage,
    handler: HookHandler<T>,
    priority?: number
  ): void {
    this.pipeline.registerHook(stage, handler, priority);
  }

  // ========================================
  // Secure Environment APIs
  // ========================================

  /**
   * Get the secure environment API
   *
   * Returns only variable names (not values) for security.
   *
   * @example
   * ```ts
   * // Get available variable names
   * const keys = await this.environment.getKeys();
   * // Returns: ['API_KEY', 'BASE_URL']
   *
   * // Check if variable exists
   * if (await this.environment.has('API_KEY')) {
   *   // Safe to use {{API_KEY}} in requests
   * }
   * ```
   */
  protected get environment(): EnvironmentAPI {
    return (this.ctx as any).environment;
  }

  // ========================================
  // Helper System APIs
  // ========================================

  /**
   * Get the helper API
   *
   * Use this to register or consume helper functions.
   *
   * @example Register helpers:
   * ```ts
   * this.helpers.register({
   *   parseJSONC: (text: string) => {
   *     return text.replace(/\/\/.+$/gm, '');
   *   }
   * });
   * ```
   *
   * @example Use helpers from other extensions:
   * ```ts
   * const parseJSONC = this.helpers.get('jsonc-parser', 'parseJSONC');
   * if (parseJSONC) {
   *   const result = parseJSONC(text);
   * }
   * ```
   */
  protected get helpers(): HelperAPI {
    return (this.ctx as any).helpers;
  }

  /**
   * Register helper functions (convenience method)
   *
   * @param helpers - Object containing helper functions
   *
   * @example
   * ```ts
   * this.registerHelpers({
   *   parseJSONC: (text: string) => {
   *     return text.replace(/\/\/.+$/gm, '');
   *   },
   *   validateEmail: (email: string) => {
   *     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   *   }
   * });
   * ```
   */
  protected registerHelpers(helpers: HelperCollection): void {
    this.helpers.register(helpers);
  }
}
