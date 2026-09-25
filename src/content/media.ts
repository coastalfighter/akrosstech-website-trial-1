import type { StaticImageData } from "next/image";
import heroEarth from "@/assets/images/hero-earth.jpg";
import codeDark from "@/assets/images/code-dark.jpg";
import codeLaptop from "@/assets/images/code-laptop.jpg";
import codeDesk from "@/assets/images/code-desk.jpg";
import circuitTeal from "@/assets/images/circuit-teal.jpg";
import circuitBoard from "@/assets/images/circuit-board.jpg";
import serverRack from "@/assets/images/server-rack.jpg";
import networkCables from "@/assets/images/network-cables.jpg";
import teamLaptops from "@/assets/images/team-laptops.jpg";
import developers from "@/assets/images/developers.jpg";
import meeting from "@/assets/images/meeting.jpg";
import workshop from "@/assets/images/workshop.jpg";
import vaLaptop from "@/assets/images/va-laptop.jpg";
import typing from "@/assets/images/typing.jpg";
import analytics from "@/assets/images/analytics.jpg";
import accountingDocs from "@/assets/images/accounting-docs.jpg";
import justice from "@/assets/images/justice.jpg";
import library from "@/assets/images/library.jpg";
import handshake from "@/assets/images/handshake.jpg";
import highFive from "@/assets/images/high-five.jpg";
import laptopGlow from "@/assets/images/laptop-glow.jpg";
import blocks from "@/assets/images/blocks.jpg";
import security from "@/assets/images/security.jpg";

import heroEarthGraded from "@/assets/images/graded/hero-earth.jpg";
import codeDarkGraded from "@/assets/images/graded/code-dark.jpg";
import codeLaptopGraded from "@/assets/images/graded/code-laptop.jpg";
import codeDeskGraded from "@/assets/images/graded/code-desk.jpg";
import circuitTealGraded from "@/assets/images/graded/circuit-teal.jpg";
import circuitBoardGraded from "@/assets/images/graded/circuit-board.jpg";
import serverRackGraded from "@/assets/images/graded/server-rack.jpg";
import networkCablesGraded from "@/assets/images/graded/network-cables.jpg";
import teamLaptopsGraded from "@/assets/images/graded/team-laptops.jpg";
import developersGraded from "@/assets/images/graded/developers.jpg";
import meetingGraded from "@/assets/images/graded/meeting.jpg";
import workshopGraded from "@/assets/images/graded/workshop.jpg";
import vaLaptopGraded from "@/assets/images/graded/va-laptop.jpg";
import typingGraded from "@/assets/images/graded/typing.jpg";
import analyticsGraded from "@/assets/images/graded/analytics.jpg";
import accountingDocsGraded from "@/assets/images/graded/accounting-docs.jpg";
import justiceGraded from "@/assets/images/graded/justice.jpg";
import libraryGraded from "@/assets/images/graded/library.jpg";
import handshakeGraded from "@/assets/images/graded/handshake.jpg";
import highFiveGraded from "@/assets/images/graded/high-five.jpg";
import laptopGlowGraded from "@/assets/images/graded/laptop-glow.jpg";
import blocksGraded from "@/assets/images/graded/blocks.jpg";
import securityGraded from "@/assets/images/graded/security.jpg";

export interface Photo {
  src: StaticImageData;
  alt: string;
}

/**
 * Every photo on the site, with descriptive alt text. Photos are from
 * Unsplash (free commercial licence) — see docs/IMAGE_CREDITS.md.
 * Static imports give us intrinsic sizes and automatic blur placeholders.
 */
export const photos = {
  heroEarth: {
    src: heroEarth,
    alt: "Earth at night from orbit, with city lights forming a glowing network across continents",
  },
  codeDark: { src: codeDark, alt: "Close-up of source code on a dark monitor" },
  codeLaptop: { src: codeLaptop, alt: "Laptop screen showing colour-highlighted code" },
  codeDesk: { src: codeDesk, alt: "Laptop with code on screen on a tidy desk" },
  circuitTeal: { src: circuitTeal, alt: "Glowing teal circuit traces on a dark background" },
  circuitBoard: { src: circuitBoard, alt: "Macro photo of a computer circuit board" },
  serverRack: { src: serverRack, alt: "Server rack with neatly routed network cables" },
  networkCables: { src: networkCables, alt: "Network switch with blue and grey ethernet cables" },
  teamLaptops: {
    src: teamLaptops,
    alt: "A remote team collaborating around laptops at a shared table",
  },
  developers: { src: developers, alt: "Two professionals working at computers in a bright office" },
  meeting: { src: meeting, alt: "Team meeting with laptops around a conference table" },
  workshop: { src: workshop, alt: "Team workshop with a presenter at a whiteboard" },
  vaLaptop: { src: vaLaptop, alt: "Two people reviewing work together on a laptop" },
  typing: { src: typing, alt: "Hands typing on a laptop keyboard" },
  analytics: { src: analytics, alt: "Laptop displaying financial analytics dashboards" },
  accountingDocs: {
    src: accountingDocs,
    alt: "Professionals reviewing financial documents beside a laptop",
  },
  justice: { src: justice, alt: "Statue of Lady Justice holding the scales" },
  library: { src: library, alt: "Law library with busts and shelves of books" },
  handshake: { src: handshake, alt: "Business handshake sealing a partnership" },
  highFive: { src: highFive, alt: "Two colleagues celebrating a win with a high five" },
  laptopGlow: { src: laptopGlow, alt: "Laptop glowing with colourful light in a dark room" },
  blocks: { src: blocks, alt: "Abstract network of connected glowing cubes" },
  security: { src: security, alt: "Padlock on a keyboard representing data security" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * Pre-graded variants (generated by `node scripts/grade-images.mjs`) for
 * full-bleed backgrounds: the cinematic grade is baked in, so no runtime
 * CSS filter/overlay is needed and they paint far faster.
 */
export const gradedPhotos: Record<PhotoKey, StaticImageData> = {
  heroEarth: heroEarthGraded,
  codeDark: codeDarkGraded,
  codeLaptop: codeLaptopGraded,
  codeDesk: codeDeskGraded,
  circuitTeal: circuitTealGraded,
  circuitBoard: circuitBoardGraded,
  serverRack: serverRackGraded,
  networkCables: networkCablesGraded,
  teamLaptops: teamLaptopsGraded,
  developers: developersGraded,
  meeting: meetingGraded,
  workshop: workshopGraded,
  vaLaptop: vaLaptopGraded,
  typing: typingGraded,
  analytics: analyticsGraded,
  accountingDocs: accountingDocsGraded,
  justice: justiceGraded,
  library: libraryGraded,
  handshake: handshakeGraded,
  highFive: highFiveGraded,
  laptopGlow: laptopGlowGraded,
  blocks: blocksGraded,
  security: securityGraded,
};

/** Imagery per service slug (hero + secondary). */
export const servicePhotos: Record<string, { hero: PhotoKey; detail: PhotoKey }> = {
  "website-development": { hero: "codeDark", detail: "codeDesk" },
  "recruitment-process-outsourcing": { hero: "teamLaptops", detail: "meeting" },
  "virtual-assistance": { hero: "vaLaptop", detail: "typing" },
  "accounting-assistance": { hero: "analytics", detail: "accountingDocs" },
  "legal-process-outsourcing": { hero: "justice", detail: "library" },
};

/** Imagery per blog slug. */
export const blogPhotos: Record<string, PhotoKey> = {
  "what-is-recruitment-process-outsourcing-rpo": "workshop",
  "hr-outsourcing-services-vs-rpo-whats-best-for-your-business": "meeting",
  "what-is-a-virtual-assistant-va-benefits-services-how-to-hire-one": "typing",
};

export const blogPhoto = (slug: string): Photo => photos[blogPhotos[slug] ?? "blocks"];
