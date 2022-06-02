
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("agent-transfer", controller);

    flow.addAction("transbordo")
    flow.addMessage(
        {
            "type":"message",
"section":"Subscription",
            "body":"Um de nossos especialistas irá lhe ajudar em alguns instantes. É só esperar um pouquinho",
            // "footer":"",
            // "header":"",
      
            // "buttons":[
            //     {
            //         "text": "",
            //         "payload": ""
            //     },
            //     {
            //         "text": "",
            //         "payload": ""
            //     }
            // ],
            
            // "media":
            //     {
            //         "contentType": "image|video|document",
            //         "mediaURL":"",
            //         "mediaID":"",
            //         "caption":"",
            //         "filename":""
            //     }
            },
                    "transbordo")
                    
    flow.after(async (results, bot) => {
        await bot.cancelAllDialogs();
    });
    controller.addDialog(flow);
};