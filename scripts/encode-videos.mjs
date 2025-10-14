#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

// Directories
const RAW_DIR = join(ROOT_DIR, 'assets', 'raw');
const PUB_VID = join(ROOT_DIR, 'public', 'videos');
const PUB_IMG = join(ROOT_DIR, 'public', 'images');

// Ensure directories exist
[RAW_DIR, PUB_VID, PUB_IMG].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Video mappings: input filename -> output slug
const VIDEO_MAP = {
  'MAYA1.m4v': 'maya1',
  'MAYA-2-2-1.m4v': 'maya2',
  'katherine-taylor-escort-sf.m4v': 'kt-escort-sf',
};

// Check if ffmpeg is installed
async function checkFFmpeg() {
  try {
    await execAsync('ffmpeg -version');
    console.log(chalk.green('✓ ffmpeg found'));
    return true;
  } catch (error) {
    console.log(chalk.red('✗ ffmpeg not found'));
    console.log(chalk.yellow('\nInstall ffmpeg:'));
    console.log(chalk.cyan('  macOS:   brew install ffmpeg'));
    console.log(chalk.cyan('  Ubuntu:  sudo apt-get install ffmpeg'));
    return false;
  }
}

// Encode a single video file
async function encodeVideo(inputFile, slug) {
  const inputPath = join(RAW_DIR, inputFile);

  if (!existsSync(inputPath)) {
    console.log(chalk.red(`\n✗ Missing: ${inputPath}`));
    console.log(chalk.yellow(`  Place your video file at: assets/raw/${inputFile}`));
    return false;
  }

  console.log(chalk.cyan(`\n▶ Encoding ${slug}...`));

  // 1. Desktop MP4 (1080p, H.264, CRF 22)
  console.log(chalk.gray(`  Encoding ${slug}.mp4 (desktop, 1080p)...`));
  try {
    await execAsync(`
      ffmpeg -y -i "${inputPath}" \
        -vf "scale='min(1920,iw)':'min(1080,ih)':flags=lanczos,fps=30,format=yuv420p" \
        -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p \
        -movflags +faststart -an \
        "${join(PUB_VID, slug)}.mp4"
    `);
    console.log(chalk.green(`  ✓ ${slug}.mp4 (desktop)`));
  } catch (error) {
    console.log(chalk.red(`  ✗ Failed: ${slug}.mp4`));
    console.error(error.stderr);
    return false;
  }

  // 2. Mobile MP4 (720p, H.264, CRF 24)
  console.log(chalk.gray(`  Encoding ${slug}-mobile.mp4 (720p)...`));
  try {
    await execAsync(`
      ffmpeg -y -i "${inputPath}" \
        -vf "scale='min(1280,iw)':'min(720,ih)':flags=lanczos,fps=30,format=yuv420p" \
        -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
        -movflags +faststart -an \
        "${join(PUB_VID, slug)}-mobile.mp4"
    `);
    console.log(chalk.green(`  ✓ ${slug}-mobile.mp4`));
  } catch (error) {
    console.log(chalk.red(`  ✗ Failed: ${slug}-mobile.mp4`));
    console.error(error.stderr);
    return false;
  }

  // 3. WebP Poster (extract frame at 1.0s)
  console.log(chalk.gray(`  Creating ${slug}-poster.webp...`));
  try {
    // Extract PNG frame
    await execAsync(`
      ffmpeg -y -ss 1.0 -i "${inputPath}" -vframes 1 \
        -vf "scale='min(1920,iw)':'min(1080,ih)':flags=lanczos" \
        "${join(PUB_IMG, slug)}-poster.png"
    `);

    // Convert to WebP
    await execAsync(`
      ffmpeg -y -i "${join(PUB_IMG, slug)}-poster.png" \
        -compression_level 6 -quality 75 \
        "${join(PUB_IMG, slug)}-poster.webp"
    `);

    // Clean up PNG
    await execAsync(`rm -f "${join(PUB_IMG, slug)}-poster.png"`);

    console.log(chalk.green(`  ✓ ${slug}-poster.webp`));
  } catch (error) {
    console.log(chalk.red(`  ✗ Failed: ${slug}-poster.webp`));
    console.error(error.stderr);
    return false;
  }

  return true;
}

// Main execution
async function main() {
  console.log(chalk.bold.cyan('\n🎬 Video Encoding Script\n'));

  // Check for ffmpeg
  const hasFFmpeg = await checkFFmpeg();
  if (!hasFFmpeg) {
    process.exit(1);
  }

  console.log(chalk.gray(`\nInput:  ${RAW_DIR}`));
  console.log(chalk.gray(`Output: ${PUB_VID} (videos)`));
  console.log(chalk.gray(`        ${PUB_IMG} (posters)\n`));

  // Encode all videos
  let successCount = 0;
  let failCount = 0;

  for (const [inputFile, slug] of Object.entries(VIDEO_MAP)) {
    const success = await encodeVideo(inputFile, slug);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  // Summary
  console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  console.log(chalk.green(`✓ Success: ${successCount}`));
  if (failCount > 0) {
    console.log(chalk.red(`✗ Failed:  ${failCount}`));
  }

  // Usage instructions
  if (successCount > 0) {
    console.log(chalk.bold.cyan('\n📝 Usage in React/Next.js:\n'));
    console.log(chalk.gray(`<video
  className="absolute inset-0 h-full w-full object-cover"
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  poster="/images/maya1-poster.webp"
>
  <source
    media="(max-width: 768px)"
    src="/videos/maya1-mobile.mp4"
    type="video/mp4"
  />
  <source
    src="/videos/maya1.mp4"
    type="video/mp4"
  />
</video>`));
  }

  console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
}

// Run
main().catch(error => {
  console.error(chalk.red('\n✗ Unexpected error:'));
  console.error(error);
  process.exit(1);
});
