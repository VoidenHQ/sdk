/**
 * UI Extension SDK
 *
 * SDK for building Voiden UI extensions (renderer process)
 */

export { UIExtension } from './Extension';
export { UIExtension as Extension } from './Extension'; // Backward compatibility

// Export all types
export * from './types';

// Export Pipeline API
export * from './pipeline';
export type {
  PipelineAPI,
  PipelineStage,
  HookContext,
  HookHandler,
  PreProcessingContext,
  RequestCompilationContext,
  PreSendContext,
  PostProcessingContext,
  RestApiRequestState,
  RestApiResponseState,
  RequestPopulator,
} from './pipeline';

// Export Environment API
export * from './environment';
export type { EnvironmentAPI } from './environment';

// Export Helper System API
export * from './helpers';
export type {
  HelperAPI,
  HelperFunction,
  HelperCollection,
  HelperMetadata,
  HelperCapability,
  ExtensionDependency,
} from './helpers';

// Note: UI components are NOT exported from SDK
// Extensions receive components via context.ui.components provided by the host app

// Export type aliases for backward compatibility
export type {
  SlashCommandDefinition as SlashCommand,
  TabDefinition as Tab,
} from './types';
