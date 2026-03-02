import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('draftdb_theme') as Theme) || 'system'
  )

  useEffect(() => {
    const root = window.document.documentElement
    console.log("this is the root", root);
    

    const applyTheme = (currentTheme: Theme) => {
      root.classList.remove('light', 'dark')

      if (currentTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        root.classList.add(systemTheme)
        return
      }

      root.classList.add(currentTheme)
    }

    applyTheme(theme)
    localStorage.setItem('draftdb_theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
