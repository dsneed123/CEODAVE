# CEODAVE - Seattle's Premier DJ Website

A supermodern DJ website with crazy graphics, animations, and full SEO optimization for Seattle.

## Features

- Neon glow effects & glitch animations
- Interactive particle system
- Matrix rain background
- Animated EQ bars & audio visualizer
- Spinning vinyl records
- Fully responsive design
- SEO optimized for Seattle DJ searches
- SoundCloud/Mixcloud/YouTube mix embeds
- Direct email booking (no backend needed)

## Deploy to GitHub Pages

### Option 1: Deploy from Main Branch

1. Push this code to your GitHub repository
2. Go to your repo **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/CEODAVE`

### Option 2: Use a Custom Domain

1. Deploy using Option 1 first
2. In **Settings** > **Pages**, enter your custom domain (e.g., `ceodave.com`)
3. Add these DNS records at your domain registrar:
   - **A Records** pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or **CNAME** record: `yourusername.github.io`
4. Enable "Enforce HTTPS" once DNS propagates

## After Deploying - Update URLs

Once you have your live URL, update these in `index.html`:

1. **Line 19** - `og:url` content
2. **Line 31** - `canonical` href
3. **Line 53** - Schema.org `url`

Example:
```html
<meta property="og:url" content="https://yourusername.github.io/CEODAVE/">
<link rel="canonical" href="https://yourusername.github.io/CEODAVE/">
```

## Customize Your Mixes

Edit `index.html` around lines 345-400 to add your actual mixes:

### SoundCloud
1. Go to your track on SoundCloud
2. Click **Share** > **Embed**
3. Copy the URL from the `src` attribute
4. Replace `YOUR_TRACK_ID` in the iframe

### Mixcloud
1. Go to your show on Mixcloud
2. Click **Share** > **Embed**
3. Copy the feed URL
4. Replace `YOUR_USERNAME/YOUR_SHOW` in the iframe

### YouTube
1. Get your video ID from `youtube.com/watch?v=VIDEO_ID`
2. Replace `YOUR_VIDEO_ID` in the iframe

## Contact

- Email: ceodave9@gmail.com
- TikTok: [@ceo_dave9](https://www.tiktok.com/@ceo_dave9)

## Local Development

```bash
cd CEODAVE
python3 -m http.server 8000
# Open http://localhost:8000
```

---

Built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies.
