import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@my-ui/react'

const SearchIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const PlusIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const TrashIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const HeartIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
    iconLeft: <TrashIcon />,
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    href: 'https://example.com',
    children: 'Link Button',
    variant: 'primary',
  },
}

export const WithLeftIcon: Story = {
  args: {
    iconLeft: <PlusIcon />,
    children: 'Add Item',
  },
}

export const WithRightIcon: Story = {
  args: {
    iconRight: <ArrowRightIcon />,
    children: 'Next Step',
  },
}

export const WithBothIcons: Story = {
  args: {
    iconLeft: <HeartIcon />,
    iconRight: <ArrowRightIcon />,
    children: 'Favorites',
  },
}

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm" iconLeft={<SearchIcon />} aria-label="Search" />
      <Button size="md" iconLeft={<PlusIcon />} aria-label="Add" />
      <Button size="lg" iconLeft={<HeartIcon />} aria-label="Like" />
      <Button variant="danger" iconLeft={<TrashIcon />} aria-label="Delete" />
      <Button variant="ghost" iconLeft={<SearchIcon />} aria-label="Search" />
    </div>
  ),
}

export const RadiusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button radius="none">none</Button>
      <Button radius="sm">sm</Button>
      <Button radius="md">md</Button>
      <Button radius="lg">lg</Button>
      <Button radius="xl">xl</Button>
      <Button radius="full">full</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const IconsAllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm" iconLeft={<SearchIcon />}>
        Small
      </Button>
      <Button size="md" iconLeft={<SearchIcon />}>
        Medium
      </Button>
      <Button size="lg" iconLeft={<SearchIcon />}>
        Large
      </Button>
    </div>
  ),
}

export const FullRound: Story = {
  args: {
    radius: 'full',
    iconLeft: <HeartIcon />,
    children: 'Rounded',
  },
}
