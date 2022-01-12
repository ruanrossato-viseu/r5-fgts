
const process = require("process");
const { parse } = require("dotenv");
require("dotenv").config();



module.exports.checkAffirmative = async function checkAffirmative(response){
    response = response.toLowerCase()
    if(response.includes("sim") || response == "s" || response == "tenho" || response == "uhum" || response == "deu") {
        return true
    }
    else{
        if(false /*google ai reconhece Positivo*/){
            return true
        }
        else{
            return false
        }
    }
}


module.exports.checkNegative = async function checkNegative(response){
    if(response.includes("não") || response == "n"|| response.includes("nao")) {
        return true
    }
    else{
        if(false /*google ai reconhece Positivo*/){
            return true
        }
        else{
            return false
        }
    }
}