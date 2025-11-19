# @voiden/sdk

[![npm version](https://badge.fury.io/js/@voiden%2Fsdk.svg)](https://www.npmjs.com/package/@voiden/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

Official SDK for building Voiden extensions with support for both UI (renderer process) and Electron (main process).

## What is Voiden?

Voiden is an extensible, privacy-focused editor built on Electron and Tiptap. The Voiden SDK enables developers to create powerful extensions that enhance the editor's functionality, from custom blocks and slash commands to system-level integrations.

## Features

- **🎨 UI Extensions** - Build custom editor blocks, slash commands, sidebars, and panels
- **⚡ Electron Extensions** - Access native APIs, file system, and system integrations
- **🔄 Cross-Process Communication** - Seamless IPC between UI and Electron extensions
- **💾 Storage API** - Extension-scoped persistent storage
- **🔌 Pipeline System** - Hook into request/response lifecycle
- **🌍 Environment API** - Secure access to environment variables
- **📦 Helper System** - Cross-extension communication and shared functionality
- **🔒 Type-Safe** - Full TypeScript support with complete type definitions

## Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **TypeScript** 5.x knowledge recommended
- **React** 18.x (for UI extensions)
- **Tiptap** 2.x (for custom editor blocks)

## Installation

```bash
npm install @voiden/sdk
# or
yarn add @voiden/sdk
```

### Installing Peer Dependencies

For UI extensions, you'll also need to install the required peer dependencies:

```bash
npm install react react-dom @tiptap/core @tiptap/pm @tiptap/react
```

## Quick Start

Create your first extension in minutes:

```typescript
import { UIExtension } from '@voiden/sdk/ui';

export class MyExtension extends UIExtension {
  name = 'my-first-extension';
  version = '1.0.0';
  description = 'My first Voiden extension';

  async onLoad() {
    this.registerSlashCommand({
      name: 'greet',
      label: 'Say Hello',
      slash: '/hello',
      description: 'Insert a greeting',
      action: (editor) => {
        editor.commands.insertContent('Hello from my extension!');
      },
    });
  }
}
```

## Architecture

The SDK is divided into three parts:

- **UI Extensions** (`@voiden/sdk/ui`) - Run in the renderer process, handle editor blocks, UI components
- **Electron Extensions** (`@voiden/sdk/electron`) - Run in the main process, handle IPC, file system, native APIs
- **Shared** (`@voiden/sdk/shared`) - Shared types and utilities

## UI Extension Example

```typescript
import { UIExtension } from '@voiden/sdk/ui';
import { MyCustomNode } from './nodes/MyCustomNode';

export class MyUIExtension extends UIExtension {
  name = 'my-ui-extension';
  version = '1.0.0';
  description = 'My awesome UI extension';

  async onLoad() {
    // Register a custom block
    this.registerBlock({
      name: 'my-custom-block',
      label: 'My Custom Block',
      node: MyCustomNode,
      icon: 'box',
    });

    // Register a slash command
    this.registerSlashCommand({
      name: 'insert-custom',
      label: 'Custom Block',
      slash: '/custom',
      description: 'Insert a custom block',
      action: (editor) => {
        editor.commands.insertContent({ type: 'my-custom-block' });
      },
    });

    // Register a sidebar
    this.registerSidebar('right', {
      id: 'my-sidebar',
      title: 'My Sidebar',
      component: MySidebarComponent,
    });
  }
}
```

## Electron Extension Example

```typescript
import { ElectronExtension } from '@voiden/sdk/electron';

export class MyElectronExtension extends ElectronExtension {
  name = 'my-electron-extension';
  version = '1.0.0';
  description = 'My awesome Electron extension';

  async onLoad() {
    // Register IPC handler
    this.registerIPCHandler('my-channel', async (data) => {
      const result = await this.processData(data);
      return { success: true, result };
    });

    // Register custom protocol
    this.registerProtocol({
      scheme: 'myapp',
      handler: async (url) => {
        return { data: 'Custom protocol response' };
      },
    });

    // Watch file system
    this.watchFileSystem({
      path: '/path/to/watch',
      onChange: (event, path) => {
      },
    });
  }

  private async processData(data: any) {
    // Custom processing logic
    return data;
  }
}
```

## Full Extension (UI + Electron)

Many extensions need both UI and Electron components:

```typescript
// index.ts
import { MyUIExtension } from './ui';
import { MyElectronExtension } from './electron';

export const ui = new MyUIExtension();
export const electron = new MyElectronExtension();
```

## API Reference

### UI Extension APIs

#### Core Methods
- `registerBlock(block: BlockDefinition)` - Register a Tiptap node as a custom block
- `registerSlashCommand(command: SlashCommandDefinition)` - Register a slash command
- `registerSlashGroup(group: SlashCommandGroup)` - Register a group of slash commands
- `registerSidebar(side: 'left' | 'right', tab: TabDefinition)` - Register a sidebar tab
- `registerPanel(panel: PanelDefinition)` - Register a bottom panel
- `showModal(modal: ModalDefinition)` - Show a modal dialog
- `showToast(message: string, type?: 'info' | 'success' | 'error')` - Show a toast notification
- `getEditor(type?: 'main' | 'note')` - Get the active editor instance

#### Advanced APIs
- `storage` - Extension-scoped persistent storage
- `pipeline` - Hook into request/response lifecycle
- `environment` - Secure environment variable access
- `helpers` - Access helpers from other extensions

### Electron Extension APIs

#### Core Methods
- `registerIPCHandler(channel: string, handler: Function)` - Register an IPC message handler
- `sendToRenderer(channel: string, data: any)` - Send message to renderer process
- `registerMenuItem(menu: string, item: MenuItemDefinition)` - Register a menu item
- `registerProtocol(handler: ProtocolHandler)` - Register custom URL protocol handler
- `watchFileSystem(watcher: FSWatcherDefinition)` - Watch file system changes
- `spawn(command: string, args: string[])` - Spawn a child process
- `exec(command: string)` - Execute a shell command

#### Advanced APIs
- `storage` - Extension-scoped persistent storage
- `app` - Access to Electron app instance
- `mainWindow` - Access to main BrowserWindow

### Shared Types

All shared types and utilities are available from `@voiden/sdk/shared`.

For complete API documentation with detailed examples, see the [TypeScript definitions](./src) or check out our [examples](./examples).

## Examples

The [examples](./examples) directory contains complete, working examples:

- **[Hello World](./examples/hello-world)** - Basic slash command and toast notifications
- More examples coming soon!

### Using Examples

Each example is a standalone project you can use as a template:

```bash
cd examples/hello-world
npm install
npm run build
```

Then copy the built extension to your Voiden extensions directory.

## Troubleshooting

### Common Issues

**TypeScript errors about missing types**
- Ensure all peer dependencies are installed: `npm install react react-dom @tiptap/core @tiptap/pm @tiptap/react`
- Check that your `tsconfig.json` includes `"moduleResolution": "node"`

**Extension not loading in Voiden**
- Verify your build output is in the correct format (ESM)
- Check the browser console for error messages
- Ensure your extension class is properly exported

**IPC handlers not receiving messages**
- Verify the channel name matches between UI and Electron extensions
- Check that the Electron extension is loaded before sending messages
- Use `await` when sending IPC messages that expect responses

**Build errors**
- Run `npm run typecheck` to see detailed TypeScript errors
- Ensure you're using Node.js 18.x or higher
- Clear `dist` folder and rebuild: `rm -rf dist && npm run build`

### Getting Help

- Check [existing issues](https://github.com/VoidenHQ/sdk/issues)
- Read the [examples](./examples) for working code
- Open a [new issue](https://github.com/VoidenHQ/sdk/issues/new) with a minimal reproduction

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development

```bash
# Clone the repository
git clone https://github.com/VoidenHQ/sdk.git
cd sdk

# Install dependencies
npm install

# Build the SDK
npm run build

# Watch mode for development
npm run dev

# Type checking
npm run typecheck
```

## Security

Found a security vulnerability? Please see our [Security Policy](./SECURITY.md) for reporting instructions.

## License

MIT - see [LICENSE](./LICENSE) file for details.

## Links

- [npm Package](https://www.npmjs.com/package/@voiden/sdk)
- [GitHub Repository](https://github.com/VoidenHQ/sdk)
- [Issue Tracker](https://github.com/VoidenHQ/sdk/issues)
- [Changelog](./CHANGELOG.md)

## Community

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

---

Built with ❤️ by the Voiden team
