# Quick Deployment Guide

## Step 1: Initialize Git Repository

```bash
cd server
git init
git add .
git commit -m "backend ready"
git branch -M main
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New Repository"
3. Name it (e.g., `expense-tracker-backend`)
4. Don't initialize with README (we already have one)
5. Copy the repository URL

## Step 3: Push to GitHub

Replace `YOUR_URL` with your actual GitHub repository URL:

```bash
git remote add origin YOUR_URL
git push -u origin main
```

## Step 4: Deploy to Render (Recommended - Free Tier Available)

1. Go to [Render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select your repository
5. Configure:
   - **Name**: `expense-tracker-api` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free
6. Click "Create Web Service"
7. Wait for deployment (usually 2-3 minutes)
8. Your API will be live at: `https://your-app-name.onrender.com`

## Step 5: Test Your Deployed API

Replace `YOUR_RENDER_URL` with your actual Render URL:

```bash
# Test GET endpoint
curl https://YOUR_RENDER_URL/expenses

# Test POST endpoint
curl -X POST https://YOUR_RENDER_URL/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Expense","amount":10.00}'
```

## Alternative: Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js and deploys
6. Get your URL from the deployment settings

## Alternative: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to server directory
cd server

# Deploy
vercel
```

## Important Notes

- **Database**: SQLite works for development, but for production consider:
  - PostgreSQL (Render offers free tier)
  - MongoDB Atlas (free tier available)
  - Supabase (free tier available)

- **Environment Variables**: Set `PORT` if needed (most platforms set this automatically)

- **CORS**: Update CORS settings in production to only allow your frontend domain

## Updating Your Deployment

After making changes:

```bash
git add .
git commit -m "description of changes"
git push
```

Most platforms will automatically redeploy when you push to GitHub.
