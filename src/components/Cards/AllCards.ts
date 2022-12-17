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

const AllCards = [
  {
    name: 'Sword of Lost Kings',
    description: 'increase attack and agility',
    disabled: false,
    type: 'human',
    attack: 5,
    agility: 300,
    weapon: 1.4,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: "Balrog's Sword",
    description: 'increase attack and reduces agility',
    disabled: false,
    attack: 5,
    element: 'fire',
    weapon: 1.6,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Axe Of The Dark Mountain',
    description: 'increase attack and reduces agility',
    disabled: false,
    type: 'dwarf',
    attack: 5,
    agility: 300,
    weapon: 1.6,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Helmet',
    description: 'Increase defence slightly',
    disabled: false,
    defence: 3,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Leather Armour',
    description: 'Increase defence slightly',
    disabled: false,
    defence: 3,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Plate Armour of Lost Kings',
    description: 'increase defence and reduces agility',
    disabled: false,
    defence: 5,
    agility: 300,
    type: 'human',
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Whetstone',
    description: 'Bonus to any sharp weapon',
    disabled: false,
    // attack: 5, // TODO not implemented - check for weapon
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Fireball',
    description: 'Cast a fireball - 5 damage - then burns for 2 for 5 seconds',
    disabled: false,
    damage: 5, // TODO not implemented
    duration: 5, // TODO not implemented
    rarity: 5, // TODO not implemented
    element: 'fire',
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Immolation',
    description: 'Explosion of fire - 30 damage',
    disabled: false,
    damage: 30, // TODO not implemented
    rarity: 5, // TODO not implemented
    element: 'fire',
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Blizzard',
    description: 'Summon a Blizzard - 5 damage - freeze for 5 seconds',
    disabled: false,
    damage: 5, // TODO not implemented
    duration: 5, // TODO not implemented
    element: 'ice',
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'steroids',
    description: 'Increase strength by 5',
    disabled: false,
    strength: 5,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'health potion',
    description: 'Add 20 to health',
    disabled: false,
    life: 15,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Poison potion',
    description: 'Poison for 3 every 3 seconds',
    disabled: false,
    poison: 5,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Stamina potion',
    description: 'Add 20 stamina',
    disabled: false,
    stamina: 20,
    init: function () {
      this.disabled = true
    },
  },
  //   {
  //     name: 'fire potion',
  //     disabled: false,
  //     life: function () {
  //       // setPlayerLife((life) => life + 40)
  //     },
  //     init: function () {
  //       this.life()
  //       this.disabled = true
  //     },
  //   },
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
