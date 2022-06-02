
module.exports = function(controller) {

  const { BotkitConversation } = require("botkit");
  const flow = new BotkitConversation("consignado", controller);
  const nlu = require('../scripts/nlu.js');

  flow.addAction("intro")

  flow.addQuestion({
    "type":"message",
    "section":"Subscription",
    "body":"Para eu fazer uma proposta, só preciso do seu *CPF*" 
    },
  async(response,flow,bot) => {}, 
  "introRefin", 
  "intro")

  flow.addMessage({"type":"message",
                  "section":"Subscription",
                  "body":"Estamos quase lá! Estou checando as informações e validando a melhor proposta para você!"},
    "intro")

  flow.addMessage({"type":"delay"},"intro")


  flow.addQuestion({
    "type":"buttons",
    "section":"Subscription",
    "body":"Pronto! Dá uma olhada nas condições que consegui para você \
    \n\n - *Assistência Financeira de R$125.000,00* em 72 parcelas + *Seguro de Acidente Pessoal R$xx,xx*\
    \n - *Assistência Financeira de R$125.000,00* em 72 parcelas\
    \n O que achou?",
    "footer":"Clique na opção que quer contratar",
    // "header":"",

    "buttons":[
        {
            "text": "Assistência e Seguro",
            "payload": "1"
        },
        {
            "text": "Apenas Assistência",
            "payload": "2"
        },
        {
            "text": "Quero um valor menor",
            "payload": "3"
        }
    ],
    
    
    },
    async(response,flow,bot) => {
      if(response=="1"){
        await bot.cancelAllDialogs();
        await bot.beginDialog("signUp");
    }
    else if(response =="2"){
      await bot.cancelAllDialogs();
      await bot.beginDialog("signUp");
    }
    else if(response =="3"){
        await flow.gotoThread("newSimulation");  
    }}, 
    "introRefin",
    "intro")


  flow.after(async (response, bot) => {
      await bot.cancelAllDialogs();
  });
  controller.addDialog(flow);
};