// TODO get as much logic in here as possible
function Monster({ monster }) {
  // console.log('render monster')
  // TODO add a timeout?
  return (
    <div>
      <p style={{ fontSize: '40px' }}>
        👿 {monster.life}
        <span> was {monster.lastAttack}</span>
      </p>
    </div>
  )
}

export default Monster
