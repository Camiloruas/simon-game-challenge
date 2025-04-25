

// // Cria um array com as cores disponíveis no jogo (como os botões do jogo da memória)
// const corBotoes = ["red", "blue", "green", "yellow"];

// // Cria um array vazio que vai armazenar a sequência de cores geradas pelo jogo
// const padraoJogo = [];

// // Função que gera um número aleatório entre 0 e 3 (índice das cores no array corBotoes)
// function gerarIndiceAleatorio() {
//     let indice = Math.random() * 4; // Gera um número decimal entre 0 e 4 (não incluso)
//     indice = Math.floor(indice);   // Arredonda o número para baixo, ficando entre 0 e 3
//     return indice;                 // Retorna esse número
// }

// // Chama a função para gerar um número aleatório e armazena esse valor na variável
// const escolhaCorAleatoria = gerarIndiceAleatorio();

// // Usa o número gerado para escolher uma cor dentro do array corBotoes
// const corEscolhida = corBotoes[escolhaCorAleatoria];

// // Adiciona essa cor escolhida ao array padraoJogo, construindo a sequência do jogo
// padraoJogo.push(corEscolhida);



// // Espera todo o conteúdo da página carregar antes de rodar o código
// $(document).ready(function() {





//     // Cria um objeto que associa cada cor ao seu respectivo áudio
// const sons = {
//     red: new Audio("sounds/red.mp3"),
//     blue: new Audio("sounds/blue.mp3"),
//     green: new Audio("sounds/green.mp3"),
//     yellow: new Audio("sounds/yellow.mp3"),
//     wrong: new Audio("sounds/wrong.mp3")
//   };



//   function tocarSom(cor) {
//     sons[cor].play();
//   }
  
  
//     // // Função responsável por tocar o som de acordo com a cor passada como parâmetro
//     // function tocarSom(cor) {
//     //     // Cria um novo objeto de áudio, indicando o caminho do arquivo dentro da pasta "sounds"
//     //     const caminhoAudio = "sounds/" + cor + ".mp3"; // Monta o caminho correto do som
//     //     const audio = new Audio(caminhoAudio); // Cria o objeto de áudio
//     //     audio.play(); // Toca o som
//     // }

//     // Adiciona um ouvinte de evento de clique para todos os elementos com a classe "btn"
//     $(".btn").click(function() {

//         // Quando um botão é clicado, pega o ID do botão clicado
//         // (O ID será "green", "red", "yellow" ou "blue")
//         const corClicada = $(this).attr("id");

//         // Chama a função para tocar o som relacionado à cor clicada
//         tocarSom(corClicada);

//         // Chama a função que aplica o efeito de clique visual no botão
//         aplicarEfeitoPressionado(corClicada);

//     });

//     // Função responsável por aplicar o efeito de "pressionado" no botão clicado
//     function aplicarEfeitoPressionado(cor) {

//         // Adiciona a classe "pressed" no botão com o ID correspondente
//         $("#" + cor).addClass("pressed");

//         // Após 100 milissegundos (0,1 segundos), remove a classe para voltar ao normal
//         setTimeout(function() {
//             $("#" + cor).removeClass("pressed");
//         }, 100);
//     }

// });


  // Array de cores disponíveis
const corBotoes = ["red", "blue", "green", "yellow"];

// Sequência gerada pelo jogo
const padraoJogo = [];

// Sequência de cores clicadas pelo jogador
const padraoJogador = [];

// Estado do jogo
let comecou = false;
let nivel = 0;

// Sons para cada cor
const sons = {
  red: new Audio("sounds/red.mp3"),
  blue: new Audio("sounds/blue.mp3"),
  green: new Audio("sounds/green.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  wrong: new Audio("sounds/wrong.mp3")
};

// Quando o jogador pressiona uma tecla para começar
$(document).keydown(function() {
  if (!comecou) {
    $("#level-title").text("Level " + nivel);
    proximoPasso();
    comecou = true;
  }
});

// Quando o jogador clica em um botão colorido
$(".btn").click(function() {
  const corClicada = $(this).attr("id");
  padraoJogador.push(corClicada);
  tocarSom(corClicada);
  aplicarEfeitoPressionado(corClicada);
  checarResposta(padraoJogador.length - 1);
});

// Função que toca o som
function tocarSom(cor) {
  sons[cor].play();
}

// Função que aplica o efeito de botão pressionado
function aplicarEfeitoPressionado(cor) {
  $("#" + cor).addClass("pressed");
  setTimeout(function() {
    $("#" + cor).removeClass("pressed");
  }, 100);
}

// Função para gerar o próximo botão na sequência
function proximoPasso() {
  padraoJogador.length = 0; // Limpa os cliques do jogador para o novo nível
  nivel++;
  $("#level-title").text("Level " + nivel);

  const indiceAleatorio = Math.floor(Math.random() * 4);
  const corEscolhida = corBotoes[indiceAleatorio];
  padraoJogo.push(corEscolhida);

  // Anima o botão piscando
  $("#" + corEscolhida).fadeOut(100).fadeIn(100);

  tocarSom(corEscolhida);
}

// Função para checar se o jogador clicou certo
function checarResposta(indiceAtual) {
  if (padraoJogador[indiceAtual] === padraoJogo[indiceAtual]) {
    if (padraoJogador.length === padraoJogo.length) {
      setTimeout(proximoPasso, 1000);
    }
  } else {
    sons["wrong"].play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    iniciarNovoJogo();
  }
}

// Função para reiniciar o jogo
function iniciarNovoJogo() {
  nivel = 0;
  padraoJogo.length = 0;
  comecou = false;
}
