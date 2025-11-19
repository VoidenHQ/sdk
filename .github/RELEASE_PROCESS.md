# Release Process

This document describes the complete process for releasing a new version of the Voiden SDK to npm.

## Prerequisites Checklist

Before you can publish, ensure you have:

- [ ] **Admin access** to the GitHub repository
- [ ] **npm account** with publish access to `@voiden/sdk`
- [ ] **NPM_TOKEN** configured as a GitHub secret (see [SETUP.md](./SETUP.md))
- [ ] All changes merged to `main` branch
- [ ] All CI checks passing on `main`

## Release Workflow Overview

```
Update Version → Update Changelog → Commit → Tag → Push → Create Release → Auto-Publish
```

## Step-by-Step Release Process

### 1. Prepare the Release

First, ensure you're on the latest `main` branch:

```bash
git checkout main
git pull origin main
```

### 2. Update Version Number

Use npm's built-in version command. Choose the appropriate increment:

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm version patch

# For new features (1.0.0 → 1.1.0)
npm version minor

# For breaking changes (1.0.0 → 2.0.0)
npm version major
```

This will:
- Update `package.json` version
- Create a git commit with message like "1.0.1"
- Create a git tag (e.g., `v1.0.1`)

**Important:** If you want to manually set the version:
```bash
npm version 1.2.3
```

### 3. Update CHANGELOG.md

Edit `CHANGELOG.md` and add the new version section:

```markdown
## [1.0.1] - 2024-11-19

### Fixed
- Fixed issue with XYZ
- Resolved bug in ABC

### Added
- New feature for DEF

### Changed
- Updated behavior of GHI

[1.0.1]: https://github.com/VoidenHQ/sdk/releases/tag/v1.0.1
```

Follow [Keep a Changelog](https://keepachangelog.com/) format.

### 4. Commit the Changelog

```bash
git add CHANGELOG.md
git commit --amend --no-edit
# This adds the changelog to the version commit created by npm version
```

### 5. Push Changes and Tags

```bash
# Push the commit and tags together
git push && git push --tags
```

### 6. Create GitHub Release

Now create a GitHub release which will trigger the publish workflow:

#### Option A: Via GitHub Web Interface

1. Go to your repository on GitHub
2. Click **Releases** → **Draft a new release**
3. Click **Choose a tag** and select the tag you just pushed (e.g., `v1.0.1`)
4. Set **Release title**: `v1.0.1` (match the tag)
5. Add **Release notes** - copy from CHANGELOG.md
6. If it's a pre-release, check **Set as a pre-release**
7. Click **Publish release**

#### Option B: Via GitHub CLI

```bash
# Install gh CLI if not already installed
# brew install gh (macOS)
# See https://cli.github.com/ for other platforms

# Create release
gh release create v1.0.1 \
  --title "v1.0.1" \
  --notes "$(awk '/## \[1.0.1\]/,/## \[/{print}' CHANGELOG.md | head -n -1)"
```

### 7. Monitor the Publish Workflow

1. Go to **Actions** tab in GitHub
2. Find the "Publish to npm" workflow run
3. Watch for successful completion
4. Check for any errors

The workflow will:
- ✅ Checkout code
- ✅ Setup Node.js 20
- ✅ Install dependencies
- ✅ Run tests
- ✅ Run type checking
- ✅ Build the package
- ✅ Publish to npm with provenance

### 8. Verify Publication

After the workflow completes successfully:

1. Check npm: https://www.npmjs.com/package/@voiden/sdk
2. Verify the new version is listed
3. Test installation:
   ```bash
   npm install @voiden/sdk@latest
   ```

## Versioning Guidelines

Follow [Semantic Versioning (SemVer)](https://semver.org/):

- **MAJOR** (X.0.0) - Breaking changes
  - Removed APIs
  - Changed API signatures
  - Changed behavior that could break existing extensions

- **MINOR** (1.X.0) - New features, backward compatible
  - New APIs added
  - New functionality
  - Deprecations (but not removals)

- **PATCH** (1.0.X) - Bug fixes, backward compatible
  - Bug fixes
  - Performance improvements
  - Documentation updates
  - Internal refactoring

## Pre-release Versions

For alpha, beta, or release candidates:

```bash
# Create a pre-release version
npm version prerelease --preid=alpha
# Results in: 1.0.1-alpha.0

npm version prerelease --preid=beta
# Results in: 1.0.1-beta.0

npm version prerelease --preid=rc
# Results in: 1.0.1-rc.0
```

When creating the GitHub release, make sure to check **Set as a pre-release**.

## Rollback Process

If you need to unpublish or rollback:

### Unpublish a Version (within 72 hours)

```bash
npm unpublish @voiden/sdk@1.0.1
```

**Warning:** Can only unpublish within 72 hours of publishing.

### Deprecate a Version

If past 72 hours, deprecate instead:

```bash
npm deprecate @voiden/sdk@1.0.1 "This version has critical bug, please upgrade to 1.0.2"
```

### Publish a Fix Version

The better approach is to publish a fixed version:

```bash
npm version patch
# Update CHANGELOG
# Follow release process
```

## Troubleshooting

### Workflow fails with "Error: No token found"

- Ensure `NPM_TOKEN` secret is set in GitHub repository settings
- Verify the token hasn't expired
- Check token has publish permissions

### Build fails in GitHub Actions

- Ensure all changes are committed
- Run locally first:
  ```bash
  npm ci
  npm run typecheck
  npm test
  npm run build
  ```
- Check error logs in GitHub Actions

### Version already exists on npm

- You cannot republish the same version
- Increment to next version: `npm version patch`
- Update CHANGELOG and follow release process again

### Tag already exists

If you need to redo a release:

```bash
# Delete local tag
git tag -d v1.0.1

# Delete remote tag
git push origin :refs/tags/v1.0.1

# Create new tag
npm version 1.0.1
git push --tags
```

## Automated vs Manual Publishing

### Automated (Recommended)

The current setup uses GitHub Actions to automatically publish when you create a GitHub release. This is recommended because:

- ✅ Ensures tests pass before publishing
- ✅ Creates npm provenance for security
- ✅ Consistent build environment
- ✅ Audit trail in GitHub Actions

### Manual Publishing

If you need to publish manually:

```bash
# Make sure everything is committed
git status

# Run all checks
npm ci
npm run typecheck
npm test
npm run build

# Publish
npm publish --access public
```

**Note:** Manual publishing won't include provenance attestation.

## Emergency Hotfix Process

For critical bugs that need immediate fixing:

1. Create a hotfix branch from the tag:
   ```bash
   git checkout -b hotfix/1.0.1 v1.0.0
   ```

2. Make the fix and commit:
   ```bash
   git commit -m "fix: critical bug in XYZ"
   ```

3. Update version:
   ```bash
   npm version patch
   ```

4. Update CHANGELOG

5. Merge to main:
   ```bash
   git checkout main
   git merge hotfix/1.0.1
   ```

6. Push and create release as normal

## Release Checklist

Use this checklist for every release:

- [ ] All PRs merged to `main`
- [ ] CI passing on `main`
- [ ] Updated version with `npm version`
- [ ] Updated CHANGELOG.md
- [ ] Committed changes
- [ ] Pushed commits and tags
- [ ] Created GitHub release
- [ ] Monitored GitHub Actions workflow
- [ ] Verified package on npm
- [ ] Tested installation
- [ ] Announced release (if needed)

## Post-Release

After a successful release:

1. **Verify** - Test the published package in a fresh project
2. **Announce** - Update any documentation or announce to users
3. **Monitor** - Watch for issues reported by users
4. **Plan** - Start planning next release

## Contact

If you have issues with the release process:
- Check GitHub Actions logs
- Review [SETUP.md](./SETUP.md)
- Open an issue on GitHub
