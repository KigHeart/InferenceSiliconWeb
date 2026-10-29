import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// In-memory store for registrations and partnership enquiries
interface RegistrationRecord {
  id: string;
  passType: string;
  passName: string;
  amountUSD: number;
  fullName: string;
  email: string;
  organization: string;
  jobTitle?: string;
  country?: string;
  phone?: string;
  dietaryOrAccessibility?: string;
  paymentMethod: string;
  paymentStatus: string;
  registrationCode: string;
  createdAt: string;
}

interface PartnerRecord {
  id: string;
  tier: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
  submittedAt: string;
}

const registrations: RegistrationRecord[] = [];
const partnerEnquiries: PartnerRecord[] = [];

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    forum: 'Advanced Inference Silicon Investors Forum Accra 2027',
    time: new Date().toISOString(),
  });
});

// 2. Process Registration
app.post('/api/register', (req: Request, res: Response) => {
  const data = req.body;
  if (!data.fullName || !data.email || !data.passType) {
    return res.status(400).json({ error: 'Missing required attendee fields.' });
  }

  const newRegistration: RegistrationRecord = {
    id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    passType: data.passType,
    passName: data.passName || 'Delegate Pass',
    amountUSD: data.amountUSD || 450,
    fullName: data.fullName,
    email: data.email,
    organization: data.organization || 'Independent',
    jobTitle: data.jobTitle || '',
    country: data.country || 'Ghana',
    phone: data.phone || '',
    dietaryOrAccessibility: data.dietaryOrAccessibility || '',
    paymentMethod: data.paymentMethod || 'credit_card',
    paymentStatus: 'confirmed',
    registrationCode: data.registrationCode || `AISF-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
  };

  registrations.push(newRegistration);
  console.log(`[Registration] Confirmed pass for ${newRegistration.fullName} (${newRegistration.passName})`);

  res.status(201).json({
    success: true,
    registration: newRegistration,
    message: 'Registration confirmed successfully.',
  });
});

// 3. List registrations
app.get('/api/registrations', (_req: Request, res: Response) => {
  res.json({
    total: registrations.length,
    registrations,
  });
});

// 4. Partner Enquiry
app.post('/api/partner', (req: Request, res: Response) => {
  const data = req.body;
  if (!data.companyName || !data.email) {
    return res.status(400).json({ error: 'Company name and email are required.' });
  }

  const newPartner: PartnerRecord = {
    id: `partner_${Date.now()}`,
    tier: data.tier || 'headline',
    companyName: data.companyName,
    contactName: data.contactName || 'Representative',
    email: data.email,
    phone: data.phone || '',
    country: data.country || '',
    message: data.message || '',
    submittedAt: new Date().toISOString(),
  };

  partnerEnquiries.push(newPartner);
  console.log(`[Partnership] New enquiry from ${newPartner.companyName} for ${newPartner.tier} tier.`);

  res.status(201).json({
    success: true,
    enquiry: newPartner,
    message: 'Partnership enquiry submitted to convening team.',
  });
});

// 5. Download complete codebase ZIP
app.get(['/inference-silicon-forum.zip', '/api/download-zip'], async (_req: Request, res: Response) => {
  try {
    const zipPath = path.join(__dirname, 'inference-silicon-forum.zip');
    
    // If pre-generated zip exists on disk, stream it
    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="inference-silicon-forum.zip"');
      return fs.createReadStream(zipPath).pipe(res);
    }

    // Otherwise generate dynamic zip on the fly
    const zip = new JSZip();
    const ignoreList = ['node_modules', '.git', 'dist', '.aistudio', 'inference-silicon-forum.zip'];

    function addDirToZip(dirPath: string, zipFolder: JSZip) {
      const entries = fs.readdirSync(dirPath);
      for (const entry of entries) {
        if (ignoreList.includes(entry)) continue;
        const fullPath = path.join(dirPath, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          addDirToZip(fullPath, zipFolder.folder(entry)!);
        } else {
          zipFolder.file(entry, fs.readFileSync(fullPath));
        }
      }
    }

    addDirToZip(__dirname, zip);

    const buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="inference-silicon-forum.zip"');
    res.send(buffer);
  } catch (error) {
    console.error('Failed to generate ZIP:', error);
    res.status(500).json({ error: 'Could not generate ZIP archive.' });
  }
});

// Mount Vite or static build
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Advanced Inference Silicon Forum server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
