import { describe, expect, it } from "vitest";
import {
  filterMobileHlsMaster,
  HLS_MAX_HEIGHT,
  HLS_START_HEIGHT,
  isHlsSource,
  OPENING_HLS_PROXY_PATH,
  pickHlsCapLevel,
  pickHlsStartLevel,
} from "./video-sections";

const STREAM_MASTER = `https://customer-xyp94kxe4za8b3w1.cloudflarestream.com/f17ef86e3e7fbfa3d2d58dd3bd3d9065/manifest/video.m3u8`;

const sampleMaster = `#EXTM3U
#EXT-X-VERSION:6
#EXT-X-INDEPENDENT-SEGMENTS
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="group_audio",NAME="original",LANGUAGE="en",DEFAULT=YES,AUTOSELECT=YES,URI="stream_audio.m3u8"
#EXT-X-STREAM-INF:RESOLUTION=1920x1080,CODECS="avc1.4d4028,mp4a.40.2",BANDWIDTH=3909234,SCORE=5.0,FRAME-RATE=23.976,AUDIO="group_audio"
stream_1080.m3u8
#EXT-X-STREAM-INF:RESOLUTION=1280x720,CODECS="avc1.4d401f,mp4a.40.2",BANDWIDTH=1991860,SCORE=4.0,FRAME-RATE=23.976,AUDIO="group_audio"
stream_720.m3u8
#EXT-X-STREAM-INF:RESOLUTION=852x480,CODECS="avc1.4d401e,mp4a.40.2",BANDWIDTH=1157031,SCORE=3.0,FRAME-RATE=23.976,AUDIO="group_audio"
stream_480.m3u8
#EXT-X-STREAM-INF:RESOLUTION=640x360,CODECS="avc1.4d401e,mp4a.40.2",BANDWIDTH=833422,SCORE=2.0,FRAME-RATE=23.976,AUDIO="group_audio"
stream_360.m3u8
#EXT-X-STREAM-INF:RESOLUTION=426x240,CODECS="avc1.42c015,mp4a.40.2",BANDWIDTH=621113,SCORE=1.0,FRAME-RATE=23.976,AUDIO="group_audio"
stream_240.m3u8
`;

describe("hls helpers", () => {
  it("treats the opening proxy path as HLS", () => {
    expect(isHlsSource(OPENING_HLS_PROXY_PATH)).toBe(true);
  });

  it("starts at 1080p and never 240p or 480p when a 1080p rung exists", () => {
    const levels = [
      { height: 240 },
      { height: 360 },
      { height: 480 },
      { height: 720 },
      { height: 1080 },
    ];
    expect(pickHlsStartLevel(levels, HLS_START_HEIGHT)).toBe(4);
    expect(levels[pickHlsStartLevel(levels)].height).toBe(1080);
  });

  it("caps at 1080p when that rung exists", () => {
    const levels = [
      { height: 480 },
      { height: 720 },
      { height: 1080 },
    ];
    expect(pickHlsCapLevel(levels, HLS_MAX_HEIGHT)).toBe(2);
  });
});

describe("filterMobileHlsMaster", () => {
  const filtered = filterMobileHlsMaster(sampleMaster, STREAM_MASTER);

  it("lists 1080p only, and drops 720p and below", () => {
    expect(filtered).toContain("RESOLUTION=1920x1080");
    expect(filtered).not.toContain("RESOLUTION=1280x720");
    expect(filtered).not.toContain("RESOLUTION=852x480");
    expect(filtered).not.toContain("426x240");
    expect(filtered).not.toContain("640x360");

    expect(filtered.match(/RESOLUTION=/g)).toHaveLength(1);
  });

  it("strips SCORE so Safari does not prefer 1080/720 as the start rung", () => {
    expect(filtered).not.toMatch(/SCORE=/);
  });

  it("rewrites relative child playlists to absolute Stream URLs", () => {
    expect(filtered).toContain(
      `${STREAM_MASTER.replace(/video\.m3u8$/, "stream_1080.m3u8")}`,
    );
    expect(filtered).toContain(
      'URI="https://customer-xyp94kxe4za8b3w1.cloudflarestream.com/f17ef86e3e7fbfa3d2d58dd3bd3d9065/manifest/stream_audio.m3u8"',
    );
  });
});
