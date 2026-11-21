import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const page = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: colors.offWhite,
});

export const topBar = style({
  padding: "12px 32px",
  borderBottom: `1px solid ${colors.border}`,
  background: "white",
  display: "flex",
  alignItems: "center",
});

export const content = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const loadingState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  color: colors.textMuted,
  fontSize: "14px",
});

export const notFound = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  gap: "16px",
  padding: "32px",
  textAlign: "center",
  color: colors.textDark,
});
