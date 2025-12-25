# Deploying `royal-kitchen-cabinets` to Vercel

Quick steps to deploy this Next.js app to Vercel (recommended):

- Install deps and copy required pdf worker:

```powershell
cd "c:\Users\Someb\OneDrive\Desktop\HarunRad\Royal Kitchen Cabinets\royal-kitchen-cabinets"
npm install
```

- Build locally (the `build` script ensures `pdf.worker.min.js` is copied into `public/`):

```powershell
npm run build
```

- Push to a Git provider (GitHub/GitLab) and connect the repository in the Vercel dashboard.
- Vercel will run `npm install` then `npm run build` automatically. The `postinstall` script copies `pdf.worker.min.js` into `public/` so the PDF viewer works in production.

Notes:
- The project uses `react-pdf` with a CDN fallback; we also copy the pdf.js worker locally for maximum reliability in production.
- `vercel.json` is present with the Next.js builder configured. You can add environment variables or custom routing there.
