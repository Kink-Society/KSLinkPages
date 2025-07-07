const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

class VideoPageGenerator {
  constructor() {
    this.distDir = process.env.OUTPUT_DIR ? path.resolve(process.env.OUTPUT_DIR) : path.join(__dirname, 'dist');
    this.videosDir = path.join(this.distDir, 'videos');
    this.assetsDir = path.join(this.distDir, 'assets');
    
    // Load configuration
    this.config = this.loadConfig();
  }

  loadConfig() {
    // Try to load config.js first, then fall back to environment variables
    try {
      const configPath = path.join(__dirname, 'config.js');
      if (fs.existsSync(configPath)) {
        return require('./config.js');
      }
    } catch (error) {
      console.log('No config.js found, using environment variables');
    }

    // Fallback to environment variables
    return {
      bunny: {
        libraryId: process.env.BUNNY_LIBRARY_ID,
        apiKey: process.env.BUNNY_API_KEY,
        streamUrl: process.env.BUNNY_STREAM_URL || 'https://stream.bunnycdn.com',
        cdnUrl: process.env.BUNNY_CDN_URL,
        pullZone: process.env.BUNNY_PULL_ZONE,
        thumbnailCdnUrl: process.env.THUMBNAIL_CDN_URL,
        collectionId: process.env.BUNNY_LINKS_COLLECTION_ID
      },
      site: {
        domain: process.env.SITE_DOMAIN || 'links.kinksociety.xyz',
        url: process.env.SITE_URL || 'https://links.kinksociety.xyz'
      }
    };
  }

  async fetchBunnyVideos() {
    if (!this.config.bunny.libraryId || !this.config.bunny.apiKey) {
      throw new Error('Bunny.net Library ID and API Key are required. Please set them in config.js or environment variables.');
    }

    try {
      let apiUrl = `https://video.bunnycdn.com/library/${this.config.bunny.libraryId}/videos`;
      if (this.config.bunny.collectionId) {
        // filter to specific collection
        apiUrl += `?collection=${this.config.bunny.collectionId}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          'AccessKey': this.config.bunny.apiKey,
          'accept': 'application/json'
        }
      });

      return response.data.items.map(video => ({
        title: video.title,
        slug: this.createSlug(video.title),
        description: video.description || `Watch ${video.title} on Kink Society`,
        thumbnail: video.thumbnailFileName ? 
          `${this.config.bunny.cdnUrl}/${video.guid}/${video.thumbnailFileName}` :
          `https://via.placeholder.com/640x360/000000/ffffff?text=${encodeURIComponent(video.title)}`,
        video_url: `${this.config.bunny.streamUrl}/${this.config.bunny.libraryId}/${video.guid}/playlist.m3u8`,
        mp4_url: video.mp4Url || `${this.config.bunny.streamUrl}/${this.config.bunny.libraryId}/${video.guid}/play_720p.mp4`,
        guid: video.guid,
        status: video.status,
        length: video.length,
        views: video.views
      })).filter(video => video.status === 4); // Only include processed videos
    } catch (error) {
      console.error('Error fetching videos from Bunny.net:', error.message);
      throw error;
    }
  }

  createSlug(title) {
    return title
      .replace(/\.mp4$/i, '') // remove file extension
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  async generate(videoDataFile) {
    try {
      let videoData;
      
      // Check if we should fetch from Bunny.net API
      if (videoDataFile === '--bunny' || process.argv.includes('--bunny')) {
        console.log('Fetching videos from Bunny.net API...');
        videoData = await this.fetchBunnyVideos();
        console.log(`Fetched ${videoData.length} videos from Bunny.net`);
      } else {
        // Read video data from JSON file
        if (!videoDataFile || !fs.existsSync(videoDataFile)) {
          throw new Error(`Video data file not found: ${videoDataFile}`);
        }
        videoData = JSON.parse(await fs.readFile(videoDataFile, 'utf8'));
      }
      
      // Clean and create directories
      await fs.ensureDir(this.distDir);
      await fs.ensureDir(this.videosDir);
      await fs.ensureDir(this.assetsDir);
      
      // Remove old homepage file if it exists, since root is handled by KSLinkPages project
      const indexPath = path.join(this.distDir, 'index.html');
      if (await fs.pathExists(indexPath)) {
        await fs.remove(indexPath);
      }
      
      // Copy assets
      await this.copyAssets();
      
      // Generate video pages
      for (const video of videoData) {
        await this.generateVideoPage(video);
      }
      
      // Skip generating homepage because KSLinkPages project already provides the root page
      
      console.log(`Generated ${videoData.length} video pages successfully!`);
      console.log(`Output directory: ${this.distDir}`);
      
    } catch (error) {
      console.error('Error generating pages:', error);
      process.exit(1);
    }
  }

  async copyAssets() {
    // Create CSS file
    const css = this.generateCSS();
    await fs.writeFile(path.join(this.assetsDir, 'style.css'), css);
    
    // Create a placeholder logo if it doesn't exist
    const logoPath = path.join(this.assetsDir, 'logo.svg');
    if (!await fs.pathExists(logoPath)) {
      const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
        <rect width="120" height="40" fill="#ffffff" rx="8"/>
        <text x="60" y="25" text-anchor="middle" fill="#000000" font-family="Arial, sans-serif" font-size="14" font-weight="bold">KS</text>
      </svg>`;
      await fs.writeFile(logoPath, logoSVG);
    }
  }

  generateCSS() {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #ffffff;
        background: radial-gradient(
          circle at top center,
          rgba(222, 157, 88, 0.3) 0%,
          rgba(0, 0, 0, 0.95) 50%,
          rgba(0, 0, 0, 1) 100%
        );
        font-weight: 400;
        min-height: 100vh;
      }

      .container {
        max-width: 448px; /* max-w-md */
        margin: 0 auto;
        padding: 0 16px;
        position: relative;
        z-index: 10;
      }

      /* Video Page Styles */
      .video-page {
        display: block;
      }

      .video-section {
        width: 100%;
        padding: 0;
      }

      .video-container {
        width: 100%;
        aspect-ratio: 16/9; /* always landscape */
        background: #000;
        overflow: hidden;
      }

      .video-container iframe,
      .video-container video {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .back-button {
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 100;
        text-decoration: none;
        color: white;
        background: rgba(0,0,0,0.5);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .back-button:hover {
        background: rgba(0,0,0,0.8);
        border-color: #de9d58;
      }

      .brand-section {
        padding: 8px 0 16px;
        text-align: center;
      }

      .brand-content {
        max-width: 400px;
        margin: 0 auto;
      }

      /* Site Header */
      .site-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 32px 0 48px;
      }

      .brand-logo {
        width: 96px; /* w-24 */
        height: 96px; /* h-24 */
        margin-bottom: 16px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
      }

      .brand-logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .brand-name {
        font-size: 1.875rem; /* text-3xl */
        font-weight: 700;
        margin-bottom: 8px;
        color: #ffffff;
        text-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
      }

      .brand-subtitle {
        font-size: 1rem;
        color: #d4d4d8; /* zinc-300 */
        margin-bottom: 16px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }

      .social-icons {
        display: flex;
        gap: 16px;
        margin-bottom: 32px;
      }

      .social-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(222, 157, 88, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #de9d58;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 16px;
      }

      .social-icon:hover {
        background: rgba(222, 157, 88, 0.2);
        border-color: #de9d58;
        transform: translateY(-2px);
      }

      .brand-tagline {
        font-size: 1rem;
        color: #d4d4d8; /* zinc-300 */
        margin-bottom: 32px;
        font-weight: 400;
        line-height: 1.5;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }

      /* Featured Section */
      .featured-section {
        margin: 48px 0 32px;
      }

      .section-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        margin-bottom: 16px;
      }

      /* Main Links */
      .main-links {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 48px;
      }

      .link-card {
        background: rgba(0, 0, 0, 0.8);
        border: 1px solid #27272a; /* zinc-800 */
        border-radius: 8px;
        padding: 16px;
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
        display: block;
        position: relative;
        overflow: hidden;
      }

      .link-card:hover {
        background: rgba(222, 157, 88, 0.1);
        transform: scale(1.02);
      }

      .link-content {
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;
        z-index: 2;
      }

      .link-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(222, 157, 88, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #de9d58;
        font-size: 20px;
        flex-shrink: 0;
      }

      .link-text {
        flex-grow: 1;
      }

      .link-title {
        font-size: 1rem;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 2px;
      }

      .link-description {
        font-size: 0.875rem;
        color: #a1a1aa;
      }

      .link-external {
        color: #71717a; /* zinc-500 */
        font-size: 16px;
      }

      .link-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background: #de9d58;
        width: 0%;
        transition: width 0.3s ease;
      }

      .link-card:hover .link-progress {
        width: 100%;
      }

      /* Video Grid */
      .video-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-top: 16px;
      }

      .video-card {
        background: rgba(0, 0, 0, 0.8);
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #27272a;
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
        display: block;
      }

      .video-card:hover {
        transform: scale(1.02);
        border-color: #de9d58;
      }

      .video-thumbnail {
        width: 100%;
        height: 120px;
        object-fit: cover;
        background: #27272a;
      }

      .video-info {
        padding: 12px;
      }

      .video-title {
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 4px;
        color: #ffffff;
        line-height: 1.3;
      }

      .video-description {
        font-size: 0.75rem;
        color: #a1a1aa;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Button */
      .btn {
        display: inline-block;
        padding: 12px 24px;
        background: linear-gradient(135deg, #de9d58 0%, #f4d03f 100%);
        color: #000000;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.875rem;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(222, 157, 88, 0.3);
      }

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(222, 157, 88, 0.4);
      }

      /* Footer */
      .footer {
        text-align: center;
        padding: 48px 0 16px;
        margin-top: 48px;
      }

      .footer-text {
        color: #71717a; /* zinc-500 */
        font-size: 0.75rem;
        font-weight: 400;
        margin-bottom: 4px;
      }

      .footer-links {
        display: flex;
        justify-content: center;
        gap: 12px;
      }

      .footer-link {
        color: #71717a;
        text-decoration: underline;
        font-size: 0.75rem;
        font-weight: 400;
        transition: color 0.2s ease;
      }

      .footer-link:hover {
        color: #a1a1aa;
      }

      /* Responsive Design */
      @media (max-width: 480px) {
        .container {
          padding: 0 12px;
        }

        .brand-logo {
          width: 80px;
          height: 80px;
        }

        .brand-name {
          font-size: 1.5rem;
        }

        .video-container {
          max-width: 100%;
        }

        .video-grid {
          gap: 12px;
        }

        .video-thumbnail {
          height: 100px;
        }

        .video-info {
          padding: 10px;
        }

        .link-card {
          padding: 14px;
        }

        .link-icon {
          width: 36px;
          height: 36px;
          font-size: 18px;
        }

        .social-icons {
          gap: 12px;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          font-size: 14px;
        }
      }

      /* Desktop adjustments */
      @media (min-width: 768px) {
        .container {
          max-width: 512px;
          padding: 0 24px;
        }

        .video-container {
          max-width: 480px;
        }

        .video-grid {
          gap: 20px;
        }

        .main-links {
          gap: 20px;
        }
      }
    `;
  }

  async generateVideoPage(video) {
    const siteUrl = this.config.site.url;
    const libraryId = this.config.bunny.libraryId;
    const hlsUrl = video.video_url; // m3u8
    const mp4Url = video.mp4_url;
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${video.title} - Kink Society</title>
    
    <!-- Twitter Player Card Meta Tags -->
    <meta name="twitter:card" content="player">
    <meta name="twitter:title" content="${video.title}">
    <meta name="twitter:description" content="${video.description}">
    <meta name="twitter:image" content="${video.thumbnail}">
    <meta name="twitter:player" content="${siteUrl}/videos/${video.slug}.html">
    <meta name="twitter:player:width" content="640">
    <meta name="twitter:player:height" content="360">
    <meta name="twitter:player:stream" content="${hlsUrl}">
    <meta name="twitter:player:stream:content_type" content="video/mp4">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${video.title}">
    <meta property="og:description" content="${video.description}">
    <meta property="og:image" content="${video.thumbnail}">
    <meta property="og:url" content="${siteUrl}/videos/${video.slug}.html">
    <meta property="og:type" content="video.other">
    
    <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
    <div class="video-page">
        <!-- Top Half: Video -->
        <div class="video-section">
            <a href="${siteUrl}" class="back-button">← Back to Home</a>
            <div class="video-container">
              <video id="video-player" controls playsinline poster="${video.thumbnail}" style="width:100%;height:auto;max-height:90vh;object-fit:contain;background:#000;"></video>
            </div>
        </div>
        
        <!-- Bottom Half: Brand Info -->
        <div class="brand-section">
            <div class="container">
                <div class="brand-content">
                    <div class="site-header">
                        <div class="brand-logo">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%201.43.48%E2%80%AFAM-5l2ZtCrdwkDLTXQEeoU12pyEjoZVcl.png" alt="KS Logo">
                        </div>
                        <h1 class="brand-name">Kink Society.</h1>
                        <p class="brand-subtitle">21+ NSFW | Adult Content & Tech | Email for Inquiries</p>
                        
                        <div class="social-icons">
                            <a href="https://www.kinksociety.xyz" class="social-icon" target="_blank" title="Website">🌐</a>
                            <a href="https://www.x.com/thekinksociety" class="social-icon" target="_blank" title="Twitter">🐦</a>
                            <a href="https://www.instagram.com/thekinksociety" class="social-icon" target="_blank" title="Instagram">📷</a>
                            <a href="https://t.me/+YL2AKzJAmmM0MGIx" class="social-icon" target="_blank" title="Telegram">💬</a>
                            <a href="mailto:info@kinksociety.xyz" class="social-icon" title="Email">✉️</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const video = document.getElementById('video-player');
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // Safari supports HLS natively
          video.src = '${hlsUrl}';
        } else if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource('${hlsUrl}');
          hls.attachMedia(video);
        } else {
          // Fallback MP4
          video.src = '${mp4Url}';
        }
      });
    </script>
</body>
</html>`;

    const filePath = path.join(this.videosDir, `${video.slug}.html`);
    await fs.writeFile(filePath, html);
  }

  async generateHomepage(videoData) {
    const videoCards = videoData.map(video => `
        <a href="videos/${video.slug}.html" class="video-card">
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
            </div>
        </a>
    `).join('');

    const mainLinks = [
      {
        title: "Official Website",
        description: "Visit our full website",
        icon: "🌐",
        href: "https://www.kinksociety.xyz"
      },
      {
        title: "Chat with Our Influencers",
        description: "Connect with our exclusive community",
        icon: "💬",
        href: "https://www.kinksociety.xyz/chat"
      },
      {
        title: "Subscribe to Kink Society",
        description: "Get exclusive access to premium content",
        icon: "👥",
        href: "https://www.kinksociety.xyz/subscription"
      }
    ];

    const mainLinkCards = mainLinks.map(link => `
        <a href="${link.href}" class="link-card" target="_blank">
            <div class="link-content">
                <div class="link-icon">${link.icon}</div>
                <div class="link-text">
                    <div class="link-title">${link.title}</div>
                    <div class="link-description">${link.description}</div>
                </div>
                <div class="link-external">↗</div>
            </div>
            <div class="link-progress"></div>
        </a>
    `).join('');

    const siteUrl = this.config.site.url;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kink Society - Curated by kink enthusiasts, for kink enthusiasts</title>
    
    <!-- Meta Tags -->
    <meta name="description" content="Curated by kink enthusiasts, for kink enthusiasts">
    <meta property="og:title" content="Kink Society">
    <meta property="og:description" content="Curated by kink enthusiasts, for kink enthusiasts">
    <meta property="og:url" content="${siteUrl}">
    <meta property="og:type" content="website">
    
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <div class="container">
        <!-- Site Header -->
        <div class="site-header">
            <div class="brand-logo">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%201.43.48%E2%80%AFAM-5l2ZtCrdwkDLTXQEeoU12pyEjoZVcl.png" alt="KS Logo">
            </div>
            <h1 class="brand-name">Kink Society.</h1>
            <p class="brand-subtitle">21+ NSFW | Adult Content & Tech | Email for Inquiries</p>
            
            <div class="social-icons">
                <a href="https://www.kinksociety.xyz" class="social-icon" target="_blank" title="Website">🌐</a>
                <a href="https://www.x.com/thekinksociety" class="social-icon" target="_blank" title="Twitter">🐦</a>
                <a href="https://www.instagram.com/thekinksociety" class="social-icon" target="_blank" title="Instagram">📷</a>
                <a href="https://t.me/+YL2AKzJAmmM0MGIx" class="social-icon" target="_blank" title="Telegram">💬</a>
                <a href="mailto:info@kinksociety.xyz" class="social-icon" title="Email">✉️</a>
            </div>
        </div>

        <!-- Main Links -->
        <div class="main-links">
            ${mainLinkCards}
        </div>

        <!-- Featured Videos -->
        <div class="featured-section">
            <h2 class="section-title">Featured Videos</h2>
            <div class="video-grid">
                ${videoCards}
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">© 2025 | Kink Society Ecosystem</div>
            <div class="footer-links">
                <a href="#" class="footer-link">Terms of Service</a>
                <a href="#" class="footer-link">Privacy Policy</a>
            </div>
        </div>
    </div>
</body>
</html>`;

    const filePath = path.join(this.distDir, 'index.html');
    await fs.writeFile(filePath, html);
  }
}

// CLI execution
if (require.main === module) {
  const videoDataFile = process.argv[2];
  
  if (!videoDataFile) {
    console.error('Usage: node generate.js <video_data.json> or node generate.js --bunny');
    console.error('');
    console.error('Options:');
    console.error('  video_data.json    Generate from JSON file');
    console.error('  --bunny           Fetch videos from Bunny.net API');
    process.exit(1);
  }
  
  const generator = new VideoPageGenerator();
  generator.generate(videoDataFile);
}

module.exports = VideoPageGenerator; 