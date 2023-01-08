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
   <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder, //Generic을 사용-> 자동으로 받은 타입을 읽어서 TypePlacehold타입을 생성
    // (arr: any[]): any
}

//Generic을 사용하면 이후 받는 param에서도 타입이 지정되어 안전하게 사용 가능
const superPrint: SuperPrint = (arr) => {
    return arr[0];
}
//Generic을 사용하면 이후 return 값에서 타입이 지정되어 안전하게 사용가능
const s1 = superPrint([12,2,3]); //return 타입 = number
const s2 = superPrint([true, false,true]); //return 타입 = boolean
const s3 = superPrint(["asd","vb",12,34]); //return 타입 = number | string
//만약 any[]를 사용하면 return타입도 any가 될 것임