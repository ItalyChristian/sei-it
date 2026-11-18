import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const dropdownContainer = style({
  margin: 0,
  padding: 0,
});

export const selectInput = style({
  width: "100%",
  minWidth: 200,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "12px",

  fontSize: "14px",
  outline: "none",
  textAlign: "left",
  border: `1px solid ${colors.border}`,
  borderRadius: "8px",
  backgroundColor: "white",

  cursor: "pointer",
  ":focus": {
    borderColor: colors.primary,
    boxShadow: `0 0 0 2px ${colors.primaryBorder}`,
  },
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
  },

  selectors: {
    "&[data-placeholder]": { color: "#9ca3af" },
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

export const selectValue = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  flex: 1,
  textAlign: "left",
});

export const selectIcons = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexShrink: 0,
});

export const clearButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 2,
  borderRadius: 4,
  cursor: "pointer",
  color: "#6b7280",
  selectors: {
    "&:hover": { background: "#f3f4f6", color: "#111827" },
  },
});
