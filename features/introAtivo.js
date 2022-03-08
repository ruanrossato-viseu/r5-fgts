module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("introAtivo", controller);
    const nlu = require('../scripts/nlu.js');
    
    flow.addAction("ativo")

    flow.addMessage("[ATIVO]+++Olá, sou a Raya, assistente virtual da R5 Digital! Para saber mais sobre o adiantamento sobre o saque do FGTS retido diga: *Oi*.\
    \n\n_*Se você contratar agora, em 5 horas seu dinheiro está na conta!*_",
    "ativo")
    
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulationAtivo");
    });
    controller.addDialog(flow);
};