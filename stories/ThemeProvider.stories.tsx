import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Stack,
} from '@my-ui/react'
import type { ColorMode } from '@my-ui/react'

function ThemeSwitcher() {
  const { colorMode, resolvedColorMode, setColorMode } = useTheme()

  return (
    <Stack spacing={6}>
      <Card shadow="md">
        <CardHeader>Theme Settings</CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <p style={{ margin: 0 }}>
              Current mode: <strong>{colorMode}</strong> (resolved:{' '}
              <strong>{resolvedColorMode}</strong>)
            </p>
            <Stack direction="horizontal" spacing={2}>
              <Button
                variant={colorMode === 'light' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setColorMode('light')}
              >
                Light
              </Button>
              <Button
                variant={colorMode === 'dark' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setColorMode('dark')}
              >
                Dark
              </Button>
              <Button
                variant={colorMode === 'system' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setColorMode('system')}
              >
                System
              </Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>

      <Card shadow="sm">
        <CardHeader>Sample Components</CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <Input label="Email" placeholder="you@example.com" />
            <Stack direction="horizontal" spacing={2}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  )
}

function ThemeSwitcherWrapper({ onModeChange }: { onModeChange: (mode: ColorMode) => void }) {
  const { setColorMode } = useTheme()
  return (
    <Stack spacing={6}>
      <Stack direction="horizontal" spacing={2}>
        {(['light', 'dark', 'system'] as const).map((mode) => (
          <Button
            key={mode}
            variant="secondary"
            size="sm"
            onClick={() => {
              setColorMode(mode)
              onModeChange(mode)
            }}
          >
            {mode}
          </Button>
        ))}
      </Stack>
      <ThemeSwitcher />
    </Stack>
  )
}

function DefaultDemo() {
  const [mode, setMode] = useState<ColorMode>('light')
  return (
    <ThemeProvider defaultColorMode={mode} key={mode}>
      <ThemeSwitcherWrapper onModeChange={setMode} />
    </ThemeProvider>
  )
}

const meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <DefaultDemo />,
}
