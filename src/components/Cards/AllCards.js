const AllCards = [
  {
    name: 'sword',
    description: 'increase attack and agility',
    disabled: false,
    attack: 5,
    agility: 300,
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
    attack: 5,
    agility: 300,
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
    description: 'increase health',
    life: 50,
    init: function () {
      this.disabled = true
    },
  },
  {
    name: 'poison potion',
    disabled: false,
    poison: 5,
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
