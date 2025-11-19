# Hello World Extension

A simple example extension that demonstrates the basics of building a Voiden extension.

## Features

- Registers a `/hello` slash command
- Inserts a greeting message into the editor
- Shows a toast notification

## Installation

```bash
npm install
npm run build
```

## Usage

1. Build the extension: `npm run build`
2. Copy the `dist` folder to your Voiden extensions directory
3. Restart Voiden
4. Type `/hello` in the editor to trigger the command

## What This Demonstrates

- Creating a UIExtension class
- Registering slash commands
- Inserting content into the editor
- Showing toast notifications
- Basic extension lifecycle (onLoad, onUnload)

## File Structure

```
hello-world/
├── src/
│   ├── manifest.json      # Extension metadata
│   ├── extension.ts       # Main extension class
│   └── index.ts          # Entry point
├── dist/                  # Build output
├── package.json
├── tsconfig.json
└── README.md
```

## Learn More

See the [Voiden SDK documentation](https://github.com/VoidenHQ/voiden-sdk) for more details.
