import { useEffect, useState } from 'react'
import './App.css'
import { cloneDeep } from 'lodash'
import useSound from 'use-sound'
import hit3 from './sounds/hit3.mp3'
import metal from './sounds/metal.mp3'
import monsterDie from './sounds/monsterDie.wav'
import miss1 from './sounds/miss1.wav'
import miss2 from './sounds/miss2.wav'

/**
 * @param {int} min
 * @param {int} max
 * @returns
 */
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandom(value) {
  return Math.round(Math.random() * value)
}

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// TODO get as much logic in here as possible
function Player({ player }) {
  // console.log('render player')
  return (
    <div>
      <p style={{ fontSize: '40px' }}>😇 {player.life}</p>
    </div>
  )
}

// TODO get as much logic in here as possible
function Monster({ monster }) {
  // console.log('render monster')
  return (
    <div>
      <p style={{ fontSize: '40px' }}>👿 {monster.life}</p>
    </div>
  )
}

function MonsterCharacter(
  attack,
  defence,
  strength,
  agility,
  armour,
  weapon,
  life
) {
  this.attack = attack
  this.defence = defence
  this.strength = strength
  this.agility = agility
  this.armour = armour
  this.weapon = weapon
  this.life = life
}

// Twe cannot render this all the time (but we have to?) - move the items that should render into components
function App() {
  // console.log('render screen')
  const [levelCount, setLevelCount] = useState(1)

  // TODO move this into some sort of object
  const [playerAttack, setPlayerAttack] = useState(7)
  const [playerStrength, setPlayerStrength] = useState(7)
  const [playerDefence, setPlayerDefence] = useState(7)
  const [playerAgility, setPlayerAgility] = useState(1800)
  const [playerStamina, setPlayerStamina] = useState(100)
  const [playerLife, setPlayerLife] = useState(100)
  const [playerCount, setPlayerCount] = useState(0)

  const [monsterAttack, setMonsterAttack] = useState(3)
  const [monsterStrength, setMonsterStrength] = useState(3)
  const [monsterDefence, setMonsterDefence] = useState(3)
  const [monsterAgility, setMonsterAgility] = useState(2000)
  const [monsterLife, setMonsterLife] = useState(30)
  const [monsterCount, setMonsterCount] = useState(0)

  const [playerTimerId, setPlayerTimer] = useState(null)
  const [monsterTimerId, setMonsterTimer] = useState(null)

  const [trainingDisabled, setTrainingDisabled] = useState(true)
  const [cardsDisabled, setCardsDisabled] = useState(false)

  const [cardsInHand, setCardsInHand] = useState([])
  const [started, setStarted] = useState(null)

  // TODO neither of these are much use
  let player = {
    attack: playerAttack, // plus weapon is max attack
    defence: playerDefence, // plus defence is max defence, attack must be higher
    strength: playerStrength, // determines min attack and critical bonus
    agility: playerAgility, // speed of attack
    life: playerLife,
    armour: 1.05, // should be armour class with properties, determines critical bonus
    weapon: 1.05, // should be weapon class with properties
    stamina: playerStamina,
  }

  var monster = new MonsterCharacter(
    monsterAttack,
    monsterStrength,
    monsterDefence,
    monsterAgility,
    1.05,
    1.05,
    monsterLife
  )

  const [punchHit] = useSound(hit3, { volume: 0.25 })
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
    if (playerStamina < 5) {
      setPlayerAgility((agility) => agility + 100) // this is like a rest - an actual pause would be better
      setPlayerStamina((stamina) => stamina + 10)
    } else {
      setPlayerStamina((stamina) => stamina - 2)
    }
    if (player.life < 1 || monster.life < 1) {
      stopGame() // todo won't stop with the restarts
      clearInterval(playerTimerId)
      console.log(`monster killed player in ${monsterCount} moves`)
    } else if (started) {
      clearInterval(playerTimerId)
      startPlayerTimers()
    }
  }, [playerCount])

  // monster
  useEffect(() => {
    console.log('useEffect from monsterCount')

    console.log('monster stat from useEffect', monster)
    if (player.life < 1 || monster.life < 1) {
      stopGame()
      monsterDiePlay()
      console.log('player killed monster in this moves:', playerCount)
    }
  }, [monsterCount])

  function playCard(card) {
    // TODO if we are adding stats from card we to store then remove them
    // TODO put card in discard pile or disable
    console.log(card.name)
    card.init()
    // discardPile.push(card)
    console.log(player)
  }

  // get 3 cards from allCards that aren't in cardsOwned to add to
  const cardsToPick = []

  // start with 3 - get to pick at start of game
  const cardsOwned = []

  // will be random
  // todo turn this into objects to create quicker?
  const allCards = [
    {
      name: 'sword',
      description: 'increase attack and agility',
      disabled: false,
      attack: function () {
        setPlayerAttack((attack) => attack + 5)
      },
      agility: function () {
        setPlayerAgility((agility) => agility + 300)
      },
      init: function () {
        this.attack()
        this.agility()
        this.disabled = true
      },
    },
    {
      name: 'axe',
      description: 'increase attack and reduces agility',
      disabled: false,
      attack: function () {
        setPlayerAttack((attack) => attack + 5)
      },
      agility: function () {
        setPlayerAgility((agility) => agility + 300)
      },
      init: function () {
        this.attack()
        this.agility()
        this.disabled = true
      },
    },
    {
      name: 'plate',
      description: 'increase defence and reduces agility',
      disabled: false,
      defence: function () {
        setPlayerDefence((defence) => defence + 5)
      },
      agility: function () {
        setPlayerAgility((agility) => agility + 300)
      },
      init: function () {
        this.defence()
        this.agility()
        this.disabled = true
      },
    },
    {
      name: 'steroids',
      description: 'increase strength',
      disabled: false,
      strength: function () {
        setPlayerStrength((strength) => strength + 5)
      },
      init: function () {
        this.strength()
        this.disabled = true
      },
    },
    {
      name: 'health potion',
      description: 'increase health',
      life: function () {
        setPlayerLife((life) => life + 40)
      },
      init: function () {
        this.life()
      },
    },
    {
      name: 'poison potion',
      disabled: false,
      life: function () {
        setPlayerLife((life) => life + 40)
      },
      init: function () {
        this.life()
        this.disabled = true
      },
    },
    {
      name: 'fire potion',
      disabled: false,
      life: function () {
        setPlayerLife((life) => life + 40)
      },
      init: function () {
        this.life()
        this.disabled = true
      },
    },
    {
      name: 'Angelina Jolie',
      life: function () {
        setPlayerLife((life) => life + 40)
      },
      init: function () {
        this.life()
      },
    },
  ]

  // TODO this is POC but at this point the code needs cleaning

  // is re-rendering functions bad?
  // todo - can we move that in to monster - that will still re-render?
  // TODO - monster always getting last hit in
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
    console.log('damage', strike)

    // because this is aysynch we cannot read the life so have to move read into useEffect
    // the page reload will call this again but the sleep should still work
    // if we don't pass function it doesn't work - something to do with the sync?
    // TODO add some accuracy modifier
    setPlayerCount((count) => count + 1)
    if (strike > 0) {
      metalHit()
      setMonsterLife((life) => Math.round(life - strike))
    } else {
      miss2Play()
    }

    // cannot clear timers here
    // TODO could get bonus stamina from final blow?
  }

  //
  function attackPlayer() {
    console.log('attacking player', player)
    // todo if stamina hits zero reduce agility
    // todo monster should get tired too
    // todo monster should not have hit if dead (both attacks happen before useEffect)
    if (monsterLife < 1) {
      return
    }
    // await sleep(monster.agility)
    const monsterFinalAttack = monster.attack * monster.weapon
    console.log('monsterFinalAttack', monsterFinalAttack)
    console.log('MONSTER ATTACK')
    const playerFinalDefence = player.defence * player.armour
    let attackMove = getRandomArbitrary(monster.strength, monsterFinalAttack)
    console.log('monster attack pre critical', attackMove)
    // the attack is 12
    if (attackMove === monster.attack) {
      console.log('critical attack!')
      attackMove += monster.strength
    }
    let blockMove = getRandomArbitrary(
      playerFinalDefence / 2,
      playerFinalDefence
    ) // TODO this is sometimes 0 - probably too low
    console.log('player defence', blockMove)
    if (blockMove === player.defence) {
      console.log('critical block!')
      if (player.defence < attackMove) {
        blockMove *= player.armour
      }
    }

    console.log('monster attack move', attackMove)
    console.log('player block move', blockMove)
    const strike = Math.max(0, attackMove - blockMove)
    console.log('damage', strike)

    // because this is synch we cannot read the life so have to move read into useEffect
    setMonsterCount((count) => count + 1)
    if (strike > 0) {
      punchHit()
      setPlayerLife((life) => Math.round(life - strike))
    } else {
      miss1Play() // todo makes the miss metal only when plate is worn
    }
  }

  let playerTimer = null
  let monsterTimer = null

  // todo every hit we could change the timer slightly
  function startTimers() {
    startPlayerTimers()
    startMonsterTimers()
  }

  function startPlayerTimers() {
    playerTimer = setInterval(() => {
      attackMonster()
    }, getRandomArbitrary(player.agility - 500, player.agility + 500))

    setPlayerTimer(playerTimer)
  }

  function startMonsterTimers() {
    monsterTimer = setInterval(() => {
      attackPlayer()
    }, monster.agility)

    setMonsterTimer(monsterTimer)
  }

  function startGame() {
    // TODO should be from owned - but we need to pick to have that.
    let cards = cloneDeep(allCards)
    setStarted(true)

    // add cards to hand
    setCardsInHand([
      cards.splice(getRandomArbitrary(0, cards.length - 1), 1)[0],
      cards.splice(getRandomArbitrary(0, cards.length - 1), 1)[0],
      cards.splice(getRandomArbitrary(0, cards.length - 1), 1)[0],
      cards.splice(getRandomArbitrary(0, cards.length - 1), 1)[0],
      cards.splice(getRandomArbitrary(0, cards.length - 1), 1)[0],
    ])

    setTrainingDisabled(true)
    setCardsDisabled(false)
    console.log('game start')
    startTimers()
  }

  function stopGame() {
    console.log('stop game')
    setCardsDisabled(true)
    clearInterval(playerTimerId)
    clearInterval(monsterTimerId)
  }

  function resetGame() {
    setPlayerStamina(100)
    setPlayerDefence(5)
    setPlayerStrength(5)
    setPlayerAgility(1000)
    setPlayerAttack(10)
    setPlayerLife(100)
    setPlayerCount(0)

    setMonsterLife(30)
    setMonsterAttack(5)
    setMonsterDefence(5)
    setMonsterStrength(5)
    setMonsterAgility(1000)
    setMonsterCount(0)

    clearInterval(playerTimerId)
    clearInterval(monsterTimerId)

    setLevelCount(1)
  }

  function monsterCreator() {
    setMonsterAttack(getRandomArbitrary(monster.attack + 1, monster.attack + 1))
    setMonsterDefence(
      getRandomArbitrary(monster.defence + 1, monster.defence + 1)
    )
    setMonsterStrength(
      getRandomArbitrary(monster.strength + 1, monster.strength + 1)
    )
    setMonsterAgility(
      getRandomArbitrary(monster.agility + 100, monster.agility + 200)
    )
    getRandomArbitrary(1.05, 1.1)
    getRandomArbitrary(1.05, 1.1)

    return new MonsterCharacter(
      monster.attack,
      monster.defence,
      monster.strength,
      monster.agility,
      monster.armour,
      monster.weapon
    )
  }

  function nextLevel() {
    setTrainingDisabled(false)
    setCardsDisabled(true)
    monster = monsterCreator()
    setMonsterLife(50)
    setMonsterCount(0)
    setLevelCount((level) => level + 1)
    if (playerStamina < 74) {
      setPlayerStamina((stamina) => stamina + 25)
    }
  }

  function train(type) {
    if (playerStamina >= 15) {
      // setPlayerStamina(playerStamina - 20)
      setPlayerStamina((stamina) => stamina - 15)
      switch (type) {
        case 'strength':
          setPlayerStrength(playerStrength + 2)
          break
        case 'attack':
          setPlayerAttack(playerAttack + 2)
          break
        case 'defence':
          setPlayerDefence(playerDefence + 2)
          break
        case 'agility':
          if (playerAgility > 500) {
            setPlayerAgility(playerAgility - 100)
          }
          break
        default:
          break
      }
    }
  }

  // TODO get some more feedback in here
  return (
    <div className="App">
      <h1>Master and Apprentice testing grounds</h1>
      <button onClick={startGame}>Start game</button>
      <button onClick={stopGame}>Stop game</button>
      <button onClick={resetGame}>Reset game</button>

      <Player player={player} />
      <Monster monster={monster} />

      {/* <h3>Draw pile</h3> */}
      {/* <h3>Discard pile</h3> */}
      <h3>Choose a new card</h3>
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

      <div>
        <h1>Train</h1>
        <h4>Stamina / {player.stamina}</h4>
        <p>Strength / {player.strength}</p>
        <button disabled={trainingDisabled} onClick={() => train('strength')}>
          Train Strength
        </button>
        <p>Attack / {player.attack}</p>
        <button disabled={trainingDisabled} onClick={() => train('attack')}>
          Train Attack
        </button>
        <p>Agility / {player.agility}</p>
        <button disabled={trainingDisabled} onClick={() => train('agility')}>
          Train Agility
        </button>
        <p>Defence / {player.defence}</p>
        <button disabled={trainingDisabled} onClick={() => train('defence')}>
          Train Defence
        </button>
      </div>

      <h1>Level {levelCount}/20</h1>
      <button onClick={nextLevel}>Next level</button>
    </div>
  )
}

export default App
