
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("app-install", controller);

    const nlu = require('../scripts/nlu.js');
    flow.addAction("app")

    flow.addQuestion({
        "type":"buttons",
        "section":"Subscription",
        "body":"Para iniciarmos é necessário ter o *aplicativo do FGTS* instalado no seu celular. Você já tem instalado o app?",
        "footer":"Clique na opção desejada",
        // "header":"",

        "buttons":[
            {
                // "type":"text",    
                "text": "Sim",
                "payload": "sim"
            },
            {
                // "type":"text", 
                "text": "Não",
                "payload": "nao"
            }
        ],

        // "buttons":[
        //     {
        //         "type": "phoneNumber",
        //         "text": "Call us",
        //         "payload": "+5511123456789"
        //     },
        //     {
        //         "type": "url",
        //         "text": "Visite o website",
        //         "payload": "https://smarte.rs/{{1}}"
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
    async(response, flow, bot) =>{
        response = response.toLowerCase()
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await flow.gotoThread("naoInstalado")
        }
    },
    "aplicativo",
    "app")

    flow.addMessage(
        {
            "type":"message",
            "section":"Subscription",
            "body":"Caso você tenha um *celular Android*, acesse sua *Play Store*, localize o *App do FGTS* e instale.\
            \nSe preferir, use o link abaixo:\
            \n_https://play.google.com/store/apps/details?id=br.gov.caixa.fgts.trabalhador_",
            "footer":"Clique na opção desejada",
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
            "naoInstalado")

    flow.addMessage(
        {
            "type":"message",
            "section":"Subscription",
            "body":"Caso contrário, se for um *iPhone*, acesse sua *App Store*, localize o *App do FGTS* e instale.\
            \nSe preferir, use o link abaixo:\
            \n_https://apps.apple.com/br/app/fgts/id1038441027_",
            "footer":"Clique na opção desejada",
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
            "naoInstalado")

    // Usuários com o aplicativo não instalado
    flow.addQuestion(
        {
            "type":"buttons",
            "section":"Subscription",
            "body":"Me avise aqui assim que terminar esse procedimento",
            "footer":"Clique na opção desejada",
            // "header":"",
    
            "buttons":[
                {
                    "text": "Consegui!",
                    "payload": "sim"
                },
                {
                    "text": "Preciso de ajuda",
                    "payload": "nao"
                }
            ],
            
            // "media":
            //     {
            //         "contentType": "image|video|document",
            //         "mediaURL":"",
            //         "mediaID":"",
            //         "caption":"",
            //         "filename":""
            //     }
            },
    async(response, flow, bot) =>{
        response = response.toLowerCase()
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.cancelAllDialogs()
            await bot.beginDialog("agent-transfer")
        }
    },
    "aplicativo",
    "naoInstalado")


    
        
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("app-subscription");
    });

    controller.addDialog(flow);
};