
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
    flow.addQuestion({
        "type":"buttons",
        "section":"Subscription",
        "body":"Ótimo! Agora, vou precisar que você autorize o saque-aniversário dentro do aplicativo FGTS. Faça o cadastro no aplicativo, e depois é só optar pelo saque-aniversário.\
        \n\n1 - Abra o aplicativo do FGTS\
        \n2 - Aperta no botão Entrar no aplicativo\
        \n3 - Digite seu CPF e marque a caixinha Não sou um robô\
        \n4 - Informe sua senha e aperte em entrar\
        \n5 - Confirme seus dados pessoais\
        \n6 - Leia as cláusulas e aceite\
        \n5 - Selecione a opção Saque Aniversário do FGTS\
        \n6 - Leia com atenção os termos de adesão e aceite\
        \n7 - Escolha a Modalidade saque aniversário\
        \n\nQuando acabar, me chama para continuarmos.",
        "footer":"Clique na opção desejada",
        // "header":"",

        "buttons":[
            {
                "text": "Acabei",
                "payload": "sim"
            },
            {
                "text": "Preciso de ajuda",
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
        
    },
    "inscricaoSaqueAniversario",
    "subscription")

    flow.addQuestion({
        "type":"buttons",
        "section":"Subscription",
        "body":"Deu certo?",
        "footer":"Clique na opção desejada",
        // "header":"",

        "buttons":[
            {
                "text": "Sim",
                "payload": "sim"
            },
            {
                "text": "Não",
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
        if(nlu.checkAffirmative(response)) {
          await flow.gotoThread("subscriptionFgts")
        }
        else {
            await flow.gotoThread("subscriptionAgain")
        }
    },
    "inscricaoSaqueAniversario",
    "subscription")

    flow.addQuestion(
        {
            "type":"buttons",
            "section":"Subscription",
            "body":"Se preferir temos um passo a passo em vídeo, *basta clicar no link:* https://youtu.be/tuXPnjnu33Q \
            \n\nDepois que finalizar, me avisa se deu certo, por favor.",
            "footer":"Clique na opção desejada",
            // "header":"",
    
            "buttons":[
                {
                    "text": "Acabei",
                    "payload": "sim"
                },
                {
                    "text": "Preciso de ajuda",
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
        if(nlu.checkAffirmative(response)) {
          await flow.gotoThread("subscriptionFgts")
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "inscricaoSaqueAniversario",
    "subscriptionAgain")


    flow.addQuestion(
        {
            "type":"buttons",
            "section":"Subscription",
            "body":"Certo, estamos quase no fim! Agora, por favor *autorize o _Banco Pan_ a consultar o seu FGTS* dentro do app do FGTS.\
            \nSe tiver alguma dúvida, também tenho um passo-a-passo explicando:\
            \n\n1 - Abra o aplicativo do FGTS\
            \n2 - Aperta no botão *Entrar no aplicativo*\
            \n3 - Digite seu CPF e marque a caixinha *Não sou um robô*\
            \n4 - Informe sua senha e aperte em *entrar*\
            \n5 - Na tela inicial, seleciona a opção *autorizar bancos a consultarem seu FGTS*\
            \n6 - Selecione a opção *empréstimo saque aniversário*\
            \n7 - Selecione o *Banco Pan*\
            \n8 - Confirme no botão *Confirmar seleção*\
            \n\nDeu certo?",
            "footer":"Clique na opção desejada",
            // "header":"",
    
            "buttons":[
                {
                    "text": "Sim",
                    "payload": "sim"
                },
                {
                    "text": "Não",
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
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await flow.gotoThread("subscriptionFgtsAgain")
        }
    },
    "inscricaoConsultarFgts",
    "subscriptionFgts")
    
    flow.addQuestion(
        {
            "type":"buttons",
            "section":"Subscription",
            "body":"Então dê uma olhada no *passo-a-passo em vídeo* nesse link aqui: _https://youtu.be/B1GFwRNnI9U_ \
            \n\nDepois que finalizar, *me avisa aqui*, por favor",
            "footer":"Deu certo?",
            // "header":"",
    
            "buttons":[
                {
                    "text": "Consegui",
                    "payload": "Sim"
                },
                {
                    "text": "Preciso de ajuda",
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
        if(nlu.checkAffirmative(response)) {
        }
        else {
            await bot.beginDialog("agent-transfer")
        }
    },
    "inscricaoConsultarFgts",
    "subscriptionFgtsAgain")

    // flow.addQuestion(
    //     {
    //         "type":"message",
    //         "section":"Subscription",
    //         "body":"Conseguiu?",
    //         "footer":"Clique na opção desejada",
            
    
    //         "buttons":[
    //             {
    //                 "text": "Sim",
    //                 "payload": "sim"
    //             },
    //             {
    //                 "text": "Não",
    //                 "payload": "nao"
    //             }
    //         ],
            
    //         "media":
    //             {
    //                 "contentType": "image|video|document",
    //                 "mediaURL":"",
    //                 "mediaID":"",
    //                 "caption":"",
    //                 "filename":""
    //             }
    //         },
    // async(response,flow,bot) => {
       
    // },
    // "inscricaoConsultarFgts",
    // "subscriptionFgtsAgain")

    flow.after(async (vars, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulation",{"cpf":vars.cpf});
    });

    controller.addDialog(flow);
};