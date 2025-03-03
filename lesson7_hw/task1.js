const numberOfRolls = 4;

function DiceRoll(player, numberOfRolls) {
    this.player = player;
    let random = 0;
    for (i = 0; i < numberOfRolls; i++) {
        random = random + (Math.floor(Math.random()*(6-1+1))+10);
    }
    console.log(`${player} ${random}`);
}

DiceRoll('Vasya');