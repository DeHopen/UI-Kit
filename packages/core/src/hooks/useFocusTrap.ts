import { useCallback, useEffect, useRef } from 'react'

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
  )
}

interface UseFocusTrapProps {
  enabled?: boolean
  autoFocus?: boolean
  restoreFocus?: boolean
}

export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  props: UseFocusTrapProps = {},
) {
  const { enabled = true, autoFocus = true, restoreFocus = true } = props
  const containerRef = useRef<T>(null)
  const previousActiveElement = useRef<Element | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled || e.key !== 'Tab' || !containerRef.current) return

      const focusable = getFocusableElements(containerRef.current)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [enabled],
  )

  useEffect(() => {
    if (!enabled) return

    previousActiveElement.current = document.activeElement

    if (autoFocus && containerRef.current) {
      const focusable = getFocusableElements(containerRef.current)
      if (focusable.length > 0) {
        requestAnimationFrame(() => focusable[0].focus())
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      if (restoreFocus && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
    }
  }, [enabled, autoFocus, restoreFocus, handleKeyDown])

  return containerRef
}
