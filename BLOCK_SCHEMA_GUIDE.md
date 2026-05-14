# Block Schema Guide — Headless Normalization

When building plugins for Voiden, you often define custom UI components using TipTap nodes. However, when your plugin runs in a headless environment (like `voiden-runner` for CI/CD), there is no DOM or TipTap instance.

To ensure your data is correctly parsed and has proper default values in headless mode, you must register a **Block Schema**.

---

## What is a Block Schema?

A Block Schema tells the runner about the structure of your custom blocks. It primarily defines:
1.  **The Node Name**: Matches the `type` property in the `.void` JSON (or TipTap node name).
2.  **Attribute Defaults**: Ensures that if an attribute is missing in the source file, it is populated with a default value before your request builder or hooks see it.

---

## How to Register

Registration happens inside your plugin's `runner.ts` entry point, within the `onload` method of your `RunnerFactory`.

```typescript
import type { RunnerFactory, RunnerContext } from '@voiden/sdk/runner'

const myPluginRunner: RunnerFactory = (context: RunnerContext) => {
  return {
    onload() {
      context.registerBlockSchema({
        name: 'my_custom_block',
        attrs: {
          url: { default: 'https://api.example.com' },
          retries: { default: 3 },
          enabled: { default: true }
        }
      })
    }
  }
}

export default myPluginRunner
```

---

## Schema Definition Structure

The `BlockSchemaDef` interface consists of:

### `name: string`
The unique identifier for your block. This must match the TipTap node name you used in your UI plugin (e.g., `request`, `json_body`, `gqlquery`).

### `attrs: Record<string, BlockAttrDef>`
A map of attribute names to their definitions.
- **`default`**: The value to provide if the attribute is missing in the document.

---

## Why is this necessary?

### 1. Data Integrity
Without a schema, the runner treats your blocks as raw JSON. If a user creates a `.void` file that omits an optional attribute, your logic might encounter `undefined` errors. `registerBlockSchema` ensures your code always receives a predictable object.

### 2. UI Consistency
In the Voiden desktop app, TipTap handles default attributes via `addAttributes()`. By registering a Block Schema in your runner, you ensure the **headless behavior exactly matches the UI behavior**.

### 3. Documentation & Discovery
Registering schemas allows the runner to potentially validate `.void` files or provide "help" information about what attributes a block supports.

---

## Example: REST API Plugin

Here is how the core REST API plugin registers its `json_body` block:

```typescript
context.registerBlockSchema({
  name: 'json_body',
  attrs: {
    body: { default: '' },
    contentType: { default: 'application/json' }
  }
})
```

When the runner encounters a block of type `json_body`, it ensures the `attrs` object always contains `body` and `contentType`, even if they weren't explicitly saved in the file.
