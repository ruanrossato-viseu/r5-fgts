
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("inicio", controller);
    
    flow.addAction("intro")


    flow.addMessage(
        {
            "type":"message",
            "section":"Introduction",
            "body":"Para garantir sua segurança e privacidade, seguimos as diretrizes da Lei Geral de Proteção de Dados", 
            "footer":"",
            "header":"",
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
                    "intro")

    // flow.addQuestion(
    //     {
    //         "type":"buttons",
    //         "section":"Subscription",
    //         "body":"O que você deseja fazer hoje?",
    //         "footer":"Clique na opção desejada",
    //         // "header":"",
    
    //         "buttons":[
    //             {
    //                 "text": "Consignado",
    //                 "payload": "1"
    //             },
    //             {
    //                 "text": "Adiantamento de FGTS",
    //                 "payload": "2"
    //             },
    //             {
    //                 "text": "Refinanciamento",
    //                 "payload": "3"
    //             }
    //         ]
            
    //         // "media":
    //         //     {
    //         //         "contentType": "image|video|document",
    //         //         "mediaURL":"",
    //         //         "mediaID":"",
    //         //         "caption":"",
    //         //         "filename":""
    //         //     }
    //         },
    //     async(response, flow, bot) =>{
            
    //         if(response=="1"){                        
    //             await bot.cancelAllDialogs();
    //             await bot.beginDialog("consignado");
    //         }
    //         if(response=="2"){                        
    //             await bot.cancelAllDialogs();
    //             await bot.beginDialog("app-install");
    //         }
    //         if(response=="3"){                        
    //             await bot.cancelAllDialogs();
    //             await bot.beginDialog("refin");
    //         }
    // },
    // "intro",
    // "intro")
    

    flow.after(async (response, bot) => {
                
        await bot.cancelAllDialogs();
        await bot.beginDialog("app-install");
    });
    controller.addDialog(flow);
};