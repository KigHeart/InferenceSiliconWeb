# Advanced Inference Silicon Investors Forum (Accra 2027)

Official web portal for the **Advanced Inference Silicon Investors Forum** (1st Edition · Accra, Ghana · 3–5 March 2027).

---

## 🚀 PowerShell Instructions (Extract, Run & Publish to GitHub Pages)

### Step 1: Open PowerShell in your cloned repository
```powershell
cd C:\path\to\your-cloned-repo
```

### Step 2: Download the latest updated ZIP directly in PowerShell
```powershell
Invoke-WebRequest -Uri "https://ais-dev-rs4hfp2engyanhlg5sfrhe-454260995748.europe-west2.run.app/api/download-zip" -OutFile "inference-silicon-forum.zip"
```
*(Or download directly in your browser from: `https://ais-dev-rs4hfp2engyanhlg5sfrhe-454260995748.europe-west2.run.app/api/download-zip`)*

### Step 3: Extract the ZIP into your repository folder
```powershell
Expand-Archive -Path "inference-silicon-forum.zip" -DestinationPath . -Force
Remove-Item "inference-silicon-forum.zip"
```

### Step 4: Install dependencies & test locally
```powershell
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to preview the live website!

---

## 🌐 Commit & Publish to GitHub Pages

### Step 5: Commit and push everything to GitHub
```powershell
git add .
git commit -m "Deploy Advanced Inference Silicon Investors Forum website"
git push origin main
```

### Step 6: Enable GitHub Pages (30-Second Setup)
1. Go to your repository on **GitHub.com**.
2. Click **Settings** (top tab) ➔ **Pages** (in left sidebar).
3. Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
4. That's it! The included `.github/workflows/deploy.yml` workflow will automatically build your site and give you a live URL:
   `https://<your-username>.github.io/<repo-name>/`

---

## 🛠️ Included in this Release
- **Fidelity to PDF:** Velvet burgundy color palette (`#82163b`), custom silicon die schematic, 125/79 days countdown.
- **Editorial Copy:** Conveners bar (Kiprop Yego & Michael Apasiku), *"Inference is decided by silicon"*, 4 Africa's Advantage cards.
- **Interactivity:** 3-Day interactive Programme schedule, passes selection (Day, Delegate, Investor Full Access, Institutional Table), simulated checkout & digital pass generation.
- **High-Definition Imagery & Video:** Macro AI inference silicon wafer hero photography with interactive video teaser modal.
- **Full-Stack & Static:** Runs on Express backend with REST APIs (`/api/register`, `/api/partner`, `/api/health`) AND compiles directly into static distribution for GitHub Pages.
