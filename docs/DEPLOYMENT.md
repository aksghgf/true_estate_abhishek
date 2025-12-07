# TruEstate Sales Management System - Deployment Guide

This guide covers deploying both the frontend and backend of the TruEstate Sales Management System.

## Table of Contents
- [Quick Deployment Options](#quick-deployment-options)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Variables](#environment-variables)
- [Production Checklist](#production-checklist)

---

## Quick Deployment Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

Both frontend and backend can be deployed to Vercel with zero configuration.

**Steps:**
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy from root directory:
   ```bash
   vercel
   ```

3. Vercel will auto-detect the monorepo and deploy both projects.

### Option 2: Separate Deployments

- **Frontend**: Vercel, Netlify, or Cloudflare Pages
- **Backend**: Railway, Render, Heroku, or DigitalOcean

---

## Backend Deployment

### Prerequisites
- CSV data file must be included: `backend/data/truestate_assignment_dataset.csv`
- Git repository (for most platforms)

### Deploy to Railway (Recommended for Backend)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize and Deploy:**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Set Environment Variables:**
   ```bash
   railway variables set PORT=5000
   railway variables set NODE_ENV=production
   ```

5. **Get your backend URL:**
   ```bash
   railway domain
   ```

### Deploy to Render

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: truestate-backend
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV` = `production`
     - `PORT` = `5000`

5. Click "Create Web Service"

### Deploy to Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create truestate-backend

# Add buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git subtree push --prefix backend heroku main

# Set environment variables
heroku config:set NODE_ENV=production
```

### Manual VPS Deployment (DigitalOcean, AWS EC2, etc.)

1. **SSH into your server**
2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone and setup:**
   ```bash
   git clone <your-repo-url>
   cd True_Estate/backend
   npm install --production
   ```

4. **Install PM2 for process management:**
   ```bash
   sudo npm install -g pm2
   pm2 start src/index.js --name truestate-backend
   pm2 save
   pm2 startup
   ```

5. **Setup Nginx reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Frontend Deployment

### Prerequisites
- Update `VITE_API_URL` to point to your deployed backend

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the app:**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

4. **Set Environment Variables:**
   - Netlify Dashboard → Site Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`

### Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pages → Create a project → Connect to Git
3. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `frontend`
   - **Environment variables**: `VITE_API_URL` = your backend URL

### Manual Static Hosting

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload the `dist` folder to:**
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps
   - Any static file hosting

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
# Add any other vars as needed
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com
```

**Important**: 
- Never commit `.env` files to Git
- Set environment variables in your hosting platform's dashboard
- Frontend env vars must start with `VITE_` to be accessible

---

## Production Checklist

### Backend
- [ ] CSV data file is included and accessible
- [ ] Environment variables are set
- [ ] CORS is configured for your frontend domain
- [ ] Add rate limiting (optional but recommended)
- [ ] Set up monitoring (e.g., Sentry, LogRocket)
- [ ] Enable HTTPS
- [ ] Configure proper logging

### Frontend
- [ ] API URL points to production backend
- [ ] Build runs without errors (`npm run build`)
- [ ] All assets load correctly
- [ ] Test on various browsers
- [ ] Verify responsive design
- [ ] Configure CDN (optional)
- [ ] Set up analytics (optional)

### Security
- [ ] Enable HTTPS on both frontend and backend
- [ ] Configure Content Security Policy
- [ ] Set up proper CORS headers
- [ ] Sanitize user inputs
- [ ] Rate limit API endpoints

---

## Full-Stack Deployment Example

### Using Vercel for Both (Simplest)

1. **Push code to GitHub**

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel detects the monorepo automatically

3. **Configure Projects:**
   - Backend will deploy from `/backend`
   - Frontend will deploy from `/frontend`

4. **Set Environment Variables:**
   - Backend: Set `NODE_ENV=production`
   - Frontend: Set `VITE_API_URL=<backend-vercel-url>`

5. **Done!** Both projects are deployed and auto-deploy on git push

### Using Railway + Vercel (Recommended)

1. **Backend to Railway:**
   ```bash
   cd backend
   railway init
   railway up
   railway domain  # Get your backend URL
   ```

2. **Frontend to Vercel:**
   ```bash
   cd frontend
   vercel --prod
   ```
   - Set `VITE_API_URL` in Vercel dashboard

---

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Troubleshooting

### Backend won't start
- Check CSV file path is correct
- Verify all dependencies are installed
- Check environment variables are set
- Review logs for errors

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check CORS headers on backend
- Ensure backend is accessible (test with curl/Postman)
- Check browser console for errors

### Build fails
- Run `npm install` again
- Clear `node_modules` and reinstall
- Check Node.js version (use v18 or v20)
- Review build logs for specific errors

---

## Cost Estimates

### Free Tier Options (Perfect for Demo/Portfolio)
- **Vercel**: 100GB bandwidth/month (both)
- **Railway**: $5 free credit/month (backend)
- **Render**: 750 hours/month (backend)
- **Netlify**: 100GB bandwidth/month (frontend)

### Paid Options (Production)
- **Railway**: ~$5-20/month
- **Render**: ~$7-25/month
- **Vercel Pro**: $20/month
- **DigitalOcean Droplet**: $6-12/month

---

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review application logs
3. Test locally first with production build
4. Verify environment variables

**Quick Test Production Build Locally:**
```bash
# Backend
cd backend
NODE_ENV=production npm start

# Frontend  
cd frontend
npm run build && npm run preview
```
