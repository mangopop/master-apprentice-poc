// TODO get as much logic in here as possible
function Monster({ monster }) {
  // console.log('render monster')
  return (
    <div>
      <p style={{ fontSize: '40px' }}>👿 {monster.life}</p>
    </div>
  )
}

export default Monster
