import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { Route, Routes } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import {
  hit3,
  hit4,
  metal,
  playerDeath,
  monsterDie,
  innMusic,
  miss1,
  miss2,
  drums,
} from '../sounds/index'

import Train from './Train'
import { getRandomArbitrary } from '../services/utilities.service'
import { getStrikeDamage, randAttackModifier } from '../services/app.service'
import './Battle.css'
import Start from './Start'
import Battle from './Battle'
import LevelProgression from './LevelProgression'
import ChooseCard from './Cards/ChooseCard'
import ChooseTalismanCard from './Cards/talisman/ChooseTalismanCard'
import CardCollection from './Cards/CardCollection'
import { monsters } from './Cards/Monsters'
import ICharacter from '../interfaces/character'
import BattleLog from './BattleLog'

let playerBeforeCardsPlayed: ICharacter
let playerStartStats = {
  name: 'player',
  attack: 7, // plus weapon is max attack
  defence: 7, // plus defence is max defence, attack must be higher
  strength: 7, // determines min attack and critical bonus - and use of heavy items
  agility: 2000, // speed of attack
  magic: 7, // to use spells
  life: 100,
  elements: [],
  armour: 1.0, // should be armour class with properties, determines critical bonus
  weapon: 1.0, // should be weapon class with properties
  stamina: 100,
  count: 0,
}

// TODO when this refactor is working (lol - imagine that), branch off and do it all again in redux!! fucking do it!

// we cannot render this all the time (but we have to?) - move the items that should render into components
function App() {
  // console.log('render app')
  // TODO this needs to reset before choose card
  const [arena, setArena] = useState({
    name: 'Mountains',
    description: 'Home of the Dwarfs',
    type: 'dwarf',
  })

  // level and battle
  const [levelCount, setLevelCount] = useState(1)
  const [ownedCards, setOwnedCards] = useState([])

  const [ownedTalismanCards, setOwnedTalismanCards] = useState([])

  const [player, setPlayer] = useState(playerStartStats)
  const [monster, setMonster] = useState(monsters[0])

  // app and battle
  const [playerTimerId, setPlayerTimer] = useState<NodeJS.Timer>()
  const [monsterTimerId, setMonsterTimer] = useState<NodeJS.Timer>()

  // just battle? move to battle?
  const [started, setStarted] = useState(false)

  const [playerStrike, setPlayerStrike] = useState(0)
  const [monsterStrike, setMonsterStrike] = useState(0)

  // sounds
  const [punchHit] = useSound(hit3, { volume: 0.25 })
  const [punchHit2] = useSound(hit4, { volume: 0.25 })
  const [metalHit] = useSound(metal, { volume: 0.25 })
  const [monsterDiePlay] = useSound(monsterDie, { volume: 0.25 })
  const [miss1Play] = useSound(miss1, { volume: 0.25 })
  const [miss2Play] = useSound(miss2, { volume: 0.25 })
  const [playerDeathPlay] = useSound(playerDeath, { volume: 0.25 })
  const [innMusicPlay, innMusicSoundObj] = useSound(innMusic, { volume: 0.15 })
  const [drumsPlay, drumsSoundObj] = useSound(drums, { volume: 0.15 })

  // Here so we can use the sounds
  function applyDamage(
    wasHit: boolean,
    strike: number,
    defenderCallback: (params: (params: ICharacter) => void) => void,
    type: string
  ) {
    if (wasHit && strike > 0) {
      type === 'monster' ? punchHit2() : punchHit()
      defenderCallback((character) => {
        return {
          ...character,
          life: Math.round(character.life - strike),
          lastAttack: 'hit',
        }
      })
    } else if (strike < 1) {
      // TODO would be cool if this reduced stamina more?
      type === 'monster' ? metalHit() : punchHit()
      defenderCallback((character) => {
        return { ...character, lastAttack: 'deflected' }
      })
    } else {
      type === 'monster' ? miss2Play() : miss1Play()
      defenderCallback((character) => {
        return { ...character, lastAttack: 'missed' }
      })
    }
  }

  // ***** player attacking ****** //
  useEffect(() => {
    console.log('useEffect from playerCount')
    console.log('player stats from useEffect', player) // why is this 100 and 60
    // had to move here as not updating in attack function?
    if (player.stamina < 10) {
      // agility reduces if you over work
      // this is like a rest - an actual pause would be better
      setPlayer((player) => {
        return {
          ...player,
          agility: player.agility + 100, // TODO this might be going on forever?
          stamina: player.stamina + 10,
        }
      })
    } else {
      setPlayer((player) => {
        return { ...player, stamina: player.stamina - 2 }
      })
    }

    if (monster.life < 1) {
      let life = 0
      let stamina = 20
      if (player.life < 90) {
        life = 5
      }
      if (monster.life < -15) {
        // death blow bonus!
        console.log('DEATH BLOW')
        if (player.life < 80) {
          life = 20
        }
        if (player.life < 70) {
          stamina = 30
        }
      }
      stopGame() // TODO won't stop with the restarts
      setPlayer((player) => {
        return {
          ...player,
          life: player.life + life,
          stamina: player.stamina + stamina,
        }
      })

      setPlayer((player) => {
        return {
          ...player,
          attack: playerBeforeCardsPlayed.attack,
          defence: playerBeforeCardsPlayed.defence,
          strength: playerBeforeCardsPlayed.strength,
          agility: playerBeforeCardsPlayed.agility,
          magic: playerBeforeCardsPlayed.magic,
          weapon: playerBeforeCardsPlayed.weapon,
        }
      })
      monsterDiePlay()
      // clearInterval(playerTimerId)
      console.log(`player killed monster in ${player.count} moves`)
    } else if (started) {
      clearInterval(playerTimerId)
      startPlayerTimers()
    }
  }, [player.count])

  // ***** monster attacking ****** //
  useEffect(() => {
    console.log('useEffect from monsterCount')
    console.log('monster stat from useEffect', monster)

    if (monster.stamina < 10) {
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
        return { ...monster, stamina: monster.stamina - 3 }
      })
    }

    if (player.life < 1) {
      stopGame()
      playerDeathPlay()
      console.log('player killed monster in this moves:', player.count)
    } else if (monster.life < 1) {
      stopMonsterTimers()
    } else if (started) {
      clearInterval(monsterTimerId)
      startMonsterTimers()
    }
  }, [monster.count])

  // is re-rendering functions bad?
  // are we not seeing player update here because this in the the APP?
  // the character screen is updating ok.
  function attackMonster() {
    console.log('attacking monster', monster)

    const strike = getStrikeDamage(
      player.attack,
      player.weapon,
      player.strength,
      monster.defence,
      monster.armour,
      setPlayerHandler, // we see updates in the character screen and useEffect
      setMonsterHandler
    )
    setMonsterStrike(strike)
    const wasHit = randAttackModifier(
      player.weapon,
      player.stamina,
      player.attack
    )
    applyDamage(wasHit, strike, setMonsterHandler, 'monster')
    // cannot clear timers here
  }

  function attackPlayer() {
    console.log('attacking player', player)

    let strike = getStrikeDamage(
      monster.attack,
      monster.weapon,
      monster.strength,
      player.defence,
      player.armour,
      setMonsterHandler,
      setPlayerHandler
    )

    setPlayerStrike(strike)

    // applied after defence
    let intersection = player.elements.filter((element) =>
      monster.elements.includes(element)
    )

    if (intersection.length < 1 && !monster.elements.includes(arena.name)) {
      strike *= 1.2
    }

    const wasHit = randAttackModifier(
      monster.weapon,
      monster.stamina,
      monster.attack
    )
    applyDamage(wasHit, strike, setPlayerHandler, 'player')
  }

  // TODO refactor into battle?
  let playerTimer = null
  let monsterTimer = null

  function startTimers() {
    startPlayerTimers()
    startMonsterTimers()
  }

  function setArenaHandler(arg: any) {
    setArena(arg)
  }

  function setPlayerHandler(arg: any) {
    setPlayer(arg)
  }

  function setMonsterHandler(arg: any) {
    setMonster(arg)
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
    setPlayerStrike(0)
    setMonsterStrike(0)
    console.log('game start')
    setStarted(true)
    drumsPlay()
    innMusicSoundObj.stop()

    playerBeforeCardsPlayed = cloneDeep(player)

    console.log('playerBeforeCardsPlayed at start', playerBeforeCardsPlayed)

    // if (arena.name === 'Tall grass fields' && monster.agility > 1300) {
    //   setMonster((monster) => {
    //     return {
    //       ...monster,
    //       agility: (monster.agility -= 300),
    //     }
    //   })
    // }

    startTimers()
  }

  function stopMonsterTimers() {
    clearInterval(monsterTimerId) // is this not stopping because it's not in useEffect? Stop works in the game?
  }

  function stopGame() {
    console.log('stop game')
    innMusicPlay()
    drumsSoundObj.stop()
    setStarted(false)
    // setCardsDisabled(true)
    clearInterval(playerTimerId)
    clearInterval(monsterTimerId)
  }

  function nextLevel() {
    setLevelCount((level) => level + 1)
  }

  const battleLog = (
    <BattleLog playerStrike={playerStrike} monsterStrike={monsterStrike} />
  )

  // TODO are we reloading all of this?
  // Do we have, level progression doesn't share state so that shouldn't.
  // Even though we don't see the others they probably will.
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="chooseCard"
          element={
            <ChooseCard
              level={levelCount}
              strength={player.strength}
              magic={player.magic}
              ownedCards={ownedCards}
              setOwnedCardsHandler={setOwnedCards}
            />
          }
        />
        {/* play card will lift state up which can be used in the cardshand through battle, we can modify here?   */}
        <Route
          path="chooseTalismanCard"
          element={
            <ChooseTalismanCard
              ownedCards={ownedTalismanCards}
              setOwnedCardsHandler={setOwnedTalismanCards}
            />
          }
        />
        <Route
          path="battle"
          element={
            <Battle
              battleLog={battleLog}
              arena={arena}
              level={levelCount}
              player={player}
              setArenaHandler={setArenaHandler}
              setPlayerHandler={setPlayerHandler}
              setMonsterHandler={setMonsterHandler}
              monster={monster}
              ownedCards={ownedCards}
              ownedTalismanCards={ownedTalismanCards}
              // might need to add in talisman cards here?
              startGameHandler={startGame}
              stopGameHandler={stopGame}
              startMonsterTimersHandler={startMonsterTimers}
              stopMonsterTimersHandler={stopMonsterTimers}
              started={started}
            />
          }
        />
        <Route
          path="train"
          element={
            <Train
              player={player}
              playerBeforeCardsPlayed={playerBeforeCardsPlayed}
              setPlayerHandler={setPlayerHandler}
            />
          }
        />
        <Route
          path="level"
          element={
            <LevelProgression
              level={levelCount}
              playerBeforeCardsPlayed={playerBeforeCardsPlayed}
              player={player}
              nextLevelHandler={nextLevel}
              setMonsterHandler={setMonsterHandler}
            />
          }
        />
        {/* <Route
        path="/cardCollection"
        element={<CardCollection ownedCards={ownedCards} />}
      /> */}
      </Routes>
      {/* <BattleLog playerStrike={playerStrike} monsterStrike={monsterStrike} /> */}
    </>
  )
}

export default App
