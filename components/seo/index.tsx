import Head from "next/head";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_HEIGHT,
  SITE_OG_IMAGE_WIDTH,
  SITE_TITLE,
  SITE_TWITTER,
  absoluteUrl,
} from "../../consts/site";

type SeoProps = {
  /** Page title. The site name is appended automatically unless `titleAsIs`. */
  title?: string;
  /** Render the title exactly as given, without appending the site name. */
  titleAsIs?: boolean;
  description?: string;
  /** Path (e.g. "/our-tutors") or absolute URL used for the canonical/og:url. */
  canonical?: string;
  /** Absolute URL of the social share image. */
  image?: string;
  /** og:type — "website" (default) or "profile", "article", etc. */
  type?: string;
  /** When true, instructs search engines not to index this page. */
  noindex?: boolean;
  /** Optional JSON-LD structured data object (or array of objects). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

// NOTE: every tag carries a stable `key` so that next/head de-duplicates
// against the baseline <Seo /> rendered in _app.tsx — the page-level instance
// always wins. Without keys, defaults and overrides would both be emitted.
const Seo = ({
  title,
  titleAsIs = false,
  description = SITE_DESCRIPTION,
  canonical,
  image = SITE_OG_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const fullTitle = title
    ? titleAsIs
      ? title
      : `${title} | ${SITE_NAME}`
    : SITE_TITLE;

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : absoluteUrl(canonical)
    : undefined;

  // Only advertise dimensions for the default image; a custom image's size
  // is unknown, so we omit width/height to avoid lying to crawlers.
  const isDefaultImage = image === SITE_OG_IMAGE;

  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta
        key="viewport"
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
      <meta key="description" name="description" content={description} />

      {noindex ? (
        <meta key="robots" name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          key="robots"
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {canonicalUrl && (
        <link key="canonical" rel="canonical" href={canonicalUrl} />
      )}

      {/* Open Graph */}
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:title" property="og:title" content={fullTitle} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      {canonicalUrl && (
        <meta key="og:url" property="og:url" content={canonicalUrl} />
      )}
      {image && <meta key="og:image" property="og:image" content={image} />}
      {image && (
        <meta key="og:image:alt" property="og:image:alt" content={SITE_NAME} />
      )}
      {isDefaultImage && (
        <meta
          key="og:image:width"
          property="og:image:width"
          content={String(SITE_OG_IMAGE_WIDTH)}
        />
      )}
      {isDefaultImage && (
        <meta
          key="og:image:height"
          property="og:image:height"
          content={String(SITE_OG_IMAGE_HEIGHT)}
        />
      )}
      <meta key="og:locale" property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content={SITE_TWITTER} />
      <meta key="twitter:title" name="twitter:title" content={fullTitle} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      {image && (
        <meta key="twitter:image" name="twitter:image" content={image} />
      )}
      {image && (
        <meta key="twitter:image:alt" name="twitter:image:alt" content={SITE_NAME} />
      )}

      {jsonLd && (
        <script
          key="jsonLd"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default Seo;
