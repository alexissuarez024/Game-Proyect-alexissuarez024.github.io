const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame); //Aca decimos que apenas habra la ventana y termine de cargar (load) comience con la funciôn

function startGame(){
    game.fillText("Kecho", 100,40);
}