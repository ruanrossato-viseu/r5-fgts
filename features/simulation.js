const { MongoDbStorage } = require("botbuilder-storage-mongodb");

module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("simulation", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("fgtsSimulation")
   
    flow.before("fgtsSimulation", async(flow,bot)=>{
        if(flow.vars.cpf>0){
            
            await bot.say("[SIMULATION]+++"+cpf)
            await flow.gotoThread("fgtsSimulationConclusion");

        }
    })
    function isNumeric(num){
        return !isNaN(num)
    }

    // flow.before("fgtsSimulation",async(flow,bot)=>{console.log(flow.vars.user)})

    // Solicita CPF
    flow.addQuestion("[fgtsSimulation]+++Para fazer sua simulação, só preciso que escreva o seu *CPF*, por favor",
        async(response,flow,bot) => {
          var cpf = response
          var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if(cpfRegex.test(cpf)) { 
                await bot.say("[SIMULATION]+++"+cpf)
                await flow.gotoThread("fgtsSimulationConclusion");
            }
            else {
                await flow.gotoThread("fgtsSimulationAgain")
            }
        }, 
    "cpf",
    "fgtsSimulation")

    flow.addQuestion("[fgtsSimulation]+++Não consegui compreender. Tente novamente digitar o seu *CPF*, por favor.\
    \n Ex: 123.45.789-01",
        async(response,flow,bot) => {
          //var cpf = response.replaceAll(/\D/g, '')
          var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if(cpfRegex.test(response)) {
                await bot.say("[SIMULATION]+++"+cpf)
                await flow.gotoThread("fgtsSimulationConclusion");
            }
            else {
                await bot.beginDialog("agent-transfer")
            }
        }, 
    "cpf",
    "fgtsSimulationAgain")

    
    flow.addQuestion("[fgtsSimulation]+++Ok, só um minutinho enquanto eu pesquiso as melhores ofertas. Assim que eu acabar, chamo você.",
        async(response,flow,bot) => {
            await flow.gotoThread("repeat")
        }, 
    "cpf",
    "fgtsSimulationConclusion")

    flow.addQuestion("[fgtsSimulation]+++Já estou finalizando a busca, aguarde mais um pouquinho por favor", 
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



