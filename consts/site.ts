// Central site/SEO configuration.
// Base URL is environment-driven (NEXT_PUBLIC_FRONTEND_HOME) with the
// canonical production domain as the fallback. We strip any trailing slash so
// callers can safely do `${SITE_URL}${path}`.
const rawSiteUrl =
  process.env.NEXT_PUBLIC_FRONTEND_HOME || "https://tusuapp.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_NAME = "Tusu";

export const SITE_TITLE =
  "Tusu — Expert Language Tutors & IELTS Preparation, 1-on-1 Online";

export const SITE_DESCRIPTION =
  "Tusu connects you with certified, native-speaking language tutors and IELTS specialists for personalised 1-on-1 online lessons. Reach fluency faster or hit your target band score.";

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

// Build a schema.org BreadcrumbList object for JSON-LD. Google uses this to
// render the breadcrumb trail (Home › Language Tutors) in search results.
// Pass the trail from the site root to the current page, e.g.
//   buildBreadcrumbs([{ name: "Home", path: "/" }, { name: "Language Tutors", path: "/our-tutors" }])
export const buildBreadcrumbs = (
  items: { name: string; path: string }[]
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
