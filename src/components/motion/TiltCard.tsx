import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  /** Maximum tilt in degrees. */
  max?: number;
  /** Show the moving specular highlight. */
  glare?: boolean;
}

/**
 * 3D perspective tilt that follows the pointer, with a soft glare.
 * Server component: pointer handling is delegated to one document-level
 * listener in <MotionController> that writes CSS variables. Touch and
 * reduced-motion users get a static card.
 */
export function TiltCard({
  children,
  className,
  as = "div",
  max = 8,
  glare = true,
}: TiltCardProps) {
  const Tag = as as "div";
  return (
    <Tag
      data-tilt={max}
      className={cn(
        "group/tilt relative transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]",
        "[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
        className,
      )}
    >
      {children}
      {glare && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: "var(--glare, 0)",
            background:
              "radial-gradient(600px circle at var(--gx,50%) var(--gy,50%), rgb(191 247 71 / 0.12), transparent 40%)",
          }}
        />
      )}
    </Tag>
  );
}
