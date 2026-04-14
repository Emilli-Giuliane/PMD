let btnStartGame = document.querySelector('#startGame');

btnStartGame.addEventListener('pointerdown', () => {
    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");

    tela1.classList.remove("active");
    tela2.classList.add("active");
})