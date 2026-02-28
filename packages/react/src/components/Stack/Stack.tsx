import { forwardRef } from 'react'
import type { ElementType, ReactNode } from 'react'
import { cn } from '@my-ui/core'
import type { PolymorphicComponentPropsWithRef } from '@my-ui/core'
import styles from './Stack.module.css'

type StackDirection = 'horizontal' | 'vertical'
type StackSpacing = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16
type StackAlign = 'start' | 'center' | 'end' | 'stretch'
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

interface StackOwnProps {
  direction?: StackDirection
  spacing?: StackSpacing
  align?: StackAlign
  justify?: StackJustify
  wrap?: boolean
}

export type StackProps<T extends ElementType = 'div'> = PolymorphicComponentPropsWithRef<
  T,
  StackOwnProps
>

const alignMap: Record<StackAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
}

const justifyMap: Record<StackJustify, string> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
  evenly: styles.justifyEvenly,
}

type StackComponent = <T extends ElementType = 'div'>(props: StackProps<T>) => ReactNode

const StackInner = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    as,
    direction = 'vertical',
    spacing = 4,
    align = 'stretch',
    justify = 'start',
    wrap: shouldWrap = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const Component = (as || 'div') as ElementType

  return (
    <Component
      ref={ref}
      className={cn(
        styles.stack,
        styles[direction],
        styles[`spacing${spacing}`],
        alignMap[align],
        justifyMap[justify],
        shouldWrap && styles.wrap,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
})

StackInner.displayName = 'Stack'

export const Stack = StackInner as unknown as StackComponent & {
  displayName: string
}
