
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("bank-authorization", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("bankAuthorization")
    flow.addMessage("[IMAGE]+++https://magentowordpresstutorial.com/wp-content/uploads/2020/05/CSharp-Tutorials-Header-min-1280x720-1.jpg","bankAuthorization")
    // Pergunta se conseguiu autorizar banco
    flow.addQuestion("[bankAuthorization]+++Estamos quase lá! Agora você precisa autorizar os seguintes bancos a simularem as melhores condições para você. É só seguir o passo-a-passo na imagem\
    \n\n Conseguiu?", 
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "autorizacao",
    "bankAuthorization")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulation");
    });

    controller.addDialog(flow);
};