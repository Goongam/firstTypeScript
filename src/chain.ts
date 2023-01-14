import crypto from "crypto";

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