let home = document.getElementById("header")
let botaovoltar = document.getElementsByClassName("botaorecomecar")
let comecar = document.getElementById("botaojogar")
let inicio = document.getElementById("telainicial")
let jogo = document.getElementById("telastart")
let historico = document.getElementById("historicodisplay")
let percurso = document.getElementById("percurso")
let percursocont = document.getElementById("percursocontainer")
let escolhaA = document.getElementById("escolhaareia")
let escolhaB = document.getElementById("primpergunta")
let main = document.getElementById("main")
let jogocontainer = document.getElementById("jogo")
let guardarhistorico = document.getElementById("guardarhist")
let dados = []




escolhaA.onclick = function() {(buttonclick(this.id,this.innerText));}
escolhaB.onclick = function() {(buttonclick(this.id,this.innerText));}
home.onclick = function() {telainicio()}
for (let i = 0; i < botaovoltar.length; i++){botaovoltar[i].onclick = function() {telainicio()}}
comecar.onclick = function() {comecarjogo()}
guardarhistorico.onclick = function() {guardarhist()}


function telainicio(){
    window.location.reload(false)
}


function comecarjogo(){
    inicio.style.display = "none"
    jogo.style.display = "block"
    percursocont.style.display = "block"
}



function buttonclick(b,t) {
    questpercurso(b,t)
    d3.csv("./rochas.csv", function(rochas) {
        for(let i = 0; i < rochas.length; i++){
            if(rochas[i].escolha == b){
                rochafinal(b)
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


function questpercurso(b,t){
    d3.csv("./rochas.csv", function(rochas) {
    for(let i = 0; i < rochas.length; i++){
        if(rochas[i].escolha == b){
            adicionarfrase(b,t)

            let rochafinal = document.createElement("div")
            rochafinal.className = "percurso_rocha"
            let textorochaf = document.createElement("p")
            textorochaf.innerText = rochas[i].texto
            textorochaf.className = "percurso_texto"

            percurso.appendChild(rochafinal)
            rochafinal.appendChild(textorochaf)
            return 0
        }
    }
    adicionarfrase(b,t)
    })
}

function adicionarfrase(b,t){

    let percurso_int = document.createElement("div")
    percurso_int.className = "percurso_int"
    let textopercursoint = document.createElement("p")
    textopercursoint.innerText = t
    textopercursoint.className = "texto_percurso_int"

    let percurso_seta = document.createElement("div")
    percurso_seta.className = "percurso_seta"
    let fotoseta = document.createElement("img")
    fotoseta.src = "./Fotos/seta.png"
    fotoseta.alt = "seta"
    fotoseta.className = "fotoseta"


    percurso.appendChild(percurso_int)
    percurso.appendChild(percurso_seta)
    percurso_seta.appendChild(fotoseta)
    percurso_int.appendChild(textopercursoint)

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

            historicodiv(rochas[i].texto, rochas[i].foto, rochas[i].texto, rochas[i].link)

        }
    }
    })
}



function historicodiv(rocha,imagem,textonome,link) {
    let elhistorico = document.createElement("div")
    elhistorico.className = "rochahist"

    let fotorocha = document.createElement("img")
        fotorocha.src = imagem
        fotorocha.alt = rocha
        fotorocha.className = "fotorochahist"

    let nomerocha = document.createElement("p")
        nomerocha.innerText = rocha
        nomerocha.className = "nomerochahist"

    historico.prepend(elhistorico)
    elhistorico.appendChild(fotorocha)
    elhistorico.appendChild(nomerocha)

    sessionStorage.setItem("storedPage", historico.innerHTML)

    let obj = {}
    obj.rocha = textonome;
    obj.link = link;
    dados.push(obj)

    sessionStorage.setItem("dadoshistorico", JSON.stringify(dados))
}



function guardarhist(){
    let dadoshist = JSON.parse(sessionStorage.getItem("dadoshistorico")) 

    let csv = '';
    let header = Object.keys(dadoshist[0]).join(',');
    let valores = dadoshist.map(o => Object.values(o).join(',')).join('\n');

    csv += header + '\n' + valores;

    var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'WhichRocha_Histórico.csv';
        hiddenElement.click();
}



window.onload = function() {
    let storedPage = sessionStorage.getItem("storedPage");
    if(storedPage){
        let divContainer = document.getElementById("historicodisplay");
        divContainer.innerHTML = storedPage;
    }

    let dadoshist = JSON.parse(sessionStorage.getItem("dadoshistorico"))
    if(dadoshist){
        dados = dadoshist
    }
} 

