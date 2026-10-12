/** Prefix root-relative links when the site is served from a subpath. */
export function sitePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (!path.startsWith('/') || base === '') return path;
  if (/\.[a-z0-9]+$/i.test(path)) return `${base}${path}`;
  return `${base}${path.endsWith('/') ? path : `${path}/`}`;
}
