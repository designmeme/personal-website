export const THEME_STORAGE_KEY = 'personal-site-theme'

export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = Exclude<ThemePreference, 'system'>

export function isThemePreference(value: unknown): value is ThemePreference {
    return value === 'light' || value === 'dark' || value === 'system'
}

export function resolveTheme(
    preference: ThemePreference,
    systemIsDark: boolean,
): ResolvedTheme {
    if (preference === 'system') {
        return systemIsDark ? 'dark' : 'light'
    }

    return preference
}

export function getStoredTheme(
    storage: Pick<Storage, 'getItem'> | null | undefined,
): ThemePreference {
    if (!storage) {
        return 'system'
    }

    try {
        const value = storage.getItem(THEME_STORAGE_KEY)
        return isThemePreference(value) ? value : 'system'
    } catch {
        return 'system'
    }
}

export function storeTheme(
    storage: Pick<Storage, 'setItem' | 'removeItem'> | null | undefined,
    preference: ThemePreference,
): void {
    if (!storage) {
        return
    }

    try {
        if (preference === 'system') {
            storage.removeItem(THEME_STORAGE_KEY)
        } else {
            storage.setItem(THEME_STORAGE_KEY, preference)
        }
    } catch {
        // Storage can be unavailable in private browsing or restricted frames.
    }
}
