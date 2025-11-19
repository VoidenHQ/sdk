# GitHub Actions Setup Guide

This guide will help you configure the GitHub repository for automated publishing to npm.

## Prerequisites

1. A GitHub repository with admin access
2. An npm account
3. The package already published to npm (or ready for first publish)

## Setting Up NPM_TOKEN

To enable automated publishing, you need to add your npm token as a GitHub secret:

### Step 1: Create an npm Access Token

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Click on your profile picture → **Access Tokens**
3. Click **Generate New Token** → **Classic Token**
4. Select **Automation** token type (recommended for CI/CD)
5. Give it a descriptive name (e.g., "GitHub Actions - Voiden SDK")
6. Click **Generate Token**
7. **Copy the token immediately** (you won't be able to see it again)

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste the npm token you copied
6. Click **Add secret**

### Step 3: Verify Setup

The workflows are already configured in `.github/workflows/`:

- **ci.yml** - Runs on every push and PR (tests, type check, build)
- **publish.yml** - Runs when a GitHub release is published (publishes to npm)

You can verify the setup by:

1. Pushing a commit to `main` branch
2. Check the **Actions** tab in your GitHub repository
3. You should see the CI workflow running

## Publishing a New Version

### Automated Publishing (Recommended)

1. Update version in `package.json`:
   ```bash
   npm version patch  # or minor, or major
   ```

2. Update `CHANGELOG.md` with release notes

3. Commit and push:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: release v1.0.1"
   git push
   ```

4. Create a GitHub release:
   - Go to **Releases** → **Draft a new release**
   - Click **Choose a tag** → Create new tag (e.g., `v1.0.1`)
   - Set release title (e.g., "v1.0.1")
   - Add release notes from CHANGELOG
   - Click **Publish release**

5. The GitHub Action will automatically:
   - Run all tests and checks
   - Build the package
   - Publish to npm with provenance

### Manual Publishing

If you prefer to publish manually:

```bash
npm run typecheck
npm test
npm run build
npm publish
```

## Troubleshooting

### Publish workflow fails with authentication error

- Verify the `NPM_TOKEN` secret is set correctly
- Ensure the token has **Automation** permissions
- Check that the token hasn't expired

### Build fails on GitHub Actions

- Ensure all dependencies are in `package.json`
- Check that tests pass locally: `npm test`
- Verify builds work locally: `npm run build`

### Package not appearing on npm

- Check the **Actions** tab for error messages
- Verify package name isn't already taken
- Ensure `publishConfig.access` is set to `"public"` for scoped packages

## Security Notes

- **Never commit** npm tokens to the repository
- Use **Automation** tokens for GitHub Actions (not Classic tokens with full access)
- Rotate tokens periodically for security
- Consider using npm's two-factor authentication

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Token Documentation](https://docs.npmjs.com/about-access-tokens)
- [npm Provenance](https://docs.npmjs.com/generating-provenance-statements)
