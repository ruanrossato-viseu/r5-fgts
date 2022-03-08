const { MongoDbStorage } = require("botbuilder-storage-mongodb");

module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("simulationAtivo", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("fgtsSimulation")
   

    function isNumeric(num){
        return !isNaN(num)
    }

    // flow.before("fgtsSimulation",async(flow,bot)=>{console.log(flow.vars.user)})

    // Solicita CPF
    flow.addQuestion("[fgtsSimulation]+++Para iniciarmos sua simulação, digite o seu *CPF*, por favor",
        async(response,flow,bot) => {
          var cpf = response
          var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if(cpfRegex.test(cpf)) { 
                await bot.say("[SIMULATION]+++"+cpf)
            }
            else {
                await flow.gotoThread("intro")
            }
        }, 
    "cpf",
    "fgtsSimulation")

    
    flow.addQuestion("[fgtsSimulation]+++Ok, só um minutinho enquanto eu valido seus dados.",
        async(response,flow,bot) => {
            await flow.gotoThread("repeat")
        }, 
    "cpf",
    "fgtsSimulation")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
    });

    controller.addDialog(flow);
};


