import http from "../../lib/http";

const controller = new AbortController();

export const getSuggestionByDepressionLevel = (depressionLevel) => {
  return http.get(`/suggestions?depressionLevel=${depressionLevel}`, { signal: controller.signal });
};
