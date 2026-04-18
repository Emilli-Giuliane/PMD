document.querySelector('#startGame').addEventListener('pointerup', () => {
    
    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");
    
    tela1.classList.remove("active");
    tela2.classList.add("active");
})

function gameStart() {

    let segurando = [];
    
    document.querySelectorAll(".frasco").forEach(frasco => {
        
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

                    for (let i = 0; i < corBola.length; i++){

                        if (verificaCorBola === corBola[i]) {
                            segurando.push(bola[i]);
                            bola[i].style.transform = 'translate(0px, -4px)';
                            bola[i].style.transition = '.2s';                            
                        } else {
                            break;
                        };
                    };
                };
            } else {
                segurando.forEach(bola => {

                    frasco.prepend(bola);
                    
                    bola.style.transform = 'translate(0px, 0px)';
                    bola.style.transition = '.2s';
                    segurando = []
                });
            }
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