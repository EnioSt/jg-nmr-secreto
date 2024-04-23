//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do numero secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function mensagemInicial(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', `Escolha um número entre 1 e ${numeroLimite}`);
    exibirTexto('h2', '');
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value
    if (chute == numeroSecreto) {

        exibirTexto('h1', `VOCÊ ACERTOU!!!`);
        exibirTexto('h2', `O NÚMERO SECRETO É ${numeroSecreto}`)
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Voce acertou em ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
        let imagem = document.querySelector('img');
        imagem.src =  './img/robot.png';
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTexto('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}


function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
    let imagem = document.querySelector('img');
    imagem.src =  './img/ia.png';
}
