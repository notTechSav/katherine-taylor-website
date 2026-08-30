import { describe, expect, it } from "vitest";
import {
  applyVideoMute,
  pleaseStandBySponsor,
  pleaseStandByVideo,
  soundControlAriaLabel,
} from "./please-stand-by";

describe("please-stand-by sound control", () => {
  it("starts muted with the same play-audio label as the first interlude", () => {
    expect(soundControlAriaLabel(true)).toBe("Play audio");
  });

  it("toggles to mute-video after opt-in", () => {
    expect(soundControlAriaLabel(false)).toBe("Mute video");
  });

  it("keeps the UI truthful if unmuting is blocked", () => {
    const blocked = {
      _muted: true,
      get muted() {
        return this._muted;
      },
      set muted(value: boolean) {
        if (value) {
          this._muted = true;
        }
      },
    };

    expect(applyVideoMute(blocked, false)).toBe(true);
    expect(soundControlAriaLabel(true)).toBe("Play audio");
  });

  it("applies mute and unmute when the element accepts them", () => {
    const video = { muted: true };
    expect(applyVideoMute(video, false)).toBe(false);
    expect(applyVideoMute(video, true)).toBe(true);
  });
});

describe("please-stand-by assets", () => {
  it("uses the dedicated route video, not the first interlude", () => {
    expect(pleaseStandByVideo.src).toBe("/film/please-stand-by.mp4");
    expect(pleaseStandByVideo.poster).toBe("/film/please-stand-by.jpg");
    expect(pleaseStandBySponsor.href).toBe("https://trudoco.com/");
  });
});
