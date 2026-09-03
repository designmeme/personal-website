import React, {useEffect, useState} from 'react'
import {
    getStoredTheme,
    resolveTheme,
    storeTheme,
    type ThemePreference,
} from '../lib/theme'

function applyTheme(preference: ThemePreference, systemIsDark: boolean): void {
    const root = document.documentElement
    const theme = resolveTheme(preference, systemIsDark)

    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
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
        <label>
            <span className="sr-only">색상 테마</span>
            <select
                aria-label="색상 테마 선택"
                value={preference}
                onChange={handleChange}
                className="text-xs rounded-sm border py-0.5 px-1"
            >
                <option value="system">시스템</option>
                <option value="light">라이트</option>
                <option value="dark">다크</option>
            </select>
        </label>
    )
}

export default ThemeToggle
