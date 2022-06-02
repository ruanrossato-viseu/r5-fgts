const { MongoDbStorage } = require("botbuilder-storage-mongodb");

module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("simulationError", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("fgtsSimulation")
   

    function isNumeric(num){
        return !isNaN(num)
    }

    // flow.before("fgtsSimulation",async(flow,bot)=>{console.log(flow.vars.user)})

    // Solicita CPF
    flow.addQuestion(
        {
            "type":"message",
"section":"Subscription",
            "body":"[fgtsSimulation]+++Se quiser tentar novamente, me passe seu *CPF completo*",
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
          var cpf = response
          var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if(cpfRegex.test(cpf)) { 
                await bot.say("[SIMULATION]+++"+cpf)
            }
            else {
                await flow.gotoThread("fgtsSimulationAgain")
            }
        }, 
    "cpf",
    "fgtsSimulation")

    flow.addQuestion(
        {
            "type":"message",
"section":"Subscription",
            "body":"[fgtsSimulation]+++Não consegui compreender. Tente novamente digitar o seu *CPF*, por favor.\
            \n Ex: 123.45.789-01",
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
          //var cpf = response.replaceAll(/\D/g, '')
          var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if(cpfRegex.test(response)) {
                await bot.say("[SIMULATION]+++"+cpf)
            }
            else {
                await bot.beginDialog("agent-transfer")
            }
        }, 
    "cpf",
    "fgtsSimulationAgain")

    
    flow.addQuestion(
        {
            "type":"message",
"section":"Subscription",
            "body":"[fgtsSimulation]+++Ok, vou analisar as propostas para esse CPF. Assim que eu acabar, chamo você.",
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
            await flow.gotoThread("repeat")
        }, 
    "cpf",
    "fgtsSimulation")

    flow.addQuestion(
        {
            "type":"message",
"section":"Subscription",
            "body":"[fgtsSimulation]+++Já estou finalizando a busca, aguarde mais um pouquinho por favor", 
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
            await flow.repeat()
        }, 
    "cpf",
    "repeat")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
    });

    controller.addDialog(flow);
};



