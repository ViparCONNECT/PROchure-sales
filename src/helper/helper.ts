import { BASE_ASSET_URL } from "../config/constants";

export const getAssetPath = (path: string) => {
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  return `${BASE_ASSET_URL}${path}`;
};
