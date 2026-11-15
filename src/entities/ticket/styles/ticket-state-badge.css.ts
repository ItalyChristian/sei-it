import { radii } from "@/shared/styles/sizes.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const badge = style({
  fontSize: "11px",
  fontWeight: 600,
  padding: "4px 8px",
  borderRadius: radii.full,
  textTransform: "uppercase",
});

export const badgeVariants = styleVariants({
  open: {
    backgroundColor: "#DBEAFE",
    color: "#1E40AF",
  },

  progress: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },

  closed: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
  },
});

export const ticketOpen = style([badge, badgeVariants.open]);
export const ticketProgress = style([badge, badgeVariants.progress]);
export const ticketClosed = style([badge, badgeVariants.closed]);
