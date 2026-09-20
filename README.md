# Kalantar

Kalantar is a cultural heritage preservation and discovery platform dedicated to safeguarding endangered oral lore, epic poetry, and bardic traditions. It helps document, preserve, connect, and discover cultural traditions, hereditary practitioners, indigenous languages, sacred places, and folk arts. The platform bridges remote field ethnography with an interactive digital archive accessible to communities, scholars, and the public.

# How It Works

Field Capture → Offline Storage → Human Verification → Cultural Knowledge Layer → Public Portal

- **Field Capture:** Field workers and community bards record high-fidelity oral recitations and performances directly through the browser.
- **Offline Storage:** Audio recordings and metadata are securely stored on-device using IndexedDB, enabling uninterrupted field documentation without internet connectivity.
- **Human Verification:** Community elders, linguists, and platform administrators review, edit, and verify field submissions and genealogical annotations.
- **Cultural Knowledge Layer:** Validated traditions are synthesized with relational metadata, motifs, geographic coordinates, and UNESCO-aligned endangerment metrics.
- **Public Portal:** Curated oral traditions are published to an open-access portal featuring faceted search, interactive knowledge graphs, geospatial mapping, and visual archives.

# Key Features

- Cultural tradition discovery and search
- Offline field recording
- Human verification
- Endangerment scoring
- Interconnected knowledge graph
- Cultural exhibitions / soundscapes

# Tech Stack

- React
- TypeScript
- Vite
- React Router
- IndexedDB
- MediaRecorder API

# Environment Setup (Cultural Atlas Map)

The Cultural Lore Map uses the Google Maps JavaScript API via `@react-google-maps/api`.

Before the map will render, a Google Maps JavaScript API key (frontend/browser-restricted key, no backend needed) must be added to a `.env` file in the project root:

```bash
cp .env.example .env
```

Set your API key in `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> **Security Note:** For security, ensure this key is restricted to this site's domain (e.g., `localhost:5173/*` for local development and your production domain) under **API Restrictions & Application Restrictions (HTTP referrers)** in the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/credentials).

# Run Locally

```bash
git clone <repository-url>
cd <project-folder>
npm install
npm run dev
```

