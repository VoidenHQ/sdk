# GitHub Configuration

This directory contains GitHub-specific configuration files for the Voiden SDK repository.

## Contents

### Workflows

Located in `workflows/`, these GitHub Actions automate the CI/CD pipeline:

- **[ci.yml](./workflows/ci.yml)** - Continuous Integration
  - Runs on every push to `main` and all pull requests
  - Tests on Node.js 20.x and 22.x
  - Runs type checking, tests, and builds
  - Validates package.json format

- **[publish.yml](./workflows/publish.yml)** - Automated Publishing
  - Triggers when a GitHub release is published
  - Runs all CI checks
  - Publishes to npm with provenance
  - Requires `NPM_TOKEN` secret

### Documentation

- **[SETUP.md](./SETUP.md)** - Initial setup guide for configuring npm token and GitHub Actions
- **[RELEASE_PROCESS.md](./RELEASE_PROCESS.md)** - Complete guide for releasing new versions

## Quick Links

### For Contributors
- See [SETUP.md](./SETUP.md) for setting up automated publishing
- See [../CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines

### For Maintainers
- See [RELEASE_PROCESS.md](./RELEASE_PROCESS.md) for releasing new versions
- Check [Actions tab](../../actions) for workflow runs

## Workflow Status

[![CI](https://github.com/VoidenHQ/sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/VoidenHQ/sdk/actions/workflows/ci.yml)

## Getting Started

1. **First time setup**: Follow [SETUP.md](./SETUP.md) to configure npm token
2. **Making changes**: Submit PRs - CI will run automatically
3. **Releasing**: Follow [RELEASE_PROCESS.md](./RELEASE_PROCESS.md) to publish new versions

## Troubleshooting

### CI Failing

1. Check the [Actions tab](../../actions) for error details
2. Run tests locally: `npm test`
3. Run type check: `npm run typecheck`
4. Ensure Node.js 20.x is installed

### Publish Failing

1. Verify `NPM_TOKEN` secret is configured correctly
2. Check you have publish permissions on npm
3. Ensure version in package.json is incremented
4. Review publish logs in Actions tab

For more help, see the troubleshooting sections in:
- [SETUP.md](./SETUP.md#troubleshooting)
- [RELEASE_PROCESS.md](./RELEASE_PROCESS.md#troubleshooting)
