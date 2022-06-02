const { MongoDbStorage } = require("botbuilder-storage-mongodb");

module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("simulation", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("fgtsSimulation")
   
    flow.before("fgtsSimulation", async(flow,bot)=>{
        if(flow.vars.cpf>0){
            
            // await bot.say("[SIMULATION]+++"+cpf)
            await flow.gotoThread("fgtsSimulationConclusion");

        }
    })
    function isNumeric(num){
        return !isNaN(num)
    }

    // flow.before("fgtsSimulation",async(flow,bot)=>{console.log(flow.vars.user)})

    // Solicita CPF
    flow.addQuestion(
        {
            "type":"message",
            "section":"fgtsSimulation",
            "body":"Para fazer sua simulação, só preciso que escreva o seu *CPF*, por favor",
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
        async(response,flow,bot) => {
          var cpf = response
          var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if(cpfRegex.test(cpf)) { 
                // await bot.say("[SIMULATION]+++"+cpf)
                await flow.gotoThread("fgtsSimulationConclusion");
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
            "section":"fgtsSimulation",
            "body":"Não consegui compreender. Tente novamente digitar o seu *CPF*, por favor.\
            \n Ex: 123.45.789-01",
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
        async(response,flow,bot) => {
            var cpf = response
            var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if(cpfRegex.test(response)) {
                // await bot.say("[SIMULATION]+++"+cpf)
                await flow.gotoThread("fgtsSimulationConclusion");
            }
            else {
                await bot.beginDialog("agent-transfer")
            }
        }, 
    "cpf",
    "fgtsSimulationAgain")

    
    flow.addMessage(
        {
            "type":"message",
            "section":"fgtsSimulation",
            "body":"Ok, só um minutinho enquanto eu pesquiso as melhores ofertas. Assim que eu acabar, chamo você.",
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
            },"fgtsSimulationConclusion")
        
    flow.addMessage({"type":"delay"},"fgtsSimulationConclusion")

  

  
    flow.addQuestion({"type":"buttons",
                      "section":"fgtsSimulation",
                      "body":"Consegui as seguintes condições para você:\
                      \nVocê receberá: R$ 20.434,17\
                      \nParcelas adiantadas: 6\
                      \nTaxa de juros: 2.04%",
                      "footer":"O que achou dessa proposta?",
                      // "header":"",
  
                      "buttons":[
                          {
                              "text": "Quero contratar!",
                              "payload": "sim"
                          },
                          {
                              "text": "Agora não",
                              "payload": "nao"
                          }
                      ],
                      
                 
                      },
    async(response,flow,bot) => {
      if(response=="sim"){
        await bot.cancelAllDialogs();
        await bot.beginDialog("signUp");
      }
      else{
        await bot.say({"type":"message",
                        "section":"fgtsSimulation",
                        "body":"Ok, se quiser simular novamente, é só chamar",
                        } 
        );
      }

    }, 
    "simulationChoice", 
    "fgtsSimulationConclusion")
  
    
    flow.after(async (response, bot) => {
            await bot.cancelAllDialogs();
        }
    )
    controller.addDialog(flow);
};



