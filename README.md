# Tesfaldet Haileab — Developer Portfolio

Personal portfolio site: https://tesfie056.github.io/

The source repository is https://github.com/tesfie056/tesfie056.github.io. GitHub Pages serves the `main` branch from the repository root. The site is static HTML, CSS, and JavaScript, so there is no build step.

## Preview locally

Open `index.html` in a browser, or serve this folder:

```powershell
python -m http.server 8000
```

Then open http://127.0.0.1:8000/.

## Files

- `index.html` — page content
- `styles.css` — dark theme and responsive layout
- `script.js` — footer year, mobile menu, and current section in the navigation
- `favicon.svg` — site icon
- `assets/Tesfaldet_Haileab_Resume.pdf` — file used by every Download Resume link
- `robots.txt` and `sitemap.xml` — basic search metadata
- `.nojekyll` — tells GitHub Pages to serve the files as-is

## Update the live site

Edit the files in this folder, commit, and push to `main`. GitHub Pages publishes that branch from `/` (root).

```powershell
git add .
git commit -m "Describe the update."
git push origin main
```

## Add screenshots later

GERE PRODUCTION already uses a homepage screenshot at `assets/gere-production.jpg`. SAI still uses a labeled placeholder. SafeBridge Transit uses screenshots in `assets/safebridge/`. Review those images for personal information before publishing them.

1. Put an image you have the right to publish in `assets/`, for example `assets/sai.png`.
2. In `index.html`, replace that project's placeholder figure with an `img` element. Use a relative path such as `assets/sai.png` and an `alt` description of what the image shows.
3. Keep a short caption next to the image.
4. Commit and push to `main`.

Use the same steps for SafeBridge or any of the iOS apps.

GERE PRODUCTION lists “Technologies: To be confirmed.” Replace that line in `index.html` after the tools used on that site are confirmed. Do not add a technology until it is confirmed.
