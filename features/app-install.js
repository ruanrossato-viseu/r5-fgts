
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("app-install", controller);

    const nlu = require('../scripts/nlu.js');
    flow.addAction("app")

    flow.addQuestion("[AppInstall]+++Para iniciarmos é necessário ter o *aplicativo do FGTS* instalado no seu celular. Você já tem instalado o app?",
    async(response, flow, bot) =>{
        response = response.toLowerCase()
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await flow.gotoThread("naoInstalado")
        }
    },
    "aplicativo",
    "app")

    flow.addMessage("[AppInstall]+++Caso você tenha um *celular Android*, acesse sua *Play Store*, localize o *App do FGTS* e instale.\
    \nSe preferir, use o link abaixo:\
    \n_https://play.google.com/store/apps/details?id=br.gov.caixa.fgts.trabalhador_","naoInstalado")

    flow.addMessage("[AppInstall]+++Caso contrário, se for um *iPhone*, acesse sua *App Store*, localize o *App do FGTS* e instale.\
    \nSe preferir, use o link abaixo:\
    \n_https://apps.apple.com/br/app/fgts/id1038441027_","naoInstalado")

    // Usuários com o aplicativo não instalado
    flow.addQuestion("[AppInstall]+++Me avise aqui assim que terminar esse procedimento",
    async(response, flow, bot) =>{
    },
    "aplicativo",
    "naoInstalado")

    // Usuários com o aplicativo não instalado
    flow.addQuestion("[AppInstall]+++Deu certo?",
    async(response, flow, bot) =>{
        response = response.toLowerCase()
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.cancelAllDialogs()
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