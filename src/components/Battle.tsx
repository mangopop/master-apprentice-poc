import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Link } from 'react-router-dom'
import { BsTriangle } from 'react-icons/bs'
import { BsSquare } from 'react-icons/bs'
import { BsCircle } from 'react-icons/bs'
import './Battle.css'
import CardsHand from './Cards/CardsHand'
import { shuffle } from '../services/utilities.service'
import arenas from '../data/arena'
import Character from './Character'
import { getTypeBonus } from '../services/battle.service'
import IBattleProps from '../interfaces/battleProps'
import ICard from '../interfaces/card'

function Battle({
  level,
  player,
  monster,
  ownedCards,
  setPlayerHandler,
  setMonsterHandler,
  startGameHandler,
  stopGameHandler,
  stopMonsterTimersHandler,
  startMonsterTimersHandler,
  started,
}: IBattleProps) {
  // console.log('render battle')
  // TODO this needs to reset before choose card
  const [arena, setArena] = useState({
    name: 'Mountains',
    description: 'Home of the Dwarfs',
    type: 'dwarf',
  })
  const [cardsInHand, setCardsInHand] = useState<ICard[]>([]) // add rnd 5 cards to hand
  const [cardsUsed, setCardsUsed] = useState<ICard[]>([])
  const [cardsDisabled, setCardsDisabled] = useState(false) // start, stop, nextlevel, when 3

  let firstGame = true
  let monsterClone = monster // TODO trying to make TS happy - could cause issues.

  useEffect(() => {
    if (cardsUsed.length === 3) {
      setCardsDisabled(true)

      let typeMatch: Array<string> = []
      cardsUsed.forEach((element) => {
        if (element.type) {
          typeMatch.push(element.type)
        }
      })

      let bonus = getTypeBonus(typeMatch)

      // TODO this will need to reset??
      type PlayerKey = keyof typeof player
      type BonusKey = keyof typeof bonus
      if (bonus) {
        let modifier = Object.keys(bonus)[0]
        bonus = {
          [modifier]:
            player[modifier as PlayerKey] + bonus[modifier as BonusKey],
        }
        setPlayerHandler((player) => {
          return {
            ...player,
            ...bonus,
          }
        })
      }
    }
  }, [cardsUsed])

  useEffect(() => {
    firstGame && setUp()
    monsterClone = cloneDeep(monster)
    setArena(shuffle(arenas)[0])

    setCardsDisabled(true)
    // cardsInHand.forEach((card) => {
    //   card.disabled = false
    // })
  }, [])

  function startGame() {
    startGameHandler()
    setUp() // todo should be in level prog
  }

  function setUp() {
    setArena(shuffle(arenas)[0])
    setCardsUsed([])
    setCardsDisabled(false)

    shuffle(ownedCards)

    let copyOwnedCards: Array<ICard> = cloneDeep(ownedCards)
    copyOwnedCards.length = 5

    // TODO might make sense to move this logic to picking card?
    copyOwnedCards.forEach((card) => {
      if (
        player.strength > card.requirements.strength &&
        player.magic > card.requirements.magic
      ) {
        card.disabled = false
      } else {
        card.disabled = true
      }
    })

    setCardsInHand(copyOwnedCards)
  }

  // TODO get some more feedback in here
  return (
    <div className="Battle">
      <h1>Fight!</h1>
      {!started && monster.life > 0 && (
        <button onClick={startGame}>Start game</button>
      )}

      {started && <button onClick={stopGameHandler}>Stop game</button>}
      {/* <button onClick={resetGame}>Reset game</button> */}

      <h2>{arena.name}</h2>
      <p>{arena.description} </p>
      <p>
        {arena.type === 'dwarf' && <BsSquare />}
        {arena.type === 'elf' && <BsCircle />}
        {arena.type === 'human' && <BsTriangle />}
      </p>

      <h1>Level {level}/20</h1>
      {!started && monster.life < 1 && <Link to={'/train'}>Continue</Link>}

      {/* {<p>Arena Bonus active</p>} */}

      <Character character={player} type={'player'} />
      <Character
        character={monster}
        monsterLife={monsterClone.life}
        type={'monster'}
      />

      {/* <div>
        <button onClick={addHealth}>health</button>
      </div> */}

      {started && (
        <CardsHand
          arena={arena}
          ownedCards={ownedCards}
          cardsInHand={cardsInHand}
          cardsDisabled={cardsDisabled}
          setPlayerHandler={setPlayerHandler}
          setMonsterHandler={setMonsterHandler}
          setCardsUsedHandler={setCardsUsed}
          stopMonsterTimersHandler={stopMonsterTimersHandler}
          startMonsterTimersHandler={startMonsterTimersHandler}
          cardsUsed={cardsUsed}
          player={player}
        />
      )}
    </div>
  )
}

export default Battle
