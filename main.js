
//conjunto de objetos com os 6 personagens selecionáveis
const Mario =      { name: "Mario",            velocidade: 4,      destreza: 3,        força: 3 }
const Luigi =      { name: "Luigi",            velocidade: 3,      destreza: 4,        força: 4 }
const Peach =      { name: "Peach",            velocidade: 3,      destreza: 4,        força: 2 }
const Yoshi =      { name: "Yoshi",            velocidade: 2,      destreza: 4,        força: 3 }
const Bowser =     { name: "Bowser",           velocidade: 5,      destreza: 2,        força: 5 }
const DonkeyKong = { name: "Donkey Kong",      velocidade: 2,      destreza: 2,        força: 5 }
const goomba =     {name:  "goomba",           velocidade: 1,      destreza: 1,        força: 1 }


//abre o terminal para as perguntas, que nesse caso serão sobre quais dos 6 personagens serão escolhidos
import readline from 'readline/promises'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let player1 = ""
let player2 = ""

//atribui o objeto do personagem selecionado às variáveis player1 e player2
async function getCharacterOne() {
  let playerNumber = await rl.question('Qual é o PRIMEIRO jogador? \n1- Mario    \n2- Luigi  \n3- Peach   \n4- Bowser  \n5- Yoshi \n6- Donkey Kong\n\n')
  switch(playerNumber){ 
    case "1": player1 = Mario;      break
    case "2": player1 = Luigi;      break
    case "3": player1 = Peach;      break
    case "4": player1 = Bowser;     break
    case "5": player1 = Yoshi;      break
    case "6": player1 = DonkeyKong; break
 }
  return player1
}
async function getCharacterTwo() {
  let playerNumber = await rl.question('\nQual é o SEGUNDO jogador? \n1- Mario    \n2- Luigi  \n3- Peach   \n4- Bowser  \n5- Yoshi \n6- Donkey Kong \n\n')
  switch(playerNumber){ 
    case "1": player2 = Mario;      break
    case "2": player2 = Luigi;      break
    case "3": player2 = Peach;      break
    case "4": player2 = Bowser;     break
    case "5": player2 = Yoshi;      break
    case "6": player2 = DonkeyKong; break

 }
  rl.close()
  return player2
}
//o terminal é fechado, e as funções retornam player1 e player2 com seus respectivos objetos dentro
//recebem o valor fora da função
player1 = await getCharacterOne()
player2 = await getCharacterTwo()

if(player1.name == undefined) { player1 = goomba}
if(player2.name == undefined) { player2 = goomba}


//gera a mesagem de início quando player1 e player2 tiverem seus valores atribuídos. Chama a função roadMaker()
console.log(`\nOs jogadores são ${player1.name} e ${player2.name}!\n`)
console.log(`\n 🏁🚦🏎️  Começa a corrida entre ${player1.name} e ${player2.name}! \n ------------------------------------------------ \n`)
roadMaker()

//diferente da versão do Felipão, aqui os pontos estão em variáveis, e não em atributos
let points1 = 0
let points2 = 0

//função que faz basicamente tudo
async function roadMaker(){

    //loop que repete as rodadas 5 vezes
    for( let round = 1 ; round <= 5 ; round++ ){

        console.log(`🏁 Começa a ${round}° rodada`)
        //escolhe aleatoriamente entre 1 e 3
        let roadBlock = Math.floor(Math.random() * 3 ) + 1
        let roadType = ""
        let abilityTested = ""
        
        //substitui 1, 2 e 3 por RETA, CURVA e LUTA (luta no lugar de confronto para que fosse possível reaproveitar a mesma string)
        switch(roadBlock){
            case 1: roadType = "RETA"  ; abilityTested = "VELOCIDADE" ; break
            case 2: roadType = "CURVA" ; abilityTested = "DESTREZA"   ; break
            case 3: roadType = "LUTA"  ; abilityTested = "FORÇA"      ; break
        }
        console.log(`Os corredores se aproximam de uma ${roadType}! Eles terão suas ${abilityTested}S testadas!`)

        //chama a função que roda os dados, e coloca o resultado em uma variável
        let diceResultOne = await rollDice()
        let diceResultTwo = await rollDice()
      
        //cria as variáveis que guqrdam a vantagem dos personagens (velocidade, destreza e força) para serem printadas
        let advantage1
        let advantage2

        switch(abilityTested){
            case "VELOCIDADE": advantage1 = player1.velocidade; advantage2 = player2.velocidade; break
            case "DESTREZA":   advantage1 = player1.destreza  ; advantage2 = player2.destreza  ; break
            case "FORÇA":      advantage1 = player1.força     ; advantage2 = player2.força     ; break
        }

        //calcula o valor final da rodada
        let finalValueOne = diceResultOne + advantage1
        let finalValueTwo = diceResultTwo + advantage2

        console.log(`🎲 ${player1.name} rodou um dado de ${abilityTested} e o tirou ${diceResultOne}. Somando o bônus +${advantage1}, O valor total foi ${finalValueOne}`)
        console.log(`🎲 ${player2.name} rodou um dado de ${abilityTested} e o tirou ${diceResultTwo}. Somando o bônus +${advantage2}, O valor total foi ${finalValueTwo}`)
        

        //printa quem ganhou a rodada, ou se foi empate. Aqui, a LUTA usa a mesma string que RETA e CURVA.
       if (finalValueOne == finalValueTwo ){console.log(`A rodada foi um empate\n`)

         }else if(finalValueOne > finalValueTwo){
                 if(roadType == "RETA" || roadType == "CURVA") {
                 	console.log(`${player1.name} venceu a rodada e ganhou 1 ponto\n`)
        		      points1++
                    
                     } else { 
                      console.log(`${player1.name} ganhou a rodada e tirou 1 ponto de ${player2.name}\n`)
                      if(points2 > 0){ points2--}
                     }

                      }else {
                         if(roadType == "RETA" || roadType == "CURVA") { 
                          console.log(`${player2.name} venceu a rodada e ganhou 1 ponto\n`)
                          points2++}
                             else {
                               console.log(`${player2.name} ganhou a rodada e tirou 1 ponto de ${player1.name}\n`)
                               if(points1 > 0){points1--} } }
            
            
    }
    //printa o placar final
    console.log(`A corrida chega ao fim! O placar final foi ${player1.name}: ${points1} e ${player2.name}: ${points2}`)

    //printa quem ganhou, ou se foi empate
    if(points1 == points2){ console.log(`🏁 A corrida terminou com um empate`) }else
        if(points1 > points2) { console.log(`🏁 ${player1.name} venceu a corrida`) } else {console.log(`🏁 ${player2.name} venceu a corrida`) }

    console.log(`\n\n`)
}
//função que roda os dados
async function rollDice() {   return Math.floor( Math.random() * 6 ) + 1   }

 
