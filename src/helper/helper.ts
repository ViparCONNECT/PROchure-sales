import { BASE_ASSET_URL } from "../config/constants";

export const getAssetPath = (path: string) => {
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  return `${BASE_ASSET_URL}${path}`;
};

interface Sluggable {
  id: string;
  name: string;
  urlSlug?: string | null;
}

/** URL segment for a category/subcategory: the API's urlSlug, or the same rule the server uses to build it. */
export const slugOf = (item: Sluggable) =>
  item.urlSlug ||
  item.name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

/** Matches a URL segment against a category/subcategory (slug, or legacy id links). */
export const matchesSlug = (item: Sluggable, segment?: string) =>
  !!segment && (slugOf(item) === segment || item.id === segment);
