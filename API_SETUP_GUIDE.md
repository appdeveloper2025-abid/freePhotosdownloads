# 4K Wallpapers Website - API Setup Guide

## How to Get FREE API Keys

Your website currently works without API keys, but for better search results, follow these steps:

---

## 1. UNSPLASH API (RECOMMENDED - Best Quality)

### Steps to get FREE API key:

1. Go to: https://unsplash.com/developers
2. Click "Register as a developer"
3. Create a free account (if you don't have one)
4. Click "New Application"
5. Accept the terms
6. Fill in application details:
   - Application name: "4K Wallpapers"
   - Description: "Personal wallpaper website"
7. Click "Create Application"
8. Copy your "Access Key"

### Add to your website:
Open `api-config.js` and replace:
```javascript
accessKey: 'YOUR_UNSPLASH_ACCESS_KEY_HERE'
```
With your actual key:
```javascript
accessKey: 'your_actual_key_here'
```

**Free Tier:** 50 requests per hour (enough for personal use)

---

## 2. PEXELS API (Alternative)

### Steps to get FREE API key:

1. Go to: https://www.pexels.com/api/
2. Click "Get Started"
3. Create a free account
4. Go to your account settings
5. Find "API" section
6. Copy your API Key

### Add to your website:
Open `api-config.js` and replace:
```javascript
apiKey: 'YOUR_PEXELS_API_KEY_HERE'
```

**Free Tier:** 200 requests per hour

---

## 3. PIXABAY API (Backup)

### Steps to get FREE API key:

1. Go to: https://pixabay.com/api/docs/
2. Create a free account
3. Go to API documentation page
4. Your API key will be shown at the top
5. Copy the key

### Add to your website:
Open `api-config.js` and replace:
```javascript
apiKey: 'YOUR_PIXABAY_API_KEY_HERE'
```

**Free Tier:** 5,000 requests per day

---

## How It Works

The website tries APIs in this order:
1. **Unsplash** (best quality) → if fails or no key
2. **Pexels** (great alternative) → if fails or no key
3. **Pixabay** (good backup) → if fails or no key
4. **Unsplash Source** (no key needed, works always)

You can use just one API or all three for maximum reliability!

---

## Current Status

✅ Website works WITHOUT any API keys (uses Unsplash Source)
✅ Add API keys for BETTER search results
✅ All APIs are 100% FREE
✅ No credit card required

---

## Need Help?

If you have issues:
1. Make sure you copied the ENTIRE API key
2. Check there are no extra spaces
3. Make sure the key is between quotes: 'your_key_here'
4. Refresh your browser after adding keys

---

Created by: ABID MEHMOOD
