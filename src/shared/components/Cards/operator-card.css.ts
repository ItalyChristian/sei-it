import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
});

export const avatar = style({
  width: "40px",
  height: "40px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: colors.status.info.text,
  fontWeight: 600,
  fontSize: "1rem",
  background: colors.status.info.bg,
  borderRadius: "50%",
});

export const name = style({
  fontWeight: 600,
  fontSize: "15px",
});

export const loadBar = style({
  height: " 8px",
  margin: "1rem 0",

  background: colors.offWhite,
  borderRadius: radii.xs,

  overflow: "hidden",
});

export const loadFill = style({
  height: "100%",
  borderRadius: radii.xs,
});

export const stats = style({
  display: "flex",
  justifyContent: " space-between",

  color: colors.textMuted,
  fontSize: "12px",

  marginBottom: "1rem",
});
