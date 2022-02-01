
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("app-subscription", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("subscription")
    // Usuários com o aplicativo instalado, *Fazer o bot esperar 5 minutos e enviar esta mensagem
    flow.addQuestion("[Subscription]+++Ótimo! Agora, vou precisar que você *autorize o saque-aniversário* dentro do aplicativo FGTS. Faça o cadastro no aplicativo, e depois é só optar pelo saque-aniversário.\
    \n\nÉ bem rápido, tem um passo-a-passo em vídeo caso tenha dúvida. Dá uma olhada:\
    \nhttps://youtu.be/tuXPnjnu33Q \
    \n\nQuando acabar, me avisa. *Deu certo*?\
    \n_Responda *sim*, caso tenha lido, entendido e esteja de acordo_",
    async(response,flow,bot) => {
        if(nlu.checkError(response)) {
            flow.after(async (response, bot) => {
              await bot.cancelAllDialogs();
              await bot.beginDialog("app-install");
            });
          }
        if(nlu.checkAffirmative(response)) {
          await flow.gotoThread("subscriptionFgts")
        }
        else {
            await flow.gotoThread("subscriptionAgain")
        }
    },
    "inscricaoSaqueAniversario",
    "subscription")

    flow.addQuestion("[Subscription]+++Hmm não entendi. Você conseguiu ver todo o vídeo e fazer o passo a passo para *autorizar o saque-aniversário*?\
    \n Se ainda não, *clica no link aqui* https://youtu.be/tuXPnjnu33Q \
    \n\n Depois que finalizar, me avisa se deu certo por favor.\
    \n_Responda *sim*, caso tenha lido, entendido e esteja de acordo_",
    async(response,flow,bot) => {
        if(nlu.checkError(response)) {
          flow.after(async (response, bot) => {
            await bot.cancelAllDialogs();
            await bot.beginDialog("app-install");
          });
        }
        if(nlu.checkAffirmative(response)) {
          await flow.gotoThread("subscriptionFgts")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "inscricaoSaqueAniversario",
    "subscriptionAgain")

    flow.addQuestion("[Subscription]+++Certo! Agora, por favor *autorize o banco escolhido consultar o seu FGTS* dentro do mesmo aplicativo.\
    \n\nSe tiver alguma dúvida, também tem um vídeo com todo o passo-a-passo explicando. Veja o vídeo aqui:\
    \nhttps://youtu.be/B1GFwRNnI9U \
    \n\n*Deu certo*?\
    \n_Responda *sim*, caso tenha lido, entendido e esteja de acordo_",
    async(response,flow,bot) => {
        if(nlu.checkError(response)) {
          await flow.gotoThread("subscription")
        }
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await flow.gotoThread("subscriptionFgtsAgain")
        }
    },
    "inscricaoConsultarFgts",
    "subscriptionFgts")
    
    flow.addQuestion("[Subscription]+++Desculpe, não entendi. Conseguiu ver o vídeo e fazer o passo a passo para *autorizar o banco para consultar seu FGTS*?\
    \n Caso não, *segue o passo-a-passo nesse link aqui*: https://youtu.be/B1GFwRNnI9U \
    \n\n Depois que finalizar, *me avisa se deu certo* por favor.\
    \n_Responda *sim*, caso tenha lido, entendido e esteja de acordo_",
    async(response,flow,bot) => {
        if(nlu.checkError(response)) {
          await flow.gotoThread("subscription")
        }
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "inscricaoConsultarFgts",
    "subscriptionFgtsAgain")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulation");
    });

    controller.addDialog(flow);
};