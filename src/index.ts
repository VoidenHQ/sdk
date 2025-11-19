/**
 * @voiden/sdk
 *
 * SDK for building Voiden extensions
 *
 * This SDK supports both UI (renderer process) and Electron (main process) extensions.
 *
 * @example UI Extension
 * ```ts
 * import { UIExtension } from '@voiden/sdk/ui';
 *
 * export class MyExtension extends UIExtension {
 *   name = 'my-extension';
 *   version = '1.0.0';
 *
 *   async onLoad() {
 *     this.registerBlock({ ... });
 *   }
 * }
 * ```
 *
 * @example Electron Extension
 * ```ts
 * import { ElectronExtension } from '@voiden/sdk/electron';
 *
 * export class MyExtension extends ElectronExtension {
 *   name = 'my-extension';
 *   version = '1.0.0';
 *
 *   async onLoad() {
 *     this.registerIPCHandler('my-channel', async () => { ... });
 *   }
 * }
 * ```
 */

// ========================================
// Primary exports (UI + Shared for backward compatibility)
// ========================================

// UI Extension (most common use case)
export { UIExtension } from './ui/Extension';
export { UIExtension as Extension } from './ui/Extension'; // Alias for backward compatibility

// UI Types
export type {
  // Block types
  BlockDefinition,
  SlashCommandDefinition,
  SlashCommandDefinition as SlashCommand, // Alias for backward compatibility
  SlashCommandGroup,
  // UI types
  TabDefinition,
  TabDefinition as Tab, // Alias for backward compatibility
  PanelDefinition,
  ModalDefinition,
  EditorAction,
  DocumentTab,
  Panel,
  // Context types
  UIExtensionContext,
  UIExtensionContext as ExtensionContext, // Alias for backward compatibility
  // API types
  BlockAPI,
  SlashCommandAPI,
  UIAPI,
  EditorAPI,
  RequestAPI,
  SendRequestOptions,
  ProxyConfig,
  RequestResponse,
  LegacyEnvironmentAPI,
  PluginHelpers,
  // Legacy types
  Plugin,
  PluginContext,
} from './ui/types';

// Pipeline API Types
export { PipelineStage } from './ui/pipeline'; // Enum export
export type {
  PipelineAPI,
  HookContext,
  HookHandler,
  PreProcessingContext,
  RequestCompilationContext,
  PreSendContext,
  PostProcessingContext,
  RestApiRequestState,
  RestApiResponseState,
  RequestPopulator,
} from './ui/pipeline';

// Environment API Types
export type { EnvironmentAPI } from './ui/environment';

// Helper System Types
export type {
  HelperAPI,
  HelperFunction,
  HelperCollection,
  HelperMetadata,
  HelperCapability,
  ExtensionDependency,
} from './ui/helpers';

// Shared Types
export type {
  ExtensionMetadata,
  ExtensionStorage,
  // HTTP/Request types
  Request,
  RequestParam,
  BodyParam,
  ContentType,
  TestResult,
  TestDescriptor,
  ExpectResult,
  PreRequestResult,
} from './shared/types';

// ========================================
// Sub-path exports (explicit imports)
// ========================================

// These are exported via package.json "exports" field:
// - @voiden/sdk/ui
// - @voiden/sdk/electron
// - @voiden/sdk/shared
