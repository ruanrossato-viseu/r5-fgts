
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("bank-authorization", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("bankAuthorization")
    flow.addMessage(
        {
            "type":"message",
            "section":"bankAuthorization",
            "body":"",
            "footer":"",
            "header":"",
      
            "buttons":[
                {
                    "text": "",
                    "payload": ""
                },
                {
                    "text": "",
                    "payload": ""
                }
            ],
            
            "media":
                {
                    "contentType": "image",
                    "mediaURL":"https://magentowordpresstutorial.com/wp-content/uploads/2020/05/CSharp-Tutorials-Header-min-1280x720-1.jpg",
                    "mediaID":"",
                    "caption":"",
                    "filename":""
                }
            },"bankAuthorization")
    // Pergunta se conseguiu autorizar banco
    flow.addQuestion(
        {
            "type":"message",
            "section":"bankAuthorization",
            "body":"Estamos quase lá! Agora você precisa *autorizar os bancos Safra e C6* a simularem as melhores condições para você. É só seguir o passo-a-passo na imagem\
            \n\n Conseguiu?", 
            "footer":"",
            "header":"",
      
            "buttons":[
                {
                    "text": "Sim",
                    "payload": "sim"
                },
                {
                    "text": "Não",
                    "payload": "nao"
                }
            ],
            
            "media":
                {
                    "contentType": "image|video|document",
                    "mediaURL":"",
                    "mediaID":"",
                    "caption":"",
                    "filename":""
                }
            },
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("bankAuthorizationAgain")
        }
    },
    "autorizacao",
    "bankAuthorization")


    flow.addMessage(
        {
            "type":"message",
            "section":"bankAuthorization",
            "body":"https://magentowordpresstutorial.com/wp-content/uploads/2020/05/CSharp-Tutorials-Header-min-1280x720-1.jpg",
            "footer":"",
            "header":"",
      
            "buttons":[
                {
                    "text": "",
                    "payload": ""
                },
                {
                    "text": "",
                    "payload": ""
                }
            ],
            
            "media":
                {
                    "contentType": "image|video|document",
                    "mediaURL":"",
                    "mediaID":"",
                    "caption":"",
                    "filename":""
                }
            },"bankAuthorizationAgain")
    // Pergunta se conseguiu autorizar banco
    flow.addQuestion(
        {
            "type":"message",
            "section":"bankAuthorization",
            "body":"Não entendi se você conseguiu. Siga o passo a passo exatamente como está na imagem, fazendo isso você conseguirá ver as melhores *ofertas simuladas no banco C6 e Safra*.\
            \n\n Após finalizar, me informa se você conseguiu:", 
            "footer":"",
            "header":"",
      
            "buttons":[
                {
                    "text": "",
                    "payload": ""
                },
                {
                    "text": "",
                    "payload": ""
                }
            ],
            
            "media":
                {
                    "contentType": "image|video|document",
                    "mediaURL":"",
                    "mediaID":"",
                    "caption":"",
                    "filename":""
                }
            },
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "autorizacao",
    "bankAuthorizationAgain")


    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulation");
    });

    controller.addDialog(flow);
};