import React, { useCallback } from 'react'

function CardsHand({ cardsInHand, setPlayerHandler, cardsDisabled, player }) {
  //   const handleInputChange = useCallback(
  //     (event) => {
  //       setPlayerHandler((player) => {
  //         return {
  //           ...player,
  //           agility: player.agility + 300,
  //         }
  //       })
  //     },
  //     [onNameChange]
  //   )
  function playCard(card) {
    // TODO if we are adding stats from card we to store then remove them
    console.log(card.name)

    const update = (player, card) => {
      return {
        ...player,
        agility: player.agility + card.agility || player.agility,
        attack: player.attack + card.attack || player.attack,
        strength: player.strength + card.strength || player.strength,
        defence: player.defence + card.defence || player.defence,
      }
    }

    setPlayerHandler(update(player, card))
    card.init()
    // discardPile.push(card)
    // console.log(player)
  }

  return (
    <div>
      <h3>Playing Cards</h3>

      <div className="CardContainer">
        {cardsInHand.length > 0 &&
          cardsInHand.map(function (card) {
            return (
              <div className="Card">
                <h4>{card.name}</h4>
                <p>{card.description}</p>
                <button
                  disabled={cardsDisabled || card.disabled}
                  key={card.name}
                  style={{ marginRight: '5px' }}
                  onClick={() => playCard(card)}
                >
                  {card.name}
                </button>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CardsHand
