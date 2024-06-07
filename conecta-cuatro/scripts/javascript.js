window.addEventListener("DOMContentLoaded", () => {
    let aviso = document.getElementById('avisocaja');
    document.getElementById('aceptar').addEventListener("click", () => {
        aviso.style.display = 'none';
    });
});


//BANNER IZQUIERDO

//color predeterminado del jugador1
var color1 = "#00ff00"

//asignacion de color del jugador1
const colorinput1 = document.getElementById('color1');
colorinput1.value = color1;

//evento para que si se cambia el color el color del jugador1 cambie
colorinput1.addEventListener('change', () => {
    color1 = colorinput1.value;
    changecolor1(color1);
});

//funcion de cambio de color del jugador1
changecolor1(color1);
function changecolor1(color1) {
    document.getElementById('recuadro-jugador1').style.outlineColor = color1.toString();
    var estilo = document.createElement('style');
    estilo.innerHTML = '.relleno1 { background-color: ' + color1 + ';}';
    document.head.appendChild(estilo);
}

//BANNER DERECHA 

//color predeterminado del jugador2
var color2 = "#ff0000"


//asignacion de color del jugador2
const colorinput2 = document.getElementById('color2');
colorinput2.value = color2;


//evento para que si se cambia el color el color del jugador2 cambie
colorinput2.addEventListener('change', () => {
    color2 = colorinput2.value;
    changecolor2(color2);
});


//funcion de cambio de color del jugador2
changecolor2(color2);
function changecolor2(color2) {
    document.getElementById('recuadro-jugador2').style.outlineColor = color2.toString();
    var estilo = document.createElement('style');
    estilo.innerHTML = '.relleno2 { background-color: ' + color2 + ';}';
    document.head.appendChild(estilo);
}

//AJUSTES TIEMPO

var intervalo;

//asignamos un contenido predeterminado para el contador
document.getElementById('contador').textContent = '05:00'

//funcion para comenzar la partida
document.getElementById('comenzar').addEventListener('click', function() {
    //lo deshabilitamos para que no se pueda empezar la partida mas de una vez a la vez
    this.disabled = true;

    //asignamos un turno aleatorio con un numero entre 0 y 1
    turno = Math.random() < 0.5;

    //cambiamos el turno porque ahi iniciamos los eventos de raton y teclado
    cambiarTurno();

    //quitamos la info
    document.getElementById('info').textContent = 'info';
    document.getElementById('info').style.color = 'white';

    //deshabilitamos el cambio de color cuando la partida comienza
    document.getElementById('color1').disabled = true;
    document.getElementById('color2').disabled = true;

    //cambiamos el recuadro a rellenado o no dependiendo de quien tiene el turno
    if (turno) {
        document.getElementById('recuadro-jugador2').style.backgroundColor = color2;
        document.getElementById('recuadro-jugador1').style.backgroundColor = 'transparent';
        document.getElementById('info').innerHTML = 'Le toca a <span style="font-weight: 700; color:'+ color2 +';">JUGADOR2</span>';
    } else {
        document.getElementById('recuadro-jugador1').style.backgroundColor = color1;
        document.getElementById('recuadro-jugador2').style.backgroundColor = 'transparent';
        document.getElementById('info').innerHTML = 'Le toca a <span style="font-weight: 700; color:'+ color1 +';">JUGADOR1</span>';

    }

    //quitamos las fichas si las hay, por si se quiere iniciar otra partida más
    removeFichas();

    //asignamos el tiempoTotal en minutos y lo calculamos en segundos
    const tiempoTotal = 5;
    let tiempoEnSegundos = tiempoTotal * 60;

    //creamos una funcion para que se actualice el contador (con un intervalo se actualizara cada 1000ms)
    function actualizarContador() {
        //calculamos el tiempo actual en minutos
        const minutos = Math.floor(tiempoEnSegundos / 60);
        //calculamos el tiempo actual en segundos
        let segundos = tiempoEnSegundos % 60;

        //formateamos los minutos y los segundos para que tengan 2 digitos
        const minutosFormateados = minutos < 10 ? '0' + minutos : minutos;
        const segundosFormateados = segundos < 10 ? '0' + segundos : segundos;

        //actualizamos el contador con los minutos y los segundos formateados
        document.getElementById('contador').textContent = minutosFormateados + ':' + segundosFormateados;

        //restamos 1 segundo al tiempo
        tiempoEnSegundos--;

        //cambiamos el color del contador cuando queda menos de un minuto
        if (tiempoEnSegundos < 60) {
            document.getElementById('contador').style.color = 'red';
        }

        //si el tiempo llega a 0 se acaba el juego
        if (tiempoEnSegundos < 0) {
            clearInterval(intervalo); //limpiamos el intervalo para que no siga
            document.getElementById('info').textContent = 'Fin tiempo: Empate'; //mostramos el mensaje de fin de tiempo
            document.getElementById('info').style.color = 'red' //ponemos el color de "info" en rojo
            document.getElementById('comenzar').disabled = false; //habilitamos el botón de comenzar para poder volver jugar
            document.removeEventListener('keydown', manejarTeclado); //quitamos el eventListener del teclado
            for (let index = 0; index < 6; index++) { //quitamos el eventListener del raton
                colA[index].removeEventListener('click', manejarRaton);
                colB[index].removeEventListener('click', manejarRaton);
                colC[index].removeEventListener('click', manejarRaton);
                colD[index].removeEventListener('click', manejarRaton);
                colE[index].removeEventListener('click', manejarRaton);
                colF[index].removeEventListener('click', manejarRaton);
                colG[index].removeEventListener('click', manejarRaton);
            }
            //habilitamos el cambio de color del jugador 1 y 2
            document.getElementById('color1').disabled = false; 
            document.getElementById('color2').disabled = false;
        }
    }

    //comenzamos el contador en el milisegundo 0
    actualizarContador();
    //aquí está el intervalo por cada 1000ms
    intervalo = setInterval(actualizarContador, 1000);
});

// obtengo las columnas por separado
var colA = document.querySelectorAll('.position[class^="a"]');
var colB = document.querySelectorAll('.position[class^="b"]');
var colC = document.querySelectorAll('.position[class^="c"]');
var colD = document.querySelectorAll('.position[class^="d"]');
var colE = document.querySelectorAll('.position[class^="e"]');
var colF = document.querySelectorAll('.position[class^="f"]');
var colG = document.querySelectorAll('.position[class^="g"]');

//creamos una tabla con las columnas
var tabla = {colA, colB, colC, colD, colE, colF, colG}

// Asigno el turno
var turno = true; // false para j1, true para j2

//manejar teclado para jugador 1
function manejarTeclado(event) {
    var tecla = event.key; //asignamos el evento a una variable tecla

    //la tecla debe estar entre 1 y 7
    if (tecla >= '1' && tecla <= '7') {
        //como los indices empiezan en 0 restamos uno a la tecla
        var columnaIndex = parseInt(tecla) - 1;
        //devolvemos la columna a partir del index (0:colA, 1:colB, 2:colC, 3:colD, 4:colE, 5:colF, 6:colG)
        var columna = [colA, colB, colC, colD, colE, colF, colG][columnaIndex];

        //recorremos la columna sabiendo que tiene una altura de 6 (de 0 a 5)
        for (let index = 5; index >= 0; index--) {
            //si el lugar especifico de la columna contiene relleno1 o relleno2 significa que ahi ya hay una ficha
            if (!columna[index].classList.contains('relleno2') && !columna[index].classList.contains('relleno1')) {
                //asignamos relleno2 al lugar especifico (ya que el teclado solo puede jugarlo el jugador2)
                columna[index].classList.add('relleno2');
                //cambiamos el color de info al default
                document.getElementById('info').style.color ='white';
                //llamamos a la funcion para comprobar si hay ganador
                comprobarWin();
                break;
            } else if (index == 0) {
                //si el index llega a 0 y la columna está llena lo indicamos en info en rojo
                document.getElementById('info').textContent = 'La columna ' + tecla + ' está llena ';
                document.getElementById('info').style.color ='red';
            }
        }
    }
}

//manejar raton para jugador 1
function manejarRaton(event) {
    //asignamos una columna
    var col;
    //asignamos el elemento target
    var target = event.currentTarget;
    
    // Comprobar si el elemento de destino se encuentra en alguna columna
    if (Array.from(colA).includes(target)) col = colA;
    else if (Array.from(colB).includes(target)) col = colB;
    else if (Array.from(colC).includes(target)) col = colC;
    else if (Array.from(colD).includes(target)) col = colD;
    else if (Array.from(colE).includes(target)) col = colE;
    else if (Array.from(colF).includes(target)) col = colF;
    else if (Array.from(colG).includes(target)) col = colG;
    else return; // Si no se encuentra en ninguna columna, salir
    
    // Lógica para manejar el clic en la columna encontrada (funciona de la misma manera que el del teclado)
    for (let index = 5; index >= 0; index--) {
        if (!col[index].classList.contains('relleno2') && !col[index].classList.contains('relleno1')) {
            col[index].classList.add('relleno1');
            //cambiamos el color de info al default
            document.getElementById('info').style.color ='white';
            comprobarWin();
            break;
        } else if (index === 0) {
            document.getElementById('info').textContent = 'La columna está llena ';
            document.getElementById('info').style.color ='red';
        }
    }
}

//funcion para cambiar de turno
function cambiarTurno() {
    //cambiamos el turno
    turno = !turno;
    if (turno) { //si el turno es de jugador2
        //rellenamos el recuadro de jugador2 y le damos transparencia al recuadro de jugador1
        document.getElementById('recuadro-jugador2').style.backgroundColor = color2;
        document.getElementById('recuadro-jugador1').style.backgroundColor = 'transparent';
        document.getElementById('info').innerHTML = 'Le toca a <span style="font-weight: 700; color:'+ color2 +';">JUGADOR2</span>';

        for (let index = 0; index < 6; index++) { //quitamos los eventos de raton de todos los divs de cada columna (sabiendo que hay 7)
            colA[index].removeEventListener('click', manejarRaton);
            colB[index].removeEventListener('click', manejarRaton);
            colC[index].removeEventListener('click', manejarRaton);
            colD[index].removeEventListener('click', manejarRaton);
            colE[index].removeEventListener('click', manejarRaton);
            colF[index].removeEventListener('click', manejarRaton);
            colG[index].removeEventListener('click', manejarRaton);
        }
        //añadimos el evento de teclado de jugador2
        document.addEventListener('keydown', manejarTeclado);
    } else { //si el turno es de jugador1
        //rellenamos el recuadro de jugador1 y le damos transparencia al recuadro de jugador2
        document.getElementById('recuadro-jugador1').style.backgroundColor = color1;
        document.getElementById('recuadro-jugador2').style.backgroundColor = 'transparent';
        document.getElementById('info').innerHTML = 'Le toca a <span style="font-weight: 700; color:'+ color1 +';">JUGADOR1</span>';

        //quitamos el evento de teclado de jugador2
        document.removeEventListener('keydown', manejarTeclado);
        for (let index = 0; index < 6; index++) { //añadimos los eventos de raton a todos los divs de cada columna (sabiendo que hay 7)
            colA[index].addEventListener('click', manejarRaton);
            colB[index].addEventListener('click', manejarRaton);
            colC[index].addEventListener('click', manejarRaton);
            colD[index].addEventListener('click', manejarRaton);
            colE[index].addEventListener('click', manejarRaton);
            colF[index].addEventListener('click', manejarRaton);
            colG[index].addEventListener('click', manejarRaton);
        }
    }
}

//funcion para quitar quitar los rellenos (las fichas)
function removeFichas() {
    //asignamos todas las columnas a  una lista
    const columnas = [colA, colB, colC, colD, colE, colF, colG];
    
    //recorremos todas las columnas
    columnas.forEach(columna => {
        columna.forEach(posicion => {
            //quitamos relleno1 o relleno2 si la tiene
            posicion.classList.remove('relleno1', 'relleno2');
        });
    });
}

//funcion para comprobar la victoria
function comprobarWin() {
    //si hay alguna de las funciones de victoria da true se gana
    if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) {
        //si el turno es de jugador1 gana jugador1 y si el turno es de jugador2 gana jugador2 (lo ponemos en verde)
        document.getElementById('info').textContent = turno ? 'Gana el jugador 2' : 'Gana el jugador 1';
        document.getElementById('info').style.color = '#00cc00';
        //habilitamos el boton de comenzar
        document.getElementById('comenzar').disabled = false;
        //quitamos los eventos de teclado y raton
        document.removeEventListener('keydown', manejarTeclado);
        for (let index = 0; index < 6; index++) {
            colA[index].removeEventListener('click', manejarRaton);
            colB[index].removeEventListener('click', manejarRaton);
            colC[index].removeEventListener('click', manejarRaton);
            colD[index].removeEventListener('click', manejarRaton);
            colE[index].removeEventListener('click', manejarRaton);
            colF[index].removeEventListener('click', manejarRaton);
            colG[index].removeEventListener('click', manejarRaton);
        }
        //habilitamos el cambio de color
        document.getElementById('color1').disabled = false;
        document.getElementById('color2').disabled = false;

        //limpiamos el intervalo
        clearInterval(intervalo);
        return;
    }
    //si no hay victoria cambia de turno
    cambiarTurno();
}

//funcion para comprobar la victoria horizontal
function checkHorizontalWin() {
    //3 filas arriba 3 filas abajo (sin contar la propia)
    for (let row = 0; row < 6; row++) {
        //4 columnas que son las que hay que comprobar
        for (let col = 0; col < 4; col++) {
            //comprobamos si hay 4 fichas del mismo color en una fila
            const currentColor = getPieceColor(row, col);
            if (currentColor !== '') {
                if (currentColor === getPieceColor(row, col + 1) &&
                    currentColor === getPieceColor(row, col + 2) &&
                    currentColor === getPieceColor(row, col + 3)) {
                    return true;
                }
            }
        }
    }
    return false;
}

//funcion para comprobar la victoria vertical (es lo mismo que el horizontal solo que con las filas en lugar de la columnas)
function checkVerticalWin() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            const currentColor = getPieceColor(row, col);
            if (currentColor !== '') {
                if (currentColor === getPieceColor(row + 1, col) &&
                    currentColor === getPieceColor(row + 2, col) &&
                    currentColor === getPieceColor(row + 3, col)) {
                    return true;
                }
            }
        }
    }
    return false;
}

//funcion para comprobar la victoria diagonal
function checkDiagonalWin() {
    //comprobar victoria diagonal ascendente con un rango Y de 3 y un rango X de 4
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (getPieceColor(row, col) !== '') {
                if (getPieceColor(row, col) === getPieceColor(row + 1, col + 1) &&
                    getPieceColor(row, col) === getPieceColor(row + 2, col + 2) &&
                    getPieceColor(row, col) === getPieceColor(row + 3, col + 3)) {
                    return true;
                }
            }
        }
    }

    //comprobar victoria diagonal descendente de forma contraria en Y
    for (let row = 0; row < 3; row++) {
        for (let col = 3; col < 7; col++) {
            if (getPieceColor(row, col) !== '') {
                if (getPieceColor(row, col) === getPieceColor(row + 1, col - 1) &&
                    getPieceColor(row, col) === getPieceColor(row + 2, col - 2) &&
                    getPieceColor(row, col) === getPieceColor(row + 3, col - 3)) {
                    return true;
                }
            }
        }
    }
    return false;
}

//funcion para obtener el color de la ficha
function getPieceColor(row, col) {
    //obtenemos la columna
    const column = Object.values(tabla)[col];
    //obtenemos la posicion de la columna
    const position = column[row];
    //devolvemos el color dependiendo del relleno que tiene
    if (position.classList.contains('relleno1')) {
        return color1;
    } else if (position.classList.contains('relleno2')) {
        return color2;
    }
    return '';
}