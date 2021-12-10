
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
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    }, 
    "rgCnh", 
    "id")

    // Solicita CNH ou RG
    flow.addQuestion("[signUp]+++Ótima escolha! Para concluir, precisamos confirmar algumas informações. É bem rapidinho\
    \n\n Para começar, preciso do número do seu RG ou CNH",
    async(response,flow,bot) => {
        // if(isNumeric(response)){
        // }
        // else {
        //     await flow.gotoThread("confirmaDados")
        // }
        await flow.gotoThread("birthday")
    }, 
    "rgCnh", 
    "id")

    // Solicita data de nascimento
    flow.addQuestion("[signUp]+++Agora preciso da sua data de nascimento, no formato dia/mês/ano.\
    \n Exemplo: 01/05/1970",    
    async(response,flow,bot) => {
        // var regexAniversario = new RegExp(/(\d{2})[-.\/](\d{2})[-.\/](\d{4}$)/)
        // if(regexAniversario.test(response)) {
        //     await flow.gotoThread("solicitaCep")
        // }
        // else {
        //     await flow.gotoThread("solicitaDtNascimento")
        // }
        await flow.gotoThread("address")
    }, 
    "dataNascimento", 
    "birthday")


    // Solciita CEP
    flow.addQuestion("[signUp]+++Para cadastrar seu endereço,vou precisar do seu CEP, por favor:", 
    async(response,flow,bot) => {
        // var regexCep = new RegExp(/\d{2}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?[\d]{3}$/)
        // if(regexCep.test(response)) {
        //     await flow.gotoThread("solicitaNum")
        // }
        // else {
        //     await flow.gotoThread("solicitaCep")
        // }
        await flow.gotoThread("addressNumber")
    },
    "cep",
    "address")


    // Solicita número da casa
    flow.addQuestion("[signUp]+++Identifiquei  a Rua Exemplo, Bairro Exemplo, Cidade, Estado.\
    \nAgora me diga o número do imóvel?", 
    async(response,flow,bot) => {
        // if(isNumeric(response)) {
        //     await flow.gotoThread("perguntaComplemento")
        // }
        // else {
        //     await gotoThread("solicitaNum")
        // }
        await flow.gotoThread("complemento")
    }, 
    "numero",
    "addressNumber")


    // Pergunta se tem complemento da casa 
    flow.addQuestion("[signUp]+++Tem complemento?", 
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)){
        }
        else{
            await flow.gotoThread("dadosBanco")

        }
    },
    "complemento",
    "complemento")


    // Solicita complemento da casa
    flow.addQuestion("[signUp]+++Informe o complemento",
    async(response,flow,bot) => {
        await flow.gotoThread("dadosBanco")
    },
    "complemento",
    "complemento")


    // Solicita o nome do banco
    flow.addQuestion("[signUp]+++Para finalizar, preciso dos seus dados bancários\
    \n\n Sua conta é em qual banco?\
    \n[1] Itau\
    \n[2] Santander\
    \n[3] Bradesco\
    \n[4] Banco do Brasil\
    \n[5] Caixa\
    \n[6] Outros",
    async(response,flow,bot) => {
        await flow.gotoThread("agencia")
    },
    "banco",
    "dadosBanco")


    // Solicita a agência
    flow.addQuestion("[signUp]+++Me passa o número da sua agência?",
    async(response,flow,bot) => {
        await flow.gotoThread("cc")
    },
    "agencia",
    "agencia")


    // Solicita a conta
    flow.addQuestion("[signUp]+++E agora o número da conta corrente",
    async(response,flow,bot) => {
        
        await flow.gotoThread("finalizacao")
        
    },
    "conta",
    "cc")


    // Finaliza bot
    flow.addMessage("[ending]+++Pronto! Sua requisição foi enviada com sucesso!\
    \n\n Você vai receber um SMS com o link para concluir a formalização. É só seguir por lá! Até mais", 
    "finalizacao")


    flow.after(async (results, bot) => {
        await bot.say("[FINISH]+++[Encerramento Padrão]")
        await bot.cancelAllDialogs();
    });
    controller.addDialog(flow);
};