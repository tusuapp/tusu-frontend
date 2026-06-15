// Central site/SEO configuration.
// Base URL is environment-driven (NEXT_PUBLIC_FRONTEND_HOME) with the
// canonical production domain as the fallback. We strip any trailing slash so
// callers can safely do `${SITE_URL}${path}`.
const rawSiteUrl =
  process.env.NEXT_PUBLIC_FRONTEND_HOME || "https://tusuapp.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_NAME = "Tusu";

export const SITE_TITLE =
  "Tusu — Find Expert Online Tutors & Book 1-on-1 Classes";

export const SITE_DESCRIPTION =
  "Tusu connects students with expert tutors for personalised online classes. Browse tutors by subject, book 1-on-1 sessions and learn at your own pace.";

// Default social share image (Open Graph / Twitter). 1200x630 is ideal;
// the current banner is 411x307, so cards render as a smaller summary.
// TODO: replace with a dedicated 1200x630 share image for richer previews.
export const SITE_OG_IMAGE = `${SITE_URL}/image/banner-1.png`;
export const SITE_OG_IMAGE_WIDTH = 411;
export const SITE_OG_IMAGE_HEIGHT = 307;

export const SITE_TWITTER = "@tusuapp";

// Build an absolute canonical URL from a path (e.g. "/our-tutors").
export const absoluteUrl = (path = "/") => {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
