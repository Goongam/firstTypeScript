"use strict";
//DAY 1
//2.2
let a = [1, 2];
let b = ["i1", "12"];
let c = [true, false]; //선언시 초기화 하는 경우 타입을 명시하지 않아도 됨
//object타입
const player1 = {
    name: "gm",
};
const player2 = {
    name: "gm2",
    age: 9
};
console.log(player1.age && player1.age < 10);
function playerMaker(name) {
    return {
        name: name,
    };
}
const playerMakerArrow = (name) => ({ name });
const player3 = playerMaker("player3");
player3.age = 222; //playerMaker의 함수반환 타입을 알고 있기 때문에 오류x
//DAY 2
//2.3
//readonly - 읽기 전용
const readonlyArray = ["aa"];
// readonlyArray.push(""); //error!
//tuple - 다른 타입의 배열, 정해진 길이
const tupleArray = ["string", 123, false];
//any - typescript의 보호장치 제거
const anyType = [1, 2, "3"];
const anyType2 = false;
anyType + anyType2; //에러X
//2.4
//unknown - 아직 type을 모르는경우(api에서 불러올 때 등등)
let unknownType;
if (typeof unknownType === 'number') { //이 scope내에서는 unknownType의 type은 number가 됨
    let b = unknownType + 1;
}
if (typeof unknownType === 'string') { //이 scope내에서는 unknownType의 type은 string이 됨
    let b = unknownType.toUpperCase();
}
//never - 함수가 절대 return되지 않을 때, 정상실행 시 실행되지 않는 타입일 경우
function neverFn(a) {
    if (typeof a === "string") {
        a; //string
    }
    else if (typeof b === "number") {
        a; //number
    }
    else {
        a; //never
    }
    throw new Error("error");
}
//사용
const addFn = (a, b) => ({ result: a + b });
const addFn2 = (a, b, c) => {
    if (typeof b === "string") { //다른 타입인 경우 해당 타입 별로 컨트롤
        return a; //b가 string인 경우만
    }
    if (c)
        return a + b + c; //c가 있는 경우만
    return a + b; //c가 없고 number인 경우만
};
//Generic을 사용하면 이후 받는 param에서도 타입이 지정되어 안전하게 사용 가능
const superPrint = (arr1, b) => {
    if (b)
        return b;
    return arr1[0];
};
//Generic을 사용하면 이후 return 값에서 타입이 지정되어 안전하게 사용가능
const s1 = superPrint([12, 2, 3], "test"); //return 타입 = number
const s2 = superPrint([true, false, true]); //return 타입 = boolean
const s3 = superPrint(["asd", "vb", 12, 34], "test"); //return 타입 = number | string
const s4 = superPrint([true, false]);
//추상화 단계 분리
//1
const user1 = {
    name: "Goongam",
    Info: { a: "정보" },
};
//2
const user2 = {
    name: "zxc",
    Info: { a: '정보' },
};
//3
const user3 = {
    name: "zvvvv",
    Info: { a: "zxc" },
};
//이미 생성된 제네릭 활용
function printAllNumbers(arr) {
}
const funcc = (a, ...b) => b;
console.log(funcc("123", "s", "x"));
//4.0
//Class
class User40 {
    constructor(//필드 자동 생성
    firstName, //class내에서만 접근가능
    lastName, nickname, //상속된 클래스 내에서 접근가능
    age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.age = age;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
class Player40 extends User40 {
    getNickName() {
        return this.nickname; //protected
    }
}
const goongam = new Player40("goon", "gam", "군감", 23);
goongam.getFullName();
class Dict {
    constructor() {
        this.words = {};
    }
    add(word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.def;
        }
    }
    getDef(term) {
        if (this.words[term] === undefined)
            return "찾는단어가 없음";
        return this.words[term];
    }
    modify(term, modifydef) {
        if (this.words[term] !== undefined)
            this.words[term] = modifydef;
    }
}
class Word {
    constructor(term, //readonly로 word.term = "asd" 방지
    def) {
        this.term = term;
        this.def = def;
    }
}
const mydict = new Dict();
mydict.add(new Word("t", "tt"));
console.log(mydict.getDef('t'));
console.log(mydict.getDef('x'));
mydict.modify('t', 'modifyTT');
console.log(mydict.getDef("t"));
const goongam42 = {
    name: "zxc",
    team: "blue",
    health: 10,
};
const User42 = {
    name: "asda"
};
const User421 = {
    name: "xzcc",
};
const carrot = {
    category: "qq",
    name: "vvv",
};
//abstract 클래스와 interaface차이
class UserA43 {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
class PlayerA43 extends UserA43 {
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name) {
        return `HI ${name}, My name is ${this.fullName}`;
    }
}
class PlayerI43 {
    constructor(//1.1.1 구현 할때 constructor로 필드 선언
    firstName, //1.1.2 public만을 사용
    lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name) {
        return `HI ${name}, My name is ${this.fullName}`;
    }
}
class LocalStorage1 {
    constructor() {
        this.storage = {};
    }
    set(key, value) {
        this.storage[key] = value;
    }
    get(key) {
        return this.storage[key];
    }
}
const stringStorage = new LocalStorage1();
stringStorage.set("first", "ccc");
console.log(stringStorage.get("first"));
