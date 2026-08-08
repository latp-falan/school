# FALAN LTPN 2026 website

Skeleton site for the First FALAN Latin American Training Program in Neuroscience 2026. Plain HTML/CSS/JS — no build step, so it works directly on GitHub Pages.

## Publishing it (one-time setup)

1. Create a repository on GitHub (e.g. `falan-ltpn-2026`) and push these files to it.
2. In the repo, go to **Settings > Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save. The site will be live at `https://<your-username-or-org>.github.io/<repo-name>/` within a couple of minutes.

No custom domain is needed yet — this can be added later without changing anything else.

## Adding lecture or hands-on material (day-to-day use)

You do **not** need to touch any HTML to add materials. There are two files:

- `data/lectures-data.js` — for lecture slides/materials
- `data/handson-data.js` — for hands-on workshop protocols/materials

Open the file on github.com, click the pencil (edit) icon, and add an entry. Full instructions and examples are written directly inside each file as comments.

Two ways to link a file:

- **Google Drive** — get a shareable "anyone with the link can view" link, and reference it with `type: "drive"`.
- **Small file on GitHub** (PDFs/slides under ~20MB) — upload it into the `/materials` folder (use GitHub's "Add file > Upload files" button, no command line needed), then reference the exact filename with `type: "file"`.

The lecture and hands-on pages update automatically — nothing else needs to change.

## Editing the schedule

The schedule (`schedule.html`) only shows activity names, times, and locations — **no student names or group assignments**, since it's public-facing. Edit the table cells directly in that file.

## What's still needed

- USACH logo (currently shows a placeholder in the footer) — drop it into `assets/logos/` and update the `<img>` reference in each page's footer once you have it.
- Real schedule content (currently placeholder "Add activity name" cells).
- A contact email on `contact.html` (currently a placeholder).
- Poster session page — intentionally left out until details are finalized.
