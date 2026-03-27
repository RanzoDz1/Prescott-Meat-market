# Prescott Meat Market — Website

A premium neighborhood market website built with HTML, CSS, and Vanilla JavaScript.

## 🚀 Deployment (Vercel)

This project uses build-time environment variable injection. Set the following in your **Vercel Dashboard → Project → Settings → Environment Variables**:

| Variable | Description | Example |
|---|---|---|
| `PHONE_TEL` | Phone for `tel:` links (no formatting) | `+15551234567` |
| `PHONE_DISPLAY` | Phone as displayed to users | `+1 555-123-4567` |
| `PHONE_DISPLAY_SHORT` | Short phone format | `555-123-4567` |
| `PHONE_SCHEMA` | Phone for Schema.org JSON-LD | `+15551234567` |
| `EMAIL` | Contact email address | `contact@yourdomain.com` |
| `ADDRESS_STREET` | Street address | `123 Main St` |
| `ADDRESS_CITY_STATE` | City, State and ZIP | `Anytown, US 12345` |
| `ADDRESS_LOCALITY` | City (for Schema.org) | `Anytown` |
| `ADDRESS_REGION` | State code (for Schema.org) | `US` |
| `ADDRESS_POSTAL` | ZIP code (for Schema.org) | `12345` |
| `SITE_URL` | Canonical site URL (with trailing slash) | `https://yoursite.com/` |
| `FACEBOOK_URL` | Facebook page URL | `https://www.facebook.com/yourpage` |
| `GOOGLE_MAPS_URL` | Google Maps directions URL | `https://maps.google.com/?q=...` |
| `GOOGLE_MAPS_EMBED` | Google Maps embed iframe src URL | `https://www.google.com/maps/embed?pb=...` |

> **Note:** The HTML in this repository uses `{{PLACEHOLDER}}` tokens instead of real contact information. Vercel runs `build.js` at deploy time to replace these tokens with your actual environment variable values.

## 📁 Project Structure

```
├── index.html       # Main HTML (placeholders for sensitive data)
├── style.css        # All styles
├── script.js        # Mobile menu, marquee, FAQ, scroll effects
├── build.js         # Vercel build-time env var injector
├── vercel.json      # Vercel deployment config
└── images/          # Product category images
```
