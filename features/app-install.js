
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("app-install", controller);

    const nlu = require('../scripts/nlu.js');
    // Mensagem inicial, botão instalou ou não aplicativo FGTS
    flow.addAction("app")

    flow.addQuestion("[AppInstall]+++Você já tem o aplicativo oficial do FGTS instalado?",
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


    // Usuários com o aplicativo não instalado
    flow.addMessage("[AppInstall]+++Para instalar, clique em:\
        \n\nAndroid: link\
        \nApple: link\
        \n\nMe chame de novo, quando acabar de instalar", "naoInstalado")
        
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("app-subscription");
    });

    controller.addDialog(flow);
};