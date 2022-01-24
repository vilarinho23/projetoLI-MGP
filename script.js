let home = document.getElementById("header")
let botaovoltar = document.getElementsByClassName("botaorecomecar")
let comecar = document.getElementById("botaojogar")
let inicio = document.getElementById("telainicial")
let jogo = document.getElementById("telastart")
let historico = document.getElementById("historicodisplay")
let percurso = document.getElementById("percurso")
let escolhaA = document.getElementById("escolhaareia")
let escolhaB = document.getElementById("primpergunta")
let main = document.getElementById("main")
let jogocontainer = document.getElementById("jogo")
let guardarhistorico = document.getElementById("guardarhist")





escolhaA.onclick = function() {(buttonclick(this.id));}
escolhaB.onclick = function() {(buttonclick(this.id));}
home.onclick = function() {telainicio()}
for (let i = 0; i < botaovoltar.length; i++){botaovoltar[i].onclick = function() {telainicio()}}
comecar.onclick = function() {comecarjogo()}
guardarhistorico.onclick = function() {cu()}


function telainicio(){
    window.location.reload(false)
}


function comecarjogo(){
    inicio.style.display = "none"
    jogo.style.display = "block"
}



function buttonclick(b) {
    d3.csv("./rochas.csv", function(rochas) {
        for(let i = 0; i < rochas.length; i++){
            if(rochas[i].escolha == b){
                rochafinal(b)
                console.log("1")
                return 0
            }
        }
        proximaquestao(b)
    })
}

function proximaquestao(b){
    d3.csv("./perguntas.csv", function(p) {
        let pid = 0
        for(let i = 0; i < p.length; i++){
            if(p[i].question_id == b){
                pid = p[i].id
                for(let i = 0; i < p.length; i++){
                    if(p[i].parent_id == pid){
                        escolhaA.innerText = p[i].texto
                        escolhaB.innerText = p[i+1].texto
                        escolhaA.setAttribute("id",p[i].question_id)
                        escolhaB.setAttribute("id",p[i+1].question_id)
                        return 0
                    }
                }
            }
        }
    })
}



function rochafinal(b){
    jogo.style.display = "none"

    d3.csv("./rochas.csv", function(rochas) {
    for(let i = 0; i < rochas.length; i++){
        if(rochas[i].escolha == b){

            let rochafinal = document.createElement("div")
            rochafinal.className = "rocha"
            rochafinal.id = rochas[i].rocha
            let atuarocha = document.createElement("p")
            atuarocha.innerText = "A SUA ROCHA É"
            atuarocha.className = "atuarocha"

            let fotorocha = document.createElement("img")
            fotorocha.src = rochas[i].foto
            fotorocha.alt = rochas[i].rocha
            fotorocha.className = "fotorochafin"

            let nomerocha = document.createElement("p")
            nomerocha.innerText = rochas[i].texto
            nomerocha.className = "nomerocha"

            let botaorecomecar = document.createElement("div")
            botaorecomecar.className = "botaorecomecar"
            botaorecomecar.style.marginTop = "40px"
            botaorecomecar.onclick = function() {telainicio()}
            let textorecomecar = document.createElement("p")
            textorecomecar.innerText = "RECOMEÇAR JOGO"

            jogocontainer.appendChild(rochafinal)
            rochafinal.appendChild(atuarocha)
            rochafinal.appendChild(fotorocha)
            rochafinal.appendChild(nomerocha)
            rochafinal.appendChild(botaorecomecar)
            botaorecomecar.appendChild(textorecomecar)

            historicodiv(rochas[i].texto, rochas[i].foto)

        }
    }
    })
}



function historicodiv(rocha,imagem) {
    let elhistorico = document.createElement("div")
    elhistorico.className = "rochahist"

    let fotorocha = document.createElement("img")
        fotorocha.src = imagem
        fotorocha.alt = rocha
        fotorocha.className = "fotorochahist"

    let nomerocha = document.createElement("p")
        nomerocha.innerText = rocha
        nomerocha.className = "nomerochahist"

    historico.appendChild(elhistorico)
    elhistorico.appendChild(fotorocha)
    elhistorico.appendChild(nomerocha)

    sessionStorage.setItem("storedPage", historico.innerHTML);
}

function cu(){
    let storedPage = sessionStorage.getItem("storedPage");
    console.log(storedPage)
}

window.onload = function() {
    let storedPage = sessionStorage.getItem("storedPage");
    if(storedPage){
        let divContainer = document.getElementById("historicodisplay");
        divContainer.innerHTML = storedPage;
    }
} 

