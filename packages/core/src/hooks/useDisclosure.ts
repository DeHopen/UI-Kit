import { useCallback } from 'react'
import { useControllableState } from './useControllableState.ts'

interface UseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  onChange?: (isOpen: boolean) => void
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const { isOpen: controlledIsOpen, defaultIsOpen = false, onOpen, onClose, onChange } = props

  const [isOpen, setIsOpen] = useControllableState({
    value: controlledIsOpen,
    defaultValue: defaultIsOpen,
    onChange,
  })

  const open = useCallback(() => {
    setIsOpen(true)
    onOpen?.()
  }, [setIsOpen, onOpen])

  const close = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [setIsOpen, onClose])

  const toggle = useCallback(() => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }, [isOpen, open, close])

  return { isOpen, open, close, toggle }
}
