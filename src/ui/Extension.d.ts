/**
 * UI Extension Base Class
 *
 * Base class for UI/Renderer process extensions.
 * Provides access to editor, blocks, slash commands, and UI components.
 */
import { UIExtensionContext, BlockDefinition, SlashCommandDefinition, SlashCommandGroup, TabDefinition, PanelDefinition, ModalDefinition } from './types';
import { ExtensionMetadata } from '../shared/types';
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
export declare abstract class UIExtension {
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
    /** Extension context - provided by the host at runtime */
    protected ctx: UIExtensionContext;
    /**
     * Internal method to inject context
     * @internal
     */
    _setContext(context: UIExtensionContext): void;
    /**
     * Get extension metadata
     * @internal
     */
    _getMetadata(): ExtensionMetadata;
    /**
     * Called when extension is loaded in the UI
     */
    abstract onLoad(): void | Promise<void>;
    /**
     * Called when extension is unloaded
     */
    onUnload?(): void | Promise<void>;
    /**
     * Register a custom block (Tiptap node)
     */
    protected registerBlock(block: BlockDefinition): void;
    /**
     * Register multiple blocks at once
     */
    protected registerBlocks(blocks: BlockDefinition[]): void;
    /**
     * Register a slash command
     */
    protected registerSlashCommand(command: SlashCommandDefinition): void;
    /**
     * Register a group of slash commands
     */
    protected registerSlashGroup(group: SlashCommandGroup): void;
    /**
     * Register a sidebar tab
     */
    protected registerSidebar(side: 'left' | 'right', tab: TabDefinition): void;
    /**
     * Register a panel
     */
    protected registerPanel(panel: PanelDefinition): void;
    /**
     * Show a modal
     */
    protected showModal(modal: ModalDefinition): void;
    /**
     * Close a modal by ID
     */
    protected closeModal(id: string): void;
    /**
     * Show a toast notification
     */
    protected showToast(message: string, type?: 'info' | 'success' | 'warning' | 'error'): void;
    /**
     * Get extension-specific storage
     */
    protected get storage(): import("../shared/types").ExtensionStorage;
    /**
     * Get the active editor instance
     */
    protected getEditor(type: 'voiden' | 'code'): import("@tiptap/core").Editor | null;
    /**
     * Get all editor instances
     */
    protected getAllEditors(): {
        voiden?: import("@tiptap/core").Editor;
        code?: import("@tiptap/core").Editor;
    };
    /**
     * Focus an editor
     */
    protected focusEditor(type: 'voiden' | 'code'): void;
}
//# sourceMappingURL=Extension.d.ts.map