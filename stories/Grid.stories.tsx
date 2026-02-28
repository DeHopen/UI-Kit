import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../packages/react/src/components/Grid/Grid.tsx'

const gridItem = {
  background: 'var(--ui-color-primary)',
  color: 'var(--ui-color-text-inverse)',
  padding: '16px',
  borderRadius: 'var(--ui-radius-md)',
  textAlign: 'center' as const,
  fontWeight: 600,
}

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12 },
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 6, 8],
    },
  },
  args: {
    columns: 3,
    gap: 4,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={gridItem}>
          Item {i + 1}
        </div>
      ))}
    </Grid>
  ),
}

export const TwoColumns: Story = {
  args: { columns: 2 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} style={gridItem}>
          Item {i + 1}
        </div>
      ))}
    </Grid>
  ),
}

export const FourColumns: Story = {
  args: { columns: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={gridItem}>
          Item {i + 1}
        </div>
      ))}
    </Grid>
  ),
}

export const Responsive: Story = {
  args: { columns: 1, sm: 2, md: 3, lg: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={gridItem}>
          Item {i + 1}
        </div>
      ))}
    </Grid>
  ),
}
