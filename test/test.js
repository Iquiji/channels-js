let channels = require("../index.js");

descripe("Channels",function(){
    let UnBufferedTestChannel = new channels.UnBufferedChannel();
    it("#write",async function(){
        return UnBufferedTestChannel.write("Test");
    });
    it("#read", async function(){
        return UnBufferedTestChannel.read();
    });
});