"use strict";
/**
 * UI Extension Base Class
 *
 * Base class for UI/Renderer process extensions.
 * Provides access to editor, blocks, slash commands, and UI components.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIExtension = void 0;
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
class UIExtension {
    /**
     * Internal method to inject context
     * @internal
     */
    _setContext(context) {
        this.ctx = context;
    }
    /**
     * Get extension metadata
     * @internal
     */
    _getMetadata() {
        return {
            name: this.name,
            version: this.version,
            description: this.description,
            author: this.author,
            icon: this.icon,
        };
    }
    // ========================================
    // Block & Slash Command APIs
    // ========================================
    /**
     * Register a custom block (Tiptap node)
     */
    registerBlock(block) {
        this.ctx.blocks.register(block);
    }
    /**
     * Register multiple blocks at once
     */
    registerBlocks(blocks) {
        blocks.forEach((block) => this.registerBlock(block));
    }
    /**
     * Register a slash command
     */
    registerSlashCommand(command) {
        this.ctx.slashCommands.register(command);
    }
    /**
     * Register a group of slash commands
     */
    registerSlashGroup(group) {
        this.ctx.slashCommands.registerGroup(group);
    }
    // ========================================
    // UI APIs
    // ========================================
    /**
     * Register a sidebar tab
     */
    registerSidebar(side, tab) {
        this.ctx.ui.registerSidebar(side, tab);
    }
    /**
     * Register a panel
     */
    registerPanel(panel) {
        this.ctx.ui.registerPanel(panel);
    }
    /**
     * Show a modal
     */
    showModal(modal) {
        this.ctx.ui.showModal(modal);
    }
    /**
     * Close a modal by ID
     */
    closeModal(id) {
        this.ctx.ui.closeModal(id);
    }
    /**
     * Show a toast notification
     */
    showToast(message, type) {
        this.ctx.ui.showToast(message, type);
    }
    // ========================================
    // Storage APIs
    // ========================================
    /**
     * Get extension-specific storage
     */
    get storage() {
        return this.ctx.storage;
    }
    // ========================================
    // Editor APIs
    // ========================================
    /**
     * Get the active editor instance
     */
    getEditor(type) {
        return this.ctx.editor.getActive(type);
    }
    /**
     * Get all editor instances
     */
    getAllEditors() {
        return this.ctx.editor.getAll();
    }
    /**
     * Focus an editor
     */
    focusEditor(type) {
        this.ctx.editor.focus(type);
    }
}
exports.UIExtension = UIExtension;
