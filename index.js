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
    close(){
        
    }
    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                if (this._writeQueue.length != 0) {
                    return Promise.resolve({value: await this.read(), done: false});
                }else{
                    return Promise.resolve({done: true});
              }
            }
        }
    }
}
exports.UnBufferedChannel = UnBufferedChannel;

class BufferedChannel {
    constructor(Bufferlength){
        this.Bufferlength = Bufferlength;
        this._buffer = [];
        this._writeQueue = []; // To be Written
        this._readQueue = []; // To Br Read
    }
    write(data){
        if (this._readQueue.length == 0){
            if (this._buffer.length < this.Bufferlength){
                this._buffer.push(data);
                return Promise.resolve();
            }else{
                let p = new Promise((resolve,reject) => {
                    this._writeQueue.push([resolve,data]);
                });
                return p;
            }
        }else{
            let read = this._readQueue.shift();
            read(data);
            return Promise.resolve();
        }
    }
    read(){
        if(this._buffer.length >= this.Bufferlength && this._writeQueue.length != 0){
            let read_data = this._buffer.shift();
            let [written,write_data] = this._writeQueue.shift();
            this._buffer.push(write_data);
            written();
            return Promise.resolved(read_data);
        }else if(this._buffer.length != 0){
            return Promise.resolve(this._buffer.shift());
        }else{
            let p = new Promise((resolve,reject) => {
                this._readQueue.push(resolve);
            })
            return p;
        }
    }
    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                if (this._buffer.length != 0 || this._writeQueue.length != 0) {
                    return Promise.resolve({value: await this.read(), done: false});
                }else{
                    return Promise.resolve({done: true});
              }
            }
        }
    }
}
exports.BufferedChannel = BufferedChannel;

class BoundlessChannel {
    constructor(){
        this._buffer = [];
        //this._writeQueue = []; // To be Written
        this._readQueue = []; // To Br Read
    }
    write(data){
        if (this._readQueue.length == 0){
            this._buffer.push(data);
            return Promise.resolve();
        }else{
            let read = this._readQueue.shift();
            read(data);
            return Promise.resolve();
        }
    }
    read(){
        if (this._buffer.length != 0){
            return Promise.resolve(this._buffer.shift());
        }else{
            let p = new Promise((resolve,reject) => {
                this._readQueue.push(resolve);
            })
            return p;
        }
    }
    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                if (this._buffer.length != 0 || this._writeQueue.length != 0) {
                    return Promise.resolve({value: await this.read(), done: false});
                }else{
                    return Promise.resolve({done: true});
              }
            }
        }
    }
}
exports.BoundlessChannel = BoundlessChannel;