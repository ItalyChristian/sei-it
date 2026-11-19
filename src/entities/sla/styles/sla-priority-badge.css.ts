import { badgeBase, tone } from "@/shared/styles/components/badge-base.css";
import { style } from "@vanilla-extract/css";

export const slaPriorityCritical = style([badgeBase, tone.danger]);
export const slaPriorityHigh = style([badgeBase, tone.warning]);
export const slaPriorityMedium = style([badgeBase, tone.info]);
export const slaPriorityLow = style([badgeBase, tone.neutral]);
