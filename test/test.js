let channels = require("../index.js");
const assert = require('assert');

let UnBufferedTestChannel = new channels.UnBufferedChannel();
async function test_write(){
    await UnBufferedTestChannel.write("Test_Data");
    await UnBufferedTestChannel.write([0,5,4,2]);
}

async function test_read(){
    assert.strictEqual(await UnBufferedTestChannel.read(),"Test_data");
    assert.strictEqual(await UnBufferedTestChannel.read(),[0,5,4,2]);
}

function test(){
    test_write();
    test_read();
}