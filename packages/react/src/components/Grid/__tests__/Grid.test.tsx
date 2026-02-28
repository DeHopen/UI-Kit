import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Grid } from '../Grid.tsx'

describe('Grid', () => {
  it('renders children', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>,
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies columns class', () => {
    const { container } = render(
      <Grid columns={3}>
        <div>Item</div>
      </Grid>,
    )
    expect(container.firstChild).toHaveClass('cols3')
  })

  it('applies gap class', () => {
    const { container } = render(
      <Grid gap={6}>
        <div>Item</div>
      </Grid>,
    )
    expect(container.firstChild).toHaveClass('gap6')
  })

  it('applies responsive classes', () => {
    const { container } = render(
      <Grid columns={1} sm={2} md={3} lg={4}>
        <div>Item</div>
      </Grid>,
    )
    const grid = container.firstChild
    expect(grid).toHaveClass('cols1')
    expect(grid).toHaveClass('smCols2')
    expect(grid).toHaveClass('mdCols3')
    expect(grid).toHaveClass('lgCols4')
  })

  it('supports custom className', () => {
    const { container } = render(
      <Grid className="my-grid">
        <div>Item</div>
      </Grid>,
    )
    expect(container.firstChild).toHaveClass('my-grid')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(
      <Grid ref={ref}>
        <div>Item</div>
      </Grid>,
    )
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement)
  })

  it('has correct displayName', () => {
    expect(Grid.displayName).toBe('Grid')
  })
})
