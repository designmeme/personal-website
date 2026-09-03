import React from "react"
import {renderToStaticMarkup} from "react-dom/server"
import {describe, expect, it} from "vitest"
import PageMeta from "./page-meta"

describe("PageMeta", () => {
    it("shows the updated date and reading time together without the created date", () => {
        const legacyProps = {
            createdAt: "2020-01-01T00:00:00+09:00",
            updatedAt: "2024-01-02T00:00:00+09:00",
            readMinutes: 3,
        }
        const markup = renderToStaticMarkup(
            <PageMeta {...legacyProps}/>
        )

        expect(markup).toContain('dateTime="2024-01-02T00:00:00+09:00"')
        expect(markup).toContain("3-4분 읽기")
        expect(markup).not.toContain('dateTime="2020-01-01T00:00:00+09:00"')
    })
})
