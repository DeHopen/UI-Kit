import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useDisclosure } from '../useDisclosure.ts'

describe('useDisclosure', () => {
  it('defaults to closed', () => {
    const { result } = renderHook(() => useDisclosure())
    expect(result.current.isOpen).toBe(false)
  })

  it('accepts defaultIsOpen', () => {
    const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }))
    expect(result.current.isOpen).toBe(true)
  })

  it('opens with open()', () => {
    const { result } = renderHook(() => useDisclosure())
    act(() => result.current.open())
    expect(result.current.isOpen).toBe(true)
  })

  it('closes with close()', () => {
    const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }))
    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
  })

  it('toggles with toggle()', () => {
    const { result } = renderHook(() => useDisclosure())
    act(() => result.current.toggle())
    expect(result.current.isOpen).toBe(true)
    act(() => result.current.toggle())
    expect(result.current.isOpen).toBe(false)
  })

  it('calls onOpen callback', () => {
    const onOpen = vi.fn()
    const { result } = renderHook(() => useDisclosure({ onOpen }))
    act(() => result.current.open())
    expect(onOpen).toHaveBeenCalledOnce()
  })

  it('calls onClose callback', () => {
    const onClose = vi.fn()
    const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true, onClose }))
    act(() => result.current.close())
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('supports controlled mode', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useDisclosure({ isOpen: false, onChange }),
    )
    act(() => result.current.open())
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
