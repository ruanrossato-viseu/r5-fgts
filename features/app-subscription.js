
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("app-subscription", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("subscription")
    // Usuários com o aplicativo instalado, *Fazer o bot esperar 5 minutos e enviar esta mensagem
    flow.addQuestion("[Subscription]+++Ótimo! Agora, para eu consegui fazer a proposta, preciso que você faça o *cadastro e autorização* no app do FGTS.\
    \nÉ rápido e tenho um passo-a-passo em vídeo para você entender como fazer. Dá uma olhada:\
    \n https://youtu.be/TMi8BnjYNf4 \
    \n\nQuando acabar, me avisa. Deu certo?",
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await flow.gotoThread("subscriptionAgain")
        }
    },
    "inscricao",
    "subscription")

    flow.addQuestion("[Subscription]+++Hmm não entendi. Você conseguiu ver todo o vídeo e fazer o passo a passo para se inscrever no aplicativo?\
    \n Se ainda não, *clica no link aqui* https://youtu.be/TMi8BnjYNf4 \
    \n\n Depois que finalizar, me avisa se deu certo por favor.",
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "inscricao",
    "subscriptionAgain")

        
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulation");
    });

    controller.addDialog(flow);
};