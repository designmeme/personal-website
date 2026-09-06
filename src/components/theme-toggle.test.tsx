import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, it} from 'vitest'
import ThemeToggle from './theme-toggle'

describe('ThemeToggle', () => {
    it('renders accessible theme buttons with system selected initially', () => {
        const markup = renderToStaticMarkup(<ThemeToggle/>)
        const buttons = markup.match(/<button\b[^>]*>/g) ?? []

        expect(markup).toContain('role="group"')
        expect(markup).toContain('aria-label="색상 테마 선택"')
        expect(buttons).toHaveLength(3)

        for (const [label, pressed] of [
            ['시스템 테마', 'true'],
            ['라이트 테마', 'false'],
            ['다크 테마', 'false'],
        ]) {
            const button = buttons.find(tag => tag.includes(`aria-label="${label}"`))

            expect(button).toBeDefined()
            expect(button).toContain('type="button"')
            expect(button).toContain(`aria-pressed="${pressed}"`)
        }
    })
})
