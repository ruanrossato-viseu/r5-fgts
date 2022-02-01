
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("bank-authorization", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("bankAuthorization")
    flow.addMessage("[IMAGE]+++https://magentowordpresstutorial.com/wp-content/uploads/2020/05/CSharp-Tutorials-Header-min-1280x720-1.jpg","bankAuthorization")
    // Pergunta se conseguiu autorizar banco
    flow.addQuestion("[bankAuthorization]+++Estamos quase lá! Agora você precisa *autorizar os bancos Safra e C6* a simularem as melhores condições para você. É só seguir o passo-a-passo na imagem\
    \n\n *Conseguiu*?\
    \n_Responda *sim*, caso tenha lido, entendido e esteja de acordo_", 
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("bankAuthorizationAgain")
        }
    },
    "autorizacao",
    "bankAuthorization")


    flow.addMessage("[IMAGE]+++https://magentowordpresstutorial.com/wp-content/uploads/2020/05/CSharp-Tutorials-Header-min-1280x720-1.jpg","bankAuthorizationAgain")
    // Pergunta se conseguiu autorizar banco
    flow.addQuestion("[bankAuthorization]+++Não entendi se você conseguiu. Siga o passo a passo exatamente como está na imagem, fazendo isso você conseguirá ver as melhores *ofertas simuladas no banco C6 e Safra*.\
    \n\n Após finalizar, *me informa se você conseguiu*.\
    \n_Responda *sim*, caso tenha lido, entendido e esteja de acordo_", 
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