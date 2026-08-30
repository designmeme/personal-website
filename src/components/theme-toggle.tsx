import React, {useEffect, useState} from 'react'
import {
    getStoredTheme,
    resolveTheme,
    storeTheme,
    type ThemePreference,
} from '../lib/theme'

function applyTheme(preference: ThemePreference, systemIsDark: boolean): void {
    const root = document.documentElement

    if (preference === 'system') {
        root.removeAttribute('data-theme')
    } else {
        root.dataset.theme = preference
    }

    root.style.colorScheme = resolveTheme(preference, systemIsDark)
}

const ThemeToggle: React.FC = () => {
    const [preference, setPreference] = useState<ThemePreference>('system')
    const [systemIsDark, setSystemIsDark] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const storedPreference = getStoredTheme(window.localStorage)

        setPreference(storedPreference)
        setSystemIsDark(mediaQuery.matches)
        applyTheme(storedPreference, mediaQuery.matches)

        const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            setSystemIsDark(event.matches)
            if (getStoredTheme(window.localStorage) === 'system') {
                applyTheme('system', event.matches)
            }
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange)
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nextPreference = event.target.value as ThemePreference
        setPreference(nextPreference)
        storeTheme(window.localStorage, nextPreference)
        applyTheme(nextPreference, systemIsDark)
    }

    return (
        <label className="theme-toggle">
            <span className="sr-only">색상 테마</span>
            <select
                aria-label="색상 테마 선택"
                value={preference}
                onChange={handleChange}
            >
                <option value="system">시스템</option>
                <option value="light">라이트</option>
                <option value="dark">다크</option>
            </select>
        </label>
    )
}

export default ThemeToggle
