const AllCards = [
  {
    name: 'sword of kings',
    description: 'increase attack and agility',
    disabled: false,
    folklore: 'human',
    attack: 5,
    agility: 300,
    weapon: 1.4,
    // attack: function () {
    //   setPlayer((player) => {
    //     return { ...player, ...(player.attack + 5) }
    //   })
    // },
    init: function () {
      //   this.attack()
      this.disabled = true
    },
  },
  {
    name: 'axe',
    description: 'increase attack and reduces agility',
    disabled: false,
    folklore: 'dwarf',
    attack: 5,
    agility: 300,
    weapon: 1.6,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'plate',
    description: 'increase defence and reduces agility',
    disabled: false,
    defence: 5,
    agility: 300,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'steroids',
    description: 'increase strength',
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
    name: 'poison potion',
    description: 'Poison for 3 every 3 seconds',
    disabled: false,
    poison: 5,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'stamina potion',
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
