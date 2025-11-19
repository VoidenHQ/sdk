# Contributing to Voiden SDK

Thank you for your interest in contributing to the Voiden SDK! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/sdk.git`
3. Add upstream remote: `git remote add upstream https://github.com/VoidenHQ/sdk.git`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- TypeScript knowledge

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev

# Run type checking
npm run typecheck
```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Fix issues in existing code
- **New features** - Add new extension APIs or capabilities
- **Documentation** - Improve README, add examples, write guides
- **Examples** - Create example extensions demonstrating SDK features
- **Tests** - Add or improve test coverage

### Before You Start

1. Check if an issue already exists for what you want to work on
2. For major changes, open an issue first to discuss your proposal
3. For bug fixes, search existing issues or create a new one
4. Comment on the issue to let others know you're working on it

## Pull Request Process

1. **Update your fork** with the latest changes from upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Make your changes** following the coding guidelines below

3. **Test your changes**:
   ```bash
   npm run build
   npm run typecheck
   ```

4. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add new API for custom panels"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `chore:` - Maintenance tasks
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** from your fork to the main repository

7. **Address review feedback** - Be responsive to comments and requested changes

### Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Include a clear description of what the PR does
- Reference any related issues (e.g., "Fixes #123")
- Update documentation if you're changing APIs
- Add examples if introducing new features
- Ensure all checks pass before requesting review

## Coding Guidelines

### TypeScript Style

- Use TypeScript strict mode
- Provide explicit type annotations for public APIs
- Use interfaces for public types
- Document all public APIs with JSDoc comments
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names

### Code Organization

- Keep files focused on a single responsibility
- Export only what's necessary for the public API
- Group related functionality together
- Maintain consistent file structure

### Documentation

- Add JSDoc comments to all public classes, methods, and types
- Include `@example` tags showing usage
- Document parameters with `@param` and return values with `@returns`
- Keep comments up-to-date when changing code

### Example

```typescript
/**
 * Registers a custom block in the editor
 *
 * @param block - The block definition
 * @example
 * ```ts
 * this.registerBlock({
 *   name: 'my-block',
 *   label: 'My Block',
 *   node: MyBlockNode,
 * });
 * ```
 */
registerBlock(block: BlockDefinition): void {
  // Implementation
}
```

## Reporting Bugs

When reporting bugs, include:

- **Description** - Clear description of the bug
- **Steps to reproduce** - Minimal steps to reproduce the issue
- **Expected behavior** - What you expected to happen
- **Actual behavior** - What actually happened
- **Environment** - OS, Node.js version, SDK version
- **Code sample** - Minimal reproducible example
- **Screenshots** - If applicable

Use the bug report template when creating issues.

## Suggesting Enhancements

For feature requests:

- **Use case** - Describe the problem you're trying to solve
- **Proposed solution** - Your suggested approach
- **Alternatives** - Other solutions you've considered
- **Examples** - Code examples showing how it would work

## Questions?

If you have questions:

- Check existing [GitHub Issues](https://github.com/VoidenHQ/sdk/issues)
- Read the [documentation](https://github.com/VoidenHQ/sdk#readme)
- Open a new issue with the "question" label

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
