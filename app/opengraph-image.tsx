import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RareScore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 70% 20%, #4a2290 0, #090613 48%, #050711 100%)",
          color: "white",
          fontFamily: "Georgia",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 124, letterSpacing: -6 }}>
            Rare<span style={{ color: "#d8b04b" }}>Score</span>
          </div>
          <div style={{ marginTop: 22, fontSize: 34, color: "#d8b04b", letterSpacing: 6 }}>
            IQ TEST • MORALITY TEST • RARITY TEST
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#d7d1df" }}>
            Find out how rare you really are.
          </div>
        </div>
      </div>
    ),
    size
  );
}
