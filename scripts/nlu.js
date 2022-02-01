
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

module.exports.checkRate = function checkcheckRateAffirmative(response){
  console.log(response)
  if(response == ("1") || response == "2" || response == "3" || response == "4" || response == "5" || response == "6" || response == "7" || response == "8" || response == "9" || response == "10" || response == "0") {
      console.log(response.includes("nota"))
      console.log("rate")
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

module.exports.checkError = function checkError(response){
  response = response.toLowerCase()
  console.log(response)
  if(response.includes("voltar") || response == "errei" || response == "volta" || response == "volte" || response == "erro" || response == "retroceder" || response == "anterior" || response == "antes") {
      console.log(response.includes("voltar"))
      console.log("voltar")
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

module.exports.checkGender = function checkGender(name){
  name = name.toLowerCase()
  var listaHomem =["Bruno","Jorge", "Miguel", "Davi", "Gabriel", "Arthur", "Lucas", "Raphael", "Matheus", "Pedro", "Guilherme", "Gustavo", "Rafael", "Felipe", "Bernardo", "Enzo", "Nicolas", "Joao", "João Pedro", "Pedro Henrique", "Cauã", "Vitor", "Eduardo", "Daniel", "Henrique", "Murilo", "Vinicius", "Samuel", "Pietro", "João Vitor", "Leonardo", "Caio", "Heitor", "Lorenzo", "Isaac", "Lucca", "Thiago", "João Gabriel", "João", "Theo", "Bryan", "Carlos Eduardo", "Luiz Felipe", "Breno", "Emanuel", "Ryan", "Vitor Hugo", "Yuri", "Benjamin", "Erick", "Enzo Gabriel", "Fernando", "Joaquim", "André", "Ruan", "Tomás", "Francisco", "Rodrigo", "Igor", "Antonio", "Ian", "Luiz Otávio", "Juan", "João Guilherme", "Diogo", "Otávio", "Nathan", "Calebe", "Danilo", "Luan", "Luiz Henrique", "Kaique", "Alexandre", "João Miguel", "Iago", "Ricardo", "Raul", "Marcelo", "Julio César", "Cauê", "Benício", "Vitor Gabriel", "Augusto", "Pedro Lucas", "Luiz Gustavo", "Giovanni", "Renato", "Diego", "João Paulo", "Renan", "Luiz Fernando", "Anthony", "Lucas Gabriel", "Thales", "Luiz Miguel", "Henry", "Marcos Vinicius", "Kevin", "Levi", "Enrico", "João Lucas", "Hugo", "Luiz Guilherme", "Matheus Henrique"]
  var listaMulher = [ "Julia", "Sophia", "Isabella", "Maria Eduarda", "Manuela", "Giovanna", "Alice", "Laura", "Luiza", "Beatriz", "Mariana", "Yasmin", "Gabriela", "Rafaela", "Maria Clara", "Maria Luiza", "Ana Clara", "Isabelle", "Lara", "Ana Luiza", "Letícia", "Ana Julia", "Valentina", "Nicole", "Sarah", "Vitória", "Isadora", "Lívia", "Helena", "Ana Beatriz", "Lorena", "Clara", "Larissa", "Emanuelly", "Heloisa", "Marina", "Melissa", "Gabrielly", "Eduarda", "Maria Fernanda", "Rebeca", "Amanda", "Alícia", "Bianca", "Lavínia", "Fernanda", "Ester", "Carolina", "Emily", "Cecília", "Maria Júlia", "Pietra", "Ana Carolina", "Milena", "Marcela", "Laís", "Natália", "Maria", "Bruna", "Camila", "Luana", "Ana Laura", "Catarina", "Maria Vitória", "Maria Alice", "Olivia", "Agatha", "Mirella", "Sophie", "Stella", "Stefany", "Isabel", "Kamilly", "Elisa", "Luna", "Eloá", "Joana", "Mariane", "Bárbara", "Juliana", "Rayssa", "Alana", "Ana Sophia", "Ana Lívia", "Caroline", "Brenda", "Evelyn", "Débora", "Raquel", "Maitê", "Ana", "Nina", "Maria Sophia", "Maria Cecília", "Luiz", "Antonella", "Jennifer", "Betina", "Mariah", "Sabrina"]
  
  for(var i = 0; i<listaHomem.length; i++){
      if(name.includes(listaHomem[i].toLowerCase())){
          return "M"
      }
  }
  for(var i = 0; i<listaMulher.length; i++){
      if(name.includes(listaMulher[i].toLowerCase())){
          return "F"
      }
  }
  return false
}