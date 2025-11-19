/**
 * Shared types used by both UI and Electron extensions
 */

/**
 * Extension metadata
 */
export interface ExtensionMetadata {
  /** Extension unique identifier */
  name: string;

  /** Semantic version */
  version: string;

  /** Human-readable description */
  description?: string;

  /** Author name or organization */
  author?: string;

  /** Extension icon (lucide-react name) */
  icon?: string;
}

/**
 * Storage API for extension-specific data
 */
export interface ExtensionStorage {
  /** Get a value from storage */
  get<T = any>(key: string): Promise<T | undefined>;

  /** Set a value in storage */
  set<T = any>(key: string, value: T): Promise<void>;

  /** Remove a value from storage */
  remove(key: string): Promise<void>;

  /** Clear all extension storage */
  clear(): Promise<void>;

  /** List all keys in storage */
  keys(): Promise<string[]>;
}

/**
 * HTTP/Request related types
 */
export type ContentType =
  | "none"
  | "application/json"
  | "multipart/form-data"
  | "text/plain"
  | "binary"
  | "application/x-www-form-urlencoded"
  | "text/html";

export interface RequestParam {
  id?: string;
  enabled: boolean;
  key: string;
  value: string;
  type?: "text" | "file";
}

export interface BodyParam {
  id?: string;
  enabled: boolean;
  key: string;
  value: string | File | null;
  type?: string;
}

export type PreRequestResult = {
  left: string;
  right: TestResult["envs"];
};

export type TestResult = {
  tests: TestDescriptor[];
  envs: {
    global: TransformedEnvironmentVariable[];
    selected: TransformedEnvironmentVariable[];
  };
};

type TransformedEnvironmentVariable = {
  key: string;
  value: string;
  secret: boolean;
};

export type ExpectResult = {
  status: "pass" | "fail" | "error";
  message: string;
};

export type TestDescriptor = {
  /** The name of the test block */
  descriptor: string;
  /** Expectation results of the test block */
  expectResults: ExpectResult[];
  /** Children test blocks (test blocks inside the test block) */
  children: TestDescriptor[];
};

export interface Request {
  _id?: string;
  collection_id?: string;
  version?: number;

  isModified?: boolean;
  binary?: File;
  tabId?: string;

  parent_id?: string;
  name: string;
  url: string;
  method: string;
  body: string;
  prescript: string;
  postscript: string;
  content_type: ContentType;
  headers: RequestParam[];
  params: RequestParam[];
  path_params: RequestParam[];
  body_params: BodyParam[];
  event?: {
    listen: string;
    script: {
      exec: string[];
      type: string;
      packages: {};
    };
  }[];
  preRequestResult?: PreRequestResult;
}
