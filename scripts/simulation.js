
const process = require("process");
const { parse } = require("dotenv");
const axios = require("axios");
require("dotenv").config();



module.exports.simulate = async function simulate(phoneNumber,cpf){
    console.log("Phone Number"+phoneNumber+"  CPF"+cpf)
    // cep = cep.replace(".","").replace("-","")
    //
    // var config = {
    //         method: 'get',
    //         url: 'https://viacep.com.br/ws/'+cep+'/json/',
    //         headers: { 
    //                 'Content-Type': 'application/json'
    //         },
    //         data : data
    // };

    // var success = false;
    // var requestCounter = 0;
    // let addressInfo = false;

    // while(!success && requestCounter < 3){
    //     addressInfo = await axios(config)
    //     .then((response) => {
    //         console.log(response.data)
    //         if(response.data.sucesso){
    //             success = true;
    //             return response.data;
    //         }            
    //         else{
    //             return {sucesso:false};
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         return {sucesso:false};
    //     });

    //     await new Promise(resolve => setTimeout(resolve, 1000));
        
    //     requestCounter+=1
    // }

    // return addressInfo
}