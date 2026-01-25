'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  // Marcar como montado sin useEffect
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  // Placeholder mientras carga
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10" />
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === 'dark' ? (
        <Sun className="w-5 h-5 text-white" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800" />
      )}
    </button>
  )
}