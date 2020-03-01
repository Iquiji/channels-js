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
Alternate Way to read until nothing wants to write
-----
channels-js now supports Async Iterators[ for await (... of ...) ]
```js
    let channel = channels.[Any of the 3 Types]();
    
    async function readAllData(){
        for await(data of channel){
            // Do Something with data ...
        }
    }
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
