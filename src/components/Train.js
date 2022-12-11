//dumb comp
function Train({ train, player, trainingDisabled }) {
  return (
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
  )
}

export default Train
