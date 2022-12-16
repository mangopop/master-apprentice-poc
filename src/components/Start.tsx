import { Link } from 'react-router-dom'

function Start() {
  return (
    <>
      <h1>Master and Apprentice</h1>

      <Link to={`/chooseCard`}>Start Game</Link>
    </>
  )
}

export default Start
