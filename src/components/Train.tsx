import ITrainProps from '../interfaces/trainProps'
import { Link } from 'react-router-dom'

// TODO have card affected data in here, the player clone isnt working

function Train({
  player,
  playerBeforeCardsPlayed,
  setPlayerHandler,
}: ITrainProps) {

  function trainCharacter(type: string) {
    // would like to set the player to the clone - but, issues with useEffect loop
    // TODO after player reset on monster death might be able to tidy this

    if (player.stamina >= 15) {
      setPlayerHandler((player) => {
        return { ...player, stamina: player.stamina - 15 }
      })
      switch (type) {
        case 'strength':
          playerBeforeCardsPlayed.strength += 2
          setPlayerHandler((player) => {
            return { ...player, strength: playerBeforeCardsPlayed.strength + 2 }
          })
          break
        case 'attack':
          playerBeforeCardsPlayed.attack += 2
          setPlayerHandler((player) => {
            return { ...player, attack: playerBeforeCardsPlayed.attack + 2 }
          })
          break
        case 'defence':
          playerBeforeCardsPlayed.defence += 2
          setPlayerHandler((player) => {
            return { ...player, defence: playerBeforeCardsPlayed.defence + 2 }
          })
          break
        case 'agility':
          playerBeforeCardsPlayed.agility += 2
          if (player.agility > 500) {
            setPlayerHandler((player) => {
              return {
                ...player,
                agility: playerBeforeCardsPlayed.agility - 100,
              }
            })
          }
        case 'magic':
          playerBeforeCardsPlayed.magic += 2
          if (player.magic > 500) {
            setPlayerHandler((player) => {
              return {
                ...player,
                magic: playerBeforeCardsPlayed.magic + 2,
              }
            })
          }
          break
        default:
          break
      }
    }
  }
  return (
    <div style={{ width: '500px', margin: 'auto' }}>
      <h1>Train</h1>
      <h4 style={{ textAlign: 'center' }}>Stamina / {player.stamina}</h4>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>Strength / {playerBeforeCardsPlayed.strength}</p>
        <button onClick={() => trainCharacter('strength')}>
          Train Strength
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>Attack / {playerBeforeCardsPlayed.attack}</p>
        <button onClick={() => trainCharacter('attack')}>Train Attack</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>Agility / {playerBeforeCardsPlayed.agility}</p>
        <button onClick={() => trainCharacter('agility')}>Train Agility</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>Defence / {playerBeforeCardsPlayed.defence}</p>
        <button onClick={() => trainCharacter('defence')}>Train Defence</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>Magic / {playerBeforeCardsPlayed.magic}</p>
        <button onClick={() => trainCharacter('magic')}>Train Magic</button>
      </div>

      <div>
        {' '}
        <Link to={`/level`}>Next Level</Link>
      </div>
    </div>
  )
}

export default Train
