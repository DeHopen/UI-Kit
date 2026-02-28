import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter } from '../packages/react/src/components/Card/Card.tsx'
import { Button } from '../packages/react/src/components/Button/Button.tsx'

const meta = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    shadow: 'sm',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 400 }}>
      <CardHeader>Card Title</CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>
          This is a card component with a header, body, and footer. It supports various shadow
          levels for visual depth.
        </p>
      </CardBody>
      <CardFooter>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save</Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 400 }}>
      <CardBody>
        <p style={{ margin: 0 }}>A simple card with just content and no header/footer.</p>
      </CardBody>
    </Card>
  ),
}

export const NoShadow: Story = {
  args: { shadow: 'none' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 400 }}>
      <CardHeader>No Shadow</CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>Card with no shadow, border only.</p>
      </CardBody>
    </Card>
  ),
}

export const LargeShadow: Story = {
  args: { shadow: 'lg' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 400 }}>
      <CardHeader>Large Shadow</CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>Card with a large shadow for elevated feel.</p>
      </CardBody>
    </Card>
  ),
}

export const ShadowVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((shadow) => (
        <Card key={shadow} shadow={shadow} style={{ width: 200 }}>
          <CardBody>
            <p style={{ margin: 0, fontWeight: 600 }}>shadow=&quot;{shadow}&quot;</p>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
}
