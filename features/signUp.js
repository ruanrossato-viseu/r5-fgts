
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("signUp", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("id")
   

    function isNumeric(num){
        return !isNaN(num)
      }

      // Solicita CNH ou RG
    flow.addQuestion("[signUp]+++Qual das opções preferiu? _Digite o número do lado do nome do banco que quer contratar_",
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
          await flow.gotoThread("documents")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    }, 
    "bank", 
    "id")

    // Solicita CNH ou RG
    flow.addQuestion("[signUp]+++Ótima escolha! Para concluir, precisamos confirmar algumas informações. É bem rapidinho\
    \n\n Para começar, preciso do número do seu *RG ou CNH*",
    async(response,flow,bot) => {
        var regexCnh = new RegExp(/\b\d{11}\b/)
        var regexRg = new RegExp(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/)
        if(response == regexCnh || response == regexRg) {
          await flow.gotoThread("birthday")
        }
        else {
          await flow.gotoThread("documentsAgain")
        }
    }, 
    "rgCnh", 
    "documents")

    flow.addQuestion("[signUp]+++Desculpe, eu não entendi! Para avançarmos preciso que informe o número do *RG ou CNH*.\
    \n\n Pode ser nesse formato para RG: 12.123.123-4\
    \n Para CNH nesse formato: 012345678910 ",
    async(response,flow,bot) => {
        var regexCnh = new RegExp(/\b\d{11}\b/)
        var regexRg = new RegExp(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/)
        if(response == regexCnh || response == regexRg) {
            await flow.gotoThread("birthday")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    }, 
    "rgCnh", 
    "documentsAgain")

// ----

    // Solicita data de nascimento
    flow.addQuestion("[signUp]+++Agora preciso da sua *data de nascimento*, no formato dia/mês/ano.\
    \n Exemplo: 01/05/1970",    
    async(response,flow,bot) => {
        var regexAniversario = new RegExp(/(\d{2})[-.\/](\d{2})[-.\/](\d{4}$)/)
        if (response == regexAniversario) {
          await flow.gotoThread("address")
        }
        else {
          await flow.gotoThread("birthdayAgain")
        }
    }, 
    "dataNascimento", 
    "birthday")

    flow.addQuestion("[signUp]+++Hmm, não entendi. Você poderia me falar a sua *data de nascimento* por favor?.\
    \n\n Veja um exemplo de como preciso: 01/01/1990",
    async(response,flow,bot) => {
        var regexAniversario = new RegExp(/(\d{2})[-.\/](\d{2})[-.\/](\d{4}$)/)
        if (response == regexAniversario) {
            await flow.gotoThread("address")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    }, 
    "dataNascimento", 
    "birthdayAgain")

// -------

    // Solciita CEP
    flow.addQuestion("[signUp]+++Para cadastrar seu endereço, vou precisar do seu *CEP*, por favor:", 
    async(response,flow,bot) => {
        var regexCEP = new RegExp(/\d{2}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?[\d]{3}$/)
        if (response == regexCep) {
            await flow.gotoThread("addressNumber")
        }
        else {
            await flow.gotoThread("addressAgain")
        }
    },
    "cep",
    "address")

    flow.addQuestion("[signUp]+++Ops não entendi. Vamos tentar de novo.\
    \n\n Poderia me informar seu *CEP*. Ex: 01234-567",
    async(response,flow,bot) => {
        var regexCEP = new RegExp(/\d{2}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?[\d]{3}$/)
        if (response == regexCep) {
            await flow.gotoThread("addressNumber")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    }, 
    "cep", 
    "AdressAgain")

// -----

    // Solicita número da casa
    flow.addQuestion("[signUp]+++Identifiquei  a Rua Exemplo, Bairro Exemplo, Cidade, Estado.\
    \nAgora me diga o *número* do imóvel?", 
    async(response,flow,bot) => {
        if(isNumeric(response)) {
            await flow.gotoThread("complementoBoolean")
        }
        else {
            await flow.gotoThread("addressNumberAgain")
        }
        
    }, 
    "numero",
    "addressNumber")

    flow.addQuestion("[signUp]+++Não compreendi o valor digitado. \
    \nPreciso que informe o *número da sua residência*. Ex: 100", 
    async(response,flow,bot) => {
        if(isNumeric(response)) {
            await flow.gotoThread("complementoBoolean")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
        
    }, 
    "numero",
    "addressNumberAgain")

// -----

    // Pergunta se tem complemento da casa 
    flow.addQuestion("[signUp]+++Tem complemento?", 
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)){
            await flow.gotoThread("complemento")
        }
        else{
            await flow.gotoThread("dadosBanco")

        }
    },
    "complementoBoolean",
    "complementoBoolean")


    // Solicita complemento da casa
    flow.addQuestion("[signUp]+++Informe o *complemento*",
    async(response,flow,bot) => {
        var regexComplemento = new RegExp(/(?i)[a-z0-8]{0,10}( ?)[a-z0-9]{0,10}/)
        if (response == regexComplemento) {
          await flow.gotoThread("dadosBanco")
        }
        else {
          await flow.gotoThread("complementoAgain")
        }
    },
    "complemento",
    "complemento")
    
    flow.addQuestion("[signUp]+++Preciso que me informe o complemento da sua *residência* por favor.\
    \n\n Ex: Casa 2",
    async(response,flow,bot) => {
        var regexComplemento = new RegExp(/(?i)[a-z0-8]{0,10}( ?)[a-z0-9]{0,10}/)
        if (response == regexComplemento) {
            await flow.gotoThread("dadosBanco")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "complemento",
    "complementoAgain")

// -------

    // Solicita o nome do banco
    flow.addQuestion("[signUp]+++Para finalizar, preciso dos seus *dados bancários*\
    \n\n Sua conta é em qual banco?\
    \n[1] Itau\
    \n[2] Santander\
    \n[3] Bradesco\
    \n[4] Banco do Brasil\
    \n[5] Caixa\
    \n[6] Outros",
    async(response,flow,bot) => {
        var regexItau = new RegExp(/(?i)ita(u|ú)/)
        var regexSantander = new RegExp(/(?i)s(a)?(m|n)?t(a|e)?(n|m)?d(e|i)?(r)?/)
        var regexBradesco = new RegExp(/(?i)b(r)?ad(|r)(e|i)?s?c(o|u)?/)
        var regexBrasil = new RegExp(/(?i)(ba(n|m)(c(o|u)|k)?)? ?(do)? ?b(r)?a(s|ss|z)i(l|u)/)
        var regexCaixa =  new RegExp(/(?i)(c|k)a(i)?(x|ch)a ?(fed(era(l|u)?)?)?/)
        var regexOutros = new RegExp(/(?i)out(r)?o(s)? ?(ba(n|m)c(o|u)(s)?)?/)

        if (response == regexItau || response == "1") {
          flow.setVar("banco","Itaú")
          await flow.gotoThread("agencia")
        }
        if (response == regexSantander || response == "2") {
          flow.setVar("banco","Santander")
          await flow.gotoThread("agencia")
        }
        if (response == regexBradesco || response == "3") {
          flow.setVar("banco","Bradesco")
          await flow.gotoThread("agencia")
        }
        if (response == regexBrasil || response == "4") {
          flow.setVar("banco","Banco do Brasil")
          await flow.gotoThread("agencia")
        }
        if (response == regexCaixa || response == "5") {
          flow.setVar("banco","Caixa")
          await flow.gotoThread("agencia")
        }
        if (response == regexOutros || response == "6") {
          flow.setVar("banco","Outros")
          await flow.gotoThread("agencia")
        }
        else {
          await flow.gotoThread("dadosBancoAgain")
        }
    },
    "banco",
    "dadosBanco")

    flow.addQuestion("[signUp]+++Éh, não entendi. Preciso que você me informe a *conta bancária* que quer receber o benefício do FGTS.\
    \n\n Sua conta é em qual banco?\
    \n[1] Itau\
    \n[2] Santander\
    \n[3] Bradesco\
    \n[4] Banco do Brasil\
    \n[5] Caixa\
    \n[6] Outros",
    async(response,flow,bot) => {
        var regexItau = new RegExp(/(?i)ita(u|ú)/)
        var regexSantander = new RegExp(/(?i)s(a)?(m|n)?t(a|e)?(n|m)?d(e|i)?(r)?/)
        var regexBradesco = new RegExp(/(?i)b(r)?ad(|r)(e|i)?s?c(o|u)?/)
        var regexBrasil = new RegExp(/(?i)(ba(n|m)(c(o|u)|k)?)? ?(do)? ?b(r)?a(s|ss|z)i(l|u)/)
        var regexCaixa =  new RegExp(/(?i)(c|k)a(i)?(x|ch)a ?(fed(era(l|u)?)?)?/)
        var regexOutros = new RegExp(/(?i)out(r)?o(s)? ?(ba(n|m)c(o|u)(s)?)?/)

        if (response == regexItau || response == "1") {
          flow.setVar("banco","Itaú")
          await flow.gotoThread("agencia")
        }
        if (response == regexSantander || response == "2") {
          flow.setVar("banco","Santander")
          await flow.gotoThread("agencia")
        }
        if (response == regexBradesco || response == "3") {
          flow.setVar("banco","Bradesco")
          await flow.gotoThread("agencia")
        }
        if (response == regexBrasil || response == "4") {
          flow.setVar("banco","Banco do Brasil")
          await flow.gotoThread("agencia")
        }
        if (response == regexCaixa || response == "5") {
          flow.setVar("banco","Caixa")
          await flow.gotoThread("agencia")
        }
        if (response == regexOutros || response == "6") {
          flow.setVar("banco","Outros")
          await flow.gotoThread("agencia")
        }
        else {
          await bot.beginDialog("agent-transfer")
        }
    },
    "banco",
    "dadosBancoAgain")

    // ------

    // Solicita a agência
    flow.addQuestion("[signUp]+++Me passa o número da sua *agência*?",
    async(response,flow,bot) => {
        if(isNumeric(response)){
          await flow.gotoThread("cc")
        }
        else {
          await flow.gotoThread("agenciaAgain")
        }
    },
    "agencia",
    "agencia")

    // ----

    flow.addQuestion("[signUp]+++Vamos tentar de novo! Informe por favor o número da sua *agência*:\
    \n\n Ex: 1234",
    async(response,flow,bot) => {
        if(isNumeric(response)){
          await flow.gotoThread("cc")
        }
        else {
          await bot.beginDialog("agent-transfer")
        }
    },
    "agencia",
    "agenciaAgain")
    

    // Solicita a conta
    flow.addQuestion("[signUp]+++E agora o número da *conta corrente*\
    \n*Obs:* Precisa conter o dígito no final",
    async(response,flow,bot) => {
      if(isNumeric(response)){
        await flow.gotoThread("finalizacao")
      }
      else {
        await flow.gotoThread("ccAgain")
      }       
    },
    "conta",
    "cc")

    flow.addQuestion("[signUp]+++Não consegui entender. Por favor, digita o número da sua conta *corrente com o dígito no final*:\
    \n\n Ex: 01020304-1",
    async(response,flow,bot) => {
        if(isNumeric(response)){
          await flow.gotoThread("finalizacao")
        }
        else {
          await bot.beginDialog("agent-transfer")
        }
    },
    "conta",
    "ccAgain")



    // Finaliza bot
    flow.addMessage("[ending]+++Pronto! Sua requisição foi enviada com sucesso!\
    \n\n Você vai receber um SMS com o link para concluir a formalização. É só seguir por lá! Até mais", 
    "finalizacao")


    flow.after(async (results, bot) => {
        var dadosUsuario ={
            "bank":flow.vars.bank,
            "rgCnh":flow.vars.rgCnh,
            "dataNascimento":flow.vars.dataNascimento,
            "dataNascimento":flow.vars.dataNascimento,
            "cep":flow.vars.cep,
            "numero":flow.vars.numero,
            "complementoBoolean":flow.vars.complementoBoolean,
            "complemento":flow.vars.complemento,
            "banco":flow.vars.banco,
            "agencia":flow.vars.agencia,
            "conta":flow.vars.conta
        }
        await bot.say("[SIGNUP]+++"+dadosUsuario)
        await bot.say("[FINISH]+++[Encerramento Padrão]")
        await bot.cancelAllDialogs();
    });
    controller.addDialog(flow);
};