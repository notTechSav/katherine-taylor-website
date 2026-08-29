/**
 * Cloudflare Rocket Loader rewrites classic scripts. The Vite application
 * entry is a native ES module and must keep `data-cfasync="false"` before
 * `src` so Rocket Loader leaves it alone.
 *
 * Vite removes the source `<script type="module">` during build and injects a
 * new hashed tag without custom attributes. Re-apply the exemption on that
 * emitted tag so prerendered HTML keeps it.
 */

const SCRIPT_OPENING_TAG = /<script\b[^>]*>/gi;
const MODULE_TYPE = /\btype\s*=\s*(["']?)module\1/i;
const SRC_ATTR = /\bsrc\s*=\s*(["'])([^"']+)\1/i;
const CFASYNC_FALSE = /\bdata-cfasync\s*=\s*(["']?)false\1/i;
const CFASYNC_ATTR = /\s*data-cfasync\s*=\s*(["']?)false\1/gi;

export function isApplicationModuleEntry(tag: string): boolean {
  return MODULE_TYPE.test(tag) && SRC_ATTR.test(tag);
}

export function applicationModuleEntryTags(html: string): string[] {
  SCRIPT_OPENING_TAG.lastIndex = 0;
  return [...html.matchAll(SCRIPT_OPENING_TAG)]
    .map((match) => match[0])
    .filter(isApplicationModuleEntry);
}

export function exemptModuleEntryFromRocketLoader(html: string): string {
  SCRIPT_OPENING_TAG.lastIndex = 0;
  return html.replace(SCRIPT_OPENING_TAG, (tag) => {
    if (!isApplicationModuleEntry(tag)) {
      return tag;
    }

    const withoutCfasync = tag.replace(CFASYNC_ATTR, "");
    return withoutCfasync.replace(/\ssrc\s*=/i, ' data-cfasync="false" src=');
  });
}

export function rocketLoaderEntryIssue(html: string): string | null {
  const entries = applicationModuleEntryTags(html);

  if (entries.length !== 1) {
    return `expected exactly one application module entry, found ${entries.length}`;
  }

  const tag = entries[0];

  if (!CFASYNC_FALSE.test(tag)) {
    return `missing data-cfasync="false" on ${tag}`;
  }

  const cfasyncIndex = tag.search(CFASYNC_FALSE);
  const srcIndex = tag.search(/\bsrc\s*=/i);
  if (cfasyncIndex > srcIndex) {
    return `data-cfasync appears after src in ${tag}`;
  }

  if (/\basync\b/i.test(tag) || /\bdefer\b/i.test(tag)) {
    return `application entry must not use async or defer: ${tag}`;
  }

  return null;
}
