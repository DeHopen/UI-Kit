import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '@my-ui/core'
import styles from './Grid.module.css'

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type ResponsiveColumns = 1 | 2 | 3 | 4 | 6 | 12
type GridGap = 0 | 1 | 2 | 3 | 4 | 6 | 8

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns
  gap?: GridGap
  sm?: ResponsiveColumns
  md?: ResponsiveColumns
  lg?: ResponsiveColumns
  xl?: ResponsiveColumns
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 1, gap = 4, sm, md, lg, xl, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        styles.grid,
        styles[`cols${columns}`],
        styles[`gap${gap}`],
        sm && styles[`smCols${sm}`],
        md && styles[`mdCols${md}`],
        lg && styles[`lgCols${lg}`],
        xl && styles[`xlCols${xl}`],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'
