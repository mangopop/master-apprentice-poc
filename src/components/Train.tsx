import ITrainProps from '../interfaces/trainProps'
import { Link } from 'react-router-dom'

function Train({ player, setPlayerHandler }: ITrainProps) {
  function trainCharacter(type: string) {
    if (player.stamina >= 15) {
      setPlayerHandler((player) => {
        return { ...player, stamina: player.stamina - 15 }
      })
      switch (type) {
        case 'strength':
          setPlayerHandler((player) => {
            return { ...player, strength: player.strength + 2 }
          })
          break
        case 'attack':
          setPlayerHandler((player) => {
            return { ...player, attack: player.attack + 2 }
          })
          break
        case 'defence':
          setPlayerHandler((player) => {
            return { ...player, defence: player.defence + 2 }
          })
          break
        case 'agility':
          if (player.agility > 500) {
            setPlayerHandler((player) => {
              return { ...player, agility: player.agility - 100 }
            })
          }
          break
        default:
          break
      }
    }
  }
  return (
    <div>
      <h1>Train</h1>
      <h4>Stamina / {player.stamina}</h4>
      <p>Strength / {player.strength}</p>
      <button onClick={() => trainCharacter('strength')}>Train Strength</button>
      <p>Attack / {player.attack}</p>
      <button onClick={() => trainCharacter('attack')}>Train Attack</button>
      <p>Agility / {player.agility}</p>
      <button onClick={() => trainCharacter('agility')}>Train Agility</button>
      <p>Defence / {player.defence}</p>
      <button onClick={() => trainCharacter('defence')}>Train Defence</button>

      <Link to={`/level`}>Next Level</Link>
    </div>
  )
}

export default Train
