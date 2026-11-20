import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const ticketNumber = style({
  color: colors.textMuted,
  fontFamily: "monospace",
  fontSize: "12px",
  fontWeight: 600,
});

export const ticketCell = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  minWidth: "220px",

  color: "inherit",
  textDecoration: "none",
  cursor: "pointer",
  ":hover": {
    textDecoration: "underline",
  },
});

export const ticketTitle = style({
  color: colors.textDark,
  fontWeight: 600,
});

export const ticketCategory = style({
  color: colors.textMuted,
  fontSize: "12px",
});

export const loadingState = style({
  padding: "40px 16px",
  color: colors.textMuted,
  fontSize: "14px",
  textAlign: "center",
});

export const errorState = style({
  padding: "40px 16px",
  color: colors.dangerRed,
  fontSize: "14px",
  textAlign: "center",
});
