import { Dispatch, SetStateAction } from 'react'
import ICharacter from './character'

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
  weaponBonus?: number // normal item card bonus (whetstone)
  stamina?: number
  magic?: number
  disabled: boolean
  type?: string
  elements: string[]
  damage?: number
  durationDamage?: number
  duration?: number
  rarity?: number
  requirements: {
    [key: string]: number // weapon number acting as boolean
  }
  usedFunctions: string[]
  use: (
    card?: any,
    setPlayerHandler?: any,
    setMonsterHandler?: any,
    stopMonsterTimersHandler?: () => void,
    startMonsterTimersHandler?: () => void,
    setSpellTimer?: Dispatch<SetStateAction<NodeJS.Timer | undefined>>
  ) => void
  // use: (
  //   card?: ICard,
  //   setPlayerHandler?: (params: (params: ICharacter) => void) => void,
  //   setMonsterHandler?: (params: (params: ICharacter) => void) => void,
  //   stopMonsterTimersHandler?: () => void,
  //   startMonsterTimersHandler?: () => void,
  //   setSpellTimer?: Dispatch<SetStateAction<NodeJS.Timer | undefined>>
  // ) => void
  // use: (params: any) => void
}
