module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("intro", controller);

    flow.addAction("intro")

    controller.addDialog(flow);
};