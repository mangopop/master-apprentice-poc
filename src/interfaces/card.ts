export default interface ICard {
  name: string
  description: string
  attack?: number
  defence?: number
  strength?: number
  agility?: number
  life?: number
  armour?: number
  weapon?: number
  weaponBonus?: number
  stamina?: number
  magic?: number
  disabled: boolean
  init: Function
  type?: string
  element?: string
  damage?: number
  durationDamage?: number
  duration?: number
  rarity?: number
  requirements: {
    [key: string]: number | Boolean
  }
}
