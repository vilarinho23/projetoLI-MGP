let home = document.getElementById("header")
let botaovoltar = document.getElementsByClassName("botaorecomecar")
let recomecar = document.getElementById("botaorecomecar")
let comecar = document.getElementById("botaojogar")
let inicio = document.getElementById("telainicial")
let jogo = document.getElementById("telastart")
let historico = document.getElementById("historico")
let percurso = document.getElementById("percurso")
let escolhaA = document.getElementById("escolhaareia")
let escolhaB = document.getElementById("escolhaB")
let rocha11 = document.getElementById("areia2")
let main = document.getElementById("main")


const chave = {
    'A Rocha é constituída por elementos soltos.': 'Areia',

    'A Rocha é constituída por elementos unidos.': {
    
        'A Rocha tem aspeto laminado.': 'Xisto',
        
        'A Rocha tem aspeto não laminado.': {
        
            'A Rocha cheira a barro quando cortada.' : {
            
            		'A Rocha faz efervescência em contacto com ácidos.' : "Marga",
            		'A Rocha não faz efervescência em contacto com ácidos.' : "Argila"
        				},
                
            'A Rocha não cheira a barro quando cortada.' : {
            
            		'A Rocha faz efervescência em contacto com ácidos.' : {
            
            				'A Rocha tem aspeto compacto (sem cristais). ' : "Calcário",
            				'A Rocha tem cristais visíveis.' : "Mármore"
        						},
            		'A Rocha não faz efervescência em contacto com ácidos.' : {
            
            				'A Rocha tem cor clara e é constituída por minerais distintos.' : "Granito",
            				'A Rocha tem cor escura e é constituída por minerais distintos.' : "Gabro"
        						},
        				},
        }
    }
};
const chaveid = {
    'escolhaareia': 'areia1',

    'escolhaB': {
    
        'escolhaxisto': 'xisto1',
        
        'escolhaB': {
        
            'escolhaA' : {
            
            		'escolhamarga' : "marga1",
            		'escolhaargila' : "argila1"
        				},
                
            'escolhaB' : {
            
            		'escolhaA' : {
            
            				'escolhacalcario' : "calcario1",
            				'escolhamarmore' : "marmore1"
        						},
            		'escolhaB' : {
            
            				'escolhagranito' : "granito1",
            				'escolhagabro' : "gabro1"
        						},
        				},
        }
    }
};

const rochas = [  
	["escolhaareia", "areia", "AREIA", "./Fotos/areia.png"],
	["escolhaxisto", "xisto", "XISTO", "./Fotos/xisto.png"],
	["escolhamarga", "marga", "MARGA", "./Fotos/marga.png"],
    ["escolhaargila", "argila", "ARGILA", "./Fotos/argila.png"],
    ["escolhacalcario", "calcario", "CALCÁRIO", "./Fotos/calcario.png"],
    ["escolhamarmore", "marmore", "MARMORE", "./Fotos/marmore.png"],
    ["escolhagranito", "granito", "GRANITO", "./Fotos/granito.png"],
    ["escolhagabro", "gabro", "GABRO", "./Fotos/gabro.png"],
];

let st = chave;
let stid = chaveid;





escolhaA.onclick = function() {(buttonclick(this.innerText, this.id));}
escolhaB.onclick = function() {(buttonclick(this.innerText, this.id));}
home.onclick = function() {telainicio()}
for (let i = 0; i < botaovoltar.length; i++){botaovoltar[i].onclick = function() {telainicio()}}
comecar.onclick = function() {comecarjogo()}


function telainicio(){
    window.location.reload(false)
}



function comecarjogo(){
    inicio.style.display = "none"
    jogo.style.display = "block"
}



function buttonclick(v, b) {
        function procurarrocha(){
            for(let i = 0; i < rochas.length; i++){
                if(rochas[i][0] == b){
                rochafinal(b)
                return "rocha encontrada"
                }
            }
            escolhaA.innerText = (Object.keys(st[v])[0]);
            escolhaB.innerText = (Object.keys(st[v])[1]);
            escolhaA.setAttribute("id",Object.keys(stid[b])[0]);
            escolhaB.setAttribute("id",Object.keys(stid[b])[1]);
            st = st[v];
            stid = stid[b];
            return "rocha não encontrada"
        }
        console.log(procurarrocha())
}


function rochafinal(b){
    jogo.style.display = "none"
    historico.style.marginTop = "70px"

    for(i=0;i<rochas.length;i++){
        if(rochas[i][0] == b){

            let rochafinal = document.createElement("div")
            rochafinal.className = "rocha"
            rochafinal.id = rochas[i][1]
            let atuarocha = document.createElement("p")
            atuarocha.innerText = "A SUA ROCHA É"
            atuarocha.className = "atuarocha"

            let fotorocha = document.createElement("img")
            fotorocha.src = rochas[i][3]
            fotorocha.alt = rochas[i][1]
            fotorocha.className = "fotorochafin"

            let nomerocha = document.createElement("p")
            nomerocha.innerText = rochas[i][2]
            nomerocha.className = "nomerocha"

            let botaorecomecar = document.createElement("div")
            botaorecomecar.className = "botaorecomecar"
            botaorecomecar.id = "botaorecomecar"

            let textorecomecar = document.createElement("p")
            textorecomecar.innerText = "RECOMEÇAR JOGO"

            main.prepend(rochafinal)
            rochafinal.appendChild(atuarocha)
            rochafinal.appendChild(fotorocha)
            rochafinal.appendChild(nomerocha)
            rochafinal.appendChild(botaorecomecar)
            botaorecomecar.appendChild(textorecomecar)

        }
    }
    for (i = 0; i < botaovoltar.length; i++) {
        botaovoltar[i].style.marginTop = "40px"
        botaovoltar[i].onclick = function() {telainicio()}
    }
}

/* function historicodiv(v) {
    let elhistorico = document.createElement("div")
    elhistorico.className = "rochahist"
    elhistorico.innerHTML = v
    historico.appendChild(elhistorico)

    myStorage.setItem("storedPage", historico.innerHTML);
}

onload = () => {
    let storedPage = myStorage.getItem("storedPage");
    if(storedPage){
        let divContainer = document.getElementById("historico");
        divContainer.innerHTML = storedPage;
    }
} 

*/