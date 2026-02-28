import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from '../Modal.tsx'

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        Content
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('has aria-modal attribute', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>,
    )
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('renders title', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="My Modal">
        Content
      </Modal>,
    )
    expect(screen.getByText('My Modal')).toBeInTheDocument()
  })

  it('sets aria-label from title', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Dialog Title">
        Content
      </Modal>,
    )
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Dialog Title')
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        Content
      </Modal>,
    )
    await user.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose on ESC key', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>,
    )
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not close on ESC when closeOnEsc=false', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEsc={false}>
        Content
      </Modal>,
    )
    await user.keyboard('{Escape}')
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders footer content', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} footer={<button>OK</button>}>
        Content
      </Modal>,
    )
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument()
  })

  it('renders in a portal (appended to body)', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.closest('body')).toBeTruthy()
  })

  it('applies size class', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} size="lg">
        Content
      </Modal>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('lg')
  })

  it('has correct displayName', () => {
    expect(Modal.displayName).toBe('Modal')
  })
})
