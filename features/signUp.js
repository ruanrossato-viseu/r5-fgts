
module.exports = function(controller) {
  const { BotkitConversation } = require("botkit");
  const flow = new BotkitConversation("signUp", controller);
  const nlu = require('../scripts/nlu.js');
  const cep = require('../scripts/cep.js');

  function isNumeric(num){
    return !isNaN(num)
  }

  flow.addAction("name")
  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Ótima escolha! Para concluir, precisamos anotar algumas informações. É bem rapidinho 😉\
      \n\nPara começar, preciso do seu *nome completo*",
      // "footer":"",
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
    async(response,flow,bot) => {  
      flow.setVar("gender",nlu.checkGender(response))  
        
      await flow.gotoThread("documents")
    }, 
  "name", 
  "name")

  
  flow.addQuestion(
    {
      "type":"message",
      "section":"Subscription",
      "body":"E agora preciso do número do seu *RG*",
      // "footer":"",
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
    async(response,flow,bot) => {
      var regexRg = new RegExp(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/)
      if(regexRg.test(response)) {
        await flow.gotoThread("motherName")
      }
      else {
        await flow.gotoThread("documentsAgain")
      }
  }, 
  "id", 
  "documents")

  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Desculpe, eu não entendi! Para avançarmos preciso que informe o número do *RG *.\
      \n\nPode ser nesse formato para RG: 12.123.123-4",
      // "footer":"",
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
  async(response,flow,bot) => {
      var regexRg = new RegExp(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/)
      if(regexRg.test(response)) {
          await flow.gotoThread("motherName")
      }
      else {
          await bot.beginDialog("agent-transfer")
      }
  }, 
  "id", 
  "documentsAgain")


  
// ----

  // Solicita nome da mãe
  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Ok, agora o *nome completo da sua mãe*, por favor",
      // "footer":"",
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
  async(response,flow,bot) => {
    // if(nlu.checkErro(response)){
    //   await flow.gotoThread("documents")
    // }
    if(flow.vars.gender == "M" ||flow.vars.gender == "F" ){
      flow.gotoThread("address")
    }
    else{
      await flow.gotoThread("gender")
    }
    
  }, 
  "motherName", 
  "motherName")

// ----

  // Solicita gênero
  flow.addQuestion(
    {
      "type":"buttons",
      "section":"Subscription",
      "body":"E com qual gênero você se identifica?",   
      "footer":"Escolha o gênero",
      // "header":"",

      "buttons":[
          {
              "text": "Feminino",
              "payload": "1"
          },
          {
              "text": "Masculino",
              "payload": "2"
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
    response = response.toLowerCase()
    if(response.includes("1")||response.includes("feminino")||response.includes("mulher")){
      flow.setVar("gender","F")
    }
    
    else if(response.includes("2")||response.includes("masculino")||response.includes("homem")){
      flow.setVar("gender","M")
    }
    else{
      await flow.gotoThread("genderRepeat")
    }
    await flow.gotoThread("address")
  }, 
  "gender", 
  "gender")
  

  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Essa opção não é válida. Digite *1 para Feminino* ou *2 para Masculino*",   
      // "footer":"",
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
  async(response,flow,bot) => {
    response = response.toLowerCase()
    if(response.includes("1")||response.includes("feminino")||response.includes("mulher")){
      flow.setVar("gender","F")
    }
    
    else if(response.includes("2")||response.includes("masculino")||response.includes("homem")){
      flow.setVar("gender","M")
    }
    else{
      flow.setVar("gender","F")
    }
    await flow.gotoThread("address")
  }, 
  "gender", 
  "genderRepeat")

// -------

  // Solicita CEP
  flow.addQuestion(
    {
      "type":"message",
      "section":"Subscription",
      "body":"Para cadastrar seu endereço, vou precisar do seu *CEP*, por favor:", 
      // "footer":"",
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
  async(response,flow,bot) => {
      // var regexCEP = new RegExp(/\d{2}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?[\d]{3}$/)
      // if (regexCEP.test(response)) {
      //     await flow.gotoThread("addressNumber")
      // }
      // else {
      //     await flow.gotoThread("addressAgain")
      // }

      var address = await cep.checkCEP(response)
      if(address){
        if(address.logradouro != ""){
          flow.setVar("addressStreet",address.logradouro)
          flow.setVar("addressNeighbourhood",address.bairro)
          flow.setVar("addressCity",address.localidade)
          flow.setVar("addressState",address.uf)
          await flow.gotoThread("addressNumber")
        }
        else{
          flow.setVar("addressCity",address.localidade)
          flow.setVar("addressState",address.uf)
          await flow.gotoThread("addressStreet")
        }
      }
      else{
        await flow.gotoThread("addressAgain")
      }
  },
  "cep",
  "address")

  flow.addQuestion(
    {
      "type":"message",
      "section":"Subscription",
      "body":"Ops, esse CEP não foi válido. Vamos tentar de novo.\
      \n\n Escreva seu *CEP* no formato: 01234-567",
      // "footer":"",
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
  async(response,flow,bot) => {
      // var regexCEP = new RegExp(/\d{2}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?[\d]{3}$/)
      // if (regexCEP.test(response)) {
      //     await flow.gotoThread("addressNumber")
      // }
      // else {
      //     await bot.beginDialog("agent-transfer")
      // }
      var address = cep.checkCEP(response)
      
      if(address){
        console.log("address")
        if(address.logradouro != ""){
          flow.setVar("addressStreet",address.logradouro)
          flow.setVar("addressNeighbourhood",address.bairro)
          flow.setVar("addressCity",address.localidade)
          flow.setVar("addressState",address.uf)
          await flow.gotoThread("addressNumber")
        }
        else{
          flow.setVar("addressCity",address.localidade)
          flow.setVar("addressState",address.uf)
          await flow.gotoThread("addressStreet")
        }
      }
      else{
        await flow.repeat()
      }
  }, 
  "cep", 
  "addressAgain")
// -----

  // Solicita logradouro da casa
  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Obrigada. Agora preciso do *endereço* desse CEP", 
        // "footer":"",
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
  async(response,flow,bot) => {
        await flow.gotoThread("addressNumber")
  }, 
  "addressStreet",
  "addressStreet")
// -----

  // Solicita número da casa
  flow.addQuestion(
    {
      "type":"message",
      "section":"Subscription",
      "body":"Identifiquei o seguinte endereço: {{vars.addressStreet}}, {{vars.addressNeighbourhood}} na cidade de {{vars.addressCity}}-{{vars.addressState}}.\
      \nAgora me diga o *número* do imóvel?", 
      // "footer":"",
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
  async(response,flow,bot) => {
        await flow.gotoThread("dadosBanco")
      
      
  }, 
  "numero",
  "addressNumber")



  // Solicita o nome do banco
  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Para finalizar, preciso dos seus *dados bancários*\
      \n\n Sua conta é em qual banco?_Digite o número do lado do banco_\
      \n[1] Itau\
      \n[2] Santander\
      \n[3] Bradesco\
      \n[4] Banco do Brasil\
      \n[5] Caixa\
      \n[6] Nubank\
      \n[7] Outros",
      // "footer":"",
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
  async(response,flow,bot) => {
    // if(nlu.checkError(response)) {
    //   await flow.gotoThread("addressNumber")
    // }
      if (response == "1") {
        flow.setVar("banco","341")
        await flow.gotoThread("agencia")
      }
      else if (response == "2") {
        flow.setVar("banco","033")
        await flow.gotoThread("agencia")
      }
      else if (response == "3") {
        flow.setVar("banco","237")
        await flow.gotoThread("agencia")
      }
      else if (response == "4") {
        flow.setVar("banco","001")
        await flow.gotoThread("agencia")
      }
      else if (response == "5") {
        flow.setVar("banco","104")
        await flow.gotoThread("agencia")
      }
      else if (response == "6") {
        flow.setVar("banco","260")
        await flow.gotoThread("agencia")
      }
      else if (response == "7") {
        await flow.gotoThread("qualBanco")
      }
      else {
        await flow.gotoThread("dadosBancoAgain")
      }
  },
  "banco",
  "dadosBanco")

  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Não entendi. Preciso que você me informe a *conta bancária* que quer receber o benefício do FGTS.\
      \n\n Sua conta é em qual banco?\
      \n[1] Itau\
      \n[2] Santander\
      \n[3] Bradesco\
      \n[4] Banco do Brasil\
      \n[5] Caixa\
      \n[6] Nubank\
      \n[7] Outros",
      // "footer":"",
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
  async(response,flow,bot) => {
    //  if(nlu.checkError(response)) {
    //   await flow.gotoThread("addressNumber")
    // }
      if (response == "1") {
        flow.setVar("banco","341")
        await flow.gotoThread("agencia")
      }
      else if (response == "2") {
        flow.setVar("banco","033")
        await flow.gotoThread("agencia")
      }
      else if (response == "3") {
        flow.setVar("banco","237")
        await flow.gotoThread("agencia")
      }
      else if (response == "4") {
        flow.setVar("banco","001")
        await flow.gotoThread("agencia")
      }
      else if (response == "5") {
        flow.setVar("banco","104")
        await flow.gotoThread("agencia")
      }
      else if (response == "6") {
        flow.setVar("banco","260")
        await flow.gotoThread("agencia")
      }
      else if (response == "7") {
        await flow.gotoThread("qualBanco")
      }
      else {
        await bot.beginDialog("agent-transfer")
      }
  },
  "banco",
  "dadosBancoAgain")

  flow.addQuestion(
    {
      "type":"message",
      "section":"Subscription",
      "body":"Certo, e qual o *código do seu banco*?\
      \n \nCaso não saiba o código, consulte o link abaixo:\
      \nhttps://www.conta-corrente.com/codigo-dos-bancos/",
      // "footer":"",
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
  async(response,flow,bot) => {
    var regexCodigo = new RegExp(/[0-9]{3}/)
    if(regexCodigo.test(response)) {
      flow.setVar("banco",response)
      await flow.gotoThread("agencia")
    }
    else {
      await flow.gotoThread("qualBancoAgain")
    }
  },
  "codigoBanco",
  "qualBanco")

  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Hmm, não entendi, qual é o *código do seu banco*?\
      \n_Digite apenas o código do seu banco_\
      \nEx: *655*",
      // "footer":"",
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
  async(response,flow,bot) => {
    var regexCodigo = new RegExp(/[0-9]{3}/)
    if(regexCodigo.test(response)) {
      flow.setVar("banco",response)
      await flow.gotoThread("agencia")
    }
    else {
      await bot.beginDialog("agent-transfer")
    }
  },
  "codigoBanco",
  "qualBancoAgain")
  // ------

  // Solicita a agência
  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Me passa o número da sua *agência*?",
      // "footer":"",
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
  async(response,flow,bot) => {
        await flow.gotoThread("cc")
      
  },
  "agencia",
  "agencia")

  // ----

  

  // Solicita a conta
  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"E agora o número da *conta corrente*\
      \n*Obs:*Se houver, não coloque o dígito",
      // "footer":"",
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
  async(response,flow,bot) => {
      await flow.gotoThread("ccDigit")
     
  },
  "conta",
  "cc")

  // Solicita a conta
  flow.addQuestion(
    {
      "type":"message",
"section":"Subscription",
      "body":"Para acabar, me passa o *dígito da sua conta corrente*\
      \n*Obs:*Se não tiver dígito, é só escrever 0",
      // "footer":"",
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
  async(response,flow,bot) => {
      await flow.gotoThread("finalizacao")
     
  },
  "ccDigit",
  "ccDigit")




  // Finaliza bot
  flow.addMessage(
    {
      "type":"message",
"section":"Subscription",
      "body":"Pronto! Sua requisição foi enviada com sucesso!\
      \n\nPara concluir a formalização e enviar os documentos, é só entrar nesse site do banco: www.linkbanco.com.br", 
      // "footer":"",
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
  "finalizacao")


  flow.after(async (results, bot) => {
      var dadosUsuario ={
        "simulationChoice":results["simulationChoice"],
        "name": results["name"],
        "gender": results["gender"],
        "id_number": results["id"],
        "id_date": results["idDate"],
        "mother_name": results["motherName"],
        "phoneNumber": results["user"],
        "zip_code": results["cep"],
        "address_street": results["addressStreet"],
        "address_number": results["addressNumber"],
        "address_additional": results[""],
        "address_neigbourhood": results["addressNeighbourhood"],
        "address_city":results["addressCity"],
        "address_state":results["addressState"],
        "bank_number": results["banco"],
        "bank_agency_number": results["agencia"],
        "bank_account_number": results["conta"],
        "bank_account_last_digit": results["ccDigit"],
        "bank_account_type": "CORRENTE"
      }
      
      await bot.cancelAllDialogs();
  });
  controller.addDialog(flow);
};

// {
// 	"cep": "23970-000",
// 	"logradouro": "",
// 	"complemento": "",
// 	"bairro": "",
// 	"localidade": "Paraty",
// 	"uf": "RJ",
// 	"ibge": "3303807",
// 	"gia": "",
// 	"ddd": "24",
// 	"siafi": "5875"
// }