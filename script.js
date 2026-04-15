document.querySelector('#startGame').addEventListener('pointerdown', () => {
    
    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");

    tela1.classList.remove("active");
    tela2.classList.add("active");
})

document.querySelectorAll(".tela").forEach(tela => {
    // Aqui o layout será guardado dentro do DOM de cada .tela
    let layoutInicial = tela.querySelector(".container");
    tela.dataset.layout = layoutInicial.innerHTML;
});

document.querySelectorAll(".btnReset").forEach(btn => {
    btn.addEventListener('click', (e) => {

    const tela = btn.closest(".tela");
    const container = tela.querySelector(".container");
    
    container.innerHTML = tela.dataset.layout;
    });
});