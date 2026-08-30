import { describe, expect, it } from "vitest";
import {
  bindVideoLoopRestart,
  lockVideoLoop,
  restartLoopingVideo,
} from "./video-loop";

function fakeVideo(initialTime = 12) {
  const listeners = new Map<string, Set<() => void>>();
  const element = {
    loop: false,
    currentTime: initialTime,
    attributes: new Map<string, string>(),
    playCalls: 0,
    setAttribute(name: string, value: string) {
      this.attributes.set(name, value);
    },
    addEventListener(name: string, handler: () => void) {
      const bucket = listeners.get(name) ?? new Set();
      bucket.add(handler);
      listeners.set(name, bucket);
    },
    removeEventListener(name: string, handler: () => void) {
      listeners.get(name)?.delete(handler);
    },
    play() {
      this.playCalls += 1;
      return Promise.resolve();
    },
    emit(name: string) {
      for (const handler of listeners.get(name) ?? []) {
        handler();
      }
    },
  };

  return element;
}

describe("video loop helpers", () => {
  it("locks the loop property and attribute", () => {
    const video = fakeVideo();
    lockVideoLoop(video as unknown as HTMLVideoElement);
    expect(video.loop).toBe(true);
    expect(video.attributes.get("loop")).toBe("");
  });

  it("restarts from the beginning", () => {
    const video = fakeVideo(18);
    restartLoopingVideo(video as unknown as HTMLVideoElement);
    expect(video.currentTime).toBe(0);
    expect(video.playCalls).toBe(1);
  });

  it("restarts on ended and can be unbound", () => {
    const video = fakeVideo(24);
    const stop = bindVideoLoopRestart(video as unknown as HTMLVideoElement);
    video.emit("ended");
    expect(video.currentTime).toBe(0);
    expect(video.playCalls).toBe(1);

    video.currentTime = 9;
    stop();
    video.emit("ended");
    expect(video.currentTime).toBe(9);
    expect(video.playCalls).toBe(1);
  });

  it("does not restart when the caller says the section is inactive", () => {
    const video = fakeVideo(6);
    bindVideoLoopRestart(video as unknown as HTMLVideoElement, () => false);
    video.emit("ended");
    expect(video.currentTime).toBe(6);
    expect(video.playCalls).toBe(0);
  });
});
