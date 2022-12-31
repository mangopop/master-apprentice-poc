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

let cardLength = 3

function Battle({
  level,
  player,
  monster,
  ownedCards,
  ownedTalismanCards,
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
  const [arenaBooster, setArenaBooster] = useState(false)
  const [folkLoreBonus, setFolkLoreBonus] = useState(false)

  let firstGame = true
  let monsterClone = monster // TODO trying to make TS happy - could cause issues.

  // TODO figure out how to do all the talisman rules
  // we can't effect on play card? unless we tap in on the play card function?

  useEffect(() => {
    // TODO why is this here? could be in cards? We use setup to control the disabling.
    if (cardsUsed.length === cardLength) {
      setCardsDisabled(true)

      // TODO: extract to function
      let typeMatch: Array<string> = []
      cardsUsed.forEach((element) => {
        if (element.type) {
          typeMatch.push(element.type)
        }
      })

      let bonus: false | {} = false

      if (typeMatch.length === 3) {
        bonus = getTypeBonus(typeMatch)
      }

      // TODO this will need to reset??
      type PlayerKey = keyof typeof player
      type BonusKey = keyof typeof bonus
      if (bonus) {
        setFolkLoreBonus(true)
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

    // TODO could apply monster bonus here?

    setCardsDisabled(true)
    // cardsInHand.forEach((card) => {
    //   card.disabled = false
    // })
  }, [])

  function arenaBoost() {
    setArenaBooster(true)
  }

  function startGame() {
    startGameHandler()
    setUp() // todo should be in level prog
  }

  function setUp() {
    setArena(shuffle(arenas)[0])
    setCardsUsed([])
    setCardsDisabled(false)

    ownedTalismanCards.forEach((card) => {
      if (card.name === 'Packed neatly') {
        cardLength = 4
      }
      if (card.name === 'Armadillo foot') {
        //'Defence increases by 50% when life under 5',
      }
    })

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

  return (
    <div className="Battle">
      <h1>Fight!</h1>
      {!started && monster.life > 0 && (
        <button onClick={startGame}>Start game</button>
      )}

      {started && <button onClick={stopGameHandler}>Stop game</button>}

      <h2>{arena.name}</h2>
      {arenaBooster && <p className="alert arena">20% Arena bonus active</p>}
      <p>{arena.description} </p>

      <p>
        {arena.type === 'dwarf' && <BsSquare />}
        {arena.type === 'elf' && <BsCircle />}
        {arena.type === 'human' && <BsTriangle />}
      </p>
      {folkLoreBonus && <p className="alert folklore">Folklore bonus active</p>}

      <h1>Level {level}/20</h1>
      {!started && monster.life < 1 && <Link to={'/train'}>Continue</Link>}

      <Character character={player} type={'player'} />
      <Character
        character={monster}
        monsterLife={monsterClone.life}
        type={'monster'}
      />

      {started && (
        <CardsHand
          arena={arena}
          ownedCards={ownedCards}
          cardsInHand={cardsInHand}
          cardsDisabled={cardsDisabled}
          arenaBoostHandler={arenaBoost}
          setPlayerHandler={setPlayerHandler}
          setMonsterHandler={setMonsterHandler}
          setCardsUsedHandler={setCardsUsed}
          stopMonsterTimersHandler={stopMonsterTimersHandler}
          startMonsterTimersHandler={startMonsterTimersHandler}
          cardsUsed={cardsUsed}
          player={player}
          monster={monster}
        />
      )}
    </div>
  )
}

export default Battle
