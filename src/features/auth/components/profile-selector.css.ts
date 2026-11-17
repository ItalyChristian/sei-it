import { style } from "@vanilla-extract/css";

const colors = {
  bgOffWhite: "#F8FAFC",
  cardBg: "#FFFFFF",
  border: "#E2E8F0",
  textDark: "#0F172A",
  textMuted: "#64748B",
  primaryBlue: "#2563EB",
  primaryBlueLight: "#EFF6FF",
  primaryBlueBorder: "#BFDBFE",
};

export const mainContainer = style({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.bgOffWhite,
  padding: "16px",
});

export const card = style({
  maxWidth: "672px",
  width: "100%",
  backgroundColor: colors.cardBg,
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  border: `1px solid ${colors.border}`,
});

export const title = style({
  fontSize: "30px",
  fontWeight: "bold",
  color: colors.textDark,
  textAlign: "center",
  marginBottom: "8px",
});

export const subtitle = style({
  color: colors.textMuted,
  textAlign: "center",
  marginBottom: "32px",
});

export const featuredGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
  marginBottom: "32px",
  "@media": {
    "(min-width: 768px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

export const profileButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  padding: "24px",
  borderRadius: "12px",
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.cardBg,
  cursor: "pointer",
  transition: "all 0.2s ease",
  ":hover": {
    borderColor: colors.primaryBlue,
    backgroundColor: colors.primaryBlueLight,
  },
});

export const profileAvatar = style({
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  backgroundColor: colors.primaryBlueLight,
  color: colors.primaryBlue,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "20px",
});

export const profileName = style({
  fontWeight: "600",
  color: colors.textDark,
});

export const profileRole = style({
  fontSize: "12px",
  color: colors.textMuted,
  textTransform: "capitalize",
});

export const dropdownContainer = style({
  paddingTop: "24px",
  borderTop: `1px solid ${colors.bgOffWhite}`,
});

export const dropdownLabel = style({
  display: "block",
  fontSize: "14px",
  fontWeight: "500",
  color: colors.textDark,
  marginBottom: "8px",
});

export const selectInput = style({
  width: "100%",
  padding: "12px",
  border: `1px solid ${colors.border}`,
  borderRadius: "8px",
  backgroundColor: colors.cardBg,
  fontSize: "14px",
  outline: "none",
  ":focus": {
    borderColor: colors.primaryBlue,
    boxShadow: `0 0 0 2px ${colors.primaryBlueBorder}`,
  },
});
