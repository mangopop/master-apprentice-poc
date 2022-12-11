// TODO get as much logic in here as possible
function Player({ player }) {
  // console.log('render player')
  return (
    <div>
      <p style={{ fontSize: '40px' }}>😇 {player.life}</p>
    </div>
  )
}
export default Player
