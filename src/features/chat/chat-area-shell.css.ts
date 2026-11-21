import { style } from "@vanilla-extract/css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  overflow: "hidden",
});

export const toolbar = style({
  flexShrink: 0,
});

export const content = style({
  display: "flex",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
});
