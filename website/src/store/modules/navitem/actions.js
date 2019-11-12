export function setActiveNavItem(navItem) {
  return {
    type: '@navitem/SET_ACTIVE_NAVITEM',
    payload: { navItem },
  };
}
