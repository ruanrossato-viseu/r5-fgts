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

    controller.interrupts("Sair" || "encerrar" || "cancelar" || "interromper" || "parar" || "cancela" || "para" || "sai" || "eliminiar" || "anular" || "não receber" , "message", async (bot, message) => {
        await bot.reply(message, "Até a próxima");
        await bot.cancelAllDialogs();
    });

    controller.interrupts("SIGNUPFLOW","message",async(bot,message)=>{
        await bot.cancelAllDialogs();
        await bot.beginDialog("signUp");
    })


    controller.interrupts("SIMULATIONERROR","message",async(bot,message)=>{
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulationError");
    })

    controller.on("message", async (bot,message) => {  
        
        console.log("inicio")  
        await bot.beginDialog("inicio",{
        });
    });

});



// controller.webserver.get('/', (req, res) => {

//     res.send(`This app is running Botkit ${ controller.version }.`);

// });


