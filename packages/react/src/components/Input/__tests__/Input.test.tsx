import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from '../Input.tsx'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with a label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('links label to input via id', () => {
    render(<Input label="Email" id="my-email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('id', 'my-email')
  })

  it('shows error message with role=alert', () => {
    render(<Input error="Required field" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required field')
  })

  it('sets aria-invalid when error is present', () => {
    render(<Input error="Invalid" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links error to input via aria-describedby', () => {
    render(<Input id="test" error="Error msg" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'test-error')
  })

  it('shows helper text', () => {
    render(<Input helperText="Enter your email" />)
    expect(screen.getByText('Enter your email')).toBeInTheDocument()
  })

  it('prefers error over helper text', () => {
    render(<Input error="Error" helperText="Help" />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.queryByText('Help')).not.toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'hello')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders in disabled state', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders with startIcon and endIcon', () => {
    render(
      <Input
        startIcon={<span data-testid="start">S</span>}
        endIcon={<span data-testid="end">E</span>}
      />,
    )
    expect(screen.getByTestId('start')).toBeInTheDocument()
    expect(screen.getByTestId('end')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement)
  })

  it('has correct displayName', () => {
    expect(Input.displayName).toBe('Input')
  })

  it('applies fullWidth class', () => {
    const { container } = render(<Input fullWidth />)
    expect(container.firstChild).toHaveClass('fullWidth')
  })
})
