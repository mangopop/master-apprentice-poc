import { Dispatch, SetStateAction } from 'react'
import ICard from '../../interfaces/card'
import ICharacter from '../../interfaces/character'

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
  }, 2000) // hardcode new param for interval

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
  requirements: { strength: 0, magic: 0, weapon: 0 }, // weapon number acting as boolean
}

const AllCards = [
  // WEAPONS AND ARMOUR--------------------------------------------------- //
  {
    ...baseProps,
    name: 'Sword of Lost Kings',
    description:
      'Doubles base attack and reduces agility. Requires 15 Strength',
    type: 'human',
    agility: 300,
    weapon: 2,
    requirements: { strength: 20, magic: 0, weapon: 0 }, // weapon number acting as boolean
  },
  {
    ...baseProps,
    name: 'Crown of Lost Kings',
    description:
      'Doubles base defence and reduces agility. Requires 20 Strength',
    type: 'human',
    agility: 300,
    armour: 2,
    requirements: { strength: 20, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Chain Mail of Lost Kings',
    description: 'increase defence and reduces agility. Requires 20 Strength',
    agility: 300,
    armour: 2,
    requirements: { strength: 20, magic: 0, weapon: 0 }, // TODO not implemented
    type: 'human',
  },
  {
    ...baseProps,
    name: 'Axe Of The Dark Mountain',
    description: 'Increase attack and reduces agility. Requires 25 Strength',
    type: 'dwarf',
    attack: 15,
    agility: 500,
    weapon: 1.3,
    requirements: { strength: 25, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Tusked Helmet Of The Dark Mountain',
    description: 'Increase defence and reduces agility. Requires 25 Strength',
    type: 'dwarf',
    agility: 500,
    defence: 15,
    armour: 1.3,
    requirements: { strength: 25, magic: 0, weapon: 0 },
  },
  {
    ...baseProps,
    name: 'Plate Armour Of The Dark Mountain',
    description: 'Increase defence and reduces agility. Requires 25 Strength',
    defence: 15,
    agility: 500,
    armour: 1.3,
    requirements: { strength: 25, magic: 0, weapon: 0 },
    type: 'dwarf',
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
    name: 'Helmet',
    description: 'Increase defence slightly',
    defence: 2,
  },
  {
    ...baseProps,
    name: 'Leather Armour',
    description: 'Increase defence slightly',
    defence: 2, // should this be armour?
  },
  // ABILITIES --------------------------------------------------- //
  {
    ...baseProps,
    name: 'Combo',
    description: 'Attack twice',
    attack: 2,
    duration: 300,
    usedFunctions: ['setPlayerHandler'],
    use: combo,
  },
  // ITEMS --------------------------------------------------- //
  {
    ...baseProps,
    name: 'Whetstone',
    description: 'Bonus to any sharp weapon',
    weaponBonus: 1.5,
  },

  {
    ...baseProps,
    name: 'Magic potion 2',
    description: 'Magic boost of 20',
    magic: 20,
  },
  {
    ...baseProps,
    name: 'steroids',
    description: 'Increase strength by 5',
    strength: 5,
  },
  // MAGIC --------------------------------------------------- //
  {
    ...baseProps,
    name: 'Fireball',
    description:
      'Cast a fireball - 5 damage - then burns for 2 for 6 seconds, every 2 seconds',
    damage: 5,
    durationDamage: 2, // TODO add to object
    duration: 5000,
    elements: ['fire'],
    usedFunctions: ['card', 'setMonsterHandler', 'setSpellTimerHandler'],
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
  // POTIONS --------------------------------------------------- //
  {
    ...baseProps,
    name: 'health potion',
    description: 'Add 10 to health',
    life: 10,
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
  },
  {
    ...baseProps,
    name: 'Stamina potion',
    description: 'Add 20 stamina',
    stamina: 20,
  },
  {
    ...baseProps,
    name: 'Potion of fire immunity',
    description: 'Immune to fire',
    elements: ['fire'], // TODO add to player
    requirements: { strength: 0, magic: 10, weapon: 0 },
    usedFunctions: ['setPlayerHandler'],
    use: immunity,
  },
  {
    ...baseProps,
    name: 'Potion of ice immunity',
    description: 'Immune to ice',
    elements: ['ice'], // TODO add to player
    requirements: { strength: 0, magic: 10, weapon: 0 },
    usedFunctions: ['setPlayerHandler'],
    use: immunity,
  },
]

export default AllCards
