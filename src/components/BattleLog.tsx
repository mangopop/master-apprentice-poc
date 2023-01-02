function BattleLog({
  playerStrike,
  monsterStrike,
}: {
  playerStrike: number
  monsterStrike: number
}) {
  return (
    <div>
      <h4>BattleLog</h4>
      <div>Player damaged for: {playerStrike}</div>
      <div>Monster damaged for: {monsterStrike}</div>
    </div>
  )
}

export default BattleLog
