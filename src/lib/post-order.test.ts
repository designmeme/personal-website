import {describe, expect, it} from "vitest"
import {getPostOrder} from "./post-order"

describe("getPostOrder", () => {
    it("returns a one-based order for a known slug", () => {
        expect(getPostOrder(["intro", "advanced"], "advanced")).toBe(2)
    })

    it("returns null for a missing or non-string slug", () => {
        expect(getPostOrder(["intro"], undefined)).toBeNull()
        expect(getPostOrder(["intro"], "missing")).toBeNull()
    })
})
