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

let spellTimerId: any = null

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
  ...args: [(params: (params: ICharacter) => void) => void]
): void {
  args[0]((player) => {
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
  this: ICard,
  ...args: [
    (params: (params: ICharacter) => void) => void,
    Dispatch<SetStateAction<NodeJS.Timer | undefined>>
  ]
) {
  // TODO check monster resistance
  spellTimerId = setInterval(() => {
    args[0]((monster) => {
      return {
        ...monster,
        life: this.durationDamage
          ? monster.life - this.durationDamage
          : monster.life,
      }
    })
  }, this.duration)

  // TODO needs new param for interval
  args[1](spellTimerId) // we clear this in cardsHand useEffect, using duration

  damage(this, args[0])
}

function blizzard(this: ICard, ...args: [() => void, () => void]) {
  args[0]()
  setTimeout(() => {
    args[1]()
  }, this.duration)
}

function combo(...args: [(params: (params: ICharacter) => void) => void]) {
  let agility = 0
  args[0]((player) => {
    agility = player.agility
    return {
      ...player,
      agility: 500,
    }
  })

  setTimeout(() => {
    args[0]((player) => {
      return {
        ...player,
        agility: agility,
      }
    })
  }, 1500)
}

const baseProps = {
  elements: [],
  disabled: false,
  usedFunctions: [],
  use: function () {},
}

const AllCards = [
  {
    ...baseProps,
    name: 'Combo',
    description: 'Attack twice',
    attack: 2,
    duration: 300,
    requirements: { strength: 0, magic: 0, weapon: 0 }, // weapon number acting as boolean
    usedFunctions: ['setPlayerHandler'],
    use: combo,
  },
  {
    ...baseProps,
    name: 'Sword of Lost Kings',
    description: 'Increase attack and agility',
    attack: 2,
    type: 'human',
    agility: 300,
    weapon: 1.5, // this is almost same as attack?
    requirements: { strength: 15, magic: 0, weapon: 0 }, // weapon number acting as boolean
  },
  {
    ...baseProps,
    name: 'Crown of Lost Kings',
    description: 'Increase defence',
    type: 'human',
    agility: 300,
    defence: 5, // this is almost same as attack?
    requirements: { strength: 15, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Chain Mail of Lost Kings',
    description: 'increase defence and reduces agility. Requires 15 Strength',
    defence: 5,
    agility: 300,
    requirements: { strength: 15, magic: 0, weapon: 0 }, // TODO not implemented
    type: 'human',
  },
  {
    ...baseProps,
    name: 'Axe Of The Dark Mountain',
    description: 'increase attack and reduces agility. Requires 20 Strength',
    type: 'dwarf',
    attack: 7,
    agility: 400,
    weapon: 1.6,
    requirements: { strength: 25, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Tusked Helmet Of The Dark Mountain',
    description: 'Increase defence',
    type: 'dwarf',
    defence: 7, // this is almost same as attack?
    requirements: { strength: 25, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Plate Armour Of The Dark Mountain',
    description: 'increase defence and reduces agility. Requires 15 Strength',
    defence: 7,
    agility: 400,
    requirements: { strength: 25, magic: 0, weapon: 0 }, // TODO not implemented armour
    type: 'dwarf',
  },
  {
    ...baseProps,
    name: 'Whetstone',
    description: 'Bonus to any sharp weapon',
    weaponBonus: 1.2,
    requirements: { strength: 0, magic: 0, weapon: 1 },
  },
  {
    ...baseProps,
    name: "Balrog's Sword",
    description: 'increase attack and accuracy. Requires 20 Strength',
    duration: 2000,
    durationDamage: 2,
    attack: 5, // TODO not used?
    elements: ['fire'],
    weapon: 2,
    requirements: { strength: 20, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Magic potion 2',
    description: 'Magic boost of 20',
    magic: 20,
    requirements: { strength: 0, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Helmet',
    description: 'Increase defence slightly',
    defence: 2,
    requirements: { strength: 0, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Leather Armour',
    description: 'Increase defence slightly',
    defence: 2, // should this be armour?
    requirements: { strength: 0, magic: 0, weapon: 0 },
  },
  {
    name: 'Fireball',
    description:
      'Cast a fireball - 5 damage - then burns for 2 for 6 seconds, every 2 seconds',
    disabled: false,
    damage: 5,
    durationDamage: 2, // TODO add to object
    duration: 5000,
    elements: ['fire'],
    usedFunctions: ['card', 'setMonsterHandler', 'setSpellTimerHandler'],
    requirements: { strength: 0, magic: 0, weapon: 0 },
    use: fireball,
  },
  {
    ...baseProps,
    name: 'Immolation',
    description: 'Explosion of fire - 30 damage',
    damage: 30,
    requirements: { strength: 0, magic: 30, weapon: 0 },
    elements: ['fire'],
    use: damage,
  },
  {
    ...baseProps,
    name: 'Blizzard',
    description: 'Summon a Blizzard - 5 damage - freeze for 5 seconds',
    damage: 5,
    duration: 5000,
    elements: ['ice'],
    requirements: { strength: 0, magic: 15, weapon: 0 },
    // use could call a function, but that function might not have the callbacks?
  },
  {
    ...baseProps,
    name: 'steroids',
    description: 'Increase strength by 5',
    strength: 5,
    requirements: { strength: 0, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'health potion',
    description: 'Add 10 to health',
    life: 10,
    requirements: { strength: 0, magic: 0, weapon: 0 },
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
    ...baseProps,
    name: 'Magic potion',
    description: 'Magic boost of 10',
    magic: 10,
    requirements: { strength: 0, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Stamina potion',
    description: 'Add 20 stamina',
    stamina: 20,
    requirements: { strength: 0, magic: 0, weapon: 0 },
  },
  {
    name: 'Potion of fire immunity',
    description: 'Immune to fire',
    disabled: false,
    elements: ['fire'], // TODO add to player
    requirements: { strength: 0, magic: 0, weapon: 0 },
    usedFunctions: ['setPlayerHandler'],
    use: immunity,
  },
  {
    name: 'Potion of ice immunity',
    description: 'Immune to ice',
    disabled: false,
    elements: ['ice'], // TODO add to player
    requirements: { strength: 0, magic: 0, weapon: 0 },
    usedFunctions: ['setPlayerHandler'],
    use: immunity,
  },
]

export default AllCards
