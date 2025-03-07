let allPlayers = [];


class Player {
    constructor(name, numberOfRolls) {
        this.name = name;
        this.numberOfRolls = numberOfRolls;
        this.sumRolls = 0;
        allPlayers.push(this);
    }
    rollDices() {
        for (let i = 0; i < this.numberOfRolls; i++) {
        this.sumRolls = this.sumRolls + Math.floor(Math.random()*6+1);
        console.log(this.sumRolls); //проверка
        }   
        console.log(`${this.name} ${this.sumRolls}`); //проверка
        return this.sumRolls;
    }

}


function game (yourNumberOfRolls) {
    const Vasya = new Player('Vasya', yourNumberOfRolls);
    Vasya.rollDices();

    const Denis = new Player('Denis', yourNumberOfRolls);
    Denis.rollDices();

    const Sveta = new Player('Sveta', yourNumberOfRolls);
    Sveta.rollDices();

    const Anton = new Player('Anton', yourNumberOfRolls);
    Anton.rollDices();

    const Kirill = new Player('Kirill', yourNumberOfRolls);
    Kirill.rollDices();


    const displayWinners = allPlayers.filter((playerForFilter) => 
        playerForFilter.sumRolls === Math.max(...allPlayers.map(playerForMap => playerForMap.sumRolls)));
    
    console.log(displayWinners); //проверка
    
    
    for (let i = 0; i < displayWinners.length; i++) {
        console.log(`Победитель ${displayWinners[i].name} с суммой бросков ${displayWinners[i].sumRolls}`);
        if (displayWinners.length - 1 !== i) {
            console.log(`А также`);
        }
    }
}


game(4);
