import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

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
});

export const ticketTitle = style({
  color: colors.textDark,
  fontWeight: 600,
});

export const ticketCategory = style({
  color: colors.textMuted,
  fontSize: "12px",
});

export const priorityBadge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 9px",
  borderRadius: radii.full,
  fontSize: "11px",
  fontWeight: 600,
  whiteSpace: "nowrap",
});

export const priorityVariants = styleVariants({
  critica: {
    color: colors.dangerRed,
    backgroundColor: `color-mix(in srgb, ${colors.dangerRed} 12%, white)`,
  },
  alta: {
    color: colors.warningOrange,
    backgroundColor: `color-mix(in srgb, ${colors.warningOrange} 14%, white)`,
  },
  media: {
    color: colors.textDark,
    backgroundColor: `color-mix(in srgb, ${colors.accentYellow} 55%, white)`,
  },
  baixa: {
    color: colors.successGreen,
    backgroundColor: `color-mix(in srgb, ${colors.successGreen} 12%, white)`,
  },
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

export const dataTable = style({
  selectors: {
    "&.p-datatable": {
      overflow: "hidden",
      border: `1px solid ${colors.border}`,
      borderRadius: radii.xl,
      backgroundColor: "white",
      boxShadow: colors.shadowSm,
    },
  },
});

globalStyle(`${dataTable} .p-datatable-header`, {
  padding: 0,
  border: 0,
  backgroundColor: "white",
});

globalStyle(`${dataTable} .p-datatable-wrapper`, {
  overflowX: "auto",
});

globalStyle(`${dataTable} .p-datatable-table`, {
  minWidth: "60rem",
  width: "100%",
});

globalStyle(`${dataTable} .p-datatable-thead > tr > th`, {
  padding: "14px 16px",
  borderColor: colors.border,
  backgroundColor: colors.offWhite,
  color: colors.textMuted,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
});

globalStyle(`${dataTable} .p-datatable-tbody > tr > td`, {
  padding: "14px 16px",
  borderColor: colors.border,
  color: colors.textDark,
  fontSize: "13px",
});

globalStyle(`${dataTable} .p-datatable-tbody > tr:not(.p-highlight):hover`, {
  backgroundColor: colors.offWhite,
});

globalStyle(`${dataTable} .p-paginator`, {
  justifyContent: "flex-end",
  gap: "4px",
  padding: "10px 12px",
  border: 0,
  borderTop: `1px solid ${colors.border}`,
  borderRadius: 0,
  backgroundColor: "white",
});

globalStyle(`${dataTable} .p-paginator .p-paginator-current`, {
  marginRight: "auto",
  color: colors.textMuted,
  fontSize: "12px",
});

globalStyle(`${dataTable} .p-paginator .p-paginator-page.p-highlight`, {
  borderColor: colors.primary,
  backgroundColor: colors.primary,
  color: "white",
});
