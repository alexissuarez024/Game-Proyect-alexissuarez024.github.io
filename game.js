const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
}
const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPositions = [];

window.addEventListener("load", setCanvasSize); //Aca decimos que apenas habra la ventana y termine de cargar (load) comience con la funciôn
window.addEventListener("resize", setCanvasSize);

function setCanvasSize(){
    if (window.innerHeight > window.innerWidth) { //Si el alto es mas grande que el ancho
        canvasSize = (window.innerWidth * 0.7);  //El 'canvasSize' pasara a ser multiplicado por 0.9 para poder tener medidas iguales
    } else{
        canvasSize = (window.innerHeight * 0.7); //Lo mismo pero al contrario, ahora se multiplica el alto.
    }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute("width", canvasSize);  //Aplicamos los cambios al canvas 
    canvas.setAttribute("height", canvasSize); //Aplicamos los cambios al canvas

   elementsSize = (canvasSize / 10) - 1;

   playerPosition.x = undefined;
   playerPosition.y = undefined;

   startGame();
}

function startGame(){

    game.font = (elementsSize - 10) - 1 + 'px Verdana';
    game.textAlign = 'end';
    
    const map = maps[level];

    if (!map) {
        gameWin();
        return; //return para no volver a renderizar el mapa ya que completado el juego, no hay más.
    }

    if (!timeStart){
        timeStart = Date.now(); //Devuelve el número de milisegundos transcurridos.
        timeInterval = setInterval(showTime, 100);
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    showLives();

    enemyPositions = []; //Redeclaramos enemyPosition para que los enemigos no se duplicaran cada vez que nos movieramos.
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
            } else if (col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X'){
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
    showRecord();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3); //Colocamos toFixed para limitar la cantidad de decimales a 3, para que coincidan con las
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3); //posiciones, ya que sino al haber tantos decimales puede que alguno no coincida y no haga match.
    const giftCollision = giftCollisionX && giftCollisionY;
    
    if (giftCollision){
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision){
       levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x , playerPosition.y);
}

function levelWin(){
    // console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail(){
    console.log('CHOCASTE CON UN ENEMIGO');
    lives --;
    console.log(lives);

    if (lives <= 0){ //Reinicio de las siguientes variables una vez que las vidas sean menor o iguales a 0
        level = 0;
        lives = 3;
        timeStart = undefined 
    }

    playerPosition.x = undefined;//Dejamos undefined para que al volver a iniciar starGame, al momento de renderizar vuelva
    playerPosition.y = undefined;//a declarar las posiciones de x e y.
    startGame();
}

function gameWin(){
    console.log('Completaste el juego');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem("record_time");
    const playerTime = Date.now() - timeStart;
    if (recordTime){
        if (recordTime >= playerTime){
            localStorage.setItem("record_time", playerTime);
            pResult.innerHTML = "Superaste el record";
        } else {
            pResult.innerHTML = "lo siento, no superaste el record";
        }
    } else {
        localStorage.setItem("record_time", playerTime);
        pResult.innerHTML = "Tu primer record, trata de superarlo";
    }
    console.log({recordTime, playerTime});
}

function showLives(){
    spanLives.innerHTML = emojis['HEART'].repeat(lives); //El método repeat() construye y devuelve una nueva cadena que contiene el número
}                                                        //especificado de copias de la cadena en la cual fue llamada, concatenados. (Sirve con Strings)

function showTime(){
    spanTime.innerHTML = ((Date.now() - timeStart)/1000);
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem("record_time");
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

