var palavraFiltro = null
var palavra = null
var vidas = 5

function prepararJogo(){
    
    vidas = 5
    document.getElementById("forca").src = `imgs/forca-5-vidas.png`
    var tema = document.getElementById("temas").value
    document.getElementById("placeholderPalavra").innerHTML = ""

    var tecla = document.querySelectorAll(".tecla")
    for (let index = 0; index < tecla.length; index++) {
        tecla[index].disabled = false   
        tecla[index].classList.remove("certo")
    }

    gerarPalavra(tema)
}

function gerarPalavra(tema){
    fetch("https://raw.githubusercontent.com/Felipe-Gabriel-Souza-Goncalves/api_jogo-da-forca/refs/heads/main/palavras.json")
    .then(response => response.json())
    .then(dados =>{
        var index = Math.floor(Math.random()*dados.temas[tema].length)
        palavra = dados.temas[tema][index].palavra.split("")
        palavraFiltro = dados.temas[tema][index].palavra_filtro.split("")

        for(let i = 0; i<palavra.length; i++){
            var u = document.createElement("u")
            u.classList.add("letra")
            u.innerHTML = "&nbsp;&nbsp;&nbsp;"

            document.getElementById("placeholderPalavra").appendChild(u)
        }
    })
}

function mandarLetra(letra, button){
    var existeLetra = false
    var u = document.querySelectorAll("u")

    for(let l = 0; l< palavraFiltro.length; l++){
        if(letra == palavraFiltro[l]){
            existeLetra = true
            u[l].innerHTML = palavra[l]
        }
    }
    correcao(existeLetra, button)
}

function correcao(existeLetra, e){
    if(existeLetra){
        e.classList.add("certo")
        e.disabled = true
    } else{
        e.disabled = true
        vidas--
        document.getElementById("forca").src = `imgs/forca-${vidas}-vidas.png`

    }
    if(vidas == 0){
        alert("VOCê PERDEU O JOGO!")
        document.getElementById("teclado").style.display= "none"
    }
}