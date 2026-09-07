import {describe, expect, it} from "vitest"

import config from "./gatsby-config"

describe("sitemap config", () => {
    it("excludes the design guide page", () => {
        const sitemapPlugin = config.plugins?.find(plugin =>
            typeof plugin === "object" && plugin.resolve === "gatsby-plugin-sitemap"
        )

        expect(sitemapPlugin).toMatchObject({
            options: {
                excludes: ["/design-guide/"],
            },
        })
    })
})

describe("RSS feed config", () => {
    it("uses the frontmatter excerpt as the item description", () => {
        const feedPlugin = config.plugins?.find(plugin =>
            typeof plugin === "object" && plugin.resolve === "gatsby-plugin-feed"
        ) as any
        const feed = feedPlugin.options.feeds[0]
        const [item] = feed.serialize({
            query: {
                site: {
                    siteMetadata: {
                        siteUrl: "https://example.com",
                    },
                },
                allPostMdx: {
                    nodes: [{
                        excerpt: "Generated excerpt without JSX content",
                        frontmatter: {
                            slug: "example",
                            title: "Example",
                            excerpt: "Explicit frontmatter excerpt",
                        },
                    }],
                },
            },
        })

        expect(item.description).toBe("Explicit frontmatter excerpt")
    })
})
