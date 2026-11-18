import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const dropdownContainer = style({
  paddingTop: "24px",
  borderTop: `1px solid ${colors.offWhite}`,
});

export const selectInput = style({
  width: "100%",
  padding: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: `1px solid ${colors.border}`,
  borderRadius: "8px",
  backgroundColor: "white",
  fontSize: "14px",
  outline: "none",
  textAlign: "left",
  cursor: "pointer",
  ":focus": {
    borderColor: colors.primary,
    boxShadow: `0 0 0 2px ${colors.primaryBorder}`,
  },
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
  },
});

export const selectContent = style({
  zIndex: 50,
  minWidth: "var(--radix-select-trigger-width)",
  maxHeight: "var(--radix-select-content-available-height)",
  overflow: "hidden",
  backgroundColor: "white",
  border: `1px solid ${colors.border}`,
  borderRadius: "8px",
  boxShadow: "0 10px 20px rgb(15 23 42 / 0.12)",
});

export const selectViewport = style({
  padding: "4px",
});

export const selectLabel = style({
  padding: "8px 12px",
  color: colors.textMuted,
  fontSize: "12px",
  fontWeight: "600",
});

export const selectItem = style({
  display: "flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: "4px",
  color: colors.textDark,
  fontSize: "14px",
  outline: "none",
  cursor: "pointer",
  selectors: {
    "&[data-highlighted]": {
      backgroundColor: colors.primaryLight,
      color: colors.textDark,
    },
    "&[data-disabled]": {
      color: colors.textMuted,
      cursor: "not-allowed",
    },
  },
});
