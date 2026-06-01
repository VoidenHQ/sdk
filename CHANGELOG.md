# Changelog

All notable changes to the Voiden SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-01

### Added
- `PluginSettingField` discriminated union type for declarative plugin settings fields (`text` | `number` | `select` | `toggle`)
- `PluginHelpCommand` interface for registering help-panel commands with a React component
- `registerTopBarItem(item)` method on `PluginContext` — inject icon buttons into the top navigation bar
- `registerHelpCommand(cmd)` method on `PluginContext` — register commands in the help registry
- Exported `PluginHelpCommand` and `PluginSettingField` from `@voiden/sdk/ui`

### Changed
- `PluginSettingsSection`: replaced `component: React.ComponentType<any>` with `fields: PluginSettingField[]` — plugin settings are now fully declarative; values are auto-saved to `userData/plugin-settings/{pluginId}.json`

### Migration
If you were passing a custom `component` to `registerSettings`, replace it with a `fields` array:
```ts
// Before
context.ui.registerSettings({ id: 'my-plugin', title: 'My Plugin', component: MySettingsComponent });

// After
context.ui.registerSettings({
  id: 'my-plugin',
  title: 'My Plugin',
  fields: [
    { type: 'toggle', key: 'enabled', label: 'Enable feature', defaultValue: true },
    { type: 'text',   key: 'label',   label: 'Label', defaultValue: 'My Plugin' },
    { type: 'number', key: 'delay',   label: 'Delay (ms)', defaultValue: 1000, min: 0, max: 10000 },
    { type: 'select', key: 'mode',    label: 'Mode',
      options: [{ label: 'Fast', value: 'fast' }, { label: 'Slow', value: 'slow' }],
      defaultValue: 'fast' },
  ],
});
```

## [1.0.0] - 2024-11-19

### Added
- Initial public release of Voiden SDK
- UIExtension base class for building UI extensions
- ElectronExtension base class for building Electron extensions
- Shared types and utilities
- Pipeline API for request/response handling
- Environment API for secure environment variable access
- Helper system for cross-extension communication
- Block registration system for custom Tiptap nodes
- Slash command registration
- Sidebar and panel registration
- Modal and toast notification APIs
- Extension storage API
- TypeScript support with full type definitions

### Features
- **UI Extensions**: Build extensions that run in the renderer process
  - Custom editor blocks
  - Slash commands
  - Sidebars and panels
  - Request pipeline hooks
  - Environment variable access

- **Electron Extensions**: Build extensions that run in the main process
  - IPC handlers
  - File system access
  - Custom protocols
  - Menu items

- **Shared Utilities**: Types and utilities shared between UI and Electron
  - Request/Response types
  - JSONC parser
  - Common interfaces

[1.1.0]: https://github.com/VoidenHQ/sdk/releases/tag/v1.1.0
[1.0.0]: https://github.com/VoidenHQ/voiden-sdk/releases/tag/v1.0.0
