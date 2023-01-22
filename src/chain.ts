import crypto from "crypto";
import { filter, map } from "lodash";



interface BlockShape {
    hash: string,
    preHash: string,
    height: number,
    data: string,
}

class Block implements BlockShape{
    public hash:string
    constructor(
        public readonly preHash: string,
        public readonly height: number,
        public readonly data: string,
    ){
        this.hash = Block.calculateHash(preHash, height, data);
    }

    static calculateHash(preHash:string, height: number, data:string):string{
        const toHash = `${preHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class BlockChain {
    private blocks: Block[]
    constructor(){
        this.blocks = [];
    }

    private getPrevHash(){
        if(this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length -1].hash;
    }
    public addBlock(data:string){
        const newBlock = new Block(this.getPrevHash(), this.blocks.length +1, data);
        this.blocks.push(newBlock);
    }
    public getBlock(){
        return [...this.blocks];
    }
}

const blockchain = new BlockChain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");

// console.log(blockchain.getBlock());



// interface Words{
//     [key:string]: string
// }
// class Word{
//     constructor(
//         public readonly term:string,
//         public readonly def: string,
//     ){}
// }
// class Dict{
//     private words: Words = {};

//     add(newWord: Word){
//         if(this.words[newWord.term]) return console.log("word that already exist");
//         this.words[newWord.term] = newWord.def;
//     }
//     get(term: string){
//         if(!this.words[term]) return "word not found"
//         return this.words[term];
//     }
//     delete(term: string){
//         if(!this.words[term]) return console.log("word not found");
//         delete this.words[term];
//     }
//     update(term:string, newDef:string){
//         if(!this.words[term]) return console.log("word not found");
//         this.words[term] = newDef;
//     }
//     showAll(){
//         Object.keys(this.words).forEach(term => {
//             console.log(`${term}: ${this.words[term]}`);
//         });
//     }
//     count(){
//         return Object.keys(this.words).length;
//     }

// }

// const dict = new Dict();

// dict.add(new Word('A','AA')); 
// dict.add(new Word('B','BB')); 
// dict.add(new Word('C','CC')); 
// console.log(dict.get('A')); 

// dict.update('A','AAAA'); 
// dict.add(new Word('A','AbbA'));
// console.log(dict.get('A'));

// dict.delete('A'); 
// console.log(dict.get('A'));

// dict.showAll(); 

// console.log("count: "+ dict.count());

//LocalStorage API
interface Stroage<T>{
    [key:string]: T
}

abstract class LocalStorageAPI<T>{
    constructor(
        protected storage:Stroage<T> = {}
    ){}
    abstract setItem(key:string, value:T): void;
    abstract getItem(key:string): T;
    abstract clearItem(key:string):void;
    abstract clear():void;
}
class LocalStorage2<T> extends LocalStorageAPI<T>{
    

    setItem(key: string, value: T) {
        this.storage[key] = value;
    }

    getItem(key: string) {
        return this.storage[key];
    }
    clearItem(key: string): void {
        delete this.storage[key];
    }

    clear(): void {
        this.storage = {};
    }

}

const local = new LocalStorage2<string>();
local.setItem('1','vvv');
console.log(local.getItem('1'));
local.clear()
console.log(local.getItem('1'));


//Geolocation API
interface Pos{
    coords: {
        latitude: number,
        longitude: number,
        accuracy: number,
    }
    
}
interface Error{
    code:number,
    message:string
}
interface CurrentCallback{
    (pos: Pos):void
}
interface ErrorCallback{
    (error:Error): void,
}
interface OptionsObj{
    enableHighAccuracy: boolean,
    timeout: number,
    maximumAge: number
}
interface GeolocationAPI{
    getCurrentPosition(currentFn: CurrentCallback, errorFn?:ErrorCallback, optionObjs?:OptionsObj): void;
    watchPosition(currentFn: CurrentCallback, errorFn?:ErrorCallback, optionObjs?:OptionsObj): void;
    clearWatch(id:number):void;
}

class Geolocation2 implements GeolocationAPI{
    getCurrentPosition(currentFn: CurrentCallback, errorFn?: ErrorCallback | undefined, optionObjs?: OptionsObj | undefined): void {
        
    }
    watchPosition(currentFn: CurrentCallback, errorFn?: ErrorCallback | undefined, optionObjs?: OptionsObj | undefined): void {
        
    }
    clearWatch(id: number): void {
        
    }
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
function success(pos: Pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err: Error) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// let id = 1;
// const geolocation = new Geolocation2();
// geolocation.getCurrentPosition(success);
// geolocation.getCurrentPosition(success,error);
// geolocation.getCurrentPosition(success,error,options);
// geolocation.watchPosition(success);
// geolocation.watchPosition(success,error);
// geolocation.watchPosition(success,error,options);
// geolocation.clearWatch(id);

function every(array: any[], predicate: Function) {
    let index = -1
    const length = array == null ? 0 : array.length
  
    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false
      }
    }
    return true
  }

  //리턴타입 gene
  type Fn<T, K> = (value: T, index?: number, array?: T[]) => K

  function test<T, K>(array: T[], fn: Fn<T, K>): K[]{
      let index = 0;
      const result = new Array(10);
      result[index] = fn(array[index]);
      
      return result;
  }
  
  const ttt = test(['1','2','3'], (v)=>{return v});
  
  const aaa = map([1,2,3], (v) => {return v});

  function hasIn(object:Object, key:string): boolean {
    return object != null && key in Object(object)
  }
  
  console.log(hasIn(1, 'a'));