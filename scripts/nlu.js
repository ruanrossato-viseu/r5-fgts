
const process = require("process");
const { parse } = require("dotenv");
require("dotenv").config();



module.exports.checkAffirmative = function checkAffirmative(response){
    response = response.toLowerCase()
    console.log(response)
    if(response.includes("sim") || response == "s" || response == "tenho" || response == "uhum" || response == "ok") {
        console.log(response.includes("sim"))
        console.log("affirmative")
        return true
    }

    else{
        return false
        // if(/*google ai reconhece Positivo*/){
        //     return true
        // }
        // else{
        //     return false
        // }
    }
}


module.exports.checkNegative =  function checkNegative(response){
    if(response.includes("não") || response == "n"|| response.includes("nao")) {
        return true
    }
    else{
        return false
        // if(false /*google ai reconhece Positivo*/){
        //     return true
        // }
        // else{
        //     return false
        // }
    }
}