
module.exports = function(controller) {

  const { BotkitConversation } = require("botkit");
  const flow = new BotkitConversation("refin", controller);
  const nlu = require('../scripts/nlu.js');

  flow.addAction("introRefin")

  flow.addQuestion({
    "type":"buttons",
    "section":"Subscription",
    "body":"Olá, Felipe! Aqui é da *Promotora X*, correspondente autorizado do *Banco Y*.\
    \n\nO banco disponibilizou um *novo saldo de R$ 500,00* para refinancimento do seu contrato, sem aumento na parcela atual!\
    \n\nVocê pode receber esse valor em até 24h. Você deseja contratar?",
    "footer":"Clique na opção desejada",
    // "header":"",

    "buttons":[
        {
            "text": "Contratar agora!",
            "payload": "sim"
        },
        {
            "text": "Agora não",
            "payload": "nao"
        }
    ],
    
    // "media":
    //     {
    //         "contentType": "image|video|document",
    //         "mediaURL":"",
    //         "mediaID":"",
    //         "caption":"",
    //         "filename":""
    //     }
    },
  async(response,flow,bot) => {
      if(response.includes("1")||response.includes("sim")||response.includes("Quero")){
        await flow.gotoThread("confirmacaoRefin")
      }
      else if(response.includes("2")||response.includes("nao")||response.includes("Agora não")){
          await flow.gotoThread("outraCondicao")
        }
      else {
        await flow.gotoThread("agent-transfer")
      await bot.cancelAllDialogs();
      }
  }, 
  "introRefin", 
  "introRefin")

  // flow.addMessage("Desculpe, não entendi.",
  // "introRefinAgain")

  // flow.addQuestion("Olá, {nome}! Aqui é da R5 Digital, correspondente autorizado do banco Safra.\
  // \no banco Safra disponibilizou um novo saldo de R$ {valor} para refinancimento do seu contrato, sem aumento na parcela atual!\
  // \n Você pode receber esse valor em até 24h. Você deseja continuar?\
  // \n\n1 - Quero agora!\
  // \n2 - Agora não",
  // async(response,flow,bot) => {
  //     if(response.includes("1")||response.includes("Sim")||response.includes("Quero")){
  //       await flow.gotoThread("confirmacaoRefin")
  //     }
  //     else if(response.includes("2")||response.includes("Não")||response.includes("Agora não")){
  //         await flow.gotoThread("outraCondicao")
  //       }
  //     else {
  //       await flow.gotoThread("introRefin")
  //     }
  // }, 
  // "introRefinAgain", 
  // "introRefinAgain")

  flow.addMessage({
    "type":"message",
    "section":"Subscription",
    "body":"Ótimo! Para contratar é muito fácil: basta clicar no link abaixo e formalizar seu contrato: www.linkRefin.com.br",
    // "footer":"Clique na opção desejada",
    // "header":"",

    // "buttons":[
    //     {
    //         "text": "",
    //         "payload": ""
    //     },
    //     {
    //         "text": "",
    //         "payload": ""
    //     }
    // ],
    
    // "media":
    //     {
    //         "contentType": "image|video|document",
    //         "mediaURL":"",
    //         "mediaID":"",
    //         "caption":"",
    //         "filename":""
    //     }
    },
  "confirmacaoRefin")

  flow.addMessage({
    "type":"message",
    "section":"Subscription",
    "body":"Deixa eu ver com meu gerente se consigo alguma outra condição para você, rapidinho!",
    // "footer":"Clique na opção desejada",
    // "header":"",

    // "buttons":[
    //     {
    //         "text": "",
    //         "payload": ""
    //     },
    //     {
    //         "text": "",
    //         "payload": ""
    //     }
    // ],
    
    // "media":
    //     {
    //         "contentType": "image|video|document",
    //         "mediaURL":"",
    //         "mediaID":"",
    //         "caption":"",
    //         "filename":""
    //     }
    },
  "outraCondicao")

  flow.addMessage({"type":"delay"},"outraCondicao")

  flow.addQuestion({
    "type":"buttons",
    "section":"Subscription",
    "body":"Consegui melhorar a proposta e você pode receber até R$ 550,00, mas só vale até hoje. Se quiser contratar, clique no botão baixo",
    "buttons":[
        {
            "text": "Contratar",
            "payload": "1"
        }
    ]},
  async(response,flow,bot) => {
    if(response.includes("1")||response.includes("Sim")||response.includes("Quero")){
      
    }
    else if(response.includes("2")||response.includes("Não")||response.includes("nao")||response.includes("não quero")||response.includes("nao quero")){
      await flow.gotoThread("agent-transfer")
      await bot.cancelAllDialogs();

      }
    else {
      await flow.gotoThread("intro")
    }
}, 
  "outraCondicao", 
  "outraCondicao")

  flow.addMessage({
    "type":"message",
    "section":"Subscription",
    "body":"Ótimo! Para contratar é muito fácil: basta clicar no link abaixo e formalizar seu contrato: www.linkRefin.com.br",
    // "footer":"Clique na opção desejada",
    // "header":"",

    // "buttons":[
    //     {
    //         "text": "",
    //         "payload": ""
    //     },
    //     {
    //         "text": "",
    //         "payload": ""
    //     }
    // ],
    
    // "media":
    //     {
    //         "contentType": "image|video|document",
    //         "mediaURL":"",
    //         "mediaID":"",
    //         "caption":"",
    //         "filename":""
    //     }
    },
  "outraCondicao")
  // flow.addQuestion({"type":"message",
  // "section":"Subscription",
  // "body":"Ótimo! Para contratar é muito fácil: basta clicar no link abaixo e formalizar seu contrato: www.linkRefin.com.br"},
  // async(response,flow,bot) => {
  //     if(response.includes("1")||response.includes("Sim")||response.includes("Quero")){
  //       await flow.gotoThread("agent-transfer")
  //     }
  //     else if(response.includes("2")||response.includes("Não")||response.includes("nao")){
  //         await flow.gotoThread("finalizacao")
  //       }
  //     else {
  //       await flow.gotoThread("intro")
  //     }
  // }, 
  // "falarEspecialista", 
  // // "falarEspecialista")

  // flow.addQuestion("Obrigado pela atenção. Se precisar de algo é só chamar. Até mais",
  // async(response,flow,bot) => {
  // },
  // "finalizacao",
  // "finalizacao")

  // flow.addAction("simularNovamente", "finalizacao")

  // flow.addQuestion("Olá de novo! Quer refazer a simulação para saber quanto tem de saldo para refinancimento?\
  // \n\n1 - Sim\
  // \n2 - Agora não",
  // async(response,flow,bot) => {
  //     if(response.includes("1")||response.includes("Sim")||response.includes("Quero")){
  //       await flow.gotoThread("novoSaldo")
  //     }
  //     else if(response.includes("2")||response.includes("Não")||response.includes("nao")){
  //         await flow.gotoThread("finalizacao")
  //       }
  //     else {
  //       await flow.gotoThread("intro")
  //     }
  // }, 
  // "simularNovamente", 
  // "simularNovamente")

  // flow.addQuestion(`O banco Safra disponibilizou um novo saldo de R$ {valor} para refinancimento do seu contrato, sem aumento na parcela atual!\ 
  // \n\nVocê deseja receber essa valor em até 24h?\
  // \n1 - Quero agora!\
  // \n2 - Agora não`,
  // async(response,flow,bot) => {
  //     if(response.includes("1")||response.includes("Sim")||response.includes("Quero")){
  //       await flow.gotoThread("confirmacaoRefin")
  //     }
  //     else if(response.includes("2")||response.includes("Não")||response.includes("nao")){
  //         await flow.gotoThread("finalizacao")
  //       }
  //     else {
  //       await flow.gotoThread("intro")
  //     }
  // }, 
  // "novoSaldo", 
  // "novoSaldo")

  flow.after(async (response, bot) => {
      await bot.cancelAllDialogs();
  });
  controller.addDialog(flow);
};