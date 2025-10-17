
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
