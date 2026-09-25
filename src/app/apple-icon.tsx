import { ImageResponse } from "next/og";
import {
  LOGO_BAR_PATH,
  LOGO_STROKE_WIDTH,
  LOGO_VIEWBOX,
  LOGO_WAVE_PATH,
} from "@/lib/logo-geometry";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0b",
      }}
    >
      <svg
        width="132"
        height="85"
        viewBox={LOGO_VIEWBOX}
        fill="none"
        stroke="#bff747"
        strokeWidth={LOGO_STROKE_WIDTH + 10}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={LOGO_WAVE_PATH} />
        <path d={LOGO_BAR_PATH} />
      </svg>
    </div>,
    size,
  );
}
