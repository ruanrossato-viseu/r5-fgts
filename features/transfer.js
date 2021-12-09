
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("agent-transfer", controller);

    flow.addAction("transbordo")
    flow.addMessage("[transferToAgent]++Vou encaminhar para um de nossos especialistas para ajudar, logo tudo será resolvido. Por favor, espero um pouquinho.",
                    "transbordo")
    // flow.addMessage("[TRANSFER]++[Transferência]")
    flow.after(async (results, bot) => {
        await bot.cancelAllDialogs();
    });
    controller.addDialog(flow);
};