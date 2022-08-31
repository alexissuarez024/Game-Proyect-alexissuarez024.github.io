const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let canvasSize;
let elementsSize;

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

   elementsSize = canvasSize / 10;

   startGame();
}

function startGame(){

    game.font = (elementsSize - 12) + 'px Verdana';
    game.textAlign = 'end';
    
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            game.fillText(emoji, posX, posY);
        });
    });


    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row -1][col - 1]], elementsSize * col, elementsSize * row); 
    //     }   
    // }
   
}

