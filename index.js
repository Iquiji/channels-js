class UnBufferedChannel {
    constructor(){
        this._writeQueue = []; // To be Written
        this._readQueue = []; // To Br Read
    }
    write(data){
        if (this._readQueue.length == 0){
            let p = new Promise((resolve,reject) => {
                this._writeQueue.push([resolve,data]);
            });
            return p;
        }else{
            let read = this._readQueue.shift();
            read(data);
            return Promise.resolve();
        }
    }
    read(){
        if (this._writeQueue.length == 0){
            let p = new Promise((resolve,reject) => {
                this._readQueue.push(resolve);
            })
            return p;
        }else{
            let [written,data] = this._writeQueue.shift();
            written();
            return Promise.resolve(data);
        }
    }
}
exports.UnBufferedChannel = UnBufferedChannel;
// TODO: BufferedChannel , BoundlessChannel