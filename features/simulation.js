
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("simulation", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("fgtsSimulation")
   

    function isNumeric(num){
        return !isNaN(num)
      }

    flow.before("fgtsSimulation",async(flow,bot)=>{console.log(flow.vars.user)})

    // Solicita CPF
    flow.addQuestion("[fgtsSimulation]+++Para fazer sua simulação, só preciso que escreva o seu CPF, por favor",
        async(response,flow,bot) => {
            if(isNumeric(response) && response.length == 11) {
                await bot.say("[teste]+++teste")
                await bot.say["[SIMULATION]+++"+response]
            }
            else {
                await bot.beginDialog("agent-transfer")
            }
        }, 
    "cpf",
    "fgtsSimulation")

    // Exibe condições
    flow.addQuestion("[fgtsSimulation]+++Consegui as seguintes condições:\
                    \n\n[1] Banco Alfa:\
                    \n - Valor: R$ 1.000,00\
                    \n - Parcelas adiantadas: 10 \
                    \n\n[2] Banco Beta:\
                    \n - Valor: R$ 1.800,00\
                    \n - Parcelas adiantadas: 14 \
                    \n\n[3] Banco Gama:\
                    \n - Valor: R$ 500,00\
                    \n - Parcelas adiantadas: 8\
                    \n\nQual delas quer contratar?",
                    async(response,flow,bot) => {
                        if(true|| response == "Safra" || response == "C6") {
                        }
                        else {
                            await flow.gotoThread("especialista")
                        }
                    }, 
                    "bancoEscolhido",
                    "fgtsSimulation") 


    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("signUp");
    });

    controller.addDialog(flow);
};