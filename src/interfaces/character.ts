// TODO should extend for monster / player
export default interface ICharacter {
  name?: string
  type?: string
  attack: number
  defence: number
  strength: number
  agility: number
  magic: number
  abilities?: string[]
  element?: string[]
  life: number
  armour?: number
  weapon?: number
  stamina: number
  count?: number
  critical?: string
  lastAttack?: string
}
