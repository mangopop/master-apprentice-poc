import React, { useState, useEffect } from 'react'
import './Card.css'

// TODO this ends as list view and prop drill medium
function CardsHand({
  cardsInHand,
  setPlayerHandler,
  cardsDisabled,
  cardsUsed,
  setCardsUsedHandler,
  player,
}) {
  // TODO check useCallback technique out.
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
    if (card.disabled || cardsDisabled) {
      return
    }

    setCardsUsedHandler((cardsUsed) => [...cardsUsed, card])

    // TODO remove cardsInHand

    // was one behind
    // if (cardsUsed === 3) {
    //   setCardsDisabledHandler(true)
    //   return
    // }

    // this is adding permanently (handled)
    const update = (player, card) => {
      return {
        ...player,
        agility: player.agility + card.agility || player.agility,
        attack: player.attack + card.attack || player.attack,
        strength: player.strength + card.strength || player.strength,
        defence: player.defence + card.defence || player.defence,
        life: player.life + card.life || player.life,
        stamina: player.stamina + card.stamina || player.stamina,
        weapon: card.weapon || player.weapon,
        armour: card.armour || player.armour,
      }
    }

    setPlayerHandler(update(player, card))
    card.init()
  }

  return (
    <div>
      <h3>Active cards</h3>

      <div className="CardContainer">
        {cardsUsed.length > 0 &&
          cardsUsed.map(function (card) {
            return (
              <div
                className={'Card Disabled'}
                disabled={true}
                key={card.name}
                style={{ marginRight: '5px' }}
                onClick={() => playCard(card)}
              >
                <h4>{card.name}</h4>
                <p>{card.description}</p>
              </div>
            )
          })}
      </div>

      <h3>Playing Cards</h3>

      <div className="CardContainer">
        {cardsInHand.length > 0 &&
          cardsInHand.map(function (card) {
            return (
              <div
                className={`Card ${
                  cardsDisabled || card.disabled ? 'Disabled' : ''
                }`}
                disabled={cardsDisabled || card.disabled}
                key={card.name}
                style={{ marginRight: '5px' }}
                onClick={() => playCard(card)}
              >
                <h4>{card.name}</h4>
                <p>{card.description}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CardsHand
