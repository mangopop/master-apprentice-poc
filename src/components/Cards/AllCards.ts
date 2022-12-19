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
    description: 'Increase attack and agility',
    disabled: false,
    type: 'human',
    agility: 300,
    weapon: 1.5, // this is almost same as attack?
    requirements: { strength: 6, magic: 0, weapon: false },
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'Whetstone',
    description: 'Bonus to any sharp weapon',
    disabled: false,
    weaponBonus: 1.2,
    requirements: { strength: 0, magic: 0, weapon: true },
    init: function () {
      this.disabled = true
    },
  },
  {
    name: "Balrog's Sword",
    description: 'increase attack and reduces agility. Requires 15 Strength',
    disabled: false,
    attack: 5,
    element: 'fire',
    weapon: 1.6,
    requirements: { strength: 15, magic: 0, weapon: false },
    init: function () {
      this.disabled = true
    },
  },
  // {
  //   name: 'Axe Of The Dark Mountain',
  //   description: 'increase attack and reduces agility. Requires 20 Strength',
  //   disabled: false,
  //   type: 'dwarf',
  //   attack: 5,
  //   agility: 300,
  //   weapon: 1.6,
  //   requirements: { strength: 20, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'Helmet',
  //   description: 'Increase defence slightly',
  //   disabled: false,
  //   defence: 3,
  //   requirements: { strength: 0, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'Leather Armour',
  //   description: 'Increase defence slightly',
  //   disabled: false,
  //   defence: 3,
  //   requirements: { strength: 0, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'Plate Armour of Lost Kings',
  //   description: 'increase defence and reduces agility. Requires 15 Strength',
  //   disabled: false,
  //   defence: 5,
  //   agility: 300,
  //   requirements: { strength: 10, magic: 0, weapon: false }, // TODO not implemented
  //   type: 'human',
  //   init: function () {
  //     this.disabled = true
  //   },
  // },

  // {
  //   name: 'Fireball',
  //   description:
  //     'Cast a fireball - 5 damage - then burns for 2 for 6 seconds, every 2 seconds',
  //   disabled: false,
  //   damage: 5,
  //   durationDamage: 2, // TODO add to object
  //   duration: 6000,
  //   rarity: 5, // TODO using magic ability now
  //   element: 'fire',
  //   requirements: { strength: 0, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'Immolation',
  //   description: 'Explosion of fire - 30 damage',
  //   disabled: false,
  //   damage: 30,
  //   requirements: { strength: 0, magic: 20, weapon: false },
  //   element: 'fire',
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'Blizzard',
  //   description: 'Summon a Blizzard - 5 damage - freeze for 5 seconds',
  //   disabled: false,
  //   damage: 5,
  //   duration: 2000,
  //   element: 'ice',
  //   requirements: { strength: 0, magic: 5, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'steroids',
  //   description: 'Increase strength by 5',
  //   disabled: false,
  //   strength: 5,
  //   requirements: { strength: 0, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'health potion',
  //   description: 'Add 10 to health',
  //   disabled: false,
  //   life: 10,
  //   requirements: { strength: 0, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'Poison potion',
  //   description: 'Poison for 3 every 3 seconds',
  //   disabled: false,
  //   poison: 5,
  //   requirements: { strength: 0, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'Magic potion',
  //   description: 'Magic boost of 10',
  //   disabled: false,
  //   magic: 10,
  //   requirements: { strength: 0, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
  // {
  //   name: 'Stamina potion',
  //   description: 'Add 20 stamina',
  //   disabled: false,
  //   stamina: 20,
  //   requirements: { strength: 0, magic: 0, weapon: false },
  //   init: function () {
  //     this.disabled = true
  //   },
  // },
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
