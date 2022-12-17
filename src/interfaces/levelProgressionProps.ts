import ICharacter from '../../src/interfaces/character'

export default interface ILevelProgressionProps {
  level: number
  nextLevelHandler: (params: Function) => void
  player: ICharacter
  playerBeforeCardsPlayed: ICharacter
  setMonsterHandler: (params: ICharacter) => void
}
