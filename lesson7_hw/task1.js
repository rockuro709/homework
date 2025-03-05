const numberOfRolls = 4;

class Player {
    constructor(name, sumRolls) {
        this.name = name;
        this.sumRolls = sumRolls;
    }
    rollDices() {
        for (let i = 0; i < numberOfRolls; i++) {
        this.sumRolls = this.sumRolls + Math.floor(Math.random()*6+1);
        console.log(this.sumRolls); //проверка
        }   
        console.log(`${this.name} ${this.sumRolls}`); //проверка
        return this.sumRolls;
    }

}

const Vasya = new Player('Vasya', 0);
Vasya.rollDices();

const Denis = new Player('Denis', 0);
Denis.rollDices();

const Anton = new Player('Anton', 0);
Anton.rollDices();


switch (true) {
    case Vasya.sumRolls === Denis.sumRolls && Vasya.sumRolls === Anton.sumRolls:
        console.log('Суммы бросков игроков равны между собой. Ничья!');
        break;
    case Vasya.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls) && Denis.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls):
        console.log('Вася и Денис - ничья, Антон проиграл!');
        break;
    case Denis.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls) && Anton.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls):
        console.log('Денис и Антон - ничья, Вася проиграл!');
        break;
    case Vasya.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls) && Anton.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls):
        console.log('Вася и Антон - ничья, Денис проиграл!');
        break;
    case Vasya.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls):
        console.log('Вася победил!');
        break;
    case Denis.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls):
        console.log('Денис победил!');
        break;
    case Anton.sumRolls === Math.max(Vasya.sumRolls, Denis.sumRolls, Anton.sumRolls):
        console.log('Антон победил!');
        break;
}