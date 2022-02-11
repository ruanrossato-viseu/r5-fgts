
module.exports = function(controller) {
  const { BotkitConversation } = require("botkit");
  const flow = new BotkitConversation("signUp", controller);
  const nlu = require('../scripts/nlu.js');
  const cep = require('../scripts/cep.js');

  function isNumeric(num){
    return !isNaN(num)
  }

  flow.addAction("simulationChoice")
  
  flow.before("simulationChoice",async(flow,bot)=>{
    flow.gotoThread("name")
    // var simulationText = "[fgtsSimulation]+++"
    // var choiceText = "[fgtsSimulation]+++"
    // if(flow.vars.simulation.length>1){
    //   console.log("Mais de uma simulação")
    //   simulationText+="Confira as melhores opções para você:\n"
    //   for(var index = 0;index<flow.vars.simulation.length;index++){
    //     var simulation = flow.vars.simulation[index]
        
    //     simulationText += `\n[${index+1}] ${simulation.bank}\
    //                     \n  Saldo disponível para saque: R$ ${simulation['simulation']['balance']}\
    //                     \n  Você receberá: R$ ${simulation['simulation']['value']}\
    //                     \n  Parcelas adiantadas: ${simulation['simulation']['installments']}\n`
    //   }
    //   choiceText += "Qual das opções preferiu? _Digite o número do lado do nome do banco que quer contratar_"
    // }

    // else if (flow.vars.simulation.length==1){
    //   console.log("Uma simulação")
    //   simulationText+='Consegui a seguinte proposta para você:\n';
    //   var simulation = flow.vars.simulation[0]
    //   simulationText += `\n${simulation.bank}\
    //                     \n  Saldo disponível para saque: R$ ${simulation['simulation']['balance']}\
    //                     \n  Você receberá: R$ ${simulation['simulation']['value']}\
    //                     \n  Parcelas adiantadas: ${simulation['simulation']['installments']}\n`
    //   choiceText += "O que achou da proposta? Quer contratar?"
    // }

    // else{
    //   console.log("Nenhuma simulação")
    //   simulationText+='Infelizmente, não encontramos ofertas para você nesse momento.';      
    //   choiceText += "Gostaria de tentar novamente?"
    // }
    // flow.setVar("simulationText",simulationText)
    // flow.setVar("choiceText",choiceText)
    // flow.setVar("simulationCount",flow.vars.simulation.length)
  })

  flow.addMessage("{{vars.simulationText}}","simulationChoice")

  
  flow.addQuestion("{{vars.choiceText}}",
  async(response,flow,bot) => {
    console.log(flow.vars.simulation)
    console.log(flow.vars.simulationCount)
    console.log(response)
    if(flow.vars.simulationCount == 0){
      console.log("Nenhuma simulação")
      if(nlu.checkAffirmative(response)){
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulationError");
      }
      else{
        await bot.say("[fgtsSimulation]+++Ok, se quiser tentar novamente, é só chamar")
        await bot.say("[FINISH]+++[Sem simulação]")
        await bot.cancelAllDialogs();
      }
    }
    else if(flow.vars.simulationCount == 1){
      console.log("Uma simulação")
      if(nlu.checkAffirmative(response)){
        var bankChoice = flow.vars.simulation[0].bank
        flow.setVar("simulationChoice",bankChoice)
        flow.gotoThread("name")
      }
      else{
        await bot.say("[fgtsSimulation]+++Ok, se quiser simular novamente, é só chamar")
        await bot.say("[FINISH]+++[Sem simulação]")
        await bot.cancelAllDialogs();
      }
    }
    else if(flow.vars.simulationCount > 1){
      console.log("Mais de uma simulação")
      if(parseInt(response)>0 && parseInt(response)<=flow.vars.simulationCount){
        var bankChoice = flow.vars.simulation[parseInt(response)].bank
        flow.setVar("simulationChoice",bankChoice)
        flow.gotoThread("name")
      }
      else if(nlu.checkNegative(response)){
        await bot.say("[fgtsSimulation]+++Ok, se quiser simular novamente, é só chamar")
        await bot.say("[FINISH]+++[Sem simulação]")
        await bot.cancelAllDialogs();
      }
      else{
        await bot.say("[fgtsSimulation]+++Essa opção não é válida. Por favor, digite um _número entre 1 e "+flow.vars.simulationCount+"_")
        await flow.repeat()
      }
    }
  }, 
  "simulationChoice", 
  "simulationChoice")

  
  flow.addQuestion("[signUp]+++Ótima escolha! Para concluir, precisamos anotar algumas informações. É bem rapidinho\
  \n\nPara começar, preciso do seu *nome completo*",
    async(response,flow,bot) => {
      flow.setVar("gender",nlu.checkGender(response))  
      await flow.gotoThread("documents")
    }, 
  "name", 
  "name")

  
  flow.addQuestion("[signUp]+++E agora preciso do *número do seu RG*\
  \n\n _Lembrando que se precisar voltar, basta digitar *voltar* em qualquer momento_.",
    async(response,flow,bot) => {
      var regexRg = new RegExp(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/)
      if(nlu.checkError(response)) {
        await flow.gotoThread("name")
      }
      if(regexRg.test(response)) {
        await flow.gotoThread("motherName")
      }
      else {
        await flow.gotoThread("documentsAgain")
      }
  }, 
  "id", 
  "documents")

  flow.addQuestion("[signUp]+++Desculpe, eu não entendi! Para avançarmos preciso que informe o *número do RG*.\
  \n\nPode ser nesse formato para RG: 12.123.123-4",
  async(response,flow,bot) => {
      var regexRg = new RegExp(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/)
      if(nlu.checkError(response)) {
        await flow.gotoThread("name")
      }
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
  flow.addQuestion("[signUp]+++Ok, agora o *nome completo da sua mãe*, por favor",    
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("documents")
    }
    if(flow.vars.gender == "M" || flow.vars.gender == "F" ){
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
  flow.addQuestion("[signUp]+++E com qual *gênero* você se identifica?\
  \n[1] - Feminino\
  \n[2] - Masculino",    
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("motherName")
    }
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
  

  flow.addQuestion("[signUp]+++Essa opção não é válida. Digite *1 para Feminino* ou *2 para Masculino*",    
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("motherName")
    }
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
  flow.addQuestion("[signUp]+++Para cadastrar seu endereço, vou precisar do seu *CEP*, por favor:", 
  async(response,flow,bot) => {
      // var regexCEP = new RegExp(/\d{2}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?[\d]{3}$/)
      // if (regexCEP.test(response)) {
      //     await flow.gotoThread("addressNumber")
      // }
      // else {
      //     await flow.gotoThread("addressAgain")
      // }
      if(nlu.checkError(response)) {
        await flow.gotoThread("gender")
      }
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

  flow.addQuestion("[signUp]+++Ops, esse CEP não foi válido. Vamos tentar de novo.\
  \n\n Escreva seu *CEP* no formato: 01234-567",
  async(response,flow,bot) => {
      // var regexCEP = new RegExp(/\d{2}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?[\d]{3}$/)
      // if (regexCEP.test(response)) {
      //     await flow.gotoThread("addressNumber")
      // }
      // else {
      //     await bot.beginDialog("agent-transfer")
      // }
      if(nlu.checkError(response)) {
        await flow.gotoThread("gender")
      }
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
  flow.addQuestion("[signUp]+++Obrigada. Agora preciso do *endereço* desse CEP", 
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("address")
    }
    else{
      await flow.gotoThread("addressNumber")
    }
  }, 
  "addressStreet",
  "addressStreet")
// -----

  // Solicita número da casa
  flow.addQuestion("[signUp]+++Identifiquei o seguinte endereço: {{vars.addressStreet}}, {{vars.addressNeighbourhood}} na cidade de {{vars.addressCity}}-{{vars.addressState}}.\
  \nAgora me diga o *número* do imóvel?", 
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("addressStreet")
    }
    else{
      await flow.gotoThread("dadosBanco")
    }
      
      
  }, 
  "numero",
  "addressNumber")




  // Solicita o nome do banco
  flow.addQuestion("[signUp]+++Para finalizar, preciso dos seus *dados bancários*\
  \n\n Sua conta é em qual banco?_Digite o número do lado do banco_\
  \n[1] Itau\
  \n[2] Santander\
  \n[3] Bradesco\
  \n[4] Banco do Brasil\
  \n[5] Caixa\
  \n[6] Nubank\
  \n[7] Outros",
  async(response,flow,bot) => {
      if(nlu.checkError(response)) {
        await flow.gotoThread("addressNumber")
      }

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
        flow.setVar("banco","Outros")
        await flow.gotoThread("qualBanco")
      }
      else {
        await flow.gotoThread("dadosBancoAgain")
      }
  },
  "banco",
  "dadosBanco")

  flow.addQuestion("[signUp]+++Não entendi. Preciso que você me informe a *conta bancária* que quer receber o benefício do FGTS.\
  \n\n Sua conta é em qual banco?\
  \n[1] Itau\
  \n[2] Santander\
  \n[3] Bradesco\
  \n[4] Banco do Brasil\
  \n[5] Caixa\
  \n[6] Nubank\
  \n[7] Outros",
  async(response,flow,bot) => {
      if(nlu.checkError(response)) {
        await flow.gotoThread("addressNumber")
      }
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
        flow.setVar("banco","Outros")
        await flow.gotoThread("qualBanco")
      }
      else {
        await bot.beginDialog("agent-transfer")
      }
  },
  "banco",
  "dadosBancoAgain")

  flow.addQuestion("Certo, e qual o *código do seu banco*?\
  \nEx: O código do banco votorantim é *655*",
  async(response,flow,bot) => {
    var regexCodigo = new RegExp(/[0-9]{3}/)
    if(regexCodigo.test(response)) {
      await flow.gotoThread("agencia")
    }
    else {
      await flow.gotoThread("qualBancoAgain")
    }
  },
  "codigoBanco",
  "qualBanco")

  flow.addQuestion("Hmm, não entendi, qual é o *código do seu banco*?\
  \n_Digite apenas o código do seu banco_\
  \nEx: *655*",
  async(response,flow,bot) => {
    var regexCodigo = new RegExp(/[0-9]{3}/)
    if(regexCodigo.test(response)) {
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
  flow.addQuestion("[signUp]+++Me passa o número da sua *agência*?",
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("dadosBanco")
    }
    else{
      await flow.gotoThread("cc")
    }
      
  },
  "agencia",
  "agencia")

  // ----

  

  // Solicita a conta
  flow.addQuestion("[signUp]+++E agora o número da *conta corrente*\
  \n*Obs:* Precisa conter o dígito no final",
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("agencia")
    }
    else{
      await flow.gotoThread("finalizacao")
    }
     
  },
  "conta",
  "cc")




  // Finaliza bot
  flow.addMessage("[ending]+++Pronto! Sua requisição foi *enviada com sucesso*!\
  \n\n *Siga nesse link para concluir a formalização*: https://wa.me/551124248472?text=Ola. É só seguir por lá!",
  "finalizacao")

  flow.addAction("nota", "finalizacao")

flow.addQuestion("[ending]+++Informe uma nota de *0 a 10*, quão satisfeito você ficou em relação ao nosso atendimento:",
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("finalizacao")
    }
    if(nlu.checkRate(response)) {
      await flow.gotoThread("despedida")
    }
    else {
        await bot.beginDialog("notaAgain")
    }
},
"nota",
"nota")

flow.addQuestion("[ending]+++Não consegui compreender, pode tentar de novo? De *0 a 10*, que *nota* você daria para o nosso serviço?",
  async(response,flow,bot) => {
    if(nlu.checkError(response)) {
      await flow.gotoThread("finalizacao")
    }
    if(nlu.checkRate(response)) {
      await flow.gotoThread("despedida")
    }
    else {
        await bot.beginDialog("agent-transfer")
    }
},
"nota",
"notaAgain")

flow.addMessage("[ending]+++Tudo bem, obrigado! Até mais.",
"despedida")

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
        "address_street": results[""],
        "address_number": results[""],
        "address_additional": results[""],
        "address_neigbourhood": results[""],
        "address_city":results[""],
        "address_state":results[""],
        "bank_number": results[""],
        "bank_agency_number": results[""],
        "bank_account_number": results[""],
        "bank_account_last_digit": results[""],
        "bank_account_type": results[""]
      }
      await bot.say("[SIGNUPINFO]+++"+dadosUsuario)
      await bot.say("[FINISH]+++[Encerramento Padrão]")
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