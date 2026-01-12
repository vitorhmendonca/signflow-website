# GHL Integration Setup Guide

## ✅ What I Built:

1. **API Endpoint** (`/api/submit-lead.ts`) - Handles form submissions
2. **GHL Helper** (`/api/ghl.ts`) - Creates contacts in GoHighLevel
3. **Updated Forms**:
   - ContactSection.tsx - Main contact form
   - CaseStudyCTA.tsx - Case study form
4. **Environment Setup** - `.env.local` for credentials

## 🔐 What YOU Need to Do:

### Step 1: Get Your GHL Location ID

1. Log into GoHighLevel
2. Look at your browser URL: `app.gohighlevel.com/v2/location/[LOCATION_ID]/...`
3. Copy that LOCATION_ID (looks like: `ECMe92cgMRV78rF6nT`)

### Step 2: Add Credentials Locally

Open the file `.env.local` in your project root and replace:

```
GHL_API_KEY=your_api_key_here
GHL_LOCATION_ID=your_location_id_here
```

With your actual values:

```
GHL_API_KEY=pit-da433aec-5874-4797-856c-49062d5d899b
GHL_LOCATION_ID=ECMe92cgMRV78rF6nT
```

(Use your real key, not the example above)

### Step 3: Test Locally

```bash
npm run dev
```

Go to http://localhost:8081 and test the contact form. Check your GHL for the new contact!

## 🚀 Deploying to Vercel:

### After You Deploy (I'll Help):

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add two variables:
   - Name: `GHL_API_KEY`, Value: [your API key]
   - Name: `GHL_LOCATION_ID`, Value: [your location ID]
3. Redeploy (Vercel will prompt you)

## 📋 What Happens When Forms Submit:

1. User fills form → Submits
2. Data sent to `/api/submit-lead` (your Vercel function)
3. Function validates data
4. Creates contact in GHL with:
   - Name, email, phone
   - Tags: "Website Lead" + "Contact Form" or "Case Study Form"
   - Custom field: comment/preferred time
   - Source tracking
5. Returns success/error to user

## 🏷️ Tags Applied:

- **Contact Form**: `Website Lead`, `Contact Form`
- **Case Study Form**: `Website Lead`, `Case Study Form`

You can create automations in GHL based on these tags!

## 🔒 Security Notes:

- ✅ API keys never exposed to browser
- ✅ `.env.local` git-ignored (never pushed to GitHub)
- ✅ Vercel encrypts environment variables
- ✅ Server-side validation
- ✅ CORS protection

## 🐛 Troubleshooting:

**"GHL API credentials not configured"**
→ Check `.env.local` has correct values

**"Failed to create contact"**
→ Verify API key has `contacts.write` permission

**"Network error"**
→ Check internet connection, Vercel is deployed

---

Need help? Let me know!

