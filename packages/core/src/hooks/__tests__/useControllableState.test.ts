import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useControllableState } from '../useControllableState.ts'

describe('useControllableState', () => {
  it('uses defaultValue when uncontrolled', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'hello' }),
    )
    expect(result.current[0]).toBe('hello')
  })

  it('updates uncontrolled value', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 0 }),
    )
    act(() => result.current[1](5))
    expect(result.current[0]).toBe(5)
  })

  it('uses controlled value when provided', () => {
    const { result } = renderHook(() =>
      useControllableState({ value: 'controlled', defaultValue: 'default' }),
    )
    expect(result.current[0]).toBe('controlled')
  })

  it('calls onChange when value changes', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 0, onChange }),
    )
    act(() => result.current[1](10))
    expect(onChange).toHaveBeenCalledWith(10)
  })

  it('supports functional updates', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 5 }),
    )
    act(() => result.current[1]((prev) => prev + 1))
    expect(result.current[0]).toBe(6)
  })

  it('does not update internal state when controlled', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ value: 'fixed', defaultValue: 'default', onChange }),
    )
    act(() => result.current[1]('new'))
    expect(result.current[0]).toBe('fixed')
    expect(onChange).toHaveBeenCalledWith('new')
  })
})
