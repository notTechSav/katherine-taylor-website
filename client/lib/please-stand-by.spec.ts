import { describe, expect, it } from "vitest";
import {
  SOUND_OFF_LABEL,
  SOUND_ON_LABEL,
  applyVideoMute,
  pleaseStandBySponsor,
  pleaseStandByVideo,
  soundControlCopy,
} from "./please-stand-by";

describe("please-stand-by sound control", () => {
  it("starts from SOUND ON while muted", () => {
    expect(soundControlCopy(true)).toEqual({
      label: SOUND_ON_LABEL,
      ariaLabel: "Sound on",
    });
  });

  it("toggles visible copy and aria-label with mute state", () => {
    expect(soundControlCopy(false)).toEqual({
      label: SOUND_OFF_LABEL,
      ariaLabel: "Sound off",
    });
    expect(soundControlCopy(true).label).toBe(SOUND_ON_LABEL);
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
    expect(soundControlCopy(true).label).toBe(SOUND_ON_LABEL);
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
