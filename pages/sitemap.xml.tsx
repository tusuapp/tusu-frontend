import { GetServerSideProps } from "next";
import { SITE_URL } from "../consts/site";

// Public, indexable marketing pages. Authenticated dashboards (/student, /tutor,
// /accounts) are intentionally excluded — they're also blocked in robots.txt.
const PUBLIC_ROUTES: { path: string; priority: number; changefreq: string }[] = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/our-tutors", priority: 0.9, changefreq: "daily" },
  { path: "/about", priority: 0.7, changefreq: "monthly" },
  { path: "/contact", priority: 0.6, changefreq: "monthly" },
  { path: "/signup", priority: 0.5, changefreq: "monthly" },
  { path: "/signup/student", priority: 0.5, changefreq: "monthly" },
  { path: "/signup/tutor", priority: 0.5, changefreq: "monthly" },
  { path: "/signin", priority: 0.4, changefreq: "monthly" },
];

const buildSitemap = (): string => {
  const urls = PUBLIC_ROUTES.map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path === "/" ? "" : path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );
  res.write(buildSitemap());
  res.end();

  return { props: {} };
};

// Next.js requires a default export for a page, but this route only ever
// responds via getServerSideProps above.
const Sitemap = () => null;

export default Sitemap;
