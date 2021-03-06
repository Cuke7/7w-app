export const state = () => ({
  // General data
  players: [
    {
      nom: "Thomas",
      abbr: "Th",
      pic_url: "thomas.jpg",
      merveille: "",
      points: [],
      score: 0,
      index: 0,
    },
    {
      nom: "Louis",
      abbr: "Lo",
      pic_url: "louis.jpg",
      merveille: "",
      points: [],
      score: 0,
      index: 1,
    },
    {
      nom: "Mélanie",
      abbr: "Ml",
      pic_url: "melanie.jpg",
      merveille: "",
      points: [],
      score: 0,
      index: 2,
    },
    {
      nom: "Benjamin",
      abbr: "Be",
      pic_url: "benjamin.jpg",
      merveille: "",
      points: [],
      score: 0,
      index: 3,
    },
    {
      nom: "Jean",
      abbr: "Je",
      pic_url: "jean.jpg",
      merveille: "",
      points: [],
      score: 0,
      index: 4,
    },
    {
      nom: "Martin",
      abbr: "Mt",
      pic_url: "martin.jpg",
      merveille: "",
      points: [],
      score: 0,
      index: 5,
    },
    {
      nom: "Clotilde",
      abbr: "Cl",
      pic_url: "clotilde.jpg",
      merveille: "",
      points: [],
      score: 0,
      index: 6,
    },
    {
      nom: "Marie",
      abbr: "Mr",
      pic_url: "marie.jpg",
      merveille: "",
      points: [],
      score: 0,
      index: 7,
    },
  ],
  merveilles: [
    "Babylone",
    "Olympia",
    "Gizah",
    "Rhódos",
    "Halikarnassós",
    "Ephesos",
    "Alexandria",
  ],
  categories_clean: [
    "merveilles",
    "or",
    "guerre",
    "cartes bleues",
    "cartes jaunes",
    "science",
    "guildes",
  ],
  categories: [],
  guestsNumbers: 0,
  // Game data
  game: {
    players: [],
    armadaSwitch: false,
    citiesSwitch: false,
    indexPlayer: 0,
    indexPoints: 0,
  },
});

export const mutations = {
  updateArmadaSwitch(state, value) {
    state.game.armadaSwitch = value;
  },
  updateCitiesSwitch(state, value) {
    state.game.citiesSwitch = value;
  },
  updateGame(state, game) {
    state.game = game;
  },
  updateIndexPlayer(state, index) {
    state.game.indexPlayer = index;
  },
  updateIndexPoints(state, index) {
    state.game.indexPoints = index;
  },
  updateGamePlayers(state, players) {
    let categories = [...state.categories_clean];

    if (state.game.citiesSwitch) {
      categories.push("noirs");
    }

    if (state.game.armadaSwitch) {
      categories.push("guerre maritime");
      categories.push("îles");
    }

    state.categories = categories;

    let merveilles_clean = [...state.merveilles];

    if (state.game.citiesSwitch) {
      merveilles_clean.push("Petra");
      merveilles_clean.push("Bizantium");
    }

    if (state.game.armadaSwitch) {
      merveilles_clean.push("Syracusse");
    }

    let merveilles = shuffle(merveilles_clean);
    let shuffledPlayers = shuffle(players);

    for (let i = 0; i < shuffledPlayers.length; i++) {
      shuffledPlayers[i].merveille = merveilles[i];
    }

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    state.game.players = shuffledPlayers;
  },
  resetPlayers(state, value) {
    state.game.players = [];
  },
  addPoints(state, point) {
    state.game.players[point.indexPlayer].points.push(point);
    state.game.players[point.indexPlayer].score = 0;
    for (const point of state.game.players[point.indexPlayer].points) {
      state.game.players[point.indexPlayer].score += Number(point.value);
    }
  },
  modifyPoints(state, data) {
    state.game.players[data.indexPlayer].points[data.indexPoints].value =
      data.newVal;
    state.game.players[data.indexPlayer].score = 0;
    for (const point of state.game.players[data.indexPlayer].points) {
      state.game.players[data.indexPlayer].score += Number(point.value);
    }
  },

  resetScores(state) {
    for (let player of state.game.players) {
      player.points = [];
      player.score = 0;
    }
    state.game.indexPlayer = 0;
    state.game.indexPoints = 0;
  },
};
