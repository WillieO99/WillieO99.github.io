# Williams Ofori — personal site

The personal website of Williams Ofori, an MPhil student in Linguistics at the University of Ghana, Legon. It's a static site (HTML, CSS and a little JavaScript) with no build step, hosted on GitHub Pages.

## Publishing on GitHub Pages

1. On the WillieO99 account, create a public repository named exactly **`WillieO99.github.io`**. GitHub serves a user site only from a repository with that name.
2. Push the contents of this folder to the repository's default branch:
   ```bash
   git init -b main
   git add .
   git commit -m "Add personal site"
   git remote add origin https://github.com/WillieO99/WillieO99.github.io.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
4. After a minute or two, the site is live at https://willieo99.github.io/.

## Changing the photo

The portrait is `assets/img/photo.jpg`, cropped to 4:5. To use a different picture, replace that file with another 4:5 image of about 800 × 1000 pixels, keeping the same name.

## Files

- `index.html` — all of the page content
- `assets/css/style.css` — layout, colors, and the light and dark themes
- `assets/js/main.js` — theme toggle, mobile menu, copy-email button, section highlighting in the sidebar and the video window
- `assets/img/photo.jpg` — the portrait
- `assets/img/favicon.svg` — the browser-tab icon

To preview the site locally, open `index.html` in a browser, or run `python3 -m http.server` in this folder and go to http://localhost:8000.
