import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Link } from 'react-router-dom'
import { BsTriangle } from 'react-icons/bs'
import { BsSquare } from 'react-icons/bs'
import { BsCircle } from 'react-icons/bs'
import './Battle.css'
import CardsHand from './Cards/CardsHand'
import { shuffle } from '../services/utilities'
import { arenas } from '../data/arena'
import Character from './Character'
import { getTypeBonus } from '../services/utilities'

function Battle({
  level,
  player,
  monster,
  ownedCards,
  setPlayerHandler,
  startGameHandler,
  stopGameHandler,
  started,
}) {
  // console.log('render battle')
  const [arena, setArena] = useState('')
  const [cardsInHand, setCardsInHand] = useState([]) // add rnd 5 cards to hand
  const [cardsUsed, setCardsUsed] = useState([])
  const [cardsDisabled, setCardsDisabled] = useState(false) // start, stop, nextlevel, when 3

  let firstGame = true
  let monsterClone = {}

  useEffect(() => {
    // TODO if any card type matches the arena - boost that card by 20%

    if (cardsUsed.length === 3) {
      setCardsDisabled(true)

      let typeMatch = []
      cardsUsed.forEach((element) => {
        typeMatch.push(element.type)
      })

      let bonus = getTypeBonus(typeMatch)

      // TODO this will need to reset??
      if (bonus) {
        let modifier = Object.keys(bonus)[0]
        bonus = { [modifier]: player[modifier] + bonus[modifier] }
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

    // TODO should be from cardsOwned - but we need to pick to have that.
    shuffle(ownedCards)

    let copyOwnedCards = cloneDeep(ownedCards)
    copyOwnedCards.length = 5
    setCardsInHand(copyOwnedCards)
  }

  // TODO get some more feedback in here
  return (
    <div className="Battle">
      <h1>Fight!</h1>
      <button onClick={startGame}>Start game</button>
      <button onClick={stopGameHandler}>Stop game</button>
      {/* <button onClick={resetGame}>Reset game</button> */}

      <h2>{arena.name}</h2>
      <p>{arena.description} </p>
      <p>
        {arena.type === 'dwarf' && <BsSquare />}
        {arena.type === 'elf' && <BsCircle />}
        {arena.type === 'human' && <BsTriangle />}
      </p>

      <h1>Level {level}/20</h1>
      {/* TODO block until fight over */}
      <Link disabled={started} to={'/train'}>
        Continue
      </Link>

      <Character character={player} type={'player'} />
      <Character
        character={monster}
        monsterLife={monsterClone.life}
        type={'monster'}
      />

      {/* <div>
        <button onClick={addHealth}>health</button>
      </div> */}

      <CardsHand
        arena={arena}
        ownedCards={ownedCards}
        cardsInHand={cardsInHand}
        cardsDisabled={cardsDisabled}
        setPlayerHandler={setPlayerHandler}
        setCardsUsedHandler={setCardsUsed}
        cardsUsed={cardsUsed}
        player={player}
      />
    </div>
  )
}

export default Battle
