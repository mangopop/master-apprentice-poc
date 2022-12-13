// TODO this is the same as player, merge
function Monster({ monster }) {
  // console.log('render monster')
  // TODO add a timeout?
  return (
    <div style={{ margin: '20px' }}>
      {Object.entries(monster).map(([key, value]) => {
        return (
          <span>
            {key} : {value} /{' '}
          </span>
        )
      })}
      <h6 style={{ fontSize: '40px', margin: '10px' }}>
        👿 {monster.life} <span style={{ fontSize: '10px' }}>/ 100</span>
      </h6>
      {monster.lastAttack && <span>was {monster.lastAttack}</span>}
      {monster.critical && <p>CRITICAL!</p>}
    </div>
  )
}

export default Monster
