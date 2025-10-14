# Video Encoding Script

Optimized video encoding for luxury web experiences. Generates desktop (1080p) and mobile (720p) variants with WebP posters.

## Prerequisites

**Install ffmpeg:**
```bash
# macOS
brew install ffmpeg

# Ubuntu
sudo apt-get install ffmpeg
```

## Usage

1. **Place your raw video files in `assets/raw/`:**
   ```
   assets/raw/
   ├── MAYA1.m4v
   ├── MAYA-2-2-1.m4v
   └── katherine-taylor-escort-sf.m4v
   ```

2. **Run the encoding script:**
   ```bash
   npm run encode-videos
   ```

   Or directly:
   ```bash
   node scripts/encode-videos.mjs
   ```

3. **Output files will be created in:**
   ```
   public/videos/
   ├── maya1.mp4           (desktop, 1080p, CRF 22)
   ├── maya1-mobile.mp4    (mobile, 720p, CRF 24)
   ├── maya2.mp4
   ├── maya2-mobile.mp4
   ├── kt-escort-sf.mp4
   └── kt-escort-sf-mobile.mp4

   public/images/
   ├── maya1-poster.webp
   ├── maya2-poster.webp
   └── kt-escort-sf-poster.webp
   ```

## Video Settings

- **Desktop:** 1080p max, H.264 CRF 22, 30fps, no audio
- **Mobile:** 720p max, H.264 CRF 24, 30fps, no audio
- **Posters:** WebP, quality 75, extracted at 1.0s

## Usage in Components

```jsx
<video
  className="absolute inset-0 h-full w-full object-cover"
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  poster="/images/maya1-poster.webp"
>
  {/* Mobile variant */}
  <source
    media="(max-width: 768px)"
    src="/videos/maya1-mobile.mp4"
    type="video/mp4"
  />
  {/* Desktop variant */}
  <source
    src="/videos/maya1.mp4"
    type="video/mp4"
  />
</video>
```

## Adding New Videos

Edit `VIDEO_MAP` in `scripts/encode-videos.mjs`:

```js
const VIDEO_MAP = {
  'your-input-file.m4v': 'output-slug',
  'MAYA1.m4v': 'maya1',
  // ...
};
```

## Performance Notes

- Encoding takes ~5-10 min per video depending on length and CPU
- Desktop files: ~5-10 MB/min of footage
- Mobile files: ~3-5 MB/min of footage
- All audio is stripped (background videos don't need it)
- Fast start enabled for instant playback

## LWS Compliance

- Fixed aspect ratios prevent layout shift
- Mobile-first bandwidth optimization
- WebP posters for instant perceived load
- No audio = no autoplay restrictions
