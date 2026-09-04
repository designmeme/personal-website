import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDisplay, faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import {
    getStoredTheme,
    resolveTheme,
    storeTheme,
    type ThemePreference,
} from '../lib/theme'

const themeOptions = [
    {value: 'system', label: '시스템', icon: faDisplay},
    {value: 'light', label: '라이트', icon: faSun},
    {value: 'dark', label: '다크', icon: faMoon},
] as const

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

    const handleChange = (nextPreference: ThemePreference) => {
        setPreference(nextPreference)
        storeTheme(window.localStorage, nextPreference)
        applyTheme(nextPreference, systemIsDark)
    }

    return (
        <div role="group" aria-label="색상 테마 선택" className="flex items-center gap-3">
            {themeOptions.map(({value, label, icon}) => {
                const isActive = preference === value

                return (
                    <button
                        key={value}
                        type="button"
                        aria-label={`${label} 테마`}
                        aria-pressed={isActive}
                        title={`${label} 테마`}
                        onClick={() => handleChange(value)}
                        className={`cursor-pointer transition-colors ${isActive ? 'text-inherit' : 'not-hover:text-muted/80'}`}
                    >
                        <FontAwesomeIcon icon={icon}/>
                    </button>
                )
            })}
        </div>
    )
}

export default ThemeToggle
