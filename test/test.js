let channels = require("../index.js");
const assert = require('assert');

let UnBufferedTestChannel = new channels.UnBufferedChannel();
async function test_write(){
    await UnBufferedTestChannel.write("Test_Data");
    await UnBufferedTestChannel.write([0,5,4,2]);
}

async function test_read(){
    assert.deepStrictEqual(await UnBufferedTestChannel.read(),"Test_Data");
    assert.deepStrictEqual(await UnBufferedTestChannel.read(),[0,5,4,2]);
}

function test(){
    test_write();
    test_read();
}
test();

let BufferedTestChannel = new channels.BufferedChannel(20);
async function test_write_buffered(){
    await BufferedTestChannel.write("Test_Data");
    await BufferedTestChannel.write([0,5,4,2]);
    for (let i = 100; i > 0; i--) {
        await BufferedTestChannel.write(i);
    }
}

async function test_read_buffered(){
    assert.deepStrictEqual(await BufferedTestChannel.read(),"Test_Data");
    assert.deepStrictEqual(await BufferedTestChannel.read(),[0,5,4,2]);
    for (let i = 100; i > 0; i--) {
        assert.deepStrictEqual(await BufferedTestChannel.read(),i);
    }
}

function test_buffered(){
    test_write_buffered();
    test_read_buffered();
}

test_buffered();

let BufferedChannelIteratorTest = new channels.BufferedChannel(10);
async function test_async_iterator(){
    let times = 0;
    let random = Math.round(Math.random()*1000);
    for (let i = 0; i < random; i++) {
        await BufferedChannelIteratorTest.write(5);
        times++
    }

    for await(data of await BufferedChannelIteratorTest){
        //console.log(data);
        assert.strictEqual(data,5);
    }
    console.log(random,times);
    assert.strictEqual(times,random);
}
test_async_iterator();