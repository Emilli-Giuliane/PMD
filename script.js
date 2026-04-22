document.querySelector('#startGame').addEventListener('pointerup', () => {
    
    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");
    
    tela1.classList.remove("active");
    tela2.classList.add("active");

    gameInitialize = false;
    gameStart(3);
});

let gameInitialize = false;

function gameStart(qntdParaVencer) {
    if (gameInitialize) return;
    gameInitialize = true;

    let segurando = [];
    let frascoOrigem = null;
    let contadorDeFrascosTerminados = 0;
    
    let telaAtiva = document.querySelector(".tela.active");
    let frascos = telaAtiva.querySelectorAll(".frasco");

    frascos.forEach(frasco => {

        frasco.addEventListener('pointerdown', (e) => {
            let bolas = Array.from(frasco.querySelectorAll(".ball"));
            let bola = [];
            let corBola = [];
            
            bolas.forEach(b => {
                
                if (b.classList.contains("ballY")) {
                    bola.push(b);
                    corBola.push("Yellow");
                } else if (b.classList.contains("ballB")){
                    bola.push(b);
                    corBola.push("Blue");
                } else if (b.classList.contains("ballLB")) {
                    bola.push(b);
                    corBola.push("Light Blue");
                } else if (b.classList.contains("ballR")) {
                    bola.push(b);
                    corBola.push("Red");
                }
            });
            
            
            
            if (segurando.length === 0) {
                let primeiraBola = bola[0];
                let verificaCorBola = corBola[0];
                
                if (primeiraBola != undefined) {
                    // Segurar as bolas
                    for (let i = 0; i < corBola.length; i++){
                        
                        if (verificaCorBola === corBola[i]) {
                            segurando.push(bola[i]);
                            frascoOrigem = frasco;
                            bola[i].style.transform = 'translate(0px, -4px)';
                            bola[i].style.transition = '.2s';                            
                        } else {
                            break;
                        };
                    };
                };
            } else {
                function soltarBolas(segurando,frasco) {
                        segurando.forEach(bola => {
                            frasco.prepend(bola);                        
                            bola.style.transform = 'translate(0px, 0px)';
                            bola.style.transition = '.2s';    
                        });
                }
                
                // OBS.: Fazer a validação sempre primeiro, e depois fazer as regras
                // Soltar a bola no mesmo frasco
                if (frasco === frascoOrigem) {
                    
                    soltarBolas(segurando,frasco);
                    segurando = [];
                } else { 
                    // Soltar se não tiver nenhuma bola dentro
                    if(bolas.length === 0) { 
                    
                        soltarBolas(segurando,frasco);
                        segurando = [];
                    
                    } else  {
                        // Variáveis de verificação de cores das primeiras bolas sendo seguradas e a primeira bola da fileira de frasco
                        let segurandoCor = [...segurando[0].classList].find(c => c !== "ball");
                        let primeiraBolaCor = [...bola[0].classList].find(c => c !== "ball");
                        
                        // Soltar a bola em outro frasco
                        if (bolas.length + segurando.length <= 4 && segurandoCor === primeiraBolaCor) {
                            
                            soltarBolas(segurando,frasco);
                            segurando = [];

                            // Se as cores que eu tenho no frasco + as cores que eu tenho na mão for igual 4, o frasco fica completo
                            let bolaAtualizada = Array.from(frasco.querySelectorAll(".ball"));
                            
                            if (bolaAtualizada.length === 0) return false;
                            
                            let corBase = [...bolaAtualizada[0].classList].find(c => c !== "ball");

                            let todasCoresIguais = bolaAtualizada.every(b =>
                                [...b.classList].find(c => c !== "ball") === corBase
                            );
                            
                            if (todasCoresIguais && bolaAtualizada.length === 4){
                                contadorDeFrascosTerminados++;
                            }
                            if (contadorDeFrascosTerminados === qntdParaVencer) {
                                // colocar tela de vitória caso tela atual seja tela2
                                    // document.querySelector(".telaVitoria").classList.add("active");

                                
                                if (document.querySelector(".tela2").classList.contains("active")){

                                    document.querySelector(".telaVitoria").classList.add("active");
                                    // let tela3 = document.querySelector(".tela3");
                                    // let tela2 = document.querySelector(".tela2");
                                    
                                    
                                    // document.querySelector("#proximaFase").addEventListener("pointerdown", () => {
                                        //     telaVitoria.classList.remove("active")
                                        //     tela2.classList.remove("active")
                                        //     tela3.classList.add("active")
                                    //     gameStart(4);
                                    // }) 
                                } else if (document.querySelector(".tela3").classList.contains("active")) {
                                    window.location.href = "mensagem-vitoria.html";
                                }
                                // else if (document.querySelector(".tela3").classList.contains("active")) {
                                //         alert("ola")
                                // }
                                
                            }
                    
                        };
                    
                    };
                }; 
            };
            
            
        });
    });
}

let tela3 = document.querySelector(".tela3");
let tela2 = document.querySelector(".tela2");
document.querySelector("#proximaFase").addEventListener("pointerdown", () => {
    document.querySelector(".telaVitoria").classList.remove("active")
    tela2.classList.remove("active")
    tela3.classList.add("active")

    gameInitialize = false;
    gameStart(4);
});
// gameStart(4);
// TODO Amigo: Se caso no futuro ficar dificil de usar o gameStart() por causa da troca de telas, tente reiniciar o layout da tela2 antes de ir para a tela3. Validando a tela3 vá para a ultima tela de vitória.

document.querySelectorAll(".tela").forEach(tela => {
    // Aqui o layout será guardado dentro do DOM de cada .tela
    let layoutInicial = tela.querySelector(".container");
    tela.dataset.layout = layoutInicial.innerHTML;
});

document.querySelectorAll(".btnReset").forEach(btn => {
    btn.addEventListener('pointerup', (e) => {

    const tela = btn.closest(".tela");
    const container = tela.querySelector(".container");
    
    container.innerHTML = tela.dataset.layout;
    
    gameInitialize = false;
    // fazer uma função com a lógica das bolinhas já aplicadas para que chamar novamente dentro do evento click do botão reset, se não o botão funcionará apenas uma vez e nunca mais funcionará. Por isso precisa se chamar a função
    if ([...tela.classList].find(c => c !== "tela") === "tela2") {
        gameStart(3); 
    } else if ([...tela.classList].find(c => c !== "tela") === "tela3") {
        gameStart(4);
    }

    });
});