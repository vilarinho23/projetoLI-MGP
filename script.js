let home = document.getElementById("header")
let botaovoltar = document.getElementsByClassName("botaovoltar")
let comecar = document.getElementById("botaojogar")
let inicio = document.getElementById("telainicial")
let jogo = document.getElementById("telastart")
let historico = document.getElementById("historico")
let percurso = document.getElementById("percurso")
let escolhaA = document.getElementById("escolhaA")
let escolhaB = document.getElementById("escolhaB")
let areia = document.getElementById("areia")
let xisto = document.getElementById("xisto")
let marga = document.getElementById("marga")
let argila = document.getElementById("argila")
let calcario = document.getElementById("calcario")
let marmore = document.getElementById("marmore")
let granito = document.getElementById("granito")
let gabro = document.getElementById("gabro")
let rocha11 = document.getElementById("areia2")


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
    'escolhaA': 'areia1',

    'escolhaB': {
    
        'escolhaA': 'xisto1',
        
        'escolhaB': {
        
            'escolhaA' : {
            
            		'escolhaA' : "marga1",
            		'escolhaB' : "argila1"
        				},
                
            'escolhaB' : {
            
            		'escolhaA' : {
            
            				'escolhaA' : "calcario1",
            				'escolhaB' : "marmore1"
        						},
            		'escolhaB' : {
            
            				'escolhaA' : "granito1",
            				'escolhaB' : "gabro1"
        						},
        				},
        }
    }
};

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
    
        if(stid[b] == "areia1"){
            jogo.style.display = "none";
            areia.style.display = "block";
            historico.style.marginTop = "100px";
            historicodiv("areia1");
        }else if(stid[b] == "xisto1"){
            jogo.style.display = "none"
            xisto.style.display = "block"
            historico.style.marginTop = "100px";
            historicodiv("areia1");
        }else if(stid[b] == "marga1"){
            jogo.style.display = "none"
            marga.style.display = "block"
            historico.style.marginTop = "100px";
            historicodiv("areia1");
        }else if(stid[b] == "argila1"){
            jogo.style.display = "none"
            argila.style.display = "block"
            historico.style.marginTop = "100px";
            historicodiv("areia1");
        }else if(stid[b] == "calcario1"){
            jogo.style.display = "none"
            calcario.style.display = "block"
            historico.style.marginTop = "100px";
            historicodiv("areia1");
        }else if(stid[b] == "marmore1"){
            jogo.style.display = "none"
            marmore.style.display = "block"
            historico.style.marginTop = "100px";
            historicodiv("areia1");
        }else if(stid[b] == "granito1"){
            jogo.style.display = "none"
            granito.style.display = "block"
            historico.style.marginTop = "100px";
            historicodiv("areia1");
        }else if(stid[b] == "gabro1"){
            jogo.style.display = "none"
            gabro.style.display = "block"
            historico.style.marginTop = "100px";
            historicodiv("areia1");
        }
        else{
            escolhaA.innerText = (Object.keys(st[v])[0]);
            escolhaB.innerText = (Object.keys(st[v])[1]);
            escolhaA.setAttribute("id",Object.keys(stid[b])[0]);
            escolhaB.setAttribute("id",Object.keys(stid[b])[1]);
            st = st[v];
            stid = stid[b];
            console.log(v, b)
            }
}

let myStorage = window.sessionStorage;

function historicodiv(v) {
    let historico = document.getElementById("historico")
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