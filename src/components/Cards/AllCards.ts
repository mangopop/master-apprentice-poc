import { Dispatch, SetStateAction } from 'react'
import ICard from '../../interfaces/card'
import ICharacter from '../../interfaces/character'
// const Card = {
//   name: '',
//   armour: 0,
//   defence: 0,
//   strength: 0,
//   stamina: 0,
// }
// class Card {
//   name: string
//   description: string
//   weapon?: number
//   attack?: number
//   armour?: number
//   defence?: number
//   strength?: number
//   disabled?: boolean
//   agility?: number
//   stamina?: number
//   type?: string
//   element?: string

//   constructor(
//     name: string,
//     description: string,
//     type?: string,
//     element?: string,
//     attack = 0,
//     defence = 0,
//     strength = 0,
//     weapon = 0,
//     armour = 0,
//     agility = 0,
//     stamina = 0,
//     disabled = false
//   ) {
//     this.name = name
//     this.description = description
//     this.type = type
//     this.element = element
//     this.attack = attack
//     this.defence = defence
//     this.strength = strength
//     this.disabled = disabled
//     this.agility = agility
//     this.stamina = stamina
//     this.armour = armour
//     this.weapon = weapon
//   }
//   init() {
//     this.disabled = true
//   }
// }

// function CardObj(
//   this: any,
//   name: string,
//   armour?: number,
//   defence?: number,
//   strength?: number
// ) {
//   this.name = name
//   this.armour = armour
//   this.defence = defence
//   this.strength = strength
// }

// new CardObj('Sword of Lost Kings')

// new Card(
//   'Sword of Lost Kings',
//   'increase attack and agility',
//   'human',
//   '',
//   5,
//   0,
//   0,
//   1.4,
//   0,
//   300
// )

// TODO try and use a pattern like strategy or command?

let spellTimerId

function damage(
  card: ICard,
  setMonsterHandler: (params: (params: ICharacter) => void) => void
) {
  setMonsterHandler((monster) => {
    return {
      ...monster,
      life: card.damage ? monster.life - card.damage : monster.life,
    }
  })
}

function immunity(
  card: ICard,
  setPlayerHandler: (params: (params: ICharacter) => void) => void,
  setMonsterHandler: (params: (params: ICharacter) => void) => void,
  stopMonsterTimersHandler: Function,
  startMonsterTimersHandler: Function,
  setSpellTimer: Dispatch<SetStateAction<NodeJS.Timer | undefined>>
): void {
  setPlayerHandler((player) => {
    let elements = player.elements.includes('fire')
      ? player.elements
      : [...player.elements, 'fire']

    return {
      ...player,
      elements: elements,
    }
  })
}

function fireball(
  card: ICard,
  setPlayerHandler: (params: (params: ICharacter) => void) => void,
  setMonsterHandler: (params: (params: ICharacter) => void) => void,
  stopMonsterTimersHandler: Function,
  startMonsterTimersHandler: Function,
  setSpellTimer: Dispatch<SetStateAction<NodeJS.Timer | undefined>>
): void {
  // TODO check monster resistance
  spellTimerId = setInterval(() => {
    setMonsterHandler((monster) => {
      return {
        ...monster,
        life: card.durationDamage
          ? monster.life - card.durationDamage
          : monster.life,
      }
    })
  }, card.duration)

  setSpellTimer(spellTimerId)

  damage(card, setMonsterHandler)
}

function blizzard(
  this: {
    duration: number
  },
  card: ICard,
  setMonsterHandler: Function,
  stopMonsterTimersHandler: Function,
  startMonsterTimersHandler: Function,
  setSpellTimer: Function
) {
  stopMonsterTimersHandler()
  setTimeout(() => {
    startMonsterTimersHandler()
  }, this.duration)
}

const AllCards = [
  {
    name: 'Sword of Lost Kings',
    description: 'Increase attack and agility',
    disabled: false,
    attack: 2,
    type: 'human',
    agility: 300,
    elements: [],
    weapon: 1.5, // this is almost same as attack?
    requirements: { strength: 15, magic: 0, weapon: 0 }, // weapon number acting as boolean
    use: function () {},
  },
  {
    name: 'Crown of Lost Kings',
    description: 'Increase defence',
    disabled: false,
    type: 'human',
    agility: 300,
    defence: 5, // this is almost same as attack?
    requirements: { strength: 15, magic: 0, weapon: 0 },
    elements: [],
    use: function () {},
  },
  {
    name: 'Chain Mail of Lost Kings',
    description: 'increase defence and reduces agility. Requires 15 Strength',
    disabled: false,
    defence: 5,
    agility: 300,
    requirements: { strength: 15, magic: 0, weapon: 0 }, // TODO not implemented
    type: 'human',
    elements: [],
    use: function () {},
  },
  {
    name: 'Axe Of The Dark Mountain',
    description: 'increase attack and reduces agility. Requires 20 Strength',
    disabled: false,
    type: 'dwarf',
    attack: 7,
    agility: 400,
    weapon: 1.6,
    elements: [],
    requirements: { strength: 25, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'Tusked Helmet Of The Dark Mountain',
    description: 'Increase defence',
    disabled: false,
    type: 'dwarf',
    elements: [],
    defence: 7, // this is almost same as attack?
    requirements: { strength: 25, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'Plate Armour Of The Dark Mountain',
    description: 'increase defence and reduces agility. Requires 15 Strength',
    disabled: false,
    defence: 7,
    agility: 400,
    elements: [],
    requirements: { strength: 25, magic: 0, weapon: 0 }, // TODO not implemented armour
    type: 'dwarf',
    use: function () {},
  },
  {
    name: 'Whetstone',
    description: 'Bonus to any sharp weapon',
    disabled: false,
    weaponBonus: 1.2,
    elements: [],
    requirements: { strength: 0, magic: 0, weapon: 1 },
    use: function () {},
  },
  {
    name: "Balrog's Sword",
    description: 'increase attack and accuracy. Requires 20 Strength',
    disabled: false,
    duration: 2000,
    durationDamage: 2,
    attack: 5, // TODO not used?
    elements: ['fire'],
    weapon: 2,
    requirements: { strength: 20, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'Magic potion 2',
    description: 'Magic boost of 20',
    disabled: false,
    magic: 20,
    elements: [],
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'Helmet',
    description: 'Increase defence slightly',
    disabled: false,
    defence: 2,
    elements: [],
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'Leather Armour',
    description: 'Increase defence slightly',
    disabled: false,
    defence: 2, // should this be armour?
    elements: [],
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'Fireball',
    description:
      'Cast a fireball - 5 damage - then burns for 2 for 6 seconds, every 2 seconds',
    disabled: false,
    damage: 5,
    durationDamage: 2, // TODO add to object
    duration: 6000,
    elements: ['fire'],
    requirements: { strength: 0, magic: 15, weapon: 0 },
    use: fireball,
  },
  {
    name: 'Immolation',
    description: 'Explosion of fire - 30 damage',
    disabled: false,
    damage: 30,
    requirements: { strength: 0, magic: 30, weapon: 0 },
    elements: ['fire'],
    use: damage,
  },
  {
    name: 'Blizzard',
    description: 'Summon a Blizzard - 5 damage - freeze for 5 seconds',
    disabled: false,
    damage: 5,
    duration: 5000,
    elements: ['ice'],
    requirements: { strength: 0, magic: 15, weapon: 0 },
    // use could call a function, but that function might not have the callbacks?
    use: function () {},
  },
  {
    name: 'steroids',
    description: 'Increase strength by 5',
    disabled: false,
    strength: 5,
    elements: [],
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'health potion',
    description: 'Add 10 to health',
    disabled: false,
    life: 10,
    elements: [],
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: function () {},
  },
  // {
  //   name: 'Poison potion',
  //   description: 'Poison for 3 every 3 seconds',
  //   disabled: false,
  //   damage: 5,
  //   duration: 2000,
  //   element: 'poison',
  //   requirements: { strength: 0, magic: 0, weapon: 0 },
  // },
  {
    name: 'Magic potion',
    description: 'Magic boost of 10',
    disabled: false,
    magic: 10,
    elements: [],
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'Stamina potion',
    description: 'Add 20 stamina',
    disabled: false,
    stamina: 20,
    elements: [],
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: function () {},
  },
  {
    name: 'Potion of fire immunity',
    description: 'Immune to fire',
    disabled: false,
    elements: ['fire'], // TODO add to player
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: immunity,
  },
  {
    name: 'Potion of ice immunity',
    description: 'Immune to fire',
    disabled: false,
    elements: ['ice'], // TODO add to player
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: immunity,
  },
  // {
  //   name: 'fire potion',
  //   disabled: false,
  // },
  //   {
  //     name: 'Angelina Jolie',
  //     life: function () {
  //       // setPlayerLife((life) => life + 40)
  //     },
  //     init: function () {
  //       this.life()
  //     },
  //   },
]

export default AllCards
