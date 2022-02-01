
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("app-install", controller);

    const nlu = require('../scripts/nlu.js');
    flow.addAction("app")

    flow.addQuestion("[AppInstall]+++Para iniciarmos é necessário ter o *aplicativo do FGTS* instalado no seu celular. Você já tem instalado o app?\
    \n\n_Responda *sim*, caso tenha lido, entendido e esteja de acordo_.\
    \n_E se precisar voltar, digite *voltar* em qualquer momento._",
    async(response, flow, bot) =>{
        if(nlu.checkError(response)) {
          flow.after(async (response, bot) => {
            await bot.cancelAllDialogs();
            await bot.beginDialog("intro");
          });
        }
        response = response.toLowerCase()
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await flow.gotoThread("naoInstalado")
        }
    },
    "aplicativo",
    "app")


    // Usuários com o aplicativo não instalado
    flow.addQuestion("[AppInstall]+++Para instalar, clique em:\
        \n\nAndroid: https://play.google.com/store/apps/details?id=br.gov.caixa.fgts.trabalhador\
        \nApple: https://apps.apple.com/br/app/fgts/id1038441027\
        \n\nDepois que finalizar, eu quero saber se você conseguiu instalar. *E ai conseguiu*?\
        \n\n_Responda *sim*, caso tenha lido, entendido e esteja de acordo_.",
    async(response, flow, bot) =>{
        response = response.toLowerCase()
        if(nlu.checkError(response)) {
          await flow.gotoThread("app")
        }
        if(nlu.checkAffirmative(response)) {
       }
       else {
          await bot.beginDialog("agent-transfer")
       }
    },
    "aplicativo",
    "naoInstalado")
    
        
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("app-subscription");
    });

    controller.addDialog(flow);
};