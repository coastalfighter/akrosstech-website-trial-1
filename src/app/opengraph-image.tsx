import { ImageResponse } from "next/og";
import {
  LOGO_BAR_PATH,
  LOGO_STROKE_WIDTH,
  LOGO_VIEWBOX,
  LOGO_WAVE_PATH,
} from "@/lib/logo-geometry";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background:
          "radial-gradient(circle at 85% 20%, rgba(61,123,255,0.35), transparent 45%), radial-gradient(circle at 10% 100%, rgba(34,211,238,0.22), transparent 40%), #05070d",
        color: "#f5f5f4",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg
          width="96"
          height="62"
          viewBox={LOGO_VIEWBOX}
          fill="none"
          stroke="#3d7bff"
          strokeWidth={LOGO_STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={LOGO_WAVE_PATH} />
          <path d={LOGO_BAR_PATH} />
        </svg>
        <span style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -3,
            textTransform: "uppercase",
          }}
        >
          Offshore Talent.
        </span>
        <span
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -3,
            textTransform: "uppercase",
            color: "#3d7bff",
          }}
        >
          Onshore Quality.
        </span>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a3adc2" }}
      >
        <span>Website Development · RPO · Virtual Assistance · Accounting · LPO</span>
        <span>akrosstech.com</span>
      </div>
    </div>,
    size,
  );
}
