import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '../packages/react/src/components/Stack/Stack.tsx'
import { Button } from '../packages/react/src/components/Button/Button.tsx'

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    spacing: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 6, 8, 12, 16],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: { control: 'boolean' },
  },
  args: {
    direction: 'vertical',
    spacing: 4,
    align: 'stretch',
    justify: 'start',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  render: (args) => (
    <Stack {...args}>
      <Button variant="primary">First</Button>
      <Button variant="secondary">Second</Button>
      <Button variant="ghost">Third</Button>
    </Stack>
  ),
}

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
  render: (args) => (
    <Stack {...args}>
      <Button variant="primary">First</Button>
      <Button variant="secondary">Second</Button>
      <Button variant="ghost">Third</Button>
    </Stack>
  ),
}

export const HorizontalCentered: Story = {
  args: { direction: 'horizontal', align: 'center', justify: 'center' },
  render: (args) => (
    <Stack {...args}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>
  ),
}

export const SpaceBetween: Story = {
  args: { direction: 'horizontal', justify: 'between' },
  render: (args) => (
    <Stack {...args}>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </Stack>
  ),
}

export const WithWrap: Story = {
  args: { direction: 'horizontal', wrap: true, spacing: 2 },
  render: (args) => (
    <Stack {...args}>
      {Array.from({ length: 10 }, (_, i) => (
        <Button key={i} variant="secondary" size="sm">
          Tag {i + 1}
        </Button>
      ))}
    </Stack>
  ),
}
