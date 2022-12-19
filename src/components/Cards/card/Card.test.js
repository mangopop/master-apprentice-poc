import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Card from './Card'
import cards from './AllCards'

describe('Card', () => {
  it('renders Card component', () => {
    render(
      <Card card={cards[0]} duplicateCardType={false} cardsDisabled={false} />
    )
    // screen.debug()

    expect(screen.getByText('Sword of Lost Kings')).toBeInTheDocument()
    expect(screen.getByText('Increase attack and agility')).toBeInTheDocument()
  })

  it('show tooltip if  duplicate', () => {
    render(<Card card={cards[0]} duplicateCardType={true} />)
    // screen.debug()
    expect(screen.getByText('You can only play one weapon')).toBeInTheDocument()
  })

  it('show tooltip if  duplicate', () => {
    const { container } = render(<Card card={cards[0]} cardsDisabled={true} />)

    // screen.debug()
    expect(container.firstChild.classList.contains('Disabled')).toBe(true)
  })

  it('calls the onChange callback handler', async () => {
    const playCard = jest.fn()
    const user = userEvent.setup()

    render(<Card card={cards[0]} cardActionCallback={playCard} />)
    screen.debug()

    await user.click(screen.getByText('Sword of Lost Kings'))

    // fireEvent.click(screen.getByText('Sword of Lost Kings'))

    expect(playCard).toHaveBeenCalledTimes(1)
  })
})
