import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, it} from 'vitest'
import ThemeToggle from './theme-toggle'

describe('ThemeToggle', () => {
    it('renders an accessible theme preference select', () => {
        const markup = renderToStaticMarkup(<ThemeToggle/>)

        expect(markup).toContain('aria-label="색상 테마 선택"')
        expect(markup).toContain('value="system"')
        expect(markup).toContain('value="light"')
        expect(markup).toContain('value="dark"')
        expect(markup).toContain('시스템')
        expect(markup).toContain('라이트')
        expect(markup).toContain('다크')
    })
})
