//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the botDev bot.

// Import Botkit's core features
const { Botkit } = require('botkit');

// Import a platform-specific adapter for web.

const { WebAdapter } = require('botbuilder-adapter-web');

// Load process.env values from .env file
require('dotenv').config();

let storage = null;


const adapter = new WebAdapter({});


const controller = new Botkit({
    webhook_uri: '/api/messages',

    adapter: adapter,

    storage
});


// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
    console.log("\n========================================== \
        \n\nSabemi Bot is Running\n")
    console.log(String(moment()))
    console.log("\n==========================================")

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');

    controller.on("message", async (bot,message) => {  
        
        console.log("Início")  
        await bot.beginDialog("intro",{
        });
    }); 

});





