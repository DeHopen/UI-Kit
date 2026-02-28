import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from '../packages/react/src/components/Modal/Modal.tsx'
import { Button } from '../packages/react/src/components/Button/Button.tsx'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    closeOnOverlay: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
  },
  args: {
    title: 'Modal Title',
    size: 'md',
    closeOnOverlay: true,
    closeOnEsc: true,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p style={{ margin: 0 }}>
            This is a modal dialog. It traps focus, closes on ESC key, and closes when clicking the
            overlay.
          </p>
        </Modal>
      </>
    )
  },
}

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Small Modal" size="sm">
          <p style={{ margin: 0 }}>A small modal for simple confirmations.</p>
        </Modal>
      </>
    )
  },
}

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Modal" size="lg">
          <p style={{ margin: 0 }}>
            A large modal for content that needs more space, like forms or detailed information.
          </p>
        </Modal>
      </>
    )
  },
}

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Titleless Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p style={{ margin: 0 }}>This modal has no title bar.</p>
          <div style={{ marginTop: '16px' }}>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </Modal>
      </>
    )
  },
}
