document.querySelector('#startGame').addEventListener('pointerup', () => {
    
    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela3");
    
    tela1.classList.remove("active");
    tela2.classList.add("active");
})

function gameStart() {

    document.querySelectorAll(".frasco").forEach(frasco => {
    
        frasco.addEventListener('pointerdown', (e) => {
            let bolas = frasco.querySelectorAll(".ball");
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

            let primeiraBola = bola[0];
            let verificaCorBola = corBola[0];

            if (primeiraBola != undefined) {
                /*
                Talvez eu apague essa linha depois, mas por agora ela serve de lembrança para o que eu fiz antes para que a primeira bola levantasse, se caso não precisar, apague este comentário 
                primeiraBola.style.marginBottom = '15px';
                */
                for (let i = 0; i < corBola.length; i++){

                    if (verificaCorBola === corBola[i]) {
                        bola[i].style.marginBottom = '15px';
                    } else {
                        break;
                    }
                }

            };
        });
    });

}

gameStart();

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
    // fazer uma função com a lógica das bolinhas já aplicadas para que chamar novamente dentro do evento click do botão reset, se não o botão funcionará apenas uma vez e nunca mais funcionará. Por isso precisa se chamar a função
    gameStart(); 
    });
});