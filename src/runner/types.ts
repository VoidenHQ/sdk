/**
 * Shared types for the CLI runner context.
 * Pure TypeScript — no UI or Electron dependencies.
 */

export interface Block {
  type: string
  attrs?: Record<string, any>
  content?: Block[] | string
}

/**
 * The request state that pre-request hooks can read and modify.
 */
export interface CliRequestState {
  method: string
  url: string
  headers: Array<{ key: string; value: string; enabled?: boolean }>
  queryParams: Array<{ key: string; value: string; enabled?: boolean }>
  pathParams?: Array<{ key: string; value: string; enabled?: boolean }>
  body?: string
  contentType?: string
  metadata?: Record<string, any>
}

/**
 * The response state that post-response hooks receive.
 */
export interface CliResponseState {
  protocol: string
  method?: string
  url: string
  status?: number
  statusText?: string
  durationMs: number
  size?: number
  body?: string
  error?: string
  connected?: boolean
  metadata?: Record<string, any>
}

/**
 * Block Schema definition for headless normalization.
 * Mirrors TipTap's Attribute definition.
 */
export interface BlockAttrDef {
  default?: any
}

export interface BlockSchemaDef {
  name: string
  attrs: Record<string, BlockAttrDef>
}

/**
 * Structured entries plugins emit via RunnerReportAPI.
 */
export type CliReportEntry =
  | { type: 'log';       level: 'info' | 'warn' | 'error' | 'debug'; message: string }
  | { type: 'assertion'; passed: boolean; message: string; actual?: any; expected?: any; operator?: string }
  | { type: 'section';   title: string }
