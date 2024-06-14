const botones = document.querySelectorAll(".boton");
const teclaSonido = document.getElementById("tecla-sonido");

botones.forEach((tecla) => {
    tecla.addEventListener("click", () => {
        teclaSonido.play();
    });
});

const pantalla = document.querySelector(".pantalla")[0];

var nuevaOperacion = true;

var tienenumero = false;

var numeros = []; // ; separador de numeros
var numerosConcatenados = [];
var currentNumber = '';

var operadores = []; // ; separador de operadores

var resultado;

//mouse events
botones.forEach((tecla) => {
    tecla.addEventListener("click", () => {
        if (tecla.id == "del") {
            deleteLastCharacter();
            numerosConcatenados = [];
            currentNumber = '';
        }
        if (tecla.id == "ce") {
            clearMain();
            tienenumero = false;
            nuevaOperacion = true;
            numerosConcatenados = [];
            currentNumber = '';
        }
        if (tecla.id == "equals") {
            if (!nuevaOperacion) {
                resultado = realizarOperaciones();
                document.getElementById('operacion').innerHTML = document.getElementById('main').innerHTML;
                document.getElementById('main').innerHTML = resultado;
                tienenumero = false;
                nuevaOperacion = true;
                numerosConcatenados = [];
                currentNumber = '';
                operadores = [];
                numeros = [];
            }
        }

        //numero maximo de caracteres
        if (document.getElementById('main').innerHTML.length > 17) {
            return;
        }
        
        if (tecla.id == "division" && tienenumero) {
            document.getElementById('main').innerHTML += ' / ';
            operadores.push("/");
            numeros.push(";");
            tienenumero = false;
        }
        if (tecla.id == "addition" && tienenumero) {
            document.getElementById('main').innerHTML += ' + ';
            operadores.push("+");
            numeros.push(";");
            tienenumero = false;
        }
        if (tecla.id == "subtraction" && tienenumero) {
            document.getElementById('main').innerHTML += ' - ';
            operadores.push("-");
            numeros.push(";");
            tienenumero = false;
        }
        if (tecla.id == "multiplication" && tienenumero) {
            document.getElementById('main').innerHTML += ' * ';
            operadores.push("*");
            numeros.push(";");
            tienenumero = false;
        }
        if (   tecla.id == "1" 
            || tecla.id == "2" 
            || tecla.id == "3" 
            || tecla.id == "4" 
            || tecla.id == "5" 
            || tecla.id == "6"
            || tecla.id == "7"
            || tecla.id == "8"
            || tecla.id == "9") {  

            if (nuevaOperacion) {
                document.getElementById('main').innerHTML = tecla.id;
            } else {
                document.getElementById('main').innerHTML += tecla.id;
                if (!tienenumero) {
                    operadores.push(";");
                }
            }
            tienenumero = true;
            numeros.push(tecla.id);
            nuevaOperacion = false;
        }
        if (tecla.id == "zero") {
            if (nuevaOperacion) {
                document.getElementById('main').innerHTML = 0;
            } else {
                document.getElementById('main').innerHTML += 0;
                if (!tienenumero) {
                    operadores.push(";");
                }
            }
            tienenumero = true;
            numeros.push(0);
            nuevaOperacion = false;
        }
        if (tecla.id == "dot" && tienenumero) {
            document.getElementById('main').innerHTML += ',';
            if (!tienenumero) {
                operadores.push(";");
            }
            tienenumero = true;
            numeros.push('.');
        }
    });
});

function realizarOperaciones() {
    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i] !== ';') {
            currentNumber += numeros[i];
        } else {
            numerosConcatenados.push(parseFloat(currentNumber));
            currentNumber = '';
        }
    }
    numerosConcatenados.push(parseFloat(currentNumber));


    var result = numerosConcatenados[0];

    for (let i = 0; i < operadores.length; i++) {
        switch (operadores[i]) {
            case "+":
                result += numerosConcatenados[i + 1];
                break;
            case "-":
                result -= numerosConcatenados[i + 1];
                break;
            case "*":
                result *= numerosConcatenados[i + 1];
                break;
            case "/":
                result /= numerosConcatenados[i + 1];
                break;
        }
    }
    var decimalPlaces = (result.toString().split('.')[1] || '').length;
    if (decimalPlaces > 6) {
        return result.toFixed(6);
    } else {
        return result;
    }
}

function clearMain() {
    document.getElementById('main').innerHTML = '';
    operadores = [];
    numeros = [];
}

function deleteLastCharacter() {
    var mainDisplay = document.getElementById('main');
    var lastCharacter = mainDisplay.innerHTML.slice(-1);
    var previousCharacter = mainDisplay.innerHTML.slice(-2, -1);

    if (mainDisplay.innerHTML === '') {
        return;
    }

    if (lastCharacter === ' ') {
        operadores.pop();
        numeros.pop();
        tienenumero = true;
        mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0, -3);
    } else {
        numeros.pop();
        operadores.pop();
        mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0, -1);
    }

    if (previousCharacter === ' ') {
        tienenumero = false;
    }

    if (previousCharacter === '') {
        nuevaOperacion = true;
    }
}
//end mouse events