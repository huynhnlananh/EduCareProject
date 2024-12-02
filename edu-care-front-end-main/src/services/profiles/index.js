import http from "../../lib/http";

const controller = new AbortController();

export const getInfoUserAsync = (id) => {
  return http.get(`/users/${id}`, { signal: controller.signal });
};

export const updateInfoUserAsync = (id, body) => {
  return http.patch(`/users/${id}`, body, { signal: controller.signal });
};
