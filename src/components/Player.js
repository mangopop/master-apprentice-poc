// TODO get as much logic in here as possible
function Player({ player }) {
  // console.log('render player')
  return (
    <div style={{ margin: '20px' }}>
      {Object.entries(player).map(([key, value]) => {
        return (
          <span>
            {key} : {value} /{' '}
          </span>
        )
      })}
      <h6 style={{ fontSize: '40px', margin: '10px' }}>
        😇 {player.life} <span style={{ fontSize: '10px' }}>/ 100</span>
      </h6>
      {player.lastAttack && <span>was {player.lastAttack}</span>}
    </div>
  )
}
export default Player
