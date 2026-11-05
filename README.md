# JobHunt

A React and TypeScript job-search interface. It runs with three clearly labelled sample jobs by default. Visitors can enter their **own** JSearch RapidAPI key in the app to search live listings. Search filters, job details, and saved-job bookmarks are implemented; bookmarks are stored in this browser's local storage.

## Run locally

Requires Node.js 20 or newer.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The app starts in sample mode without an account or API key. For live results, subscribe to JSearch on RapidAPI and enter your own key in the home-page form. The key is held in tab-scoped `sessionStorage` and sent directly from your browser to RapidAPI. It is therefore visible in your browser's network tools and to browser extensions. Do not enter a key you need to keep secret from the browser environment. Use **Use sample jobs** to clear it.

```sh
npm run build
npm run lint
```

## Current scope

- Search job title, company, and location; filter by employment type and experience in sample mode.
- View job details and follow external application links.
- Bookmark jobs in local storage. Saved jobs currently show only listings loaded in the current search session.
- Render third-party HTML job descriptions through DOMPurify before inserting them into the page.

This repository is a frontend demo. It does not include Supabase authentication, employer accounts, application tracking, notifications, or a backend. Live API access from a static frontend cannot conceal a shared API key; production use with a shared key needs a server-side proxy and rate controls.

**Credential rotation:** An API key was previously committed to this public repository. Removing it from the current source and bundle does not remove it from Git history. Its owner should revoke or rotate it in RapidAPI.
