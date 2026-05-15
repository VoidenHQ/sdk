import type { 
  Block, 
  CliRequestState, 
  CliResponseState, 
  CliReportEntry, 
  BlockSchemaDef 
} from './types.js'

export type RunnerRequestHandler = (
  request: CliRequestState,
  blocks: Block[]
) => CliRequestState | void | Promise<CliRequestState | void>

export type RunnerResponseHandler = (
  response: CliResponseState,
  blocks: Block[],
  request: CliRequestState
) => void | Promise<void>

export interface RunnerReportAPI {
  add(entry: CliReportEntry): void
  getEntries(): CliReportEntry[]
}

/**
 * The context object passed to every runner plugin factory.
 */
export interface RunnerContext {
  // Request/Response orchestration
  onBuildRequest(handler: RunnerRequestHandler): void
  onProcessResponse(handler: RunnerResponseHandler): void
  
  // Granular pipeline hooks (e.g. for scripting)
  pipeline: {
    registerHook(stage: string, handler: any, priority?: number): void
  }

  // Block normalization
  registerBlockSchema(def: BlockSchemaDef): void

  // Protocol executors (e.g. for sockets/grpc handoff)
  protocols?: {
    executeWebSocket(req: any): Promise<any>
    executeGrpc(req: any): Promise<any>
  }

  // Verbosity
  verbose: boolean

  report: RunnerReportAPI
}

export type RunnerFactory = (context: RunnerContext) => { onload(): void | Promise<void> }
