import {describe, expect, it, vi} from "vitest"

import {scrollActiveTocItem} from "./toc"

describe("scrollActiveTocItem", () => {
    it("smoothly reveals the active TOC item at the nearest edge", () => {
        const scrollIntoView = vi.fn()
        const element = {scrollIntoView} as unknown as HTMLElement

        scrollActiveTocItem(element, true)

        expect(scrollIntoView).toHaveBeenCalledWith({
            behavior: "smooth",
            block: "nearest",
        })
    })

    it("does not scroll when active scrolling is disabled", () => {
        const scrollIntoView = vi.fn()
        const element = {scrollIntoView} as unknown as HTMLElement

        scrollActiveTocItem(element, false)

        expect(scrollIntoView).not.toHaveBeenCalled()
    })

    it("does not scroll without an active element", () => {
        expect(() => scrollActiveTocItem(null, true)).not.toThrow()
    })
})
