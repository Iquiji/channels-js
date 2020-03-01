# channels-js
A Pure JS implentation of channels with async/await
------
[![Build Status](https://travis-ci.org/Iquiji/channels-js.svg?branch=master)](https://travis-ci.org/Iquiji/channels-js)
![npm](https://img.shields.io/npm/dw/channels-js)
![npm bundle size](https://img.shields.io/bundlephobia/min/channels-js)
![NPM](https://img.shields.io/npm/l/channels-js)

Types
------
```js 
	* UnBufferedChannel()
	* BufferedChannel(Buffersize) // Needs Buffersize in constructor
	* BoundlessChannel() // Unlimited Buffersize | never blocks write
```

Usage
------
```js
    let channels = reqiure("channels-js");
    
    let UnBufferedChannel = new channels.UnBufferedChannel();
    
    async fucntion write(){
        await UnBufferedChannel.write(data);
    }
    async function read(){
        let data = await UnBufferedChannel.read();
        //Do Something with Data...
    }
    write();
    read();
```

More Examples
------
```js
    let channels = reqiure("channels-js");
    
    let BufferedChannel = new channels.BufferedChannel(10);
    
    async function write(){
        while(true){
            await BufferedChannel.write(data); // Blocks only after internal Buffer is fulf
        }
    }
    async function read(){
        let data = await UnBufferedChannel.read();
        //Do Something with Data...
    }
    write();
    read();
```
