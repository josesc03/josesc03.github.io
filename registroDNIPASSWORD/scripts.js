const lletres = [ "T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];

var dni = document.getElementById('dni')
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirmPassword');   
var errorMessage = document.getElementById('errorMessage');

document.getElementById('registrationForm').addEventListener('submit', function(event) {

    if (!comprobarPassword()) {
        event.preventDefault();
        errorMessage.textContent = 'Las contraseñas no coinciden.';
    } else if (!validarDNI()) {
        event.preventDefault();
        errorMessage.textContent = 'DNI incorrecto.';
    } else {
        alert('Formulario enviado correctamente!');
        errorMessage.textContent = '';
    }
});


dni.addEventListener('focusout', () => {
    
    if (!validarDNI()) {
        dni.style.color = '#b20000'
        errorMessage.textContent = 'DNI incorrecto.';
    } else if (password.value !== confirmPassword.value) {
        errorMessage.textContent = 'Las contraseñas no coinciden.';
    } else {
        errorMessage.textContent = '';
    }
});

dni.addEventListener('focusin', () => {
        dni.style.color = ''
        errorMessage.textContent = '';
});

confirmPassword.addEventListener('focusout', () => {
    if (!comprobarPassword()) {
        errorMessage.textContent = 'Las contraseñas no coinciden.';
    } else if (!validarDNI()) {
        errorMessage.textContent = 'DNI incorrecto.';
    } else {
        errorMessage.textContent = '';
}
});

function validarDNI() {
    if (!dni.value.match(/^\d{8}[a-zA-Z]$/)) {
        return false;
    }

    let numeroCorrecto = false;
    var letraDni = dni.value.charAt(8);
    lletres.forEach(char => {
        if (letraDni.toUpperCase() == char) {
            numeroCorrecto = true;
        }
    });
    return numeroCorrecto;
}

function comprobarPassword() {
    if (password.value == confirmPassword.value) {
        return true;
    }
    return false;
};