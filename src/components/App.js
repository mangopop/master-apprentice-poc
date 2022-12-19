import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { Route, Routes } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import hit3 from './../sounds/hit3.mp3'
import hit4 from './../sounds/hit4.wav'
import metal from './../sounds/metal.mp3'
import playerDeath from './../sounds/playerDeath.wav'
import monsterDie from './../sounds/monsterDie.wav'
import innMusic from './../sounds/medieval-inn-music.mp3'
import miss1 from './../sounds/miss1.wav'
import miss2 from './../sounds/miss2.wav'
import drums from './../sounds/drums.mp3'

import Train from './Train'
import { getRandomArbitrary } from '../services/utilities.service'
import { getStrikeDamage, randAttackModifier } from '../services/app.service'
import './Battle.css'
import Start from './Start'
import Battle from './Battle'
import LevelProgression from './LevelProgression'
import ChooseCard from './Cards/ChooseCard'
import CardCollection from './Cards/CardCollection'
import { monsters } from './Cards/Monsters'

let playerBeforeCardsPlayed = {}
let playerStartStats = {
  attack: 7, // plus weapon is max attack
  defence: 7, // plus defence is max defence, attack must be higher
  strength: 7, // determines min attack and critical bonus - and use of heavy items
  agility: 2000, // speed of attack
  magic: 7, // to use spells
  life: 100,
  armour: 1.0, // should be armour class with properties, determines critical bonus
  weapon: 1.0, // should be weapon class with properties
  stamina: 100,
  count: 0,
}

// TODO when this refactor is working (lol - imagine that), branch off and do it all again in redux!! fucking do it!

// we cannot render this all the time (but we have to?) - move the items that should render into components
function App() {
  // console.log('render app')

  // level and battle
  const [levelCount, setLevelCount] = useState(1)
  const [ownedCards, setOwnedCards] = useState([])

  const [player, setPlayer] = useState(playerStartStats)
  const [monster, setMonster] = useState(monsters[0])

  // app and battle
  const [playerTimerId, setPlayerTimer] = useState(null)
  const [monsterTimerId, setMonsterTimer] = useState(null)

  // just battle? move to battle?
  const [started, setStarted] = useState(null)

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
  function applyDamage(wasHit, strike, defenderCallback, type) {
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
      stopGame() // TODO won't stop with the restarts
      if (monster.life < -15) {
        // death blow bonus!
        console.log('DEATH BLOW')
        setPlayer((player) => {
          return {
            ...player,
            life: player.life + 20,
            stamina: player.stamina + 20,
          }
        })
      }

      setPlayer((player) => {
        return {
          ...player,
          attack: playerBeforeCardsPlayed.attack,
          defence: playerBeforeCardsPlayed.defence,
          strength: playerBeforeCardsPlayed.strength,
          agility: playerBeforeCardsPlayed.agility,
          magic: playerBeforeCardsPlayed.magic,
          weapon: playerBeforeCardsPlayed.weapon,
          defence: playerBeforeCardsPlayed.defence,
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
    }
    if (monster.life < 1) {
      stopMonsterTimers()
    }
  }, [monster.count])

  // TODO  The attack and timer stuff would be so much easier if refactored out somewhere. Maybe just get this comp refactor working first
  // is re-rendering functions bad?
  function attackMonster() {
    console.log('attacking monster', monster)
    const strike = getStrikeDamage(player, monster, setPlayer, setMonster)
    const wasHit = randAttackModifier(player)
    applyDamage(wasHit, strike, setMonster, 'monster')
    // cannot clear timers here
    // TODO could get bonus stamina from final blow?
  }

  function attackPlayer() {
    console.log('attacking player', player)
    const strike = getStrikeDamage(monster, player, setMonster, setPlayer)
    const wasHit = randAttackModifier(monster)
    applyDamage(wasHit, strike, setPlayer, 'player')
  }

  // TODO refactor into battle?
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

  // TODO trigger this from battle screen
  function startGame() {
    console.log('game start')
    setStarted(true)
    drumsPlay()
    innMusicSoundObj.stop()

    playerBeforeCardsPlayed = cloneDeep(player)

    console.log('playerBeforeCardsPlayed at start', playerBeforeCardsPlayed)

    startTimers()
  }

  function stopMonsterTimers() {
    clearInterval(monsterTimerId) // is this not stopping because it's not in useEffect? Stop works in the game?
  }

  // TODO trigger this from battle screen.
  function stopGame() {
    console.log('stop game')
    innMusicPlay()
    drumsSoundObj.stop()
    setStarted(false)
    // setCardsDisabled(true)
    clearInterval(playerTimerId)
    clearInterval(monsterTimerId)
  }

  // TODO trigger this from the level progression component
  function nextLevel() {
    setLevelCount((level) => level + 1)
  }

  // TODO are we reloading all of this?
  // Do we have, level progression doesn't share state so that shouldn't.
  // Even though we don't see the others they probably will.
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route
        path="chooseCard"
        element={
          <ChooseCard
            ownedCards={ownedCards}
            setOwnedCardsHandler={setOwnedCards}
          />
        }
      />
      <Route
        path="battle"
        element={
          <Battle
            level={levelCount}
            player={player}
            setPlayerHandler={setPlayer}
            setMonsterHandler={setMonster}
            monster={monster}
            ownedCards={ownedCards}
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
            setPlayerHandler={setPlayer}
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
            setMonsterHandler={setMonster}
          />
        }
      />
      <Route
        path="/cardCollection"
        element={<CardCollection ownedCards={ownedCards} />}
      />
    </Routes>
  )
}

export default App
