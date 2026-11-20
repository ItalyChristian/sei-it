import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const emptyState = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px",
  textAlign: "center",
  background: colors.offWhite,
});

export const emptyIcon = style({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "white",
  border: `1px solid ${colors.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.textMuted,
  marginBottom: "24px",
});

export const emptyTitle = style({
  fontSize: "18px",
  fontWeight: 700,
  color: colors.textDark,
  margin: 0,
  marginBottom: "8px",
});

export const emptyDescription = style({
  fontSize: "13px",
  color: colors.textMuted,
  maxWidth: "400px",
  lineHeight: 1.5,
  margin: 0,
});
