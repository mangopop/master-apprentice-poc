import ICharacterProps from '../interfaces/characterProps'

function Character({ character, type, monsterLife }: ICharacterProps) {
  // console.log('render monster')
  // TODO add a timeout?
  return (
    <div style={{ margin: '20px' }}>
      {Object.entries(character).map(([key, value]) => {
        return (
          <span key={key}>
            {key} : {value} /{' '}
          </span>
        )
      })}
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
  )
}

export default Character
