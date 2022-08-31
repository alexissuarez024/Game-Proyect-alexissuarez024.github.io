const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
}

window.addEventListener("load", setCanvasSize); //Aca decimos que apenas habra la ventana y termine de cargar (load) comience con la funciôn
window.addEventListener("resize", setCanvasSize);

function setCanvasSize(){
    if (window.innerHeight > window.innerWidth) { //Si el alto es mas grande que el ancho
        canvasSize = (window.innerWidth * 0.8);  //El 'canvasSize' pasara a ser multiplicado por 0.8 para poder tener medidas iguales
    } else{
        canvasSize = (window.innerHeight * 0.8); //Lo mismo pero al contrario, ahora se multiplica el alto
    }
canvas.setAttribute("width", canvasSize);  //Aplicamos los cambios al canvas 
canvas.setAttribute("height", canvasSize); //Aplicamos los cambios al canvas

   elementsSize = (canvasSize / 10) - 1;

   startGame();
}

function startGame(){

    game.font = (elementsSize - 10) + 'px Verdana';
    game.textAlign = 'end';
    
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    game.clearRect(0,0,canvasSize,canvasSize);
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            
            if (col == 'O'){
               if (!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
               }
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x , playerPosition.y);
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') {
        moveUp();
    } else if (event.key == 'ArrowLeft'){
        moveLeft();
    } else if (event.key == 'ArrowRight'){
        moveRight();
    } else if (event.key == 'ArrowDown'){
        moveDown();
    }
}

function moveUp() {
    console.log('Me quiero mover para arriba');
    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('No puedes avanzar');
    } else{
        playerPosition.y -= elementsSize;
        startGame();
    }
}
function moveLeft() {
    console.log('Me quiero mover para la izquierda');
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('No puedes avanzar');
    } else{
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight() {
    console.log('Me quiero mover para la derecha');
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('No puedes avanzar');
    } else{
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown() {
    console.log('Me quiero mover para abajo');
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('No puedes avanzar');
    } else{
        playerPosition.y += elementsSize;
        startGame();
    }
}

