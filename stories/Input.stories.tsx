import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@my-ui/react'

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

const MailIcon = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LockIcon = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
    startIcon: <MailIcon />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
    startIcon: <LockIcon />,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
}

export const FullWidth: Story = {
  args: {
    label: 'Full Width',
    fullWidth: true,
    placeholder: 'Takes full width of container',
  },
}

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    startIcon: <SearchIcon />,
  },
}

export const RadiusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: 320 }}>
      {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((r) => (
        <Input key={r} radius={r} placeholder={`radius="${r}"`} startIcon={<SearchIcon />} />
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: 320 }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
}
