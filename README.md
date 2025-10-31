# Search Hub (Pages) + Free Backend Preview

This is the **frontend** for GitHub Pages. Combine it with the backend ZIP to enable **Preview** inside the page.

## Steps
1. Deploy the **backend** on Render (free). Set:
   - `ALLOWED_HOSTS` (e.g., `wikipedia.org,developer.mozilla.org,stackprinter.appspot.com`)
   - `ALLOW_PAGES_ORIGIN` = `https://<you>.github.io`
2. Note the backend URL, e.g. `https://search-proxy.onrender.com`
3. In this folder, edit **`config.js`** and set:
   ```js
   window.SEARCH_BACKEND = "https://search-proxy.onrender.com";
   ```
4. Push this folder to a GitHub repo and enable **Settings → Pages**.
5. Open your site and toggle **Use backend preview**. Click **Preview** next to supported links.

## Notes
- The backend enforces a **whitelist**. You can only preview allowed sites.
- This design avoids bypassing site restrictions and keeps things legal.
- You can expand the whitelist to other sites that permit embedding/reuse.
