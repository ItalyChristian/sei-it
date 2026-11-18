import { globalStyle, style } from "@vanilla-extract/css";
import { colors } from "../colors.css";
import { radii } from "../sizes.css";

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
