//2.2
let a: number[] = [1, 2];
let b: string[] = ["i1","12"];
let c = [true,false]; //선언시 초기화 하는 경우 타입을 명시하지 않아도 됨

//타입 선언
type Name = string;
type Player = {
    name: Name,
    age?: number //optional parameter
};

//object타입
const player1 : Player = {
    name: "gm",
}
const player2 : Player = {
    name: "gm2",
    age: 9
}
console.log(player1.age && player1.age < 10);

function playerMaker(name: Name): Player{
    return {
        name: name,
    };
}
const playerMakerArrow = (name: Name): Player => ({name});

const player3 = playerMaker("player3");
player3.age = 222; //playerMaker의 함수반환 타입을 알고 있기 때문에 오류x


