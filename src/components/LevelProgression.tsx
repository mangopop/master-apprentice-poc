import { Link } from 'react-router-dom'
import ICharacter from '../interfaces/character'
import ILevelProgressionProps from '../interfaces/levelProgressionProps'
import { monsters } from './Cards/Monsters'

function LevelProgression({
  level,
  nextLevelHandler,
  player,
  playerBeforeCardsPlayed,
  setMonsterHandler,
}: ILevelProgressionProps) {
  let staminaBoost = player.stamina

  if (player.stamina < 80) {
    staminaBoost += 20
  }

  function nextLevel() {
    setMonsterHandler(monsters[level])
    nextLevelHandler((player: ICharacter) => {
      return {
        ...player,
        attack: playerBeforeCardsPlayed.attack,
        defence: playerBeforeCardsPlayed.defence,
        strength: playerBeforeCardsPlayed.strength,
        agility: playerBeforeCardsPlayed.agility,
        stamina: staminaBoost,
        armour: 1.05,
        weapon: 1.05,
        count: 0,
        lastAttack: '',
      }
    })
  }

  return (
    <div>
      <h1>Level {level + 1}</h1>
      {/* <div id="div1" className="dot pos pos1"></div>
      <div id="div2" className="dot pos pos2"></div>
      <div id="div2" className="dot pos pos3"></div>

      <svg width="500" height="500">
        <line x1="20" y1="20" x2="200" y2="105" stroke="black" />
        <line x1="210" y1="100" x2="310" y2="300" stroke="black" />
      </svg> */}
      <Link onClick={nextLevel} to={`/chooseCard`}>
        Choose Card
      </Link>
    </div>
  )
}

export default LevelProgression
