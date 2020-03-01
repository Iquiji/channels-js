# channels-js
A Pure JS implentation of channels with async/await
------
[![Build Status](https://travis-ci.org/Iquiji/channels-js.svg?branch=master)](https://travis-ci.org/Iquiji/channels-js)
![npm](https://img.shields.io/npm/dw/channels-js)

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
