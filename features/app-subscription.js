
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("app-subscription", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("subscription")
    flow.addMessage("[IMAGE]+++https://magentowordpresstutorial.com/wp-content/uploads/2020/05/CSharp-Tutorials-Header-min-1280x720-1.jpg","subscription")
    // Usuários com o aplicativo instalado, *Fazer o bot esperar 5 minutos e enviar esta mensagem
    flow.addQuestion("[Subscription]+++Ótimo, dá uma olhadinha na imagem para entender como fazer a inscrição no aplicativo\
    \n\n Deu certo?",
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "inscricao",
    "subscription")


        
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("bank-authorization");
    });

    controller.addDialog(flow);
};