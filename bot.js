//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the Raya bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');

// Import a platform-specific adapter for webex.

const { WebAdapter } = require('botbuilder-adapter-web');

// const { MongoDbStorage } = require('botbuilder-storage-mongodb');

// Load process.env values from .env file
require('dotenv').config();

let storage = null;
// if (process.env.MONGO_URI) {
//     storage = mongoStorage = new MongoDbStorage({
//         url : process.env.MONGO_URI,
//     });
// }

const adapter = new WebAdapter({});


const controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter: adapter,
    storage
});

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');

    controller.interrupts("PARAR" , "message", async (bot, message) => {
        await bot.say( {
            "type":"message",
            "section":"stop",
            "body":"Até a próxima! Se precisar, é só chamar." 
            });
        console.log("Encerramento")
        await bot.cancelAllDialogs();
    });

    controller.interrupts("SIGNUPFLOW","message",async(bot,message)=>{
        try{
            console.log(message.incoming_message.channelData.simulation)
            
            await bot.cancelAllDialogs();
            
            await bot.beginDialog("signUp",{"simulation":message.incoming_message.channelData.simulation});
        }
        catch{
            await bot.cancelAllDialogs();
            
            await bot.beginDialog("simulationError");
        }
    })


    controller.interrupts("SIMULATIONERROR","message",async(bot,message)=>{
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulationError");
    })

    controller.on("message", async (bot,message) => {  
        const nlu = require('./scripts/nlu.js');
        if(nlu.checkNegative(message.text)){
            await bot.say(
                {
                    "type":"message",
                    "section":"Subscription",
                    "body":"Agradeço sua atenção e desculpe pelo incômodo.\
                    \n\nPrecisando estou à disposição!",
                    "footer":"Aperte no botão abaixo",
                    "header":"Caso mude de ideia",
              
                    "buttons":[
                        {
                            "text": "Quero simular",
                            "payload": "simulacao"
                        },
                        {
                            "text": "Agora não",
                            "payload": "nao"
                        }
                    ],
                    
                    "media":
                        {
                            "contentType": "image|video|document",
                            "mediaURL":"",
                            "mediaID":"",
                            "caption":"",
                            "filename":""
                        }
                    },)
        }
        else{
            console.log("inicio")  
            await bot.beginDialog("inicio",{})
        }

    });

});



// controller.webserver.get('/', (req, res) => {

//     res.send(`This app is running Botkit ${ controller.version }.`);

// });


