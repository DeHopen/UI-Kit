import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn, useId } from '@my-ui/core'
import styles from './Input.module.css'

type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: InputSize
  fullWidth?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    size = 'md',
    fullWidth = false,
    startIcon,
    endIcon,
    className,
    id: externalId,
    disabled,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const id = useId(externalId)
  const errorId = `${id}-error`
  const helperId = `${id}-helper`
  const hasError = !!error

  const describedBy = [
    ariaDescribedBy,
    hasError ? errorId : undefined,
    helperText && !hasError ? helperId : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cn(styles.wrapper, fullWidth && styles.fullWidth, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={cn(
          styles.inputWrapper,
          styles[size],
          hasError && styles.error,
          disabled && styles.disabled,
        )}
      >
        {startIcon && <span className={cn(styles.iconSlot, styles.startIcon)}>{startIcon}</span>}
        <input
          ref={ref}
          id={id}
          className={styles.input}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy || undefined}
          {...rest}
        />
        {endIcon && <span className={cn(styles.iconSlot, styles.endIcon)}>{endIcon}</span>}
      </div>
      {hasError && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {helperText && !hasError && (
        <span id={helperId} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'
