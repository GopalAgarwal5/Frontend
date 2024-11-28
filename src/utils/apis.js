const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/authenticate",
};

export const projectEndpoints = {
  PROJECTS_LIST_API: BASE_URL + "/project/project-list",
  PROJECT_SAVE_API: BASE_URL + "/project/save",
  STATUS_UPDATE_API: BASE_URL + "/project/update-status",
};

export const dashboardEndpoints = {
  COUNTERS_API: BASE_URL + "/project/status-count",
  GRAPH_API: BASE_URL + "/project/graph-data",
  PIE_CHART_API: BASE_URL + "/project/pie-chart",
};
