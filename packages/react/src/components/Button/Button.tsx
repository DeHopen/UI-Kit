import { forwardRef } from 'react'
import type { ReactNode, ElementType } from 'react'
import { cn } from '@my-ui/core'
import type { PolymorphicComponentPropsWithRef } from '@my-ui/core'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ButtonOwnProps {
  variant?: ButtonVariant
  size?: ButtonSize
  radius?: ButtonRadius
  loading?: boolean
  fullWidth?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export type ButtonProps<T extends ElementType = 'button'> = PolymorphicComponentPropsWithRef<
  T,
  ButtonOwnProps
>

type ButtonComponent = <T extends ElementType = 'button'>(props: ButtonProps<T>) => ReactNode

const radiusMap: Record<ButtonRadius, string> = {
  none: styles.radiusNone,
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  xl: styles.radiusXl,
  full: styles.radiusFull,
}

const iconSizeMap: Record<ButtonSize, string> = {
  sm: styles.iconSm,
  md: styles.iconMd,
  lg: styles.iconLg,
}

const ButtonInner = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    as,
    variant = 'primary',
    size = 'md',
    radius,
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
  const isIconOnly = !children && !!(iconLeft || iconRight)

  return (
    <Component
      ref={ref}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        radius && radiusMap[radius],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        isIconOnly && styles.iconOnly,
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
      {iconLeft && <span className={cn(styles.icon, iconSizeMap[size])}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={cn(styles.icon, iconSizeMap[size])}>{iconRight}</span>}
    </Component>
  )
})

ButtonInner.displayName = 'Button'

export const Button = ButtonInner as unknown as ButtonComponent & {
  displayName: string
}
