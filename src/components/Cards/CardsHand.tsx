import '../../tooltip.css'
import './card/Card.css'
import ICard from '../../interfaces/card'
import ICardHandProps from '../../interfaces/cardHandProps'
import cardPickUp from './../../sounds/cardPickUp.mp3'
import { useSound } from 'use-sound'
import { useEffect, useState } from 'react'
import Card from './card/Card'
import { updateWeapon, calculateSkills } from '../../services/cardHand.service'

// TODO too many props - all because of state
// split this out
function CardsHand({
  arena,
  cardsInHand,
  player,
  cardsDisabled,
  cardsUsed,
  arenaBoostHandler,
  setPlayerHandler,
  setMonsterHandler,
  stopMonsterTimersHandler,
  startMonsterTimersHandler,
  setCardsUsedHandler,
}: ICardHandProps) {
  const [duplicateCardType, setDuplicateCardType] = useState(false)
  const [spellTimer, setSpellTimer] = useState<NodeJS.Timer>()
  const [card, setCard] = useState<ICard>()
  // do we have to import and play sounds here :(
  const [cardPickupPlay] = useSound(cardPickUp, { volume: 0.5 })

  useEffect(() => {
    if (spellTimer) {
      setTimeout(() => {
        clearInterval(spellTimer)
      }, card?.duration)
    }

    return () => {
      // clearTimeout();
    }
  }, [spellTimer])

  useEffect(() => {}, [duplicateCardType])

  let duplicatePlay = false

  // TODO refactor
  function playCard(card: ICard) {
    if (card.disabled || cardsDisabled || duplicatePlay) {
      return
    }

    setCard(card)

    let arenaBoost = { agility: 1, other: 1 }

    if (card.type === arena.type) {
      arenaBoost = { agility: 0.9, other: 1.25 }
      arenaBoostHandler()
    }

    // TODO could be better logic
    cardsUsed.forEach((cardUsed) => {
      if (cardUsed.hasOwnProperty('weapon') && card.hasOwnProperty('weapon')) {
        duplicatePlay = true
        setDuplicateCardType(true)
      }
    })

    if (duplicatePlay) {
      return
    }

    cardPickupPlay()

    setCardsUsedHandler((cardsUsed: Array<ICard>) => [...cardsUsed, card])

    // TODO remove cardsInHand from view instead of disabling
    // this is adding permanently (handled - where?)

    card.use(
      card,
      setMonsterHandler,
      stopMonsterTimersHandler,
      startMonsterTimersHandler,
      setSpellTimer
    )

    // TODO only running 1 type of card might want to run 2?
    if (!card.damage) {
      let characterProperties = {}

      Array(
        'agility',
        'attack',
        'strength',
        'defence',
        'life',
        'stamina',
        'magic',
        'armour',
        'weapon'
      ).forEach((element) => {
        if (card[element as keyof typeof card]) {
          // handle weapon modifier
          if (element === 'weapon') {
            Object.assign(characterProperties, {
              weapon: updateWeapon(
                card.requirements.weapon,
                cardsUsed,
                arenaBoost.other,
                player.weapon,
                card.weapon,
                card.weaponBonus
              ),
            })
          } else {
            // handle the skill update
            Object.assign(characterProperties, {
              [element]: calculateSkills(
                card[element as keyof typeof card],
                player[element as keyof typeof player],
                arenaBoost
              ),
            })
          }
        }
      })

      setPlayerHandler(() => {
        return {
          ...player,
          ...characterProperties,
        }
      })
    }

    card.disabled = true
  }

  return (
    <div>
      <h3>Active cards</h3>

      <div className="CardContainer">
        {cardsUsed.length > 0 &&
          cardsUsed.map(function (card: ICard) {
            return (
              <Card
                key={card.name}
                card={card}
                duplicateCardType={duplicateCardType}
                cardsDisabled={cardsDisabled}
              />
            )
          })}
      </div>

      <h3>Playing Cards</h3>
      <div className="CardContainer">
        {cardsInHand.length > 0 &&
          cardsInHand.map(function (card: ICard) {
            return (
              <Card
                key={card.name}
                card={card}
                duplicateCardType={duplicateCardType}
                cardsDisabled={cardsDisabled}
                cardActionCallback={playCard}
              />
            )
          })}
      </div>
    </div>
  )
}

export default CardsHand
