import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@my-ui/core'
import styles from './Card.module.css'

type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  shadow?: CardShadow
  radius?: CardRadius
}

const shadowMap: Record<CardShadow, string> = {
  none: styles.shadowNone,
  sm: styles.shadowSm,
  md: styles.shadowMd,
  lg: styles.shadowLg,
  xl: styles.shadowXl,
}

const radiusMap: Record<CardRadius, string> = {
  none: styles.radiusNone,
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  xl: styles.radiusXl,
  full: styles.radiusFull,
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { shadow = 'sm', radius, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(styles.card, shadowMap[shadow], radius && radiusMap[radius], className)}
      {...rest}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.body, className)} {...rest}>
      {children}
    </div>
  )
})

CardBody.displayName = 'CardBody'

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.footer, className)} {...rest}>
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'
