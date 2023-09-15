const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const mensagemVitoria = document.querySelector("[data-winning-message]");
const mensagemDiv = document.querySelector("[data-message]");
const restartButton = document.querySelector("[data-messagem-button]");

let TurnoCirculo

const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]

function inicioJogo() {
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    }

    TurnoCirculo = false

    board.classList.remove("circle")
    board.classList.remove("x")

    if (TurnoCirculo) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
    mensagemDiv.classList.remove("mostrar-mensagem-vitoria");
}

function fimDeJogo(empate) {
    if (empate) {
        mensagemVitoria.innerText = 'Empate!'
    } else {
        mensagemVitoria.innerText = TurnoCirculo ? "Circulo venceu!" : "X venceu!"
    }

    mensagemDiv.classList.add("mostrar-mensagem-vitoria");
}

function checarVitoria(player) {
    // Verifica se o jogador ganhou a partida
    return combinacoes.some((combinacao) => {
        return combinacao.every((index) => {
            return cellElements[index].classList.contains(player);
        });
    });
}

function trocarTurno() {
    TurnoCirculo = !TurnoCirculo

    board.classList.remove("circle")
    board.classList.remove("x")

    if (TurnoCirculo) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}

function placeMark(cell, adicionar) {
    cell.classList.add(adicionar)
}

function handleClick(e) {
    //Colocar a marca (X ou Circulo)
    const cell = e.target;
    const classeAdicionada = TurnoCirculo ? "circle" : "x";

    placeMark(cell, classeAdicionada);

    //Checar por vitoria
    const vitoria = checarVitoria(classeAdicionada);
    if (vitoria) {
        fimDeJogo(false)
    }
    //Checar por empate

    //Mudar a marca
    trocarTurno()
}

inicioJogo()

restartButton.addEventListener("click", inicioJogo);





