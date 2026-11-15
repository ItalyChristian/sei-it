import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const item = style({
  padding: "20px 1.5rem",
  borderBottom: `1px solid  ${colors.border} `,
  cursor: "pointer",
  transition: `${colors.offWhite} 0.2s`,
});

export const active = style({
  borderLeft: `4px solid ${colors.primary}`,
});

export const list = style({
  overflowY: "auto",
  flex: 1,

  ":hover": {
    backgroundColor: colors.offWhite,
  },
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "8px",
});

export const id = style({
  fontSize: "12px",
  color: colors.textMuted,
  fontWeight: 500,
});

export const title = style({
  fontSize: "0.9rem",
  fontWeight: 600,
  marginBottom: "4px",
  color: colors.textDark,
});

export const snippet = style({
  fontSize: "0.8rem",
  color: colors.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const details = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: colors.offWhite,
});
