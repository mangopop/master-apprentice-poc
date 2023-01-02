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
      <div>P dam.: {playerStrike}</div>
      <div>M dam.: {monsterStrike}</div>
    </div>
  )
}

export default BattleLog
