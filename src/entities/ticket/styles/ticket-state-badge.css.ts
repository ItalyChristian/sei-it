import { badgeBase, tone } from "@/shared/styles/components/badge-base.css";
import { style } from "@vanilla-extract/css";

export const ticketOpen = style([badgeBase, tone.neutral]);
export const ticketProgress = style([badgeBase, tone.info]);
export const ticketAwaitingClient = style([badgeBase, tone.warning]);
export const ticketResolved = style([badgeBase, tone.success]);
export const ticketClosed = style([badgeBase, tone.success]);
