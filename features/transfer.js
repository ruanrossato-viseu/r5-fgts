
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("agent-transfer", controller);

    flow.addAction("transbordo")
    flow.addMessage("[transferToAgent]+++Para falar com um de nossos especialistas para ajudar, basta clicar no link a seguir durante horário comercial: https://zprs.in/FGTS",
                    "transbordo")
                    
    flow.after(async (results, bot) => {
        await bot.cancelAllDialogs();
    });
    controller.addDialog(flow);
};