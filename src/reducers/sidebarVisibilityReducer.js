const sidebarVisibilityReducer = function (sidebarVisible = false, action) {
  let nextSidebarVisible;

  switch (action.type) {
    case 'TOGGLE_SIDEBAR_VISIBILITY':
      nextSidebarVisible = !sidebarVisible;
      break;
    default:
      nextSidebarVisible = sidebarVisible;
      break;
  }

  return nextSidebarVisible;
};

export default sidebarVisibilityReducer;