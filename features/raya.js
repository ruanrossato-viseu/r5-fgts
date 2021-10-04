const simulacao = require("../../../Bot Testes/Bot Sabemi/sabemi-bot-af (2)/sabemi-bot-af/features/simulacao");

module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("inicio", controller);

    
    // Mensagem inicial, botão instalou ou não aplicativo FGTS
    flow.addAction("introducao")

    flow.addMessage("Olá, sou a Raya, assistente virtual da R5 Digital. Somos uma plataforma multi-bancária Online. Estou aqui para te ajudar a adiantar o saque do FGTS retido.", "introducao")

    flow.addMessage("Para garantir sua segurança e privacidade, seguimos as diretrizes da Lei geral de proteção de dados. Para saber mais, acesse o link", "introducao")

    flow.addQuestion("Você já tem o aplicativo oficial do FGTS instalado?",
    async(response, flow, bot) =>{
        if(response == "sim, já tenho") {
            await flow.gotoThread("appInstalado")
        }
        else {
            await flow.gotoThread("naoInstalado")
        }
    },
    "aplicativo",
    "introucao")


    // Usuários com o aplicativo não instalado
        flow.addMessage("Para instalar, clique em:\
    \n\nAndroid: link\
    \nApple: link\
    \n\nMe chame de novo, quando acabar de instalar", "naoInstalado")


    // Usuários com o aplicativo instalado, *Fazer o bot esperar 5 minutos e enviar esta mensagem
    flow.addQuestion("Ótimo, dá uma olhadinha na imagem abaixo para entender como fazer a inscrição no aplicativo\
    \n\n BANNER\
    \n\n Deu certo?",
    async(response,flow,bot) => {
        if(response == "Sim") {
            await flow.gotoThread("autorizacao")
        }
        else {
            await flow.gotoThread("especialista")
        }
    },
    "appinstalado")


    // Pergunta se conseguiu autorizar banco
    flow.addQuestion("Estamos quase lá! Agora você precisa autorizar os seguintes bancos a simularem as melhores condições para você. É só seguir o passo-a-passo a seguir\
    \n\n BANNER\
    \n\n Conseguiu?", 
    async(response,flow,bot) => {
        if(response == "Sim") {
            await flow.gotoThread("autorizacaoBanco")
        }
        else {
            await flow.gotoThread("especialista")
        }
    },"autorizacao")


    // Solicita CPF
    flow.addQuestion("Para fazer sua simulação, só preciso que escreva o seu CPF, por favor",
    async(response,flow,bot) => {
        if(isNumeric(response.length() == 11) ) {
            await flow.gotoThread("condicoes")
        }
        else {
            await flow.gotoThread("especialista")
        }
    }, "autorizacaoBanco")


    // Exibe condições
    flow.addQuestion("Consegui as seguintes condições:\
                    \n\n Banco A:\
                    \n - Valor: R$ XXXX\
                    \n - Parcelas: XXX\
                    \n\n Banco B:\
                    \n - Valor: R$ XXXX\
                    \n - Parcelas: XXX\
                    \n\n Banco C:\
                    \n - Valor: R$ XXXX\
                    \n - Parcelas: XXX",
                    async(response,flow,bot) => {
                        if(response == "Safra" || response == "C6") {
                            await flow.gotoThread("confirmaDados")
                        }
                        else {
                            await flow.gotoThread("especialista")
                        }
                    }, 
                    "bancoEscolhido",
                    "condicoes") 


    // Solicita CNH ou RG
    flow.addQuestion("Ótima escolha! Para concluir, precisamos confirmar algumas informações. É bem rapidinho\
    \n\n Para começar, preciso do número do seu RG ou CNH",
    async(response,flow,bot) => {
        if(isNumeric(response.length() == 11 || response.length() == 10) {
            await flow.gotoThread("solicitaDtNascimento")
        }
        else {
            await flow.gotoThread("confirmaDados")
        }
    }, 
    "rgCnh", 
    "confirmaDados")

    // Solicita data de nascimento
    flow.addQuestion("Agora preciso da sua data de nascimento, no formato dia/mês/ano.\
    \n Exemplo: 01/05/1970", 
    
    async(response,flow,bot) => {
        var regexAniversario = new RegExp(/(\d{2})[-.\/](\d{2})[-.\/](\d{4}$)/)
        if(response == regexAniversario.test(response)) {
            await flow.gotoThread("solicitaCep")
        }
        else {
            await flow.gotoThread("solicitaDtNascimento")
        }
    }, 
    "dataNascimento", 
    "solicitaDtNascimento")


    // Solciita CEP
    flow.addQuestion("Para cadastrar seu endereço,vou precisar do seu CEP, por favor:", 
    async(response,flow,bot) => {
        var regexCep = new RegExp(^\d{2}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?[\d]{3}\$)
        if(response == regexCep ) {
            await flow.gotoThread("solicitaNum")
        }
        else {
            await flow.gotoThread("solicitaCep")
        }
    },
    "cep",
    "solicitaCep")


    // Solicita número da casa
    flow.addQuestion("Identifiquei  a rua..., Bairro, Cidade, Estado.\
    \n Agora me diga o número do imóvel?", 
    async(response,flow,bot) => {
        if(isNumeric(response)) {
            await flow.gotoThread("perguntaComplemento")
        }
        else {
            await gotoThread("solicitaNum")
        }
    }, 
    "complemento",
    "solicitaComplemento")


    // Pergunta se tem complemento da casa 
    flow.addQuestion("E o complemento? Se não tiver nenhum, é só digitar 'nenhum'\
    \n\n Tem complemento?", 
    async(response,flow,bot) => {
        if(response == "Sim") {
            await flow.gotoThread("addComplemento")
        }
        else {
            await gotoThread()
        }
    },
    "banco",
    "perguntaComplemento")


    // Solicita complemento da casa
    flow.addQuestion("Informe o complemento",
    async(response,flow,bot) => {
        await flow.gotoThread("dadosBanco")
    })


    // Solicita o nome do banco
    flow.addQuestion("Para finalizar, preciso dos seus dados bancários\
    \n\n Sua conta é em qual banco?\
    \n Itau\
    \n Santander\
    \n Bradesco\
    \n Banco do Brasil\
    \n Caixa",
    async(response,flow,bot) => {
        await flow.gotoThread("agencia")
    },
    "banco",
    "dadosBanco")


    // Solicita a agência
    flow.addQuestion("Me passa o número da sua agência?",
    async(response,flow,bot) => {
        if(isNumeric(response)) {
            await flow.gotoThread("cc")
        }
        else {
            await gotoThread("agencia")
        }
    },
    "agencia",
    "agencia")


    // Solicita a conta
    flow.addQuestion("E agora o número da conta corrente",
    async(response,flow,bot) => {
        if(isNumeric(response)) {
            await flow.gotoThread("finalizacao")
        }
        else {
            await gotoThread("conta")
        }
    },
    "conta",
    "cc")


    // Finaliza bot
    flow.addMessage("Pronto! Sua requisição foi enviada com sucesso!\
    \n\n Você vai receber um SMS com o link para concluir a formalização. É só seguir por lá! Até mais", "cc")


    // Encaminha para o especialista/atendimento Humano
    flow.addQuestion("Precisa do apoio de um especialista?", 
    async(response,flow,bot) => {
        if(response == "Sim") {
            await flow.gotoThread("#ENCAMINHAR_ESPECIALISTA")
        }
        else {
            await bot.cancelAllDialogs();
        }
        
    },
    "especialista")
};