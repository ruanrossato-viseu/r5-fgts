// https://viacep.com.br/ws/01001000/json/



const process = require("process");
const { parse } = require("dotenv");
const axios = require("axios");
require("dotenv").config();



module.exports.checkCEP = async function checkCEP(cep){
    cep = cep.replace(".","").replace("-","")
    

    var config = {
            method: 'get',
            url: 'https://viacep.com.br/ws/'+cep+'/json/',
            headers: { 
                    'Content-Type': 'application/json'
            }
    };

    var addressInfo = await axios(config)
        .then((response) => {
            console.log(response.data)
            return(response.data)
        })
        .catch((error) => {
            return false
        });

    return addressInfo
}


// {
// 	"cep": "23970-000",
// 	"logradouro": "",
// 	"complemento": "",
// 	"bairro": "",
// 	"localidade": "Paraty",
// 	"uf": "RJ",
// 	"ibge": "3303807",
// 	"gia": "",
// 	"ddd": "24",
// 	"siafi": "5875"
// }