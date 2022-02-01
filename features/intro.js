
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("inicio", controller);
    
    flow.addAction("intro")

    flow.addMessage("[INTRO]+++Olá, sou a Raya, assistente virtual da R5 Digital! Somos uma plataforma multi-bancária Online. Estou aqui para te *ajudar a adiantar o saque do FGTS retido*.",
                    "intro")

    flow.addMessage("[INTRO]+++Para garantir sua segurança e privacidade, seguimos as diretrizes da Lei Geral de Proteção de Dados. Para saber mais, acesse o link http://r5promotora.com.br/politica-de-privacidade/", 
                    "intro")

    
    // flow.addMessage({
    //     text: "teste",
    //     channelData: {
    //         mediaUrl: 'https://i.imgur.com/9n3qoKx.png',
    //     },
    // },
    // "intro")
    
    

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("app-install");
    });
    controller.addDialog(flow);
};