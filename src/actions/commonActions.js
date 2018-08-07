import { OPEN_NAV, CLOSE_NAV } from "./types";

export const handleDrawerOpen = () => {
  return {
    type: OPEN_NAV,
    payload: true
  };
};

export const handleDrawerClose = () => {
  return {
    type: CLOSE_NAV,
    payload: false
  };
};
