import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const header = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",

  backgroundColor: "white",
  borderBottom: `1px solid ${colors.border}`,
});

export const titleContainer = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "10rem",
});

export const title = style({
  color: colors.textDark,
  fontSize: "1.5rem",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  marginBottom: "8px",
});

export const info = style({
  display: "flex",
  gap: "1.5rem",

  color: colors.textMuted,
  fontSize: "0.8rem",
});

export const infoItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
});

export const actions = style({
  display: "flex",
  gap: "12px",
});
