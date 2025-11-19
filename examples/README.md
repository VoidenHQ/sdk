# Voiden SDK Examples

This directory contains example extensions demonstrating various features of the Voiden SDK.

## Available Examples

### [Hello World](./hello-world)
A simple extension that demonstrates the basics:
- Registering slash commands
- Inserting content into the editor
- Showing toast notifications

## Running the Examples

Each example is a standalone project. To run an example:

```bash
cd examples/hello-world
npm install
npm run build
```

Then copy the `dist` folder to your Voiden extensions directory and restart Voiden.

## Creating Your Own Extension

Use these examples as templates for your own extensions. The basic structure is:

1. Create a `manifest.json` with extension metadata
2. Create an extension class that extends `UIExtension`
3. Implement the `onLoad()` method to register your features
4. Build and test

See the [main SDK documentation](../README.md) for full API reference.
