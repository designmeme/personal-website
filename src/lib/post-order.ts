export function getPostOrder(
    slugs: readonly string[],
    slug: unknown,
): number | null {
    if (typeof slug !== "string") {
        return null
    }

    const index = slugs.indexOf(slug)
    return index === -1 ? null : index + 1
}
