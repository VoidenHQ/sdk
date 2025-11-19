/**
 * Request Pipeline API for SDK
 *
 * Exposes the pipeline system to extensions for hooking into request execution.
 * Extensions can register hooks at specific pipeline stages.
 */

import { Editor } from '@tiptap/core';

// ============================================================================
// Pipeline Stages
// ============================================================================

/**
 * Stages in the request execution pipeline
 */
export enum PipelineStage {
  /**
   * Pre-processing: Validate, transform before compilation
   * Extensions can: Validate editor state, cancel request, transform data
   * Runs in: UI
   */
  PreProcessing = 'pre-processing',

  /**
   * Request compilation: Collect data from editor nodes
   * Extensions can: Add additional data to request state
   * Runs in: UI
   */
  RequestCompilation = 'request-compilation',

  /**
   * Pre-send: Last chance for modifications before sending
   * Extensions can: Add logging, modify request state
   * Runs in: UI
   */
  PreSend = 'pre-send',

  /**
   * Post-processing: After response received
   * Extensions can: Cache response, log, validate, trigger actions
   * Runs in: UI
   */
  PostProcessing = 'post-processing',
}

// ============================================================================
// Request & Response State
// ============================================================================

/**
 * REST API request state
 * This is what extensions see and can modify (except env variables)
 */
export interface RestApiRequestState {
  method: string;
  url: string;  // May contain {{variables}} - DO NOT try to expand them!
  headers: Array<{ key: string; value: string; enabled?: boolean }>;
  queryParams: Array<{ key: string; value: string; enabled?: boolean }>;
  pathParams: Array<{ key: string; value: string; enabled?: boolean }>;
  body?: string;
  contentType?: string;
  metadata?: Record<string, any>;
}

/**
 * REST API response state
 * Available in post-processing hooks
 */
export interface RestApiResponseState {
  status: number;
  statusText: string;
  headers: Array<{ key: string; value: string }>;
  contentType: string | null;
  body: any;
  timing: {
    start: number;
    end: number;
    duration: number;
  };
  bytesContent: number;
  url: string;
  error: string | null;
  metadata?: Record<string, any>;
}

// ============================================================================
// Hook Contexts
// ============================================================================

/**
 * Pre-processing hook context
 */
export interface PreProcessingContext {
  /** Editor instance */
  editor: Editor;

  /** Request state (can be modified) */
  requestState: RestApiRequestState;

  /** Cancel the request */
  cancel: () => void;
}

/**
 * Request compilation hook context
 */
export interface RequestCompilationContext {
  /** Editor instance */
  editor: Editor;

  /** Request state (can be modified) */
  requestState: RestApiRequestState;

  /** Add a header to the request */
  addHeader: (key: string, value: string) => void;

  /** Add a query parameter to the request */
  addQueryParam: (key: string, value: string) => void;
}

/**
 * Pre-send hook context
 */
export interface PreSendContext {
  /** Request state (can be modified) */
  requestState: RestApiRequestState;

  /** Shared metadata across hooks */
  metadata: Record<string, any>;
}

/**
 * Post-processing hook context
 */
export interface PostProcessingContext {
  /** Request state (read-only) */
  requestState: RestApiRequestState;

  /** Response state (can be modified) */
  responseState: RestApiResponseState;

  /** Shared metadata across hooks */
  metadata: Record<string, any>;
}

/**
 * Union type of all hook contexts
 */
export type HookContext =
  | PreProcessingContext
  | RequestCompilationContext
  | PreSendContext
  | PostProcessingContext;

/**
 * Hook handler function
 */
export type HookHandler<T = HookContext> = (context: T) => void | Promise<void>;

// ============================================================================
// Pipeline API
// ============================================================================

/**
 * Pipeline API for registering hooks
 */
export interface PipelineAPI {
  /**
   * Register a hook at a specific pipeline stage
   *
   * @param stage - The pipeline stage to hook into
   * @param handler - Function to execute at this stage
   * @param priority - Lower numbers run first (default: 100)
   *
   */
  
  registerHook<T extends HookContext>(
    stage: PipelineStage,
    handler: HookHandler<T>,
    priority?: number
  ): void;

  /**
   * Unregister all hooks for this extension
   *
   * Called automatically when extension is unloaded
   */
  unregisterAll(): void;
}

// ============================================================================
// Request Populator Interface
// ============================================================================

/**
 * Interface for nodes that can populate request state
 *
 * Nodes should implement this to participate in request compilation
 *
 * @example
 * ```ts
 * class HeadersTableNode extends Node implements RequestPopulator {
 *   // ... node definition ...
 *
 *   populateRequest(node: any, requestState: RestApiRequestState): void {
 *     const headers = node.content; // Parse from node
 *     headers.forEach(h => {
 *       requestState.headers.push({ key: h.key, value: h.value, enabled: true });
 *     });
 *   }
 *
 *   consumeResponse?(node: any, responseState: RestApiResponseState): void {
 *     // Optional: Update node based on response
 *     // e.g., show response headers in the table
 *   }
 * }
 * ```
 */
export interface RequestPopulator {
  /**
   * Populate request state from this node's data
   *
   * Called during Stage 2 (Request Compilation)
   *
   * @param node - The editor node instance
   * @param requestState - Request state to populate
   */
  populateRequest(
    node: any,
    requestState: RestApiRequestState
  ): void | Promise<void>;

  /**
   * Optional: Consume response and update node
   *
   * Called during Stage 8 (Post-processing)
   *
   * @param node - The editor node instance
   * @param responseState - Response state
   */
  consumeResponse?(
    node: any,
    responseState: RestApiResponseState
  ): void | Promise<void>;
}

// ============================================================================
// Security Notes
// ============================================================================

/**
 * SECURITY: Environment Variable Handling
 *
 * Extensions NEVER see actual environment variable values for security.
 *
 * ✅ What extensions CAN do:
 * - Add {{VARIABLE}} patterns to request URLs, headers, body
 * - Register hooks at UI stages (pre-processing, compilation, pre-send, post-processing)
 * - Access variable names via Environment API
 *
 * ❌ What extensions CANNOT do:
 * - Access environment variable values
 * - Hook into environment replacement (Stage 3)
 * - Hook into auth injection (Stage 4)
 * - Hook into HTTP sending (Stage 6)
 * - Hook into response extraction (Stage 7)
 *
 * The platform handles stages 3, 4, 6, 7 in Electron main process securely.
 */
