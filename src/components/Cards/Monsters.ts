// overall rating would help figure out the monster toughness

export let monsters = [
  {
    name: 'Goblin',
    attack: 5,
    defence: 5,
    strength: 5,
    agility: 2300,
    abilities: [],
    elements: [], // adding two does no further damage
    magic: 0,
    weapon: 1,
    armour: 1,
    life: 50,
    stamina: 100,
    count: 0,
  },
  {
    name: 'Wolf',
    attack: 5,
    defence: 3,
    strength: 4,
    agility: 1600,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1,
    armour: 1,
    life: 55,
    stamina: 100,
    count: 0,
  },
  {
    name: 'Troll',
    attack: 6,
    defence: 6,
    strength: 7,
    agility: 2500,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1,
    armour: 1,
    life: 60,
    stamina: 70,
    count: 0,
  },
  {
    name: 'Dark Elf',
    attack: 6,
    defence: 5,
    strength: 4,
    agility: 2000,
    weapon: 1.2,
    armour: 1,
    magic: 0,
    abilities: [],
    elements: ['ice'],
    life: 70,
    stamina: 100,
    count: 0,
  },
  {
    name: 'BOSS - Ork Fire Chief',
    attack: 8,
    defence: 9,
    strength: 8,
    agility: 2100,
    abilities: [], // TODO need some abilities here
    elements: ['fire'],
    magic: 0,
    weapon: 1.1,
    armour: 1.1,
    life: 100,
    stamina: 70,
    count: 0,
  },
  {
    name: 'Bear',
    attack: 8,
    defence: 6,
    strength: 8,
    agility: 2000,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1,
    armour: 1,
    life: 65,
    stamina: 100,
    count: 0,
  },

  {
    name: 'Ice Witch',
    attack: 8,
    defence: 7,
    strength: 6,
    agility: 2300,
    abilities: [], // TODO need some magic here, high magic could resist this?
    magic: 0,
    elements: ['ice'],
    weapon: 1.1,
    armour: 1.1,
    life: 80,
    stamina: 80,
    count: 0,
  },
  {
    name: 'Fire Archer',
    attack: 8,
    defence: 6,
    strength: 6,
    agility: 1500,
    abilities: [],
    elements: ['fire'],
    magic: 0,
    weapon: 1.1,
    armour: 1.1,
    life: 80,
    stamina: 80,
    count: 0,
  },
  {
    name: 'Dual wielding Swordsmen',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1300,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'BOSS - Rock thing',
    attack: 10,
    defence: 10,
    strength: 10,
    agility: 2300,
    abilities: [], // TODO cast magic?
    elements: [],
    magic: 0,
    weapon: 1.1,
    armour: 1.5,
    life: 100,
    stamina: 80,
    count: 0,
  },
  {
    name: 'holder 11',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'holder 12',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'holder 13',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'holder 14',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'holder 15 - boss',
    attack: 15,
    defence: 15,
    strength: 15,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 100,
    stamina: 100,
    count: 0,
  },
  {
    name: 'holder 16',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'holder 17',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'holder 18',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'holder 19',
    attack: 10,
    defence: 8,
    strength: 6,
    agility: 1700,
    abilities: [],
    elements: [],
    magic: 0,
    weapon: 1.8,
    armour: 1.8,
    life: 65,
    stamina: 80,
    count: 0,
  },
  {
    name: 'Final boss',
    attack: 20,
    defence: 20,
    strength: 20,
    agility: 1500,
    abilities: [],
    elements: ['fire', 'ice'],
    magic: 0,
    weapon: 2,
    armour: 2,
    life: 100,
    stamina: 100,
    count: 0,
  },
]
