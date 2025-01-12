/**
 * Converts a text string into a URL-friendly slug.
 *
 * @param text - The string to be converted into a slug
 * @returns A lowercase string with special characters replaced by hyphens and trimmed of leading/trailing hyphens
 *
 * @example
 * ```typescript
 * generateSlug("Hello World!"); // returns "hello-world"
 * generateSlug("This Is A Test"); // returns "this-is-a-test"
 * generateSlug("@#$Special^^&"); // returns "special"
 * ```
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function decodeSlug(slug: string): string {
  return slug.replace(/-/g, ' ');
}

export const slugify = {
  generateSlug,
  decodeSlug,
};
