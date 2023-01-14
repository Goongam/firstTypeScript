//DAY 1

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


//DAY 2
//2.3

//readonly - 읽기 전용
    const readonlyArray: readonly string[] = ["aa"];
    // readonlyArray.push(""); //error!

//tuple - 다른 타입의 배열, 정해진 길이
    const tupleArray: [string, number, boolean] = ["string", 123, false];

//any - typescript의 보호장치 제거
    const anyType: any[] = [1,2,"3"];
    const anyType2 : any = false;
    anyType + anyType2; //에러X



//2.4

//unknown - 아직 type을 모르는경우(api에서 불러올 때 등등)
    let unknownType: unknown;
    if(typeof unknownType === 'number'){  //이 scope내에서는 unknownType의 type은 number가 됨
        let b = unknownType + 1;
    }

    if(typeof unknownType === 'string'){  //이 scope내에서는 unknownType의 type은 string이 됨
        let b = unknownType.toUpperCase();
    }

//never - 함수가 절대 return되지 않을 때, 정상실행 시 실행되지 않는 타입일 경우
    function neverFn(a: string|number): never{
        if(typeof a === "string"){
            a //string
        }else if(typeof b === "number"){
            a //number
        }else{
            a //never
        }
        throw new Error("error");
    }


//3.0

//call Signatures: 함수에서 type 미리 선언, 실제함수에서 타입 입력x
    //함수의 타입선언1
    type AddFnType = (a:number, b:number) => {result: number};
    //함수의 타입선언2 - 오버로딩시 사용
    type AddFnType2 = {
        (a:number, b:number) : {result: number};
    }
    //사용
    const addFn:AddFnType = (a, b) => ({result: a + b});

    //활용 - 오버로딩
    type AddFnType3 = {
        (a:number, b:number) : number,
        (a:number, b:string) : number, //같은 개수 다른 타입
        (a:number, b:number, c:number): number, //다른 개수
    }

    const addFn2:AddFnType3 = (a, b, c?: number) => { //개수가 다른경우 ?를 사용하고 타입을 지정
        if(typeof b === "string"){ //다른 타입인 경우 해당 타입 별로 컨트롤
            return a; //b가 string인 경우만
        }

        if(c) return a + b + c; //c가 있는 경우만

        return a + b; //c가 없고 number인 경우만
    };




//3.2 다형성
    type SuperPrint = {
        /* 받는 타입이 무엇인지 모를 경우 모든 타입을 오버로딩해야 할때
        (arr: number[]): void,
        (arr: boolean[]): void,
        (arr: string[]): void,
        (arr: (number|boolean)[]): void,
        */
    //    <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder, //Generic을 사용-> 자동으로 받은 타입을 읽어서 TypePlacehold타입을 생성
        // ?을 사용해 optional 사용가능
    <TypePlaceholder, M>(arr: TypePlaceholder[], b?: M): TypePlaceholder | M,
    // (arr: any[]): any
    }

    //Generic을 사용하면 이후 받는 param에서도 타입이 지정되어 안전하게 사용 가능
    const superPrint: SuperPrint = (arr1, b) => {
        if(b) return b;
        return arr1[0];
    }

    //Generic을 사용하면 이후 return 값에서 타입이 지정되어 안전하게 사용가능
    const s1 = superPrint([12,2,3], "test"); //return 타입 = number
    const s2 = superPrint([true, false,true]); //return 타입 = boolean
    const s3 = superPrint(["asd","vb",12,34], "test"); //return 타입 = number | string
    const s4 = superPrint<boolean, string>([true,false]);
    //만약 any[]를 사용하면 return타입도 any가 될 것임


    //object에서 활용
    type User<I> = {
        name: string,
        Info: I,
    };
    type UserInfo = { a: string };
    type UserType = User<UserInfo>;
    
      //추상화 단계 분리
        //1
        const user1: UserType = {
            name: "Goongam",
            Info: { a: "정보"},
        }
        //2
        const user2: User<UserInfo> = {
            name: "zxc",
            Info: {a: '정보'},
        };
        //3
        const user3: User<{a: string}> = {
            name:"zvvvv",
            Info: {a:"zxc"},
        }



    //이미 생성된 제네릭 활용
    function printAllNumbers(arr: Array<number>){

    }





//test- ...문법
    type TestF = <E>(a: string, ...b: E[]) => E[];
    const funcc: TestF = (a, ...b) => b;

    console.log(funcc("123","s", "x"));


//4.0
    //Class
    abstract class User40{
        constructor( //필드 자동 생성
            private firstName: string, //class내에서만 접근가능
            private lastName: string, 
            protected nickname: string, //상속된 클래스 내에서 접근가능
            public age: number, //인스턴스 에서도 접근가능
        ){}

        getFullName(){
            return `${this.firstName} ${this.lastName}`;
        }

        abstract getNickName(): void; //상속받은 클래스에서 직접 구현
    }
    class Player40 extends User40 {
        getNickName(): string {
            return this.nickname; //protected
        }
        
    }

    const goongam = new Player40("goon","gam","군감",23);
    goongam.getFullName();


    //4.1
    type Words = {
        [key:string]: string, //[]: key의 type을 설정
    }

    class Dict{

        //constructor의 인자로 사용하지 않고 데이터 초기화
        private words: Words; 
        constructor(){        
            this.words = {};  
        }

        add(word: Word):void{ //클래스타입: 타입이 클래스의 인스턴스인 경우 사용
            if(this.words[word.term] === undefined) {
                this.words[word.term] = word.def;
            }
        }

        getDef(term: string){
            if(this.words[term] === undefined)
                return "찾는단어가 없음";
            
            return this.words[term];
        }

        modify(term: string, modifydef: string){
            if(this.words[term] !== undefined)
                this.words[term] = modifydef
        }
    }

    class Word{
        constructor(
            public readonly term: string, //readonly로 word.term = "asd" 방지
            public readonly def: string,
        ){}
    }
    
    const mydict = new Dict();
    mydict.add(new Word("t","tt"));
    console.log(mydict.getDef('t'));
    console.log(mydict.getDef('x'));
    mydict.modify('t', 'modifyTT')
    console.log(mydict.getDef("t"));


//DAY4

//특정 value 제한 - 타입 대신 값을 입력
//interface - 오브젝트의 타입을 정할 때 만 사용(type의 하위)
    type Team42 = "red" | "blue" | "yellow";
    type Health42 = 1 | 4 | 10;

    interface Player42 {
        name: "zxc",
        team: Team42,
        health: Health42,
    }

    const goongam42 : Player42 = {
        name: "zxc",
        team: "blue",
        health: 10,
    }

 //1. 상속   
    //interface 상속
    interface Test42 {
        name: string,
    }
    interface Test422 extends Test42{ //interface 상속

    }
    const User42: Test422 = {
        name: "asda"
    };

    //type으로 상속
    type Test421 = {
        name: string,
    }
    type Test4211 = Test421 & { //&키워드 사용

    }
    const User421:Test4211 = {
        name: "xzcc",
    };



 //2. interface 합체
    interface Food42 {  //같은 이름의 interface
        name: string
    }
    interface Food42 {  //같은 이름의 interface
        category: string
    }

    const carrot: Food42 = {    //둘다 구현
        category: "qq",
        name: "vvv",
    }

 //abstract 클래스와 interaface차이
    abstract class UserA43 {
        constructor(
            protected firstName: string,
            protected lastName: string,
        ){}

        abstract sayHi(name: string):string;
        abstract fullName():string;
    }
    class PlayerA43 extends UserA43{
        fullName(): string {
            return `${this.firstName} ${this.lastName}`
        }
        sayHi(name: string): string {
            return `HI ${name}, My name is ${this.fullName}`
        }
    }

    interface UserI43 { //1.1 필드에 constructor를 사용하지 않음
        firstName: string, 
        lastName: string,
        sayHi(name: string):string; //1.2 함수에 abstract를 사용하지 않음
        fullName():string;
    }
    class PlayerI43 implements UserI43{ //2 extends 대신 implements를 사용
        constructor( //1.1.1 구현 할때 constructor로 필드 선언
            public firstName: string,   //1.1.2 public만을 사용
            public lastName: string,    //1.1.2 public만을 사용
        ){}

        fullName(): string {
            return `${this.firstName} ${this.lastName}`
        }
        sayHi(name: string): string {
            return `HI ${name}, My name is ${this.fullName}`
        }
    }
    //3. javascript코드로 변환할 때 interface는 해당 내용을 구현하지 않음(상속받은 클래스에만 내용이 존재)
        // -> 코드가 가벼워짐 


//4.5 활용

    interface Storage1<T> {
        [key:string]: T,
    }
    class LocalStorage1<T>{
        private storage:Storage1<T> = {}
        
        set(key:string, value:T){
            this.storage[key] = value;
        }
        get(key: string):T{
            return this.storage[key]
        }
    }

    const stringStorage = new LocalStorage1<string>();
    stringStorage.set("first","ccc");
    console.log(stringStorage.get("first"));



// import { init, exit } from "./myPackage";
// const ab = init({
//     url: "string",
//     debug: true,
// });
// exit(1);

