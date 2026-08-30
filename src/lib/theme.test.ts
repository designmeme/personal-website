import {describe, expect, it} from 'vitest'
import {
    getStoredTheme,
    resolveTheme,
    storeTheme,
    THEME_STORAGE_KEY,
} from './theme'

describe('resolveTheme', () => {
    it('uses explicit light and dark preferences', () => {
        expect(resolveTheme('light', true)).toBe('light')
        expect(resolveTheme('dark', false)).toBe('dark')
    })

    it('follows the system preference when set to system', () => {
        expect(resolveTheme('system', true)).toBe('dark')
        expect(resolveTheme('system', false)).toBe('light')
    })
})

describe('theme storage', () => {
    it('returns valid stored preferences and ignores invalid values', () => {
        const storage = {getItem: () => 'dark'}
        expect(getStoredTheme(storage)).toBe('dark')
        expect(getStoredTheme({getItem: () => 'sepia'})).toBe('system')
    })

    it('uses system when storage is missing or throws', () => {
        expect(getStoredTheme(undefined)).toBe('system')
        expect(getStoredTheme({getItem: () => { throw new Error('blocked') }})).toBe('system')
    })

    it('persists explicit choices and removes the key for system', () => {
        const calls: string[] = []
        const storage = {
            setItem: (key: string, value: string) => calls.push(`set:${key}:${value}`),
            removeItem: (key: string) => calls.push(`remove:${key}`),
        }

        storeTheme(storage, 'dark')
        storeTheme(storage, 'system')

        expect(calls).toEqual([
            `set:${THEME_STORAGE_KEY}:dark`,
            `remove:${THEME_STORAGE_KEY}`,
        ])
    })
})
