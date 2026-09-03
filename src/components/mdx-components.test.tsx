import * as React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, it} from 'vitest'
import {mdxComponents} from './mdx-components'

describe('mdxComponents.figure', () => {
    it('opts code blocks out of Typography without dropping rehype attributes', () => {
        const Figure = mdxComponents.figure as React.ComponentType<React.ComponentPropsWithoutRef<'figure'>> | undefined

        expect(Figure).toBeDefined()
        if (!Figure) return

        const markup = renderToStaticMarkup(
            <Figure className="shiki" data-rehype-pretty-code-figure="">
                <pre data-language="js"><code>const answer = 42</code></pre>
            </Figure>,
        )

        expect(markup).toContain('class="not-prose shiki"')
        expect(markup).toContain('data-rehype-pretty-code-figure=""')
        expect(markup).toContain('data-language="js"')
        expect(markup).toContain('<code>const answer = 42</code>')
    })
})

describe('mdxComponents.span', () => {
    it('opts highlighted inline code out of Typography', () => {
        const Span = mdxComponents.span as React.ComponentType<React.ComponentPropsWithoutRef<'span'>> | undefined

        expect(Span).toBeDefined()
        if (!Span) return

        const markup = renderToStaticMarkup(
            <Span className="highlighted" data-rehype-pretty-code-figure="">
                <code data-theme="github-dark">[1, 2, 3]</code>
            </Span>,
        )

        expect(markup).toContain('class="not-prose highlighted"')
        expect(markup).toContain('data-rehype-pretty-code-figure=""')
        expect(markup).toContain('data-theme="github-dark"')
        expect(markup).toContain('[1, 2, 3]')
    })
})
