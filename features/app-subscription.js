
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("app-subscription", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("subscription")
    flow.before("subscription",async(flow,bot)=>{
        try{
            if(flow.vars.step=="autorizacaoBanco"){
                await flow.gotoThread("subscriptionFgts")
            }
        }
        catch{
                
        }
        
    });

    
    // Usuários com o aplicativo instalado, *Fazer o bot esperar 5 minutos e enviar esta mensagem
    flow.addQuestion("[Subscription]+++Ótimo! Agora, vou precisar que você *autorize o saque-aniversário* dentro do aplicativo FGTS. Faça o cadastro no aplicativo, e depois é só optar pelo saque-aniversário.\
    \n\n1 - Abra o aplicativo do FGTS\
    \n2 - Aperta no botão *Entrar no aplicativo*\
    \n3 - Digite seu CPF e marque a caixinha *Não sou um robô*\
    \n4 - Informe sua senha e aperte em *entrar*\
    \n5 - Confirme seus dados pessoais\
    \n6 - Leia as cláusulas e aceite\
    \n5 - Selecione a opção *Saque Aniversário do FGTS*\
    \n6 - Leia com atenção os termos de adesão e aceite\
    \n7 - Escolha a *Modalidade saque aniversário*\
    \n\nQuando acabar, me avisa. *Deu certo*?",
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
          await flow.gotoThread("subscriptionFgts")
        }
        else {
            await flow.gotoThread("subscriptionAgain")
        }
    },
    "inscricaoSaqueAniversario",
    "subscription")

    flow.addQuestion("[Subscription]+++Não conseguiu seguir o passo a passo para *autorizar o saque-aniversário*?\
    \n Se preferir temos um passo a passo em vídeo, *basta clicar no link* https://youtu.be/tuXPnjnu33Q \
    \n\n Depois que finalizar, me avisa se deu certo por favor.",
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
          await flow.gotoThread("subscriptionFgts")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "inscricaoSaqueAniversario",
    "subscriptionAgain")

    flow.addQuestion("[Subscription]+++Certo! Agora, por favor *autorize o banco escolhido consultar o seu FGTS* dentro do mesmo aplicativo.\
    \nSe tiver alguma dúvida, também tenho um passo-a-passo explicando.\
    \n\n1 - Abra o aplicativo do FGTS\
    \n2 - Aperta no botão *Entrar no aplicativo*\
    \n3 - Digite seu CPF e marque a caixinha *Não sou um robô*\
    \n4 - Informe sua senha e aperte em *entrar*\
    \n5 - Na tela inicial, seleciona a opção *autorizar bancos a consultarem seu FGTS*\
    \n6 - Selecione a opção *empréstimo saque aniversário*\
    \n7 - Selecione o banco C6\
    \n8 - Confirme no botão *Confirmar seleção*\
    \n\nDeu certo?",
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await flow.gotoThread("subscriptionFgtsAgain")
        }
    },
    "inscricaoConsultarFgts",
    "subscriptionFgts")
    
    flow.addQuestion("[Subscription]+++Conseguiu seguir o passo a passo para *autorizar o banco para consultar seu FGTS*?\
    \n Caso não, *temos o passo-a-passo em vídeo nesse link aqui*: https://youtu.be/B1GFwRNnI9U \
    \n\n Depois que finalizar, *me avisa se deu certo* por favor. Conseguiu?",
    async(response,flow,bot) => {
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "inscricaoConsultarFgts",
    "subscriptionFgtsAgain")

    flow.after(async (vars, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulation",{"cpf":vars.cpf});
    });

    controller.addDialog(flow);
};