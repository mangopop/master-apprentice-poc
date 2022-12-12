import { useEffect, useState } from 'react'
import './App.css'
import useSound from 'use-sound'
import { cloneDeep } from 'lodash'
import hit3 from './sounds/hit3.mp3'
import hit4 from './sounds/hit4.wav'
import metal from './sounds/metal.mp3'
import monsterDie from './sounds/monsterDie.wav'
import miss1 from './sounds/miss1.wav'
import miss2 from './sounds/miss2.wav'
import Player from './components/Player'
import Monster from './components/Monster'
import Train from './components/Train'
import AllCards from './components/Cards/AllCards'
// import { AllCards as AllCardsMutate } from './components/Cards/AllCards?first'
// import AllCardsStatic from './components/Cards/AllCards'
import CardsHand from './components/Cards/CardsHand'
import { getRandomArbitrary, shuffle } from './services/utilities'

// TODO move all this into Battle component
let playerBeforeCardsPlayed = {}
let playerStartStats = {
  attack: 7, // plus weapon is max attack
  defence: 7, // plus defence is max defence, attack must be higher
  strength: 7, // determines min attack and critical bonus
  agility: 2000, // speed of attack
  life: 100,
  armour: 1.05, // should be armour class with properties, determines critical bonus
  weapon: 1.05, // should be weapon class with properties
  stamina: 100,
  count: 0,
}

let monsterStartStats = {
  attack: 3,
  defence: 3,
  strength: 3,
  agility: 2500,
  life: 50,
  armour: 1.05,
  weapon: 1.05,
  stamina: 100,
  count: 0,
}

// Twe cannot render this all the time (but we have to?) - move the items that should render into components
function App() {
  // console.log('render screen')
  const [levelCount, setLevelCount] = useState(1)

  const [player, setPlayer] = useState(playerStartStats)
  const [monster, setMonster] = useState(monsterStartStats)

  const [playerTimerId, setPlayerTimer] = useState(null)

  const [monsterTimerId, setMonsterTimer] = useState(null)

  const [trainingDisabled, setTrainingDisabled] = useState(true)
  const [cardsDisabled, setCardsDisabled] = useState(false)

  const [cardsInHand, setCardsInHand] = useState([])
  const [started, setStarted] = useState(null)

  // TODO cards
  const [cardsUsed, setCardsUsed] = useState([])

  useEffect(() => {
    if (cardsUsed.length === 3) {
      setCardsDisabled(true)
    }
  }, [cardsUsed])

  // sounds
  const [punchHit] = useSound(hit3, { volume: 0.25 })
  const [punchHit2] = useSound(hit4, { volume: 0.25 })
  const [metalHit] = useSound(metal, { volume: 0.25 })
  const [monsterDiePlay] = useSound(monsterDie, { volume: 0.25 })
  const [miss1Play] = useSound(miss1, { volume: 0.25 })
  const [miss2Play] = useSound(miss2, { volume: 0.25 })

  // this won't fire unless it see's deps change
  // player
  useEffect(() => {
    console.log('useEffect from playerCount')
    console.log('player stats from useEffect', player) // why is this 100 and 60
    // had to move here as not updating in attack function?
    if (player.stamina < 5) {
      // agility reduces if you over work
      // this is like a rest - an actual pause would be better
      setPlayer((player) => {
        return {
          ...player,
          agility: player.agility + 100,
          stamina: player.stamina + 10,
        }
      })
    } else {
      setPlayer((player) => {
        return { ...player, stamina: player.stamina - 2 }
      })
    }

    if (player.life < 1 || monster.life < 1) {
      stopGame() // TODO won't stop with the restarts
      clearInterval(playerTimerId)
      console.log(`monster killed player in ${monster.count} moves`)
    } else if (started) {
      clearInterval(playerTimerId)
      startPlayerTimers()
    }
  }, [player.count])

  // monster
  useEffect(() => {
    console.log('useEffect from monsterCount')
    console.log('monster stat from useEffect', monster)

    if (monster.stamina < 5) {
      // agility reduces if you over work // this is like a rest - an actual pause would be better
      setMonster((monster) => {
        return {
          ...monster,
          agility: monster.agility + 100,
          stamina: monster.stamina + 10,
        }
      })
    } else {
      setMonster((monster) => {
        return { ...monster, stamina: monster.stamina - 2 }
      })
    }

    if (player.life < 1 || monster.life < 1) {
      stopGame()
      monsterDiePlay()
      console.log('player killed monster in this moves:', player.count)
    }
  }, [monster.count])

  // get 3 cards from allCards that aren't in cardsOwned to add to
  const cardsToPick = []

  // start with 3 - get to pick at start of game
  const cardsOwned = []

  // is re-rendering functions bad?
  // TODO - can we move that in to monster - that will still re-render?
  // TODO - monster always getting last hit in
  // ***************************** PLAYER ****************************** //
  function attackMonster() {
    console.log('attacking monster', monster)
    // ? why this is only updated in useEffect? who knows, monsterLife, playerStamina, it's read when under 5 but never goes back up?
    const playerFinalAttack = player.attack * player.weapon
    console.log('PLAYER ATTACK')

    const monsterFinalDefence = monster.defence * monster.armour
    let attackMove = getRandomArbitrary(player.strength, playerFinalAttack)
    if (attackMove === player.attack) {
      console.log('critical attack!')
      attackMove += player.strength
    }
    let blockMove = getRandomArbitrary(
      monsterFinalDefence / 2,
      monsterFinalDefence
    )
    if (blockMove === monster.defence) {
      console.log('critical block!')
      blockMove *= monster.armour
    }
    // console.log('player attack move', attackMove)
    // console.log('monster block move', blockMove)
    // TODO need some sort of attack strength modifier - like a roll?
    const strike = Math.max(0, attackMove - blockMove)
    console.log('damage monster', strike)

    // because this is aysynch we cannot read the life so have to move read into useEffect
    // the page reload will call this again but the sleep should still work
    // if we don't pass function it doesn't work - something to do with the sync?
    // TODO add some accuracy modifier
    setPlayer((player) => {
      return { ...player, count: player.count + 1 }
    })

    const weapon = player.weapon ? player.weapon : 1
    const chanceToHit = Math.min(
      Math.max(player.stamina * weapon + (player.attack + 10), 1),
      100
    )

    const randomHitChance = getRandomArbitrary(0, 100)
    const hit = randomHitChance < chanceToHit
    console.log(
      `player - randomHitChance: ${randomHitChance}, chance to hit: ${chanceToHit} - ${hit}`
    )

    if (hit && strike > 0) {
      punchHit2()
      setMonster((monster) => {
        return {
          ...monster,
          life: Math.round(monster.life - strike),
          lastAttack: 'hit',
        }
      })
    } else if (strike < 1) {
      metalHit()
      setMonster((monster) => {
        return { ...monster, lastAttack: 'deflected' }
      })
    } else {
      miss2Play()
      setMonster((monster) => {
        return { ...monster, lastAttack: 'missed' }
      })
    }

    // cannot clear timers here
    // TODO could get bonus stamina from final blow?
  }

  // ***************************** MONSTER ****************************** //
  function attackPlayer() {
    console.log('attacking player', player)
    // TODO if stamina hits zero reduce agility
    // TODO monster should get tired too
    // TODO monster should not have hit if dead (both attacks happen before useEffect)
    const monsterFinalAttack = monster.attack * monster.weapon
    console.log('monsterFinalAttack', monsterFinalAttack)
    console.log('MONSTER ATTACK')
    const playerFinalDefence = player.defence * player.armour
    let attackMove = getRandomArbitrary(monster.strength, monsterFinalAttack)
    console.log('monster attack pre critical', attackMove)

    // attack power will be attackMove - which is -  attack(10) * weapon(0.05) = 10.05 (rand strength(5) - 10.05 ) = 10 + strength(5) - defence (10)
    if (attackMove === monster.attack) {
      console.log('critical attack!')
      attackMove += monster.strength
    }
    // TODO may need tweaking
    let blockMove = getRandomArbitrary(
      playerFinalDefence / 2,
      playerFinalDefence
    )
    console.log('player defence', blockMove)
    if (blockMove === player.defence) {
      console.log('critical block!')
      if (player.defence < attackMove) {
        blockMove *= player.armour
      }
    }

    // TODO chance to hit should be combination of stamina - attack - weapon turned into 1-100
    // can't get worse if stats are low as might never hit?
    // could calc the opponents block and compare?
    const weapon = monster.weapon ? monster.weapon : 1
    const chanceToHit = Math.min(
      Math.max(monster.stamina * weapon + (monster.attack + 10), 1),
      100
    )

    const randomHitChance = getRandomArbitrary(0, 100)
    const hit = randomHitChance < chanceToHit
    console.log(
      `monster - randomHitChance: ${randomHitChance}, chance to hit: ${chanceToHit} - ${hit}`
    )

    console.log('monster attack move', attackMove)
    console.log('player block move', blockMove)
    const strike = Math.max(0, attackMove - blockMove)
    console.log('damage', strike)

    // because this is synch we cannot read the life so have to move read into useEffect
    setMonster((monster) => {
      return { ...monster, count: monster.count + 1 }
    })
    if (hit && strike > 0) {
      punchHit()
      setPlayer((player) => {
        return {
          ...player,
          life: Math.round(player.life - strike),
          lastAttack: 'hit',
        }
      })
    } else if (strike < 1) {
      metalHit() // TODO makes the miss metal only when plate is worn
      setPlayer((player) => {
        return { ...player, lastAttack: 'defended' }
      })
    } else {
      miss1Play()
      setPlayer((player) => {
        return { ...player, lastAttack: 'missed' }
      })
    }
  }

  let playerTimer = null
  let monsterTimer = null

  function startTimers() {
    startPlayerTimers()
    startMonsterTimers()
  }

  function startPlayerTimers() {
    playerTimer = setInterval(() => {
      attackMonster()
    }, getRandomArbitrary(player.agility - 750, player.agility + 750))

    setPlayerTimer(playerTimer)
  }

  function startMonsterTimers() {
    monsterTimer = setInterval(() => {
      attackPlayer()
    }, getRandomArbitrary(monster.agility - 750, monster.agility + 750))

    setMonsterTimer(monsterTimer)
  }

  function startGame() {
    // TODO set arena
    setStarted(true)
    setCardsUsed([])

    // TODO can we clone the player to reset after card changes
    playerBeforeCardsPlayed = cloneDeep(player)

    // TODO should be from cardsOwned - but we need to pick to have that.
    shuffle(AllCards)
    AllCards.length = 5
    setCardsInHand(AllCards)

    setTrainingDisabled(true)
    setCardsDisabled(false)
    console.log('game start')
    startTimers()
  }

  function stopGame() {
    console.log('stop game')
    setStarted(false)
    setCardsDisabled(true)
    clearInterval(playerTimerId)
    clearInterval(monsterTimerId)
  }

  function resetGame() {
    setPlayer(playerStartStats)
    setPlayer(monsterStartStats)

    clearInterval(playerTimerId)
    clearInterval(monsterTimerId)

    setLevelCount(1)
  }

  function nextLevel() {
    cardsInHand.forEach((card) => {
      card.disabled = false
    })

    setTrainingDisabled(false)
    setCardsDisabled(true)

    setMonster({
      attack: getRandomArbitrary(monster.attack + 1, monster.attack + 2), // plus weapon is max attack
      defence: getRandomArbitrary(monster.defence + 1, monster.defence + 2), // plus defence is max defence, attack must be higher
      strength: getRandomArbitrary(monster.strength + 1, monster.strength + 2), // determines min attack and critical bonus
      agility: getRandomArbitrary(monster.agility - 50, monster.agility - 100), // speed of attack
      life: 50,
      armour: getRandomArbitrary(1.05, 1.1), // should be armour class with properties, determines critical bonus
      weapon: getRandomArbitrary(1.05, 1.1), // should be weapon class with properties
      stamina: 100,
      count: 0,
    })

    setLevelCount((level) => level + 1)

    // this resets the players stats, whilst keeping training, but not card effects
    setPlayer((player) => {
      return {
        ...player,
        attack: playerBeforeCardsPlayed.attack,
        defence: playerBeforeCardsPlayed.defence,
        strength: playerBeforeCardsPlayed.strength,
        agility: playerBeforeCardsPlayed.agility,
        armour: 1.05,
        weapon: 1.05,
        count: 0,
        lastAttack: '',
      }
    })
  }

  function trainHandler(type) {
    if (player.stamina >= 15) {
      setPlayer((player) => {
        return { ...player, stamina: player.stamina - 15 }
      })
      switch (type) {
        case 'strength':
          setPlayer((player) => {
            return { ...player, strength: player.strength + 2 }
          })
          break
        case 'attack':
          setPlayer((player) => {
            return { ...player, attack: player.attack + 2 }
          })
          break
        case 'defence':
          setPlayer((player) => {
            return { ...player, defence: player.defence + 2 }
          })
          break
        case 'agility':
          if (player.agility > 500) {
            setPlayer((player) => {
              return { ...player, agility: player.agility - 100 }
            })
          }
          break
        default:
          break
      }
    }
  }

  function addHealth() {
    setPlayer((player) => {
      return { ...player, life: player.life + 100 }
    })
  }

  // TODO get some more feedback in here
  return (
    <div className="App">
      <h1>Master and Apprentice testing grounds</h1>
      <button onClick={startGame}>Start game</button>
      <button onClick={stopGame}>Stop game</button>
      <button onClick={resetGame}>Reset game</button>

      <h1>Level {levelCount}/20</h1>
      <button disabled={started} onClick={nextLevel}>
        Next level
      </button>

      <Player player={player} />
      <Monster monster={monster} />

      <div>
        <button onClick={addHealth}>health</button>
      </div>

      {/* <h3>Draw pile</h3> */}
      {/* <h3>Discard pile</h3> */}

      <CardsHand
        cardsInHand={cardsInHand}
        cardsDisabled={cardsDisabled}
        setPlayerHandler={setPlayer}
        setCardsUsedHandler={setCardsUsed}
        cardsUsed={cardsUsed}
        player={player}
      />

      <Train
        player={player}
        trainingDisabled={trainingDisabled}
        train={trainHandler}
      />
    </div>
  )
}

export default App
