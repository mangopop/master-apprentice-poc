import { Link } from 'react-router-dom'
import ICharacter from '../interfaces/character'
import ILevelProgressionProps from '../interfaces/levelProgressionProps'

function LevelProgression({
  level,
  nextLevelHandler,
  player,
  playerBeforeCardsPlayed,
}: ILevelProgressionProps) {
  var staminaBoost = player.stamina

  if (player.stamina < 80) {
    staminaBoost += 20
  }

  function nextLevel() {
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
      <h1>Level {level}</h1>
      <Link onClick={nextLevel} to={`/battle`}>
        Start Battle
      </Link>
    </div>
  )
}

export default LevelProgression
