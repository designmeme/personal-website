import React from 'react'
import {runInNewContext} from 'node:vm'
import {describe, expect, it} from 'vitest'
import {onRenderBody} from '../../gatsby-ssr'

function initializeTheme(stored: string | null, systemIsDark: boolean, storageBlocked = false) {
    const head: React.ReactNode[] = []
    const attributes: Record<string, string> = {}
    onRenderBody!({
        pathname: '/blog/',
        loadPageDataSync: () => ({result: {}}),
        setHeadComponents: (components: React.ReactNode[]) => head.push(...components),
        setPreBodyComponents: () => {},
        setHtmlAttributes: (value) => Object.assign(attributes, value),
        setBodyAttributes: () => {},
        setPostBodyComponents: () => {},
        setBodyProps: () => {},
    }, {plugins: []})

    const script = head.find((node) => React.isValidElement(node) && node.key === 'theme-initialization') as
        React.ReactElement<{dangerouslySetInnerHTML: {__html: string}}>
    const classes = new Set(attributes.className?.split(' ') ?? [])
    const root = {
        dataset: {},
        style: {colorScheme: ''},
        classList: {
            toggle: (name: string, enabled: boolean) => enabled ? classes.add(name) : classes.delete(name),
        },
    }

    runInNewContext(script.props.dangerouslySetInnerHTML.__html, {
        document: {documentElement: root},
        window: {
            get localStorage() {
                if (storageBlocked) throw new Error('Storage is blocked')
                return {getItem: () => stored}
            },
            matchMedia: () => ({matches: systemIsDark}),
        },
    })
    return {classes, colorScheme: root.style.colorScheme}
}

describe('theme initialization before hydration', () => {
    it.each([
        ['dark', false, 'dark'],
        ['light', true, 'light'],
        [null, true, 'dark'],
        [null, false, 'light'],
        ['invalid', true, 'dark'],
    ])('restores %s with system dark=%s as %s', (stored, systemIsDark, expected) => {
        const {classes, colorScheme} = initializeTheme(stored, systemIsDark)

        expect(classes.has('dark')).toBe(expected === 'dark')
        expect(colorScheme).toBe(expected)
    })

    it('follows the system when local storage is blocked', () => {
        const {classes, colorScheme} = initializeTheme(null, true, true)

        expect(classes.has('dark')).toBe(true)
        expect(colorScheme).toBe('dark')
    })
})
