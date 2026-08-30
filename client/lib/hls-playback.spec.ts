import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  canPlayNativeHls,
  shouldAttachHlsAfterImport,
  shouldLoadHlsJs,
} from "./hls-playback";
import { OPENING_HLS_PROXY_PATH } from "./video-sections";

function videoWithHlsCanPlayType(
  appleMpegUrl: string,
  xMpegUrl = "",
) {
  return {
    canPlayType: (type: string) => {
      if (type === "application/vnd.apple.mpegurl") {
        return appleMpegUrl;
      }
      if (type === "application/x-mpegURL") {
        return xMpegUrl;
      }
      return "";
    },
  };
}

describe("canPlayNativeHls", () => {
  it("is false without a video element or document", () => {
    expect(canPlayNativeHls(null)).toBe(false);
  });

  it('uses native playback when canPlayType returns "probably"', () => {
    const video = videoWithHlsCanPlayType("probably");
    expect(canPlayNativeHls(video)).toBe(true);
    expect(shouldLoadHlsJs(OPENING_HLS_PROXY_PATH, canPlayNativeHls(video))).toBe(
      false,
    );
  });

  it('uses native playback when canPlayType returns "maybe"', () => {
    const video = videoWithHlsCanPlayType("maybe");
    expect(canPlayNativeHls(video)).toBe(true);
    expect(shouldLoadHlsJs(OPENING_HLS_PROXY_PATH, canPlayNativeHls(video))).toBe(
      false,
    );
  });

  it('dynamically loads hls.js when canPlayType returns ""', () => {
    const video = videoWithHlsCanPlayType("");
    expect(canPlayNativeHls(video)).toBe(false);
    expect(shouldLoadHlsJs(OPENING_HLS_PROXY_PATH, canPlayNativeHls(video))).toBe(
      true,
    );
  });

  it("treats a non-empty application/x-mpegURL result as native support", () => {
    const video = videoWithHlsCanPlayType("", "maybe");
    expect(canPlayNativeHls(video)).toBe(true);
    expect(shouldLoadHlsJs(OPENING_HLS_PROXY_PATH, canPlayNativeHls(video))).toBe(
      false,
    );
  });
});

describe("shouldLoadHlsJs", () => {
  it("does not import without a source", () => {
    expect(shouldLoadHlsJs(undefined, false)).toBe(false);
  });

  it("does not import an invalid or non-HLS source", () => {
    expect(shouldLoadHlsJs("", false)).toBe(false);
    expect(shouldLoadHlsJs("/opening.mp4", false)).toBe(false);
  });

  it("does not import when native HLS is available", () => {
    expect(shouldLoadHlsJs(OPENING_HLS_PROXY_PATH, true)).toBe(false);
  });

  it("imports only for an HLS source when native playback is unavailable", () => {
    expect(shouldLoadHlsJs(OPENING_HLS_PROXY_PATH, false)).toBe(true);
  });
});

describe("shouldAttachHlsAfterImport", () => {
  const expected = { id: "video-a" } as unknown as HTMLVideoElement;
  const other = { id: "video-b" } as unknown as HTMLVideoElement;

  it("attaches when the component is still mounted on the same video", () => {
    expect(
      shouldAttachHlsAfterImport({
        cancelled: false,
        video: expected,
        expectedVideo: expected,
      }),
    ).toBe(true);
  });

  it("does not attach a player if unmount happens before the import resolves", async () => {
    let cancelled = false;
    const importResolution = Promise.resolve();

    cancelled = true;
    await importResolution;

    expect(
      shouldAttachHlsAfterImport({
        cancelled,
        video: expected,
        expectedVideo: expected,
      }),
    ).toBe(false);
  });

  it("does not attach after unmount or effect cleanup", () => {
    expect(
      shouldAttachHlsAfterImport({
        cancelled: true,
        video: expected,
        expectedVideo: expected,
      }),
    ).toBe(false);
  });

  it("does not attach when the video node is gone", () => {
    expect(
      shouldAttachHlsAfterImport({
        cancelled: false,
        video: null,
        expectedVideo: expected,
      }),
    ).toBe(false);
  });

  it("does not attach to a replaced video element", () => {
    expect(
      shouldAttachHlsAfterImport({
        cancelled: false,
        video: other,
        expectedVideo: expected,
      }),
    ).toBe(false);
  });
});

describe("FullscreenVideoSection hls.js loading", () => {
  const dir = dirname(fileURLToPath(import.meta.url));
  const playbackSource = readFileSync(join(dir, "hls-playback.ts"), "utf8");
  const componentSource = readFileSync(
    join(dir, "../components/site/FullscreenVideoSection.tsx"),
    "utf8",
  );

  it("prefetches hls.js on the client only when native HLS is unavailable", () => {
    expect(componentSource).toContain("prefetchHlsJs");
    expect(componentSource).toContain('typeof document !== "undefined"');
    expect(componentSource).toContain('import("hls.js")');
  });

  it("attaches hls.js from the playback effect after capability checks", () => {
    expect(componentSource).toContain("shouldLoadHlsJs(");
    expect(componentSource).toContain("canPlayNativeHls(element)");
    expect(componentSource).toContain("prefetchHlsJs ?? import(\"hls.js\")");
  });

  it("locks loop and restarts when HLS or native playback ends", () => {
    expect(componentSource).toContain("lockVideoLoop(element)");
    expect(componentSource).toContain("bindVideoLoopRestart(element");
    expect(componentSource).toMatch(/\bloop\b/);
  });

  it("selects native HLS from canPlayType, not user-agent sniffing", () => {
    expect(playbackSource).not.toMatch(/userAgent/);
    expect(playbackSource).not.toMatch(/Safari/);
    expect(playbackSource).not.toMatch(/iPhone|iPad|iPod/);
    expect(playbackSource).toContain("application/vnd.apple.mpegurl");
    expect(playbackSource).toContain("application/x-mpegURL");
    expect(playbackSource).toContain("canPlayType");
  });
});
