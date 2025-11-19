# Quick Start: Setting Up NPM_TOKEN for Automated Publishing

This is a streamlined guide to get automated npm publishing working in 5 minutes.

## What You Need

- Admin access to this GitHub repository
- Access to publish `@voiden/sdk` on npm
- 5 minutes

## Step 1: Create npm Token (2 minutes)

1. Go to **npmjs.com** and log in
2. Click your profile picture → **Access Tokens**
3. Click **Generate New Token** → **Classic Token**
4. Select token type: **Automation**
5. Name it: `GitHub Actions - Voiden SDK`
6. Click **Generate Token**
7. **COPY THE TOKEN** (you won't see it again!)

## Step 2: Add Token to GitHub (2 minutes)

1. Go to this repository on GitHub
2. Click **Settings** (top menu)
3. In left sidebar: **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `NPM_TOKEN` (exactly like this)
6. Secret: Paste the token you copied
7. Click **Add secret**

## Step 3: Verify Setup (1 minute)

1. Go to **Actions** tab in this repository
2. If you see workflows listed, you're all set!
3. The workflows will run automatically:
   - **CI**: On every push and PR
   - **Publish**: When you create a GitHub release

## Done! 🎉

Your repository is now configured for automated publishing.

## Next Steps

### To Publish Your First Release:

```bash
# 1. Update version
npm version patch  # or minor, or major

# 2. Update CHANGELOG.md with release notes

# 3. Commit and push
git add CHANGELOG.md
git commit --amend --no-edit
git push && git push --tags

# 4. Create GitHub release (on GitHub.com)
# Go to Releases → Draft a new release → Select tag → Publish
```

The publish workflow will automatically:
- ✅ Run tests
- ✅ Type check
- ✅ Build
- ✅ Publish to npm

### For Detailed Instructions:

- **First release**: See [RELEASE_PROCESS.md](./RELEASE_PROCESS.md)
- **Full setup guide**: See [SETUP.md](./SETUP.md)
- **Troubleshooting**: Check the Actions tab for error logs

## Common Issues

### "Error: No token found"
- Double-check the secret name is exactly `NPM_TOKEN` (case-sensitive)
- Verify the token hasn't expired

### "403 Forbidden" when publishing
- Ensure your npm account has publish access to `@voiden/sdk`
- Check if the package exists and you're a collaborator

### Workflow not running
- Check the Actions tab is enabled in repository settings
- Ensure workflows are in `.github/workflows/` directory

## Security Note

🔒 **Never commit your npm token to the repository!**

Tokens should only be stored as GitHub secrets.

---

**Need Help?** Open an issue or check [SETUP.md](./SETUP.md) for detailed troubleshooting.
