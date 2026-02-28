import { useCallback, useState } from 'react'

interface UseControllableStateProps<T> {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, (next: T | ((prev: T) => T)) => void] {
  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

  const value = isControlled ? controlledValue : uncontrolledValue

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue = typeof next === 'function' ? (next as (prev: T) => T)(value) : next

      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }

      onChange?.(nextValue)
    },
    [isControlled, value, onChange],
  )

  return [value, setValue]
}
