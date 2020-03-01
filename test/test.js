let channels = require("../index.js");
const assert = require('assert');

let UnBufferedTestChannel = new channels.UnBufferedChannel();
async function test_write(){
    await UnBufferedTestChannel.write("Test_Data");
    await UnBufferedTestChannel.write([0,5,4,2]);
}

async function test_read(){
    assert.strictEqual(await UnBufferedTestChannel.read(),"Test_Data");
    assert.strictEqual(await UnBufferedTestChannel.read(),[0,5,4,2]);
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
}

async function test_read_buffered(){
    assert.strictEqual(await BufferedTestChannel.read(),"Test_Data");
    assert.strictEqual(await BufferedTestChannel.read(),[0,5,4,2]);
}

function test_buffered(){
    test_write_buffered();
    test_read_buffered();
}

test_buffered();