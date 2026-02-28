import { forwardRef } from 'react'
import type { ReactNode, ElementType } from 'react'
import { cn } from '@my-ui/core'
import type { PolymorphicComponentPropsWithRef } from '@my-ui/core'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonOwnProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export type ButtonProps<T extends ElementType = 'button'> = PolymorphicComponentPropsWithRef<
  T,
  ButtonOwnProps
>

type ButtonComponent = <T extends ElementType = 'button'>(
  props: ButtonProps<T>,
) => ReactNode

const ButtonInner = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    as,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    className,
    children,
    ...rest
  },
  ref,
) {
  const Component = (as || 'button') as ElementType

  const isDisabled = disabled || loading

  return (
    <Component
      ref={ref}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className,
      )}
      disabled={Component === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <span className={styles.spinnerIcon} />
        </span>
      )}
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </Component>
  )
})

ButtonInner.displayName = 'Button'

export const Button = ButtonInner as unknown as ButtonComponent & {
  displayName: string
}
