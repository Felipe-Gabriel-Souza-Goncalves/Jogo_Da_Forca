var palavraFiltro = null;
var palavra = null;
var vidas = 5;

function prepararJogo() {
    document.getElementById("teclado").style.display = "block";
    vidas = 5;
    document.getElementById("forca").src = `imgs/forca-5-vidas.png`;
    
    var tema = document.getElementById("temas").value;
    document.getElementById("placeholderPalavra").innerHTML = "";

    var teclas = document.querySelectorAll(".tecla");
    teclas.forEach(tecla => {
        tecla.disabled = false;
        tecla.classList.remove("certo");
    });

    gerarPalavra(tema);
}

function gerarPalavra(tema) {
    fetch("https://raw.githubusercontent.com/Felipe-Gabriel-Souza-Goncalves/api_jogo-da-forca/refs/heads/main/palavras.json")
        .then(response => response.json())
        .then(dados => {
            var index = Math.floor(Math.random() * dados.temas[tema].length);
            palavra = dados.temas[tema][index].palavra.split("");
            palavraFiltro = dados.temas[tema][index].palavra_filtro.split("");

            var placeholder = document.getElementById("placeholderPalavra");
            placeholder.innerHTML = ""; // Limpar antes de preencher

            for (let i = 0; i < palavra.length; i++) {
                if (palavra[i] === " ") { // Corrigido: verificar espaço com " "
                    const span = document.createElement("span");
                    span.classList.add("espaco");
                    span.innerHTML = "&nbsp;&nbsp;&nbsp;";
                    placeholder.appendChild(span);
                } else {
                    const u = document.createElement("u");
                    u.classList.add("letra");
                    u.innerHTML = "&nbsp;&nbsp;&nbsp;";
                    placeholder.appendChild(u);
                }
            }
        })
        .catch(error => console.error("Erro ao carregar as palavras:", error));
}

function mandarLetra(letra, button) {
    var existeLetra = false;
    var uElements = document.querySelectorAll("u");

    var diff = 0
    for (let i = 0; i < palavraFiltro.length; i++) {
        if(palavraFiltro[i] == " "){
            diff ++
            continue
        }

        if (letra.toLowerCase() === palavraFiltro[i].toLowerCase()) {
            existeLetra = true;
            uElements[i-diff].innerHTML = palavra[i];
        }
    }

    correcao(existeLetra, button);
}

function correcao(existeLetra, button) {
    if (existeLetra) {
        button.classList.add("certo");
        button.disabled = true;
    } else {
        button.disabled = true;
        vidas--;
        document.getElementById("forca").src = `imgs/forca-${vidas}-vidas.png`;
    }

    if (vidas === 0) {
        alert("VOCÊ PERDEU O JOGO!");
        document.getElementById("teclado").style.display = "none";
    }

    ganhar();
}

function ganhar() {
    var uElements = document.querySelectorAll("u");
    for (let i = 0; i < uElements.length; i++) {
        if (uElements[i].innerHTML === "&nbsp;&nbsp;&nbsp;") {
            return; // Se ainda houver espaço em branco, o jogo continua
        }
    }

    alert("PARABÉNS!!!\nVidas restantes: " + vidas);
    document.getElementById("teclado").style.display = "none";
}
