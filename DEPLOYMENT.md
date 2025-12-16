# Deployment Guide - GitHub Pages

This guide will walk you through deploying your SPA website to GitHub Pages.

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `spa-website`)
5. Choose **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license (you already have these)
7. Click "Create repository"

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Navigate to your project directory (if not already there)
cd /Users/nitingupta/spa-website

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/spa-website.git

# Push your code to GitHub
git branch -M main
git push -u origin main
`````

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username and `spa-website` with your repository name if different.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**

## Step 4: Access Your Deployed Website

After a few minutes, your website will be live at:
```
https://YOUR_USERNAME.github.io/spa-website/
```

**Note:** It may take 1-5 minutes for the site to be available after enabling Pages.

## Troubleshooting

### If your site shows a 404 error:
- Wait a few minutes (deployment can take up to 5 minutes)
- Check that you selected the correct branch (`main`) and folder (`/ (root)`)
- Verify your `index.html` is in the root directory
- Check the **Actions** tab in your GitHub repository for any deployment errors

### If you need to update your site:
Simply push new changes to the `main` branch:
```bash
git add .
git commit -m "Update website"
git push
```
The site will automatically update within a few minutes.

## Alternative: Using GitHub CLI

If you have GitHub CLI installed, you can create and push in one go:

```bash
gh repo create spa-website --public --source=. --remote=origin --push
```

Then follow Step 3 to enable GitHub Pages.


