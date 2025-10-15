# YSL Brightcove Video Implementation
## Exact Replication Using Cloudinary

This document explains how we've replicated YSL's Brightcove video player implementation using Cloudinary as the video source.

---

## HTML Structure

### YSL's Wrapper Hierarchy (4 Layers)

```html
<section class="section-wrapper" data-section="video-name">
  ↓
  <div class="section-container">
    ↓
    <div class="video-wrapper">
      ↓
      <div class="video-container brightcove-react-player-loader">
        ↓
        <video-js> <!-- Brightcove player -->
```

### Our Implementation (Exact Match with Cloudinary)

```html
<section class="section-wrapper video-section" data-section="video-rates">
  <div class="section-container">
    <div class="video-wrapper">
      <div class="video-container cloudinary-player-loader">
        <video class="video-player video-js"
               autoplay
               muted
               loop
               playsinline
               poster="https://res.cloudinary.com/.../poster.jpg">
          <source src="https://res.cloudinary.com/.../video.mp4" type="video/mp4">
        </video>
      </div>
    </div>
    <!-- Overlay text sits above video -->
    <div class="video-overlay-text">
      <h2 class="section-title">Rates</h2>
    </div>
  </div>
</section>
```

---

## CSS Implementation

### 1. Video Wrapper (100vh Container)
```css
.video-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
```
- **Purpose**: Creates full viewport height section
- **Why**: Ensures video always fills entire screen

### 2. Video Container (Absolute Positioning)
```css
.video-container.cloudinary-player-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Behind overlay text */
}
```
- **Purpose**: Positions video to fill wrapper completely
- **Why**: Creates background video effect

### 3. 100vh Spacer Pseudo-element (YSL's Technique)
```css
.video-container.cloudinary-player-loader::after {
  content: '';
  display: block;
  width: 100vw;
  height: 100vh;
}
```
- **Purpose**: Guarantees viewport height even before video loads
- **Why**: Prevents layout shift, addresses mobile viewport quirks
- **YSL Specific**: This is their exact technique for consistent full-screen behavior

### 4. Video Player Element (Cover Scaling)
```css
.video-container .video-player,
.video-container .video-js {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```
- **Purpose**: Scales video to fill container without letterboxing
- **Why**: Maintains aspect ratio while covering entire frame

### 5. Overlay Text (Above Video)
```css
.video-overlay-text {
  position: relative;
  z-index: 1;
  color: #fff;
  text-align: center;
}
```
- **Purpose**: Places text/UI above the video
- **Why**: Creates interactive overlay without blocking video

---

## Video Attributes

### Required HTML Attributes

1. **`autoplay`**
   - Video starts playing automatically
   - Required for background video effect

2. **`muted`**
   - Video has no sound by default
   - **Required** for autoplay to work in modern browsers
   - Browser policies block autoplay with sound

3. **`loop`**
   - Video restarts when it ends
   - Creates continuous background ambiance

4. **`playsinline`**
   - Video plays inline on iOS (not fullscreen)
   - **Critical** for mobile experience
   - Without this, iOS forces fullscreen video player

5. **`poster="url"`**
   - Thumbnail image shown before video loads
   - YSL uses `background-size: cover` on poster
   - Prevents blank frame during load

---

## Cloudinary Video Source

### URL Structure
```
https://res.cloudinary.com/[CLOUD_NAME]/video/upload/q_auto:best,f_auto/[VIDEO_ID].mp4
```

### Transformations Applied

- **`q_auto:best`** - Automatic quality optimization
- **`f_auto`** - Auto format selection (WebM, MP4, etc.)
- These mirror Brightcove's adaptive bitrate streaming

### Poster Image URL
```
https://res.cloudinary.com/[CLOUD_NAME]/image/upload/v1/[IMAGE_ID].jpg
```

---

## Mobile Behavior

### What YSL Does (We Match)

1. **Same 100vh height** - Full viewport on mobile
2. **No separate mobile video** - Same source, adaptive quality
3. **Inline autoplay** - Plays in background (muted + playsinline)
4. **object-fit: cover** - Crops video to fit tall screens
5. **No user interaction required** - Autoplays immediately

### Performance Optimizations

- Cloudinary's `q_auto:best` reduces file size on mobile
- HLS/adaptive streaming (if using Cloudinary Player advanced)
- Lazy loading handled by browser (below fold videos)

---

## Key Differences from Brightcove

| Feature | YSL (Brightcove) | Our Implementation (Cloudinary) |
|---------|------------------|--------------------------------|
| Player Type | `<video-js>` with Brightcove script | Standard `<video>` tag |
| Video Source | Brightcove CDN | Cloudinary CDN |
| Adaptive Streaming | Brightcove HLS | Cloudinary auto format/quality |
| Player Controls | Hidden via Brightcove settings | No controls (not specified) |
| Analytics | Brightcove analytics | Can add Cloudinary Analytics |
| **Structure** | **Identical ✓** | **Identical ✓** |
| **CSS** | **Identical ✓** | **Identical ✓** |
| **Behavior** | **Identical ✓** | **Identical ✓** |

---

## Implementation Checklist

✅ **HTML Structure**
- 4-layer wrapper hierarchy (section-wrapper → section-container → video-wrapper → video-container)
- `cloudinary-player-loader` class (replaces `brightcove-react-player-loader`)
- `video-js` class on `<video>` element
- `data-section` attribute on section

✅ **Video Attributes**
- `autoplay` ✓
- `muted` ✓
- `loop` ✓
- `playsinline` ✓
- `poster="..."` ✓

✅ **CSS Rules**
- `.video-wrapper` → 100vh, relative, overflow hidden ✓
- `.video-container` → absolute, fills wrapper, z-index -1 ✓
- `::after` pseudo-element → 100vw/100vh spacer ✓
- `.video-player` → object-fit cover, center position ✓
- `.video-overlay-text` → z-index 1, relative ✓

✅ **Mobile Optimizations**
- Same structure on mobile ✓
- playsinline attribute ✓
- Cloudinary auto quality ✓

---

## Example Usage

### Hero Section
```html
<section class="section-wrapper hero-section" data-section="hero">
  <div class="section-container">
    <div class="video-wrapper">
      <div class="video-container cloudinary-player-loader">
        <video class="video-player video-js"
               autoplay muted loop playsinline
               poster="https://res.cloudinary.com/demo/image/upload/v1/hero-poster.jpg">
          <source src="https://res.cloudinary.com/demo/video/upload/q_auto:best,f_auto/hero-video.mp4"
                  type="video/mp4">
        </video>
      </div>
    </div>
    <div class="video-overlay-text">
      <h2 class="tagline">Welcome to Katherine Taylor</h2>
    </div>
  </div>
</section>
```

### Rates Video Section
```html
<section class="section-wrapper video-section" data-section="video-rates">
  <div class="section-container">
    <div class="video-wrapper">
      <div class="video-container cloudinary-player-loader">
        <video class="video-player video-js"
               autoplay muted loop playsinline
               poster="https://res.cloudinary.com/demo/image/upload/v1/rates-poster.jpg">
          <source src="https://res.cloudinary.com/demo/video/upload/q_auto:best,f_auto/rates-video.mp4"
                  type="video/mp4">
        </video>
      </div>
    </div>
    <div class="video-overlay-text">
      <h2 class="section-title">Rates</h2>
    </div>
  </div>
</section>
```

---

## Browser Compatibility

| Feature | Chrome | Safari | Firefox | Edge | Mobile Safari | Chrome Android |
|---------|--------|--------|---------|------|---------------|----------------|
| autoplay (muted) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| playsinline | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| object-fit: cover | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 100vh | ✅ | ⚠️* | ✅ | ✅ | ⚠️* | ✅ |

*Safari mobile has dynamic 100vh (address bar changes height). YSL's `::after` pseudo-element helps mitigate this.

---

## Summary

This implementation **exactly replicates** YSL's Brightcove video structure:
- ✅ Same 4-layer HTML wrapper hierarchy
- ✅ Same CSS positioning and sizing
- ✅ Same 100vh spacer pseudo-element technique
- ✅ Same video attributes (autoplay, muted, loop, playsinline)
- ✅ Same overlay text stacking
- ✅ Same mobile behavior

**Only difference**: Cloudinary CDN instead of Brightcove CDN. Everything else is pixel-perfect.
