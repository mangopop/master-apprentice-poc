import ICharacterProps from '../interfaces/characterProps'

function Character({ character, type, monsterLife }: ICharacterProps) {
  // console.log('render monster')
  // TODO add a timeout?
  return (
    <div style={{ margin: '20px', display: 'flex' }}>
      <div
        style={{
          width: '50%',
          textAlign: 'right',
        }}
      >
        <h2>{character.name}</h2>
        <h6 style={{ fontSize: '40px', margin: '10px' }}>
          {type === 'monster' ? <span> 👿 </span> : <span> 😇 </span>}
          {character.life}{' '}
          <span style={{ fontSize: '10px' }}>
            /{' '}
            {type === 'monster' ? (
              <span> {monsterLife} </span>
            ) : (
              <span> 100 </span>
            )}
          </span>
        </h6>
        {character.lastAttack && <span>was {character.lastAttack}</span>}
        {character.critical && <p>CRITICAL!</p>}
      </div>
      <div
        style={{
          width: '50%',
          fontSize: '10px',
          textAlign: 'left',
        }}
      >
        <ul style={{ listStyle: 'none' }}>
          {Object.entries(character).map(([key, value]) => {
            return (
              <li key={key}>
                {key} : {value} /{' '}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Character
