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

console.log(blockchain.getBlock());
