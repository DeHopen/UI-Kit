import { forwardRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { HTMLAttributes, ReactNode, MouseEvent } from 'react'
import { cn, useFocusTrap } from '@my-ui/core'
import styles from './Modal.module.css'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: ModalSize
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlay = true,
  closeOnEsc = true,
  children,
  footer,
  className,
}: ModalProps) {
  const trapRef = useFocusTrap<HTMLDivElement>({
    enabled: isOpen,
    autoFocus: true,
    restoreFocus: true,
  })

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose()
      }
    },
    [closeOnEsc, onClose],
  )

  useEffect(() => {
    if (!isOpen) return

    document.addEventListener('keydown', handleEsc)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, handleEsc])

  const handleOverlayClick = useCallback(
    (e: MouseEvent) => {
      if (closeOnOverlay && e.target === e.currentTarget) {
        onClose()
      }
    },
    [closeOnOverlay, onClose],
  )

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(styles.dialog, styles[size], className)}
        tabIndex={-1}
      >
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}

Modal.displayName = 'Modal'

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(function ModalHeader(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  )
})

ModalHeader.displayName = 'ModalHeader'

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(function ModalBody(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.body, className)} {...rest}>
      {children}
    </div>
  )
})

ModalBody.displayName = 'ModalBody'

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(function ModalFooter(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.footer, className)} {...rest}>
      {children}
    </div>
  )
})

ModalFooter.displayName = 'ModalFooter'
