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
