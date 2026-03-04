import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDarkMode } from './useDarkMode'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  vi.restoreAllMocks()
})

describe('useDarkMode', () => {
  it('reads saved "dark" value from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current[0]).toBe(true)
  })

  it('reads saved "light" value from localStorage on mount', () => {
    localStorage.setItem('theme', 'light')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current[0]).toBe(false)
  })

  it('falls back to prefers-color-scheme: dark when localStorage is empty', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList)
    const { result } = renderHook(() => useDarkMode())
    expect(result.current[0]).toBe(true)
  })

  it('falls back to prefers-color-scheme: light when localStorage is empty', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList)
    const { result } = renderHook(() => useDarkMode())
    expect(result.current[0]).toBe(false)
  })

  it('adds "dark" class to documentElement when dark', () => {
    localStorage.setItem('theme', 'dark')
    renderHook(() => useDarkMode())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes "dark" class when light', () => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'light')
    renderHook(() => useDarkMode())
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggle() flips isDark state', () => {
    localStorage.setItem('theme', 'light')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current[0]).toBe(false)

    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)

    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
  })

  it('toggle() persists new value to localStorage', () => {
    localStorage.setItem('theme', 'light')
    const { result } = renderHook(() => useDarkMode())

    act(() => result.current[1]())
    expect(localStorage.getItem('theme')).toBe('dark')

    act(() => result.current[1]())
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
